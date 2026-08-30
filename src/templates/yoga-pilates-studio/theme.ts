import type { TemplateTheme } from "../kit/schema";

/**
 * ASANA — Terracotta.
 *
 * A warm cream ground under a near-black brown, with a burnt clay accent. The
 * warmest palette built so far, and the furthest from the clinical registers
 * of the medical group: nothing here is white, and the ink is brown rather
 * than a neutral, so even the body copy carries some warmth in it.
 *
 * RADIUS 16 and DENSITY AIRY, the softest and most open combination in the
 * catalog. A studio timetable is a dense object by nature and the surrounding
 * air is what stops it feeling like an airline departure board.
 */
export const theme: TemplateTheme = {
  palette: {
    ink: "#2E2721",
    bg: "#FAF6F1",
    accent: "#B5674A",
  },
  motion: "settle",
  density: "airy",
  radius: 16,
};
