#!/usr/bin/env node
/**
 * Structural audit of the built template previews. Run with
 * `npm run check:templates` after `npm run build`.
 *
 * WHY THIS EXISTS. There are 24 previews, each around 20 bands deep, and every
 * one of them is assembled from the same kit by a config file a non-author is
 * expected to edit. That is exactly the shape of codebase where a single
 * missing alt attribute or a duplicated anchor id survives for months, because
 * nobody reads 24 pages by hand twice.
 *
 * It checks the EXPORTED HTML rather than the source, which is the only place
 * the real answer lives: a section component can be correct and a config can
 * still produce two bands with the same `id`, or a nav link pointing at an
 * anchor that was renamed.
 *
 * Deliberately not a general accessibility linter. Each rule below is a defect
 * this specific system can actually produce, and every one of them was chosen
 * because a plausible config edit causes it.
 */

import { readFileSync, readdirSync, existsSync } from "node:fs";
import { join } from "node:path";

const ROOT = process.cwd();
const PREVIEW = join(ROOT, "out", "preview");

if (!existsSync(PREVIEW)) {
  console.error("\n  No out/preview. Run `npm run build` first.\n");
  process.exit(1);
}

const failures = [];
const warnings = [];

/** Attributes of every tag of a given name, as loose key/value maps. */
function tags(html, name) {
  const out = [];
  const re = new RegExp(`<${name}\\b([^>]*)>`, "gi");
  let m;
  while ((m = re.exec(html))) {
    const attrs = {};
    const are = /([a-zA-Z-]+)(?:="([^"]*)")?/g;
    let a;
    while ((a = are.exec(m[1]))) attrs[a[1].toLowerCase()] = a[2] ?? "";
    out.push(attrs);
  }
  return out;
}

const slugs = readdirSync(PREVIEW, { withFileTypes: true })
  .filter((e) => e.isDirectory())
  .map((e) => e.name);

for (const slug of slugs) {
  const file = join(PREVIEW, slug, "index.html");
  if (!existsSync(file)) {
    failures.push(`${slug}  no index.html emitted`);
    continue;
  }
  const html = readFileSync(file, "utf8");
  const fail = (msg) => failures.push(`${slug}  ${msg}`);
  const warn = (msg) => warnings.push(`${slug}  ${msg}`);

  // --- The page rendered at all, rather than a client-only shell ----------
  // This is the failure mode that previously emptied /templates and /brief,
  // so it is checked on every template rather than once.
  if (html.length < 40_000) fail(`suspiciously small output (${html.length} bytes)`);
  if (!/<main\b/i.test(html)) fail("no <main> in the markup");

  // --- Exactly one h1 ------------------------------------------------------
  // The hero owns it. A config that sets `title` on a band as an h1 would
  // produce a second, which is invisible on screen and wrong to a screen
  // reader.
  const h1s = (html.match(/<h1\b/gi) ?? []).length;
  if (h1s !== 1) fail(`${h1s} h1 elements, expected exactly 1`);

  // --- Heading order -------------------------------------------------------
  const levels = [...html.matchAll(/<h([1-6])\b/gi)].map((m) => Number(m[1]));
  for (let i = 1; i < levels.length; i += 1) {
    if (levels[i] - levels[i - 1] > 1) {
      warn(`heading order jumps h${levels[i - 1]} to h${levels[i]}`);
      break;
    }
  }

  // --- Images: alt text and layout stability ------------------------------
  for (const img of tags(html, "img")) {
    const decorative = img["aria-hidden"] === "true" || img.alt === "";
    if (img.alt === undefined) fail(`<img> with no alt attribute (${img.src ?? "?"})`);
    else if (!decorative && img.alt.trim().length < 8)
      warn(`thin alt text "${img.alt}" on ${img.src ?? "?"}`);

    // CLS: either explicit intrinsic size, or a next/image `fill` which is
    // sized by an ancestor with a fixed aspect ratio.
    const sized = img.width && img.height;
    const filled = /position:absolute/.test(img.style ?? "");
    if (!sized && !filled) fail(`<img> with no width/height and not fill (${img.src ?? "?"})`);
  }

  // --- Duplicate ids -------------------------------------------------------
  // Two bands given the same `id` in a config is a plausible copy-paste error
  // and breaks every anchor pointing at it.
  const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map((m) => m[1]);
  const dupes = [...new Set(ids.filter((id, i) => ids.indexOf(id) !== i))];
  if (dupes.length) fail(`duplicate id: ${dupes.join(", ")}`);

  // --- Every in-page anchor resolves --------------------------------------
  // The single most likely config defect: a nav link left pointing at a band
  // that was renamed or deleted.
  const idSet = new Set(ids);
  const anchors = [...new Set([...html.matchAll(/href="#([^"]+)"/g)].map((m) => m[1]))];
  for (const a of anchors) {
    if (a === "top" || a === "main") continue;
    if (!idSet.has(a)) fail(`link to #${a} but no element has that id`);
  }

  // --- aria-labelledby resolves -------------------------------------------
  for (const el of [...html.matchAll(/aria-labelledby="([^"]+)"/g)].map((m) => m[1])) {
    for (const ref of el.split(/\s+/)) {
      if (!idSet.has(ref)) fail(`aria-labelledby points at missing id "${ref}"`);
    }
  }

  // --- Form controls are labelled -----------------------------------------
  const labelled = new Set(
    [...html.matchAll(/<label\b[^>]*\bfor="([^"]+)"/g)].map((m) => m[1]),
  );
  for (const control of ["input", "select", "textarea"]) {
    for (const el of tags(html, control)) {
      if (el.type === "hidden" || el["aria-hidden"] === "true") continue;
      const named = el["aria-label"] || el["aria-labelledby"];
      if (!named && !(el.id && labelled.has(el.id)))
        fail(`<${control}> with no label (name="${el.name ?? "?"}")`);
    }
  }

  // --- The honesty bar -----------------------------------------------------
  // Every preview in this catalog names its practice as fictional. A template
  // shipping without it would be presenting invented reviews as real.
  if (!/fictional/i.test(html)) fail("no demo bar naming the practice as fictional");

  // --- Placeholder imagery -------------------------------------------------
  if (/picsum/.test(html)) fail("still references picsum placeholder imagery");

  // --- Links that open a new tab carry rel --------------------------------
  for (const a of tags(html, "a")) {
    if (a.target === "_blank" && !/noopener/.test(a.rel ?? ""))
      fail(`target=_blank without rel=noopener (${a.href ?? "?"})`);
  }
}

// --- Report ----------------------------------------------------------------
if (warnings.length) {
  console.log(`\n  ${warnings.length} warning(s):\n`);
  warnings.forEach((w) => console.log(`   ? ${w}`));
}

if (failures.length) {
  console.error(`\n  ${failures.length} structural failure(s):\n`);
  failures.forEach((f) => console.error(`   x ${f}`));
  console.error("");
  process.exit(1);
}

console.log(`\n  Template structure passed. ${slugs.length} previews checked.\n`);
