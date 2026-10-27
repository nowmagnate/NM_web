import localFont from "next/font/local";

/**
 * ELM — Fraunces over Public Sans.
 *
 * CHANGED, and the reason is worth recording. Elm originally paired Outfit
 * with Manrope, and Manrope is also Enamel's body face. Two templates in the
 * same catalog category, both set in the same body face, both on a cool
 * near-white ground, read as one template with the content swapped. The
 * three-per-family budget in `kit/typography.ts` permitted it and the budget
 * was the wrong test: what matters is not how many templates share a face, it
 * is whether the two a buyer opens in adjacent tabs share one.
 *
 * So Elm gets a serif, and the difference is immediate rather than subtle.
 * Fraunces is a soft, slightly wonky old-style with real optical sizing, and
 * at display size it reads as a practice that has been there a while, which is
 * exactly the argument a family doctor makes and exactly the argument a dental
 * practice does not. Public Sans underneath is plain, civic and unfashionable
 * on purpose: it keeps the registration copy sounding like information rather
 * than marketing.
 */

// Self-hosted: the files live in ../kit/fonts (see its README) so a build never
// depends on Google being reachable or well-behaved. The constant names are
// prefixed with the template on purpose: next/font/local uses them as the CSS
// font-family names, and all 24 templates load on one page, so they must be unique.
const familyPracticeDisplay = localFont({
  src: "../kit/fonts/Fraunces-Variable.woff2",
  variable: "--tpl-font-display",
  display: "swap",
  weight: "100 900",
  adjustFontFallback: "Times New Roman",
});

const familyPracticeBody = localFont({
  src: "../kit/fonts/PublicSans-Variable.woff2",
  variable: "--tpl-font-body",
  display: "swap",
  weight: "100 900",
  adjustFontFallback: "Arial",
});

export const fontClassName = `${familyPracticeDisplay.variable} ${familyPracticeBody.variable}`;
