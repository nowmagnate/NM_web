import { cn } from "@/lib/cn";
import { Ghost } from "./Ghost";
import { TplReveal } from "./TplReveal";

/**
 * A horizontal band and its container. Every section in the kit is one of
 * these, which is what gives a template a single vertical rhythm instead of
 * each section arguing for its own padding.
 *
 * Height comes from `--tpl-band-y`, set once per template by its density, so a
 * section never states how tall it should be. `tone` is deliberately a short
 * list: a band sits on the ground, on the one lifted surface, on a wash of the
 * accent, or it is the single inverted band a page is allowed. There is no
 * "pick a colour" option, because that is how a template ends up with six
 * background colours and no hierarchy.
 */

export type Tone = "bg" | "surface" | "wash" | "field" | "ink";

const tones: Record<Tone, string> = {
  bg: "bg-tpl-bg",
  surface: "bg-tpl-surface",
  wash: "bg-tpl-wash",
  // The tinted ground the merged opening is composed on. See tokens.css.
  field: "bg-tpl-field",
  // Not a colour class: `.tpl-invert` swaps ink and ground and recomputes
  // every derived token from the swap. See tokens.css.
  ink: "tpl-invert",
};

export function Band({
  children,
  id,
  tone = "bg",
  className,
  as: Tag = "section",
  labelledBy,
  flush,
  ghost,
}: {
  children: React.ReactNode;
  id?: string;
  tone?: Tone;
  className?: string;
  as?: "section" | "div" | "footer" | "header";
  labelledBy?: string;
  /** Drop the vertical padding, for bands that own their own spacing. */
  flush?: boolean;
  /**
   * Giant lettering set into this band's ground, cropped by its edges. Sits at
   * the foot of the band, behind the content, and is decorative throughout.
   * The hero composes its own rather than using this, because it positions the
   * lettering against the subject.
   */
  ghost?: string[];
}) {
  const hasGhost = Boolean(ghost?.length);

  return (
    <Tag
      id={id}
      aria-labelledby={labelledBy}
      className={cn(
        tones[tone],
        !flush && "py-[var(--tpl-band-y)]",
        hasGhost && "relative overflow-hidden",
        className,
      )}
      // Anchored bands are scrolled to from the nav, and a sticky bar would
      // otherwise cover the heading that was just jumped to.
      style={id ? { scrollMarginTop: "var(--tpl-anchor)" } : undefined}
    >
      {hasGhost ? (
        <Ghost
          words={ghost ?? []}
          size="band"
          className="bottom-[-0.14em] left-0 w-full"
        />
      ) : null}
      {hasGhost ? <div className="relative">{children}</div> : children}
    </Tag>
  );
}

/** The measure. One width for the whole template, gutters from the density. */
export function Wrap({
  children,
  className,
  size = "default",
}: {
  children: React.ReactNode;
  className?: string;
  size?: "default" | "narrow" | "wide";
}) {
  return (
    <div
      className={cn(
        "mx-auto w-full px-[var(--tpl-gutter)]",
        size === "default" && "max-w-[1180px]",
        size === "narrow" && "max-w-[820px]",
        size === "wide" && "max-w-[1440px]",
        className,
      )}
    >
      {children}
    </div>
  );
}

/**
 * The heading block. `title` is an h2 by default because a template has one
 * h1 and it is in the hero; a band that needs to be an h1 says so.
 *
 * `id` on the heading rather than on the band, so `aria-labelledby` points at
 * the words a screen reader should announce for the region.
 */
export function BandHead({
  eyebrow,
  title,
  intro,
  id,
  align = "left",
  as: Tag = "h2",
  className,
  children,
}: {
  eyebrow?: string;
  title?: string;
  intro?: string;
  id?: string;
  align?: "left" | "center";
  as?: "h1" | "h2" | "h3";
  className?: string;
  /** Anything that belongs beside the heading: an action, a count, a filter. */
  children?: React.ReactNode;
}) {
  if (!eyebrow && !title && !intro && !children) return null;

  return (
    <TplReveal
      className={cn(
        "flex flex-col gap-5",
        align === "center" && "items-center text-center",
        children && "md:flex-row md:items-end md:justify-between md:gap-12",
        className,
      )}
    >
      <div className={cn("flex flex-col gap-4", align === "center" && "items-center")}>
        {eyebrow ? (
          <span className="text-tpl-accent-deep font-tpl-body text-[12px] font-semibold tracking-[0.18em] uppercase">
            {eyebrow}
          </span>
        ) : null}

        {title ? (
          <Tag
            id={id}
            className={cn(
              "text-tpl-ink max-w-[18ch]",
              "font-bold tracking-[-0.03em]",
              Tag === "h1"
                ? "text-[clamp(2.6rem,6vw,4.5rem)]"
                : "text-[clamp(2rem,4.2vw,3.4rem)]",
              align === "center" && "mx-auto",
            )}
          >
            {title}
          </Tag>
        ) : null}

        {intro ? (
          <p
            className={cn(
              "text-tpl-muted max-w-[52ch] text-[17px] leading-[1.62]",
              align === "center" && "mx-auto",
            )}
          >
            {intro}
          </p>
        ) : null}
      </div>

      {children ? <div className="shrink-0">{children}</div> : null}
    </TplReveal>
  );
}

/**
 * A hairline. Used constantly: this kit divides with rules and whitespace
 * rather than with shadow, which is what stops 24 templates from all looking
 * like the same card library recoloured.
 */
export function Rule({ className }: { className?: string }) {
  return <div className={cn("bg-tpl-rule h-px w-full", className)} aria-hidden="true" />;
}
