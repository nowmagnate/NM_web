import localFont from "next/font/local";

/**
 * STUDIO — Bricolage Grotesque over Hanken Grotesk.
 *
 * A display face with deliberate irregularities in its curves and terminals,
 * for the template whose buyer is judging taste before they read a word. A
 * consultancy selling on thinking has to look like it has some.
 *
 * Enamel carries the same display face in Medical & Dental. Different
 * category, so the two are never compared; see the two rules in
 * `kit/typography.ts`.
 */

// Self-hosted: the files live in ../kit/fonts (see its README) so a build never
// depends on Google being reachable or well-behaved. The constant names are
// prefixed with the template on purpose: next/font/local uses them as the CSS
// font-family names, and all 24 templates load on one page, so they must be unique.
const designConsultancyDisplay = localFont({
  src: "../kit/fonts/BricolageGrotesque-Variable.woff2",
  variable: "--tpl-font-display",
  display: "swap",
  weight: "200 800",
  adjustFontFallback: "Arial",
});

const designConsultancyBody = localFont({
  src: "../kit/fonts/HankenGrotesk-Variable.woff2",
  variable: "--tpl-font-body",
  display: "swap",
  weight: "100 900",
  adjustFontFallback: "Arial",
});

export const fontClassName = `${designConsultancyDisplay.variable} ${designConsultancyBody.variable}`;
