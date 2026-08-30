import { Band, Wrap, BandHead } from "../parts/Band";
import { TplReveal } from "../parts/TplReveal";
import { revealDelay } from "../parts/cascade";
import type { Section } from "../schema";

type Props = Extract<Section, { type: "faq" }>;

/**
 * Native `<details>` and `<summary>`, on purpose.
 *
 * A hand-built accordion means a state hook, an aria-expanded, a roving
 * keyboard handler and a client boundary, and the browser has shipped all of
 * that correctly for years. More to the point on a statically exported page:
 * `<details>` opens with JavaScript disabled, is searchable by the browser's
 * own find-in-page in Chrome, and its content is in the markup for a crawler
 * either way. A practice site whose answers are invisible to search is missing
 * the reason it has an FAQ at all.
 *
 * The marker is replaced with a drawn cross so it inherits the template's ink
 * rather than the browser's triangle.
 */
export function Faq({ id, eyebrow, title, intro, items, tone }: Props) {
  const headingId = id ? `${id}-title` : undefined;

  return (
    <Band id={id} tone={tone} labelledBy={headingId}>
      <Wrap className="grid gap-[clamp(2rem,4vw,3.5rem)] lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
        <BandHead eyebrow={eyebrow} title={title} intro={intro} id={headingId} />

        <div className="border-tpl-rule border-t">
          {items.map((item, index) => (
            <TplReveal key={item.q} delay={revealDelay(index, 50, 300)}>
              <details className="group border-tpl-rule border-b">
                <summary className="text-tpl-ink flex cursor-pointer list-none items-start justify-between gap-6 py-5 text-[1.05rem] leading-[1.45] font-medium [&::-webkit-details-marker]:hidden">
                  {item.q}
                  <span
                    aria-hidden="true"
                    className="relative mt-1.5 h-3 w-3 shrink-0"
                  >
                    <span className="bg-tpl-accent-deep absolute top-1/2 left-0 h-px w-3 -translate-y-1/2" />
                    <span className="bg-tpl-accent-deep absolute top-0 left-1/2 h-3 w-px -translate-x-1/2 transition-transform duration-200 group-open:scale-y-0" />
                  </span>
                </summary>
                <p className="text-tpl-muted max-w-[62ch] pb-6 text-[15px] leading-[1.65]">
                  {item.a}
                </p>
              </details>
            </TplReveal>
          ))}
        </div>
      </Wrap>
    </Band>
  );
}
