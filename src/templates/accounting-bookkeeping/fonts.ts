import localFont from "next/font/local";

/**
 * BALANCE — Epilogue over IBM Plex Sans.
 *
 * The one authority template with a sans display face, and the reason is
 * commercial rather than aesthetic: packaged monthly pricing is a product, not
 * a practice. A serif would make this page look like a profession being
 * consulted; a grotesque makes it look like a service being bought, which is
 * exactly what a bookkeeping subscription is.
 *
 * IBM Plex Sans carries the tables. It was drawn for technical documentation
 * and has proper tabular figures, which matters more here than on any other
 * template in the catalog.
 */

// Self-hosted: the files live in ../kit/fonts (see its README) so a build never
// depends on Google being reachable or well-behaved. The constant names are
// prefixed with the template on purpose: next/font/local uses them as the CSS
// font-family names, and all 24 templates load on one page, so they must be unique.
const accountingBookkeepingDisplay = localFont({
  src: "../kit/fonts/Epilogue-Variable.woff2",
  variable: "--tpl-font-display",
  display: "swap",
  weight: "100 900",
  adjustFontFallback: "Arial",
});

const accountingBookkeepingBody = localFont({
  src: "../kit/fonts/IBMPlexSans-Variable.woff2",
  variable: "--tpl-font-body",
  display: "swap",
  weight: "100 700",
  adjustFontFallback: "Arial",
});

export const fontClassName = `${accountingBookkeepingDisplay.variable} ${accountingBookkeepingBody.variable}`;
