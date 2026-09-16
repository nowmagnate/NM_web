import { brand } from "@/config/brand";
import { Monogram } from "@/components/brand/Monogram";
import { cn } from "@/lib/cn";

/**
 * The ONLY component that renders the company mark or name as a graphic.
 *
 * This file and `src/config/brand.ts` are the two places a rename touches,
 * and the mark survives one for free: the initial is derived from the brand's
 * own maker's mark rather than typed in, so renaming the company restrikes
 * the logo instead of leaving the old letter behind.
 *
 * The placeholder punch that stood here until the identity existed is gone.
 * The mark is now the real one from the logo system, set rather than drawn;
 * `Monogram.tsx` records how and why.
 */

type LogoVariant = "lockup" | "wordmark" | "mark";
type LogoSize = "sm" | "md" | "lg";

const wordSize: Record<LogoSize, string> = {
  sm: "text-[15px]",
  md: "text-[18px]",
  lg: "text-[26px]",
};

/**
 * The parent mark, from the logo system's own export.
 *
 * Its initial is a flat indigo rather than the site's spectrum ramp, and that
 * is the identity's decision rather than this site's: the ramp was tried here
 * and did not survive the size the mark is actually used at. At 36px the
 * initial is a 12x14px box, and a five-stop gradient compressed into a 17px
 * diagonal reads as a blue-violet smudge, not as the accent. The flat colour
 * the design system settled on is `#5e5ef0`, which is exactly the midpoint of
 * this site's spectrum, so the mark still belongs to the page without trying
 * to reproduce the ramp inside a letterform.
 */
const PARENT_MARK = "/brand/NowMagnate-icon-indigo-512.png";

const tileSize: Record<LogoSize, number> = { sm: 28, md: 36, lg: 48 };

function Mark({ size }: { size: LogoSize }) {
  return <Monogram src={PARENT_MARK} size={tileSize[size]} />;
}

export function Logo({
  variant = "lockup",
  size = "md",
  className,
}: {
  variant?: LogoVariant;
  size?: LogoSize;
  className?: string;
}) {
  const label = brand.name;

  if (variant === "mark") {
    return (
      <span
        className={cn("text-ink inline-flex", className)}
        role="img"
        aria-label={label}
      >
        <Mark size={size} />
      </span>
    );
  }

  if (variant === "wordmark") {
    return (
      <span
        className={cn(
          "font-display text-ink font-semibold tracking-[-0.01em]",
          wordSize[size],
          className,
        )}
      >
        {brand.shortName}
      </span>
    );
  }

  return (
    <span
      className={cn("text-ink inline-flex items-center gap-2.5", className)}
      role="img"
      aria-label={label}
    >
      <Mark size={size} />
      <span
        aria-hidden="true"
        className={cn("font-display font-semibold tracking-[-0.01em]", wordSize[size])}
      >
        {brand.shortName}
      </span>
    </span>
  );
}
