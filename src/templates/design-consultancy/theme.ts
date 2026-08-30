import type { TemplateTheme } from "../kit/schema";

/**
 * STUDIO — Ink & Citrus.

 * WHY THE GROUND MOVED. The catalog swatch was #F4F4F2, which is a
 * near-neutral off-white, and Aperture in the same category is #F7F7F7. Two
 * neutral near-whites at nearly the same value cancel every other difference
 * between two templates, which is now the fifth time this has been caught.
 *
 * #E8E7E1 is a deep putty: several steps darker, distinctly warm, and a far
 * better ground for a single acid-yellow accent than a white was. A
 * consultancy that has picked an actual colour is making a small argument for
 * its own judgement.
 *
 * DENSITY TIGHT. This template sells thinking, and thinking looks like a
 * densely set page rather than a spacious one.
 */
export const theme: TemplateTheme = {
  palette: {
    ink: "#17181A",
    bg: "#E8E7E1",
    accent: "#C8A415",
  },
  motion: "reveal",
  density: "tight",
  radius: 0,
};
