import type { Product } from "./products.ts";

export type OrderInput = {
  product: string;
  template?: string;
  name: string;
  email: string;
  phone?: string;
  code?: string;
  turnstileToken?: string;
};

export type Checked<T> = { ok: true; value: T } | { ok: false; field: string; message: string };

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const CODE = /^[A-Za-z0-9_-]{2,40}$/;
const PHONE = /^[0-9+()\-.\s]{6,24}$/;

function text(v: unknown): string {
  return typeof v === "string" ? v.trim() : "";
}

/** The part of an order that names what is being bought. Also used by /quote. */
export function validateSelection(
  body: unknown,
  products: Record<string, Product>,
  templateSlugs: readonly string[],
): Checked<{ product: string; template?: string; code?: string }> {
  if (!body || typeof body !== "object") {
    return { ok: false, field: "body", message: "Send a JSON object." };
  }
  const b = body as Record<string, unknown>;

  const product = text(b.product);
  if (!Object.hasOwn(products, product)) {
    return { ok: false, field: "product", message: "Unknown product." };
  }

  const template = text(b.template);
  if (products[product].requiresTemplate) {
    if (!templateSlugs.includes(template)) {
      return { ok: false, field: "template", message: "Choose one of the templates." };
    }
  }

  const code = text(b.code);
  if (code && !CODE.test(code)) {
    return { ok: false, field: "code", message: "That code does not look right." };
  }

  return {
    ok: true,
    value: {
      product,
      ...(template ? { template } : {}),
      ...(code ? { code } : {}),
    },
  };
}

export function validateOrder(
  body: unknown,
  products: Record<string, Product>,
  templateSlugs: readonly string[],
): Checked<OrderInput> {
  const selection = validateSelection(body, products, templateSlugs);
  if (!selection.ok) return selection;
  const b = body as Record<string, unknown>;

  const name = text(b.name);
  if (name.length < 2 || name.length > 120) {
    return { ok: false, field: "name", message: "Enter your full name." };
  }

  const email = text(b.email);
  if (email.length > 254 || !EMAIL.test(email)) {
    return { ok: false, field: "email", message: "Enter a valid email address." };
  }

  const phone = text(b.phone);
  if (phone && !PHONE.test(phone)) {
    return { ok: false, field: "phone", message: "Enter a valid phone number." };
  }

  const token = text(b.turnstileToken);
  if (token.length > 2048) {
    return { ok: false, field: "turnstileToken", message: "Invalid check." };
  }

  return {
    ok: true,
    value: {
      ...selection.value,
      name,
      email,
      ...(phone ? { phone } : {}),
      ...(token ? { turnstileToken: token } : {}),
    },
  };
}
