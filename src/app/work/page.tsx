import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Section } from "@/components/ui/Section";
import { ProjectsTimeline } from "@/components/sections/ProjectsTimeline";
import { caseStudies } from "@/data/case-studies";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Work",
  description: "Selected client work.",
  path: "/work",
});

/**
 * Same honesty rule as the home page's version of this section: no case
 * studies exist yet, so this is a composed empty state, not filler. Gated on
 * `caseStudies.length` — the day a real one is added, this switches to the
 * grid automatically.
 */
export default function WorkPage() {
  const hasWork = caseStudies.length > 0;

  return (
    <>
      <Header />
      <main id="main">
        {hasWork && (
          <Section spacing="compact" className="pt-32">
            <div className="max-w-[52ch]">
              <h1 className="font-display text-4xl leading-[1.05] md:text-5xl">
                Selected work.
              </h1>
              <p className="text-ink-muted mt-5 text-lg leading-relaxed">
                A selection of what we&rsquo;ve shipped.
              </p>
            </div>
          </Section>
        )}

        {hasWork && (
          <Section spacing="compact" className="pt-0">
            <div className="grid grid-cols-1 gap-px md:grid-cols-2">
              {caseStudies.map((study) => (
                <Link
                  key={study.slug}
                  href={`/work/${study.slug}`}
                  className="border-rule bg-bg group border p-8 transition-shadow duration-[--t-base] ease-(--ease-settle) hover:shadow-[var(--lift)]"
                >
                  <p className="ui-label text-ink-faint text-[10px]">
                    {study.client} · {study.year}
                  </p>
                  <h2 className="font-display mt-3 text-xl">{study.title}</h2>
                  <p className="text-ink-muted mt-3 max-w-[52ch] leading-relaxed">
                    {study.summary}
                  </p>
                </Link>
              ))}
            </div>
          </Section>
        )}

        <ProjectsTimeline lead={!hasWork} />
      </main>
      <Footer />
    </>
  );
}
