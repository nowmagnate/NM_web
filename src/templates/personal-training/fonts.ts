import localFont from "next/font/local";

/**
 * TEMPO — Archivo over Hanken Grotesk.
 *
 * Archivo at its heaviest weight is the only display face in the catalog used
 * as a block of colour rather than as a line of words. It is a grotesque with
 * almost no modulation, so at 800 and negative tracking a headline stops being
 * type and becomes a shape, which is the correct register for a template
 * selling multi-week programmes to people who have already decided they want
 * to be pushed.
 *
 * Hanken Grotesk underneath is calm and slightly narrow, so a page of
 * programme detail does not read as shouting all the way down.
 */

// Self-hosted: the files live in ../kit/fonts (see its README) so a build never
// depends on Google being reachable or well-behaved. The constant names are
// prefixed with the template on purpose: next/font/local uses them as the CSS
// font-family names, and all 24 templates load on one page, so they must be unique.
const personalTrainingDisplay = localFont({
  src: "../kit/fonts/Archivo-Variable.woff2",
  variable: "--tpl-font-display",
  display: "swap",
  weight: "100 900",
  adjustFontFallback: "Arial",
});

const personalTrainingBody = localFont({
  src: "../kit/fonts/HankenGrotesk-Variable.woff2",
  variable: "--tpl-font-body",
  display: "swap",
  weight: "100 900",
  adjustFontFallback: "Arial",
});

export const fontClassName = `${personalTrainingDisplay.variable} ${personalTrainingBody.variable}`;
