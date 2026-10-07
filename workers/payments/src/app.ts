import { PRODUCTS, TEMPLATE_SLUGS } from "./products.ts";
import { normalizeCode, parseDiscount, priceFor, type PriceResult } from "./pricing.ts";
import { validateOrder, validateSelection } from "./validate.ts";
import { verifyPaymentSignature, verifyWebhookSignature } from "./crypto.ts";
import { buildMessage, orderEmail } from "./mime.ts";
import {
  RazorpayError,
  createOrder,
  getOrder,
  getPayment,
  notesOf,
  type Creds,
} from "./razorpay.ts";
import type { Deps, Env } from "./types.ts";

const MAX_BODY = 10_000;
const PAID_TTL = 60 * 60 * 24 * 90;
const PAID_STATUSES = new Set(["captured", "authorized"]);

/* ------------------------------------------------------------------ helpers */

function allowedOrigins(env: Env): string[] {
  return env.ALLOWED_ORIGINS.split(",")
    .map((s) => s.trim())
    .filter(Boolean);
}

function corsHeaders(origin: string | null, env: Env): Record<string, string> | null {
  if (!origin || !allowedOrigins(env).includes(origin)) return null;
  return {
    "Access-Control-Allow-Origin": origin,
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Max-Age": "86400",
    Vary: "Origin",
  };
}

function json(data: unknown, status: number, extra: Record<string, string> = {}): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json", "Cache-Control": "no-store", ...extra },
  });
}

async function readText(req: Request): Promise<string | null> {
  const text = await req.text();
  return text.length > MAX_BODY ? null : text;
}

async function readJson(req: Request): Promise<unknown | undefined> {
  const text = await readText(req);
  if (text === null) return undefined;
  try {
    return JSON.parse(text);
  } catch {
    return undefined;
  }
}

const creds = (env: Env): Creds => ({
  keyId: env.RAZORPAY_KEY_ID,
  keySecret: env.RAZORPAY_KEY_SECRET,
});

const DISCOUNT_MESSAGES: Record<string, string> = {
  "unknown-code": "That code is not valid.",
  "not-started": "That code is not active yet.",
  expired: "That code has expired.",
  "used-up": "That code has been fully used.",
  "not-applicable": "That code does not apply to this item.",
};

/** Looks the code up in KV and prices the selection. The only pricing entry point. */
async function quote(
  env: Env,
  deps: Deps,
  sel: { product: string; template?: string; code?: string },
): Promise<PriceResult> {
  const code = normalizeCode(sel.code);
  let record = null;
  let used = 0;
  if (code) {
    record = parseDiscount(await env.STORE.get(`code:${code}`));
    used = Number((await env.STORE.get(`used:${code}`)) ?? 0) || 0;
  }
  return priceFor({
    productId: sel.product,
    product: PRODUCTS[sel.product],
    code,
    record,
    used,
    now: deps.now(),
  });
}

async function turnstileOk(env: Env, deps: Deps, token: string | undefined, ip: string | null) {
  if (!env.TURNSTILE_SECRET) return true;
  if (!token) return false;
  const form = new URLSearchParams({ secret: env.TURNSTILE_SECRET, response: token });
  if (ip) form.set("remoteip", ip);
  const res = await deps.fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
    method: "POST",
    body: form,
  });
  const data = (await res.json().catch(() => ({}))) as { success?: boolean };
  return data.success === true;
}

/* ----------------------------------------------------------------- handlers */

async function handleQuote(req: Request, env: Env, deps: Deps, cors: Record<string, string>) {
  const body = await readJson(req);
  const sel = validateSelection(body, PRODUCTS, TEMPLATE_SLUGS);
  if (!sel.ok) return json({ ok: false, error: "invalid", field: sel.field, message: sel.message }, 422, cors);

  const price = await quote(env, deps, sel.value);
  if (!price.ok) {
    return json({ ok: false, error: price.error, message: DISCOUNT_MESSAGES[price.error] }, 422, cors);
  }
  return json({ ...price }, 200, cors);
}

async function handleOrder(req: Request, env: Env, deps: Deps, cors: Record<string, string>) {
  const body = await readJson(req);
  const order = validateOrder(body, PRODUCTS, TEMPLATE_SLUGS);
  if (!order.ok) {
    return json({ ok: false, error: "invalid", field: order.field, message: order.message }, 422, cors);
  }
  const o = order.value;

  const human = await turnstileOk(env, deps, o.turnstileToken, req.headers.get("CF-Connecting-IP"));
  if (!human) {
    return json({ ok: false, error: "captcha", message: "Please complete the check and try again." }, 403, cors);
  }

  const price = await quote(env, deps, o);
  if (!price.ok) {
    return json({ ok: false, error: price.error, message: DISCOUNT_MESSAGES[price.error] }, 422, cors);
  }

  const product = PRODUCTS[o.product];
  const notes: Record<string, string> = {
    product: o.product,
    buyer_name: o.name,
    buyer_email: o.email,
    list_amount: String(price.listAmount),
  };
  if (o.template) notes.template = o.template;
  if (o.phone) notes.buyer_phone = o.phone;
  if (price.discount) notes.code = price.discount.code;

  try {
    const created = await createOrder(creds(env), deps.fetch, {
      amount: price.amount,
      currency: price.currency,
      receipt: `nm_${deps.now().getTime().toString(36)}_${crypto.randomUUID().slice(0, 8)}`,
      notes,
    });
    return json(
      {
        ok: true,
        orderId: created.id,
        amount: created.amount,
        currency: created.currency,
        keyId: env.RAZORPAY_KEY_ID,
        title: product.title,
        description: product.description,
        ...(price.discount ? { discount: price.discount } : {}),
      },
      200,
      cors,
    );
  } catch (e) {
    const status = e instanceof RazorpayError ? e.status : 0;
    console.error("order create failed", status);
    return json({ ok: false, error: "gateway", message: "Could not start the payment. Please try again." }, 502, cors);
  }
}

/**
 * Sends the "new order" email once per payment. Called from both /verify and
 * the webhook, so a late or missing webhook cannot lose the notification;
 * `paid:<id>` keeps it to one email in the normal case.
 */
async function notifyPaid(env: Env, deps: Deps, paymentId: string): Promise<boolean> {
  if (await env.STORE.get(`paid:${paymentId}`)) return false;

  const payment = await getPayment(creds(env), deps.fetch, paymentId);
  if (!PAID_STATUSES.has(payment.status) || !payment.order_id) return false;
  const order = await getOrder(creds(env), deps.fetch, payment.order_id);
  const notes = notesOf(order);

  const now = deps.now();
  const { subject, text } = orderEmail(
    {
      paymentId: payment.id,
      orderId: order.id,
      amount: payment.amount,
      currency: payment.currency,
      method: payment.method,
      email: payment.email,
      contact: payment.contact,
      notes,
    },
    now,
  );
  const raw = buildMessage({
    from: `Website orders <${env.FROM_ADDRESS}>`,
    to: env.ORDERS_ADDRESS,
    subject,
    text,
    date: now,
    messageIdDomain: env.FROM_ADDRESS.split("@")[1] ?? "example.com",
  });
  await deps.sendMail(env.FROM_ADDRESS, env.OWNER_INBOX, raw);

  await env.STORE.put(`paid:${paymentId}`, now.toISOString(), { expirationTtl: PAID_TTL });
  if (notes.code) {
    const key = `used:${normalizeCode(notes.code)}`;
    const used = Number((await env.STORE.get(key)) ?? 0) || 0;
    await env.STORE.put(key, String(used + 1));
  }
  return true;
}

async function handleVerify(req: Request, env: Env, deps: Deps, cors: Record<string, string>) {
  const body = (await readJson(req)) as Record<string, unknown> | undefined;
  const orderId = typeof body?.orderId === "string" ? body.orderId : "";
  const paymentId = typeof body?.paymentId === "string" ? body.paymentId : "";
  const signature = typeof body?.signature === "string" ? body.signature : "";
  if (!orderId || !paymentId || !signature) {
    return json({ ok: false, error: "invalid", message: "Missing payment details." }, 422, cors);
  }

  if (!(await verifyPaymentSignature(orderId, paymentId, signature, env.RAZORPAY_KEY_SECRET))) {
    return json({ ok: false, error: "signature", message: "Payment could not be verified." }, 400, cors);
  }

  try {
    const payment = await getPayment(creds(env), deps.fetch, paymentId);
    const order = await getOrder(creds(env), deps.fetch, orderId);
    const matches =
      payment.order_id === orderId &&
      payment.amount === order.amount &&
      payment.currency === order.currency &&
      PAID_STATUSES.has(payment.status);
    if (!matches) {
      return json({ ok: false, error: "mismatch", message: "Payment could not be verified." }, 400, cors);
    }
    // Best effort: the webhook is the main path, this just covers a late one.
    await notifyPaid(env, deps, paymentId).catch((e) => console.error("notify failed", e));
    return json({ ok: true, orderId, paymentId }, 200, cors);
  } catch {
    return json({ ok: false, error: "gateway", message: "Could not confirm the payment yet." }, 502, cors);
  }
}

async function handleWebhook(req: Request, env: Env, deps: Deps) {
  const raw = await readText(req);
  const signature = req.headers.get("X-Razorpay-Signature") ?? "";
  if (raw === null || !signature) return json({ ok: false }, 400);
  if (!(await verifyWebhookSignature(raw, signature, env.RAZORPAY_WEBHOOK_SECRET))) {
    return json({ ok: false }, 400);
  }

  let event: { event?: string; payload?: { payment?: { entity?: { id?: string } } } };
  try {
    event = JSON.parse(raw);
  } catch {
    return json({ ok: false }, 400);
  }

  const paymentId = event.payload?.payment?.entity?.id;
  if ((event.event === "payment.captured" || event.event === "order.paid") && paymentId) {
    try {
      await notifyPaid(env, deps, paymentId);
    } catch (e) {
      // A non-2xx makes Razorpay retry, which is what we want if the email failed.
      console.error("webhook notify failed", e);
      return json({ ok: false }, 500);
    }
  }
  // Every other event is acknowledged and ignored.
  return json({ ok: true }, 200);
}

/* ------------------------------------------------------------------- router */

export async function handle(req: Request, env: Env, deps: Deps): Promise<Response> {
  const url = new URL(req.url);
  const path = url.pathname.replace(/\/+$/, "") || "/";
  const origin = req.headers.get("Origin");

  if (path === "/health" && req.method === "GET") return json({ ok: true }, 200);

  // Razorpay calls the webhook server to server: no Origin, no CORS.
  if (path === "/webhook") {
    return req.method === "POST" ? handleWebhook(req, env, deps) : json({ ok: false }, 405);
  }

  const cors = corsHeaders(origin, env);
  if (req.method === "OPTIONS") {
    return cors ? new Response(null, { status: 204, headers: cors }) : new Response(null, { status: 403 });
  }
  // Browser endpoints only answer the site's own origins.
  if (!cors) return json({ ok: false, error: "origin", message: "Not allowed." }, 403);

  if (req.method !== "POST") return json({ ok: false, error: "method" }, 405, cors);

  try {
    if (path === "/quote") return await handleQuote(req, env, deps, cors);
    if (path === "/orders") return await handleOrder(req, env, deps, cors);
    if (path === "/verify") return await handleVerify(req, env, deps, cors);
  } catch (e) {
    console.error("unhandled", e);
    return json({ ok: false, error: "server", message: "Something went wrong." }, 500, cors);
  }
  return json({ ok: false, error: "not-found" }, 404, cors);
}
