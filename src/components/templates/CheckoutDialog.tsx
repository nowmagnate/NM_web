"use client";

import { useCallback, useEffect, useRef, useState, type FormEvent } from "react";
import { Field, Input } from "@/components/ui/Field";
import { Button } from "@/components/ui/Button";
import { Turnstile } from "@/components/forms/Turnstile";
import { brand } from "@/config/brand";
import { PARENT_MARK } from "@/components/brand/Logo";
import { siteUrl } from "@/config/site";
import { turnstileSiteKey } from "@/config/payments";
import { getTemplate } from "@/data/templates";
import {
  createOrder,
  formatMoney,
  getQuote,
  isError,
  loadRazorpay,
  openCheckout,
  verifyPayment,
  type Quote,
} from "@/lib/checkout";

/**
 * Collects who is paying, then hands over to Razorpay Checkout.
 *
 * The amount shown here is whatever the payments Worker last quoted. It is
 * only a display: the order is priced again on the server from the product and
 * the discount code, so changing anything in this page cannot change what is
 * charged.
 */

const PRODUCT = "template";

/** The site's own accent, read from its CSS token so no colour is hard-coded here. */
function themeColor(): string | undefined {
  const v = getComputedStyle(document.documentElement).getPropertyValue("--spec-3").trim();
  return v || undefined;
}
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

type Status = "idle" | "starting" | "paying" | "confirming";

export function CheckoutDialog({
  templateSlug,
  open,
  onClose,
  initialCode,
  initialQuote,
}: {
  templateSlug: string;
  open: boolean;
  onClose: () => void;
  initialCode?: string;
  initialQuote?: Quote | null;
}) {
  const dialog = useRef<HTMLDialogElement>(null);
  const template = getTemplate(templateSlug);

  /**
   * A modal <dialog> lives in the browser's top layer, which nothing can be
   * drawn above, including Razorpay's payment window. So while Razorpay is
   * open this dialog is hidden (state and typed values are kept, the component
   * stays mounted) and brought back if the payment window is closed. `hidden`
   * stops that deliberate close from also telling the parent the dialog was
   * dismissed.
   */
  const hidden = useRef(false);
  const hideDialog = () => {
    hidden.current = true;
    dialog.current?.close();
  };
  const showDialog = () => {
    hidden.current = false;
    if (dialog.current && !dialog.current.open) dialog.current.showModal();
  };

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [codeInput, setCodeInput] = useState(initialCode ?? "");
  const [appliedCode, setAppliedCode] = useState(initialQuote?.discount ? initialCode : undefined);
  const [quote, setQuote] = useState<Quote | null>(initialQuote ?? null);
  const [codeMessage, setCodeMessage] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formError, setFormError] = useState<string | null>(null);
  const [status, setStatus] = useState<Status>("idle");
  const [token, setToken] = useState<string | null>(null);
  const [nonce, setNonce] = useState(0);
  const onToken = useCallback((t: string | null) => setToken(t), []);

  // Mirror the `open` prop onto the native dialog.
  useEffect(() => {
    const el = dialog.current;
    if (!el) return;
    if (open && !el.open) el.showModal();
    if (!open && el.open) el.close();
  }, [open]);

  const busy = status !== "idle";
  const price = quote ?? null;

  async function applyCode() {
    const code = codeInput.trim();
    setCodeMessage(null);
    if (!code) {
      setAppliedCode(undefined);
      setQuote(null);
      return;
    }
    const r = await getQuote({ product: PRODUCT, template: templateSlug, code });
    if (isError(r)) {
      setAppliedCode(undefined);
      setQuote(null);
      setCodeMessage(r.message);
      return;
    }
    setAppliedCode(code);
    setQuote(r);
    setCodeMessage(`${r.discount?.label ?? "Discount"} applied.`);
  }

  async function submit(e: FormEvent) {
    e.preventDefault();
    setFormError(null);

    const next: Record<string, string> = {};
    if (name.trim().length < 2) next.name = "Enter your full name.";
    if (!EMAIL.test(email.trim())) next.email = "Enter a valid email address.";
    setErrors(next);
    if (Object.keys(next).length > 0) return;
    if (turnstileSiteKey && !token) {
      setFormError("Please complete the check above, then try again.");
      return;
    }

    setStatus("starting");
    const order = await createOrder({
      product: PRODUCT,
      template: templateSlug,
      code: appliedCode,
      name: name.trim(),
      email: email.trim(),
      phone: phone.trim() || undefined,
      turnstileToken: token ?? undefined,
    });
    setNonce((n) => n + 1);
    setToken(null);

    if (isError(order)) {
      setStatus("idle");
      if (order.field && order.field !== "body") setErrors({ [order.field]: order.message });
      else setFormError(order.message);
      return;
    }

    try {
      await loadRazorpay();
    } catch {
      setStatus("idle");
      setFormError("The payment window could not load. Turn off any content blocker and try again.");
      return;
    }

    setStatus("paying");
    hideDialog();
    openCheckout(
      {
        key: order.keyId,
        order_id: order.orderId,
        amount: order.amount,
        currency: order.currency,
        // Shown at the top of the payment window. Set per payment, which is
        // why this site uses Checkout rather than a hosted link.
        name: brand.name,
        description: order.title,
        image: `${siteUrl}${PARENT_MARK}`,
        prefill: { name: name.trim(), email: email.trim(), contact: phone.trim() || undefined },
        theme: { color: themeColor() },
      },
      {
        onDismiss: () => {
          setStatus("idle");
          showDialog();
        },
        // Razorpay keeps its own window open after a failed attempt so the
        // buyer can retry there; the message is shown when they close it.
        onFailed: (message) => {
          setStatus("idle");
          setFormError(message);
        },
        onSuccess: async (r) => {
          setStatus("confirming");
          const v = await verifyPayment({
            orderId: r.razorpay_order_id,
            paymentId: r.razorpay_payment_id,
            signature: r.razorpay_signature,
          });
          if (isError(v)) {
            setStatus("idle");
            showDialog();
            setFormError(
              `Your payment went through (reference ${r.razorpay_payment_id}) but we could not confirm it on this page. ` +
                `Please email ${brand.email.enquiry} with that reference and we will sort it out.`,
            );
            return;
          }
          window.location.assign(`/thank-you/?o=${encodeURIComponent(r.razorpay_order_id)}`);
        },
      },
    );
  }

  return (
    <dialog
      ref={dialog}
      onClose={() => {
        if (!hidden.current) onClose();
      }}
      onCancel={(e) => busy && e.preventDefault()}
      className="bg-bg text-ink border-rule-strong m-auto w-[min(32rem,calc(100vw-2rem))] border p-0 backdrop:bg-black/50"
    >
      <form onSubmit={submit} noValidate className="flex flex-col gap-4 p-6 md:p-8">
        <div>
          <h2 className="font-display text-2xl leading-tight font-semibold">Get this template</h2>
          <p className="text-ink-muted mt-1 text-[15px]">
            {template ? `${template.name}, ` : ""}customized for you.
          </p>
        </div>

        <p className="font-display text-3xl font-semibold" aria-live="polite">
          {price ? (
            <>
              {formatMoney(price.amount, price.currency)}
              {price.discount ? (
                <span className="text-ink-muted ml-3 text-lg font-normal line-through">
                  {formatMoney(price.listAmount, price.currency)}
                </span>
              ) : null}
            </>
          ) : (
            <>
              {formatMoney(brand.templatePrice * 100, brand.templateCurrency)}
            </>
          )}
        </p>

        <Field id="co-name" label="Full name" required error={errors.name}>
          <Input
            id="co-name"
            name="name"
            autoComplete="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            invalid={!!errors.name}
          />
        </Field>

        <Field id="co-email" label="Email" required error={errors.email} helper="Your receipt and delivery details go here.">
          <Input
            id="co-email"
            name="email"
            type="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            invalid={!!errors.email}
          />
        </Field>

        <Field id="co-phone" label="Phone" error={errors.phone} helper="Optional.">
          <Input
            id="co-phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            invalid={!!errors.phone}
          />
        </Field>

        <div className="flex flex-col gap-2">
          <label htmlFor="co-code" className="ui-label text-ink-soft text-[11px]">
            Discount code
          </label>
          <div className="flex gap-2">
            <Input
              id="co-code"
              name="code"
              autoComplete="off"
              value={codeInput}
              onChange={(e) => setCodeInput(e.target.value)}
              className="flex-1"
            />
            <Button type="button" variant="outline" onClick={applyCode} disabled={busy}>
              Apply
            </Button>
          </div>
          <p role="status" className="text-ink-muted min-h-[1.25rem] text-[13px]">
            {codeMessage}
          </p>
        </div>

        {turnstileSiteKey ? (
          <Turnstile siteKey={turnstileSiteKey} onToken={onToken} nonce={nonce} />
        ) : null}

        {formError ? (
          <p role="alert" className="bg-danger-wash text-danger border-danger/30 border px-4 py-3 text-sm">
            {formError}
          </p>
        ) : null}

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <Button type="submit" size="lg" loading={busy}>
            {status === "confirming" ? "Confirming payment" : "Continue to payment"}
          </Button>
          <Button type="button" variant="text" onClick={onClose} disabled={busy}>
            Cancel
          </Button>
        </div>

        <p className="text-ink-muted text-[13px]">
          Payments are processed securely by Razorpay. Read our{" "}
          <a href="/legal/refund-policy/" className="underline">
            refund policy
          </a>
          .
        </p>
      </form>
    </dialog>
  );
}
