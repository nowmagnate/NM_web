#!/usr/bin/env node
/**
 * The payments Worker (workers/payments) keeps its own price list and its own
 * list of template slugs, because it is deployed separately and cannot import
 * from the site. This fails the build if the two drift apart:
 *
 *   - the "template" price in the Worker must equal brand.templatePrice
 *   - the Worker's template slugs must equal the site's template slugs
 *
 * A mismatch would either charge a different amount than the page shows, or
 * reject an order for a template that exists.
 */

import { readFileSync } from "node:fs";

const read = (p) => readFileSync(new URL(`../${p}`, import.meta.url), "utf8");
const problems = [];

const brand = read("src/config/brand.ts");
const sitePrice = Number(brand.match(/templatePrice:\s*(\d+)/)?.[1]);
const siteCurrency = brand.match(/templateCurrency:\s*"([A-Z]{3})"/)?.[1];

const products = read("workers/payments/src/products.ts");
const workerAmount = Number(products.match(/template:\s*\{[\s\S]*?amount:\s*(\d+)/)?.[1]);
const workerCurrency = products.match(/template:\s*\{[\s\S]*?currency:\s*"([A-Z]{3})"/)?.[1];

if (!sitePrice || !workerAmount) {
  problems.push("could not read the template price from brand.ts or workers/payments/src/products.ts");
} else if (sitePrice * 100 !== workerAmount) {
  problems.push(
    `price mismatch: site shows ${sitePrice} but the Worker charges ${workerAmount / 100} (${workerAmount} minor units)`,
  );
}
if (siteCurrency !== workerCurrency) {
  problems.push(`currency mismatch: site ${siteCurrency}, Worker ${workerCurrency}`);
}

const siteSlugs = [...read("src/data/templates.ts").matchAll(/^\s+slug:\s*"([a-z0-9-]+)"/gm)].map((m) => m[1]);
const workerBlock = products.match(/TEMPLATE_SLUGS[^=]*=\s*\[([\s\S]*?)\];/)?.[1] ?? "";
const workerSlugs = [...workerBlock.matchAll(/"([a-z0-9-]+)"/g)].map((m) => m[1]);

const missing = siteSlugs.filter((s) => !workerSlugs.includes(s));
const extra = workerSlugs.filter((s) => !siteSlugs.includes(s));
if (missing.length) problems.push(`templates missing from the Worker: ${missing.join(", ")}`);
if (extra.length) problems.push(`Worker lists templates the site does not have: ${extra.join(", ")}`);

if (problems.length) {
  console.error("\n  Payments Worker is out of step with the site:");
  for (const p of problems) console.error(`   x ${p}`);
  console.error("");
  process.exit(1);
}
console.log(`\n  Payments sync passed. ${siteSlugs.length} templates, ${sitePrice} ${siteCurrency}.\n`);
