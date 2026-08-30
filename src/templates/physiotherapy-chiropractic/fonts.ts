import { Chivo, Work_Sans } from "next/font/google";

/**
 * FULCRUM — Chivo over Work Sans.
 *
 * Direct and unfussy, for a template organised around a visitor finding their
 * own symptom as fast as possible. Chivo is a grotesque with flat terminals and
 * very little flourish; at display weight it reads as a sign rather than as a
 * headline, which is the right register for a clinic whose reader arrived in
 * pain and is not browsing.
 *
 * Work Sans underneath is neutral and slightly condensed at text sizes, so a
 * long index of conditions fits without the page becoming a scroll.
 *
 * Neither face appears anywhere else in Medical & Dental. See the two rules in
 * `kit/typography.ts`.
 */

const display = Chivo({
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
