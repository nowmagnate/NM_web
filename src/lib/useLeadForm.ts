"use client";

import { useCallback, useRef, useState } from "react";
import type { ZodType } from "zod";
import { submitLead, type LeadKind, type LeadResult } from "./leads";
import { formRelayConfigured, hcaptchaSiteKey } from "@/config/firebase";

export type FormStatus = "idle" | "submitting" | "success" | "error";

const MIN_HUMAN_SUBMIT_MS = 1500;

/**
 * Shared submit lifecycle for both lead forms: honeypot check, minimum
 * time-to-submit, Zod validation with per-field errors, then the Firestore
 * write via `submitLead`.
 *
 * hCaptcha: when the email relay is configured the form also needs a solved
 * captcha, which is sent to Web3Forms for verification. The token is single
 * use, so it is cleared and the widget reset after every attempt.
 *
 * A bot that fills the honeypot or submits faster than a human can read the
 * form is shown the SAME success state as a real submission, silently. Real
 * anti-spam rejects invisibly; telling a bot "invalid honeypot" only teaches
 * it to stop filling that field.
 */
export function useLeadForm<T extends Record<string, unknown>>(
  schema: ZodType<T>,
  kind: LeadKind,
) {
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errors, setErrors] = useState<Partial<Record<keyof T, string>>>({});
  const [formError, setFormError] = useState<string | null>(null);

  const captchaRequired = formRelayConfigured;
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const [captchaNonce, setCaptchaNonce] = useState(0);
  const [captchaError, setCaptchaError] = useState<string | null>(null);
  const tokenRef = useRef<string | null>(null);
  const onCaptchaToken = useCallback((token: string | null) => {
    tokenRef.current = token;
    setCaptchaToken(token);
    if (token) setCaptchaError(null);
  }, []);

  // Set once per mount; a fresh mount (e.g. navigating back to the page)
  // legitimately resets the clock.
  const mountedAt = useRef(Date.now());

  const submit = useCallback(
    async (raw: Record<string, unknown>): Promise<LeadResult | null> => {
      setFormError(null);

      const honeypotFilled =
        typeof raw.company_website === "string" && raw.company_website.length > 0;
      const tooFast = Date.now() - mountedAt.current < MIN_HUMAN_SUBMIT_MS;

      if (honeypotFilled || tooFast) {
        setStatus("success");
        return { ok: true };
      }

      const parsed = schema.safeParse(raw);
      if (!parsed.success) {
        const fieldErrors: Partial<Record<keyof T, string>> = {};
        for (const issue of parsed.error.issues) {
          const key = issue.path[0] as keyof T;
          if (!fieldErrors[key]) fieldErrors[key] = issue.message;
        }
        setErrors(fieldErrors);
        return null;
      }

      if (captchaRequired && !tokenRef.current) {
        setErrors({});
        setCaptchaError("Please tick the box to confirm you are not a robot.");
        return null;
      }

      setErrors({});
      setStatus("submitting");

      const token = tokenRef.current ?? undefined;
      const result = await submitLead(kind, parsed.data, token);

      // The token is single use whatever the outcome.
      tokenRef.current = null;
      setCaptchaToken(null);
      setCaptchaNonce((n) => n + 1);

      if (result.ok) {
        setStatus("success");
      } else {
        setStatus("error");
        setFormError(
          result.reason === "not-configured"
            ? "This form isn't fully wired up yet. Email us directly and we'll get back to you."
            : "That didn't go through. Please try again, or email us directly.",
        );
      }

      return result;
    },
    [schema, kind, captchaRequired],
  );

  const reset = useCallback(() => {
    mountedAt.current = Date.now();
    setStatus("idle");
    setErrors({});
    setFormError(null);
    setCaptchaError(null);
    tokenRef.current = null;
    setCaptchaToken(null);
  }, []);

  return {
    status,
    errors,
    formError,
    submit,
    reset,
    captcha: {
      required: captchaRequired,
      siteKey: hcaptchaSiteKey,
      token: captchaToken,
      nonce: captchaNonce,
      error: captchaError,
      onToken: onCaptchaToken,
    },
  };
}
