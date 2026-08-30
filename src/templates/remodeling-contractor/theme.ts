import type { TemplateTheme } from "../kit/schema";

/**
 * FRAMEWORK — Workshop.

 * WHY THE GROUND MOVED. The catalog swatch was #F2F1EF, a warm near-white
 * within a couple of steps of Cornerstone's #F5F2ED in the same category.
 *
 * #E6E4E0 is a mid concrete grey. It reads as a surface rather than as paper,
 * which is right for a contractor whose argument is competence, and it lets
 * the orange accent do real work instead of floating on white.
 *
 * DENSITY TIGHT and RADIUS 0. Nothing here is soft. This template competes
 * against cheaper, less credentialed bids, and looking expensive is not the
 * job. Looking exact is.
 */
export const theme: TemplateTheme = {
  palette: {
    ink: "#1C1E20",
    bg: "#E6E4E0",
    accent: "#C77A2E",
  },
  motion: "reveal",
  density: "tight",
  radius: 0,
};
