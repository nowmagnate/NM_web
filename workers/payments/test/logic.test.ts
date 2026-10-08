import test from "node:test";
import assert from "node:assert/strict";
import { PRODUCTS, TEMPLATE_SLUGS } from "../src/products.ts";
import { parseDiscount, priceFor } from "../src/pricing.ts";
import { validateOrder, validateSelection } from "../src/validate.ts";
import { hmacHex, safeEqual, verifyPaymentSignature, verifyWebhookSignature } from "../src/crypto.ts";
import { buildMessage, orderEmail } from "../src/mime.ts";

const product = PRODUCTS.template;
const now = new Date("2026-10-10T12:00:00Z");
const price = (code: string | undefined, raw: string | null, used = 0) =>
  priceFor({
    productId: "template",
    product,
    code,
    record: parseDiscount(raw),
    used,
    now,
  });

/* ------------------------------------------------------------------ pricing */

test("no code: list price, no discount", () => {
  const r = price(undefined, null);
  assert.deepEqual(r, { ok: true, amount: 49900, listAmount: 49900, currency: "USD" });
});

test("percent, amount and final-price discounts", () => {
  assert.equal((price("A", '{"percentOff":20}') as { amount: number }).amount, 39920);
  assert.equal((price("A", '{"amountOff":10000}') as { amount: number }).amount, 39900);
  assert.equal((price("A", '{"finalAmount":29900}') as { amount: number }).amount, 29900);
});

test("discount result names the code, label and saving", () => {
  const r = price("flash20", '{"percentOff":20,"label":"Flash sale"}');
  assert.equal(r.ok && r.discount?.code, "FLASH20");
  assert.equal(r.ok && r.discount?.label, "Flash sale");
  assert.equal(r.ok && r.discount?.off, 9980);
});

test("price never goes below the floor or above the list price", () => {
  assert.equal((price("A", '{"amountOff":999999}') as { amount: number }).amount, product.minAmount);
  assert.equal((price("A", '{"finalAmount":999999}') as { amount: number }).amount, product.amount);
});

test("unknown, not started, expired, used up, wrong product", () => {
  assert.deepEqual(price("X", null), { ok: false, error: "unknown-code" });
  assert.deepEqual(price("X", '{"percentOff":10,"startsAt":"2026-11-01T00:00:00Z"}'), {
    ok: false,
    error: "not-started",
  });
  assert.deepEqual(price("X", '{"percentOff":10,"expiresAt":"2026-10-01T00:00:00Z"}'), {
    ok: false,
    error: "expired",
  });
  assert.deepEqual(price("X", '{"percentOff":10,"maxRedemptions":5}', 5), {
    ok: false,
    error: "used-up",
  });
  assert.deepEqual(price("X", '{"percentOff":10,"products":["other"]}'), {
    ok: false,
    error: "not-applicable",
  });
});

test("bad discount records are rejected, not half-applied", () => {
  assert.equal(parseDiscount("not json"), null);
  assert.equal(parseDiscount('{"percentOff":20,"amountOff":100}'), null);
  assert.equal(parseDiscount('{"percentOff":100}'), null);
  assert.equal(parseDiscount('{"percentOff":0}'), null);
  assert.equal(parseDiscount("{}"), null);
  assert.equal(parseDiscount(null), null);
});

/* --------------------------------------------------------------- validation */

const good = {
  product: "template",
  template: "dental-practice",
  name: "Priya Shah",
  email: "priya@example.com",
};

test("a valid order passes and is trimmed", () => {
  const r = validateOrder({ ...good, name: "  Priya Shah ", code: "flash20" }, PRODUCTS, TEMPLATE_SLUGS);
  assert.equal(r.ok, true);
  assert.equal(r.ok && r.value.name, "Priya Shah");
});

test("invalid orders say which field is wrong", () => {
  const field = (patch: object) => {
    const r = validateOrder({ ...good, ...patch }, PRODUCTS, TEMPLATE_SLUGS);
    return r.ok ? "ok" : r.field;
  };
  assert.equal(field({ product: "nope" }), "product");
  assert.equal(field({ template: "not-a-template" }), "template");
  assert.equal(field({ name: "A" }), "name");
  assert.equal(field({ email: "nope" }), "email");
  assert.equal(field({ phone: "abc" }), "phone");
  assert.equal(field({ code: "bad code!" }), "code");
  assert.equal(field({ product: "__proto__" }), "product");
});

test("an amount sent by the client is ignored", () => {
  const r = validateOrder({ ...good, amount: 1 }, PRODUCTS, TEMPLATE_SLUGS);
  assert.equal(r.ok && "amount" in r.value, false);
});

test("selection (used by /quote) needs no buyer details", () => {
  const r = validateSelection({ product: "template", template: "law-firm" }, PRODUCTS, TEMPLATE_SLUGS);
  assert.equal(r.ok, true);
});

/* ------------------------------------------------------------------- crypto */

test("HMAC-SHA256 matches the RFC 4231 test vector", async () => {
  assert.equal(
    await hmacHex("Jefe", "what do ya want for nothing?"),
    "5bdcc146bf60754e6a042426089575c75a003f089d2739839dec58b964ec3843",
  );
});

test("payment and webhook signatures verify, and reject tampering", async () => {
  const sig = await hmacHex("secret", "order_1|pay_1");
  assert.equal(await verifyPaymentSignature("order_1", "pay_1", sig, "secret"), true);
  assert.equal(await verifyPaymentSignature("order_1", "pay_2", sig, "secret"), false);
  assert.equal(await verifyPaymentSignature("order_1", "pay_1", sig, "other"), false);

  const body = '{"event":"payment.captured"}';
  const wsig = await hmacHex("whsec", body);
  assert.equal(await verifyWebhookSignature(body, wsig, "whsec"), true);
  assert.equal(await verifyWebhookSignature(body + " ", wsig, "whsec"), false);
});

test("safeEqual handles different lengths", () => {
  assert.equal(safeEqual("abc", "abc"), true);
  assert.equal(safeEqual("abc", "abcd"), false);
});

/* --------------------------------------------------------------------- mime */

test("the order email has the right headers and a decodable body", () => {
  const { subject, text } = orderEmail(
    {
      paymentId: "pay_1",
      orderId: "order_1",
      amount: 39920,
      currency: "USD",
      notes: { product: "template", template: "law-firm", buyer_name: "Priya", buyer_email: "p@example.com", code: "FLASH20", list_amount: "49900" },
    },
    now,
  );
  assert.match(subject, /New order from Priya: USD 399\.20/);
  assert.match(text, /FLASH20 \(list price USD 499\.00\)/);

  const raw = buildMessage({
    from: "Website orders <payments@nowmagnate.com>",
    to: "orders@nowmagnate.com",
    subject: subject + "\r\nBcc: evil@example.com",
    text,
    date: now,
    messageIdDomain: "nowmagnate.com",
  });
  assert.match(raw, /^To: orders@nowmagnate\.com\r$/m);
  assert.doesNotMatch(raw, /^Bcc:/m);
  const body = raw.split("\r\n\r\n")[1].replace(/\r\n/g, "");
  assert.equal(Buffer.from(body, "base64").toString("utf8").trim(), text);
});
