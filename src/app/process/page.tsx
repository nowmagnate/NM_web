import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { processStages } from "@/data/story";
import { cta } from "@/config/site";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Process",
  description: "How an engagement actually runs, from discovery to handover.",
  path: "/process",
});

/**
 * The home page's pinned sticky-stack (`components/sections/Process.tsx`) is
 * the one scroll-hijack the whole site is allowed — spending it a second
 * time here would just repeat the trick with less impact. This page instead
 * uses oversized numerals against plain hairline dividers: a distinct layout
 * family, no motion beyond the standard scroll-reveal.
 */
export default function ProcessPage() {
  return (
    <>
      <Header />
      <main id="main">
        <Section spacing="compact" className="pt-32">
          <div className="max-w-[52ch]">
            <h1 className="font-display text-4xl leading-[1.05] md:text-5xl">
              How the work runs.
            </h1>
            <p className="text-ink-muted mt-5 text-lg leading-relaxed">
              Four stages. You can stop at the end of any cycle and keep everything built
              so far.
            </p>
          </div>
        </Section>

        <Section spacing="compact" className="pt-0">
          <div className="divide-rule border-rule divide-y border-y">
            {processStages.map((stage, i) => (
              <Reveal key={stage.number} delay={Math.min(i * 0.06, 0.24)}>
                <div className="grid grid-cols-1 gap-4 py-10 sm:grid-cols-[6rem_1fr] sm:gap-8 md:py-14">
                  <span
                    aria-hidden="true"
                    className="spectrum-text-h font-display text-5xl font-medium md:text-6xl"
                  >
                    {stage.number}
                  </span>
                  <div className="max-w-[56ch]">
                    <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                      <h2 className="font-display text-2xl md:text-3xl">{stage.title}</h2>
                      <span className="text-ink-muted text-[12px]">{stage.duration}</span>
                    </div>
                    <p className="text-ink-muted mt-3 leading-relaxed">{stage.detail}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </Section>

        <Section spacing="large">
          <div className="mx-auto max-w-[46ch] text-center">
            <h2 className="spectrum-text font-display text-3xl leading-[1.08] text-balance md:text-4xl">
              Ready to start discovery?
            </h2>
            <div className="mt-9 flex justify-center">
              <Button href={cta.primary.href} size="lg">
                {cta.primary.label}
              </Button>
            </div>
          </div>
        </Section>
      </main>
      <Footer />
    </>
  );
}
