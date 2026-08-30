import type { TemplateTheme } from "../kit/schema";

/**
 * TEMPO — Signal.
 *
 * Near-black ink on a cool grey ground with a single hot red-orange. The
 * highest-contrast palette in the catalog, and the only one where the accent
 * is genuinely loud: everything else here is a professional practice trying to
 * be reassuring, and this one is a trainer trying to be convincing.
 *
 * RADIUS 0 and DENSITY TIGHT. Nothing is softened. Asana is the other Wellness
 * template and sits at radius 16 on warm cream with an airy rhythm, so the two
 * are opposites on every axis that matters rather than two versions of a
 * fitness page.
 */
export const theme: TemplateTheme = {
  palette: {
    ink: "#141618",
    bg: "#F2F3F4",
    accent: "#D64933",
  },
  motion: "settle",
  density: "tight",
  radius: 0,
};
