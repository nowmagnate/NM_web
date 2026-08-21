import { brand } from "@/config/brand";
import { cn } from "@/lib/cn";

/**
 * The ONLY component that renders the company mark or name as a graphic.
 *
 * This file and `src/config/brand.ts` are the two places a rename touches.
 * The mark is a maker's punch: a struck pocket with the initial cut into it.
 * `currentColor` throughout, so one definition serves every context.
 *
 * When the real logo arrives, replace the <svg> in `Mark` (or point it at
 * /brand/logo-mark.svg) and leave everything else alone. The filenames in
 * public/brand/ are fixed for exactly this reason.
 */

type LogoVariant = "lockup" | "wordmark" | "mark";
type LogoSize = "sm" | "md" | "lg";

const markSize: Record<LogoSize, string> = {
  sm: "h-7 w-7",
  md: "h-9 w-9",
  lg: "h-12 w-12",
};

const wordSize: Record<LogoSize, string> = {
  sm: "text-[15px]",
  md: "text-[18px]",
  lg: "text-[26px]",
};

/**
 * A square carrying the diagonal of the initial, stroked in the spectrum.
 *
 * The gradient id is a fixed string rather than a `useId()`. Two logos on one
 * page (header and footer) therefore emit the same id and the first
 * definition wins for both — which is correct here, because both definitions
 * are identical. A hook would also make this a Client Component, and the
 * footer renders on the server. Deliberately one simple geometric mark: it has
 * to survive being rendered at 28px in a nav rail and as a favicon.
 */
const GRADIENT_ID = "logo-spectrum";

function Mark({ className }: { className?: string }) {
  return (
    <span className={cn("grid shrink-0 place-items-center", className)}>
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="h-full w-full">
        <defs>
          <linearGradient id={GRADIENT_ID} x1="0" y1="24" x2="24" y2="0">
            <stop offset="0%" stopColor="var(--spec-1)" />
            <stop offset="50%" stopColor="var(--spec-3)" />
            <stop offset="100%" stopColor="var(--spec-5)" />
          </linearGradient>
        </defs>
        <rect x="0.9" y="0.9" width="22.2" height="22.2" stroke="currentColor" />
        <path
          d="M6.5 17.5V7L17.5 17V6.5"
          stroke={`url(#${GRADIENT_ID})`}
          strokeWidth="2.4"
          strokeLinecap="square"
          strokeLinejoin="miter"
        />
      </svg>
    </span>
  );
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
        <Mark className={markSize[size]} />
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
      <Mark className={markSize[size]} />
      <span
        aria-hidden="true"
        className={cn("font-display font-semibold tracking-[-0.01em]", wordSize[size])}
      >
        {brand.shortName}
      </span>
    </span>
  );
}
