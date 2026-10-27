import localFont from "next/font/local";

/**
 * PASSAGE — DM Serif Display over Instrument Sans.
 *
 * Warmer than Counsel, because this reader arrives anxious rather than
 * aggrieved. Somebody looking for an immigration attorney is usually worried
 * about a deadline, a status, or a family member, and the page should not add
 * to that by looking like a courthouse.
 *
 * DM Serif Display has high contrast and generous curves; it is a headline
 * face and is used only as one. Instrument Sans underneath is a plain, wide
 * grotesque that keeps a page of visa categories readable, and it is here
 * rather than Karla because Counsel carries Karla in the same category.
 */

// Self-hosted: the files live in ../kit/fonts (see its README) so a build never
// depends on Google being reachable or well-behaved. The constant names are
// prefixed with the template on purpose: next/font/local uses them as the CSS
// font-family names, and all 24 templates load on one page, so they must be unique.
const immigrationAttorneyDisplay = localFont({
  src: "../kit/fonts/DMSerifDisplay-400.woff2",
  variable: "--tpl-font-display",
  display: "swap",
  weight: "400",
  adjustFontFallback: "Times New Roman",
});

const immigrationAttorneyBody = localFont({
  src: "../kit/fonts/InstrumentSans-Variable.woff2",
  variable: "--tpl-font-body",
  display: "swap",
  weight: "400 700",
  adjustFontFallback: "Arial",
});

export const fontClassName = `${immigrationAttorneyDisplay.variable} ${immigrationAttorneyBody.variable}`;
