import { Band, Wrap, BandHead } from "../parts/Band";
import { Figure } from "../parts/Figure";
import { TplReveal } from "../parts/TplReveal";
import { revealDelay } from "../parts/cascade";
import type { Section } from "../schema";

type Props = Extract<Section, { type: "gallery" }>;

/**
 * Work, results, rooms, transformations.
 *
 * THE BEFORE-AND-AFTER LAYOUT is the interesting half. The two frames are the
 * same size, butted together with a hairline between them and labelled, which
 * sounds obvious and is not what most sites do: the usual treatment is a
 * slider, and a slider hides half the evidence behind an interaction nobody
 * performs on a phone. Two frames side by side make the comparison in the
 * moment the eye lands on them, and they survive a screenshot.
 *
 * The labels are drawn rather than baked into the photography, so a client
 * swapping the images in their config does not have to re-caption anything.
 */
export function Gallery({
  id,
  eyebrow,
  title,
  intro,
  layout,
  items,
  note,
  tone,
  ghost,
}: Props) {
  const headingId = id ? `${id}-title` : undefined;

  return (
    <Band id={id} tone={tone} labelledBy={headingId} ghost={ghost}>
      <Wrap className="flex flex-col gap-[clamp(2.25rem,4.5vw,3.5rem)]">
        <BandHead eyebrow={eyebrow} title={title} intro={intro} id={headingId} />

        <ul
          className={
            layout === "pairs"
              ? "grid gap-x-7 gap-y-10 lg:grid-cols-2"
              : "grid gap-x-6 gap-y-9 sm:grid-cols-2 lg:grid-cols-3"
          }
        >
          {items.map((item, index) => (
            <TplReveal
              as="li"
              key={item.image.src}
              delay={revealDelay(index, 70)}
              className="flex flex-col gap-4"
            >
              {layout === "pairs" && item.after ? (
                <div className="grid grid-cols-2 gap-px">
                  <div className="flex flex-col gap-2">
                    <Figure
                      image={item.image}
                      ratio="4 / 3"
                      sizes="(min-width: 1024px) 24vw, 46vw"
                    />
                    <span className="text-tpl-muted text-[11.5px] font-semibold tracking-[0.14em] uppercase">
                      Before
                    </span>
                  </div>
                  <div className="flex flex-col gap-2">
                    <Figure
                      image={item.after}
                      ratio="4 / 3"
                      sizes="(min-width: 1024px) 24vw, 46vw"
                    />
                    <span className="text-tpl-accent-deep text-[11.5px] font-semibold tracking-[0.14em] uppercase">
                      After
                    </span>
                  </div>
                </div>
              ) : (
                <Figure
                  image={item.image}
                  ratio="4 / 3"
                  sizes="(min-width: 1024px) 32vw, (min-width: 640px) 46vw, 100vw"
                />
              )}

              {item.caption || item.meta ? (
                <div className="flex flex-col gap-1">
                  {item.caption ? (
                    <p className="text-tpl-ink text-[15px] leading-[1.5]">
                      {item.caption}
                    </p>
                  ) : null}
                  {item.meta ? (
                    <p className="text-tpl-muted text-[13px]">{item.meta}</p>
                  ) : null}
                </div>
              ) : null}
            </TplReveal>
          ))}
        </ul>

        {note ? (
          <TplReveal>
            <p className="text-tpl-muted max-w-[68ch] text-[13.5px] leading-[1.6]">
              {note}
            </p>
          </TplReveal>
        ) : null}
      </Wrap>
    </Band>
  );
}
