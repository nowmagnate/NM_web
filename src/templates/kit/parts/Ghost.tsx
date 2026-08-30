import { cn } from "@/lib/cn";

/**
 * The giant lettering a band is composed on top of.
 *
 * This is the layer that does most of the work in the merged opening. Type set
 * this large, at this little contrast, and cropped by the band's own edges
 * stops being language and becomes ground: the eye reads it as texture the
 * layout was placed on, which is exactly why the headline and the subject can
 * then overlap it without the composition falling into two halves.
 *
 * Three rules keep it from becoming a second headline:
 *   It never fits. Lines run past the right edge on purpose. Fully visible
 *   lettering reads as something to be read.
 *   It never carries information. The words repeat the practice's field, not
 *   its message, so nothing is lost to a reader who cannot see it.
 *   It is `aria-hidden`. A screen reader gets the real headline once, not the
 *   decorative one first.
 */
export function Ghost({
  words,
  className,
  size = "hero",
  onMedia,
}: {
  words: string[];
  className?: string;
  /** `hero` fills a viewport. `band` is the quieter version for a mid-page band. */
  size?: "hero" | "band";
  /**
   * True when the lettering is drawn over a scrimmed photograph rather than a
   * flat ground. Ink at 11% is invisible on a dark scrim, so the colour has to
   * invert; see `tokens.css`.
   */
  onMedia?: boolean;
}) {
  if (!words.length) return null;

  return (
    <div
      aria-hidden="true"
      className={cn("pointer-events-none absolute select-none", className)}
    >
      {words.map((word, index) => (
        <div
          key={word + index}
          data-on-media={onMedia ? "" : undefined}
          className={cn(
            "tpl-ghost",
            size === "hero"
              ? "text-[clamp(4.5rem,17vw,15rem)]"
              : "text-[clamp(3rem,10vw,8rem)]",
          )}
          // Optical alignment. A capital letter carries side bearing that a
          // flush-left block does not account for, and at this size the gap is
          // visible as a soft indent on every line.
          style={{ marginLeft: "-0.055em" }}
        >
          {word}
        </div>
      ))}
    </div>
  );
}
