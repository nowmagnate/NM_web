import localFont from "next/font/local";

/**
 * VERGE — Newsreader over Karla.
 *
 * The same editorial serif Threshold uses in Property & Design, on a different
 * body face and a completely different palette, which is exactly what the
 * family budget rule is for. Newsreader is a screen-first text serif that
 * holds at the middling sizes a project index needs most.
 *
 * Karla underneath has slightly odd, friendly proportions that keep a planting
 * list from reading as a specification document.
 */

// Self-hosted: the files live in ../kit/fonts (see its README) so a build never
// depends on Google being reachable or well-behaved. The constant names are
// prefixed with the template on purpose: next/font/local uses them as the CSS
// font-family names, and all 24 templates load on one page, so they must be unique.
const landscapeDesignBuildDisplay = localFont({
  src: "../kit/fonts/Newsreader-Variable.woff2",
  variable: "--tpl-font-display",
  display: "swap",
  weight: "200 800",
  adjustFontFallback: "Times New Roman",
});

const landscapeDesignBuildBody = localFont({
  src: "../kit/fonts/Karla-Variable.woff2",
  variable: "--tpl-font-body",
  display: "swap",
  weight: "200 800",
  adjustFontFallback: "Arial",
});

export const fontClassName = `${landscapeDesignBuildDisplay.variable} ${landscapeDesignBuildBody.variable}`;
