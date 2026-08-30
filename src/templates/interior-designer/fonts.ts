import { Cormorant_Garamond, Jost } from "next/font/google";

/**
 * ATELIER — Cormorant Garamond over Jost.
 *
 * A high-contrast old-style serif over a geometric sans: the pair most
 * photography can sit under without competing with it. That is the entire
 * requirement for a portfolio-led template, where the type's job is to get out
 * of the way of the work and then be beautiful in the small amount of space it
 * is allowed.
 *
 * Cormorant is drawn for display and falls apart under about 20px, so it never
 * sets a label here. Jost does every piece of working type.
 *
 * Lumen carries the same pairing in Medical & Dental. Different category, so
 * the two are never compared; see the two rules in `kit/typography.ts`.
 */

const display = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--tpl-font-display",
  display: "swap",
  weight: ["300", "400", "500", "600"],
});

const body = Jost({
  subsets: ["latin"],
  variable: "--tpl-font-body",
  display: "swap",
});

export const fontClassName = `${display.variable} ${body.variable}`;
