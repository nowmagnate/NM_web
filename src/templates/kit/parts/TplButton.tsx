import { cn } from "@/lib/cn";
import type { Action } from "../schema";

/**
 * The template button. One component, three weights, and the contrast story
 * is the part worth reading.
 *
 * `primary` fills with `--tpl-accent-deep`, not with `--tpl-accent`. The
 * catalog accents are picked to look right as a swatch beside two neutrals,
 * which puts most of them near 3:1 against white: fine for a hairline, an icon
 * or a 32px numeral, and not enough under a label. `accent-deep` is the same
 * hue carried far enough toward ink to clear AA, so a client can swap the
 * accent in their config to anything they like and the button label stays
 * readable. That is what "fully customizable" has to mean if it is going to be
 * true on a site somebody is paying for.
 *
 * The interaction is a colour change and nothing else. No lift, no scale, no
 * translate: a row of buttons must not reflow under the cursor, and a hover
 * that moves is a hover that does not exist on the phone where most of these
 * visitors are.
 */

const base =
  "inline-flex items-center justify-center gap-2 rounded-tpl " +
  "font-tpl-body text-[14px] font-semibold tracking-[0.01em] whitespace-nowrap " +
  "px-6 py-[13px] min-h-[48px] " +
  "transition-[background-color,color,border-color] duration-200 ease-tpl";

const weights = {
  primary:
    "bg-tpl-accent-deep text-tpl-on-accent border border-tpl-accent-deep " +
    "hover:bg-tpl-ink hover:border-tpl-ink",
  secondary:
    "border border-tpl-rule-strong text-tpl-ink bg-transparent " +
    "hover:bg-tpl-ink hover:text-tpl-on-ink hover:border-tpl-ink",
  quiet:
    "tpl-underline border-0 px-0 py-0 min-h-0 text-tpl-accent-deep " +
    "font-medium hover:text-tpl-ink",
} as const;

export function TplButton({
  action,
  className,
  block,
}: {
  action: Action;
  className?: string;
  /** Full width. Used inside the mobile bar and at the foot of a form. */
  block?: boolean;
}) {
  const external = /^https?:/.test(action.href);

  return (
    <a
      href={action.href}
      className={cn(base, weights[action.style], block && "w-full", className)}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      {action.label}
    </a>
  );
}

/** The same skin on a real `<button>`, for the form submit. */
export function TplSubmit({
  children,
  loading,
  block,
  className,
}: {
  children: React.ReactNode;
  loading?: boolean;
  block?: boolean;
  className?: string;
}) {
  return (
    <button
      type="submit"
      aria-busy={loading || undefined}
      disabled={loading}
      className={cn(
        base,
        weights.primary,
        block && "w-full",
        "disabled:pointer-events-none disabled:opacity-60",
        className,
      )}
    >
      {children}
      {loading ? (
        <span
          aria-hidden="true"
          className="h-3.5 w-3.5 shrink-0 animate-spin rounded-full border-2 border-current/30 border-t-current"
        />
      ) : null}
    </button>
  );
}
