import { Libre_Baskerville, Karla } from "next/font/google";

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

const display = Libre_Baskerville({
  subsets: ["latin"],
  variable: "--tpl-font-display",
  display: "swap",
  weight: ["400", "700"],
});

const body = Karla({
  subsets: ["latin"],
  variable: "--tpl-font-body",
  display: "swap",
});

export const fontClassName = `${display.variable} ${body.variable}`;
