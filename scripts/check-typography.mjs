#!/usr/bin/env node
/**
 * The two typeface rules, run rather than remembered.
 * `npm run check:type`.
 *
 *   1. No family carries more than three templates across the catalog.
 *   2. NO TWO TEMPLATES IN THE SAME CATEGORY SHARE A FAMILY AT ALL.
 *
 * Rule 1 came first and was the wrong test on its own: Elm and Enamel both sat
 * in Medical & Dental set in Manrope, and the budget was satisfied while the
 * two templates read as one with the content swapped. What matters is not how
 * many templates share a face across a catalog nobody reads end to end, it is
 * whether the two a buyer opens in adjacent tabs share one. Rule 2 found three
 * further clashes the moment it was written.
 *
 * Also checks the two axes that carry the same argument as the typefaces:
 *
 *   3. No two templates in a category use the same hero COMPOSITION.
 *   4. No two templates in a category use the same GROUND.
 *
 * MOTION IS DELIBERATELY NOT CHECKED. It follows the archetype rather than the
 * template: `settle` for booking-led, `reveal` for portfolio-led, `rule` for
 * authority-led, `stagger` for inventory. Meridian and Ledger share `stagger`
 * because they are the only two inventory templates, and that is correct.
 *
 * Everything is read out of the source files rather than imported, because
 * these are TypeScript modules and this is a plain node script. Each pattern
 * matches the shape the schema already enforces, so a file this cannot read is
 * a file that would not have compiled.
 */

import { readFileSync, existsSync } from "node:fs";
import { join } from "node:path";

const ROOT = process.cwd();
const read = (p) => readFileSync(join(ROOT, p), "utf8");

const FAMILY_BUDGET = 3;

// --- The approved pairings -------------------------------------------------
const pairings = {};
{
  const src = read("src/templates/kit/typography.ts");
  const re = /"([a-z-]+)":\s*\{\s*display:\s*"([^"]+)",\s*body:\s*"([^"]+)"/g;
  let m;
  while ((m = re.exec(src))) pairings[m[1]] = { display: m[2], body: m[3] };
}

// --- The catalog, for names and categories --------------------------------
const catalog = {};
{
  const src = read("src/data/templates.ts");
  const re = /slug:\s*"([a-z-]+)",\s*name:\s*"([^"]+)",\s*category:\s*"([^"]+)"/g;
  let m;
  while ((m = re.exec(src))) catalog[m[1]] = { name: m[2], category: m[3] };
}

// --- What has actually been built -----------------------------------------
const built = [
  ...new Set(
    (read("src/templates/registry.ts").match(/slug: "([a-z-]+)"/g) ?? []).map((s) =>
      s.split('"')[1],
    ),
  ),
];

const failures = [];

// --- Rule 1: the family budget, across every pairing in the table ---------
{
  const counts = new Map();
  for (const pair of Object.values(pairings)) {
    for (const family of [pair.display, pair.body]) {
      counts.set(family, (counts.get(family) ?? 0) + 1);
    }
  }
  for (const [family, n] of counts) {
    if (n > FAMILY_BUDGET) failures.push(`${family} carries ${n} templates, budget is ${FAMILY_BUDGET}`);
  }
}

// --- Rules 2 to 4: within a category, on the built templates --------------
{
  const byCategory = new Map();
  for (const slug of built) {
    const meta = catalog[slug];
    if (!meta) {
      failures.push(`${slug} is in the registry but not in the catalog`);
      continue;
    }
    if (!byCategory.has(meta.category)) byCategory.set(meta.category, []);
    byCategory.get(meta.category).push(slug);
  }

  for (const [category, slugs] of byCategory) {
    const faces = new Map();
    const layouts = new Map();
    const grounds = new Map();

    for (const slug of slugs) {
      const name = catalog[slug].name;
      const pair = pairings[slug];

      if (!pair) {
        failures.push(`${name} has no entry in the pairings table`);
      } else {
        for (const family of [pair.display, pair.body]) {
          if (faces.has(family))
            failures.push(`${category}: ${faces.get(family)} and ${name} both use ${family}`);
          else faces.set(family, name);
        }
      }

      const demoPath = `src/templates/${slug}/demo.ts`;
      const themePath = `src/templates/${slug}/theme.ts`;
      if (!existsSync(join(ROOT, demoPath)) || !existsSync(join(ROOT, themePath))) {
        failures.push(`${name} is registered but its demo or theme is missing`);
        continue;
      }

      const demo = read(demoPath);
      const hero = demo.indexOf("heroField");
      const layout =
        (demo.slice(hero, hero + 900).match(/layout: "([a-z]+)"/) ?? [, "offset"])[1];
      if (layouts.has(layout))
        failures.push(`${category}: ${layouts.get(layout)} and ${name} both use the ${layout} hero`);
      else layouts.set(layout, name);

      const ground = (read(themePath).match(/bg: "(#[0-9A-Fa-f]{6})"/) ?? [])[1];
      if (!ground) {
        failures.push(`${name} has no readable ground in theme.ts`);
      } else if (grounds.has(ground)) {
        failures.push(`${category}: ${grounds.get(ground)} and ${name} share the ground ${ground}`);
      } else {
        grounds.set(ground, name);
      }
    }
  }
}

if (failures.length) {
  console.error(`\n  ${failures.length} differentiation failure(s):\n`);
  failures.forEach((f) => console.error(`   x ${f}`));
  console.error("");
  process.exit(1);
}

console.log(
  `\n  Differentiation passed. ${built.length} built templates, ${Object.keys(pairings).length} pairings.\n`,
);
