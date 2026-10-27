import localFont from "next/font/local";

/**
 * THRESHOLD — Newsreader over Work Sans.
 *
 * An editorial serif for a template whose entire argument is a comparison, and
 * comparison is a magazine device. Newsreader is a screen-first text serif
 * with low contrast, so it holds up at the middling sizes this template uses
 * most, which are captions and project names rather than giant headlines.
 *
 * Work Sans underneath is neutral and slightly narrow, which matters on a page
 * carrying package prices and room lists.
 */

// Self-hosted: the files live in ../kit/fonts (see its README) so a build never
// depends on Google being reachable or well-behaved. The constant names are
// prefixed with the template on purpose: next/font/local uses them as the CSS
// font-family names, and all 24 templates load on one page, so they must be unique.
const homeStagingDisplay = localFont({
  src: "../kit/fonts/Newsreader-Variable.woff2",
  variable: "--tpl-font-display",
  display: "swap",
  weight: "200 800",
  adjustFontFallback: "Times New Roman",
});

const homeStagingBody = localFont({
  src: "../kit/fonts/WorkSans-Variable.woff2",
  variable: "--tpl-font-body",
  display: "swap",
  weight: "100 900",
  adjustFontFallback: "Arial",
});

export const fontClassName = `${homeStagingDisplay.variable} ${homeStagingBody.variable}`;
