"use client";

import { useCallback, useRef, useState } from "react";
import type { ZodType } from "zod";
import { submitLead, type LeadKind, type LeadResult } from "./leads";

export type FormStatus = "idle" | "submitting" | "success" | "error";

const MIN_HUMAN_SUBMIT_MS = 1500;

/**
 * Shared submit lifecycle for both lead forms: honeypot check, minimum
 * time-to-submit, Zod validation with per-field errors, then the Firestore
 * write via `submitLead`.
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

      setErrors({});
      setStatus("submitting");

      const result = await submitLead(kind, parsed.data);

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
    [schema, kind],
  );

  const reset = useCallback(() => {
    mountedAt.current = Date.now();
    setStatus("idle");
    setErrors({});
    setFormError(null);
  }, []);

  return { status, errors, formError, submit, reset };
}
