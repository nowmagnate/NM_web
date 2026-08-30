import { Band, Wrap, BandHead } from "../parts/Band";
import { TplButton } from "../parts/TplButton";
import { TplReveal } from "../parts/TplReveal";
import { revealDelay } from "../parts/cascade";
import type { Section } from "../schema";

type Props = Extract<Section, { type: "pricing" }>;

/**
 * A ruled rate table, deliberately not a set of tier cards.
 *
 * Three cards with a highlighted middle one is the default shape for pricing
 * on the web, and it is the wrong shape for almost every practice in this
 * catalog: a dentist does not sell Good, Better and Best, they publish a fee
 * for a check-up. Cards imply a choice between packages. A table implies a
 * published rate, which is the more credible claim and the one these buyers
 * can actually make.
 *
 * `note` is where the honest caveat goes: that these are starting prices, that
 * a plan is quoted after an examination, that insurance changes the number.
 * A price with no caveat gets read as a quote, and gets argued about later.
 */
export function Pricing({
  id,
  eyebrow,
  title,
  intro,
  nameLabel,
  priceLabel,
  rows,
  note,
  action,
  tone,
}: Props) {
  const headingId = id ? `${id}-title` : undefined;

  return (
    <Band id={id} tone={tone} labelledBy={headingId}>
      <Wrap className="flex flex-col gap-[clamp(2.25rem,4.5vw,3.5rem)]">
        <BandHead eyebrow={eyebrow} title={title} intro={intro} id={headingId} />

        <div className="grid gap-[clamp(2rem,4vw,3.5rem)] lg:grid-cols-[1.55fr_1fr] lg:items-start">
          <table className="w-full border-collapse text-left">
            <caption className="sr-only">{title ?? "Prices"}</caption>
            <thead>
              <tr className="border-tpl-rule-strong border-b">
                <th
                  scope="col"
                  className="text-tpl-muted pb-3 text-[12px] font-semibold tracking-[0.14em] uppercase"
                >
                  {nameLabel}
                </th>
                <th
                  scope="col"
                  className="text-tpl-muted pb-3 text-right text-[12px] font-semibold tracking-[0.14em] uppercase"
                >
                  {priceLabel}
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, index) => (
                <tr key={row.name} className="border-tpl-rule border-b align-baseline">
                  <th scope="row" className="py-5 pr-6 font-normal">
                    <TplReveal delay={revealDelay(index, 45, 320)}>
                      <span className="text-tpl-ink block text-[1.05rem] leading-[1.35] font-medium">
                        {row.name}
                      </span>
                      {row.detail ? (
                        <span className="text-tpl-muted mt-1 block max-w-[52ch] text-[14px] leading-[1.55]">
                          {row.detail}
                        </span>
                      ) : null}
                    </TplReveal>
                  </th>
                  <td className="text-tpl-ink py-5 text-right text-[1.05rem] font-semibold whitespace-nowrap tabular-nums">
                    {row.price}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {note || action ? (
            <TplReveal
              delay={80}
              className="bg-tpl-wash rounded-tpl flex flex-col gap-5 p-[clamp(1.75rem,3vw,2.25rem)]"
            >
              {note ? (
                <p className="text-tpl-ink text-[15px] leading-[1.65]">{note}</p>
              ) : null}
              {action ? <TplButton action={action} /> : null}
            </TplReveal>
          ) : null}
        </div>
      </Wrap>
    </Band>
  );
}
