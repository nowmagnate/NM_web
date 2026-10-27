import localFont from "next/font/local";

/**
 * APERTURE — Instrument Serif over Work Sans.
 *
 * The display face is used once per screen at large size and nowhere else, so
 * the photographs are never sharing the stage with the type. Instrument Serif
 * is a high-contrast display serif with almost no weight range, which suits a
 * template that will only ever set one line of it at a time.
 *
 * Work Sans does every piece of working type, including the package prices,
 * where neutrality matters more than character.
 */

// Self-hosted: the files live in ../kit/fonts (see its README) so a build never
// depends on Google being reachable or well-behaved. The constant names are
// prefixed with the template on purpose: next/font/local uses them as the CSS
// font-family names, and all 24 templates load on one page, so they must be unique.
const photographyStudioDisplay = localFont({
  src: "../kit/fonts/InstrumentSerif-400.woff2",
  variable: "--tpl-font-display",
  display: "swap",
  weight: "400",
  adjustFontFallback: "Times New Roman",
});

const photographyStudioBody = localFont({
  src: "../kit/fonts/WorkSans-Variable.woff2",
  variable: "--tpl-font-body",
  display: "swap",
  weight: "100 900",
  adjustFontFallback: "Arial",
});

export const fontClassName = `${photographyStudioDisplay.variable} ${photographyStudioBody.variable}`;
