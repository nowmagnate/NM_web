import type { TemplateTheme } from "../kit/schema";

/**
 * ELM — Meadow, on warm chalk.
 *
 * The three authored values are the catalog's own swatches for this template.
 * Everything else derives from them by the rules in `tokens.css`.
 *
 * WHY GREEN, AND WHY THIS GREEN. Blue is the reflexive choice for a medical
 * site and it is already taken by Enamel two rows above this one in the same
 * category. A deep green ground reads as care rather than as procedure, which
 * is the correct distinction between a family practice and a clinic: this is
 * somewhere you go every year for twenty years, not somewhere you go to have
 * something fixed.
 *
 * WHY THE GROUND MOVED. It was #F4F7F4, a cool near-white, and Enamel's is
 * #F3F7F9, also a cool near-white. Two grounds that close in value AND in
 * temperature cancel out a difference in hue: side by side the pages read as
 * the same paper. #F2F0E6 is a warm chalk, and the shift from cool to warm
 * does more to separate the two templates than the green did.
 *
 * RADIUS 8, the softest in the catalog, and DENSITY AIRY. Both are doing the
 * same job. A registration page that feels crowded feels like a form, and a
 * form is the thing this template is trying to make painless.
 */
export const theme: TemplateTheme = {
  palette: {
    ink: "#1E3A32",
    bg: "#F2F0E6",
    accent: "#4E8C6A",
  },
  motion: "settle",
  density: "airy",
  radius: 8,
};
