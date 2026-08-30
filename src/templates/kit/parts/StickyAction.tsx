import { cn } from "@/lib/cn";
import type { Action } from "../schema";

/**
 * The thumb-reach bar. Phones only.
 *
 * The booking-led archetype states one action in the hero and repeats it down
 * the page, and this is the version that is never more than a thumb away. It
 * carries the call option beside it because a practice that takes bookings by
 * phone loses the visitor who is standing in a queue and will not fill in a
 * form.
 *
 * `env(safe-area-inset-bottom)` keeps it clear of the home indicator on a
 * modern iPhone, where a bar flush to the bottom edge is a bar that is half
 * covered.
 */
export function StickyAction({
  action,
  phone,
  className,
}: {
  action: Action;
  phone?: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "border-tpl-rule bg-tpl-bg/95 fixed inset-x-0 bottom-0 z-40 border-t backdrop-blur md:hidden",
        className,
      )}
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <div className="flex items-stretch gap-3 p-3">
        {phone ? (
          <a
            href={`tel:${phone.replace(/[^\d+]/g, "")}`}
            className="border-tpl-rule-strong text-tpl-ink rounded-tpl flex min-h-[48px] shrink-0 items-center border px-5 text-[14px] font-semibold"
          >
            Call
          </a>
        ) : null}
        <a
          href={action.href}
          className="bg-tpl-accent-deep text-tpl-on-accent rounded-tpl flex min-h-[48px] flex-1 items-center justify-center px-5 text-[14px] font-semibold"
        >
          {action.label}
        </a>
      </div>
    </div>
  );
}
