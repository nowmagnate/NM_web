#!/usr/bin/env node
/**
 * Downloads the Google Fonts the 24 templates use and commits them to
 * `src/templates/kit/fonts/` as latin-subset woff2 files, so no build ever has
 * to talk to Google.
 *
 * WHY. `next/font/google` fetches Google's CSS at build time and parses it. The
 * response intermittently comes back with font URLs that have no file extension
 * (`fonts.gstatic.com/l/font?kit=...`), which the loader cannot parse, and the
 * whole build crashes with "Cannot read properties of null (reading '1')" in
 * `@next/font/dist/google/loader.js`. The studio's own fonts were moved to local
 * files for the same reason (see `src/fonts/index.ts`).
 *
 * This is a maintenance tool, not part of the build. Run it only to add a family
 * or to refresh the files:
 *
 *   node scripts/fetch-template-fonts.mjs            fetch what is missing
 *   node scripts/fetch-template-fonts.mjs --force    refetch everything
 *
 * It asks Google for exactly what `next/font/google` would have asked for
 * (same axes, same weights, same user agent), takes the `latin` subset, downloads
 * each file to a fresh temporary directory, checks it really is a woff2 of a
 * sensible size, and only then copies it into the repo. It writes
 * `manifest.json` next to the fonts: the weight descriptor to use in `fonts.ts`,
 * where each file came from, and a checksum.
 *
 * It reads Next's own axis table (`font-data.json`), so run it from a checkout
 * with `npm install` done.
 */

import { createHash } from "node:crypto";
import { existsSync, mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync, copyFileSync } from "node:fs";
import { createRequire } from "node:module";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { brotliDecompressSync } from "node:zlib";

const require = createRequire(import.meta.url);
const { getFontAxes } = require("next/dist/compiled/@next/font/dist/google/get-font-axes");
const { getGoogleFontsUrl } = require("next/dist/compiled/@next/font/dist/google/get-google-fonts-url");

const OUT = new URL("../src/templates/kit/fonts/", import.meta.url);
const force = process.argv.includes("--force");

// Next sends this user agent so Google answers with woff2 files.
const UA =
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.132 Safari/537.36";

/** Every family the templates use, with the weights they ask for. "variable" means the family's weight axis. */
const FAMILIES = [
  ["Archivo", ["variable"]],
  ["Bricolage Grotesque", ["variable"]],
  ["Chivo", ["variable"]],
  ["Cormorant Garamond", ["300", "400", "500", "600", "700"]],
  ["DM Serif Display", ["400"]],
  ["Epilogue", ["variable"]],
  ["Familjen Grotesk", ["variable"]],
  ["Figtree", ["variable"]],
  ["Fraunces", ["variable"]],
  ["Hanken Grotesk", ["variable"]],
  ["IBM Plex Sans", ["300", "400", "500", "600"]],
  ["Instrument Sans", ["variable"]],
  ["Instrument Serif", ["400"]],
  ["Jost", ["variable"]],
  ["Karla", ["variable"]],
  ["Libre Baskerville", ["400", "700"]],
  ["Lora", ["variable"]],
  ["Manrope", ["variable"]],
  ["Newsreader", ["variable"]],
  ["Outfit", ["variable"]],
  ["Playfair Display", ["variable"]],
  ["Public Sans", ["variable"]],
  ["Space Grotesk", ["variable"]],
  ["Work Sans", ["variable"]],
];

async function get(url, as) {
  let last;
  for (let i = 0; i < 4; i++) {
    try {
      const res = await fetch(url, { headers: { "User-Agent": UA } });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return as === "text" ? await res.text() : Buffer.from(await res.arrayBuffer());
    } catch (e) {
      last = e;
      await new Promise((r) => setTimeout(r, 800 * (i + 1)));
    }
  }
  throw new Error(`${url}: ${last?.message ?? last}`);
}

/** The `latin` @font-face blocks of Google's CSS: [{ weight, url }]. */
function latinFaces(css) {
  const faces = [];
  for (const m of css.matchAll(/\/\*\s*([a-z0-9-]+)\s*\*\/\s*@font-face\s*\{([^}]*)\}/g)) {
    if (m[1] !== "latin") continue;
    const weight = m[2].match(/font-weight:\s*([^;]+);/)?.[1].trim();
    const url = m[2].match(/src:\s*url\(([^)]+)\)/)?.[1];
    if (weight && url) faces.push({ weight, url });
  }
  return faces;
}

/**
 * Reads the variation axes (fvar) out of a woff2 file, so the weight range we
 * declare is the font's real one rather than a guess. A woff2 is a header, a
 * table directory, then ONE brotli stream holding every table back to back, in
 * directory order; fvar is never transformed, so its offset is the sum of the
 * lengths before it.
 */
const WOFF2_TAGS = ["cmap","head","hhea","hmtx","maxp","name","OS/2","post","cvt ","fpgm","glyf","loca","prep","CFF ","VORG","EBDT","EBLC","gasp","hdmx","kern","LTSH","PCLT","VDMX","vhea","vmtx","BASE","GDEF","GPOS","GSUB","EBSC","JSTF","MATH","CBDT","CBLC","COLR","CPAL","SVG ","sbix","acnt","avar","bdat","bloc","bsln","cvar","fdsc","feat","fmtx","fvar","gvar","hsty","just","lcar","mort","morx","opbd","prop","trak","Zapf","Silf","Glat","Gloc","Feat","Sill"];

function readAxes(buf) {
  const numTables = buf.readUInt16BE(12);
  const compressedSize = buf.readUInt32BE(20);
  let pos = 48;
  const base128 = () => {
    let v = 0;
    for (let i = 0; i < 5; i++) {
      const b = buf[pos++];
      v = v * 128 + (b & 0x7f);
      if (!(b & 0x80)) return v;
    }
    throw new Error("bad UIntBase128");
  };
  const tables = [];
  for (let i = 0; i < numTables; i++) {
    const flags = buf[pos++];
    const idx = flags & 0x3f;
    const tag = idx === 63 ? buf.subarray(pos, (pos += 4)).toString("latin1") : WOFF2_TAGS[idx];
    const version = flags >> 6;
    const origLength = base128();
    // glyf and loca are transformed unless version 3; hmtx is transformed only at version 1; the rest never are.
    const transformed = tag === "glyf" || tag === "loca" ? version !== 3 : tag === "hmtx" ? version === 1 : false;
    const length = transformed ? base128() : origLength;
    tables.push({ tag, length });
  }
  const data = brotliDecompressSync(buf.subarray(pos, pos + compressedSize));
  let offset = 0;
  for (const t of tables) {
    if (t.tag === "fvar") {
      const fv = data.subarray(offset, offset + t.length);
      const axesOffset = fv.readUInt16BE(4);
      const count = fv.readUInt16BE(8);
      const size = fv.readUInt16BE(10);
      const axes = {};
      for (let i = 0; i < count; i++) {
        const a = axesOffset + i * size;
        const fixed = (o) => fv.readInt32BE(a + o) / 65536;
        axes[fv.subarray(a, a + 4).toString("latin1")] = { min: fixed(4), default: fixed(8), max: fixed(12) };
      }
      return axes;
    }
    offset += t.length;
  }
  return null; // a static font
}

const slug = (s) => s.replace(/\s+/g, "");

mkdirSync(OUT, { recursive: true });
const tmp = mkdtempSync(join(tmpdir(), "nm-fonts-"));
const manifest = {};
let fetched = 0;

try {
  for (const [family, weights] of FAMILIES) {
    const axes = getFontAxes(family, weights, ["normal"], undefined);
    const cssUrl = getGoogleFontsUrl(family, axes, "swap");
    const faces = latinFaces(await get(cssUrl, "text"));
    if (faces.length === 0) throw new Error(`${family}: Google returned no latin subset (${cssUrl})`);

    // One entry per distinct file. A static family has one file per weight; a variable family has one file covering a range.
    const byUrl = new Map();
    for (const f of faces) {
      const entry = byUrl.get(f.url) ?? { url: f.url, cssWeights: [] };
      entry.cssWeights.push(f.weight);
      byUrl.set(f.url, entry);
    }

    manifest[family] = [];
    for (const { url, cssWeights } of byUrl.values()) {
      // Google now serves some "static" families as one variable file shared by several weights.
      const shared = cssWeights.length > 1 || /\s/.test(cssWeights[0]);
      const name = `${slug(family)}-${shared ? "Variable" : cssWeights[0]}.woff2`;
      const dest = new URL(name, OUT);
      let bytes;
      if (existsSync(dest) && !force) {
        bytes = readFileSync(dest);
      } else {
        const buf = await get(url, "buffer");
        if (buf.length < 1_000 || buf.length > 400_000) throw new Error(`${name}: unexpected size ${buf.length}`);
        if (buf.subarray(0, 4).toString("latin1") !== "wOF2") throw new Error(`${name}: not a woff2 file`);
        const staged = join(tmp, name);
        writeFileSync(staged, buf);
        copyFileSync(staged, dest);
        bytes = buf;
        fetched++;
      }
      const axes = readAxes(bytes);
      // The weight descriptor for fonts.ts: the file's real wght range, or its single static weight.
      const weight = axes?.wght ? `${axes.wght.min} ${axes.wght.max}` : cssWeights[0];
      manifest[family].push({
        file: name,
        weight,
        axes,
        bytes: bytes.length,
        sha256: createHash("sha256").update(bytes).digest("hex"),
        source: url,
      });
    }
    console.log(`${family.padEnd(20)} ${manifest[family].map((m) => `${m.file} (${m.weight})`).join(", ")}`);
  }
  writeFileSync(new URL("manifest.json", OUT), JSON.stringify(manifest, null, 2) + "\n");
  console.log(`\n${fetched} file(s) downloaded. Manifest written.`);
} finally {
  rmSync(tmp, { recursive: true, force: true });
}
