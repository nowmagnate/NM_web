import localFont from "next/font/local";

/**
 * QUIET — Lora over Karla.
 *
 * The quietest pair available. Low contrast, no display drama, nothing that
 * raises the reader's pulse. Lora is a text serif with soft, slightly
 * calligraphic terminals; used at headline size it is warm without being
 * decorative, which is a narrow target and the right one here.
 *
 * Karla carries the body copy, as it does on Counsel. Different category, so
 * the two are never compared.
 */

// Self-hosted: the files live in ../kit/fonts (see its README) so a build never
// depends on Google being reachable or well-behaved. The constant names are
// prefixed with the template on purpose: next/font/local uses them as the CSS
// font-family names, and all 24 templates load on one page, so they must be unique.
const therapyCounselingDisplay = localFont({
  src: "../kit/fonts/Lora-Variable.woff2",
  variable: "--tpl-font-display",
  display: "swap",
  weight: "400 700",
  adjustFontFallback: "Times New Roman",
});

const therapyCounselingBody = localFont({
  src: "../kit/fonts/Karla-Variable.woff2",
  variable: "--tpl-font-body",
  display: "swap",
  weight: "200 800",
  adjustFontFallback: "Arial",
});

export const fontClassName = `${therapyCounselingDisplay.variable} ${therapyCounselingBody.variable}`;
