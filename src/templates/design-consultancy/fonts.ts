import { Bricolage_Grotesque, Hanken_Grotesk } from "next/font/google";

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

const display = Bricolage_Grotesque({
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
