import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Check, X } from "@phosphor-icons/react/dist/ssr";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Section } from "@/components/ui/Section";
import { Faq } from "@/components/sections/Faq";
import { PaymentCTA } from "@/components/templates/PaymentCTA";
import { TemplateCard } from "@/components/templates/TemplateCard";
import { templates, templateSlugs, getTemplate } from "@/data/templates";
import { offer } from "@/data/offer";
import { templateFaq } from "@/data/faq";
import { placeholderImage } from "@/lib/placeholder";
import { pageMetadata } from "@/lib/metadata";
import { templateProductJsonLd, breadcrumbJsonLd, faqJsonLd } from "@/lib/jsonLd";

/**
 * Prerenders all 24 templates as static HTML — required on Firebase's free
 * tier, which serves static files only. No `dynamicParams` fallback: a slug
 * not in this list should 404, not attempt a runtime render that cannot
 * happen on Spark.
 */
export function generateStaticParams() {
  return templateSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const template = getTemplate(slug);
  if (!template) return {};

  return pageMetadata({
    title: `${template.name} · ${template.practiceType} template`,
    description: template.blurb,
    path: `/templates/${template.slug}`,
  });
}

export default async function TemplateDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const template = getTemplate(slug);
  if (!template) notFound();

  const related = templates
    .filter((t) => t.category === template.category && t.slug !== template.slug)
    .slice(0, 3);

  const jsonLd = [
    templateProductJsonLd({
      name: template.name,
      description: template.blurb,
      path: `/templates/${template.slug}`,
      imageUrl: placeholderImage(`template-${template.slug}`, 1600, 1200),
    }),
    breadcrumbJsonLd([
      { name: "Templates", path: "/templates" },
      { name: template.name, path: `/templates/${template.slug}` },
    ]),
    faqJsonLd(templateFaq),
  ];

  return (
    <>
      {jsonLd.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
      <Header />
      <main id="main">
        <Section spacing="compact" className="pt-32">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <p className="text-ink-muted text-[12px]">
                {template.category} · {template.practiceType}
              </p>
              <h1 className="font-display mt-3 text-4xl leading-[1.05] md:text-5xl">
                {template.name}
              </h1>
              <p className="text-ink-muted mt-5 max-w-[46ch] text-lg leading-relaxed">
                {template.blurb}
              </p>

              <p className="text-ink-muted mt-3 text-sm">Best for: {template.bestFor}</p>

              <div className="mt-8 flex items-center gap-1.5">
                {template.palette.swatches.map((swatch) => (
                  <span
                    key={swatch}
                    aria-hidden="true"
                    className="border-rule h-4 w-4 border"
                    style={{ backgroundColor: swatch }}
                  />
                ))}
                <span className="text-ink-muted ml-1 text-sm">
                  {template.palette.name}
                </span>
              </div>

              <div className="mt-10">
                <PaymentCTA templateSlug={template.slug} />
              </div>
            </div>

            <div className="lg:col-span-7">
              <div className="border-rule relative border">
                {/* TODO(asset): see design/ASSET-MANIFEST.md */}
                <Image
                  src={placeholderImage(`template-${template.slug}`, 1600, 1200)}
                  alt={`${template.name}, a template for a ${template.practiceType.toLowerCase()}`}
                  width={1600}
                  height={1200}
                  priority
                  sizes="(max-width: 1024px) 100vw, 55vw"
                  className="aspect-4/3 w-full object-cover"
                />
                {template.previewStatus === "comp" ? (
                  <span className="ui-label border-ink bg-bg/90 text-ink absolute top-4 left-4 border px-3 py-2 text-[10px] backdrop-blur-sm">
                    Design concept · live preview coming soon
                  </span>
                ) : null}
              </div>
            </div>
          </div>
        </Section>

        <Section tone="soft">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <h2 className="font-display text-2xl">
                What&apos;s in this template
              </h2>
              <ul className="mt-6 space-y-3">
                {template.sections.map((section) => (
                  <li key={section} className="flex items-start gap-2.5">
                    <Check
                      weight="bold"
                      aria-hidden="true"
                      className="text-ink mt-0.5 h-4 w-4 shrink-0"
                    />
                    <span className="text-ink-muted">{section}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="lg:col-span-7">
              <h2 className="font-display text-2xl">
                What {offer.price} covers
              </h2>

              <div className="mt-6 grid grid-cols-1 gap-8 sm:grid-cols-2">
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
                          className="text-ink-muted mt-0.5 h-3.5 w-3.5 shrink-0"
                        />
                        <span className="text-ink-muted">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="border-rule bg-bg-soft mt-8 border p-6">
                <p className="text-ink-muted text-sm leading-relaxed">
                  <span className="text-ink font-medium">Turnaround: </span>
                  {offer.turnaround}. {offer.turnaroundNote}
                </p>
              </div>
            </div>
          </div>
        </Section>

        <Faq items={templateFaq} heading="Before you request this template" />

        {related.length > 0 ? (
          <Section>
            <h2 className="font-display text-2xl">
              More in {template.category}
            </h2>
            <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((t) => (
                <TemplateCard key={t.slug} template={t} />
              ))}
            </div>
          </Section>
        ) : null}
      </main>
      <Footer />
    </>
  );
}
