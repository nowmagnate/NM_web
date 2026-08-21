import { brand, formattedTemplatePrice } from "@/config/brand";

/**
 * The $499 offer definition.
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

export const offer = {
  price: formattedTemplatePrice(),
  priceValue: brand.templatePrice,
  currency: brand.templateCurrency,
  billing: "One-time. No subscription, no recurring fee.",

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
  ],

  /**
   * The exclusions matter more than the inclusions. An unhappy $499 customer
   * is almost always someone who assumed one of these was part of the deal.
   */
  notIncluded: [
    "Custom design from scratch",
    "Ecommerce or online payments",
    "Booking, scheduling or patient-intake systems",
    "Copywriting",
    "Photography or stock image licensing",
    "Multi-language versions",
    "Ongoing hosting, maintenance or content updates",
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
