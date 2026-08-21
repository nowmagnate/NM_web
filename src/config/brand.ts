/**
 * THE ONLY PLACE BRAND FACTS LIVE.
 *
 * The company name and logo are not final. Renaming the business must be a
 * single edit here plus swapping the fixed-name asset files in `public/brand/`.
 *
 * Rules enforced in the pre-flight check:
 *   1. The literal string "NowMagnate" must not appear anywhere in `src/`
 *      except this file. Verify with a project-wide search before shipping.
 *   2. Never hardcode the number of years in business. Use `yearsInBusiness()`.
 *   3. Page metadata, OpenGraph, JSON-LD and form copy all read from here.
 */

export const brand = {
  name: "NowMagnate Innovations",
  shortName: "NowMagnate",

  // TODO: update once the business is formally registered.
  legalName: "NowMagnate Innovations",

  domain: "nowmagnate.com",

  // One line, used in the footer and as the metadata description fallback.
  tagline: "A software studio building products for teams worldwide.",

  // The year the practice started taking client work. Drives `yearsInBusiness`
  // and the JSON-LD `foundingDate`. This is real, not decorative.
  foundedYear: 2017,

  email: {
    // TODO: replace with real addresses on the registered domain.
    sales: "hello@nowmagnate.com",
    support: "support@nowmagnate.com",
  },

  // TODO: real number in E.164 format, e.g. "+91 98765 43210".
  phone: "",

  address: {
    // TODO: registered business address.
    line1: "",
    city: "",
    state: "",
    country: "India",
    postal: "",
  },

  social: {
    // Empty strings are filtered out of the footer, so partial data is safe.
    linkedin: "",
    x: "",
    github: "",
    dribbble: "",
  },

  // The productized landing-page offer.
  templatePrice: 499,
  templateCurrency: "USD",
} as const;

export type Brand = typeof brand;

/**
 * Computed, never hardcoded. Written as a function rather than a constant so
 * it stays correct in a long-lived static build that is redeployed over years.
 */
export function yearsInBusiness(now: Date = new Date()): number {
  return now.getFullYear() - brand.foundedYear;
}

/**
 * The maker's mark: the two-or-so letters struck into the hallmark strip.
 *
 * Derived from the capitals in `shortName` ("NowMagnate" gives "NM"), because
 * a plain two-character slice gives "NO", which reads as a word rather than
 * as initials. Falls back to the first two letters for an all-lowercase or
 * single-word name, so a rename can never leave this empty.
 */
export function makersMark(): string {
  const capitals = brand.shortName.match(/[A-Z]/g);
  if (capitals && capitals.length >= 2) return capitals.slice(0, 3).join("");
  return brand.shortName.slice(0, 2).toUpperCase();
}

/** "$499" — formatted once so the price renders identically everywhere. */
export function formattedTemplatePrice(): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: brand.templateCurrency,
    maximumFractionDigits: 0,
  }).format(brand.templatePrice);
}

/** Social links that actually have a URL, ready to map over in the footer. */
export function activeSocialLinks(): { label: string; href: string }[] {
  const labels: Record<keyof typeof brand.social, string> = {
    linkedin: "LinkedIn",
    x: "X",
    github: "GitHub",
    dribbble: "Dribbble",
  };

  return (Object.keys(brand.social) as (keyof typeof brand.social)[])
    .filter((key) => brand.social[key].length > 0)
    .map((key) => ({ label: labels[key], href: brand.social[key] }));
}
