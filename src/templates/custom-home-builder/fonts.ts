import { Lora, Figtree } from "next/font/google";

/**
 * CORNERSTONE — Lora over Figtree.
 *
 * A warm serif over a soft humanist sans. A custom home is a long-cycle
 * purchase sold on trust rather than on speed, and the type has to carry
 * eighteen months of relationship rather than a booking.
 *
 * Nothing here is sharp or technical. That register belongs to Framework three
 * rows down, which sells against a cheaper bid rather than for a life.
 */

const display = Lora({
  subsets: ["latin"],
  variable: "--tpl-font-display",
  display: "swap",
});

const body = Figtree({
  subsets: ["latin"],
  variable: "--tpl-font-body",
  display: "swap",
});

export const fontClassName = `${display.variable} ${body.variable}`;
