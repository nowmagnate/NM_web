import { Familjen_Grotesk, Hanken_Grotesk } from "next/font/google";

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

const display = Familjen_Grotesk({
  subsets: ["latin"],
  variable: "--tpl-font-display",
  display: "swap",
});

const body = Hanken_Grotesk({
  subsets: ["latin"],
  variable: "--tpl-font-body",
  display: "swap",
});

export const fontClassName = `${display.variable} ${body.variable}`;
