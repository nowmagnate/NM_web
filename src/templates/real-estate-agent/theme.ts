import type { TemplateTheme } from "../kit/schema";

/**
 * MERIDIAN — Slate & Bone.
 *
 * WHY THE GROUND MOVED. #E8E6E1 sat eight steps from Atelier's #F0EBE3 and both
 * are warm. #E3E0D8 is a deeper bone: still warm, clearly darker, and a better
 * ground for a grid of photographs than a near-white was. A listing page is
 * mostly images, and a pale ground makes every card look like it is floating.
 *
 * MOTION `stagger`, the inventory gesture and the first use of it in the
 * catalog. A slight dip before the rise gives a grid weight, and filtering
 * crossfades in place rather than animating the layout into a new shape.
 *
 * RADIUS 4. Enough to soften a listing card, not enough to make a house look
 * like an app icon.
 */
export const theme: TemplateTheme = {
  palette: {
    ink: "#1F2933",
    bg: "#E3E0D8",
    accent: "#C2703D",
  },
  motion: "stagger",
  density: "regular",
  radius: 4,
};
