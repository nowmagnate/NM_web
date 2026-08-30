"use client";

import { useId, useRef, useState } from "react";
import { cn } from "@/lib/cn";
import { TplSubmit } from "./TplButton";
import type { Field } from "../schema";

/**
 * The template form.
 *
 * WHERE IT SENDS. A template instance sets `settings.formEndpoint` and the
 * form POSTs JSON there. With no endpoint set, the form runs in demo mode: it
 * validates properly, it confirms properly, and it says on the page that
 * nothing was sent. A demo form that pretends to submit is a small lie that
 * gets discovered at exactly the wrong moment, which is why the honest state
 * is the default rather than an option.
 *
 * SPAM. A honeypot field and a minimum time-to-submit, both borrowed from the
 * studio's own forms. A submission that trips either is shown the SAME success
 * state as a real one. Telling a bot which check it failed only teaches it to
 * pass next time.
 *
 * VALIDATION. Native `required` and `type` do the first pass so the browser's
 * own affordances work, and this does the second so the message sits next to
 * the field, is announced, and does not disappear when the field is blurred.
 */

const MIN_HUMAN_SUBMIT_MS = 1500;

type Status = "idle" | "submitting" | "sent" | "demo" | "error";

function validate(field: Field, value: string): string | null {
  const trimmed = value.trim();

  if (field.required && !trimmed) return `${field.label} is required`;
  if (!trimmed) return null;

  if (field.type === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(trimmed)) {
    return "That does not look like an email address";
  }
  if (field.type === "tel" && trimmed.replace(/\D/g, "").length < 7) {
    return "That does not look like a phone number";
  }
  return null;
}

export function TplForm({
  fields,
  submitLabel,
  note,
  endpoint,
  className,
}: {
  fields: Field[];
  submitLabel: string;
  note?: string;
  endpoint?: string;
  className?: string;
}) {
  const formId = useId();
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const mountedAt = useRef(Date.now());

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    const values = Object.fromEntries(
      fields.map((f) => [f.name, String(data.get(f.name) ?? "")]),
    );

    const filledHoneypot = String(data.get("company_website") ?? "").length > 0;
    const tooFast = Date.now() - mountedAt.current < MIN_HUMAN_SUBMIT_MS;
    if (filledHoneypot || tooFast) {
      setStatus(endpoint ? "sent" : "demo");
      return;
    }

    const found: Record<string, string> = {};
    for (const field of fields) {
      const message = validate(field, values[field.name]);
      if (message) found[field.name] = message;
    }
    if (Object.keys(found).length) {
      setErrors(found);
      return;
    }

    setErrors({});

    if (!endpoint) {
      setStatus("demo");
      return;
    }

    setStatus("submitting");
    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      setStatus(response.ok ? "sent" : "error");
    } catch {
      setStatus("error");
    }
  }

  if (status === "sent" || status === "demo") {
    return (
      <div
        role="status"
        className={cn(
          "border-tpl-rule-strong rounded-tpl flex flex-col gap-3 border p-8",
          className,
        )}
      >
        <p className="text-tpl-ink font-tpl-display text-[1.5rem]">Thank you.</p>
        <p className="text-tpl-muted text-[15px] leading-[1.6]">
          {status === "demo"
            ? "This form is part of a demo, so nothing was sent and no details were stored. On a live site it would reach the practice inbox."
            : "Your request is in. We will be in touch to confirm a time."}
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      className={cn("flex flex-col gap-5", className)}
    >
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        {fields.map((field) => {
          const id = `${formId}-${field.name}`;
          const error = errors[field.name];
          const describedBy = error ? `${id}-error` : undefined;

          const shared = {
            id,
            name: field.name,
            required: field.required,
            placeholder: field.placeholder,
            "aria-invalid": error ? true : undefined,
            "aria-describedby": describedBy,
            className: cn(
              "w-full rounded-tpl border bg-tpl-bg px-4 py-3 text-[16px] text-tpl-ink",
              "placeholder:text-tpl-muted",
              "transition-colors duration-200 ease-tpl",
              "focus:border-tpl-accent-deep focus:outline-none",
              error ? "border-tpl-accent-deep" : "border-tpl-rule-strong",
            ),
          };

          return (
            <div
              key={field.name}
              className={cn(
                "flex flex-col gap-2",
                !field.half && "sm:col-span-2",
              )}
            >
              <label
                htmlFor={id}
                className="text-tpl-ink text-[13px] font-semibold tracking-[0.02em]"
              >
                {field.label}
                {field.required ? null : (
                  <span className="text-tpl-muted font-normal"> (optional)</span>
                )}
              </label>

              {field.type === "textarea" ? (
                <textarea {...shared} rows={4} />
              ) : field.type === "select" ? (
                <select {...shared} defaultValue="">
                  <option value="" disabled>
                    {field.placeholder ?? "Please choose"}
                  </option>
                  {(field.options ?? []).map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              ) : (
                <input {...shared} type={field.type} />
              )}

              {error ? (
                <p id={describedBy} className="text-tpl-accent-deep text-[13px]">
                  {error}
                </p>
              ) : null}
            </div>
          );
        })}
      </div>

      {/* Never shown, never focusable, never announced. */}
      <div aria-hidden="true" className="absolute h-px w-px overflow-hidden opacity-0">
        <label htmlFor={`${formId}-company_website`}>Company website</label>
        <input
          id={`${formId}-company_website`}
          name="company_website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      {status === "error" ? (
        <p role="alert" className="text-tpl-accent-deep text-[14px]">
          That did not go through. Please try again, or call us instead.
        </p>
      ) : null}

      <div className="flex flex-col gap-3">
        <TplSubmit loading={status === "submitting"} block>
          {submitLabel}
        </TplSubmit>
        {note ? (
          <p className="text-tpl-muted text-[13px] leading-[1.55]">{note}</p>
        ) : null}
      </div>
    </form>
  );
}
