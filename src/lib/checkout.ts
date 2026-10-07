"use client";

import { paymentsApiUrl } from "@/config/payments";

/**
 * Browser side of checkout: talks to the payments Worker and to Razorpay's
 * Checkout script. No amounts are sent to the Worker, only what is being
 * bought and an optional discount code; the Worker answers with the price.
 */

export type Selection = { product: string; template?: string; code?: string };

export type Quote = {
  amount: number;
  listAmount: number;
  currency: string;
  discount?: { code: string; label: string; off: number };
};

export type OrderResponse = {
  orderId: string;
  amount: number;
  currency: string;
  keyId: string;
  title: string;
  description: string;
};

export type ApiError = { message: string; field?: string };

async function post<T>(path: string, body: unknown): Promise<T | ApiError> {
  try {
    const res = await fetch(`${paymentsApiUrl}${path}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    const data = (await res.json()) as T & { ok?: boolean; message?: string; field?: string };
    if (res.ok && data.ok) return data;
    return { message: data.message ?? "Something went wrong.", field: data.field };
  } catch {
    return { message: "Could not reach the payment service. Check your connection and try again." };
  }
}

export const isError = (r: unknown): r is ApiError =>
  typeof r === "object" && r !== null && "message" in r && !("amount" in r) && !("orderId" in r);

export const getQuote = (sel: Selection) => post<Quote>("/quote", sel);

export const createOrder = (
  sel: Selection & { name: string; email: string; phone?: string; turnstileToken?: string },
) => post<OrderResponse>("/orders", sel);

export const verifyPayment = (v: { orderId: string; paymentId: string; signature: string }) =>
  post<{ orderId: string; paymentId: string }>("/verify", v);

export function formatMoney(cents: number, currency: string): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    minimumFractionDigits: cents % 100 === 0 ? 0 : 2,
    maximumFractionDigits: 2,
  }).format(cents / 100);
}

/* ----------------------------------------------------------- Razorpay script */

export type RazorpaySuccess = {
  razorpay_payment_id: string;
  razorpay_order_id: string;
  razorpay_signature: string;
};

type RazorpayOptions = {
  key: string;
  order_id: string;
  amount: number;
  currency: string;
  name: string;
  description: string;
  image?: string;
  prefill?: { name?: string; email?: string; contact?: string };
  theme?: { color?: string };
  handler: (r: RazorpaySuccess) => void;
  modal?: { ondismiss?: () => void };
};

declare global {
  interface Window {
    Razorpay?: new (options: RazorpayOptions) => {
      open: () => void;
      on: (event: "payment.failed", cb: (r: { error?: { description?: string } }) => void) => void;
    };
  }
}

const SCRIPT = "https://checkout.razorpay.com/v1/checkout.js";
let loading: Promise<void> | null = null;

export function loadRazorpay(): Promise<void> {
  if (window.Razorpay) return Promise.resolve();
  if (!loading) {
    loading = new Promise<void>((resolve, reject) => {
      const s = document.createElement("script");
      s.src = SCRIPT;
      s.async = true;
      s.onload = () => resolve();
      s.onerror = () => {
        loading = null;
        reject(new Error("Razorpay failed to load"));
      };
      document.head.appendChild(s);
    });
  }
  return loading;
}

export function openCheckout(
  options: Omit<RazorpayOptions, "handler" | "modal">,
  callbacks: {
    onSuccess: (r: RazorpaySuccess) => void;
    onDismiss: () => void;
    onFailed: (message: string) => void;
  },
) {
  if (!window.Razorpay) throw new Error("Razorpay is not loaded");
  const rzp = new window.Razorpay({
    ...options,
    handler: callbacks.onSuccess,
    modal: { ondismiss: callbacks.onDismiss },
  });
  rzp.on("payment.failed", (r) =>
    callbacks.onFailed(r.error?.description ?? "The payment did not go through."),
  );
  rzp.open();
}
