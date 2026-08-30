import { DM_Serif_Display, Instrument_Sans } from "next/font/google";

/**
 * PASSAGE — DM Serif Display over Instrument Sans.
 *
 * Warmer than Counsel, because this reader arrives anxious rather than
 * aggrieved. Somebody looking for an immigration attorney is usually worried
 * about a deadline, a status, or a family member, and the page should not add
 * to that by looking like a courthouse.
 *
 * DM Serif Display has high contrast and generous curves; it is a headline
 * face and is used only as one. Instrument Sans underneath is a plain, wide
 * grotesque that keeps a page of visa categories readable, and it is here
 * rather than Karla because Counsel carries Karla in the same category.
 */

const display = DM_Serif_Display({
  subsets: ["latin"],
  variable: "--tpl-font-display",
  display: "swap",
  weight: "400",
});

const body = Instrument_Sans({
  subsets: ["latin"],
  variable: "--tpl-font-body",
  display: "swap",
});

export const fontClassName = `${display.variable} ${body.variable}`;
