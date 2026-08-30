import { cn } from "@/lib/cn";

/**
 * A pill carrying one short claim.
 *
 * Chips sit on the hero field on the same plane as the headline, which is why
 * they are solid ground colour rather than an outline: on a tinted field an
 * outlined pill disappears, and a solid one reads as an object lying on the
 * surface. That is the whole trick of this opening, applied at small scale.
 *
 * Fully round whatever the template's structural radius is. `--tpl-pill` is
 * deliberately not configurable: a pill reads as a control and a rectangle
 * reads as a container, and letting a config blur that line is how a page ends
 * up with six shapes and no system.
 *
 * Not a link and not a button. A chip that looks tappable and is not is worse
 * than no chip; if a claim needs an action, it is an action.
 */
export function Chip({
  children,
  className,
  tone = "solid",
}: {
  children: React.ReactNode;
  className?: string;
  tone?: "solid" | "outline";
}) {
  return (
    <span
      className={cn(
        "rounded-tpl-pill inline-flex items-center gap-2 px-5 py-2.5 text-[13.5px] leading-none font-medium",
        tone === "solid"
          ? "bg-tpl-bg text-tpl-ink"
          : "border-tpl-rule-strong text-tpl-ink border",
        className,
      )}
    >
      <span
        aria-hidden="true"
        className="bg-tpl-accent-deep h-1.5 w-1.5 shrink-0 rounded-full"
      />
      {children}
    </span>
  );
}
