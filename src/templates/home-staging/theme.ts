import type { TemplateTheme } from "../kit/schema";

/**
 * THRESHOLD — Sage & Chalk.
 *
 * WHY THE GROUND MOVED, for the fourth time and the last time it should be
 * necessary. The catalog swatch was #F5F3EE, a warm chalk, and Atelier in the
 * same category is #F0EBE3, also a warm chalk. Two grounds that close in value
 * and temperature cancel every other difference between two templates.
 *
 * #EAEEE8 is a pale sage, which is cooler, greener, and considerably more
 * faithful to the palette's own name than a cream ever was. Sage & Chalk with
 * no sage in it was always slightly odd.
 *
 * RADIUS 0 like the rest of the portfolio-led group. This template shows rooms
 * photographed square, and a rounded frame around a square photograph is the
 * fastest way to make a stager's work look like a listing rather than a folio.
 */
export const theme: TemplateTheme = {
  palette: {
    ink: "#2F3A34",
    bg: "#EAEEE8",
    accent: "#8A9A88",
  },
  motion: "reveal",
  density: "regular",
  radius: 0,
};
