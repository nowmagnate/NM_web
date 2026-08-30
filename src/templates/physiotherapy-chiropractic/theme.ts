import type { TemplateTheme } from "../kit/schema";

/**
 * FULCRUM — Graphite.
 *
 * WHY THE GROUND MOVED, and this is the second time it has been necessary.
 * The catalog swatch was #F1F2F4, a cool near-white, and Enamel's is #F3F7F9,
 * also a cool near-white. Two grounds that close in value and temperature read
 * as the same paper whatever the accent does, which is exactly the mistake Elm
 * made and had to be corrected for.
 *
 * #E4E5E8 is a light-mid grey rather than an off-white: clearly darker than
 * anything else in the catalog, and the only ground so far that reads as a
 * surface rather than as paper. It suits the template. A physiotherapy clinic
 * is a workshop for bodies, and a slightly industrial ground says that without
 * the page having to.
 *
 * DENSITY TIGHT and RADIUS 2, the sharpest so far. Enamel is 6 and regular,
 * Elm is 8 and airy, Sprout is 12 and regular. This one is compressed and
 * nearly square, because the reader is scanning an index of conditions for
 * their own and every extra millimetre of padding is another scroll.
 */
export const theme: TemplateTheme = {
  palette: {
    ink: "#22262B",
    bg: "#E4E5E8",
    accent: "#C1553A",
  },
  motion: "settle",
  density: "tight",
  radius: 2,
};
