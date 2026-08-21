import { ImageResponse } from "next/og";
import { brand, makersMark } from "@/config/brand";
import { BrandMarkSvg } from "@/lib/brandMarkSvg";

/**
 * Default social-share card, rendered at build time via Satori (bundled with
 * Next) and exported as a static PNG — works cleanly with `output: 'export'`,
 * no external image tool needed. Route-specific pages can override this by
 * adding their own `opengraph-image.tsx` in the same folder; this is the
 * site-wide fallback for everything that doesn't.
 *
 * Uses the same `BrandMarkSvg` as the favicon and Apple touch icon, so the
 * mark reads as one consistent glyph everywhere it appears rather than three
 * independently-drawn approximations of it.
 *
 * Colours are hardcoded rather than reading `globals.css`: Satori renders in
 * an isolated environment with no access to the page's CSS custom
 * properties, so the light-theme palette is duplicated here deliberately.
 * Keep in sync with --ground / --ink / --mark if those change.
 */
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
// Required for `output: 'export'` — see the note in src/app/sitemap.ts.
export const dynamic = "force-static";

export default function Image() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "80px",
        backgroundColor: "#F2F3EF",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
        <BrandMarkSvg size={56} />
        <span style={{ fontSize: 32, fontWeight: 600, color: "#15171A" }}>
          {brand.shortName}
        </span>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 34 }}>
        <span
          style={{
            fontSize: 62,
            fontWeight: 600,
            color: "#15171A",
            lineHeight: 1.04,
            letterSpacing: -2.4,
            maxWidth: 880,
          }}
        >
          {brand.tagline}
        </span>

        {/* The hallmark strip: the same signature element the page opens and
            closes on, so a shared link carries the world rather than a
            generic recoloured card. */}
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          {[
            { glyph: makersMark(), assay: false },
            { glyph: String(brand.foundedYear), assay: false },
            { glyph: brand.domain, assay: true },
          ].map((mark) => (
            <div
              key={mark.glyph}
              style={{
                display: "flex",
                alignItems: "center",
                height: 52,
                padding: "0 18px",
                borderRadius: 4,
                fontSize: 22,
                fontWeight: 600,
                letterSpacing: 0.4,
                color: "#15171A",
                backgroundColor: mark.assay ? "#C9F24D" : "#E7E9E3",
              }}
            >
              {mark.glyph}
            </div>
          ))}
        </div>
      </div>
    </div>,
    { ...size },
  );
}
