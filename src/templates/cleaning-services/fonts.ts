import localFont from "next/font/local";

/**
 * CRISP — Familjen Grotesk over Hanken Grotesk.
 *
 * Plain and quick. This template competes on how fast a booking can be made,
 * so nothing in the type is allowed to slow a reader down: no display face
 * with personality to decode, no tight tracking to squint at, no serif.
 *
 * Familjen Grotesk also carries Sprout's display, which is permitted because
 * the two sit in different catalog categories and will never be compared side
 * by side. Rule 2 in `kit/typography.ts` is about the category, not the
 * catalog.
 */

// Self-hosted: the files live in ../kit/fonts (see its README) so a build never
// depends on Google being reachable or well-behaved. The constant names are
// prefixed with the template on purpose: next/font/local uses them as the CSS
// font-family names, and all 24 templates load on one page, so they must be unique.
const cleaningServicesDisplay = localFont({
  src: "../kit/fonts/FamiljenGrotesk-Variable.woff2",
  variable: "--tpl-font-display",
  display: "swap",
  weight: "400 700",
  adjustFontFallback: "Arial",
});

const cleaningServicesBody = localFont({
  src: "../kit/fonts/HankenGrotesk-Variable.woff2",
  variable: "--tpl-font-body",
  display: "swap",
  weight: "100 900",
  adjustFontFallback: "Arial",
});

export const fontClassName = `${cleaningServicesDisplay.variable} ${cleaningServicesBody.variable}`;
