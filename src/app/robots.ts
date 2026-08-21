import type { MetadataRoute } from "next";
import { siteUrl } from "@/config/site";

// Required for `output: 'export'` — see the same note in sitemap.ts.
export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/dev/"],
    },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
