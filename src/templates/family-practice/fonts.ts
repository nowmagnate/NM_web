import { Fraunces, Public_Sans } from "next/font/google";

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

const display = Fraunces({
  subsets: ["latin"],
  variable: "--tpl-font-display",
  display: "swap",
});

const body = Public_Sans({
  subsets: ["latin"],
  variable: "--tpl-font-body",
  display: "swap",
});

export const fontClassName = `${display.variable} ${body.variable}`;
