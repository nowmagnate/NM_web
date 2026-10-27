import localFont from "next/font/local";

/**
 * COMPASS — Newsreader over Public Sans.
 *
 * Reads as a published document, which is what a fee schedule and a fiduciary
 * statement should look like. Newsreader is a screen-first text serif with low
 * contrast, so it holds at the middling sizes this template uses most, and it
 * never looks like a logo.
 *
 * Public Sans is a civic face, drawn for government use, and that association
 * is doing real work here: this is the template whose entire argument is that
 * the adviser is paid by the client and nobody else.
 */

// Self-hosted: the files live in ../kit/fonts (see its README) so a build never
// depends on Google being reachable or well-behaved. The constant names are
// prefixed with the template on purpose: next/font/local uses them as the CSS
// font-family names, and all 24 templates load on one page, so they must be unique.
const financialAdvisoryDisplay = localFont({
  src: "../kit/fonts/Newsreader-Variable.woff2",
  variable: "--tpl-font-display",
  display: "swap",
  weight: "200 800",
  adjustFontFallback: "Times New Roman",
});

const financialAdvisoryBody = localFont({
  src: "../kit/fonts/PublicSans-Variable.woff2",
  variable: "--tpl-font-body",
  display: "swap",
  weight: "100 900",
  adjustFontFallback: "Arial",
});

export const fontClassName = `${financialAdvisoryDisplay.variable} ${financialAdvisoryBody.variable}`;
