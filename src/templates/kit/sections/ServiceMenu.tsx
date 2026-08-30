import { Band, Wrap, BandHead } from "../parts/Band";
import { TplButton } from "../parts/TplButton";
import { TplReveal } from "../parts/TplReveal";
import { revealDelay } from "../parts/cascade";
import type { Section } from "../schema";

type Props = Extract<Section, { type: "serviceMenu" }>;

/**
 * THE SWAPPABLE SLOT. This is the one band that changes shape between
 * templates inside the booking-led archetype, and it is why eight quite
 * different practices can share a skeleton: it is a treatment list for a
 * dentist, a class timetable for a studio, a condition index for a physio, a
 * room-size price list for a cleaner.
 *
 * `layout: "menu"` is the default and the better one. A ruled list with the
 * price on the right is how a menu has looked for a century, it scans in one
 * pass, and it puts twelve treatments on a screen where cards would fit four.
 * `layout: "cards"` exists for the practices with six services and a
 * photograph for each.
 *
 * Groups are optional, so a flat list of six and a menu of four groups are the
 * same component with the same code path.
 */
export function ServiceMenu({
  id,
  eyebrow,
  title,
  intro,
  groups,
  layout,
  note,
  action,
  tone,
  ghost,
}: Props) {
  const headingId = id ? `${id}-title` : undefined;

  // Groups are optional, and when a config omits their names there is no h3
  // between the band's h2 and the item headings. Hard-coding the items as h4
  // therefore produced an h2 -> h4 jump on every template using the flat card
  // layout: invisible on screen, wrong to anything navigating by heading. The
  // level follows the structure instead.
  //
  // Found by `npm run check:templates` on five templates at once, which is the
  // whole argument for auditing the built HTML rather than the source.
  const ItemHeading = groups.some((group) => Boolean(group.name)) ? "h4" : "h3";

  return (
    <Band id={id} tone={tone} labelledBy={headingId} ghost={ghost}>
      <Wrap className="flex flex-col gap-[clamp(2.25rem,4.5vw,3.5rem)]">
        <BandHead eyebrow={eyebrow} title={title} intro={intro} id={headingId}>
          {action ? <TplButton action={action} /> : null}
        </BandHead>

        <div className="flex flex-col gap-[clamp(2rem,4vw,3rem)]">
          {groups.map((group, groupIndex) => (
            <div key={group.name ?? groupIndex} className="flex flex-col gap-5">
              {group.name ? (
                <TplReveal className="flex items-center gap-4">
                  <h3 className="text-tpl-ink shrink-0 text-[1.05rem] font-semibold tracking-[0.06em] uppercase">
                    {group.name}
                  </h3>
                  <span aria-hidden="true" className="bg-tpl-rule h-px flex-1" />
                </TplReveal>
              ) : null}

              {layout === "cards" ? (
                <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {group.items.map((item, index) => (
                    <TplReveal
                      as="li"
                      key={item.name}
                      delay={revealDelay(index)}
                      className="border-tpl-rule rounded-tpl flex flex-col gap-3 border p-7"
                    >
                      <ItemHeading className="text-tpl-ink text-[1.2rem] leading-[1.25]">
                        {item.name}
                      </ItemHeading>
                      {item.body ? (
                        <p className="text-tpl-muted flex-1 text-[15px] leading-[1.6]">
                          {item.body}
                        </p>
                      ) : null}
                      {item.price || item.meta ? (
                        <p className="text-tpl-accent-deep text-[14px] font-semibold">
                          {[item.price, item.meta].filter(Boolean).join("  ·  ")}
                        </p>
                      ) : null}
                    </TplReveal>
                  ))}
                </ul>
              ) : (
                <ul className="border-tpl-rule border-t">
                  {group.items.map((item, index) => (
                    <TplReveal
                      as="li"
                      key={item.name}
                      delay={revealDelay(index, 45, 360)}
                      className="border-tpl-rule border-b"
                    >
                      <div className="flex flex-col gap-2 py-6 sm:flex-row sm:items-baseline sm:gap-8">
                        <div className="flex flex-1 flex-col gap-1.5">
                          <ItemHeading className="text-tpl-ink text-[1.15rem] leading-[1.3]">
                            {item.name}
                          </ItemHeading>
                          {item.body ? (
                            <p className="text-tpl-muted max-w-[62ch] text-[15px] leading-[1.6]">
                              {item.body}
                            </p>
                          ) : null}
                        </div>

                        {item.price || item.meta ? (
                          <div className="flex shrink-0 flex-col gap-1 sm:items-end sm:text-right">
                            {item.price ? (
                              <span className="text-tpl-ink text-[1.05rem] font-semibold tabular-nums">
                                {item.price}
                              </span>
                            ) : null}
                            {item.meta ? (
                              <span className="text-tpl-muted text-[13px]">
                                {item.meta}
                              </span>
                            ) : null}
                          </div>
                        ) : null}
                      </div>
                    </TplReveal>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>

        {note ? (
          <TplReveal>
            <p className="text-tpl-muted max-w-[64ch] text-[14px] leading-[1.6]">
              {note}
            </p>
          </TplReveal>
        ) : null}
      </Wrap>
    </Band>
  );
}
