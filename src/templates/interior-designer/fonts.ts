import localFont from "next/font/local";

/**
 * ATELIER — Cormorant Garamond over Jost.
 *
 * A high-contrast old-style serif over a geometric sans: the pair most
 * photography can sit under without competing with it. That is the entire
 * requirement for a portfolio-led template, where the type's job is to get out
 * of the way of the work and then be beautiful in the small amount of space it
 * is allowed.
 *
 * Cormorant is drawn for display and falls apart under about 20px, so it never
 * sets a label here. Jost does every piece of working type.
 *
 * Lumen carries the same pairing in Medical & Dental. Different category, so
 * the two are never compared; see the two rules in `kit/typography.ts`.
 */

// Self-hosted: the files live in ../kit/fonts (see its README) so a build never
// depends on Google being reachable or well-behaved. The constant names are
// prefixed with the template on purpose: next/font/local uses them as the CSS
// font-family names, and all 24 templates load on one page, so they must be unique.
const interiorDesignerDisplay = localFont({
  src: "../kit/fonts/CormorantGaramond-Variable.woff2",
  variable: "--tpl-font-display",
  display: "swap",
  weight: "300 700",
  adjustFontFallback: "Times New Roman",
});

const interiorDesignerBody = localFont({
  src: "../kit/fonts/Jost-Variable.woff2",
  variable: "--tpl-font-body",
  display: "swap",
  weight: "100 900",
  adjustFontFallback: "Arial",
});

export const fontClassName = `${interiorDesignerDisplay.variable} ${interiorDesignerBody.variable}`;
