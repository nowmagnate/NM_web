import localFont from "next/font/local";

/**
 * DATUM — Space Grotesk over IBM Plex Sans.
 *
 * Drawn rather than written. Both faces have the slightly technical feel that
 * suits plans and sections: Space Grotesk's odd, cut-off terminals read as
 * something set out with instruments, and IBM Plex was designed for a company
 * that makes machines. Neither is warm, and neither should be.
 *
 * The pairing does the same job here that a serif does on Atelier two rows
 * away in the same category: it tells you what kind of practice this is before
 * you have read a word of the copy.
 */

// Self-hosted: the files live in ../kit/fonts (see its README) so a build never
// depends on Google being reachable or well-behaved. The constant names are
// prefixed with the template on purpose: next/font/local uses them as the CSS
// font-family names, and all 24 templates load on one page, so they must be unique.
const architectureStudioDisplay = localFont({
  src: "../kit/fonts/SpaceGrotesk-Variable.woff2",
  variable: "--tpl-font-display",
  display: "swap",
  weight: "300 700",
  adjustFontFallback: "Arial",
});

const architectureStudioBody = localFont({
  src: "../kit/fonts/IBMPlexSans-Variable.woff2",
  variable: "--tpl-font-body",
  display: "swap",
  weight: "100 700",
  adjustFontFallback: "Arial",
});

export const fontClassName = `${architectureStudioDisplay.variable} ${architectureStudioBody.variable}`;
