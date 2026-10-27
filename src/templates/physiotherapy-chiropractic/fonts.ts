import localFont from "next/font/local";

/**
 * FULCRUM — Chivo over Work Sans.
 *
 * Direct and unfussy, for a template organised around a visitor finding their
 * own symptom as fast as possible. Chivo is a grotesque with flat terminals and
 * very little flourish; at display weight it reads as a sign rather than as a
 * headline, which is the right register for a clinic whose reader arrived in
 * pain and is not browsing.
 *
 * Work Sans underneath is neutral and slightly condensed at text sizes, so a
 * long index of conditions fits without the page becoming a scroll.
 *
 * Neither face appears anywhere else in Medical & Dental. See the two rules in
 * `kit/typography.ts`.
 */

// Self-hosted: the files live in ../kit/fonts (see its README) so a build never
// depends on Google being reachable or well-behaved. The constant names are
// prefixed with the template on purpose: next/font/local uses them as the CSS
// font-family names, and all 24 templates load on one page, so they must be unique.
const physiotherapyChiropracticDisplay = localFont({
  src: "../kit/fonts/Chivo-Variable.woff2",
  variable: "--tpl-font-display",
  display: "swap",
  weight: "100 900",
  adjustFontFallback: "Arial",
});

const physiotherapyChiropracticBody = localFont({
  src: "../kit/fonts/WorkSans-Variable.woff2",
  variable: "--tpl-font-body",
  display: "swap",
  weight: "100 900",
  adjustFontFallback: "Arial",
});

export const fontClassName = `${physiotherapyChiropracticDisplay.variable} ${physiotherapyChiropracticBody.variable}`;
