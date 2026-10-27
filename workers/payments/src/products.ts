/**
 * What can be bought, and for how much. THIS FILE IS THE PRICE LIST.
 *
 * The browser never sends an amount. It names a product (and a template), and
 * the Worker looks the amount up here, so a buyer cannot pay less by editing
 * the page. To change a price, edit it here and redeploy.
 *
 * Amounts are in the smallest currency unit (cents for USD): 49900 = $499.00.
 *
 * `scripts/check-payments-sync.mjs` (run by `npm run verify`) fails if the
 * "template" price here stops matching `brand.templatePrice` on the website, or
 * if the template slugs below drift from `src/data/templates.ts`.
 */

export type Product = {
  title: string;
  description: string;
  currency: "USD";
  /** Standard price, in cents. */
  amount: number;
  /**
   * A dated offer price, applied automatically until `endsAt` and then gone.
   * Discount codes are worked out against whatever price is current.
   */
  festive?: { amount: number; endsAt: string };
  /** The least a discount may bring the price down to, in cents. */
  minAmount: number;
  /** The buyer must say which template they want. */
  requiresTemplate: boolean;
};

export const PRODUCTS: Record<string, Product> = {
  template: {
    title: "NowMagnate Innovations website template",
    description: "One customized template site, delivered as agreed",
    currency: "USD",
    amount: 99900,
    // Festive offer: $499 until the end of 31 December 2026 in every country we
    // sell to (23:59:59 at UTC-10). Back to the standard price automatically.
    festive: { amount: 49900, endsAt: "2027-01-01T09:59:59Z" },
    // 40% off the festive price. The outreach agent may never go lower, and this
    // is the backstop if a code is ever mis-created. Raise or lower on purpose.
    minAmount: 29900,
    requiresTemplate: true,
  },
};

/** Every template that can be ordered. Keep in step with src/data/templates.ts. */
export const TEMPLATE_SLUGS: readonly string[] = [
  "real-estate-agent",
  "interior-designer",
  "architecture-studio",
  "home-staging",
  "property-management",
  "family-practice",
  "dental-practice",
  "pediatric-clinic",
  "physiotherapy-chiropractic",
  "med-spa-aesthetics",
  "law-firm",
  "immigration-attorney",
  "accounting-bookkeeping",
  "financial-advisory",
  "therapy-counseling",
  "yoga-pilates-studio",
  "personal-training",
  "photography-studio",
  "wedding-event-planning",
  "design-consultancy",
  "custom-home-builder",
  "landscape-design-build",
  "remodeling-contractor",
  "cleaning-services",
];
