import { Band, Wrap } from "../parts/Band";
import { TplReveal } from "../parts/TplReveal";
import { revealDelay } from "../parts/cascade";
import type { Section } from "../schema";

type Props = Extract<Section, { type: "assurance" }>;

/**
 * The band directly under the hero.
 *
 * Its job is to answer the objection that stops the booking, not to restate
 * the offer. For a dental practice that is cost, pain and being judged; for a
 * family doctor it is whether the practice is even taking new patients. So
 * this is written as three or four plain answers rather than as feature cards,
 * and it carries no icons: an icon here is decoration standing where a
 * sentence should be.
 *
 * Numbered rules divide the columns. The kit divides with hairlines and
 * whitespace rather than shadow throughout, which is what stops the templates
 * from all reading as the same card library recoloured.
 */
export function Assurance({ id, eyebrow, title, intro, items, tone }: Props) {
  return (
    <Band id={id} tone={tone}>
      <Wrap className="flex flex-col gap-[clamp(2rem,4vw,3.25rem)]">
        {eyebrow || title || intro ? (
          <TplReveal className="flex flex-col gap-4">
            {eyebrow ? (
              <span className="text-tpl-accent-deep text-[12px] font-semibold tracking-[0.18em] uppercase">
                {eyebrow}
              </span>
            ) : null}
            {title ? (
              <h2 className="text-tpl-ink max-w-[24ch] text-[clamp(1.6rem,3vw,2.25rem)]">
                {title}
              </h2>
            ) : null}
            {intro ? (
              <p className="text-tpl-muted max-w-[54ch] text-[16px] leading-[1.6]">
                {intro}
              </p>
            ) : null}
          </TplReveal>
        ) : null}

        <ul className="border-tpl-rule grid gap-px border-t md:grid-cols-2 lg:grid-cols-4">
          {items.map((item, index) => (
            <TplReveal
              as="li"
              key={item.title}
              delay={revealDelay(index)}
              className="border-tpl-rule flex flex-col gap-3 border-b pt-7 pb-8 md:pr-8 lg:border-b-0"
            >
              <h3 className="text-tpl-ink text-[1.15rem] leading-[1.25]">
                {item.title}
              </h3>
              <p className="text-tpl-muted text-[15px] leading-[1.6]">{item.body}</p>
            </TplReveal>
          ))}
        </ul>
      </Wrap>
    </Band>
  );
}
