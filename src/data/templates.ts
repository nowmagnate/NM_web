/**
 * The $499 template catalog. Twenty-four templates, weighted toward
 * established professional practices in the US, Canada and Europe.
 *
 * IMPORTANT — the previews are not screenshots yet. The actual templates are a
 * separate build. Until they exist, `previewStatus` stays `"comp"` and the UI
 * renders a visible "Design concept" chip, so nothing on the page claims to be
 * a live preview of something that has not been built. Do not quietly flip
 * these to "screenshot" without a real screenshot behind them.
 *
 * `palette.swatches` describes the TEMPLATE's colour direction, which is
 * content being displayed rather than site chrome. The site's own one-accent
 * rule is unaffected: these render as small sample dots inside a card, the
 * same way a product page shows available colours.
 */

export const templateCategories = [
  "Property & Design",
  "Medical & Dental",
  "Legal & Financial",
  "Wellness & Therapy",
  "Creative & Events",
  "Home & Property Services",
] as const;

export type TemplateCategory = (typeof templateCategories)[number];
export type Region = "US" | "CA" | "EU";

export type Template = {
  slug: string;
  name: string;
  category: TemplateCategory;
  practiceType: string;
  /** Catalog card copy. Max 22 words. */
  blurb: string;
  /** The sections the template ships with. */
  sections: string[];
  bestFor: string;
  palette: { name: string; swatches: [string, string, string] };
  previewImage: string;
  previewStatus: "comp" | "screenshot";
  featured?: boolean;
  regions: Region[];
};

const ALL: Region[] = ["US", "CA", "EU"];

export const templates: Template[] = [
  // ---------------------------------------------------------------- Property
  {
    slug: "real-estate-agent",
    name: "Meridian",
    category: "Property & Design",
    practiceType: "Real estate agent",
    blurb:
      "Listing-led layout for individual agents. Property grid, neighbourhood guides and a valuation enquiry form.",
    sections: [
      "Hero with search",
      "Featured listings",
      "About the agent",
      "Neighbourhood guides",
      "Testimonials",
      "Valuation enquiry",
    ],
    bestFor: "Solo agents and small teams who want listings front and centre",
    palette: { name: "Slate & Bone", swatches: ["#1F2933", "#E8E6E1", "#C2703D"] },
    previewImage: "/templates/real-estate-agent/preview.jpg",
    previewStatus: "comp",
    featured: true,
    regions: ALL,
  },
  {
    slug: "interior-designer",
    name: "Atelier",
    category: "Property & Design",
    practiceType: "Interior designer",
    blurb:
      "Portfolio-first template built around large project photography and a room-by-room case study format.",
    sections: [
      "Full-bleed hero",
      "Project portfolio",
      "Process",
      "Services and rates",
      "Press",
      "Consultation booking",
    ],
    bestFor: "Studios whose work sells itself visually",
    palette: { name: "Clay & Linen", swatches: ["#2B2622", "#F0EBE3", "#9A7B5F"] },
    previewImage: "/templates/interior-designer/preview.jpg",
    previewStatus: "comp",
    featured: true,
    regions: ALL,
  },
  {
    slug: "architecture-studio",
    name: "Datum",
    category: "Property & Design",
    practiceType: "Architecture studio",
    blurb:
      "Restrained editorial layout for practices presenting built work, drawings and competition entries.",
    sections: [
      "Index hero",
      "Selected works",
      "Practice",
      "Team",
      "Awards and publications",
      "Enquiries",
    ],
    bestFor: "Practices who want the drawings to do the talking",
    palette: { name: "Concrete", swatches: ["#141414", "#EDEDED", "#5B6B73"] },
    previewImage: "/templates/architecture-studio/preview.jpg",
    previewStatus: "comp",
    regions: ALL,
  },
  {
    slug: "home-staging",
    name: "Threshold",
    category: "Property & Design",
    practiceType: "Home staging",
    blurb:
      "Before-and-after driven layout that makes the value of staging obvious in the first screen.",
    sections: [
      "Before and after hero",
      "Recent stagings",
      "Packages",
      "How it works",
      "Realtor partnerships",
      "Quote request",
    ],
    bestFor: "Stagers selling to both homeowners and realtors",
    palette: { name: "Sage & Chalk", swatches: ["#2F3A34", "#F5F3EE", "#8A9A88"] },
    previewImage: "/templates/home-staging/preview.jpg",
    previewStatus: "comp",
    regions: ALL,
  },
  {
    slug: "property-management",
    name: "Ledger",
    category: "Property & Design",
    practiceType: "Property management",
    blurb:
      "Dual-audience layout that speaks to owners and tenants without making either hunt for their section.",
    sections: [
      "Split hero",
      "For owners",
      "For tenants",
      "Properties",
      "Fees",
      "Contact and portal link",
    ],
    bestFor: "Managers balancing owner acquisition with tenant service",
    palette: { name: "Harbour", swatches: ["#1B2A38", "#F2F4F5", "#3E7C9B"] },
    previewImage: "/templates/property-management/preview.jpg",
    previewStatus: "comp",
    regions: ALL,
  },

  // ----------------------------------------------------------------- Medical
  {
    slug: "family-practice",
    name: "Elm",
    category: "Medical & Dental",
    practiceType: "Family doctor",
    blurb:
      "Calm, legible layout built around new-patient registration and clear practice information.",
    sections: [
      "Hero with hours",
      "Services",
      "Meet the doctors",
      "New patients",
      "Insurance accepted",
      "Location and contact",
    ],
    bestFor: "Practices whose main job online is registering new patients",
    palette: { name: "Meadow", swatches: ["#1E3A32", "#F4F7F4", "#4E8C6A"] },
    previewImage: "/templates/family-practice/preview.jpg",
    previewStatus: "comp",
    featured: true,
    regions: ALL,
  },
  {
    slug: "dental-practice",
    name: "Enamel",
    category: "Medical & Dental",
    practiceType: "Dental practice",
    blurb:
      "Treatment-led layout with a nervous-patient section, transparent pricing and prominent booking.",
    sections: [
      "Hero with booking",
      "Treatments",
      "Nervous patients",
      "Pricing",
      "Team",
      "Book an appointment",
    ],
    bestFor: "Practices competing on comfort and clarity rather than price alone",
    palette: { name: "Clinic Blue", swatches: ["#16303F", "#F3F7F9", "#3D8DA8"] },
    previewImage: "/templates/dental-practice/preview.jpg",
    previewStatus: "comp",
    featured: true,
    regions: ALL,
  },
  {
    slug: "pediatric-clinic",
    name: "Sprout",
    category: "Medical & Dental",
    practiceType: "Pediatric clinic",
    blurb:
      "Warm layout aimed at parents, with visit preparation, vaccination information and after-hours guidance.",
    sections: [
      "Hero",
      "Services by age",
      "Preparing for a visit",
      "Vaccinations",
      "After hours",
      "Register",
    ],
    bestFor: "Clinics who field the same parent questions every week",
    palette: { name: "Apricot", swatches: ["#2C2A3E", "#FFF7F0", "#E08D5A"] },
    previewImage: "/templates/pediatric-clinic/preview.jpg",
    previewStatus: "comp",
    regions: ALL,
  },
  {
    slug: "physiotherapy-chiropractic",
    name: "Fulcrum",
    category: "Medical & Dental",
    practiceType: "Physiotherapy and chiropractic",
    blurb:
      "Condition-first layout so visitors find their own complaint before they read about the clinic.",
    sections: [
      "Hero",
      "Conditions treated",
      "Treatment approach",
      "Practitioners",
      "Fees and insurance",
      "Book",
    ],
    bestFor: "Clinics whose patients search by symptom",
    palette: { name: "Graphite", swatches: ["#22262B", "#F1F2F4", "#C1553A"] },
    previewImage: "/templates/physiotherapy-chiropractic/preview.jpg",
    previewStatus: "comp",
    regions: ALL,
  },
  {
    slug: "med-spa-aesthetics",
    name: "Lumen",
    category: "Medical & Dental",
    practiceType: "Med spa and aesthetics",
    blurb:
      "Premium treatment-menu layout with results galleries and consultation booking as the primary action.",
    sections: [
      "Editorial hero",
      "Treatment menu",
      "Results gallery",
      "Practitioners",
      "Financing",
      "Consultation",
    ],
    bestFor: "Clinics selling considered, higher-value treatments",
    palette: { name: "Pearl", swatches: ["#2A2529", "#FAF6F5", "#B08A8A"] },
    previewImage: "/templates/med-spa-aesthetics/preview.jpg",
    previewStatus: "comp",
    regions: ALL,
  },

  // ----------------------------------------------------------------- Legal
  {
    slug: "law-firm",
    name: "Counsel",
    category: "Legal & Financial",
    practiceType: "Law firm",
    blurb:
      "Authority-led layout organised by practice area, with attorney profiles and a confidential enquiry form.",
    sections: [
      "Hero",
      "Practice areas",
      "Attorneys",
      "Results",
      "Insights",
      "Confidential enquiry",
    ],
    bestFor: "Firms with two or more distinct practice areas",
    palette: { name: "Oxford", swatches: ["#12233B", "#F4F5F7", "#8C6A3F"] },
    previewImage: "/templates/law-firm/preview.jpg",
    previewStatus: "comp",
    featured: true,
    regions: ALL,
  },
  {
    slug: "immigration-attorney",
    name: "Passage",
    category: "Legal & Financial",
    practiceType: "Immigration attorney",
    blurb:
      "Visa-type navigation with plain-language explanations and an eligibility enquiry as the main action.",
    sections: [
      "Hero",
      "Visa types",
      "Eligibility check",
      "Process and timelines",
      "Fees",
      "Consultation",
    ],
    bestFor: "Practices whose clients arrive confused about which route applies",
    palette: { name: "Meridian Blue", swatches: ["#152A45", "#F2F5F8", "#4A7FB5"] },
    previewImage: "/templates/immigration-attorney/preview.jpg",
    previewStatus: "comp",
    regions: ["US", "CA"],
  },
  {
    slug: "accounting-bookkeeping",
    name: "Balance",
    category: "Legal & Financial",
    practiceType: "Accounting and bookkeeping",
    blurb:
      "Service-tier layout with a deadline calendar and a clear split between business and personal clients.",
    sections: [
      "Hero",
      "Services",
      "Packages",
      "Key dates",
      "Industries served",
      "Get a quote",
    ],
    bestFor: "Practices with packaged monthly pricing",
    palette: { name: "Ledger Green", swatches: ["#16302A", "#F3F6F4", "#3F7F63"] },
    previewImage: "/templates/accounting-bookkeeping/preview.jpg",
    previewStatus: "comp",
    regions: ALL,
  },
  {
    slug: "financial-advisory",
    name: "Compass",
    category: "Legal & Financial",
    practiceType: "Financial advisor",
    blurb:
      "Trust-first layout leading with credentials, fee structure and a no-obligation first meeting.",
    sections: [
      "Hero",
      "Who we help",
      "Our approach",
      "Fee structure",
      "Credentials",
      "Book a first meeting",
    ],
    bestFor: "Advisors competing on transparency and fiduciary standing",
    palette: { name: "Navy & Sand", swatches: ["#182338", "#F6F4F0", "#A8834E"] },
    previewImage: "/templates/financial-advisory/preview.jpg",
    previewStatus: "comp",
    regions: ALL,
  },

  // --------------------------------------------------------------- Wellness
  {
    slug: "therapy-counseling",
    name: "Quiet",
    category: "Wellness & Therapy",
    practiceType: "Therapy and counseling",
    blurb:
      "Deliberately calm layout with low visual noise, clear fees and a private enquiry route.",
    sections: [
      "Hero",
      "How I work",
      "Areas of focus",
      "Fees and availability",
      "What to expect",
      "Private enquiry",
    ],
    bestFor: "Private practices where tone matters more than volume",
    palette: { name: "Mist", swatches: ["#2A3038", "#F4F5F6", "#7C8FA0"] },
    previewImage: "/templates/therapy-counseling/preview.jpg",
    previewStatus: "comp",
    regions: ALL,
  },
  {
    slug: "yoga-pilates-studio",
    name: "Asana",
    category: "Wellness & Therapy",
    practiceType: "Yoga and pilates studio",
    blurb:
      "Timetable-led layout where the class schedule and intro offer are visible without scrolling.",
    sections: [
      "Hero with intro offer",
      "Timetable",
      "Class styles",
      "Teachers",
      "Memberships",
      "Book a class",
    ],
    bestFor: "Studios whose main conversion is a first class booking",
    palette: { name: "Terracotta", swatches: ["#2E2721", "#FAF6F1", "#B5674A"] },
    previewImage: "/templates/yoga-pilates-studio/preview.jpg",
    previewStatus: "comp",
    regions: ALL,
  },
  {
    slug: "personal-training",
    name: "Tempo",
    category: "Wellness & Therapy",
    practiceType: "Personal trainer",
    blurb:
      "Results-led layout with programme tiers, client transformations and a consultation booking.",
    sections: [
      "Hero",
      "Programmes",
      "Client results",
      "About the trainer",
      "Pricing",
      "Free consultation",
    ],
    bestFor: "Trainers selling multi-week programmes rather than single sessions",
    palette: { name: "Signal", swatches: ["#141618", "#F2F3F4", "#D64933"] },
    previewImage: "/templates/personal-training/preview.jpg",
    previewStatus: "comp",
    regions: ALL,
  },

  // ------------------------------------------------------- Creative & Events
  {
    slug: "photography-studio",
    name: "Aperture",
    category: "Creative & Events",
    practiceType: "Photography studio",
    blurb:
      "Gallery-first layout with per-genre portfolios, package pricing and a date-check enquiry form.",
    sections: [
      "Full-bleed gallery hero",
      "Portfolios by genre",
      "Packages",
      "About",
      "Client words",
      "Check a date",
    ],
    bestFor: "Photographers shooting more than one genre",
    palette: { name: "Silver Halide", swatches: ["#101010", "#F7F7F7", "#8C8C8C"] },
    previewImage: "/templates/photography-studio/preview.jpg",
    previewStatus: "comp",
    featured: true,
    regions: ALL,
  },
  {
    slug: "wedding-event-planning",
    name: "Bloom",
    category: "Creative & Events",
    practiceType: "Wedding and event planner",
    blurb:
      "Story-led layout built around real events, service tiers and an availability enquiry.",
    sections: [
      "Hero",
      "Recent events",
      "Service tiers",
      "Process",
      "Vendor network",
      "Check availability",
    ],
    bestFor: "Planners whose portfolio is the strongest argument",
    palette: { name: "Blush Ink", swatches: ["#2B2328", "#FBF7F6", "#C48B96"] },
    previewImage: "/templates/wedding-event-planning/preview.jpg",
    previewStatus: "comp",
    regions: ALL,
  },
  {
    slug: "design-consultancy",
    name: "Studio",
    category: "Creative & Events",
    practiceType: "Design consultancy",
    blurb:
      "Case-study layout for small consultancies presenting client work and a clear engagement model.",
    sections: [
      "Hero",
      "Selected work",
      "Services",
      "How we engage",
      "Team",
      "Start a project",
    ],
    bestFor: "Consultancies selling on thinking rather than deliverables",
    palette: { name: "Ink & Citrus", swatches: ["#17181A", "#F4F4F2", "#C8A415"] },
    previewImage: "/templates/design-consultancy/preview.jpg",
    previewStatus: "comp",
    regions: ALL,
  },

  // ---------------------------------------------------- Home & Property Svcs
  {
    slug: "custom-home-builder",
    name: "Cornerstone",
    category: "Home & Property Services",
    practiceType: "Custom home builder",
    blurb:
      "Build-portfolio layout with floor plans, a stage-by-stage process and a land or plans enquiry.",
    sections: [
      "Hero",
      "Completed builds",
      "Plans and specifications",
      "Build process",
      "Warranty",
      "Enquire",
    ],
    bestFor: "Builders selling a considered, long-cycle purchase",
    palette: { name: "Timber", swatches: ["#22201D", "#F5F2ED", "#7D6A52"] },
    previewImage: "/templates/custom-home-builder/preview.jpg",
    previewStatus: "comp",
    regions: ALL,
  },
  {
    slug: "landscape-design-build",
    name: "Verge",
    category: "Home & Property Services",
    practiceType: "Landscape design and build",
    blurb:
      "Seasonal portfolio layout with before-and-after projects, service areas and a site-visit request.",
    sections: [
      "Hero",
      "Projects",
      "Services",
      "Service areas",
      "Seasonal care",
      "Request a site visit",
    ],
    bestFor: "Design-build firms rather than maintenance-only operators",
    palette: { name: "Fern", swatches: ["#1D2B21", "#F3F6F1", "#5E8C4E"] },
    previewImage: "/templates/landscape-design-build/preview.jpg",
    previewStatus: "comp",
    regions: ALL,
  },
  {
    slug: "remodeling-contractor",
    name: "Framework",
    category: "Home & Property Services",
    practiceType: "Remodeling contractor",
    blurb:
      "Room-by-room layout with transformation galleries, licensing details and a quote request.",
    sections: [
      "Hero",
      "Kitchens and baths",
      "Whole-home projects",
      "Process and timeline",
      "Licensing and insurance",
      "Request a quote",
    ],
    bestFor: "Contractors competing against cheaper, less credentialed bids",
    palette: { name: "Workshop", swatches: ["#1C1E20", "#F2F1EF", "#C77A2E"] },
    previewImage: "/templates/remodeling-contractor/preview.jpg",
    previewStatus: "comp",
    regions: ALL,
  },
  {
    slug: "cleaning-services",
    name: "Crisp",
    category: "Home & Property Services",
    practiceType: "Cleaning service",
    blurb:
      "Conversion-focused layout with instant pricing by home size, service checklists and online booking.",
    sections: [
      "Hero with pricing",
      "Services",
      "What's included checklist",
      "Service areas",
      "Reviews",
      "Book a clean",
    ],
    bestFor: "Operators who win on speed of booking",
    palette: { name: "Fresh", swatches: ["#1B2A2F", "#F4F8F8", "#3FA4A0"] },
    previewImage: "/templates/cleaning-services/preview.jpg",
    previewStatus: "comp",
    regions: ALL,
  },
];

// --------------------------------------------------------------- Accessors

export function getTemplate(slug: string): Template | undefined {
  return templates.find((t) => t.slug === slug);
}

export const templateSlugs = templates.map((t) => t.slug);

export const featuredTemplates = templates.filter((t) => t.featured);

export function templatesByCategory(category: TemplateCategory): Template[] {
  return templates.filter((t) => t.category === category);
}

/** Category counts for the filter UI, so a filter never shows an empty result. */
export const categoryCounts = templateCategories.map((category) => ({
  category,
  count: templates.filter((t) => t.category === category).length,
}));

export const regions: { value: Region; label: string }[] = [
  { value: "US", label: "United States" },
  { value: "CA", label: "Canada" },
  { value: "EU", label: "Europe" },
];
