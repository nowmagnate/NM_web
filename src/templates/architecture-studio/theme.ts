import type { TemplateTheme } from "../kit/schema";

/**
 * DATUM — Concrete.
 *
 * A true neutral grey ground, near-black ink, and a slate-blue accent that is
 * almost a grey itself. The least coloured palette in the catalog by a
 * distance, and deliberately so: this is the one template where the
 * photography is buildings rather than rooms or people, and buildings
 * photograph grey.
 *
 * Atelier sits two rows away in the same category on a warm linen ground.
 * Neutral against warm at similar values is a real separation; two warm
 * near-whites would not have been.
 *
 * DENSITY TIGHT and RADIUS 0. An architecture practice's own site being loose
 * and rounded is an argument against its judgement.
 */
export const theme: TemplateTheme = {
  palette: {
    ink: "#141414",
    bg: "#EDEDED",
    accent: "#5B6B73",
  },
  motion: "reveal",
  density: "tight",
  radius: 0,
};
