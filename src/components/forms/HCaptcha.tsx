"use client";

import { useEffect, useRef, useState } from "react";
import { brand } from "@/config/brand";

/**
 * hCaptcha checkbox for the lead forms.
 *
 * Web3Forms verifies the token server-side when hCaptcha is switched on for the
 * form in its dashboard; this only renders the widget and hands the token up.
 * It is rendered explicitly (rather than via Web3Forms' helper script) because
 * the forms are React and submit JSON, so the token has to travel in state and
 * be added to the request body as `h-captcha-response`.
 *
 * Tokens are single use. The parent bumps `nonce` after every submit attempt
 * and the widget resets, so a second attempt needs a fresh tick.
 */

type HCaptchaApi = {
  render: (el: HTMLElement, opts: Record<string, unknown>) => string;
  reset: (id?: string) => void;
  remove: (id: string) => void;
};

declare global {
  interface Window {
    hcaptcha?: HCaptchaApi;
  }
}

const SRC = "https://js.hcaptcha.com/1/api.js?render=explicit";
let loader: Promise<void> | null = null;

function loadHCaptcha(): Promise<void> {
  if (window.hcaptcha) return Promise.resolve();
  if (!loader) {
    loader = new Promise<void>((resolve, reject) => {
      const script = document.createElement("script");
      script.src = SRC;
      script.async = true;
      script.defer = true;
      script.onload = () => resolve();
      script.onerror = () => {
        loader = null;
        reject(new Error("hCaptcha failed to load"));
      };
      document.head.appendChild(script);
    });
  }
  return loader;
}

export function HCaptcha({
  siteKey,
  onToken,
  nonce,
  error,
}: {
  siteKey: string;
  /** Called with a token when solved, and `null` when it expires or errors. Must be stable. */
  onToken: (token: string | null) => void;
  nonce: number;
  error?: string | null;
}) {
  const host = useRef<HTMLDivElement>(null);
  const widgetId = useRef<string | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let cancelled = false;

    loadHCaptcha()
      .then(() => {
        if (cancelled || !host.current || !window.hcaptcha) return;
        widgetId.current = window.hcaptcha.render(host.current, {
          sitekey: siteKey,
          theme: "light",
          callback: (token: string) => onToken(token),
          "expired-callback": () => onToken(null),
          "error-callback": () => onToken(null),
        });
      })
      .catch(() => {
        if (!cancelled) setFailed(true);
      });

    return () => {
      cancelled = true;
      if (widgetId.current && window.hcaptcha) {
        window.hcaptcha.remove(widgetId.current);
        widgetId.current = null;
      }
    };
  }, [siteKey, onToken]);

  useEffect(() => {
    if (widgetId.current && window.hcaptcha) window.hcaptcha.reset(widgetId.current);
  }, [nonce]);

  return (
    <div>
      <div ref={host} />
      {failed ? (
        <p role="alert" className="text-danger mt-2 text-sm">
          The spam check could not load. Turn off any content blocker for this page and
          reload, or write to us at{" "}
          <a href={`mailto:${brand.email.enquiry}`} className="font-medium underline">
            {brand.email.enquiry}
          </a>
          .
        </p>
      ) : null}
      {error ? (
        <p role="alert" className="text-danger mt-2 text-sm">
          {error}
        </p>
      ) : null}
    </div>
  );
}
