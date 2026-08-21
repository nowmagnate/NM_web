import Link from "next/link";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { engagementModels } from "@/data/story";
import { formattedTemplatePrice } from "@/config/brand";
import { cn } from "@/lib/cn";

/**
 * Three ways to work together.
 *
 * Deliberately not a pricing matrix: two of the three are quoted per
 * engagement, so a feature table with ticks would be inventing precision that
 * does not exist. Three plates answer the real question, which is "which of
 * these am I?"
 *
 * The template option carries a top edge in the spectrum, because it is the
 * only one carrying a real number and the only one serving the second
 * audience.
 */
export function EngagementModels() {
  return (
    <Section id="engagement" tone="soft" spacing="large">
      <div>
        <h2 className="font-display max-w-[15ch] text-[clamp(2rem,4.4vw,3.4rem)] leading-[1.05] font-semibold">
          Three ways to work with us.
        </h2>
      </div>

      <div className="mt-14 grid grid-cols-1 gap-px md:grid-cols-3">
        {engagementModels.map((model, i) => {
          const highlight = "highlight" in model && model.highlight;
          return (
            <Reveal key={model.name} delay={i * 0.06} className="h-full">
              <Link
                href={model.href}
                className={cn(
                  "group border-rule bg-bg relative flex h-full flex-col justify-between border p-8",
                  "transition-shadow duration-[--t-base] ease-(--ease-settle) hover:shadow-[var(--lift)]",
                )}
              >
                {highlight ? (
                  <span
                    aria-hidden="true"
                    className="bg-[image:var(--spectrum)] absolute inset-x-0 top-0 h-[3px]"
                  />
                ) : null}

                <div>
                  <h3 className="font-display text-[21px] leading-[1.15] font-semibold">
                    {model.name}
                  </h3>
                  <p className="text-ink-muted mt-2.5 text-[14px]">{model.bestFor}</p>
                  <p className="text-ink-muted mt-6 text-[15px] leading-[1.6]">
                    {model.detail}
                  </p>
                </div>

                <div className="border-rule mt-10 border-t pt-5">
                  <span className="tabular font-display text-[17px] font-medium">
                    {highlight ? formattedTemplatePrice() : model.priceNote}
                  </span>
                </div>
              </Link>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}
