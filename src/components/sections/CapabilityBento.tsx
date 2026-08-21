import Link from "next/link";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { services } from "@/data/services";
import { cn } from "@/lib/cn";

/**
 * "Eleven things, done properly" — built after the template's own showpiece
 * section, "Our Business Focus": a centred gradient-text heading over an
 * alternating timeline, a single rule running down its spine, each stage a
 * giant ghost numeral paired with its title and copy.
 *
 * TWO DEPARTURES FROM THE SOURCE, both content-driven rather than aesthetic:
 *
 * 1. The template pairs each stage with a stock photograph. This studio has
 *    no photography for eleven abstract capabilities, and this codebase's
 *    rule against invented content extends to imagery — a stock photo of a
 *    stranger at a laptop would be exactly the kind of filler the rest of the
 *    site refuses to run. The giant numeral carries the visual weight
 *    instead, the same way it already does in the template (there it rides
 *    behind the photo; here it is the whole figure), paired with the
 *    service's real tool stack as a row of chips — true content, not
 *    decoration standing in for missing content.
 *
 * 2. The template's centre line animates its own height in on scroll via a
 *    JS scroll-tracking library. It is drawn static here: full height, laid
 *    down once. A mistimed scroll-linked line reads as broken far more
 *    easily than it reads as impressive, and the eleven rows already carry
 *    the section's motion via their own scroll-in reveal.
 */
export function CapabilityBento() {
  return (
    <Section id="what-we-build" spacing="large">
      <div className="mx-auto max-w-[38ch] text-center">
        <p className="eyebrow">Capabilities</p>
        <h2 className="spectrum-text font-display mt-5 text-[clamp(2rem,4.6vw,3.4rem)] leading-[1.05] font-semibold">
          Eleven things, done properly.
        </h2>
      </div>

      <div className="relative mt-24">
        <div
          aria-hidden="true"
          className="bg-[image:var(--spectrum)] absolute inset-y-0 left-1/2 hidden w-px -translate-x-1/2 lg:block"
        />

        <ol className="flex flex-col gap-20 md:gap-24 lg:gap-32">
          {services.map((service, i) => {
            const flip = i % 2 === 1;
            const ordinal = String(i + 1).padStart(2, "0");

            return (
              <Reveal key={service.slug} as="li" delay={0.04}>
                <Link
                  href={`/services/${service.slug}`}
                  className="group grid items-center gap-10 lg:grid-cols-2 lg:gap-24"
                >
                  <div className={cn(flip && "lg:order-2", "text-center lg:text-left")}>
                    <span
                      aria-hidden="true"
                      className={cn(
                        "spectrum-text-h font-display block leading-none font-medium",
                        "text-[clamp(5rem,13vw,11rem)]",
                        "transition-opacity duration-[--t-base] ease-out group-hover:opacity-70",
                      )}
                    >
                      {ordinal}
                    </span>
                    <ul
                      className={cn(
                        "mt-4 flex flex-wrap justify-center gap-2 lg:justify-start",
                        flip && "lg:justify-end",
                      )}
                    >
                      {service.stack.map((tool) => (
                        <li
                          key={tool}
                          className="ui-label border-rule text-ink-muted border px-2.5 py-1 text-[10px]"
                        >
                          {tool}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className={cn(flip && "lg:order-1")}>
                    <span className="ui-label text-ink-ghost text-[10px]">
                      {ordinal} / {String(services.length).padStart(2, "0")}
                    </span>

                    <h3 className="font-display mt-3 text-[clamp(1.75rem,3vw,2.4rem)] leading-[1.08] font-semibold">
                      {service.name}
                    </h3>

                    <p className="text-ink-muted mt-5 max-w-[46ch] text-[16px] leading-[1.6]">
                      {service.blurb}
                    </p>

                    <p className="ui-label text-ink-faint mt-6 text-[10px]">
                      {service.typicalTimeline}
                    </p>

                    <span className="underline-draw ui-label text-ink mt-6 inline-block text-[11px]">
                      Learn more
                    </span>
                  </div>
                </Link>
              </Reveal>
            );
          })}
        </ol>
      </div>
    </Section>
  );
}
