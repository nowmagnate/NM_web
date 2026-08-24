"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "motion/react";

/**
 * THE PRISM — the one 3D object on the page, and the only place the
 * "spectrum" in the design system's own name is drawn literally: a beam of
 * light enters a glass triangular prism and exits split into the same five
 * stops (`--spec-1`..`--spec-5`) that the rest of the site clips into
 * headlines and hairlines. It is the mechanism behind the accent, not a
 * stock 3D blob dropped onto the hero for effect.
 *
 * Real geometry, not a flat image: five faces (two triangular caps, three
 * rectangular sides) positioned in `preserve-3d` space by actual trigonometry
 * below, so tilting the object reveals true perspective, not a sprite. Glass
 * is tinted from the ramp's own indigo/violet stops (`--spec-3`, `--spec-4`)
 * rather than left clear, so it reads against a white sheet instead of
 * disappearing into it.
 *
 * Anchored near the top of the section (`top: 42%` of the section's own
 * box, not the viewport) rather than dead centre, and never with a negative
 * offset — an earlier version bled into the header above the hero that way.
 * Anchoring inside the section's own box can never cross that boundary
 * regardless of viewport height.
 *
 * Rest pose is deliberately NOT face-on: `prism-strike`'s end state (in
 * globals.css) holds a permanent slight tilt via pure CSS, so the object
 * reads as a solid even with JavaScript disabled or before hydration.
 * Everything below only ADDS a delta on top of that resting tilt, never
 * replaces it:
 *   scene    → perspective + responsive scale + positioning
 *   entrance → one CSS keyframe strike, fill-mode both (visible with no JS),
 *              settling into the permanent resting tilt
 *   drift    → a slow idle rotation, pure CSS, free under reduced-motion
 *              via the global backstop
 *   tilt     → two independent JS deltas summed each frame: how far the
 *              section has scrolled through the viewport (works everywhere
 *              scroll does), and the cursor's position within the section
 *              (fine-pointer devices only)
 *
 * The pointer delta eases back to (0, 0) — not to the resting tilt, since
 * that lives underneath it — the instant the cursor leaves the section,
 * instead of the previous whole-window mapping (which kept "reacting" to
 * cursor position anywhere on the page, including while scrolled away — the
 * reported "can't control it" feeling). An IntersectionObserver freezes the
 * idle drift and stops both listeners' work while the hero is off-screen.
 *
 * Decorative and redundant with visible copy elsewhere, so the whole thing
 * is `aria-hidden` and inert to pointer events.
 */

const SIDE = 460;
const DEPTH = 340;
const R = SIDE / Math.sqrt(3);
const HEIGHT = (SIDE * Math.sqrt(3)) / 2;

const vertices = {
  A: { x: 0, y: -R },
  B: { x: -SIDE / 2, y: R / 2 },
  C: { x: SIDE / 2, y: R / 2 },
} as const;

const edges: Array<[keyof typeof vertices, keyof typeof vertices]> = [
  ["A", "B"],
  ["B", "C"],
  ["C", "A"],
];

const sideFaces = edges.map(([p1, p2]) => {
  const v1 = vertices[p1];
  const v2 = vertices[p2];
  const mx = (v1.x + v2.x) / 2;
  const my = (v1.y + v2.y) / 2;
  const angle = (Math.atan2(v2.y - v1.y, v2.x - v1.x) * 180) / Math.PI;
  return {
    key: `${p1}${p2}`,
    style: {
      width: SIDE,
      height: DEPTH,
      left: -SIDE / 2,
      top: -DEPTH / 2,
      transform: `translate3d(${mx}px, ${my}px, 0) rotateZ(${angle}deg) rotateX(90deg)`,
    },
  };
});

const capStyle = (z: number) => ({
  width: SIDE,
  height: HEIGHT,
  left: -SIDE / 2,
  top: -R,
  transform: `translate3d(0px, 0px, ${z}px)`,
  clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)",
});

/** Indigo/violet glass, mixed per face so the faceted object reads as solid
 *  rather than flat — a brighter face catching the light, cooler faces
 *  falling away from it. Tints are the ramp's own `--spec-3`/`--spec-4`
 *  stops, never an invented colour. One shade lighter than the first pass:
 *  lower alpha throughout, so it reads as tinted glass rather than paint. */
const capFill = [
  "linear-gradient(135deg, rgb(93 145 239 / 0.4), rgb(94 94 240 / 0.24))",
  "linear-gradient(135deg, rgb(94 94 240 / 0.5), rgb(148 123 225 / 0.32))",
];
const sideFill = [
  "linear-gradient(180deg, rgb(94 94 240 / 0.32), rgb(93 145 239 / 0.16))",
  "linear-gradient(180deg, rgb(148 123 225 / 0.46), rgb(94 94 240 / 0.26))",
  "linear-gradient(180deg, rgb(94 94 240 / 0.32), rgb(93 145 239 / 0.16))",
];
const faceBorder = "1px solid rgb(94 94 240 / 0.3)";

/** The five stops, fanning out from the exit edge, widest ray last. Lengths
 *  scale with SIDE so a future resize keeps the same proportions. */
const rays = [
  { color: "var(--spec-1)", rotate: -14, length: SIDE * 0.44, delay: "0ms" },
  { color: "var(--spec-2)", rotate: -6, length: SIDE * 0.53, delay: "120ms" },
  { color: "var(--spec-3)", rotate: 2, length: SIDE * 0.6, delay: "240ms" },
  { color: "var(--spec-4)", rotate: 10, length: SIDE * 0.53, delay: "360ms" },
  { color: "var(--spec-5)", rotate: 18, length: SIDE * 0.44, delay: "480ms" },
];

const TILT_RANGE = 18;
/** Total degrees of extra rotateY swung as the hero scrolls from fully in
 *  view to fully past — additive on top of the resting tilt (`prism-strike`'s
 *  end state in globals.css) and the pointer delta below. 150deg is a
 *  deliberately large, unmistakable spin (~40% of a full turn): this is the
 *  hero's signature scroll interaction, not a subtle parallax hint. */
const SCROLL_RANGE = 150;

const clamp = (v: number, min: number, max: number) => Math.min(max, Math.max(min, v));

export function HeroPrism() {
  const reduce = useReducedMotion();
  const sceneRef = useRef<HTMLDivElement>(null);
  const tiltRef = useRef<HTMLDivElement>(null);
  const driftRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scene = sceneRef.current;
    const drift = driftRef.current;
    const section = scene?.closest("section");
    if (!scene || !drift || !section || reduce) return;

    let inView = true;
    // Both deltas are additive on top of the CSS resting tilt, never a
    // replacement for it — so a stationary pointer with a mid-page scroll
    // position still leaves the object correctly tilted, and each source
    // can be reset to (0, 0) independently without erasing the other.
    let scrollDelta = { x: 0, y: 0 };
    let pointerDelta = { x: 0, y: 0 };

    const render = () => {
      const el = tiltRef.current;
      if (!el) return;
      el.style.transform = `rotateY(${scrollDelta.y + pointerDelta.y}deg) rotateX(${
        scrollDelta.x + pointerDelta.x
      }deg)`;
    };

    // Freeze the idle drift, and stop tracking scroll/pointer altogether,
    // the instant the hero leaves the viewport — nothing here keeps
    // computing or animating once you've scrolled past it.
    const io = new IntersectionObserver(
      ([entry]) => {
        inView = entry.isIntersecting;
        drift.style.animationPlayState = inView ? "running" : "paused";
      },
      { threshold: 0 },
    );
    io.observe(section);

    // Scroll-linked rotation: how far the hero has scrolled past, 0 (top of
    // page, untouched) to 1 (fully scrolled away), mapped onto an extra
    // spin. Works everywhere scroll does, independent of pointer capability.
    //
    // Deliberately NOT `(viewportMid - sectionMid) / viewportHeight` or any
    // formula symmetric around the section entering/exiting both edges of
    // the viewport: this hero is the first thing on the page, so
    // `rect.top` can never be positive — there is no "scrolling up past
    // it" to balance against. A symmetric formula silently only ever uses
    // its own upper half, which is why the first version of this rotation
    // read as barely-there. `-rect.top / rect.height` uses the section's
    // own full scrollable travel instead, so the whole SCROLL_RANGE is
    // actually reachable.
    let scrollFrame = 0;
    const onScroll = () => {
      cancelAnimationFrame(scrollFrame);
      scrollFrame = requestAnimationFrame(() => {
        if (!inView) return;
        const rect = section.getBoundingClientRect();
        const progress = clamp(-rect.top / rect.height, 0, 1);
        scrollDelta = { x: 0, y: progress * SCROLL_RANGE };
        render();
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    const hasFinePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    let pointerFrame = 0;
    let onMove: ((e: PointerEvent) => void) | undefined;

    if (hasFinePointer) {
      onMove = (e: PointerEvent) => {
        cancelAnimationFrame(pointerFrame);
        pointerFrame = requestAnimationFrame(() => {
          const rect = section.getBoundingClientRect();
          const inside =
            inView &&
            e.clientX >= rect.left &&
            e.clientX <= rect.right &&
            e.clientY >= rect.top &&
            e.clientY <= rect.bottom;

          if (!inside) {
            pointerDelta = { x: 0, y: 0 };
            render();
            return;
          }

          const nx = ((e.clientX - rect.left) / rect.width) * 2 - 1;
          const ny = ((e.clientY - rect.top) / rect.height) * 2 - 1;
          pointerDelta = { x: -ny * TILT_RANGE, y: nx * TILT_RANGE };
          render();
        });
      };
      window.addEventListener("pointermove", onMove);
    }

    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(scrollFrame);
      if (onMove) {
        window.removeEventListener("pointermove", onMove);
        cancelAnimationFrame(pointerFrame);
      }
      io.disconnect();
    };
  }, [reduce]);

  return (
    <div
      ref={sceneRef}
      aria-hidden="true"
      className={[
        "pointer-events-none absolute right-[1%] hidden",
        "[--prism-scale:0.68] sm:block sm:right-[3%] sm:[--prism-scale:0.8]",
        "lg:right-[6%] lg:[--prism-scale:0.95]",
        "xl:right-[8%] xl:[--prism-scale:1.1]",
      ].join(" ")}
      style={{
        width: SIDE,
        height: HEIGHT,
        top: "42%",
        transform: "translateY(-50%) scale(var(--prism-scale))",
        transformOrigin: "center right",
      }}
    >
      {/* Incoming beam: one hairline, breathing, meeting the left edge. */}
      <span
        className="ray-pulse bg-ink-ghost absolute h-px"
        style={{
          width: SIDE * 0.33,
          left: -(SIDE * 0.33),
          top: R - 10,
          transformOrigin: "right center",
        }}
      />

      <div className="prism-strike" style={{ transformStyle: "preserve-3d" }}>
        <div ref={driftRef} className="prism-drift" style={{ transformStyle: "preserve-3d" }}>
          <div
            ref={tiltRef}
            className="transition-transform duration-500 ease-out"
            style={{
              transformStyle: "preserve-3d",
              perspective: 1600,
              filter: "drop-shadow(0 30px 46px rgb(94 94 240 / 0.22))",
            }}
          >
            <div
              className="relative"
              style={{ transformStyle: "preserve-3d", left: "50%", top: R }}
            >
              {[capStyle(DEPTH / 2), capStyle(-DEPTH / 2)].map((style, i) => (
                <div
                  key={i}
                  className="absolute"
                  style={{ ...style, background: capFill[i], border: faceBorder }}
                />
              ))}
              {sideFaces.map((face, i) => (
                <div
                  key={face.key}
                  className="absolute"
                  style={{ ...face.style, background: sideFill[i], border: faceBorder }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Exit rays: the beam, separated into the site's own five stops. */}
      <div className="absolute" style={{ left: SIDE * 0.86, top: R - 10 }}>
        {rays.map((ray) => (
          <span
            key={ray.color}
            className="ray-pulse absolute h-px origin-left"
            style={{
              width: ray.length,
              backgroundColor: ray.color,
              transform: `rotate(${ray.rotate}deg)`,
              animationDelay: ray.delay,
            }}
          />
        ))}
      </div>
    </div>
  );
}
