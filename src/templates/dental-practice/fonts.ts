import { Bricolage_Grotesque, Manrope } from "next/font/google";

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

const display = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--tpl-font-display",
  display: "swap",
});

const body = Manrope({
  subsets: ["latin"],
  variable: "--tpl-font-body",
  display: "swap",
});

/** Applied to the template wrapper by TemplateRenderer. */
export const fontClassName = `${display.variable} ${body.variable}`;
