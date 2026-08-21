import { ImageResponse } from "next/og";
import { BrandMarkSvg } from "@/lib/brandMarkSvg";

/** iOS home-screen icon. Apple wants a larger, un-inset square (no browser chrome padding). */
export const size = { width: 180, height: 180 };
export const contentType = "image/png";
export const dynamic = "force-static";

export default function AppleIcon() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#F2F3EF",
      }}
    >
      <BrandMarkSvg size={112} />
    </div>,
    { ...size },
  );
}
