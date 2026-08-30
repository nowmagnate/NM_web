import { Band, Wrap } from "../parts/Band";
import { TplForm } from "../parts/TplForm";
import { TplReveal } from "../parts/TplReveal";
import type { Section } from "../schema";

type Props = Extract<Section, { type: "booking" }> & { endpoint?: string };

/**
 * The band the whole page has been pointing at.
 *
 * It runs on the inverted ground, which is the one dark band a template is
 * allowed. That is not decoration: after nine bands of the same ground, the
 * change of field is the strongest available signal that this is the end of
 * the argument and the place to act, and it costs nothing to load.
 *
 * The aside beside the form exists because a form is a wall. Some visitors
 * will not fill one in at nine at night with a toothache, and the phone number
 * has to be the same size as the form, not a footnote under it.
 */
export function Booking({
  id,
  eyebrow,
  title,
  intro,
  fields,
  submitLabel,
  note,
  aside,
  endpoint,
  tone,
  ghost,
}: Props) {
  const headingId = id ? `${id}-title` : undefined;

  return (
    <Band id={id} tone={tone} labelledBy={headingId} ghost={ghost}>
      <Wrap className="grid gap-[clamp(2.5rem,5vw,4rem)] lg:grid-cols-[1fr_1.15fr] lg:items-start">
        <TplReveal className="flex flex-col gap-6">
          {eyebrow ? (
            <span className="text-tpl-accent-deep text-[12px] font-semibold tracking-[0.18em] uppercase">
              {eyebrow}
            </span>
          ) : null}

          {title ? (
            <h2
              id={headingId}
              className="text-tpl-ink max-w-[16ch] text-[clamp(1.9rem,3.8vw,2.85rem)]"
            >
              {title}
            </h2>
          ) : null}

          {intro ? (
            <p className="text-tpl-muted max-w-[48ch] text-[17px] leading-[1.62]">
              {intro}
            </p>
          ) : null}

          {aside ? (
            <div className="border-tpl-rule mt-2 flex flex-col gap-4 border-t pt-7">
              <h3 className="text-tpl-ink text-[1.1rem]">{aside.title}</h3>
              <ul className="flex flex-col gap-2.5">
                {aside.items.map((item) => (
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
              {aside.phone ? (
                <a
                  href={`tel:${aside.phone.replace(/[^\d+]/g, "")}`}
                  className="text-tpl-ink mt-1 text-[1.35rem] font-semibold"
                >
                  {aside.phone}
                </a>
              ) : null}
            </div>
          ) : null}
        </TplReveal>

        <TplReveal
          delay={80}
          className="bg-tpl-surface rounded-tpl p-[clamp(1.5rem,3vw,2.5rem)]"
        >
          <TplForm
            fields={fields}
            submitLabel={submitLabel}
            note={note}
            endpoint={endpoint}
          />
        </TplReveal>
      </Wrap>
    </Band>
  );
}
