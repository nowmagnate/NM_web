import test from "node:test";
import assert from "node:assert/strict";
import { handle } from "../src/app.ts";
import { hmacHex } from "../src/crypto.ts";
import type { Deps, Env } from "../src/types.ts";

const ORIGIN = "https://nowmagnate.com";

function setup(overrides: Partial<Env> = {}) {
  const kv = new Map<string, string>();
  const mails: { from: string; to: string; raw: string }[] = [];
  const orders = new Map<string, Record<string, unknown>>();
  const payments = new Map<string, Record<string, unknown>>();
  const calls: string[] = [];

  const env: Env = {
    STORE: {
      get: async (k) => kv.get(k) ?? null,
      put: async (k, v) => void kv.set(k, v),
    },
    SEND_EMAIL: {},
    RAZORPAY_KEY_ID: "rzp_test_key",
    RAZORPAY_KEY_SECRET: "key_secret",
    RAZORPAY_WEBHOOK_SECRET: "whsec",
    ALLOWED_ORIGINS: `${ORIGIN},https://nowmagnate-1f5f3.web.app`,
    OWNER_INBOX: "owner@gmail.example",
    ORDERS_ADDRESS: "orders@nowmagnate.com",
    FROM_ADDRESS: "payments@nowmagnate.com",
    ...overrides,
  };

  const fakeFetch: typeof fetch = async (input, init) => {
    const url = String(input);
    calls.push(`${init?.method ?? "GET"} ${url}`);
    if (url.endsWith("/v1/orders") && init?.method === "POST") {
      const body = JSON.parse(String(init.body));
      const id = `order_${orders.size + 1}`;
      const order = { id, status: "created", ...body };
      orders.set(id, order);
      return Response.json(order);
    }
    const o = url.match(/\/v1\/orders\/([^/]+)$/);
    if (o) return orders.has(o[1]) ? Response.json(orders.get(o[1])) : Response.json({ error: { description: "nf" } }, { status: 404 });
    const p = url.match(/\/v1\/payments\/([^/]+)$/);
    if (p) return payments.has(p[1]) ? Response.json(payments.get(p[1])) : Response.json({ error: { description: "nf" } }, { status: 404 });
    if (url.includes("turnstile")) return Response.json({ success: String(init?.body).includes("good") });
    return new Response("unexpected " + url, { status: 500 });
  };

  const deps: Deps = {
    fetch: fakeFetch,
    now: () => new Date("2026-10-10T12:00:00Z"),
    sendMail: async (from, to, raw) => void mails.push({ from, to, raw }),
  };

  const post = (path: string, body: unknown, headers: Record<string, string> = { Origin: ORIGIN }) =>
    handle(new Request(`https://pay.nowmagnate.com${path}`, { method: "POST", headers, body: JSON.stringify(body) }), env, deps);

  return { env, deps, kv, mails, orders, payments, calls, post };
}

const buyer = { product: "template", template: "dental-practice", name: "Priya Shah", email: "priya@example.com" };

test("health answers, other origins are refused", async () => {
  const t = setup();
  assert.equal((await handle(new Request("https://pay.nowmagnate.com/health"), t.env, t.deps)).status, 200);
  const res = await t.post("/quote", buyer, { Origin: "https://evil.example" });
  assert.equal(res.status, 403);
  const noOrigin = await t.post("/quote", buyer, {});
  assert.equal(noOrigin.status, 403);
});

test("CORS preflight is allowed only for the site", async () => {
  const t = setup();
  const ok = await handle(new Request("https://pay.nowmagnate.com/orders", { method: "OPTIONS", headers: { Origin: ORIGIN } }), t.env, t.deps);
  assert.equal(ok.status, 204);
  assert.equal(ok.headers.get("Access-Control-Allow-Origin"), ORIGIN);
  const bad = await handle(new Request("https://pay.nowmagnate.com/orders", { method: "OPTIONS", headers: { Origin: "https://evil.example" } }), t.env, t.deps);
  assert.equal(bad.status, 403);
});

test("quote: list price, a valid code, an unknown code", async () => {
  const t = setup();
  t.kv.set("code:FLASH20", '{"percentOff":20,"label":"Flash sale"}');
  const list = await (await t.post("/quote", buyer)).json();
  assert.equal(list.amount, 49900);
  const disc = await (await t.post("/quote", { ...buyer, code: "flash20" })).json();
  assert.equal(disc.amount, 39920);
  assert.equal(disc.discount.label, "Flash sale");
  const bad = await t.post("/quote", { ...buyer, code: "nope" });
  assert.equal(bad.status, 422);
  assert.equal((await bad.json()).error, "unknown-code");
});

test("orders: the amount comes from the server, never the client", async () => {
  const t = setup();
  const res = await t.post("/orders", { ...buyer, amount: 1 });
  const data = await res.json();
  assert.equal(res.status, 200);
  assert.equal(data.amount, 49900);
  assert.equal(data.currency, "USD");
  assert.equal(data.keyId, "rzp_test_key");
  const sent = t.orders.get(data.orderId)!;
  assert.equal(sent.amount, 49900);
  assert.deepEqual((sent.notes as Record<string, string>).template, "dental-practice");
});

test("orders: a discount code changes the price and is recorded in the notes", async () => {
  const t = setup();
  t.kv.set("code:FLASH20", '{"percentOff":20}');
  const data = await (await t.post("/orders", { ...buyer, code: "FLASH20" })).json();
  assert.equal(data.amount, 39920);
  const notes = t.orders.get(data.orderId)!.notes as Record<string, string>;
  assert.equal(notes.code, "FLASH20");
  assert.equal(notes.list_amount, "49900");
});

test("orders: invalid input and a bad template are rejected before Razorpay is called", async () => {
  const t = setup();
  const res = await t.post("/orders", { ...buyer, template: "nope" });
  assert.equal(res.status, 422);
  assert.equal(t.calls.length, 0);
});

test("orders: Turnstile is enforced only when a secret is set", async () => {
  const t = setup({ TURNSTILE_SECRET: "ts" });
  assert.equal((await t.post("/orders", buyer)).status, 403);
  assert.equal((await t.post("/orders", { ...buyer, turnstileToken: "bad" })).status, 403);
  assert.equal((await t.post("/orders", { ...buyer, turnstileToken: "good" })).status, 200);
});

async function paidOrder(t: ReturnType<typeof setup>, code?: string) {
  const data = await (await t.post("/orders", { ...buyer, ...(code ? { code } : {}) })).json();
  t.payments.set("pay_1", {
    id: "pay_1",
    order_id: data.orderId,
    amount: data.amount,
    currency: data.currency,
    status: "captured",
    method: "card",
  });
  return data;
}

test("verify: a good signature confirms the payment and emails once", async () => {
  const t = setup();
  const data = await paidOrder(t);
  const signature = await hmacHex("key_secret", `${data.orderId}|pay_1`);
  const res = await t.post("/verify", { orderId: data.orderId, paymentId: "pay_1", signature });
  assert.equal(res.status, 200);
  assert.equal(t.mails.length, 1);
  assert.equal(t.mails[0].to, "owner@gmail.example");
  assert.match(t.mails[0].raw, /^To: orders@nowmagnate\.com\r$/m);
  // Verifying again does not send a second email.
  await t.post("/verify", { orderId: data.orderId, paymentId: "pay_1", signature });
  assert.equal(t.mails.length, 1);
});

test("verify: a wrong signature is refused and sends nothing", async () => {
  const t = setup();
  const data = await paidOrder(t);
  const res = await t.post("/verify", { orderId: data.orderId, paymentId: "pay_1", signature: "00" });
  assert.equal(res.status, 400);
  assert.equal(t.mails.length, 0);
});

test("verify: a payment whose amount differs from the order is refused", async () => {
  const t = setup();
  const data = await paidOrder(t);
  t.payments.set("pay_1", { ...t.payments.get("pay_1")!, amount: 100 });
  const signature = await hmacHex("key_secret", `${data.orderId}|pay_1`);
  const res = await t.post("/verify", { orderId: data.orderId, paymentId: "pay_1", signature });
  assert.equal(res.status, 400);
  assert.equal(t.mails.length, 0);
});

async function webhook(t: ReturnType<typeof setup>, event: string, secret = "whsec") {
  const body = JSON.stringify({ event, payload: { payment: { entity: { id: "pay_1" } } } });
  const sig = await hmacHex(secret, body);
  return handle(
    new Request("https://pay.nowmagnate.com/webhook", { method: "POST", headers: { "X-Razorpay-Signature": sig }, body }),
    t.env,
    t.deps,
  );
}

test("webhook: bad signature refused; good one emails once; duplicates ignored", async () => {
  const t = setup();
  await paidOrder(t);
  assert.equal((await webhook(t, "payment.captured", "wrong")).status, 400);
  assert.equal(t.mails.length, 0);

  assert.equal((await webhook(t, "payment.captured")).status, 200);
  assert.equal((await webhook(t, "order.paid")).status, 200);
  assert.equal(t.mails.length, 1);
});

test("webhook: other events are acknowledged and ignored", async () => {
  const t = setup();
  await paidOrder(t);
  assert.equal((await webhook(t, "payment.failed")).status, 200);
  assert.equal(t.mails.length, 0);
});

test("webhook: a failing mailer returns 500 so Razorpay retries, and nothing is marked paid", async () => {
  const t = setup();
  await paidOrder(t);
  t.deps.sendMail = async () => {
    throw new Error("smtp down");
  };
  assert.equal((await webhook(t, "payment.captured")).status, 500);
  assert.equal(t.kv.has("paid:pay_1"), false);
});

test("a paid order with a code counts the redemption and can use up the code", async () => {
  const t = setup();
  t.kv.set("code:ONCE", '{"percentOff":50,"maxRedemptions":1}');
  await paidOrder(t, "ONCE");
  await webhook(t, "payment.captured");
  assert.equal(t.kv.get("used:ONCE"), "1");
  const again = await t.post("/quote", { ...buyer, code: "ONCE" });
  assert.equal((await again.json()).error, "used-up");
});

test("payments for other products on the same Razorpay account are ignored", async () => {
  const t = setup();
  // An order made by something else (no `product` note, or a product we do not sell).
  t.orders.set("order_other", { id: "order_other", amount: 1000, currency: "INR", notes: [] });
  t.orders.set("order_unknown", { id: "order_unknown", amount: 1000, currency: "INR", notes: { product: "something-else" } });
  for (const orderId of ["order_other", "order_unknown"]) {
    t.payments.set("pay_1", { id: "pay_1", order_id: orderId, amount: 1000, currency: "INR", status: "captured" });
    assert.equal((await webhook(t, "payment.captured")).status, 200);
  }
  assert.equal(t.mails.length, 0);
  assert.equal(t.kv.has("paid:pay_1"), false);
});
