import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { positioning } from "@/data/story";
import { brand, yearsInBusiness } from "@/config/brand";

/**
 * The differentiator, and the most important section for the founder
 * audience. The whole page is arranged so they reach it.
 *
 * The argument is that the record is real and the objections are named out
 * loud. Every buyer evaluating a studio in another country is already running
 * this list privately; answering it directly beats projecting confidence.
 *
 * NO INVENTED NUMBERS. The only figure on screen is the founding year and the
 * arithmetic that follows from it, both true and checkable.
 *
 * The objections are a dialogue in a ruled list: the doubt set as the
 * question, the answer beneath it as the response.
 */
export function SinceStory() {
  const years = yearsInBusiness();

  return (
    <Section id="since" spacing="large">
      <div className="grid grid-cols-1 gap-y-14 lg:grid-cols-12 lg:gap-x-16">
        <div className="lg:col-span-5">
          <h2 className="font-display text-[clamp(2rem,4.4vw,3.4rem)] leading-[1.05] font-semibold">
            {years} years of shipping, mostly by word of mouth.
          </h2>

          <div className="text-ink-muted mt-9 max-w-[52ch] space-y-5 text-[16px] leading-[1.65]">
            {positioning.paragraphs.map((paragraph) => (
              <p key={paragraph.slice(0, 24)}>{paragraph}</p>
            ))}
          </div>

          <div className="mt-10">
            <Button href="/about">Read the full story</Button>
          </div>
        </div>

        <div className="lg:col-span-6 lg:col-start-7">
          <h3 className="ui-label text-ink-faint">What you are probably worried about</h3>

          <dl className="mt-7">
            {/* Exactly ONE div between <dl> and each <dt>/<dd> pair, which is
                all HTML5 permits. Reveal renders that div itself, so nothing
                may wrap inside it. */}
            {positioning.objections.map((item, i) => (
              <Reveal
                key={item.concern}
                delay={Math.min(i * 0.06, 0.24)}
                className="border-rule border-t py-7 first:border-t-0 first:pt-0"
              >
                <dt className="font-display text-[16px] leading-[1.4] font-medium">
                  {item.concern}
                </dt>
                <dd className="text-ink-muted mt-3 max-w-[58ch] text-[15px] leading-[1.65]">
                  {item.answer}
                </dd>
              </Reveal>
            ))}
          </dl>

          <p className="text-ink-muted mt-8 text-[13px]">
            Registered and operating from {brand.address.country}.
          </p>
        </div>
      </div>
    </Section>
  );
}
