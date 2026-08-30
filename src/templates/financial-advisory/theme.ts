import type { TemplateTheme } from "../kit/schema";

/**
 * COMPASS — Navy & Sand.
 *
 * WHY THE GROUND MOVED. #F6F4F0 was a warm near-white and Passage, in the same
 * category, is #F1EDE6. Both warm, four steps apart.
 *
 * #E8E6E0 is a stone: several steps darker, greyer, and closer to paper stock
 * than to paper white. It is the right ground for a template that wants to
 * read as a printed document rather than as a website.
 *
 * RADIUS 0, the only zero in Legal & Financial. Everything on this page is a
 * table, a rule or a statement of fact, and none of those has a rounded
 * corner.
 */
export const theme: TemplateTheme = {
  palette: {
    ink: "#182338",
    bg: "#E8E6E0",
    accent: "#A8834E",
  },
  motion: "rule",
  density: "regular",
  radius: 0,
};
