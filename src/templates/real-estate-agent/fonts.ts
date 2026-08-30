import { Instrument_Serif, Public_Sans } from "next/font/google";

/**
 * MERIDIAN — Instrument Serif over Public Sans.
 *
 * A serif with real contrast over a plain civic sans, so listings read as
 * property rather than as product. The display face appears once per screen at
 * large size and never on a listing card, because a price set in a display
 * serif starts to look like a menu.
 *
 * Public Sans carries every listing, every price and every filter control. It
 * is a government-commissioned face with proper tabular figures, which matters
 * on a page that is mostly numbers in a grid.
 */

const display = Instrument_Serif({
  subsets: ["latin"],
  variable: "--tpl-font-display",
  display: "swap",
  weight: "400",
});

const body = Public_Sans({
  subsets: ["latin"],
  variable: "--tpl-font-body",
  display: "swap",
});

export const fontClassName = `${display.variable} ${body.variable}`;
