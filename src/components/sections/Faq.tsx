import { Section } from "@/components/ui/Section";
import { Accordion } from "@/components/ui/Accordion";
import type { FaqItem } from "@/data/faq";

/**
 * The questions that decide the sale: IP ownership, NDAs, jurisdiction,
 * payment terms, timezone overlap, and what happens when a project goes
 * badly. Those are the real blockers for someone hiring a studio in another
 * country, and hedging here reads as evasion, which is the exact impression
 * this section exists to remove.
 *
 * Reused on /contact, /templates, /brief and /pricing with different item
 * sets, which is why items are a prop rather than an import.
 *
 * The heading sticks while the answers scroll, so the reader always knows
 * which set of questions they are inside.
 */
export function Faq({
  items,
  heading = "Questions worth asking.",
}: {
  items: FaqItem[];
  heading?: string;
}) {
  return (
    <Section id="faq" spacing="large">
      <div className="grid grid-cols-1 gap-y-10 lg:grid-cols-12 lg:gap-x-16">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-28">
            <h2 className="font-display max-w-[14ch] text-[clamp(2rem,4.4vw,3.4rem)] leading-[1.05] font-semibold">
              {heading}
            </h2>
          </div>
        </div>

        <div className="lg:col-span-7 lg:col-start-6">
          <Accordion items={items} />
        </div>
      </div>
    </Section>
  );
}
