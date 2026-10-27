import localFont from "next/font/local";

/**
 * MERIDIAN — Instrument Serif over Public Sans.
 *
 * A serif with real contrast over a plain civic sans, so listings read as
 * property rather than as product. The display face appears once per screen at
 * large size and never on a listing card, because a price set in a display
 * serif starts to look like a menu.
 *
 * Public Sans carries every listing, every price and every filter control. It
 * is a government-commissioned face with proper tabular figures, which matters
 * on a page that is mostly numbers in a grid.
 */

// Self-hosted: the files live in ../kit/fonts (see its README) so a build never
// depends on Google being reachable or well-behaved. The constant names are
// prefixed with the template on purpose: next/font/local uses them as the CSS
// font-family names, and all 24 templates load on one page, so they must be unique.
const realEstateAgentDisplay = localFont({
  src: "../kit/fonts/InstrumentSerif-400.woff2",
  variable: "--tpl-font-display",
  display: "swap",
  weight: "400",
  adjustFontFallback: "Times New Roman",
});

const realEstateAgentBody = localFont({
  src: "../kit/fonts/PublicSans-Variable.woff2",
  variable: "--tpl-font-body",
  display: "swap",
  weight: "100 900",
  adjustFontFallback: "Arial",
});

export const fontClassName = `${realEstateAgentDisplay.variable} ${realEstateAgentBody.variable}`;
