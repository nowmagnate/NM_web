import Image from "next/image";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { positioning, realMilestones } from "@/data/story";
import { brand, yearsInBusiness } from "@/config/brand";
import { cta } from "@/config/site";
import { placeholderImage } from "@/lib/placeholder";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "About",
  description: positioning.subhead,
  path: "/about",
});

/**
 * The full version of the story the home page only gestures at in section 5.
 * Timeline renders from `realMilestones` — the filtered, non-placeholder
 * subset of `positioning.milestones` — so a TODO entry in the data file never
 * accidentally ships as a real date on the page.
 */
export default function AboutPage() {
  const years = yearsInBusiness();

  return (
    <>
      <Header />
      <main id="main">
        <Section spacing="compact" className="pt-32">
          <div className="max-w-[56ch]">
            <h1 className="font-display text-4xl leading-[1.05] md:text-5xl">
              {positioning.headline}
            </h1>
            <p className="text-ink-muted mt-5 text-lg leading-relaxed">
              {positioning.subhead}
            </p>
          </div>
        </Section>

        <Section tone="soft">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
            <div className="lg:col-span-5">
              {/* TODO(asset): 1600x900. See design/ASSET-MANIFEST.md */}
              <Image
                src={placeholderImage("about-studio", 1600, 900)}
                alt="The studio during a working day"
                width={1600}
                height={900}
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="border-rule aspect-16/9 w-full border object-cover"
              />
            </div>

            <div className="lg:col-span-6 lg:col-start-7">
              <div className="text-ink-muted max-w-[62ch] space-y-5 text-lg leading-relaxed">
                {positioning.paragraphs.map((paragraph) => (
                  <p key={paragraph.slice(0, 24)}>{paragraph}</p>
                ))}
              </div>
            </div>
          </div>
        </Section>

        {realMilestones.length > 0 ? (
          <Section>
            <h2 className="font-display text-2xl">
              {years} years, in brief.
            </h2>
            <ol className="divide-rule border-rule mt-10 divide-y border-t">
              {realMilestones.map((milestone, i) => (
                <Reveal key={milestone.title} delay={Math.min(i * 0.06, 0.24)}>
                  <li className="grid grid-cols-1 gap-2 py-6 sm:grid-cols-[8rem_1fr] sm:gap-6">
                    <span className="spectrum-text-h font-display text-4xl font-medium">
                      {milestone.year}
                    </span>
                    <div>
                      <h3 className="text-ink font-medium">{milestone.title}</h3>
                      <p className="text-ink-muted mt-1.5 max-w-[56ch] leading-relaxed">
                        {milestone.detail}
                      </p>
                    </div>
                  </li>
                </Reveal>
              ))}
            </ol>
          </Section>
        ) : null}

        <Section tone="soft">
          <h2 className="font-display text-2xl">
            What you are probably worried about
          </h2>
          <dl className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2">
            {positioning.objections.map((item) => (
              <div key={item.concern}>
                <dt className="text-ink font-medium">{item.concern}</dt>
                <dd className="text-ink-muted mt-1.5 max-w-[52ch] leading-relaxed">
                  {item.answer}
                </dd>
              </div>
            ))}
          </dl>
        </Section>

        <Section spacing="large">
          <div className="mx-auto max-w-[46ch] text-center">
            <h2 className="spectrum-text font-display text-3xl leading-[1.08] text-balance md:text-4xl">
              Founded in {brand.foundedYear}. Still hands-on.
            </h2>
            <p className="text-ink-muted mx-auto mt-5 max-w-[42ch] leading-relaxed">
              If that sounds like the kind of team you want building your product, say
              hello.
            </p>
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
