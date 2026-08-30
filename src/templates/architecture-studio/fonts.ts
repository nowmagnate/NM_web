import { Space_Grotesk, IBM_Plex_Sans } from "next/font/google";

/**
 * DATUM — Space Grotesk over IBM Plex Sans.
 *
 * Drawn rather than written. Both faces have the slightly technical feel that
 * suits plans and sections: Space Grotesk's odd, cut-off terminals read as
 * something set out with instruments, and IBM Plex was designed for a company
 * that makes machines. Neither is warm, and neither should be.
 *
 * The pairing does the same job here that a serif does on Atelier two rows
 * away in the same category: it tells you what kind of practice this is before
 * you have read a word of the copy.
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
  weight: ["300", "400", "500", "600"],
});

export const fontClassName = `${display.variable} ${body.variable}`;
