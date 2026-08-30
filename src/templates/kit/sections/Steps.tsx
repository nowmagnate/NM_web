import { Band, Wrap, BandHead } from "../parts/Band";
import { Figure } from "../parts/Figure";
import { TplReveal } from "../parts/TplReveal";
import { revealDelay } from "../parts/cascade";
import type { Section } from "../schema";

type Props = Extract<Section, { type: "steps" }>;

/**
 * What happens next, in order.
 *
 * In the booking-led archetype this band carries the nervous-patient copy, the
 * first-visit walkthrough, the "what to expect" that is doing most of the
 * persuading. The numbers are the design: they are set large in the display
 * face and greyed back, so the sequence reads at a glance and the numeral
 * never competes with the sentence beside it.
 *
 * `aside` is the optional pull-out beside the list. It is where the reassurance
 * that does not fit a numbered step goes: sedation options, a named person to
 * ask for, what happens if you need to cancel.
 */
export function Steps({ id, eyebrow, title, intro, steps, aside, tone }: Props) {
  const headingId = id ? `${id}-title` : undefined;

  return (
    <Band id={id} tone={tone} labelledBy={headingId}>
      <Wrap className="flex flex-col gap-[clamp(2.25rem,4.5vw,3.5rem)]">
        <BandHead eyebrow={eyebrow} title={title} intro={intro} id={headingId} />

        <div className="grid gap-[clamp(2rem,4vw,3.5rem)] lg:grid-cols-[1.35fr_1fr]">
          <ol className="border-tpl-rule flex flex-col border-t">
            {steps.map((step, index) => (
              <TplReveal
                as="li"
                key={step.title}
                delay={revealDelay(index, 70)}
                className="border-tpl-rule flex gap-6 border-b py-7"
              >
                <span
                  aria-hidden="true"
                  className="font-tpl-display text-tpl-faint w-[2.5ch] shrink-0 text-[1.75rem] leading-none font-semibold tabular-nums"
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div className="flex flex-col gap-2">
                  <h3 className="text-tpl-ink text-[1.2rem] leading-[1.3]">
                    {step.title}
                  </h3>
                  <p className="text-tpl-muted max-w-[54ch] text-[15px] leading-[1.62]">
                    {step.body}
                  </p>
                </div>
              </TplReveal>
            ))}
          </ol>

          {aside ? (
            <TplReveal
              delay={90}
              className="bg-tpl-wash rounded-tpl flex h-fit flex-col gap-5 p-[clamp(1.75rem,3vw,2.5rem)]"
            >
              {aside.image ? (
                <Figure
                  image={aside.image}
                  ratio="16 / 10"
                  sizes="(min-width: 1024px) 34vw, 100vw"
                />
              ) : null}
              <h3 className="text-tpl-ink text-[1.3rem] leading-[1.25]">
                {aside.title}
              </h3>
              <p className="text-tpl-muted text-[15px] leading-[1.62]">{aside.body}</p>
            </TplReveal>
          ) : null}
        </div>
      </Wrap>
    </Band>
  );
}
