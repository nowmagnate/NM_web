import { Outfit, Manrope } from "next/font/google";

/**
 * ASANA — Outfit over Manrope.
 *
 * Open counters and generous spacing, carrying a timetable that has to stay
 * legible at a glance on a phone at seven in the morning. Both faces are soft
 * geometrics with almost no contrast, which is what lets a dense grid of class
 * times read as calm rather than as a spreadsheet.
 *
 * Both faces appear elsewhere in the catalog and neither appears anywhere else
 * in Wellness & Therapy, which is the test that matters. See the two rules in
 * `kit/typography.ts`.
 */

const display = Outfit({
  subsets: ["latin"],
  variable: "--tpl-font-display",
  display: "swap",
});

const body = Manrope({
  subsets: ["latin"],
  variable: "--tpl-font-body",
  display: "swap",
});

export const fontClassName = `${display.variable} ${body.variable}`;
