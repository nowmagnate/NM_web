import localFont from "next/font/local";

/**
 * LEDGER — Chivo over Manrope.
 *
 * Workmanlike on purpose. This template serves two audiences who want opposite
 * things and it has to look administrative rather than aspirational: a
 * landlord is choosing a manager on competence, and a tenant arriving to
 * report a broken boiler is not being marketed to at all.
 *
 * Chivo is a flat-terminalled grotesque with no flourish; Manrope underneath is
 * quiet and has a tall x-height, which keeps a fee table and a compliance list
 * readable at length.
 */

// Self-hosted: the files live in ../kit/fonts (see its README) so a build never
// depends on Google being reachable or well-behaved. The constant names are
// prefixed with the template on purpose: next/font/local uses them as the CSS
// font-family names, and all 24 templates load on one page, so they must be unique.
const propertyManagementDisplay = localFont({
  src: "../kit/fonts/Chivo-Variable.woff2",
  variable: "--tpl-font-display",
  display: "swap",
  weight: "100 900",
  adjustFontFallback: "Arial",
});

const propertyManagementBody = localFont({
  src: "../kit/fonts/Manrope-Variable.woff2",
  variable: "--tpl-font-body",
  display: "swap",
  weight: "200 800",
  adjustFontFallback: "Arial",
});

export const fontClassName = `${propertyManagementDisplay.variable} ${propertyManagementBody.variable}`;
