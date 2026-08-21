/**
 * Published case studies. Ships EMPTY.
 *
 * Most of the practice's work is under NDA, and nothing here is invented. The
 * home page and /work both check `.length` and render a composed empty state
 * instead, which says something true rather than filling the grid with
 * plausible fiction.
 *
 * TO PUBLISH ONE: add an entry below AND follow the two content steps in
 * `src/content/case-studies/README.md` (an .mdx file, plus activating the
 * `/work/[slug]` route the first time only). Adding a card here without
 * doing that gives it a dead link — the route does not exist until then.
 */

export type CaseStudy = {
  slug: string;
  /** Client name, or an honest anonymization such as "A logistics startup". */
  client: string;
  title: string;
  /** Card summary. Max 30 words. */
  summary: string;
  services: string[];
  year: number;
  /** Real screenshots only. Never a mockup presented as a product shot. */
  image?: string;
  /** False for anonymized studies, which is fine; fabricated ones are not. */
  clientNamed: boolean;
};

// Expected shape, kept commented so the fields are obvious:
//
// export const caseStudies: CaseStudy[] = [
//   {
//     slug: "logistics-dispatch-rebuild",
//     client: "A logistics startup",
//     title: "Cutting dispatch time on a fleet management rebuild",
//     summary: "Replaced a spreadsheet workflow with a scheduling tool the dispatch team actually uses.",
//     services: ["web-applications"],
//     year: 2025,
//     clientNamed: false,
//   },
// ];

export const caseStudies: CaseStudy[] = [];

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return caseStudies.find((c) => c.slug === slug);
}

export const caseStudySlugs = caseStudies.map((c) => c.slug);
