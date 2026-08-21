/**
 * Stripe, gated behind an env var.
 *
 * WHY A PAYMENT LINK AND NOT A CHECKOUT SESSION
 * Checkout Sessions need a server to hold the Stripe secret key. This site is
 * a static export on Firebase's free tier, so there is no server. A Payment
 * Link is a static URL created in the Stripe dashboard: safe to embed, no
 * secret key in the bundle, and it carries `client_reference_id` so each
 * payment records which template it came from.
 *
 * The link stays empty until the business is registered with Stripe. While it
 * is empty the template pages fall back to the brief-request flow and label
 * online checkout as coming soon. No disabled buttons, no dead ends.
 *
 * BUILD-TIME, NOT RUNTIME: NEXT_PUBLIC_* values are inlined by Next during
 * `next build`. Setting the env var requires a rebuild and redeploy.
 *
 * UPGRADE PATH: when the project moves to the Blaze plan, replace the body of
 * `checkoutUrl` with a call that creates a real Checkout Session. Nothing
 * outside this file and `PaymentCTA` needs to change.
 */

const paymentLink = process.env.NEXT_PUBLIC_STRIPE_PAYMENT_LINK?.trim() ?? "";

/** True only for a well-formed https Stripe link, so a stray value cannot half-enable checkout. */
export const paymentsEnabled: boolean =
  paymentLink.length > 0 && paymentLink.startsWith("https://");

/**
 * Builds the checkout URL for a given template.
 *
 * `client_reference_id` shows up on the Stripe payment record, which is how an
 * incoming payment is matched to the template the customer actually picked.
 * Returns null when payments are off, so callers must handle the disabled
 * state explicitly rather than rendering a broken link.
 */
export function checkoutUrl(
  templateSlug: string,
  prefilledEmail?: string,
): string | null {
  if (!paymentsEnabled) return null;

  const url = new URL(paymentLink);
  url.searchParams.set("client_reference_id", templateSlug);
  if (prefilledEmail) url.searchParams.set("prefilled_email", prefilledEmail);
  return url.toString();
}
