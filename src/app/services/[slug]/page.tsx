import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Check } from "@phosphor-icons/react/dist/ssr";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { services, serviceSlugs, getService } from "@/data/services";
import { cta } from "@/config/site";
import { pageMetadata } from "@/lib/metadata";
import { serviceJsonLd, breadcrumbJsonLd } from "@/lib/jsonLd";

/**
 * Prerenders all 11 service pages. Each gets its own hero image (per-service
 * placeholder seed) so eleven pages built from one template don't read as
 * eleven copies of the same page — the seed is the one thing that varies
 * automatically without per-page authoring.
 */
export function generateStaticParams() {
  return serviceSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return {};

  return pageMetadata({
    title: service.name,
    description: service.blurb,
    path: `/services/${service.slug}`,
  });
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  const others = services.filter((s) => s.slug !== service.slug).slice(0, 3);

  const jsonLd = [
    serviceJsonLd({
      name: service.name,
      description: service.blurb,
      path: `/services/${service.slug}`,
    }),
    breadcrumbJsonLd([
      { name: "Services", path: "/services" },
      { name: service.name, path: `/services/${service.slug}` },
    ]),
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
              <h1 className="font-display text-4xl leading-[1.05] md:text-5xl">
                {service.name}
              </h1>
              <p className="text-ink-muted mt-5 max-w-[46ch] text-lg leading-relaxed">
                {service.intro}
              </p>

              <p className="text-ink-muted mt-6 text-sm">
                Typical timeline: {service.typicalTimeline}
              </p>

              <div className="mt-9">
                <Button href={cta.primary.href} size="lg">
                  {cta.primary.label}
                </Button>
              </div>
            </div>

            <div className="lg:col-span-7">
              <div className="border-rule border">
                <Image
                  src={`/services/${service.slug}/hero.jpg`}
                  alt={service.heroAlt}
                  width={1600}
                  height={900}
                  priority
                  sizes="(max-width: 1024px) 100vw, 55vw"
                  className="aspect-16/9 w-full object-cover"
                />
              </div>
            </div>
          </div>
        </Section>

        <Section tone="soft">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <h2 className="font-display text-2xl">
                What&apos;s included
              </h2>
              <ul className="mt-6 space-y-3">
                {service.includes.map((item) => (
                  <li key={item} className="flex items-start gap-2.5">
                    <Check
                      weight="bold"
                      aria-hidden="true"
                      className="text-ink mt-0.5 h-4 w-4 shrink-0"
                    />
                    <span className="text-ink-muted">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="lg:col-span-5 lg:col-start-7">
              <h2 className="font-display text-2xl">Typical stack</h2>
              <div className="mt-6 flex flex-wrap gap-2">
                {service.stack.map((tool) => (
                  <span
                    key={tool}
                    className="ui-label border-rule text-ink-muted border px-3 py-2 text-[11px]"
                  >
                    {tool}
                  </span>
                ))}
              </div>

              <p className="text-ink-muted mt-8 max-w-[46ch] leading-relaxed">
                The stack varies with what the project actually needs. This is what we
                reach for most often, not a fixed menu.
              </p>
            </div>
          </div>
        </Section>

        {others.length > 0 ? (
          <Section>
            <h2 className="font-display text-2xl">Also worth a look</h2>
            <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-3">
              {others.map((s) => (
                <Link
                  key={s.slug}
                  href={`/services/${s.slug}`}
                  className="border-rule bg-bg group border p-6 transition-shadow duration-[--t-base] ease-(--ease-settle) hover:shadow-[var(--lift)]"
                >
                  <h3 className="font-display text-lg">{s.name}</h3>
                  <p className="text-ink-muted mt-2 line-clamp-2 text-sm leading-relaxed">
                    {s.blurb}
                  </p>
                </Link>
              ))}
            </div>
          </Section>
        ) : null}
      </main>
      <Footer />
    </>
  );
}
