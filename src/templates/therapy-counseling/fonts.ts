import { Lora, Karla } from "next/font/google";

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

const display = Lora({
  subsets: ["latin"],
  variable: "--tpl-font-display",
  display: "swap",
});

const body = Karla({
  subsets: ["latin"],
  variable: "--tpl-font-body",
  display: "swap",
});

export const fontClassName = `${display.variable} ${body.variable}`;
