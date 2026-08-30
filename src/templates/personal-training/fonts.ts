import { Archivo, Hanken_Grotesk } from "next/font/google";

/**
 * TEMPO — Archivo over Hanken Grotesk.
 *
 * Archivo at its heaviest weight is the only display face in the catalog used
 * as a block of colour rather than as a line of words. It is a grotesque with
 * almost no modulation, so at 800 and negative tracking a headline stops being
 * type and becomes a shape, which is the correct register for a template
 * selling multi-week programmes to people who have already decided they want
 * to be pushed.
 *
 * Hanken Grotesk underneath is calm and slightly narrow, so a page of
 * programme detail does not read as shouting all the way down.
 */

const display = Archivo({
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
