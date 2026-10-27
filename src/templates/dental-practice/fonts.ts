import localFont from "next/font/local";

/**
 * ENAMEL — Bricolage Grotesque over Manrope.
 *
 * Bricolage is a grotesque with deliberate irregularities in its curves and
 * terminals, which is exactly what a dental page needs and almost never gets:
 * a display face with some warmth in it stops the page reading as clinical
 * stock photography with a headline on top. Manrope underneath is quiet, has a
 * tall x-height, and stays legible at 15px in a treatment list.
 *
 * ONLY THESE TWO FACES ARE LOADED, and that is why every template declares its
 * fonts in its own file rather than importing a shared registry: a registry
 * module holding the catalog's twenty-two families would emit all of them onto
 * every preview page, whichever two the page actually uses.
 *
 * The variable names are fixed across the catalog (`--tpl-font-display` and
 * `--tpl-font-body`), because `tokens.css` binds Tailwind's `font-tpl-display`
 * and `font-tpl-body` to those two names once for all twenty-four templates.
 * Only one template ever renders on a page, so there is no collision.
 */

// Self-hosted: the files live in ../kit/fonts (see its README) so a build never
// depends on Google being reachable or well-behaved. The constant names are
// prefixed with the template on purpose: next/font/local uses them as the CSS
// font-family names, and all 24 templates load on one page, so they must be unique.
const dentalPracticeDisplay = localFont({
  src: "../kit/fonts/BricolageGrotesque-Variable.woff2",
  variable: "--tpl-font-display",
  display: "swap",
  weight: "200 800",
  adjustFontFallback: "Arial",
});

const dentalPracticeBody = localFont({
  src: "../kit/fonts/Manrope-Variable.woff2",
  variable: "--tpl-font-body",
  display: "swap",
  weight: "200 800",
  adjustFontFallback: "Arial",
});

/** Applied to the template wrapper by TemplateRenderer. */
export const fontClassName = `${dentalPracticeDisplay.variable} ${dentalPracticeBody.variable}`;
