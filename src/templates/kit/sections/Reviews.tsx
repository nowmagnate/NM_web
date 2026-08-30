import { Band, Wrap, BandHead } from "../parts/Band";
import { TplReveal } from "../parts/TplReveal";
import { revealDelay } from "../parts/cascade";
import type { Section } from "../schema";

type Props = Extract<Section, { type: "reviews" }>;

/**
 * What patients said.
 *
 * `sourceNote` is not decoration and it is not optional in practice. A quote
 * with no attribution is worth nothing, and a quote a visitor suspects was
 * written by the practice is worth less than nothing. On a real site this
 * names the platform the reviews came from. On every preview in this catalog
 * it says the reviews are demo copy, which is what keeps these pages inside
 * the studio's standing rule that no proof is ever invented.
 *
 * No star graphics, no logo of the review platform, no carousel. Stars are the
 * part of a review that is easiest to fake and hardest to verify, and a
 * carousel hides two thirds of the evidence behind a control nobody presses.
 */
export function Reviews({ id, eyebrow, title, intro, items, sourceNote, tone }: Props) {
  const headingId = id ? `${id}-title` : undefined;

  return (
    <Band id={id} tone={tone} labelledBy={headingId}>
      <Wrap className="flex flex-col gap-[clamp(2.25rem,4.5vw,3.5rem)]">
        <BandHead eyebrow={eyebrow} title={title} intro={intro} id={headingId} />

        <ul className="grid gap-x-7 gap-y-9 md:grid-cols-2 lg:grid-cols-3">
          {items.map((item, index) => (
            <TplReveal
              as="li"
              key={item.name + index}
              delay={revealDelay(index, 70)}
              className="border-tpl-rule flex flex-col gap-5 border-t pt-6"
            >
              <blockquote className="text-tpl-ink text-[1.05rem] leading-[1.6]">
                {item.quote}
              </blockquote>
              <div className="flex flex-col gap-0.5">
                <span className="text-tpl-ink text-[14px] font-semibold">
                  {item.name}
                </span>
                {item.meta ? (
                  <span className="text-tpl-muted text-[13px]">{item.meta}</span>
                ) : null}
              </div>
            </TplReveal>
          ))}
        </ul>

        {sourceNote ? (
          <TplReveal>
            <p className="text-tpl-muted max-w-[64ch] text-[13px] leading-[1.6]">
              {sourceNote}
            </p>
          </TplReveal>
        ) : null}
      </Wrap>
    </Band>
  );
}
