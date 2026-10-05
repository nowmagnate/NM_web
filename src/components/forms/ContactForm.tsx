"use client";

import { useState, type FormEvent } from "react";
import { CheckCircle } from "@phosphor-icons/react";
import { Field, Input, Textarea, Select, Honeypot } from "@/components/ui/Field";
import { Button } from "@/components/ui/Button";
import { HCaptcha } from "./HCaptcha";
import { useLeadForm } from "@/lib/useLeadForm";
import {
  contactSchema,
  budgetBands,
  projectTypes,
  type ContactFormData,
} from "@/lib/schemas";
import { brand } from "@/config/brand";

const emptyForm: Record<keyof ContactFormData, string> = {
  name: "",
  email: "",
  company: "",
  projectType: "",
  budget: "",
  message: "",
};

/**
 * General enquiry form. Full state cycle: idle, submitting (inline button
 * spinner, not a page loader), success (replaces the form rather than a
 * toast, since this is the page's whole purpose), and a network/config error
 * that keeps the user's input intact so nothing is lost on retry.
 */
export function ContactForm() {
  const { status, errors, formError, submit, reset, captcha } = useLeadForm(
    contactSchema,
    "contact",
  );
  const [values, setValues] = useState(emptyForm);

  function update<K extends keyof ContactFormData>(key: K, value: string) {
    setValues((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    await submit(Object.fromEntries(formData.entries()));
  }

  if (status === "success") {
    return (
      <div className="border-rule bg-bg flex flex-col items-start gap-4 border p-8 md:p-10">
        <CheckCircle weight="fill" className="text-spec-3 h-8 w-8" />
        <h2 className="font-display text-2xl">Message sent.</h2>
        <p className="text-ink-muted max-w-[46ch] leading-relaxed">
          We read every enquiry ourselves. Expect a reply within one business day,
          sooner if you are in a European or US morning overlap window.
        </p>
        <Button
          onClick={() => {
            setValues(emptyForm);
            reset();
          }}
        >
          Send another message
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-6">
      <Honeypot />

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <Field id="contact-name" label="Full name" required error={errors.name}>
          <Input
            id="contact-name"
            name="name"
            autoComplete="name"
            value={values.name}
            onChange={(e) => update("name", e.target.value)}
            invalid={!!errors.name}
          />
        </Field>

        <Field id="contact-email" label="Work email" required error={errors.email}>
          <Input
            id="contact-email"
            name="email"
            type="email"
            autoComplete="email"
            value={values.email}
            onChange={(e) => update("email", e.target.value)}
            invalid={!!errors.email}
          />
        </Field>

        <Field id="contact-company" label="Company" helper="Optional.">
          <Input
            id="contact-company"
            name="company"
            autoComplete="organization"
            value={values.company}
            onChange={(e) => update("company", e.target.value)}
          />
        </Field>

        <Field
          id="contact-project-type"
          label="What are you building"
          required
          error={errors.projectType}
        >
          <Select
            id="contact-project-type"
            name="projectType"
            value={values.projectType}
            onChange={(e) => update("projectType", e.target.value)}
            invalid={!!errors.projectType}
          >
            <option value="" disabled>
              Select one
            </option>
            {projectTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </Select>
        </Field>

        <Field
          id="contact-budget"
          label="Budget range"
          required
          error={errors.budget}
          className="sm:col-span-2"
        >
          <Select
            id="contact-budget"
            name="budget"
            value={values.budget}
            onChange={(e) => update("budget", e.target.value)}
            invalid={!!errors.budget}
          >
            <option value="" disabled>
              Select a range
            </option>
            {budgetBands.map((band) => (
              <option key={band} value={band}>
                {band}
              </option>
            ))}
          </Select>
        </Field>
      </div>

      <Field
        id="contact-message"
        label="Tell us about the project"
        required
        error={errors.message}
        helper="What it does, roughly when you want it live, anything that helps us scope it."
      >
        <Textarea
          id="contact-message"
          name="message"
          rows={6}
          value={values.message}
          onChange={(e) => update("message", e.target.value)}
          invalid={!!errors.message}
        />
      </Field>

      {formError ? (
        <div
          role="alert"
          className="bg-danger-wash text-danger border-danger/30 border px-4 py-3 text-sm"
        >
          {formError} You can reach us directly at{" "}
          <a href={`mailto:${brand.email.enquiry}`} className="font-medium underline">
            {brand.email.enquiry}
          </a>
          .
        </div>
      ) : null}

      {captcha.required ? (
        <HCaptcha
          siteKey={captcha.siteKey}
          onToken={captcha.onToken}
          nonce={captcha.nonce}
          error={captcha.error}
        />
      ) : null}

      <div>
        <Button type="submit" size="lg" loading={status === "submitting"}>
          Send message
        </Button>
      </div>
    </form>
  );
}
