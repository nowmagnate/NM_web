import type { TemplateTheme } from "../kit/schema";

/**
 * ENAMEL — Clinic Blue.
 *
 * The three authored values are the three swatches the catalog already
 * publishes for this template, unchanged. Everything else (the lifted surface,
 * the secondary text colour, the hairline, the wash, the text-safe accent) is
 * derived from them by the rules in `tokens.css`, so this file is three
 * colours and three decisions rather than a stylesheet.
 *
 * WHY THIS GROUND. `#F3F7F9` is a cool off-white with a trace of the accent in
 * it. Pure white reads as a hospital form; a warm cream reads as a spa and
 * undercuts the clinical competence half of the argument. This sits between,
 * which is where a practice competing on comfort AND clarity has to sit.
 *
 * RADIUS 6. The booking-led archetype is the only one allowed above 2px,
 * because warmth is doing conversion work here rather than decoration. Six is
 * enough to soften a button and a photograph and not enough to make the page
 * look like a consumer app.
 */
export const theme: TemplateTheme = {
  palette: {
    ink: "#16303F",
    bg: "#F3F7F9",
    accent: "#3D8DA8",
  },
  motion: "settle",
  density: "regular",
  radius: 6,
};
