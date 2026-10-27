#!/usr/bin/env node
/**
 * Creates a one-customer discount offer and prints the link to send them.
 *
 * Used by the outreach agent (see cowork-outreach/OFFER.md) and by hand. It writes a
 * code into the payments Worker's KV store, which the Worker already honours,
 * so there is no deploy. The guard rails live here AND in the Worker
 * (`minAmount` in workers/payments/src/products.ts is the backstop).
 *
 *   node scripts/create-offer.mjs --lead IG-0042 --template real-estate-agent --percent 20 --days 5
 *   node scripts/create-offer.mjs --lead IG-0042 --template real-estate-agent --percent 30 --days 2 --dry-run
 *   node scripts/create-offer.mjs --lead IG-0042 --template real-estate-agent --percent 20 --until 2026-11-30
 *   node scripts/create-offer.mjs --revoke A0042-20-K7Q
 *   node scripts/create-offer.mjs --status IG-0042-20-E27
 *
 * Flags
 *   --lead      lead id from the tracker (letters, digits, dashes). Ends up in the code
 *               so a paid order's email can be matched to the lead.
 *   --template  a template slug from src/data/templates.ts
 *   --percent   5 to 40 (whole number)
 *   --days      1 to 14. Clamped to the promo end date.
 *   --until     YYYY-MM-DD instead of --days: the offer lasts through the END of that
 *               calendar day in every target country (we use UTC-10, the last
 *               timezone to reach midnight). Up to 35 days out. Use it to tie an offer
 *               to a real campaign date such as Cyber Monday.
 *   --dry-run   print what would be created, write nothing
 *   --json      machine-readable output
 *   --revoke    delete a code
 *   --status    show whether a code exists, when it expires, and how many paid
 *               orders used it (the Worker counts a use when the payment lands)
 */

import { readFileSync, writeFileSync, mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { randomBytes } from "node:crypto";
import { spawnSync } from "node:child_process";

const ROOT = new URL("../", import.meta.url);
const read = (p) => readFileSync(new URL(p, ROOT), "utf8");

/**
 * Last moment the 3-year domain/hosting + 1-year AMC promo can be bought.
 * "31 December 2026" means the end of that day everywhere we sell, so the cut-off
 * is 23:59:59 at UTC-10 (the last target timezone to reach midnight).
 */
const END_OF_DAY_OFFSET_HOURS = 10;
const endOfDay = (ymd) => new Date(new Date(`${ymd}T23:59:59Z`).getTime() + END_OF_DAY_OFFSET_HOURS * 3_600_000);
const PROMO_END = endOfDay("2026-12-31");
const MAX_UNTIL_DAYS = 35;
const MAX_PERCENT = 40;
const MIN_PERCENT = 5;
const MAX_DAYS = 14;
const SITE = "https://nowmagnate.com";

function fail(msg) {
  console.error(`create-offer: ${msg}`);
  process.exit(1);
}

function args() {
  const out = {};
  const a = process.argv.slice(2);
  for (let i = 0; i < a.length; i++) {
    if (!a[i].startsWith("--")) fail(`unexpected argument "${a[i]}"`);
    const key = a[i].slice(2);
    if (["dry-run", "json"].includes(key)) out[key] = true;
    else out[key] = a[++i];
  }
  return out;
}

function kv(...rest) {
  // All values reaching here are validated to [A-Za-z0-9_-] or a temp file path.
  const r = spawnSync(
    "npx",
    ["wrangler", "kv", "key", ...rest, "--binding", "STORE", "--remote"],
    { cwd: new URL("workers/payments/", ROOT), shell: true, encoding: "utf8" },
  );
  if (r.status !== 0) fail(`wrangler failed:\n${r.stderr || r.stdout}`);
  return r.stdout;
}

const o = args();

if (o.revoke) {
  if (!/^[A-Z0-9-]{2,40}$/.test(o.revoke)) fail("--revoke needs a code like A0042-20-K7Q");
  kv("delete", `code:${o.revoke}`);
  console.log(`revoked ${o.revoke}`);
  process.exit(0);
}

if (o.status) {
  if (!/^[A-Z0-9-]{2,40}$/.test(o.status)) fail("--status needs a code like A0042-20-K7Q");
  const raw = kv("get", `code:${o.status}`).trim();
  const used = Number(kv("get", `used:${o.status}`).trim()) || 0;
  let rec = null;
  try {
    rec = JSON.parse(raw);
  } catch {}
  const out = {
    code: o.status,
    exists: Boolean(rec),
    expiresAt: rec?.expiresAt ?? null,
    expired: rec?.expiresAt ? new Date() >= new Date(rec.expiresAt) : null,
    paid: used > 0,
  };
  console.log(o.json ? JSON.stringify(out) : Object.entries(out).map(([k, v]) => `${k}: ${v}`).join("\n"));
  process.exit(0);
}

const lead = o.lead;
if (!lead || !/^[A-Za-z0-9-]{2,24}$/.test(lead)) fail("--lead is required (letters, digits, dashes)");

const slugs = [...read("src/data/templates.ts").matchAll(/^\s+slug:\s*"([a-z0-9-]+)"/gm)].map((m) => m[1]);
if (!slugs.includes(o.template)) fail(`--template must be one of: ${slugs.join(", ")}`);

const percent = Number(o.percent);
if (!Number.isInteger(percent) || percent < MIN_PERCENT || percent > MAX_PERCENT)
  fail(`--percent must be a whole number from ${MIN_PERCENT} to ${MAX_PERCENT}`);

const now = new Date();
if (now > PROMO_END) fail("the year-end promotion has ended; update PROMO_END before creating offers");
if (o.until && o.days) fail("use --days or --until, not both");

let expires;
if (o.until) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(o.until) || Number.isNaN(Date.parse(o.until))) fail("--until must be a date like 2026-11-30");
  expires = endOfDay(o.until);
  if (expires <= now) fail("--until is already in the past");
  if (expires - now > MAX_UNTIL_DAYS * 86_400_000) fail(`--until may be at most ${MAX_UNTIL_DAYS} days away`);
} else {
  const days = Number(o.days ?? 5);
  if (!Number.isInteger(days) || days < 1 || days > MAX_DAYS) fail(`--days must be 1 to ${MAX_DAYS}`);
  expires = new Date(now.getTime() + days * 86_400_000);
}
if (expires > PROMO_END) expires = PROMO_END;

const productsSrc = read("workers/payments/src/products.ts");
const listCents = Number(productsSrc.match(/template:\s*\{[\s\S]*?amount:\s*(\d+)/)?.[1]);
// Codes work off the price in force when the order is made, which is the festive
// price until it ends. The offer cannot outlast the festive window (PROMO_END is the
// same instant), so the festive price is the base for every code made while it runs.
const festiveMatch = productsSrc.match(/festive:\s*\{\s*amount:\s*(\d+),\s*endsAt:\s*"([^"]+)"/);
const festiveCents = festiveMatch && now < new Date(festiveMatch[2]) ? Number(festiveMatch[1]) : null;
const baseCents = festiveCents ?? listCents;
const minCents = Number(read("workers/payments/src/products.ts").match(/template:\s*\{[\s\S]*?minAmount:\s*(\d+)/)?.[1]);
if (!listCents || !minCents) fail("could not read the price list from workers/payments/src/products.ts");
const finalCents = Math.round((baseCents * (100 - percent)) / 100);
if (finalCents < minCents) fail(`${percent}% off would be below the Worker's floor of $${minCents / 100}`);

const suffix = randomBytes(2).toString("hex").toUpperCase().slice(0, 3);
const code = `${lead.toUpperCase()}-${percent}-${suffix}`;
const record = {
  percentOff: percent,
  expiresAt: expires.toISOString(),
  maxRedemptions: 1,
  products: ["template"],
  label: "Your offer",
  lead,
};
const link = `${SITE}/templates/${o.template}/?code=${code}`;
const result = {
  code,
  link,
  percentOff: percent,
  finalPrice: finalCents / 100,
  standardPrice: listCents / 100,
  basePrice: baseCents / 100,
  expiresAt: record.expiresAt,
  dryRun: Boolean(o["dry-run"]),
};

if (!o["dry-run"]) {
  const dir = mkdtempSync(join(tmpdir(), "offer-"));
  const file = join(dir, "record.json");
  try {
    writeFileSync(file, JSON.stringify(record));
    kv("put", `code:${code}`, "--path", file);
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
}

if (o.json) console.log(JSON.stringify(result));
else {
  console.log(`${result.dryRun ? "[dry run] " : ""}offer for ${lead}`);
  console.log(
    `  price   $${result.finalPrice.toFixed(2)} (${percent}% off the current price of $${result.basePrice}; standard price $${result.standardPrice})`,
  );
  console.log(`  expires ${result.expiresAt}`);
  console.log(`  code    ${code}`);
  console.log(`  link    ${link}`);
}
