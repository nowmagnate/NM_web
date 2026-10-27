import localFont from "next/font/local";

/**
 * CORNERSTONE — Lora over Figtree.
 *
 * A warm serif over a soft humanist sans. A custom home is a long-cycle
 * purchase sold on trust rather than on speed, and the type has to carry
 * eighteen months of relationship rather than a booking.
 *
 * Nothing here is sharp or technical. That register belongs to Framework three
 * rows down, which sells against a cheaper bid rather than for a life.
 */

// Self-hosted: the files live in ../kit/fonts (see its README) so a build never
// depends on Google being reachable or well-behaved. The constant names are
// prefixed with the template on purpose: next/font/local uses them as the CSS
// font-family names, and all 24 templates load on one page, so they must be unique.
const customHomeBuilderDisplay = localFont({
  src: "../kit/fonts/Lora-Variable.woff2",
  variable: "--tpl-font-display",
  display: "swap",
  weight: "400 700",
  adjustFontFallback: "Times New Roman",
});

const customHomeBuilderBody = localFont({
  src: "../kit/fonts/Figtree-Variable.woff2",
  variable: "--tpl-font-body",
  display: "swap",
  weight: "300 900",
  adjustFontFallback: "Arial",
});

export const fontClassName = `${customHomeBuilderDisplay.variable} ${customHomeBuilderBody.variable}`;
