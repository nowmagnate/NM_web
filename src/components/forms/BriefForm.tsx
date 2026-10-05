"use client";

import { useState, useEffect, type FormEvent } from "react";
import { CheckCircle } from "@phosphor-icons/react";
import { Field, Input, Select, Honeypot } from "@/components/ui/Field";
import { Button } from "@/components/ui/Button";
import { useLeadForm } from "@/lib/useLeadForm";
import {
  briefSchema,
  domainStatuses,
  assetReadiness,
  type BriefFormData,
} from "@/lib/schemas";
import { getTemplate } from "@/data/templates";
import { brand } from "@/config/brand";

const emptyForm: Record<keyof BriefFormData, string> = {
  businessName: "",
  practiceType: "",
  templateSlug: "",
  currentSite: "",
  domainStatus: "",
  assetsReady: "",
  targetLaunch: "",
  name: "",
  email: "",
  phone: "",
};

/**
 * The $499 template intake. Reads `?template=<slug>` so someone arriving from
 * a template detail page does not have to re-select what they already chose.
 * An unrecognized or missing slug just means the field starts blank — never
 * a broken page.
 *
 * DELIBERATELY NOT `useSearchParams()`. That hook forces Next's static
 * export to defer this entire form to a client-only render — confirmed
 * against this project's own build output, which had the whole form
 * (business name, email, every field) missing from the static HTML while
 * this used it. The prefill is read from `window.location.search` in an
 * effect after mount instead: the form is always in the initial HTML, and
 * only the ?template= prefill itself (not the whole form) depends on JS.
 */
export function BriefForm() {
  const [prefillSlug, setPrefillSlug] = useState("");
  const prefillTemplate = prefillSlug ? getTemplate(prefillSlug) : undefined;

  const { status, errors, formError, submit, reset } = useLeadForm(briefSchema, "brief");
  const [values, setValues] = useState(emptyForm);

  useEffect(() => {
    const slug = new URLSearchParams(window.location.search).get("template");
    if (!slug) return;
    setPrefillSlug(slug);
    setValues((prev) => ({ ...prev, templateSlug: slug }));
  }, []);

  function update<K extends keyof BriefFormData>(key: K, value: string) {
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
        <h2 className="font-display text-2xl">Brief received.</h2>
        <p className="text-ink-muted max-w-[46ch] leading-relaxed">
          We will confirm what we still need from you and give you a firm start date
          within one business day.
        </p>
        <Button
          onClick={() => {
            setValues({ ...emptyForm, templateSlug: prefillSlug });
            reset();
          }}
        >
          Start another brief
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-6">
      <Honeypot />
      <input type="hidden" name="templateSlug" value={values.templateSlug} />

      {prefillTemplate ? (
        <div className="bg-accent-wash flex items-center justify-between px-4 py-3 text-sm">
          <span>
            Template: <strong className="font-medium">{prefillTemplate.name}</strong>{" "}
            <span className="text-ink-muted">({prefillTemplate.practiceType})</span>
          </span>
          <button
            type="button"
            onClick={() => update("templateSlug", "")}
            className="text-ink-muted hover:text-ink underline decoration-dotted"
          >
            Change
          </button>
        </div>
      ) : (
        <Field
          id="brief-template-slug"
          label="Which template"
          helper="Paste the template name if you've picked one, or leave blank and we'll help you choose."
        >
          <Input
            id="brief-template-slug"
            value={values.templateSlug}
            onChange={(e) => update("templateSlug", e.target.value)}
            placeholder="e.g. Enamel, or leave blank"
          />
        </Field>
      )}

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <Field
          id="brief-business-name"
          label="Business name"
          required
          error={errors.businessName}
        >
          <Input
            id="brief-business-name"
            name="businessName"
            value={values.businessName}
            onChange={(e) => update("businessName", e.target.value)}
            invalid={!!errors.businessName}
          />
        </Field>

        <Field
          id="brief-practice-type"
          label="What kind of business"
          required
          error={errors.practiceType}
          helper="e.g. Family dentist, real estate agent"
        >
          <Input
            id="brief-practice-type"
            name="practiceType"
            value={values.practiceType}
            onChange={(e) => update("practiceType", e.target.value)}
            invalid={!!errors.practiceType}
          />
        </Field>

        <Field
          id="brief-current-site"
          label="Current website"
          helper="URL if you have one, optional."
        >
          <Input
            id="brief-current-site"
            name="currentSite"
            type="url"
            placeholder="https://"
            value={values.currentSite}
            onChange={(e) => update("currentSite", e.target.value)}
          />
        </Field>

        <Field id="brief-target-launch" label="Target launch" helper="Roughly, optional.">
          <Input
            id="brief-target-launch"
            name="targetLaunch"
            placeholder="e.g. Within a month"
            value={values.targetLaunch}
            onChange={(e) => update("targetLaunch", e.target.value)}
          />
        </Field>

        <Field
          id="brief-domain-status"
          label="Domain"
          required
          error={errors.domainStatus}
        >
          <Select
            id="brief-domain-status"
            name="domainStatus"
            value={values.domainStatus}
            onChange={(e) => update("domainStatus", e.target.value)}
            invalid={!!errors.domainStatus}
          >
            <option value="" disabled>
              Select one
            </option>
            {domainStatuses.map((d) => (
              <option key={d.value} value={d.value}>
                {d.label}
              </option>
            ))}
          </Select>
        </Field>

        <Field
          id="brief-assets-ready"
          label="Logo and photos"
          required
          error={errors.assetsReady}
        >
          <Select
            id="brief-assets-ready"
            name="assetsReady"
            value={values.assetsReady}
            onChange={(e) => update("assetsReady", e.target.value)}
            invalid={!!errors.assetsReady}
          >
            <option value="" disabled>
              Select one
            </option>
            {assetReadiness.map((a) => (
              <option key={a.value} value={a.value}>
                {a.label}
              </option>
            ))}
          </Select>
        </Field>
      </div>

      <div className="border-rule grid grid-cols-1 gap-6 border-t pt-6 sm:grid-cols-3">
        <Field id="brief-name" label="Your name" required error={errors.name}>
          <Input
            id="brief-name"
            name="name"
            autoComplete="name"
            value={values.name}
            onChange={(e) => update("name", e.target.value)}
            invalid={!!errors.name}
          />
        </Field>

        <Field id="brief-email" label="Email" required error={errors.email}>
          <Input
            id="brief-email"
            name="email"
            type="email"
            autoComplete="email"
            value={values.email}
            onChange={(e) => update("email", e.target.value)}
            invalid={!!errors.email}
          />
        </Field>

        <Field id="brief-phone" label="Phone" helper="Optional.">
          <Input
            id="brief-phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            value={values.phone}
            onChange={(e) => update("phone", e.target.value)}
          />
        </Field>
      </div>

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

      <div>
        <Button type="submit" size="lg" loading={status === "submitting"}>
          Send brief
        </Button>
      </div>
    </form>
  );
}
