import type { Product } from "./products.ts";

/**
 * Discount codes. Each lives in the KV namespace as `code:<CODE>` (upper case)
 * and can be added, changed or removed at any time without a deploy:
 *
 *   npx wrangler kv key put --binding STORE "code:FLASH20" '{"percentOff":20}'
 *
 * Exactly one of `percentOff`, `amountOff` or `finalAmount` sets the effect.
 * Amounts are cents. Everything else is optional.
 */
export type DiscountRecord = {
  /** 1 to 99. */
  percentOff?: number;
  /** Cents taken off the list price. */
  amountOff?: number;
  /** The price in cents, whatever the list price is. */
  finalAmount?: number;
  /** ISO timestamps. */
  startsAt?: string;
  expiresAt?: string;
  /** Stop accepting after this many paid orders (counted when payment lands). */
  maxRedemptions?: number;
  /** Limit to these product ids. Empty or missing means all. */
  products?: string[];
  /** Shown to the buyer, e.g. "Flash sale". */
  label?: string;
};

export function parseDiscount(raw: string | null): DiscountRecord | null {
  if (!raw) return null;
  let data: unknown;
  try {
    data = JSON.parse(raw);
  } catch {
    return null;
  }
  if (!data || typeof data !== "object") return null;
  const d = data as Record<string, unknown>;

  const num = (v: unknown) => (typeof v === "number" && Number.isFinite(v) ? v : undefined);
  const str = (v: unknown) => (typeof v === "string" && v.length > 0 ? v : undefined);

  const record: DiscountRecord = {
    percentOff: num(d.percentOff),
    amountOff: num(d.amountOff),
    finalAmount: num(d.finalAmount),
    startsAt: str(d.startsAt),
    expiresAt: str(d.expiresAt),
    maxRedemptions: num(d.maxRedemptions),
    label: str(d.label),
    products: Array.isArray(d.products)
      ? d.products.filter((p): p is string => typeof p === "string")
      : undefined,
  };

  // Exactly one effect, and a sensible value for it.
  const effects = [record.percentOff, record.amountOff, record.finalAmount].filter(
    (v) => v !== undefined,
  );
  if (effects.length !== 1) return null;
  if (record.percentOff !== undefined && !(record.percentOff >= 1 && record.percentOff <= 99))
    return null;
  if (record.amountOff !== undefined && !(record.amountOff > 0)) return null;
  if (record.finalAmount !== undefined && !(record.finalAmount > 0)) return null;
  return record;
}

export type DiscountError =
  | "unknown-code"
  | "not-started"
  | "expired"
  | "used-up"
  | "not-applicable";

export type PriceResult =
  | {
      ok: true;
      /** What the buyer pays, in cents. */
      amount: number;
      /** The list price, in cents. */
      listAmount: number;
      currency: string;
      discount?: { code: string; label: string; off: number };
    }
  | { ok: false; error: DiscountError };

export function normalizeCode(code: string | undefined): string {
  return (code ?? "").trim().toUpperCase();
}

/**
 * The one place a price is decided. `record` is the parsed KV entry for the
 * code (null when there is none), `used` the paid-order count so far.
 */
export function priceFor(args: {
  productId: string;
  product: Product;
  code?: string;
  record?: DiscountRecord | null;
  used?: number;
  now: Date;
}): PriceResult {
  const { productId, product, now } = args;
  const code = normalizeCode(args.code);
  const base = { listAmount: product.amount, currency: product.currency };

  if (!code) return { ok: true, amount: product.amount, ...base };

  const rec = args.record;
  if (!rec) return { ok: false, error: "unknown-code" };

  if (rec.startsAt && now < new Date(rec.startsAt)) return { ok: false, error: "not-started" };
  if (rec.expiresAt && now >= new Date(rec.expiresAt)) return { ok: false, error: "expired" };
  if (rec.maxRedemptions !== undefined && (args.used ?? 0) >= rec.maxRedemptions)
    return { ok: false, error: "used-up" };
  if (rec.products && rec.products.length > 0 && !rec.products.includes(productId))
    return { ok: false, error: "not-applicable" };

  let amount = product.amount;
  if (rec.percentOff !== undefined) amount = Math.round((product.amount * (100 - rec.percentOff)) / 100);
  else if (rec.amountOff !== undefined) amount = product.amount - Math.round(rec.amountOff);
  else if (rec.finalAmount !== undefined) amount = Math.round(rec.finalAmount);

  // Never below the product's floor, and never above the list price.
  amount = Math.max(product.minAmount, Math.min(product.amount, amount));

  return {
    ok: true,
    amount,
    ...base,
    discount: { code, label: rec.label ?? "Discount", off: product.amount - amount },
  };
}
