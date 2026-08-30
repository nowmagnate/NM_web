import { Newsreader, Karla } from "next/font/google";

/**
 * VERGE — Newsreader over Karla.
 *
 * The same editorial serif Threshold uses in Property & Design, on a different
 * body face and a completely different palette, which is exactly what the
 * family budget rule is for. Newsreader is a screen-first text serif that
 * holds at the middling sizes a project index needs most.
 *
 * Karla underneath has slightly odd, friendly proportions that keep a planting
 * list from reading as a specification document.
 */

const display = Newsreader({
  subsets: ["latin"],
  variable: "--tpl-font-display",
  display: "swap",
});

const body = Karla({
  subsets: ["latin"],
  variable: "--tpl-font-body",
  display: "swap",
});

export const fontClassName = `${display.variable} ${body.variable}`;
