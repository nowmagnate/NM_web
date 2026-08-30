"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";
import { TplButton } from "../parts/TplButton";
import type { Section } from "../schema";

type Props = Extract<Section, { type: "nav" }> & {
  brandName: string;
  /**
   * True when the first band is a media hero. The bar then sits ON the
   * photograph with no background of its own and light type, and only takes a
   * ground once the image has scrolled away.
   *
   * The top of every hero scrim is at least 76% ink for exactly this reason,
   * so the wordmark and the links are legible over any image a client supplies
   * rather than over the demo one they happened to be drawn against.
   */
  blend?: boolean;
};

/**
 * The bar. Wordmark, a pill group of links, one action.
 *
 * The links live inside a single rounded container rather than as loose text
 * across the top. That is the shape modern practice sites use, and the reason
 * is not fashion: a floating group reads as one control that happens to be on
 * top of the page, which is what lets the hero field run underneath it
 * uninterrupted. A full-width bordered bar cuts the composition in two before
 * a reader has seen any of it.
 *
 * The wordmark is set in the template's own display face rather than loaded as
 * a logo file, because a practice buying a $499 site usually does not have a
 * usable logo and the ones they do have are 400px JPEGs with a white box round
 * them. Type always looks deliberate.
 *
 * The phone number is a link and it comes before the action on a phone,
 * because the visitor who is going to call is not going to scroll to find the
 * number.
 */
export function Nav({ links, action, phone, brandName, blend, id }: Props) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    if (!blend) return;

    // Cheap and passive: one boolean, read on scroll, no layout measured. The
    // threshold is a fraction of the viewport rather than a pixel count so it
    // lands at roughly the same point on a phone and on a monitor.
    const onScroll = () => setScrolled(window.scrollY > window.innerHeight * 0.6);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [blend]);

  // With JavaScript off, `scrolled` stays false and a blending bar keeps the
  // field colour all the way down. That is legible and deliberate, rather than
  // the alternative failure of a transparent bar with copy running under it.
  const atRest = blend && !scrolled;

  return (
    <header
      id={id}
      data-on-media={atRest ? "" : undefined}
      className={cn(
        "transition-colors duration-300 ease-tpl",
        atRest
          ? "bg-transparent"
          : "border-tpl-rule bg-tpl-bg/92 border-b backdrop-blur",
      )}
    >
      <div className="mx-auto flex max-w-[1180px] items-center justify-between gap-6 px-[var(--tpl-gutter)] py-4">
        <a
          href="#top"
          className={cn(
            "font-tpl-display text-[1.3rem] leading-none font-bold tracking-[-0.03em]",
            atRest ? "text-tpl-on-ink" : "text-tpl-ink",
          )}
        >
          {brandName}
        </a>

        <nav
          aria-label="Primary"
          className={cn(
            "rounded-tpl-pill hidden items-center gap-1 p-1 md:flex",
            atRest ? "bg-tpl-on-ink/12 backdrop-blur-sm" : "bg-tpl-surface",
          )}
        >
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={cn(
                "rounded-tpl-pill px-4 py-2 text-[13.5px] font-medium transition-colors duration-200",
                atRest
                  ? "text-tpl-on-ink hover:bg-tpl-on-ink/18"
                  : "text-tpl-ink hover:bg-tpl-bg",
              )}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          {phone ? (
            <a
              href={`tel:${phone.replace(/[^\d+]/g, "")}`}
              className={cn(
                "hidden text-[14px] font-semibold lg:inline",
                atRest ? "text-tpl-on-ink" : "text-tpl-ink",
              )}
            >
              {phone}
            </a>
          ) : null}

          {action ? (
            <TplButton
              action={action}
              className="rounded-tpl-pill hidden px-6 py-2.5 min-h-0 h-[42px] md:inline-flex"
            />
          ) : null}

          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-controls="tpl-nav-menu"
            className={cn(
              "rounded-tpl-pill flex h-11 w-11 items-center justify-center border md:hidden",
              atRest
                ? "border-tpl-on-ink/35 text-tpl-on-ink"
                : "border-tpl-ink/20 text-tpl-ink",
            )}
          >
            <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
            <span aria-hidden="true" className="flex w-5 flex-col gap-[5px]">
              <span
                className={cn(
                  "h-px w-full transition-transform duration-200",
                  atRest ? "bg-tpl-on-ink" : "bg-tpl-ink",
                  open && "translate-y-[6px] rotate-45",
                )}
              />
              <span
                className={cn(
                  "h-px w-full transition-opacity duration-200",
                  atRest ? "bg-tpl-on-ink" : "bg-tpl-ink",
                  open && "opacity-0",
                )}
              />
              <span
                className={cn(
                  "h-px w-full transition-transform duration-200",
                  atRest ? "bg-tpl-on-ink" : "bg-tpl-ink",
                  open && "-translate-y-[6px] -rotate-45",
                )}
              />
            </span>
          </button>
        </div>
      </div>

      {/* Rendered always, hidden with `hidden` rather than unmounted, so the
          links are in the static HTML for a crawler and for a reader whose
          JavaScript never arrives. */}
      <div
        id="tpl-nav-menu"
        className={cn(
          "border-tpl-ink/10 bg-tpl-bg border-t md:hidden",
          !open && "hidden",
        )}
      >
        <nav aria-label="Primary, mobile" className="flex flex-col px-[var(--tpl-gutter)]">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="border-tpl-ink/10 text-tpl-ink border-b py-4 text-[16px] font-medium last:border-b-0"
            >
              {link.label}
            </a>
          ))}
        </nav>
        {action ? (
          <div className="px-[var(--tpl-gutter)] pt-2 pb-5">
            <TplButton action={action} className="rounded-tpl-pill" block />
          </div>
        ) : null}
      </div>
    </header>
  );
}
