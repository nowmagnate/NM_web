import { ImageResponse } from "next/og";
import { BrandMarkSvg } from "@/lib/brandMarkSvg";

/**
 * Favicon, generated at build time via the same `next/og` renderer as
 * `opengraph-image.tsx` — works cleanly with `output: 'export'`, no binary
 * image tool needed.
 */
export const size = { width: 32, height: 32 };
export const contentType = "image/png";
export const dynamic = "force-static";

export default function Icon() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#F2F3EF",
        borderRadius: 7,
      }}
    >
      <BrandMarkSvg size={20} />
    </div>,
    { ...size },
  );
}
