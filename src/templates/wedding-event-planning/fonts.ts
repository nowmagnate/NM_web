import { Playfair_Display, Jost } from "next/font/google";

/**
 * BLOOM — Playfair Display over Jost.
 *
 * The one unashamedly decorative pairing in the catalog, because this is the
 * one category where restraint reads as coldness. A couple choosing a planner
 * is not looking for a practice that looks efficient.
 *
 * Playfair's high contrast and old-style figures do the romance; Jost
 * underneath keeps the service tiers and the availability form legible, which
 * is where the actual decision gets made.
 */

const display = Playfair_Display({
  subsets: ["latin"],
  variable: "--tpl-font-display",
  display: "swap",
});

const body = Jost({
  subsets: ["latin"],
  variable: "--tpl-font-body",
  display: "swap",
});

export const fontClassName = `${display.variable} ${body.variable}`;
