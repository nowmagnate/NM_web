import type { TemplateTheme } from "../kit/schema";

/**
 * QUIET — Mist.
 *
 * WHY THE GROUND MOVED. The catalog swatch was #F4F5F6 and Tempo, in the same
 * category, is #F2F3F4. Two neutral greys two steps apart on templates that
 * could not be more different in intent.
 *
 * #E8ECEF is a soft blue-grey: cooler, more saturated and unmistakably not
 * Tempo's neutral. It also does the template's actual job, which is to lower
 * the reader's pulse before they have read a word.
 *
 * RADIUS 6 and DENSITY AIRY, the softest combination in the authority-led
 * group by a distance. Everything else in this archetype is trying to look
 * documentary. This one is trying to look like a room you would not mind
 * sitting in.
 */
export const theme: TemplateTheme = {
  palette: {
    ink: "#2A3038",
    bg: "#E8ECEF",
    accent: "#7C8FA0",
  },
  motion: "rule",
  density: "airy",
  radius: 6,
};
