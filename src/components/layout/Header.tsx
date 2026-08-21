"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { Logo } from "@/components/brand/Logo";
import { Button } from "@/components/ui/Button";
import { mainNav, cta } from "@/config/site";
import { cn } from "@/lib/cn";

/**
 * An airy transparent rail that condenses into a solid bar on scroll.
 *
 * At rest it is tall — 112px of clear space above the hero, with no border and
 * no background, so the first thing on the page is the headline rather than a
 * chrome bar. Past the fold it drops to 76px, paints itself white and lays
 * down a hairline. Height is the whole transition; nothing slides or fades in
 * from off-screen, because a nav that re-enters on every upward scroll is a
 * pattern that reads as an ad unit.
 *
 * Nav items are Archivo at 12px with 0.2em tracking, which is small enough
 * that the row reads as a horizontal rule of text rather than as five
 * competing links. The active route is marked by a permanent spectrum
 * underline; hover draws the same rule in from the left, so the marker and the
 * affordance are the same object in two states.
 *
 * Constraints held: one line at desktop (five items plus mark and action is
 * the ceiling) and backdrop-blur on this fixed element only, so scrolling
 * content never repaints through a filter.
 */
export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const reduce = useReducedMotion();

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const condensed = scrolled || open;

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50",
        "transition-[background-color,box-shadow,border-color] duration-[--t-base] ease-(--ease-settle)",
        condensed
          ? "bg-bg/90 border-rule border-b shadow-[var(--lift-sm)] backdrop-blur-xl"
          : "border-b border-transparent bg-transparent",
      )}
    >
      <div className="mx-auto w-full max-w-[1600px] px-6 md:px-12 lg:px-[73px]">
        <nav
          aria-label="Main"
          className={cn(
            "flex items-center justify-between gap-10",
            "transition-[height] duration-[--t-base] ease-(--ease-settle)",
            condensed ? "h-[76px]" : "h-[88px] lg:h-[112px]",
          )}
        >
          <Link href="/" className="shrink-0" aria-label="Home">
            <Logo size="md" />
          </Link>

          <ul className="hidden items-center gap-9 lg:flex">
            {mainNav.map((item) => {
              const active =
                pathname === item.href || pathname.startsWith(`${item.href}/`);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "ui-label group relative block py-1 text-[12px]",
                      "transition-colors duration-[--t-fast]",
                      active ? "text-ink" : "text-ink-soft/75 hover:text-ink",
                    )}
                  >
                    {item.label}
                    {/* The marker and the hover affordance are one rule: it
                        sits drawn when the route is active, and draws in from
                        the left otherwise. Scaled rather than widened, so the
                        hover stays on the compositor. */}
                    <span
                      aria-hidden="true"
                      className={cn(
                        "absolute -bottom-1 left-0 h-px w-full origin-left",
                        "bg-[image:var(--spectrum)]",
                        "transition-transform duration-[--t-base] ease-(--ease-settle)",
                        active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100",
                      )}
                    />
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="flex shrink-0 items-center gap-4">
            <Button href={cta.primary.href} size="sm" className="hidden sm:inline-flex">
              {cta.primary.label}
            </Button>

            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? "Close menu" : "Open menu"}
              className="text-ink grid h-11 w-11 place-items-center lg:hidden"
            >
              {/* Two rules that cross into an X. */}
              <span className="relative block h-3 w-5">
                <span
                  className={cn(
                    "bg-ink absolute left-0 block h-px w-5",
                    "transition-transform duration-[--t-base] ease-(--ease-settle)",
                    open ? "top-1.5 rotate-45" : "top-0.5",
                  )}
                />
                <span
                  className={cn(
                    "bg-ink absolute left-0 block h-px w-5",
                    "transition-transform duration-[--t-base] ease-(--ease-settle)",
                    open ? "top-1.5 -rotate-45" : "top-2.5",
                  )}
                />
              </span>
            </button>
          </div>
        </nav>
      </div>

      <AnimatePresence>
        {open ? (
          <motion.div
            id="mobile-menu"
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={reduce ? undefined : { opacity: 0 }}
            transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
            className="bg-bg fixed inset-0 top-[76px] -z-10 lg:hidden"
          >
            <div className="flex h-[calc(100dvh-76px)] flex-col justify-center px-6 pb-24">
              <ul className="flex flex-col">
                {mainNav.map((item, i) => (
                  <motion.li
                    key={item.href}
                    initial={reduce ? false : { opacity: 0, y: 28 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.7,
                      delay: 0.05 + i * 0.055,
                      ease: [0.26, -0.14, 0, 1.01],
                    }}
                    className="border-rule border-b"
                  >
                    <Link
                      href={item.href}
                      className="font-display block py-5 text-[34px] font-semibold"
                    >
                      {item.label}
                    </Link>
                  </motion.li>
                ))}
              </ul>

              <motion.div
                initial={reduce ? false : { opacity: 0, y: 28 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.7,
                  delay: 0.05 + mainNav.length * 0.055,
                  ease: [0.26, -0.14, 0, 1.01],
                }}
                className="mt-12"
              >
                <Button href={cta.primary.href} size="lg">
                  {cta.primary.label}
                </Button>
              </motion.div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
