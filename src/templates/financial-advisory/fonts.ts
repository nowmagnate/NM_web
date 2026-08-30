import { Newsreader, Public_Sans } from "next/font/google";

/**
 * COMPASS — Newsreader over Public Sans.
 *
 * Reads as a published document, which is what a fee schedule and a fiduciary
 * statement should look like. Newsreader is a screen-first text serif with low
 * contrast, so it holds at the middling sizes this template uses most, and it
 * never looks like a logo.
 *
 * Public Sans is a civic face, drawn for government use, and that association
 * is doing real work here: this is the template whose entire argument is that
 * the adviser is paid by the client and nobody else.
 */

const display = Newsreader({
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
