import localFont from "next/font/local";

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
 * All three are variable faces (SIL Open Font License) committed to this
 * folder as latin-subset woff2 files, served from our own origin: no runtime
 * request to a font CDN and no visitor IP leaked to one.
 *
 * WHY THESE ARE LOCAL FILES AND NOT `next/font/google`. That loader fetches
 * Google's CSS at build time and parses it. In CI the response intermittently
 * came back in a shape the parser did not expect and the whole build crashed
 * with "Cannot read properties of null (reading '1')" in
 * `@next/font/dist/google/loader.js`, failing deploys that had nothing wrong
 * with them. A build should not depend on a third party being well-behaved at
 * that moment, so the files live in the repo instead.
 *
 * `display: "swap"` here rather than "optional". These are the whole visual
 * identity now; a first paint in Arial that never corrects (which is what
 * "optional" does on a slow connection) is worse than a swap.
 * `adjustFontFallback` keeps the fallback metric-matched so the swap does not
 * move layout.
 */

export const syne = localFont({
  src: "./Syne-Variable.woff2",
  variable: "--font-display",
  display: "swap",
  weight: "400 800",
  adjustFontFallback: "Arial",
});

export const heebo = localFont({
  src: "./Heebo-Variable.woff2",
  variable: "--font-body",
  display: "swap",
  weight: "100 900",
  adjustFontFallback: "Arial",
});

export const archivo = localFont({
  src: "./Archivo-Variable.woff2",
  variable: "--font-ui",
  display: "swap",
  weight: "100 900",
  adjustFontFallback: "Arial",
});

/** Applied once on <html>. Every font variable the theme references lives here. */
export const fontVariables = [syne.variable, heebo.variable, archivo.variable].join(" ");
