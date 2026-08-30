import type { TemplateTheme } from "../kit/schema";

/**
 * APERTURE — Silver Halide.

 * The nearest thing to a gallery wall in the catalog: near-black ink on an
 * almost-white ground with a grey accent that barely registers as a colour at
 * all. Deliberately the least opinionated palette here, because every
 * photograph a client uploads brings its own and the page has to hold all of
 * them without arguing.
 *
 * RADIUS 0 and DENSITY AIRY. A photographer's frames are hard-edged and the
 * work needs room. Rounding the corners of a photograph is the fastest way to
 * make it look like a product listing.
 */
export const theme: TemplateTheme = {
  palette: {
    ink: "#101010",
    bg: "#F7F7F7",
    accent: "#8C8C8C",
  },
  motion: "reveal",
  density: "airy",
  radius: 0,
};
