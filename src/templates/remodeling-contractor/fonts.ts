import { Space_Grotesk, IBM_Plex_Sans } from "next/font/google";

/**
 * FRAMEWORK — Space Grotesk over IBM Plex Sans.
 *
 * Reads as licensed and technical, which is the argument this template makes
 * against a cheaper bid. A remodeling contractor competing on credentials
 * needs a page that looks like it was produced by somebody who reads
 * drawings.
 *
 * Datum carries the same pairing in Property & Design. Different category, and
 * a very different palette.
 */

const display = Space_Grotesk({
  subsets: ["latin"],
  variable: "--tpl-font-display",
  display: "swap",
});

const body = IBM_Plex_Sans({
  subsets: ["latin"],
  variable: "--tpl-font-body",
  display: "swap",
});

export const fontClassName = `${display.variable} ${body.variable}`;
