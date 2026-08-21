import type { MetadataRoute } from "next";
import { siteUrl } from "@/config/site";

// Required for `output: 'export'` — without it Next treats this route as
// needing per-request dynamic rendering, which a static export cannot do.
export const dynamic = "force-static";
import { serviceSlugs } from "@/data/services";
import { templateSlugs } from "@/data/templates";
import { getAllCaseStudySlugs } from "@/lib/caseStudyContent";

/**
 * Built from the same data files that drive the routes themselves — a
 * service or template added to its data array shows up here automatically,
 * so the sitemap can't silently drift out of sync with what actually exists.
 */

const staticRoutes = [
  "",
  "/services",
  "/templates",
  "/work",
  "/about",
  "/process",
  "/pricing",
  "/contact",
  "/brief",
  "/legal/privacy",
  "/legal/terms",
  "/legal/refund-policy",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const entries: MetadataRoute.Sitemap = staticRoutes.map((path) => ({
    url: `${siteUrl}${path}`,
    lastModified: now,
    changeFrequency: path === "" ? "weekly" : "monthly",
    priority: path === "" ? 1 : 0.7,
  }));

  for (const slug of serviceSlugs) {
    entries.push({
      url: `${siteUrl}/services/${slug}`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.6,
    });
  }

  for (const slug of templateSlugs) {
    entries.push({
      url: `${siteUrl}/templates/${slug}`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.6,
    });
  }

  // Empty until the first case study exists — see src/content/case-studies/README.md.
  for (const slug of getAllCaseStudySlugs()) {
    entries.push({
      url: `${siteUrl}/work/${slug}`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.5,
    });
  }

  return entries;
}
