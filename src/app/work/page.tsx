import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { caseStudies } from "@/data/case-studies";
import { cta } from "@/config/site";
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
        <Section spacing="compact" className="pt-32">
          <div className="max-w-[52ch]">
            <h1 className="font-display text-4xl leading-[1.05] md:text-5xl">
              Selected work.
            </h1>
            <p className="text-ink-muted mt-5 text-lg leading-relaxed">
              {hasWork
                ? "A selection of what we've shipped."
                : "Most of it sits behind an NDA. Here's what we can show."}
            </p>
          </div>
        </Section>

        <Section spacing="compact" className="pt-0">
          {hasWork ? (
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
          ) : (
            <div className="border-rule border px-8 py-16 text-center md:px-16 md:py-20">
              <h2 className="spectrum-text font-display mx-auto max-w-[26ch] text-3xl leading-[1.08] text-balance md:text-4xl">
                Nine years of client projects, almost all under NDA.
              </h2>
              <p className="text-ink-muted mx-auto mt-5 max-w-[54ch] leading-relaxed">
                We are working through permissions with clients who have agreed to a
                public write-up. Until those are live, the honest answer is to ask
                directly, and we will walk you through relevant work on a call.
              </p>
              <div className="mt-9 flex justify-center">
                <Button href={cta.primary.href}>{cta.primary.label}</Button>
              </div>
            </div>
          )}
        </Section>
      </main>
      <Footer />
    </>
  );
}
