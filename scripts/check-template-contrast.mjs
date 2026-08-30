#!/usr/bin/env node
/**
 * Template palette contrast check. Run with `npm run check:contrast`.
 *
 * A template config authors three colours and `src/templates/kit/tokens.css`
 * derives the rest from them with `color-mix()`. That is the mechanism that
 * makes a palette customizable: a client edits three hex values and the whole
 * template re-themes. It is also the mechanism that could quietly ship a site
 * whose body copy sits at 3:1, because nobody checks a derivation by eye.
 *
 * So the derivations are restated here and every text-bearing pair is measured.
 * The pairs matter more than the tokens: `--tpl-faint` is absent below because
 * it is documented as non-text and is only ever used on a decorative numeral.
 *
 * KEEP IN STEP WITH tokens.css. If a mix percentage changes there and not here,
 * this check silently starts measuring a colour the browser never renders. The
 * percentages are named as constants for exactly that reason.
 *
 * `color-mix(in srgb, ...)` interpolates in gamma-encoded sRGB, which is a
 * straight per-channel weighted average of the two hex values, so the mixing
 * below is the same arithmetic the browser does.
 */

import { readFileSync, readdirSync, existsSync } from "node:fs";
import { join } from "node:path";

const ROOT = process.cwd();
const TEMPLATES = join(ROOT, "src", "templates");

/** Mirrors the derivations in tokens.css. Percentage of the FIRST colour. */
const MIX = {
  surfaceTowardWhite: 0.7,
  muted: 0.72,
  ruleStrong: 0.26,
  accentDeep: 0.55,
  field: 0.22,
  mutedStrong: 0.8,
  invertMuted: 0.76,
  // The hero scrim. Any region of the hero photograph that carries type is
  // covered by at least this much ink; see the `[data-scrim]` blocks in
  // tokens.css. The nav zone is the lightest at 76%.
  scrimText: 0.8,
  scrimNav: 0.82,
  invertAccentDeep: 0.62,
};

const AA_BODY = 4.5;

function parseHex(hex) {
  const value = hex.replace("#", "");
  return [
    parseInt(value.slice(0, 2), 16),
    parseInt(value.slice(2, 4), 16),
    parseInt(value.slice(4, 6), 16),
  ];
}

const toHex = (rgb) =>
  "#" + rgb.map((c) => Math.round(c).toString(16).padStart(2, "0")).join("");

/** color-mix(in srgb, a p%, b) */
function mix(a, b, p) {
  const [ar, ag, ab] = parseHex(a);
  const [br, bg, bb] = parseHex(b);
  return toHex([ar * p + br * (1 - p), ag * p + bg * (1 - p), ab * p + bb * (1 - p)]);
}

function luminance(hex) {
  const [r, g, b] = parseHex(hex).map((channel) => {
    const c = channel / 255;
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function contrast(a, b) {
  const [high, low] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (high + 0.05) / (low + 0.05);
}

/**
 * Reads the three authored colours straight out of a template's `theme.ts`.
 *
 * A regex rather than an import, because these are TypeScript modules and this
 * is a plain node script. The shape it matches is the shape `paletteSchema`
 * enforces, so a theme file this cannot read is a theme file that would not
 * have compiled.
 */
function readPalette(slug) {
  const file = join(TEMPLATES, slug, "theme.ts");
  if (!existsSync(file)) return null;

  const source = readFileSync(file, "utf8");
  const pick = (key) =>
    source.match(new RegExp(`${key}:\\s*"(#[0-9a-fA-F]{6})"`))?.[1] ?? null;

  const ink = pick("ink");
  const bg = pick("bg");
  const accent = pick("accent");
  if (!ink || !bg || !accent) return null;

  return { ink, bg, accent };
}

function derive({ ink, bg, accent }) {
  return {
    light: {
      bg,
      ink,
      muted: mix(ink, bg, MIX.muted),
      surface: mix(bg, "#ffffff", MIX.surfaceTowardWhite),
      ruleStrong: mix(ink, bg, MIX.ruleStrong),
      accentDeep: mix(accent, ink, MIX.accentDeep),
      onAccent: "#ffffff",
      // The hero field, and the secondary copy that has to sit on it.
      // `--tpl-muted-strong` is declared as ink at 80% alpha, and alpha
      // compositing over an opaque ground is the same arithmetic as a mix,
      // so it is measured here against the field it actually renders on.
      field: mix(accent, bg, MIX.field),
      mutedOnField: mix(ink, mix(accent, bg, MIX.field), MIX.mutedStrong),
    },
    /**
     * THE WORST CASE FOR THE HERO, which is the whole reason the scrim exists.
     *
     * A client will swap the hero photograph without asking anybody, so the
     * only image worth testing against is the palest one possible: pure white.
     * These are the scrim composited over #ffffff. Anything darker in the real
     * photograph only improves them, so passing here passes for every image.
     */
    hero: {
      text: mix(ink, "#ffffff", MIX.scrimText),
      nav: mix(ink, "#ffffff", MIX.scrimNav),
      on: bg,
      // Small uppercase labels over the photograph. Same colour as the
      // headline: there is no dimmed tier over media, by rule.
      onSoft: bg,
    },
    // The inverted band: ink and ground trade places, and every derivation is
    // recomputed from the swap rather than reused.
    dark: {
      bg: ink,
      ink: bg,
      muted: mix(bg, ink, MIX.invertMuted),
      accentDeep: mix(accent, bg, MIX.invertAccentDeep),
      onAccent: ink,
    },
  };
}

const slugs = readdirSync(TEMPLATES, { withFileTypes: true })
  .filter((entry) => entry.isDirectory() && entry.name !== "kit")
  .map((entry) => entry.name);

const failures = [];
let checked = 0;

for (const slug of slugs) {
  const palette = readPalette(slug);
  if (!palette) {
    failures.push(`${slug}  could not read ink/bg/accent from theme.ts`);
    continue;
  }

  const { light, dark, hero } = derive(palette);

  const pairs = [
    ["body copy on ground", light.ink, light.bg],
    ["secondary copy on ground", light.muted, light.bg],
    ["secondary copy on surface", light.muted, light.surface],
    ["accent text on ground", light.accentDeep, light.bg],
    ["button label on accent", light.onAccent, light.accentDeep],
    ["headline on hero field", light.ink, light.field],
    ["secondary copy on hero field", light.mutedOnField, light.field],
    ["chip on hero field", light.ink, light.bg],
    ["hero headline over a white photo", hero.on, hero.text],
    ["hero labels over a white photo", hero.onSoft, hero.text],
    ["nav over a white photo", hero.on, hero.nav],
    ["body copy on dark band", dark.ink, dark.bg],
    ["secondary copy on dark band", dark.muted, dark.bg],
    ["button label on accent, dark band", dark.onAccent, dark.accentDeep],
  ];

  for (const [name, fg, bgColor] of pairs) {
    checked += 1;
    const ratio = contrast(fg, bgColor);
    if (ratio < AA_BODY) {
      failures.push(
        `${slug}  ${name}: ${ratio.toFixed(2)}:1 (${fg} on ${bgColor}), AA needs ${AA_BODY}`,
      );
    }
  }
}

if (failures.length) {
  console.error(`\n  ${failures.length} contrast failure(s):\n`);
  failures.forEach((failure) => console.error(`   x ${failure}`));
  console.error("");
  process.exit(1);
}

console.log(
  `\n  Contrast passed. ${checked} pairs across ${slugs.length} template(s).\n`,
);
