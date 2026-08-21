import Link from "next/link";
import { cn } from "@/lib/cn";

/**
 * The site's only button: a tracked-out uppercase label inside a square
 * hairline box.
 *
 * NO RADIUS, and that is the point. Every edge in this system is a right
 * angle, so a rounded button would be the one borrowed part on the page. The
 * label is Archivo at 12px with 0.2em tracking — small type doing structural
 * work, which is what stops the button from competing with a Syne headline
 * sitting two lines above it.
 *
 * The interaction is a fill, not a lift. An outlined control floods to solid
 * on hover and the label inverts; a solid control empties out. Nothing
 * translates, nothing scales — the box holds its position so a row of
 * buttons never reflows under the cursor.
 *
 * Variants:
 *   outline — hairline box, floods to ink. The default and the workhorse.
 *   solid   — ink field, empties to outline. For the one primary action.
 *   light   — hairline box on a dark field, floods to white.
 *   text    — no box; a label with a rule that draws in from the left.
 *
 * CONTRAST: ink-on-white and white-on-ink throughout (~21:1). The spectrum is
 * never used as a button field, because mid-gradient stops sit around 3:1
 * against white and cannot carry a label at 12px.
 */

type Variant = "outline" | "solid" | "light" | "text";
type Size = "sm" | "md" | "lg";

/** Old variant names from the previous system, mapped rather than removed. */
type LegacyVariant = "mark" | "struck" | "raised";

const legacy: Record<LegacyVariant, Variant> = {
  mark: "solid",
  struck: "outline",
  raised: "outline",
};

const base =
  "group relative inline-flex items-center justify-center gap-2.5 " +
  "ui-label whitespace-nowrap select-none " +
  "transition-[color,background-color,border-color] duration-[--t-fast] ease-out " +
  "focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-ink " +
  "disabled:pointer-events-none disabled:opacity-45";

const variants: Record<Variant, string> = {
  outline:
    "border border-ink text-ink bg-transparent " + "hover:bg-ink hover:text-bg",
  solid: "border border-ink bg-ink text-bg " + "hover:bg-transparent hover:text-ink",
  light:
    "border border-bg-deep-ink text-bg-deep-ink bg-transparent " +
    "hover:bg-bg-deep-ink hover:text-bg-deep",
  text:
    "underline-draw border-0 px-0 text-ink " +
    "after:-bottom-1.5 hover:text-ink focus-visible:outline-offset-4",
};

/* Padding is asymmetric — a hair more on the left and top — because tracked
   uppercase type carries a trailing letter-space on its last glyph and reads
   off-centre in a symmetrically padded box. */
const sizes: Record<Size, string> = {
  sm: "h-[42px] pt-0.5 pr-8 pl-[34px] text-[11px]",
  md: "h-[49px] pt-0.5 pr-12 pl-[50px]",
  lg: "h-[56px] pt-0.5 pr-14 pl-[58px] text-[13px]",
};

/** `text` has no box, so the size ramp only sets its type scale. */
const textSizes: Record<Size, string> = {
  sm: "h-auto text-[11px]",
  md: "h-auto",
  lg: "h-auto text-[13px]",
};

type Common = {
  children: React.ReactNode;
  variant?: Variant | LegacyVariant;
  size?: Size;
  /** Inline spinner after the label, control disabled. */
  loading?: boolean;
  className?: string;
};

type AsLink = Common & {
  href: string;
  external?: boolean;
} & Omit<React.ComponentPropsWithoutRef<typeof Link>, "href" | "className" | "children">;

type AsButton = Common &
  Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "className" | "children"> & {
    href?: undefined;
  };

function Spinner() {
  return (
    <span
      aria-hidden="true"
      className="h-3 w-3 shrink-0 animate-spin rounded-full border-2 border-current/25 border-t-current"
    />
  );
}

function resolve(v: Variant | LegacyVariant): Variant {
  return v in legacy ? legacy[v as LegacyVariant] : (v as Variant);
}

export function Button(props: AsLink | AsButton) {
  const {
    children,
    variant = "outline",
    size = "md",
    loading,
    className,
    ...rest
  } = props;

  const v = resolve(variant);
  const classes = cn(
    base,
    variants[v],
    v === "text" ? textSizes[size] : sizes[size],
    className,
  );

  if ("href" in props && props.href !== undefined) {
    const { href, external, ...linkRest } = rest as AsLink;
    const externalProps = external
      ? { target: "_blank", rel: "noopener noreferrer" }
      : {};
    return (
      <Link href={href} className={classes} {...externalProps} {...linkRest}>
        {children}
      </Link>
    );
  }

  // `loading` implies disabled so a double submit cannot slip through between
  // the click and the state update.
  const buttonRest = rest as AsButton;
  return (
    <button
      className={classes}
      aria-busy={loading || undefined}
      disabled={loading || buttonRest.disabled}
      {...buttonRest}
    >
      <span className={loading ? "opacity-70" : undefined}>{children}</span>
      {loading ? <Spinner /> : null}
    </button>
  );
}
