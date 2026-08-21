/**
 * The eleven capabilities, and the source of truth for /services,
 * /services/[slug] and the home page bento.
 *
 * Copy rules applied here:
 *  - `blurb` is <= 18 words. It appears in a bento cell, not an essay.
 *  - No invented metrics, no "40+ projects delivered".
 *  - `bentoSpan` and `bentoTint` are set so the grid has exactly eleven cells
 *    with real visual variation, rather than eleven identical white boxes.
 */

export type Service = {
  slug: string;
  name: string;
  /** Bento + card summary. Max 18 words. */
  blurb: string;
  /** Service page hero paragraph. Max 45 words. */
  intro: string;
  /** What the engagement actually includes. 4 to 6 items. */
  includes: string[];
  /** Typical stack. Real tools only. */
  stack: string[];
  /** Honest signal of scale, not a hard promise. */
  typicalTimeline: string;
  /** Alt text for `/services/<slug>/hero.jpg`. Describes the actual photo. */
  heroAlt: string;
  /** Grid geometry for the home page bento. */
  bentoSpan: "sm" | "md" | "lg" | "tall";
  /** Cells with a tint or image, so the grid is not all white-on-white. */
  bentoTreatment: "plain" | "tint" | "accent" | "image";
  /** Only for cells with `bentoTreatment: "image"`. */
  image?: string;
};

export const services: Service[] = [
  {
    slug: "web-applications",
    name: "Web applications",
    blurb: "Dashboards, portals and internal tools that stay fast as the data grows.",
    intro:
      "The applications a business runs on. Usually replacing a spreadsheet that outgrew itself, or a legacy tool nobody wants to touch.",
    includes: [
      "Product and interface design",
      "Frontend and backend build",
      "Authentication, roles and permissions",
      "Database design and migrations",
      "Deployment and monitoring setup",
    ],
    stack: ["React", "Next.js", "TypeScript", "Node.js", "PostgreSQL"],
    typicalTimeline: "6 to 16 weeks depending on scope",
    heroAlt: "Close-up of PHP source code on a computer monitor",
    bentoSpan: "lg",
    bentoTreatment: "image",
    image: "web-applications",
  },
  {
    slug: "mobile-apps",
    name: "Mobile apps",
    blurb: "iOS and Android from one codebase, built to pass review the first time.",
    intro:
      "Cross-platform apps where a single codebase is the right call, and native where it is not. Including the store submission work most quotes leave out.",
    includes: [
      "Cross-platform build for iOS and Android",
      "Offline behaviour and sync",
      "Push notifications",
      "App Store and Play Store submission",
      "Crash reporting and release pipeline",
    ],
    stack: ["Flutter", "React Native", "TypeScript", "Firebase"],
    typicalTimeline: "8 to 20 weeks",
    heroAlt: "A smartphone home screen full of app icons resting beside a laptop keyboard",
    bentoSpan: "md",
    bentoTreatment: "tint",
  },
  {
    slug: "saas-products",
    name: "SaaS products",
    blurb:
      "Multi-tenant products with billing, onboarding and the parts founders underestimate.",
    intro:
      "The full product, not just the feature. Tenancy, subscription billing, trials, usage limits and an admin surface you can actually operate.",
    includes: [
      "Multi-tenant architecture",
      "Subscription billing and plan logic",
      "Onboarding and trial flows",
      "Admin and support tooling",
      "Usage metering and limits",
    ],
    stack: ["Next.js", "TypeScript", "PostgreSQL", "Stripe"],
    typicalTimeline: "12 to 24 weeks to a first paying customer",
    heroAlt: "Three people looking closely at a laptop screen together at a desk",
    bentoSpan: "md",
    bentoTreatment: "plain",
  },
  {
    slug: "ai-agents",
    name: "AI agents",
    blurb: "Agents wired into real systems, with the guardrails to run unsupervised.",
    intro:
      "Agents that do work rather than demo well. The hard part is rarely the model; it is tool access, failure handling and knowing when to stop.",
    includes: [
      "Tool and API integration",
      "Retrieval over your own data",
      "Guardrails and human handoff",
      "Evaluation harness and regression tests",
      "Cost and token monitoring",
    ],
    stack: ["Claude API", "Python", "TypeScript", "Vector databases"],
    typicalTimeline: "4 to 12 weeks",
    heroAlt:
      "A terminal window showing an automated software installation running, green text on black",
    bentoSpan: "lg",
    bentoTreatment: "accent",
  },
  {
    slug: "ai-tools",
    name: "AI tools",
    blurb:
      "Focused tools that solve one expensive problem, not a chat box on a homepage.",
    intro:
      "Document extraction, classification, drafting, summarization. Narrow tools aimed at a task that currently costs real hours every week.",
    includes: [
      "Problem scoping and feasibility check",
      "Prompt and pipeline design",
      "Accuracy evaluation against your data",
      "Interface for the people who will use it",
      "Fallback behaviour when the model is wrong",
    ],
    stack: ["Claude API", "Python", "React"],
    typicalTimeline: "3 to 10 weeks",
    heroAlt: "A dashboard of page-load and bounce-rate charts on a monitor",
    bentoSpan: "sm",
    bentoTreatment: "plain",
  },
  {
    slug: "ecommerce",
    name: "Ecommerce",
    blurb: "Storefronts built around checkout conversion and the operations behind it.",
    intro:
      "Custom storefronts and platform builds. The work that matters is usually after the sale: inventory, fulfilment and returns.",
    includes: [
      "Storefront design and build",
      "Payment and tax configuration",
      "Inventory and fulfilment integration",
      "Checkout optimization",
      "Analytics and conversion tracking",
    ],
    stack: ["Next.js", "Shopify", "Stripe", "PostgreSQL"],
    typicalTimeline: "6 to 16 weeks",
    heroAlt: "A laptop screen displaying an online clothing store",
    bentoSpan: "md",
    bentoTreatment: "image",
    image: "ecommerce",
  },
  {
    slug: "mobile-games",
    name: "2D mobile games",
    blurb: "Casual and hyper-casual games, from prototype through store launch.",
    intro:
      "2D games for iOS and Android. Prototype first to find out whether the core loop is actually fun, then build the game around what survives.",
    includes: [
      "Core loop prototype",
      "Art pipeline and asset integration",
      "Progression and economy design",
      "Ads and in-app purchase integration",
      "Store submission and live ops setup",
    ],
    stack: ["Unity", "C#", "Firebase"],
    typicalTimeline: "10 to 24 weeks",
    heroAlt: "A person's hands holding a phone mid-game, playing a mobile action game",
    bentoSpan: "sm",
    bentoTreatment: "tint",
  },
  {
    slug: "landing-pages",
    name: "Landing pages",
    blurb:
      "Fast, well-built marketing pages. Custom, or from a template at a fixed price.",
    intro:
      "Marketing sites that load quickly, rank properly and can be edited without a developer. Custom builds, or the fixed-price template route for local businesses.",
    includes: [
      "Design and build",
      "Content management setup",
      "Technical SEO and structured data",
      "Analytics and conversion tracking",
      "Performance budget and Core Web Vitals",
    ],
    stack: ["Next.js", "Astro", "TypeScript"],
    typicalTimeline: "1 to 6 weeks",
    heroAlt:
      'A laptop on a desk displaying a website hero section that reads "Build your dream website"',
    bentoSpan: "md",
    bentoTreatment: "plain",
  },
  {
    slug: "mvp-engineering",
    name: "MVP engineering",
    blurb: "The smallest honest version of your product, built to be extended.",
    intro:
      "For founders who need something real in front of users quickly, without the shortcuts that make version two a rewrite.",
    includes: [
      "Scope reduction workshop",
      "Core product build",
      "Analytics from day one",
      "Deployment and environment setup",
      "A written list of the debt we took on deliberately",
    ],
    stack: ["Next.js", "TypeScript", "PostgreSQL", "Firebase"],
    typicalTimeline: "6 to 12 weeks",
    heroAlt: "A person standing in front of a wall covered in sticky notes, mapping out a plan",
    bentoSpan: "sm",
    bentoTreatment: "plain",
  },
  {
    slug: "cloud-devops",
    name: "Cloud and DevOps",
    blurb: "Deployment pipelines, infrastructure as code, and bills that make sense.",
    intro:
      "Infrastructure work for teams whose deploys are scary or whose cloud bill stopped being explainable.",
    includes: [
      "CI and CD pipelines",
      "Infrastructure as code",
      "Monitoring and alerting",
      "Cost review and reduction",
      "Backup and recovery testing",
    ],
    stack: ["AWS", "Docker", "Terraform", "GitHub Actions"],
    typicalTimeline: "2 to 8 weeks",
    heroAlt: "A close-up row of server drive bays with green status lights",
    bentoSpan: "sm",
    bentoTreatment: "plain",
  },
  {
    slug: "product-design",
    name: "Product design",
    blurb:
      "Interface and interaction design, done alongside the build rather than before it.",
    intro:
      "Design that survives contact with implementation, because the people designing it are sitting with the people building it.",
    includes: [
      "User flows and information architecture",
      "Interface design",
      "Design system and component library",
      "Prototypes for testing",
      "Accessibility review",
    ],
    stack: ["Figma", "Tailwind", "Motion"],
    typicalTimeline: "2 to 8 weeks",
    heroAlt: "A hand sketching interface wireframes on paper with a pencil",
    bentoSpan: "sm",
    bentoTreatment: "tint",
  },
];

export function getService(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}

export const serviceSlugs = services.map((s) => s.slug);
