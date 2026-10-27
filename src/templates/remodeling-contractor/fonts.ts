import localFont from "next/font/local";

/**
 * FRAMEWORK — Space Grotesk over IBM Plex Sans.
 *
 * Reads as licensed and technical, which is the argument this template makes
 * against a cheaper bid. A remodeling contractor competing on credentials
 * needs a page that looks like it was produced by somebody who reads
 * drawings.
 *
 * Datum carries the same pairing in Property & Design. Different category, and
 * a very different palette.
 */

// Self-hosted: the files live in ../kit/fonts (see its README) so a build never
// depends on Google being reachable or well-behaved. The constant names are
// prefixed with the template on purpose: next/font/local uses them as the CSS
// font-family names, and all 24 templates load on one page, so they must be unique.
const remodelingContractorDisplay = localFont({
  src: "../kit/fonts/SpaceGrotesk-Variable.woff2",
  variable: "--tpl-font-display",
  display: "swap",
  weight: "300 700",
  adjustFontFallback: "Arial",
});

const remodelingContractorBody = localFont({
  src: "../kit/fonts/IBMPlexSans-Variable.woff2",
  variable: "--tpl-font-body",
  display: "swap",
  weight: "100 700",
  adjustFontFallback: "Arial",
});

export const fontClassName = `${remodelingContractorDisplay.variable} ${remodelingContractorBody.variable}`;
