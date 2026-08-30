"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/cn";

/**
 * The scroll entrance, and the reason it is written this way rather than with
 * a motion library.
 *
 * A component that renders `opacity: 0` and waits for a script to reveal it is
 * invisible whenever that script has not run: before hydration, in a throttled
 * background tab, in a headless capture, or if the bundle fails. These pages
 * are statically exported and are the thing a prospect is sent a link to, so
 * "blank until JavaScript" is not an acceptable failure mode.
 *
 * So nothing is hidden in the markup. On mount, this checks whether the
 * element is BELOW the fold; only then does it set `data-tpl-pending`, which
 * is what the stylesheet uses to hide it. Anything already on screen is left
 * alone, so there is no flash of content disappearing after paint, and with
 * JavaScript off the attribute is never set and the whole page is simply
 * visible.
 *
 * The curve, the duration and the distance all come from `--tpl-*` custom
 * properties, which the archetype sets on the wrapper. A section never states
 * its own motion, which is what keeps one template speaking one gesture.
 */
export function TplReveal({
  children,
  delay = 0,
  className,
  as: Tag = "div",
}: {
  children: React.ReactNode;
  /** Milliseconds. Used for list cascades; capped by the caller, not here. */
  delay?: number;
  className?: string;
  as?: "div" | "li" | "section" | "article" | "figure";
}) {
  const ref = useRef<HTMLDivElement>(null);

  // `as` is a union of intrinsic tags, which TypeScript resolves by
  // INTERSECTING their ref types: no single ref satisfies div and li and
  // figure at once. The element is narrowed for the type checker only; the
  // runtime tag is whatever the caller asked for.
  const Element = Tag as "div";

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Checked here as well as in CSS. The stylesheet backstop stops the
    // animation; this stops the element from ever being hidden in the first
    // place, which matters if the animation is suppressed some other way.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // Already in view, or close enough that hiding it would be visible.
    if (el.getBoundingClientRect().top < window.innerHeight * 0.9) return;

    el.setAttribute("data-tpl-pending", "");

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          el.removeAttribute("data-tpl-pending");
          el.setAttribute("data-tpl-in", "");
          observer.disconnect();
        }
      },
      { rootMargin: "0px 0px -10% 0px" },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <Element
      ref={ref}
      className={cn(className)}
      style={delay ? ({ "--tpl-delay": `${delay}ms` } as React.CSSProperties) : undefined}
    >
      {children}
    </Element>
  );
}
