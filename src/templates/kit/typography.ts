/**
 * TYPE — the approved pairings, one display face and one body face per
 * template. Never a third, and no monospace worn as a costume.
 *
 * THIS FILE LOADS NO FONTS. It is the record of what was approved at the
 * art-direction gate, and it exists so the pairings can be read in one place
 * and audited for the rule below. Each template calls `next/font` for its own
 * two faces in `src/templates/<slug>/fonts.ts`; a shared registry module would
 * emit every family in the catalog onto every preview page, which is precisely
 * the bloat that makes template marketplaces feel slow.
 *
 * TWO RULES KEEP 24 TEMPLATES FROM LOOKING RELATED, and the second one is the
 * one that actually matters.
 *
 * 1. No family carries more than three templates across the catalog.
 * 2. NO TWO TEMPLATES IN THE SAME CATEGORY SHARE A FAMILY AT ALL.
 *
 * Rule 1 was here first and on its own it was the wrong test. Elm and Enamel
 * both sat inside Medical & Dental, both set in Manrope, both on a cool
 * near-white ground, and the budget was satisfied while the two templates read
 * as one with the content swapped. What matters is not how many templates
 * share a face across a catalog nobody reads end to end. It is whether the two
 * a buyer opens in adjacent tabs share one, and the two a buyer opens in
 * adjacent tabs are the two in the same category.
 *
 * Both are exported as checks below, so review is a command rather than a
 * count by eye.
 */

import { templates, templateCategories } from "@/data/templates";

export type Pairing = {
  /** Headlines, section titles, the wordmark. */
  display: string;
  /** Body copy, labels, interface text. */
  body: string;
  /** Why this pair, in one line. Read this before changing one. */
  note: string;
};

export const pairings: Record<string, Pairing> = {
  // ---------------------------------------------------------- Inventory (2)
  "real-estate-agent": {
    display: "Instrument Serif",
    body: "Public Sans",
    note: "A serif with real contrast over a plain civic sans, so listings read as property rather than as product.",
  },
  "property-management": {
    display: "Chivo",
    body: "Manrope",
    note: "Workmanlike on purpose: this template serves two audiences and has to look administrative, not aspirational. Body face moved off Public Sans, which Meridian already carries in this category.",
  },

  // ------------------------------------------------------- Portfolio-led (9)
  "interior-designer": {
    display: "Cormorant Garamond",
    body: "Jost",
    note: "High-contrast old-style over a geometric sans. The pair most photography can sit under without competing.",
  },
  "architecture-studio": {
    display: "Space Grotesk",
    body: "IBM Plex Sans",
    note: "Drawn rather than written. Both faces have the slightly technical feel that suits plans and sections.",
  },
  "home-staging": {
    display: "Newsreader",
    body: "Work Sans",
    note: "Editorial serif for a template whose argument is a before and after pair, which is a magazine device.",
  },
  "photography-studio": {
    display: "Instrument Serif",
    body: "Work Sans",
    note: "The display face is used once per screen at large size, so the images are never sharing the stage.",
  },
  "wedding-event-planning": {
    display: "Playfair Display",
    body: "Jost",
    note: "The one unashamedly decorative pairing in the catalog, because this is the one category where restraint reads as coldness.",
  },
  "design-consultancy": {
    display: "Bricolage Grotesque",
    body: "Hanken Grotesk",
    note: "A display face with deliberate irregularity, for the template whose buyer is judging taste first.",
  },
  "custom-home-builder": {
    display: "Lora",
    body: "Figtree",
    note: "Warm serif over a soft sans. A long-cycle purchase sold on trust rather than on speed.",
  },
  "landscape-design-build": {
    display: "Newsreader",
    body: "Karla",
    note: "Same serif as Threshold on a different body face and a very different palette. Karla rather than Figtree, which Cornerstone carries in the same category.",
  },
  "remodeling-contractor": {
    display: "Space Grotesk",
    body: "IBM Plex Sans",
    note: "Reads as licensed and technical, which is the argument this template makes against a cheaper bid.",
  },

  // --------------------------------------------------------- Booking-led (8)
  "dental-practice": {
    display: "Bricolage Grotesque",
    body: "Manrope",
    note: "The display face has enough character to stop the page reading as clinical stock, and Manrope is quiet under it.",
  },
  "family-practice": {
    display: "Fraunces",
    body: "Public Sans",
    note: "A soft old-style serif over a plain civic sans. Deliberately nothing like Enamel, which sits in the same category and would otherwise be its twin.",
  },
  "pediatric-clinic": {
    display: "Familjen Grotesk",
    body: "Figtree",
    note: "Friendly without being childish. The parent is the reader, not the child.",
  },
  "physiotherapy-chiropractic": {
    display: "Chivo",
    body: "Work Sans",
    note: "Direct and unfussy, for a template organised around finding your own symptom quickly.",
  },
  "med-spa-aesthetics": {
    display: "Cormorant Garamond",
    body: "Jost",
    note: "The luxury pairing. Higher-value treatments are sold the way cosmetics are sold.",
  },
  "yoga-pilates-studio": {
    display: "Outfit",
    body: "Manrope",
    note: "Open counters and generous spacing, carrying a timetable that has to stay legible at a glance.",
  },
  "personal-training": {
    display: "Archivo",
    body: "Hanken Grotesk",
    note: "Archivo at its heaviest weight is the only display face in the catalog used as a block of colour.",
  },
  "cleaning-services": {
    display: "Familjen Grotesk",
    body: "Hanken Grotesk",
    note: "Plain and quick. This template competes on how fast a booking can be made.",
  },

  // -------------------------------------------------------- Authority-led (5)
  "law-firm": {
    display: "Libre Baskerville",
    body: "Karla",
    note: "A transitional serif with no modern affect at all, which is the point for a firm.",
  },
  "immigration-attorney": {
    display: "DM Serif Display",
    body: "Instrument Sans",
    note: "Warmer than Counsel, because this reader arrives anxious rather than aggrieved. Instrument Sans rather than Karla, which Counsel carries in the same category.",
  },
  "accounting-bookkeeping": {
    display: "Epilogue",
    body: "IBM Plex Sans",
    note: "The one authority template with a sans display face. Packaged monthly pricing is a product, not a practice.",
  },
  "financial-advisory": {
    display: "Newsreader",
    body: "Public Sans",
    note: "Reads as a published document, which is what a fee schedule and a fiduciary statement should look like.",
  },
  "therapy-counseling": {
    display: "Lora",
    body: "Karla",
    note: "The quietest pair available. Low contrast, no display drama, nothing that raises the reader's pulse.",
  },
};

/** No family may carry more than this many templates. */
export const FAMILY_BUDGET = 3;

/**
 * Throws if a family has crept past the budget. Not run at build time, because
 * a font choice is a design decision and should fail in review rather than in
 * CI, but exported so review is a command instead of a count by eye.
 */
export function assertPairingBudget(): void {
  const counts = new Map<string, number>();

  for (const pair of Object.values(pairings)) {
    for (const family of [pair.display, pair.body]) {
      counts.set(family, (counts.get(family) ?? 0) + 1);
    }
  }

  const over = [...counts.entries()]
    .filter(([, n]) => n > FAMILY_BUDGET)
    .map(([family, n]) => `${family} carries ${n}`);

  if (over.length) {
    throw new Error(`Font family budget exceeded: ${over.join(", ")}`);
  }
}

/**
 * Rule 2, and the stricter one: two templates a buyer would compare must not
 * share a typeface. Same-category templates are exactly the ones that get
 * compared, because that is how the catalog filters.
 *
 * Imports the catalog rather than restating the categories here, so a template
 * moving category cannot silently pass a check written against a stale copy.
 */
export function assertNoCategoryClash(): void {
  const clashes: string[] = [];

  for (const category of templateCategories) {
    const inCategory = templates.filter((t) => t.category === category);
    const seen = new Map<string, string>();

    for (const template of inCategory) {
      const pair = pairings[template.slug];
      if (!pair) continue;

      for (const family of [pair.display, pair.body]) {
        const owner = seen.get(family);
        if (owner) {
          clashes.push(`${category}: ${owner} and ${template.name} both use ${family}`);
        } else {
          seen.set(family, template.name);
        }
      }
    }
  }

  if (clashes.length) {
    throw new Error(`Typeface clash inside a category. ${clashes.join(". ")}`);
  }
}
