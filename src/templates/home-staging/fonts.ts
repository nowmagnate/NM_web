import { Newsreader, Work_Sans } from "next/font/google";

/**
 * THRESHOLD — Newsreader over Work Sans.
 *
 * An editorial serif for a template whose entire argument is a comparison, and
 * comparison is a magazine device. Newsreader is a screen-first text serif
 * with low contrast, so it holds up at the middling sizes this template uses
 * most, which are captions and project names rather than giant headlines.
 *
 * Work Sans underneath is neutral and slightly narrow, which matters on a page
 * carrying package prices and room lists.
 */

const display = Newsreader({
  subsets: ["latin"],
  variable: "--tpl-font-display",
  display: "swap",
});

const body = Work_Sans({
  subsets: ["latin"],
  variable: "--tpl-font-body",
  display: "swap",
});

export const fontClassName = `${display.variable} ${body.variable}`;
