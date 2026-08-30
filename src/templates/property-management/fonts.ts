import { Chivo, Manrope } from "next/font/google";

/**
 * LEDGER — Chivo over Manrope.
 *
 * Workmanlike on purpose. This template serves two audiences who want opposite
 * things and it has to look administrative rather than aspirational: a
 * landlord is choosing a manager on competence, and a tenant arriving to
 * report a broken boiler is not being marketed to at all.
 *
 * Chivo is a flat-terminalled grotesque with no flourish; Manrope underneath is
 * quiet and has a tall x-height, which keeps a fee table and a compliance list
 * readable at length.
 */

const display = Chivo({
  subsets: ["latin"],
  variable: "--tpl-font-display",
  display: "swap",
});

const body = Manrope({
  subsets: ["latin"],
  variable: "--tpl-font-body",
  display: "swap",
});

export const fontClassName = `${display.variable} ${body.variable}`;
