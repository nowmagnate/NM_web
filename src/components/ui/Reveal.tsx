"use client";

import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/cn";

/**
 * The world's native motion is a strike: a punch descends, contacts the
 * plate, and the metal rebounds. Everything here is that one gesture at
 * different intensities, rather than a set of unrelated effects.
 *
 * Two modes so the page is not one identical entrance repeated down its
 * whole length:
 *   settle — the quiet one. A short fall with a damped landing.
 *   strike — the loud one. Falls further and lands with the shadow deepening
 *            underneath it, so the surface reads as receiving an impression.
 *            Reserved for a section's own arrival, never for list items.
 *
 * Content is visible by default: no CSS hides it, and if JavaScript never
 * runs no inline style is applied, so a static-export page without JS still
 * shows everything. Reduced motion skips the initial state entirely rather
 * than animating faster.
 */

type Mode = "settle" | "strike";

const EASE_STRIKE = [0.16, 1, 0.3, 1] as const;

export function Reveal({
  children,
  mode = "settle",
  delay = 0,
  className,
  as = "div",
}: {
  children: React.ReactNode;
  mode?: Mode;
  delay?: number;
  className?: string;
  as?: "div" | "li" | "section" | "span";
}) {
  const reduce = useReducedMotion();
  const Component = motion[as];

  const from =
    mode === "strike"
      ? { opacity: 0, y: 28, filter: "blur(6px)" }
      : { opacity: 0, y: 12 };

  const to =
    mode === "strike" ? { opacity: 1, y: 0, filter: "blur(0px)" } : { opacity: 1, y: 0 };

  return (
    <Component
      className={cn(className)}
      initial={reduce ? false : from}
      whileInView={to}
      viewport={{ once: true, amount: 0.25 }}
      transition={{
        duration: mode === "strike" ? 0.78 : 0.52,
        delay,
        ease: EASE_STRIKE,
      }}
    >
      {children}
    </Component>
  );
}

/**
 * Staggers direct children. The 55ms step is short enough that the last item
 * is not still arriving after the reader has started reading, and the cap
 * stops a long row turning into a queue.
 */
export function RevealGroup({
  children,
  className,
  step = 0.055,
  maxDelay = 0.33,
}: {
  children: React.ReactNode;
  className?: string;
  step?: number;
  maxDelay?: number;
}) {
  const items = Array.isArray(children) ? children : [children];
  return (
    <div className={cn(className)}>
      {items.map((child, i) => (
        <Reveal key={i} delay={Math.min(i * step, maxDelay)}>
          {child}
        </Reveal>
      ))}
    </div>
  );
}
