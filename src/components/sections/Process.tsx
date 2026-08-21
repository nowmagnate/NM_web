import { Section } from "@/components/ui/Section";
import { processStages } from "@/data/story";

/**
 * How the work runs — as a struck sequence.
 *
 * The numbers here are legitimate: this is a real ordered process where a
 * client can stop at the end of any stage, so the order carries information
 * the reader needs. That is the only condition under which numbered markers
 * earn their place.
 *
 * The stack is CSS `position: sticky` rather than a scroll library. The
 * content IS a sequence, so pinning each stage while the next slides over it
 * makes the ordering literal. Sticky gets that with zero JavaScript, no
 * registration or cleanup, and it respects reduced motion for free because
 * there is no animation to disable: the cards stack because of layout.
 *
 * Each stage sits 14px lower than the one before, so every previous number
 * stays visible and the pile reads as depth rather than as a card that failed
 * to scroll away.
 */
export function Process() {
  return (
    <Section id="process" spacing="large">
      <div className="grid grid-cols-1 gap-y-12 lg:grid-cols-12 lg:gap-x-16">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-28">
            <h2 className="font-display text-[clamp(2rem,4.4vw,3.4rem)] leading-[1.05] font-semibold">
              How the work actually runs.
            </h2>
            <p className="text-ink-muted mt-6 max-w-[34ch] text-[16px] leading-[1.6]">
              Four stages. You can stop at the end of any cycle and keep everything built
              so far.
            </p>
          </div>
        </div>

        <ol className="lg:col-span-7 lg:col-start-6">
          {processStages.map((stage, i) => (
            <li
              key={stage.number}
              className="sticky"
              style={{ top: `calc(7rem + ${i * 14}px)` }}
            >
              <div className="border-rule bg-bg mb-5 border p-8 shadow-[var(--lift)] md:p-10">
                <div className="flex items-baseline justify-between gap-6">
                  <span
                    aria-hidden="true"
                    className="tabular spectrum-text-h font-display text-[clamp(2.5rem,5vw,3.75rem)] leading-none font-medium"
                  >
                    {stage.number}
                  </span>
                  <span className="ui-label text-ink-faint text-[11px]">
                    {stage.duration}
                  </span>
                </div>

                <h3 className="font-display mt-7 text-[clamp(1.4rem,2.6vw,2rem)] leading-[1.1] font-semibold">
                  {stage.title}
                </h3>
                <p className="text-ink-muted mt-4 max-w-[52ch] text-[15px] leading-[1.65]">
                  {stage.detail}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </Section>
  );
}
