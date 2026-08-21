import { cn } from "@/lib/cn";

/**
 * The provenance strip: maker's mark, founding year, home office — three
 * small facts struck into a row of square chips. It is a real structural
 * device carried over from the previous design system rather than
 * decoration, and it still appears at the two moments where provenance is
 * the argument: the footer, and the final call to action.
 *
 * Each chip is a hairline square, Archivo caps at 0.1em tracking. `disc`
 * exists only for the country code, which reads as a stamp rather than a
 * label when it is round.
 */

export type MarkKind = "default" | "assay" | "disc";

export type Mark = {
  /** The glyph or short string struck into the mark. Kept to 1-4 characters. */
  glyph: string;
  /** What this mark certifies. Announced to screen readers, shown on hover. */
  label: string;
  kind?: MarkKind;
};

export function Hallmark({
  marks,
  size = "md",
  className,
}: {
  marks: Mark[];
  size?: "sm" | "md";
  className?: string;
}) {
  const box = size === "sm" ? "h-8 min-w-8 px-2" : "h-10 min-w-10 px-2.5";
  const type = size === "sm" ? "text-[10px]" : "text-[11px]";

  return (
    <div
      className={cn("flex items-center gap-2", className)}
      role="list"
      aria-label="Provenance"
    >
      {marks.map((mark) => (
        <span
          key={mark.label}
          role="listitem"
          title={mark.label}
          className={cn(
            "border-rule-strong inline-flex items-center justify-center border",
            "font-ui font-medium tracking-[0.1em] uppercase",
            box,
            type,
            mark.kind === "disc" ? "rounded-full" : "",
            mark.kind === "assay" ? "text-spec-3 border-spec-3/40" : "text-ink-soft",
          )}
        >
          <span aria-hidden="true">{mark.glyph}</span>
          <span className="sr-only">{mark.label}</span>
        </span>
      ))}
    </div>
  );
}
