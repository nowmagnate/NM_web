const API = "https://api.razorpay.com/v1";

export type Creds = { keyId: string; keySecret: string };

export class RazorpayError extends Error {
  status: number;
  constructor(status: number, message: string) {
    super(message);
    this.status = status;
  }
}

export type RzpOrder = {
  id: string;
  amount: number;
  currency: string;
  status: string;
  notes?: Record<string, string> | unknown[];
};

export type RzpPayment = {
  id: string;
  order_id: string | null;
  amount: number;
  currency: string;
  status: string;
  method?: string;
  email?: string;
  contact?: string;
};

function authHeader(c: Creds): string {
  return `Basic ${btoa(`${c.keyId}:${c.keySecret}`)}`;
}

async function call<T>(
  c: Creds,
  f: typeof fetch,
  path: string,
  init?: { method: "POST"; body: unknown },
): Promise<T> {
  const res = await f(`${API}${path}`, {
    method: init?.method ?? "GET",
    headers: {
      Authorization: authHeader(c),
      ...(init ? { "Content-Type": "application/json" } : {}),
    },
    ...(init ? { body: JSON.stringify(init.body) } : {}),
  });
  const data = (await res.json().catch(() => ({}))) as {
    error?: { description?: string };
  } & Record<string, unknown>;
  if (!res.ok) {
    throw new RazorpayError(res.status, data.error?.description ?? `Razorpay returned ${res.status}`);
  }
  return data as T;
}

export const createOrder = (
  c: Creds,
  f: typeof fetch,
  body: {
    amount: number;
    currency: string;
    receipt: string;
    notes: Record<string, string>;
  },
) => call<RzpOrder>(c, f, "/orders", { method: "POST", body });

export const getOrder = (c: Creds, f: typeof fetch, id: string) =>
  call<RzpOrder>(c, f, `/orders/${encodeURIComponent(id)}`);

export const getPayment = (c: Creds, f: typeof fetch, id: string) =>
  call<RzpPayment>(c, f, `/payments/${encodeURIComponent(id)}`);

/** Order notes come back as an object, or as an empty array when there are none. */
export function notesOf(order: RzpOrder): Record<string, string> {
  const n = order.notes;
  return n && !Array.isArray(n) ? (n as Record<string, string>) : {};
}
