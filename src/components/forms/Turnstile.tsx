"use client";

import { useEffect, useRef } from "react";

/**
 * Cloudflare Turnstile widget (free, no puzzle for most visitors). Renders
 * explicitly and hands the token up; reset by changing `nonce`. The payments
 * Worker verifies the token when it has a TURNSTILE_SECRET.
 */

type TurnstileApi = {
  render: (el: HTMLElement, opts: Record<string, unknown>) => string;
  reset: (id?: string) => void;
  remove: (id: string) => void;
};

declare global {
  interface Window {
    turnstile?: TurnstileApi;
  }
}

const SRC = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
let loader: Promise<void> | null = null;

function load(): Promise<void> {
  if (window.turnstile) return Promise.resolve();
  if (!loader) {
    loader = new Promise<void>((resolve, reject) => {
      const s = document.createElement("script");
      s.src = SRC;
      s.async = true;
      s.defer = true;
      s.onload = () => resolve();
      s.onerror = () => {
        loader = null;
        reject(new Error("Turnstile failed to load"));
      };
      document.head.appendChild(s);
    });
  }
  return loader;
}

export function Turnstile({
  siteKey,
  onToken,
  nonce,
}: {
  siteKey: string;
  /** Called with a token when solved and `null` when it expires or errors. Must be stable. */
  onToken: (token: string | null) => void;
  nonce: number;
}) {
  const host = useRef<HTMLDivElement>(null);
  const widget = useRef<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    load()
      .then(() => {
        if (cancelled || !host.current || !window.turnstile) return;
        widget.current = window.turnstile.render(host.current, {
          sitekey: siteKey,
          theme: "light",
          callback: (t: string) => onToken(t),
          "expired-callback": () => onToken(null),
          "error-callback": () => onToken(null),
        });
      })
      .catch(() => onToken(null));
    return () => {
      cancelled = true;
      if (widget.current && window.turnstile) {
        window.turnstile.remove(widget.current);
        widget.current = null;
      }
    };
  }, [siteKey, onToken]);

  useEffect(() => {
    if (widget.current && window.turnstile) window.turnstile.reset(widget.current);
  }, [nonce]);

  return <div ref={host} />;
}
