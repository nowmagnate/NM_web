import { cn } from "@/lib/cn";

/**
 * The rotating seal. One per page, only ever in the hero.
 *
 * It is the reward for looking twice: a small object that turns out to be
 * doing something when you notice it. That is worth more on a $499 template
 * than another row of feature cards, because it is the detail a buyer cannot
 * get from a marketplace theme and the thing they point at when they decide
 * this one looks made rather than bought.
 *
 * The ring text and the centre are separate elements, and only the ring turns.
 * Rotating the whole seal would spin the centre glyph with it, which reads as
 * a loading spinner rather than a stamp.
 *
 * The rotation is the ONE looping animation this system permits, and the
 * stylesheet turns it off entirely under reduced motion rather than shortening
 * it: an infinite animation compressed to 0.01ms is a repaint every frame for
 * as long as the page is open.
 */
export function Seal({
  ring,
  center,
  className,
}: {
  /** Runs around the circle. Kept short; it is set at 9px and repeats. */
  ring: string;
  center?: string;
  className?: string;
}) {
  // A single deterministic id. There is one seal per page by rule, so this
  // never collides, and a fixed string keeps the markup stable between the
  // server render and the client so nothing rehydrates differently.
  const pathId = "tpl-seal-ring";

  return (
    <div
      className={cn("relative grid place-items-center", className)}
      // Decorative: the ring text repeats a claim already made in the copy,
      // and reading a circular string aloud is noise.
      aria-hidden="true"
    >
      <svg viewBox="0 0 120 120" className="h-full w-full">
        <circle cx="60" cy="60" r="60" fill="var(--tpl-accent-deep)" />
        <g className="tpl-seal">
          <defs>
            <path
              id={pathId}
              fill="none"
              d="M60,60 m-44,0 a44,44 0 1,1 88,0 a44,44 0 1,1 -88,0"
            />
          </defs>
          <text
            fill="var(--tpl-on-accent)"
            fontSize="10.5"
            fontWeight="600"
            letterSpacing="2.6"
            style={{ textTransform: "uppercase" }}
          >
            <textPath href={`#${pathId}`} startOffset="0">
              {ring}
            </textPath>
          </text>
        </g>
      </svg>

      {center ? (
        <span className="text-tpl-on-accent absolute text-center text-[13px] leading-[1.1] font-semibold">
          {center}
        </span>
      ) : null}
    </div>
  );
}
