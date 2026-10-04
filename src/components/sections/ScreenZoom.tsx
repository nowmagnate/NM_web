"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";

/**
 * Enlarges a project screenshot, with no library.
 *
 * Mouse and keyboard: click (or Enter) opens it, click, backdrop or Escape
 * closes it.
 * Touch: press and hold for a moment to see it large, release to close. A
 * swipe (the mobile screens row scrolls sideways) cancels the hold, so
 * scrolling never opens it by accident.
 *
 * The overlay is portalled to <body> because the timeline entries animate in
 * with a transform, and a `fixed` element inside a transformed ancestor is
 * positioned against that ancestor rather than the viewport.
 */

const HOLD_MS = 320;

export function ScreenZoom({
  src,
  alt,
  width,
  height,
  className,
}: {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
}) {
  const [mode, setMode] = useState<"closed" | "open" | "held">("closed");
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const suppressClick = useRef(false);

  const clear = () => {
    if (timer.current) clearTimeout(timer.current);
    timer.current = null;
  };

  useEffect(() => {
    if (mode !== "open") return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMode("closed");
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [mode]);

  useEffect(() => clear, []);

  return (
    <>
      <button
        type="button"
        aria-label={`Enlarge screen: ${alt}`}
        className="block h-full w-full cursor-zoom-in select-none [-webkit-touch-callout:none]"
        onClick={() => {
          if (suppressClick.current) {
            suppressClick.current = false;
            return;
          }
          setMode("open");
        }}
        onContextMenu={(e) => e.preventDefault()}
        onPointerDown={(e) => {
          if (e.pointerType !== "touch") return;
          clear();
          timer.current = setTimeout(() => {
            suppressClick.current = true;
            setMode("held");
          }, HOLD_MS);
        }}
        onPointerUp={() => {
          clear();
          setMode((m) => (m === "held" ? "closed" : m));
        }}
        onPointerCancel={() => {
          clear();
          setMode((m) => (m === "held" ? "closed" : m));
        }}
        onPointerLeave={clear}
      >
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          unoptimized
          loading="lazy"
          draggable={false}
          className={className}
        />
      </button>

      {mode !== "closed" &&
        createPortal(
          <div
            role={mode === "open" ? "dialog" : undefined}
            aria-modal={mode === "open" ? true : undefined}
            aria-label={alt}
            className={
              "fixed inset-0 z-[200] flex items-center justify-center bg-black/75 p-4 " +
              (mode === "open" ? "cursor-zoom-out" : "pointer-events-none")
            }
            onClick={() => setMode("closed")}
          >
            <Image
              src={src}
              alt=""
              width={width}
              height={height}
              unoptimized
              draggable={false}
              className="h-auto max-h-[88dvh] w-auto max-w-[92vw] shadow-[var(--lift-lg)]"
            />
          </div>,
          document.body,
        )}
    </>
  );
}
