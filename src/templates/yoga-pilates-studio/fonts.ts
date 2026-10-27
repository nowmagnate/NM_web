import localFont from "next/font/local";

/**
 * ASANA — Outfit over Manrope.
 *
 * Open counters and generous spacing, carrying a timetable that has to stay
 * legible at a glance on a phone at seven in the morning. Both faces are soft
 * geometrics with almost no contrast, which is what lets a dense grid of class
 * times read as calm rather than as a spreadsheet.
 *
 * Both faces appear elsewhere in the catalog and neither appears anywhere else
 * in Wellness & Therapy, which is the test that matters. See the two rules in
 * `kit/typography.ts`.
 */

// Self-hosted: the files live in ../kit/fonts (see its README) so a build never
// depends on Google being reachable or well-behaved. The constant names are
// prefixed with the template on purpose: next/font/local uses them as the CSS
// font-family names, and all 24 templates load on one page, so they must be unique.
const yogaPilatesStudioDisplay = localFont({
  src: "../kit/fonts/Outfit-Variable.woff2",
  variable: "--tpl-font-display",
  display: "swap",
  weight: "100 900",
  adjustFontFallback: "Arial",
});

const yogaPilatesStudioBody = localFont({
  src: "../kit/fonts/Manrope-Variable.woff2",
  variable: "--tpl-font-body",
  display: "swap",
  weight: "200 800",
  adjustFontFallback: "Arial",
});

export const fontClassName = `${yogaPilatesStudioDisplay.variable} ${yogaPilatesStudioBody.variable}`;
