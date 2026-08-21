import { cn } from "@/lib/cn";

/**
 * A bordered, square surface — the system's one card primitive.
 *
 * Depth here is a hairline, not a shadow: this world is printed rather than
 * machined, so a card is separated from the page by a 1px rule first and only
 * lifts on interaction. `raised` keeps that hairline at rest and adds a soft
 * shadow on hover/focus; `flat` never lifts, for a card that sits inside an
 * already-bordered grid where a second shadow would be noise.
 *
 * Use sparingly. Same-size plates of icon-plus-heading-plus-text as a page's
 * whole structure is the lazy container pattern — prefer a ruled list or the
 * alternating timeline when the content is a sequence rather than a set of
 * unordered peers.
 */
export function Plate({
  children,
  as: Tag = "div",
  depth = "raised",
  interactive = false,
  className,
}: {
  children: React.ReactNode;
  as?: "div" | "article" | "li" | "figure";
  depth?: "raised" | "flat";
  /** Only for a plate that is genuinely a link or button. */
  interactive?: boolean;
  className?: string;
}) {
  return (
    <Tag
      className={cn(
        "border-rule bg-bg border",
        interactive &&
          depth === "raised" &&
          "transition-shadow duration-[--t-base] ease-(--ease-settle) hover:shadow-[var(--lift)]",
        className,
      )}
    >
      {children}
    </Tag>
  );
}
