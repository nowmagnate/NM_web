import localFont from "next/font/local";

/**
 * BLOOM — Playfair Display over Jost.
 *
 * The one unashamedly decorative pairing in the catalog, because this is the
 * one category where restraint reads as coldness. A couple choosing a planner
 * is not looking for a practice that looks efficient.
 *
 * Playfair's high contrast and old-style figures do the romance; Jost
 * underneath keeps the service tiers and the availability form legible, which
 * is where the actual decision gets made.
 */

// Self-hosted: the files live in ../kit/fonts (see its README) so a build never
// depends on Google being reachable or well-behaved. The constant names are
// prefixed with the template on purpose: next/font/local uses them as the CSS
// font-family names, and all 24 templates load on one page, so they must be unique.
const weddingEventPlanningDisplay = localFont({
  src: "../kit/fonts/PlayfairDisplay-Variable.woff2",
  variable: "--tpl-font-display",
  display: "swap",
  weight: "400 900",
  adjustFontFallback: "Times New Roman",
});

const weddingEventPlanningBody = localFont({
  src: "../kit/fonts/Jost-Variable.woff2",
  variable: "--tpl-font-body",
  display: "swap",
  weight: "100 900",
  adjustFontFallback: "Arial",
});

export const fontClassName = `${weddingEventPlanningDisplay.variable} ${weddingEventPlanningBody.variable}`;
