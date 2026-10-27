import localFont from "next/font/local";

/**
 * LUMEN — Cormorant Garamond over Jost.
 *
 * The luxury pairing, and the only high-contrast old-style serif in the
 * booking-led group. Higher-value aesthetic treatments are sold the way
 * cosmetics are sold, which means the type carries the price positioning
 * before a single number appears on the page.
 *
 * Cormorant is drawn for display and falls apart under 20px, so it is used
 * only at headline sizes and never for a label. Jost does all the working
 * type: a geometric sans with enough neutrality to keep a treatment menu
 * readable without arguing with the serif above it.
 *
 * Neither face appears anywhere else in Medical & Dental.
 */

// Self-hosted: the files live in ../kit/fonts (see its README) so a build never
// depends on Google being reachable or well-behaved. The constant names are
// prefixed with the template on purpose: next/font/local uses them as the CSS
// font-family names, and all 24 templates load on one page, so they must be unique.
const medSpaAestheticsDisplay = localFont({
  src: "../kit/fonts/CormorantGaramond-Variable.woff2",
  variable: "--tpl-font-display",
  display: "swap",
  weight: "300 700",
  adjustFontFallback: "Times New Roman",
});

const medSpaAestheticsBody = localFont({
  src: "../kit/fonts/Jost-Variable.woff2",
  variable: "--tpl-font-body",
  display: "swap",
  weight: "100 900",
  adjustFontFallback: "Arial",
});

export const fontClassName = `${medSpaAestheticsDisplay.variable} ${medSpaAestheticsBody.variable}`;
