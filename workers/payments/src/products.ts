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
  /** List price, in cents. */
  amount: number;
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
    amount: 49900,
    minAmount: 100,
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
