import type { Metadata } from "next";
import { Button } from "@/components/ui/Button";
import { Plate } from "@/components/ui/Plate";
import { Section } from "@/components/ui/Section";
import { Hallmark } from "@/components/ui/Hallmark";
import { Accordion } from "@/components/ui/Accordion";
import { Field, Input, Textarea, Select } from "@/components/ui/Field";
import { Reveal } from "@/components/ui/Reveal";
import { Logo } from "@/components/brand/Logo";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

/**
 * Development-only reference for every primitive in the Spectrum system.
 * Kept out of the sitemap and marked noindex.
 *
 * If a component looks wrong here it looks wrong everywhere. Check at 375,
 * 768 and 1440.
 */
export const metadata: Metadata = {
  title: "Kitchen sink",
  robots: { index: false, follow: false },
};

const swatches = [
  { name: "bg", className: "border-rule border bg-bg" },
  { name: "bg-soft", className: "bg-bg-soft" },
  { name: "bg-mute", className: "bg-bg-mute" },
  { name: "ink", className: "bg-ink" },
  { name: "ink-muted", className: "bg-ink-muted" },
  { name: "ink-faint", className: "bg-ink-faint" },
  { name: "spectrum", className: "bg-[image:var(--spectrum)]" },
  { name: "bg-deep", className: "bg-bg-deep" },
];

export default function KitchenSink() {
  return (
    <>
      <Header />
      <main id="main" className="pt-24">
        <Section spacing="compact">
          <h1 className="font-display text-[clamp(2rem,5vw,3.5rem)] leading-[1.05] font-semibold">
            Kitchen sink
          </h1>
          <p className="text-ink-muted mt-5 max-w-[62ch] text-[16px] leading-[1.65]">
            Every primitive, every state. Spectrum.
          </p>
        </Section>

        <Section tone="soft" spacing="compact">
          <h2 className="font-display text-2xl">Surfaces</h2>
          <div className="mt-7 grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-8">
            {swatches.map((s) => (
              <div key={s.name}>
                <div className={`h-16 ${s.className}`} />
                <p className="text-ink-muted mt-2 text-[12px]">{s.name}</p>
              </div>
            ))}
          </div>

          <h3 className="font-display mt-12 text-lg">Depth</h3>
          <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="border-rule border p-6">flat (default)</div>
            <div className="border-rule border p-6 shadow-[var(--lift)]">
              lift (interactive hover)
            </div>
            <div className="relative border-rule border p-6">
              <span
                aria-hidden="true"
                className="bg-[image:var(--spectrum)] absolute inset-x-0 top-0 h-[3px]"
              />
              spectrum edge (highlighted card)
            </div>
          </div>
        </Section>

        <Section spacing="compact">
          <h2 className="font-display text-2xl">Type</h2>
          <div className="mt-7 space-y-5">
            <p className="spectrum-text font-display text-[clamp(2.5rem,7vw,5rem)] leading-[0.95] font-semibold">
              Spectrum display
            </p>
            <p className="font-display text-3xl font-medium">Display medium</p>
            <p className="text-ink-muted max-w-[68ch] text-[16px] leading-[1.65]">
              Body copy in Heebo, held to a comfortable measure so the eye finds the
              start of the next line without effort.
            </p>
            <p className="ui-label text-ink-muted">Interface label, Archivo tracked out</p>
            <p className="tabular text-[15px]">Tabular figures 0123456789</p>
          </div>
        </Section>

        <Section tone="soft" spacing="compact">
          <h2 className="font-display text-2xl">Hallmark</h2>
          <div className="mt-7 flex flex-wrap items-center gap-8">
            <Hallmark
              marks={[
                { glyph: "NM", label: "Maker's mark" },
                { glyph: "2017", label: "Date letter" },
                { glyph: "IN", label: "Home office", kind: "disc" },
              ]}
            />
            <Hallmark
              size="sm"
              marks={[
                { glyph: "NM", label: "Maker's mark" },
                { glyph: "$499", label: "Assay mark", kind: "assay" },
              ]}
            />
          </div>
        </Section>

        <Section spacing="compact">
          <h2 className="font-display text-2xl">Buttons</h2>

          <div className="mt-7 flex flex-wrap items-center gap-3">
            <Button variant="outline">Outline</Button>
            <Button variant="solid">Solid</Button>
            <Button variant="text">Text</Button>
            <Button disabled>Disabled</Button>
          </div>

          <div className="mt-4 flex flex-wrap items-center gap-3">
            <Button size="sm">Small</Button>
            <Button size="md">Medium</Button>
            <Button size="lg">Large</Button>
            <Button loading>Sending</Button>
          </div>

          <div className="mt-4 flex flex-wrap items-center gap-3">
            <Button href="/templates">As a link</Button>
            <Button href="https://example.com" external variant="solid">
              External
            </Button>
          </div>

          <div className="bg-bg-deep mt-4 flex flex-wrap items-center gap-3 p-6">
            <Button variant="light">Light (on dark)</Button>
          </div>
        </Section>

        <Section tone="soft" spacing="compact">
          <h2 className="font-display text-2xl">Plates</h2>
          <div className="mt-7 grid grid-cols-1 gap-4 md:grid-cols-3">
            <Plate className="p-7">
              <h3 className="font-display text-lg">Raised</h3>
              <p className="text-ink-muted mt-2 text-[15px] leading-[1.6]">
                A hairline border that lifts to a shadow on hover.
              </p>
            </Plate>
            <Plate depth="flat" className="p-7">
              <h3 className="font-display text-lg">Flat</h3>
              <p className="text-ink-muted mt-2 text-[15px] leading-[1.6]">
                A bordered face that never lifts.
              </p>
            </Plate>
            <Plate interactive className="p-7">
              <h3 className="font-display text-lg">Interactive</h3>
              <p className="text-ink-muted mt-2 text-[15px] leading-[1.6]">
                Lifts on hover. Only when it is genuinely a link.
              </p>
            </Plate>
          </div>
        </Section>

        <Section spacing="compact">
          <h2 className="font-display text-2xl">Form fields</h2>
          <div className="mt-7 grid max-w-3xl grid-cols-1 gap-6 md:grid-cols-2">
            <Field id="ks-name" label="Full name" helper="As it should appear." required>
              <Input id="ks-name" name="name" placeholder="Jane Cooper" />
            </Field>

            <Field
              id="ks-email"
              label="Work email"
              error="Enter a valid email address."
              required
            >
              <Input id="ks-email" name="email" invalid defaultValue="not-an-email" />
            </Field>

            <Field
              id="ks-budget"
              label="Budget range"
              helper="Helps us scope realistically."
            >
              <Select id="ks-budget" name="budget" defaultValue="">
                <option value="" disabled>
                  Select a range
                </option>
                <option value="a">Under $10,000</option>
                <option value="b">$10,000 to $30,000</option>
              </Select>
            </Field>

            <Field id="ks-disabled" label="Disabled" helper="Not editable.">
              <Input id="ks-disabled" name="disabled" disabled defaultValue="Locked" />
            </Field>

            <Field
              id="ks-message"
              label="What are you building?"
              helper="A paragraph is plenty."
              className="md:col-span-2"
            >
              <Textarea id="ks-message" name="message" />
            </Field>
          </div>
        </Section>

        <Section tone="soft" spacing="compact">
          <h2 className="font-display text-2xl">Accordion</h2>
          <Accordion
            className="mt-7 max-w-3xl"
            items={[
              {
                question: "Who owns the code you write?",
                answer:
                  "You do, in full, from the first commit. Ownership transfers on payment and is written into the contract.",
              },
              {
                question: "How much timezone overlap do we get?",
                answer:
                  "At least four hours with European and US mornings, scheduled rather than improvised.",
              },
            ]}
          />
        </Section>

        <Section spacing="compact">
          <h2 className="font-display text-2xl">Logo</h2>
          <div className="mt-7 flex flex-wrap items-center gap-10">
            <Logo variant="lockup" size="lg" />
            <Logo variant="wordmark" size="lg" />
            <Logo variant="mark" size="lg" />
          </div>
        </Section>

        <Section tone="deep" spacing="compact">
          <h2 className="font-display text-2xl">Deep field</h2>
          <p className="mt-4 max-w-[54ch] text-[15px] leading-[1.6] text-white/70">
            The one dark field a page is allowed. Used once, for the commercial break.
          </p>
        </Section>

        <Section spacing="compact">
          <h2 className="font-display text-2xl">Reveal</h2>
          <div className="mt-7 grid grid-cols-1 gap-4 sm:grid-cols-3">
            {[0, 1, 2].map((i) => (
              <Reveal key={i} delay={i * 0.055}>
                <Plate className="p-7">
                  <p className="tabular text-ink-muted text-[13px]">
                    {String(i + 1).padStart(2, "0")}
                  </p>
                </Plate>
              </Reveal>
            ))}
          </div>
        </Section>
      </main>
      <Footer />
    </>
  );
}
