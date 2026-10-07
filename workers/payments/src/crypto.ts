/** HMAC-SHA256 as lower-case hex, using the Web Crypto API (Workers and Node 20+). */
export async function hmacHex(secret: string, message: string): Promise<string> {
  const enc = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw",
    enc.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const sig = await crypto.subtle.sign("HMAC", key, enc.encode(message));
  return [...new Uint8Array(sig)].map((b) => b.toString(16).padStart(2, "0")).join("");
}

/** Compares two strings without stopping at the first difference. */
export function safeEqual(a: string, b: string): boolean {
  const enc = new TextEncoder();
  const x = enc.encode(a);
  const y = enc.encode(b);
  if (x.length !== y.length) return false;
  let diff = 0;
  for (let i = 0; i < x.length; i++) diff |= x[i] ^ y[i];
  return diff === 0;
}

/** Razorpay's checkout signature: HMAC_SHA256(order_id + "|" + payment_id, key_secret). */
export async function verifyPaymentSignature(
  orderId: string,
  paymentId: string,
  signature: string,
  keySecret: string,
): Promise<boolean> {
  const expected = await hmacHex(keySecret, `${orderId}|${paymentId}`);
  return safeEqual(expected, signature);
}

/** Razorpay's webhook signature: HMAC_SHA256(raw request body, webhook_secret). */
export async function verifyWebhookSignature(
  rawBody: string,
  signature: string,
  webhookSecret: string,
): Promise<boolean> {
  const expected = await hmacHex(webhookSecret, rawBody);
  return safeEqual(expected, signature);
}
