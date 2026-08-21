/**
 * Browser-chrome colour.
 *
 * The ONE place outside `globals.css` where a literal hex is allowed: the
 * `<meta name="theme-color">` tag cannot read a CSS custom property, because
 * the browser paints its own UI before the stylesheet is parsed.
 *
 * MUST STAY IN SYNC with `--bg` in `src/app/globals.css`. This world is
 * light-only by decision (a white studio sheet), so there is no dark value to
 * pair with it.
 */
export const themeColors = {
  ground: "#ffffff",
} as const;
