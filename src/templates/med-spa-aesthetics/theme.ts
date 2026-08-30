import type { TemplateTheme } from "../kit/schema";

/**
 * LUMEN — Pearl.
 *
 * WHY THE GROUND MOVED. The catalog swatch was #FAF6F5, a very pale warm
 * white, and Sprout in the same category is #FFF7F0, also a pale warm white.
 * That is the third time this has come up and the rule is now reflexive: two
 * grounds close in both value and temperature cancel out every other
 * difference between two templates.
 *
 * #F1E7E4 is a proper blush greige, several steps darker and distinctly pink
 * rather than peach. It also does the commercial job better. A near-white
 * ground reads as clinical, and this is the one medical template that is
 * selling a considered purchase rather than treating a problem.
 *
 * RADIUS 2 and DENSITY AIRY. Sharp corners and a lot of air, which is what
 * expensive looks like: the softness in this template comes from the serif and
 * the palette, never from the geometry.
 */
export const theme: TemplateTheme = {
  palette: {
    ink: "#2A2529",
    bg: "#F1E7E4",
    accent: "#B08A8A",
  },
  motion: "settle",
  density: "airy",
  radius: 2,
};
