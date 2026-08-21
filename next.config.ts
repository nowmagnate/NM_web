import type { NextConfig } from "next";

/**
 * Firebase Hosting on the Spark (free) tier serves static files only.
 * There is no server runtime, so the whole site is prerendered to `out/`.
 *
 * Consequences to keep in mind while building:
 *  - No Server Actions, no route handlers, no middleware.
 *  - Every dynamic route needs `generateStaticParams`.
 *  - `next/image` optimization is unavailable; assets are compressed at build
 *    time instead and every <Image> must carry explicit width/height.
 *  - `NEXT_PUBLIC_*` env vars are inlined at build time, so toggling Stripe on
 *    requires a rebuild and redeploy rather than a runtime flag.
 */
const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true,
    remotePatterns: [
      { protocol: "https", hostname: "picsum.photos" },
      { protocol: "https", hostname: "cdn.simpleicons.org" },
    ],
  },
  // Firebase Hosting serves /about as /about/index.html with cleanUrls enabled.
  trailingSlash: true,
  reactStrictMode: true,
};

export default nextConfig;
