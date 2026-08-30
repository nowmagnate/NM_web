import type { TemplateTheme } from "../kit/schema";

/**
 * ATELIER — Clay & Linen.
 *
 * The first portfolio-led template, and the palette works differently here
 * than in the booking-led group. There, colour was doing persuasion. Here it
 * is doing nothing except staying out of the way: a warm linen ground, a
 * near-black brown ink, and a clay accent that appears on perhaps four
 * elements in the whole page.
 *
 * RADIUS 0. The archetype sits at zero and means it. Every image in a
 * portfolio is a rectangle with a hard edge, and rounding the frames while the
 * photographs inside them stay square is the single fastest way to make a
 * studio's work look like it is being sold rather than shown.
 *
 * DENSITY AIRY, because the work needs room around it and because a designer's
 * own site being cramped is an argument against hiring them.
 */
export const theme: TemplateTheme = {
  palette: {
    ink: "#2B2622",
    bg: "#F0EBE3",
    accent: "#9A7B5F",
  },
  motion: "reveal",
  density: "airy",
  radius: 0,
};
