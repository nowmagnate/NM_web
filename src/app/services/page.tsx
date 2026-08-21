import Link from "next/link";
import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { services } from "@/data/services";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Services",
  description:
    "Web apps, mobile apps, SaaS products, AI agents and tools, and everything else we build.",
  path: "/services",
});

/**
 * Capability hub. A simple divided list rather than another bento — the home
 * page already spent that layout family, and eleven near-identical cards in a
 * row here would just repeat it. `divide-y` with generous row height reads as
 * a proper index page, not a second attempt at the home section.
 */
export default function ServicesPage() {
  return (
    <>
      <Header />
      <main id="main">
        <Section spacing="compact" className="pt-32">
          <div className="max-w-[52ch]">
            <h1 className="font-display text-4xl leading-[1.05] md:text-5xl">
              What we build.
            </h1>
            <p className="text-ink-muted mt-5 text-lg leading-relaxed">
              Eleven things, done properly. If what you need isn&apos;t on this list, ask
              anyway.
            </p>
          </div>
        </Section>

        <Section spacing="compact" className="pt-0">
          <div className="divide-rule border-rule divide-y border-y">
            {services.map((service, i) => (
              <Reveal key={service.slug} delay={Math.min(i * 0.03, 0.24)}>
                <Link
                  href={`/services/${service.slug}`}
                  className="group hover:text-ink flex items-center justify-between gap-6 py-7 transition-colors duration-[--t-fast]"
                >
                  <div>
                    <h2 className="font-display text-2xl md:text-3xl">{service.name}</h2>
                    <p className="text-ink-muted mt-2 max-w-[52ch] leading-relaxed">
                      {service.blurb}
                    </p>
                  </div>
                  <ArrowUpRight
                    weight="bold"
                    aria-hidden="true"
                    className="h-5 w-5 shrink-0 transition-transform duration-[--t-base] ease-(--ease-settle) group-hover:translate-x-1 group-hover:-translate-y-1"
                  />
                </Link>
              </Reveal>
            ))}
          </div>
        </Section>
      </main>
      <Footer />
    </>
  );
}
