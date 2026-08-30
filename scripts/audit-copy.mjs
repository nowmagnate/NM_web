#!/usr/bin/env node
/**
 * Copy and brand audit. Run with `npm run audit`.
 *
 * These are the rules that are cheap to state and easy to violate three weeks
 * later, so they are enforced mechanically rather than by memory:
 *
 *  1. Em-dashes never appear in visible copy.
 *  2. The brand name appears only in brand.ts and Logo.tsx, so a rename stays
 *     a one-file edit.
 *  3. No hardcoded hex colours outside globals.css.
 *  4. No Stripe secret key has leaked into the source or the build output.
 *  5. Fake-precise marketing numbers get flagged for a human to confirm.
 *
 * Exits non-zero on any violation so it can gate a build.
 */

import { readFileSync, readdirSync, statSync, existsSync } from "node:fs";
import { join, relative, extname } from "node:path";

const ROOT = process.cwd();
const SRC = join(ROOT, "src");

const failures = [];
const warnings = [];

function walk(dir, out = []) {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) walk(full, out);
    else out.push(full);
  }
  return out;
}

const files = walk(SRC).filter((f) => [".ts", ".tsx", ".css"].includes(extname(f)));

/**
 * Strips prose that is not user-facing copy:
 *  - block and line comments
 *  - the impeccable DIRECTION_CONTRACT, which ships as an HTML comment in the
 *    markup so it can be audited after a build. It is a machine-readable
 *    design record, not visible copy, and it legitimately names the palette's
 *    hex values.
 */
function stripNonCopy(source) {
  return source
    .replace(/const DIRECTION_CONTRACT = `[\s\S]*?`;/g, "")
    .replace(/\/\*[\s\S]*?\*\//g, "")
    .replace(/^\s*\/\/.*$/gm, "")
    .replace(/^\s*\*.*$/gm, "");
}

// --- 1. Em-dash ban --------------------------------------------------------
// Applies to visible copy. Comments are stripped first so prose written for
// developers is not policed alongside prose written for users.
for (const file of files) {
  const raw = readFileSync(file, "utf8");
  const withoutComments = stripNonCopy(raw);

  withoutComments.split("\n").forEach((line, i) => {
    if (line.includes("—")) {
      failures.push(`${relative(ROOT, file)}:${i + 1}  em-dash in visible copy`);
    }
  });
}

// --- 2. Brand name containment --------------------------------------------
const BRAND_TOKEN = "NowMagnate";
const allowedBrandFiles = ["src/config/brand.ts", "src/components/brand/Logo.tsx"];

for (const file of files) {
  const rel = relative(ROOT, file).replace(/\\/g, "/");
  if (allowedBrandFiles.includes(rel)) continue;

  readFileSync(file, "utf8")
    .split("\n")
    .forEach((line, i) => {
      if (line.includes(BRAND_TOKEN)) {
        failures.push(
          `${rel}:${i + 1}  brand name outside brand.ts (breaks the rename path)`,
        );
      }
    });
}

// --- 3. Hex colours outside the token file --------------------------------
// globals.css owns the palette. Documented exceptions: theme.ts, because
// <meta name="theme-color"> cannot read a CSS custom property; and the
// Satori-rendered generated images (OG card, favicon, Apple touch icon) plus
// the mark they share, because Satori has no access to the page's
// stylesheet and needs literal values passed as inline styles.
const hexAllowlist = [
  "src/app/globals.css",
  "src/config/theme.ts",
  "src/app/opengraph-image.tsx",
  "src/app/icon.tsx",
  "src/app/apple-icon.tsx",
  "src/lib/brandMarkSvg.tsx",
];

// Whole trees, rather than named files. `src/templates/` holds the token layer
// for the 24 sold templates plus one config per instance, and the entire point
// of a template is that it does NOT wear the studio's palette: its colours are
// the product being sold, the same way the catalog swatches are.
const hexAllowedPrefixes = ["src/templates/"];

for (const file of files) {
  const rel = relative(ROOT, file).replace(/\\/g, "/");
  if (hexAllowlist.includes(rel)) continue;
  if (hexAllowedPrefixes.some((prefix) => rel.startsWith(prefix))) continue;

  const raw = readFileSync(file, "utf8");
  const withoutComments = stripNonCopy(raw);

  withoutComments.split("\n").forEach((line, i) => {
    // Template palette swatches are content being displayed, not site chrome.
    if (rel === "src/data/templates.ts") return;
    const match = line.match(/#[0-9a-fA-F]{6}\b/);
    if (match) {
      failures.push(`${rel}:${i + 1}  hardcoded hex ${match[0]}, use a token`);
    }
  });
}

// --- 4. Stripe secret key leak --------------------------------------------
const secretPattern = /\bsk_(live|test)_[A-Za-z0-9]/;
for (const file of files) {
  if (secretPattern.test(readFileSync(file, "utf8"))) {
    failures.push(`${relative(ROOT, file)}  possible Stripe SECRET key in source`);
  }
}

// The built output matters more than the source, since that is what ships.
const OUT = join(ROOT, "out");
if (existsSync(OUT)) {
  for (const file of walk(OUT).filter((f) => [".js", ".html"].includes(extname(f)))) {
    if (secretPattern.test(readFileSync(file, "utf8"))) {
      failures.push(`${relative(ROOT, file)}  Stripe SECRET key in BUILD OUTPUT`);
    }
  }
}

// --- 5. Fake-precise numbers ----------------------------------------------
// Warns rather than fails: a real number is fine, an invented one is not, and
// only a human knows which this is.
const numberPattern =
  /(?<![\w#.$])(\d{1,3}(?:\.\d+)?\s?%|\d+(?:\.\d+)?x\b|\d{2,3}\+\s+(?:projects|clients|customers|companies))/gi;

for (const file of files.filter((f) => f.includes("data") || f.includes("app"))) {
  // Strip comments first, otherwise a comment saying "do not write 40+
  // projects" trips the very rule it is documenting.
  const raw = readFileSync(file, "utf8")
    .replace(/\/\*[\s\S]*?\*\//g, "")
    .replace(/^\s*\/\/.*$/gm, "");
  const strings = raw.match(/"[^"\n]{12,}"|`[^`]{12,}`/g) ?? [];
  for (const s of strings) {
    const hits = s.match(numberPattern);
    if (hits) {
      warnings.push(
        `${relative(ROOT, file)}  confirm this number is real: ${hits[0]} in ${s.slice(0, 50)}...`,
      );
    }
  }
}

// --- Report ----------------------------------------------------------------
if (warnings.length) {
  console.log(`\n  ${warnings.length} warning(s) to confirm by hand:\n`);
  warnings.forEach((w) => console.log(`   ? ${w}`));
}

if (failures.length) {
  console.error(`\n  ${failures.length} copy/brand violation(s):\n`);
  failures.forEach((f) => console.error(`   x ${f}`));
  console.error("");
  process.exit(1);
}

console.log(`\n  Copy audit passed. ${files.length} files checked.\n`);
