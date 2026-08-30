import { Band, Wrap, BandHead } from "../parts/Band";
import { TplReveal } from "../parts/TplReveal";
import { revealDelay } from "../parts/cascade";
import type { Section } from "../schema";

type Props = Extract<Section, { type: "credits" }>;

/**
 * A ruled list of things somebody else said or granted.
 *
 * Press, awards, publications, a vendor network, a licence, a warranty, a
 * partner programme. All the same shape, all third-party validation, and all
 * of them get a plain ruled list rather than a card. A card decorates. The only
 * thing that makes this band persuasive is that it looks like a record, and a
 * record is a list with dates in it.
 *
 * NO LOGOS, BY RULE. The reflexive build for a press band is a row of
 * publication marks, which means putting real mastheads on the page. On a
 * fictional demo that is the same problem as a competitor's sign in the
 * photography, and on a real client site it is usually a permission nobody
 * actually has. Names set in the template's own display face are the honest
 * version and, as it happens, the better looking one.
 */
export function Credits({
  id,
  eyebrow,
  title,
  intro,
  items,
  note,
  tone,
  ghost,
}: Props) {
  const headingId = id ? `${id}-title` : undefined;

  return (
    <Band id={id} tone={tone} labelledBy={headingId} ghost={ghost}>
      <Wrap className="grid gap-[clamp(2rem,4vw,3.5rem)] lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
        <BandHead eyebrow={eyebrow} title={title} intro={intro} id={headingId} />

        <ul className="border-tpl-rule border-t">
          {items.map((item, index) => (
            <TplReveal
              as="li"
              key={item.name + index}
              delay={revealDelay(index, 45, 320)}
              className="border-tpl-rule flex flex-wrap items-baseline justify-between gap-x-8 gap-y-1 border-b py-4"
            >
              <div className="flex flex-1 flex-col gap-1">
                <span className="text-tpl-ink text-[1.05rem] leading-[1.3] font-medium">
                  {item.name}
                </span>
                {item.detail ? (
                  <span className="text-tpl-muted max-w-[54ch] text-[14px] leading-[1.55]">
                    {item.detail}
                  </span>
                ) : null}
              </div>

              {item.year ? (
                <span className="text-tpl-muted shrink-0 text-[14px] tabular-nums">
                  {item.year}
                </span>
              ) : null}
            </TplReveal>
          ))}
        </ul>
      </Wrap>

      {note ? (
        <Wrap className="mt-7">
          <TplReveal>
            <p className="text-tpl-muted max-w-[68ch] text-[13.5px] leading-[1.6]">
              {note}
            </p>
          </TplReveal>
        </Wrap>
      ) : null}
    </Band>
  );
}
