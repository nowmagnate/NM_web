import { brand, formattedStandardPrice, formattedTemplatePrice } from "@/config/brand";

/**
 * The template offer definition (standard price and the dated festive offer).
 *
 * THIS IS A COMMERCIAL COMMITMENT. Everything below renders verbatim on
 * /templates, every template detail page, /pricing and /brief. The turnaround
 * and the inclusion list are what a customer will hold you to.
 *
 * Read it end to end before launch and edit anything you would not want to
 * honour on a bad week.
 *
 * Defined once here so the four places it appears can never drift apart, which
 * is how a business ends up promising 5 days on one page and 10 on another.
 */

/** Declared separately so `steps` below can reference it without self-reference. */
const TURNAROUND = "5 to 7 business days";

/**
 * Launch promotion. Valid for orders placed on or before this date, to the end
 * of that calendar day in every country we sell to.
 * The wording on the site is date-stamped, so a stale page after this date is
 * merely out of date, never untrue. Remove `promo` and its two entries in
 * `included` when it ends, and have the payments Worker codes expire with it.
 */
const PROMO_ENDS = "31 December 2026";

export const offer = {
  /** The price being charged when the site is built (the festive price until it ends). */
  price: formattedTemplatePrice(),
  standardPrice: formattedStandardPrice(),
  priceValue: brand.templatePrice,
  currency: brand.templateCurrency,
  billing: "One-time. No subscription, no recurring fee.",

  promo: {
    endsOn: PROMO_ENDS,
    headline: `Domain and hosting free for 3 years, plus 1 year of maintenance cover, on orders placed by ${PROMO_ENDS}`,
    domainAndHosting:
      "We register your domain in your name and host the site for 3 years at no extra cost.",
    amc: "One year of maintenance cover: if anything on the site breaks or stops working, we fix it at no charge. New pages, new features and content changes are quoted separately.",
  },

  /**
   * Black Friday and Christmas 2026 messaging, shown by FestiveBanner.
   *
   * The prices are real and enforced: the standard price is `brand.templatePrice`
   * and the festive price is `brand.templateFestive`, which the payments Worker
   * applies automatically until the end of 31 December and then drops. Nothing
   * here may be extended past that date while the page still says the standard
   * price applies afterwards. Each stage is the last day to send logo, photos and
   * text for a site to be live before that occasion (the turnaround runs from
   * receiving them). Stages are in date order and the banner shows the first one
   * that has not passed. Keep these in step with the outreach project's STATUS.md.
   */
  festive: {
    name: "Black Friday and Christmas offer",
    endsOnIso: brand.templateFestive.endsOnIso,
    stages: [
      { lastDayIso: "2026-11-16", assetsBy: "16 November", liveBefore: "Black Friday" },
      { lastDayIso: "2026-12-10", assetsBy: "10 December", liveBefore: "Christmas" },
      { lastDayIso: "2026-12-18", assetsBy: "18 December", liveBefore: "the new year" },
    ],
  },

  turnaround: TURNAROUND,
  turnaroundNote:
    "Counted from when we have your content, images and logo, not from payment.",

  included: [
    "Your chosen template, customized to your practice",
    "Your logo, colours and photography placed throughout",
    "Up to 5 sections on a single page",
    "Contact form delivered straight to your inbox",
    "Google Maps embed with your location",
    "Mobile, tablet and desktop layouts",
    "Basic on-page SEO: page title, description and social share image",
    "Google Analytics connected",
    "One round of revisions",
    "Deployment guidance, or we deploy it for you",
    `Domain and hosting for 3 years (orders placed by ${PROMO_ENDS})`,
    `1 year of maintenance cover if anything breaks (orders placed by ${PROMO_ENDS})`,
  ],

  /**
   * The exclusions matter more than the inclusions. An unhappy customer
   * is almost always someone who assumed one of these was part of the deal.
   */
  notIncluded: [
    "Custom design from scratch",
    "Ecommerce or online payments",
    "Booking, scheduling or patient-intake systems",
    "Copywriting",
    "Photography or stock image licensing",
    "Multi-language versions",
    "New features, new pages or content updates after launch (maintenance cover is for fixes only)",
    "Domain and hosting after the included 3 years",
    "Additional revision rounds beyond the first",
  ],

  /**
   * Regulated-industry note. Several templates target medical and legal
   * practices, where the customer carries compliance obligations we are not
   * contracting to meet. Saying so plainly is cheaper than finding out later.
   */
  complianceNote:
    "Medical, dental and legal templates are marketing sites. They do not handle patient records or privileged client data, and the price does not include compliance review for HIPAA, GDPR, attorney advertising rules or any equivalent. If your site needs to collect regulated information, tell us at the brief stage and we will quote it properly.",

  whatWeNeed: [
    "Your logo, in the highest quality file you have",
    "Photographs of your practice, team or work",
    "Your text, or the existing site we should draw it from",
    "Business details: address, hours, phone, email",
    "Your domain name, or a decision to buy one",
  ],

  /** Steps shown on /brief and the template detail pages. */
  steps: [
    {
      title: "Pick a template",
      detail: "Browse the catalog and choose the one that fits your practice.",
    },
    {
      title: "Send us your details",
      detail: "One form: your business, your content and your assets.",
    },
    { title: "We build it", detail: `Customized and ready to review in ${TURNAROUND}.` },
    {
      title: "Review and launch",
      detail: "One round of changes, then it goes live on your domain.",
    },
  ],
} as const;

/**
 * Refund position. Referenced from /legal/refund-policy.
 *
 * TODO(legal): have this reviewed before taking real payments, and make sure it
 * matches whatever Stripe account and jurisdiction you register under.
 */
export const refundPosition = {
  beforeWorkStarts: "Full refund if you cancel before we begin customization.",
  afterWorkStarts:
    "Once customization has started, the fee covers work already done and is non-refundable.",
  ifWeCannotDeliver: "If we cannot deliver what was agreed, you get a full refund.",
} as const;
