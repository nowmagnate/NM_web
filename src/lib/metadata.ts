import type { Metadata } from "next";
import { brand } from "@/config/brand";
import { siteUrl } from "@/config/site";

/**
 * Next's metadata merging inherits the ROOT layout's `openGraph` object
 * as-is when a page sets only `title`/`description` — those top-level fields
 * do not regenerate `openGraph.title` / `openGraph.description`. Left alone,
 * every page would share the home page's generic OG card when shared on
 * social platforms. This wraps the common case so each page gets its own.
 */
export function pageMetadata({
  title,
  description,
  path,
}: {
  title: string;
  description: string;
  /** Route path, e.g. "/templates/dental-practice". Used for the canonical OG url. */
  path?: string;
}): Metadata {
  const url = path ? `${siteUrl}${path}` : undefined;

  return {
    title,
    description,
    openGraph: {
      title: `${title} · ${brand.shortName}`,
      description,
      url,
      siteName: brand.name,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} · ${brand.shortName}`,
      description,
    },
    alternates: url ? { canonical: url } : undefined,
  };
}
