/** The slice of Cloudflare's KV API this Worker uses (keeps the logic testable in plain Node). */
export interface KV {
  get(key: string): Promise<string | null>;
  put(key: string, value: string, options?: { expirationTtl?: number }): Promise<void>;
}

export interface Env {
  /** KV namespace: discount codes (`code:<CODE>`), usage counts, paid-payment markers. */
  STORE: KV;
  /** Email Routing `send_email` binding. Only touched in index.ts. */
  SEND_EMAIL: unknown;

  /** Public by design (it is sent to the browser). */
  RAZORPAY_KEY_ID: string;
  /** Secrets: set with `wrangler secret put`, never committed. */
  RAZORPAY_KEY_SECRET: string;
  RAZORPAY_WEBHOOK_SECRET: string;
  /** Optional. When set, /orders requires a solved Cloudflare Turnstile check. */
  TURNSTILE_SECRET?: string;

  /** Comma-separated list of origins allowed to call the browser endpoints. */
  ALLOWED_ORIGINS: string;
  /** Where the payment email is really delivered (a verified Email Routing destination). */
  OWNER_INBOX: string;
  /** What shows in the To header, so a mail filter can match it. */
  ORDERS_ADDRESS: string;
  /** Sender. Must be on the domain that has Email Routing enabled. */
  FROM_ADDRESS: string;
}

export interface Deps {
  fetch: typeof fetch;
  now: () => Date;
  sendMail: (from: string, envelopeTo: string, raw: string) => Promise<void>;
}
