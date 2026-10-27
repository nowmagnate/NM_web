import localFont from "next/font/local";

/**
 * COUNSEL — Libre Baskerville over Karla.
 *
 * A transitional serif with no modern affect at all, which is the point for a
 * firm. Libre Baskerville is drawn for text rather than display, so even at
 * headline size it reads as a document rather than as a brand, and that is
 * exactly the register a client with a private matter is looking for.
 *
 * Karla underneath is a grotesque with slightly unusual proportions that keep
 * a page of practice areas from looking like a government form.
 *
 * FIRST OF THE AUTHORITY-LED GROUP, and the first template in the catalog to
 * use the `rule` motion curve: symmetric, mechanical, and closest of the four
 * gestures to static.
 */

// Self-hosted: the files live in ../kit/fonts (see its README) so a build never
// depends on Google being reachable or well-behaved. The constant names are
// prefixed with the template on purpose: next/font/local uses them as the CSS
// font-family names, and all 24 templates load on one page, so they must be unique.
const lawFirmDisplay = localFont({
  src: "../kit/fonts/LibreBaskerville-Variable.woff2",
  variable: "--tpl-font-display",
  display: "swap",
  weight: "400 700",
  adjustFontFallback: "Times New Roman",
});

const lawFirmBody = localFont({
  src: "../kit/fonts/Karla-Variable.woff2",
  variable: "--tpl-font-body",
  display: "swap",
  weight: "200 800",
  adjustFontFallback: "Arial",
});

export const fontClassName = `${lawFirmDisplay.variable} ${lawFirmBody.variable}`;
