import { Button } from "@/components/ui/Button";
import { paymentsEnabled, checkoutUrl } from "@/config/payments";
import { formattedTemplatePrice } from "@/config/brand";

/**
 * The template detail page's primary action. Two states, one component, no
 * disabled buttons in either.
 *
 * OFF (no NEXT_PUBLIC_STRIPE_PAYMENT_LINK): the primary action is a brief
 * request, with a plain-text line explaining checkout is on its way. This is
 * the state until the business is registered with Stripe.
 *
 * ON: the primary action goes straight to the Stripe Payment Link with
 * `client_reference_id` set to the template slug, so a payment can be matched
 * back to what was bought. The brief becomes the secondary path, for someone
 * who wants to ask a question before paying.
 *
 * Reminder for whoever flips the switch: `NEXT_PUBLIC_STRIPE_PAYMENT_LINK` is
 * inlined at build time. Setting it requires a rebuild and redeploy, not just
 * an environment change on a running server.
 */
export function PaymentCTA({ templateSlug }: { templateSlug: string }) {
  const url = checkoutUrl(templateSlug);

  if (paymentsEnabled && url) {
    return (
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <Button href={url} external size="lg">
          Get started · {formattedTemplatePrice()}
        </Button>
        <Button href={`/brief?template=${templateSlug}`} size="lg" variant="text">
          Ask a question first
        </Button>
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
