import type { TemplateTheme } from "../kit/schema";

/**
 * SPROUT — Apricot.
 *
 * The third template in Medical & Dental, and the one that had to work hardest
 * to not look like the other two. Enamel is a cool blue-white, Elm is a warm
 * chalk, and this is a warm peach: brighter than both, and the only ground in
 * the category with any real saturation in it.
 *
 * WHY A PLUM INK RATHER THAN A BLACK. `#2C2A3E` is a very dark violet, and
 * under an apricot accent it reads as warm rather than as printed. A neutral
 * near-black would have pulled the whole page back toward the clinical register
 * the other two occupy, which is exactly what a paediatric practice is trying
 * not to be.
 *
 * RADIUS 12, the largest in the catalog so far, and the one place the softness
 * is allowed to be obvious. This is the template where warmth IS the argument:
 * a parent choosing a paediatrician is choosing on feel long before they read
 * the vaccination schedule.
 */
export const theme: TemplateTheme = {
  palette: {
    ink: "#2C2A3E",
    bg: "#FFF7F0",
    accent: "#E08D5A",
  },
  motion: "settle",
  density: "regular",
  radius: 12,
};
