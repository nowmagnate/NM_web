import { Instrument_Serif, Work_Sans } from "next/font/google";

/**
 * APERTURE — Instrument Serif over Work Sans.
 *
 * The display face is used once per screen at large size and nowhere else, so
 * the photographs are never sharing the stage with the type. Instrument Serif
 * is a high-contrast display serif with almost no weight range, which suits a
 * template that will only ever set one line of it at a time.
 *
 * Work Sans does every piece of working type, including the package prices,
 * where neutrality matters more than character.
 */

const display = Instrument_Serif({
  subsets: ["latin"],
  variable: "--tpl-font-display",
  display: "swap",
  // Instrument Serif ships one weight. next/font requires it stated, which is
  // also a fair description of how the face should be used: one size, one
  // weight, once per screen.
  weight: "400",
});

const body = Work_Sans({
  subsets: ["latin"],
  variable: "--tpl-font-body",
  display: "swap",
});

export const fontClassName = `${display.variable} ${body.variable}`;
