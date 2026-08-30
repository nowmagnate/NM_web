import { Cormorant_Garamond, Jost } from "next/font/google";

/**
 * LUMEN — Cormorant Garamond over Jost.
 *
 * The luxury pairing, and the only high-contrast old-style serif in the
 * booking-led group. Higher-value aesthetic treatments are sold the way
 * cosmetics are sold, which means the type carries the price positioning
 * before a single number appears on the page.
 *
 * Cormorant is drawn for display and falls apart under 20px, so it is used
 * only at headline sizes and never for a label. Jost does all the working
 * type: a geometric sans with enough neutrality to keep a treatment menu
 * readable without arguing with the serif above it.
 *
 * Neither face appears anywhere else in Medical & Dental.
 */

const display = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--tpl-font-display",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const body = Jost({
  subsets: ["latin"],
  variable: "--tpl-font-body",
  display: "swap",
});

export const fontClassName = `${display.variable} ${body.variable}`;
