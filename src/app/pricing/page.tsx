import Link from "next/link";
import { Check, X } from "@phosphor-icons/react/dist/ssr";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { Faq } from "@/components/sections/Faq";
import { engagementModels } from "@/data/story";
import { templates } from "@/data/templates";
import { offer } from "@/data/offer";
import { pricingFaq } from "@/data/faq";
import { pageMetadata } from "@/lib/metadata";
import { faqJsonLd } from "@/lib/jsonLd";

export const metadata = pageMetadata({
  title: "Pricing",
  description: `Three ways to work with us: fixed-scope projects, a dedicated squad, or a ${offer.price} template site.`,
  path: "/pricing",
});

export default function PricingPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(pricingFaq)) }}
      />
      <Header />
      <main id="main">
        <Section spacing="compact" className="pt-32">
          <div className="max-w-[52ch]">
            <h1 className="font-display text-4xl leading-[1.05] md:text-5xl">
              Three ways to work with us.
            </h1>
            <p className="text-ink-muted mt-5 text-lg leading-relaxed">
              No hidden fees, no surprise scope. What the quote says is what you pay.
            </p>
          </div>
        </Section>

        <Section spacing="compact" className="pt-0">
          <div className="grid grid-cols-1 gap-px md:grid-cols-3">
            {engagementModels.map((model, i) => {
              const highlight = "highlight" in model && model.highlight;
              return (
                <Reveal key={model.name} delay={i * 0.06} className="h-full">
                  <div className="border-rule bg-bg relative flex h-full flex-col justify-between border p-8">
                    {highlight ? (
                      <span
                        aria-hidden="true"
                        className="bg-[image:var(--spectrum)] absolute inset-x-0 top-0 h-[3px]"
                      />
                    ) : null}

                    <div>
                      <h2 className="font-display text-xl">{model.name}</h2>
                      <p className="text-ink-muted mt-2 text-sm">{model.bestFor}</p>
                      <p className="text-ink-muted mt-5 leading-relaxed">
                        {model.detail}
                      </p>
                    </div>

                    <div className="border-rule mt-8 flex items-center justify-between border-t pt-5">
                      <span className="font-display text-lg">
                        {highlight ? offer.price : model.priceNote}
                      </span>
                      <Button href={model.href} size="sm">
                        {highlight ? "Browse templates" : "Get in touch"}
                      </Button>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </Section>

        <Section tone="soft">
          <div className="max-w-[52ch]">
            <h2 className="font-display text-2xl">What {offer.price} actually covers</h2>
            <p className="text-ink-muted mt-3 leading-relaxed">
              The full breakdown for the template offer. {offer.turnaroundNote}
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2">
            <div>
              <p className="text-ink text-sm font-medium">Included</p>
              <ul className="mt-3 space-y-2.5">
                {offer.included.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm">
                    <Check
                      weight="bold"
                      aria-hidden="true"
                      className="text-ink mt-0.5 h-3.5 w-3.5 shrink-0"
                    />
                    <span className="text-ink-muted">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="text-ink text-sm font-medium">Not included</p>
              <ul className="mt-3 space-y-2.5">
                {offer.notIncluded.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm">
                    <X
                      weight="bold"
                      aria-hidden="true"
                      className="text-ink-faint mt-0.5 h-3.5 w-3.5 shrink-0"
                    />
                    <span className="text-ink-muted">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <p className="text-ink-muted mt-8 max-w-[62ch] text-sm leading-relaxed">
            {offer.complianceNote}
          </p>

          <div className="mt-8">
            <Link
              href="/templates"
              className="text-ink text-sm font-medium underline decoration-dotted underline-offset-4"
            >
              Browse all {templates.length} templates
            </Link>
          </div>
        </Section>

        <Faq items={pricingFaq} />
      </main>
      <Footer />
    </>
  );
}
