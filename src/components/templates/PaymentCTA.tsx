"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";
import { CheckoutDialog } from "./CheckoutDialog";
import { paymentsEnabled } from "@/config/payments";
import { formattedTemplatePrice } from "@/config/brand";
import { formatMoney, getQuote, isError, type Quote } from "@/lib/checkout";

/**
 * The template detail page's primary action. Two states, one component, no
 * disabled buttons in either.
 *
 * OFF (no NEXT_PUBLIC_PAYMENTS_API_URL): the primary action is a brief
 * request, with a plain-text line explaining checkout is on its way.
 *
 * ON: the primary action opens the checkout dialog, which ends in Razorpay.
 * The brief becomes the secondary path, for someone who wants to ask a
 * question before paying.
 *
 * DISCOUNT LINKS. A page opened with `?code=FLASH20` asks the payments Worker
 * to price that code and shows the discounted amount on the button. The code is
 * only a request: the Worker prices the order again when it is created.
 *
 * Reminder for whoever flips the switch: NEXT_PUBLIC_PAYMENTS_API_URL is
 * inlined at build time. Setting it requires a rebuild and redeploy.
 */
export function PaymentCTA({ templateSlug }: { templateSlug: string }) {
  const [open, setOpen] = useState(false);
  const [code, setCode] = useState<string | undefined>();
  const [quote, setQuote] = useState<Quote | null>(null);

  // Always ask the Worker what the price is right now, so the button never shows
  // a price the Worker would not charge (for example after the festive offer
  // ends). A `?code=` is priced too; a code that is refused falls back to the
  // plain price.
  useEffect(() => {
    if (!paymentsEnabled) return;
    const fromUrl = new URLSearchParams(window.location.search).get("code")?.trim() || undefined;
    let cancelled = false;
    (async () => {
      let r = await getQuote({ product: "template", template: templateSlug, code: fromUrl });
      if (isError(r) && fromUrl) r = await getQuote({ product: "template", template: templateSlug });
      if (cancelled || isError(r)) return;
      if (fromUrl && r.discount) setCode(fromUrl);
      setQuote(r);
    })();
    return () => {
      cancelled = true;
    };
  }, [templateSlug]);

  if (paymentsEnabled) {
    const label = quote ? formatMoney(quote.amount, quote.currency) : formattedTemplatePrice();
    return (
      <div className="flex flex-col gap-3">
        {/* The buttons wrap rather than overflow: the column is only ~370px wide
            at a 1024px viewport and the two buttons together are wider. */}
        <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
          <Button type="button" size="lg" onClick={() => setOpen(true)}>
            Get started · {label}
            {quote?.discount ? <span className="sr-only"> (discount applied)</span> : null}
          </Button>
          <Button href={`/brief?template=${templateSlug}`} size="lg" variant="text">
            Ask a question first
          </Button>
          <CheckoutDialog
            templateSlug={templateSlug}
            open={open}
            onClose={() => setOpen(false)}
            initialCode={code}
            initialQuote={quote}
          />
        </div>
        {quote && quote.amount < quote.listAmount ? (
          <p className="text-ink-muted text-sm">
            <s>{formatMoney(quote.listAmount, quote.currency)}</s> standard price
          </p>
        ) : null}
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
      <Button href={`/brief?template=${templateSlug}`} size="lg">
        Request this template
      </Button>
      <p className="text-ink-muted text-sm">Online checkout coming soon.</p>
    </div>
  );
}
