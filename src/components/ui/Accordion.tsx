"use client";

import { useState, useId } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { cn } from "@/lib/cn";

/**
 * Questions as a stack of hairline divisions.
 *
 * The marker is a plus drawn as two rules rather than an icon glyph — at this
 * size an icon library would add a font for two lines — that rotates 45° into
 * an X when its panel opens.
 *
 * Built on real buttons with aria-expanded/aria-controls rather than
 * <details>, because the height animation needs to be driven and <details>
 * cannot be animated reliably across browsers.
 *
 * Multiple panels open at once. Auto-closing the previous answer fights a
 * reader comparing two answers, which on an FAQ about contracts and IP is
 * exactly what they do.
 */

export type AccordionItem = {
  question: string;
  answer: React.ReactNode;
};

export function Accordion({
  items,
  className,
}: {
  items: AccordionItem[];
  className?: string;
}) {
  const [open, setOpen] = useState<Set<number>>(new Set());
  const baseId = useId();
  const reduce = useReducedMotion();

  const toggle = (i: number) =>
    setOpen((prev) => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });

  return (
    <div className={cn("border-rule border-t", className)}>
      {items.map((item, i) => {
        const isOpen = open.has(i);
        const panelId = `${baseId}-panel-${i}`;
        const buttonId = `${baseId}-button-${i}`;

        return (
          <div key={item.question} className="border-rule border-b">
            <h3>
              <button
                id={buttonId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => toggle(i)}
                className="group flex w-full items-start justify-between gap-6 py-6 text-left"
              >
                <span className="font-display text-lg font-medium md:text-xl">
                  {item.question}
                </span>
                <span
                  aria-hidden="true"
                  className={cn(
                    "border-rule-strong relative mt-1 grid h-7 w-7 shrink-0 place-items-center border",
                    "transition-transform duration-[--t-base] ease-(--ease-settle)",
                    isOpen && "rotate-45",
                  )}
                >
                  <span className="bg-ink absolute h-px w-3" />
                  <span className="bg-ink absolute h-3 w-px" />
                </span>
              </button>
            </h3>

            <AnimatePresence initial={false}>
              {isOpen ? (
                <motion.div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  initial={reduce ? false : { height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={reduce ? undefined : { height: 0, opacity: 0 }}
                  transition={{ duration: 0.34, ease: [0.16, 1, 0.3, 1] }}
                  className="overflow-hidden"
                >
                  <div className="text-ink-muted max-w-[68ch] pb-7 leading-[1.65]">
                    {item.answer}
                  </div>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
