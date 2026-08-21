import { brand } from "./brand";

/**
 * Site-level structure and feature flags. Brand *facts* live in `brand.ts`;
 * this file is about the site itself: navigation, canonical URL, and the
 * switches that hide sections whose real content does not exist yet.
 */

export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ?? `https://${brand.domain}`
).replace(/\/$/, "");

/**
 * ONE CTA LABEL PER INTENT, used everywhere on the site.
 *
 * Mixing "Start a project" with "Get in touch" and "Let's talk" across nav,
 * hero and footer reads as three different actions to a user scanning the
 * page. Import from here rather than typing a label inline.
 */
export const cta = {
  primary: { label: "Start a project", href: "/contact" },
  templates: { label: "Browse templates", href: "/templates" },
  brief: { label: "Request this template", href: "/brief" },
  work: { label: "See our work", href: "/work" },
} as const;

/** Desktop nav must render on a single line. Keep this list short. */
export const mainNav = [
  { label: "Services", href: "/services" },
  { label: "Templates", href: "/templates" },
  { label: "Work", href: "/work" },
  { label: "About", href: "/about" },
  { label: "Pricing", href: "/pricing" },
] as const;

export const footerNav = [
  {
    heading: "Services",
    links: [
      { label: "Web applications", href: "/services/web-applications" },
      { label: "Mobile apps", href: "/services/mobile-apps" },
      { label: "SaaS products", href: "/services/saas-products" },
      { label: "AI agents", href: "/services/ai-agents" },
      { label: "All services", href: "/services" },
    ],
  },
  {
    heading: "Templates",
    links: [
      { label: "Browse all", href: "/templates" },
      { label: "How it works", href: "/pricing" },
      { label: "Start a brief", href: "/brief" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Process", href: "/process" },
      { label: "Work", href: "/work" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    heading: "Legal",
    links: [
      { label: "Privacy", href: "/legal/privacy" },
      { label: "Terms", href: "/legal/terms" },
      { label: "Refund policy", href: "/legal/refund-policy" },
    ],
  },
] as const;
