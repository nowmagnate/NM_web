/**
 * Payments, gated behind an env var.
 *
 * HOW A PAYMENT WORKS. This site is a static export on Firebase's free tier,
 * so it cannot hold a payment secret. A small separate Cloudflare Worker
 * (workers/payments) does the parts that need one: it decides the amount from
 * its own price list, creates the Razorpay order, verifies the result and
 * emails the owner. The browser only asks it for a quote or an order and then
 * opens Razorpay Checkout, so nothing secret and no amount is ever trusted from
 * here.
 *
 * WHY STANDARD CHECKOUT AND NOT A PAYMENT LINK. One Razorpay account serves
 * more than one product, and hosted links and pages show the account's brand
 * name. Checkout takes the name to display per payment, so this site's payments
 * say who is actually being paid.
 *
 * OFF (no NEXT_PUBLIC_PAYMENTS_API_URL): the template pages fall back to the
 * brief-request flow and label online checkout as coming soon. No disabled
 * buttons, no dead ends.
 *
 * BUILD-TIME, NOT RUNTIME: NEXT_PUBLIC_* values are inlined by Next during
 * `next build`. Setting the env var requires a rebuild and redeploy.
 */

const apiUrl = (process.env.NEXT_PUBLIC_PAYMENTS_API_URL ?? "").trim().replace(/\/+$/, "");

/** Base URL of the payments Worker, e.g. https://pay.example.com. Empty when payments are off. */
export const paymentsApiUrl: string = apiUrl.startsWith("https://") ? apiUrl : "";

/** True only for a well-formed https URL, so a stray value cannot half-enable checkout. */
export const paymentsEnabled: boolean = paymentsApiUrl.length > 0;

/**
 * Cloudflare Turnstile site key (public by design). When set, the checkout form
 * shows the bot check and the Worker must have TURNSTILE_SECRET set to match.
 */
export const turnstileSiteKey: string = (process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ?? "").trim();
