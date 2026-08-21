import { Syne, Heebo, Archivo } from "next/font/google";

/**
 * TYPE — three faces, each with one job.
 *
 * Syne carries every display line: headlines, section titles, the giant
 * ordinal numerals, and the small uppercase eyebrows. It is a geometric
 * grotesque with widened caps and a slight flare at weight, which is why it
 * can hold an 80px headline and a 13px tracked-out label without either
 * looking like a different family.
 *
 * Heebo is the working face. Neutral, tall x-height, quiet enough to sit
 * under Syne at 17/24 for paragraphs.
 *
 * Archivo is the interface face and nothing else: nav items, buttons, chips.
 * Always uppercase, always tracked out (0.2em), 12-13px. Keeping UI chrome on
 * its own face is what stops buttons from reading as headings.
 *
 * All three are variable Google faces, downloaded and self-hosted by
 * next/font at build time, so there is no runtime request to a font CDN and
 * no visitor IP leaked to one.
 *
 * `display: "swap"` here rather than "optional". These are the whole visual
 * identity now; a first paint in Arial that never corrects (which is what
 * "optional" does on a slow connection) is worse than a swap. `adjustFontFallback`
 * is on by default for Google fonts, so the fallback is metric-matched and the
 * swap does not move layout.
 */

export const syne = Syne({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

export const heebo = Heebo({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
  weight: ["300", "400", "500", "600"],
});

export const archivo = Archivo({
  subsets: ["latin"],
  variable: "--font-ui",
  display: "swap",
  weight: ["400", "500", "600"],
});

/** Applied once on <html>. Every font variable the theme references lives here. */
export const fontVariables = [syne.variable, heebo.variable, archivo.variable].join(" ");
