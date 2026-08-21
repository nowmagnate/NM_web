import type { Metadata, Viewport } from "next";
import { brand } from "@/config/brand";
import { siteUrl } from "@/config/site";
import { themeColors } from "@/config/theme";
import { fontVariables } from "@/fonts";
import { organizationJsonLd } from "@/lib/jsonLd";
import "./globals.css";

/**
 * Root metadata. Every string derives from `brand` so a rename propagates
 * to titles, OpenGraph and structured data without touching this file.
 */
export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  // Separators are middle dots, not em-dashes: the em-dash ban covers every
  // visible string, and a page title is the first copy a user ever sees.
  title: {
    default: `${brand.name} · ${brand.tagline}`,
    template: `%s · ${brand.shortName}`,
  },
  description: brand.tagline,
  applicationName: brand.name,
  openGraph: {
    type: "website",
    siteName: brand.name,
    title: brand.name,
    description: brand.tagline,
    url: siteUrl,
  },
  twitter: {
    card: "summary_large_image",
    title: brand.name,
    description: brand.tagline,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  // A white studio sheet, by decision; there is no dark rendition of it, so
  // browser-drawn UI is told light rather than following the OS.
  themeColor: themeColors.ground,
  colorScheme: "light",
  width: "device-width",
  initialScale: 1,
};

/**
 * The direction contract. Written into the emitted markup rather than a
 * source-only comment so it survives the production build and can be
 * audited; grep the built output for the seed key.
 */
const DIRECTION_CONTRACT = `
  IMPECCABLE DIRECTION CONTRACT
  THESIS: rebuilt against the visual language of a licensed reference
  template (Deon, by Qode Interactive) at the client's direction: the same
  navigation, hero carousel, section rhythm and animation language, carrying
  this studio's own content throughout.
  OWN-WORLD: white sheet (#FFFFFF), soft off-white band (#FBF9F9), near-black
  ink (#000000). One accent: a five-stop spectrum gradient (sky through
  indigo to orchid), clipped into display type and drawn as hairlines and
  spines, never used as a text colour on its own. Square geometry throughout,
  zero border-radius by rule. Syne for display and eyebrows, Heebo for body,
  Archivo tracked-out uppercase for every interface label.
  STORY: unchanged from the previous system. A founder learns this is a
  nine-year practice where you talk to the builders; a local practice owner
  finds a fixed price and a way to start.
  FIRST VIEWPORT: a two-slide carousel serving both readers, staggered CSS
  entrance, real dot and arrow controls, autoplay that pauses on hover/focus
  and never runs under reduced motion.
  FORM: Spectrum, migrated from the previous "Struck & Assayed" system
  section by section; a migration shim in globals.css aliases old token names
  during the transition.
  FINISH: unreviewed and undocumented is unfinished; this build ends with the
  finish review, the verdict, and DESIGN.md
`;

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={fontVariables} suppressHydrationWarning>
      <body
        className="bg-bg font-body text-ink min-h-[100dvh] antialiased"
        suppressHydrationWarning
      >
        <div dangerouslySetInnerHTML={{ __html: `<!--${DIRECTION_CONTRACT}-->` }} />
        {/* Safe: every value comes from our own typed brand config, never
            from user input. See the note in src/lib/jsonLd.ts. */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd()) }}
        />
        {/* Keyboard users land here first and can jump the nav. */}
        <a
          href="#main"
          className="sr-only-focusable ui-label bg-ink text-bg fixed top-4 left-4 z-[100] px-4 py-3 text-[11px] shadow-[var(--lift)]"
        >
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
