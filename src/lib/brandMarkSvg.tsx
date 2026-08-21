/**
 * The maker's punch, shared by every generated image (favicon, Apple touch
 * icon, OG card) so the mark reads as ONE glyph everywhere it appears rather
 * than several independently-drawn approximations.
 *
 * Geometry is kept identical to the inline mark in `Logo.tsx`: squared
 * terminals and mitred joins, because this world's marks are struck with a
 * punch, not drawn with a round-nibbed pen. When the real logo replaces
 * `Logo.tsx`, replace this too.
 *
 * Colours are literal hex, not tokens: these render inside `next/og`'s Satori
 * engine, which has no access to the page's CSS custom properties.
 */
export function BrandMarkSvg({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path
        d="M6 18V6.5L18 17.5V6"
        stroke="#15171A"
        strokeWidth="2.75"
        strokeLinecap="square"
        strokeLinejoin="miter"
      />
    </svg>
  );
}
