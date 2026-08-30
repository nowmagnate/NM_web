import { Band, Wrap, BandHead } from "../parts/Band";
import { TplButton } from "../parts/TplButton";
import { TplReveal } from "../parts/TplReveal";
import type { Section } from "../schema";

type Props = Extract<Section, { type: "audienceSplit" }>;

/**
 * Two doors, side by side.
 *
 * Built for the one template in this catalog that has to serve two audiences
 * who want opposite things on the same page: a property manager selling to
 * landlords while also being the person a tenant reports a broken boiler to.
 *
 * THE USUAL SOLUTIONS ARE BOTH WRONG. A tab control hides one audience from the
 * other, so half of your visitors land on a page that appears to be addressed
 * to somebody else and leave. A toggle asks a person to classify themselves
 * before they have read anything, which is a small demand made at the exact
 * moment attention is cheapest.
 *
 * Two panels, both visible, both complete, is the honest shape. Everybody can
 * see immediately that the other half exists and that it is not the half they
 * want, and nobody has to press anything to find that out.
 *
 * The panels sit on the surface tone rather than being outlined, because a
 * border here would read as two cards on a page rather than as two halves of
 * one decision.
 */
export function AudienceSplit({
  id,
  eyebrow,
  title,
  intro,
  panels,
  tone,
  ghost,
}: Props) {
  const headingId = id ? `${id}-title` : undefined;

  return (
    <Band id={id} tone={tone} labelledBy={headingId} ghost={ghost}>
      <Wrap className="flex flex-col gap-[clamp(2rem,4vw,3rem)]">
        <BandHead eyebrow={eyebrow} title={title} intro={intro} id={headingId} />

        <div className="grid gap-px md:grid-cols-2">
          {panels.map((panel, index) => (
            <TplReveal
              key={panel.title}
              delay={index * 90}
              className="bg-tpl-surface flex flex-col gap-5 p-[clamp(1.75rem,3.5vw,2.75rem)]"
            >
              {panel.eyebrow ? (
                <span className="text-tpl-accent-deep text-[12px] font-semibold tracking-[0.18em] uppercase">
                  {panel.eyebrow}
                </span>
              ) : null}

              <h3 className="text-tpl-ink text-[clamp(1.5rem,2.8vw,2.1rem)] leading-[1.15] font-bold tracking-[-0.02em]">
                {panel.title}
              </h3>

              <p className="text-tpl-muted max-w-[46ch] text-[15.5px] leading-[1.62]">
                {panel.body}
              </p>

              <ul className="border-tpl-rule flex flex-1 flex-col gap-2.5 border-t pt-5">
                {panel.items.map((item) => (
                  <li
                    key={item}
                    className="text-tpl-muted flex gap-3 text-[15px] leading-[1.55]"
                  >
                    <span
                      aria-hidden="true"
                      className="bg-tpl-accent mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full"
                    />
                    {item}
                  </li>
                ))}
              </ul>

              {panel.action ? (
                <div className="mt-1">
                  <TplButton action={panel.action} />
                </div>
              ) : null}
            </TplReveal>
          ))}
        </div>
      </Wrap>
    </Band>
  );
}
