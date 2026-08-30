import type { TemplateTheme } from "../kit/schema";

/**
 * COUNSEL — Oxford.
 *
 * WHY THE GROUND MOVED. The catalog swatch was #F4F5F7 and Passage in the same
 * category is #F2F5F8. Two cool near-whites two steps apart, which is the
 * eighth time this has come up and the reason it is now the first line of the
 * direction document.
 *
 * #EDEEF1 is a definite cool grey rather than an off-white. It reads as weight,
 * which is the whole argument a firm is making, and it lets the brass accent
 * register as brass rather than as yellow on paper.
 *
 * MOTION `rule`, the authority-led gesture and the first use of it in the
 * catalog. A hairline draws itself and the text under it barely moves. Nothing
 * on a law firm's page should look eager.
 *
 * RADIUS 2. Almost square. A rounded corner on a page about a private legal
 * matter is a small wrong note.
 */
export const theme: TemplateTheme = {
  palette: {
    ink: "#12233B",
    bg: "#EDEEF1",
    accent: "#8C6A3F",
  },
  motion: "rule",
  density: "regular",
  radius: 2,
};
