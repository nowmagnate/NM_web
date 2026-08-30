import { Band, Wrap } from "../parts/Band";
import { Figure } from "../parts/Figure";
import { TplButton } from "../parts/TplButton";
import { TplReveal } from "../parts/TplReveal";
import type { Section } from "../schema";

type Props = Extract<Section, { type: "feature" }>;

/**
 * One subject, at length. A photograph beside a passage of prose and a short
 * spec list.
 *
 * This is the band a portfolio-led template uses when it finally has to say
 * something in sentences, and it is deliberately generic because the same
 * shape does six different jobs across the catalog: one project in depth, the
 * practice's own editorial, an about page, how a consultancy engages, seasonal
 * care, plans and specifications.
 *
 * `media` flips the side. It matters because these templates often carry two
 * features on one page, and two in the same orientation reads as a stutter
 * rather than a rhythm.
 *
 * The prose is an array of paragraphs rather than one string with line breaks
 * in it, so a client editing a config cannot accidentally produce a wall of
 * text by forgetting where the breaks went.
 */
export function Feature({
  id,
  eyebrow,
  title,
  intro,
  image,
  media,
  body,
  facts,
  action,
  tone,
  ghost,
}: Props) {
  const headingId = id ? `${id}-title` : undefined;

  return (
    <Band id={id} tone={tone} labelledBy={headingId} ghost={ghost}>
      <Wrap>
        <div className="grid items-center gap-[clamp(2rem,4.5vw,4rem)] lg:grid-cols-2">
          <TplReveal
            className={`flex flex-col gap-5 ${media === "left" ? "lg:order-2" : ""}`}
          >
            {eyebrow ? (
              <span className="text-tpl-accent-deep text-[12px] font-semibold tracking-[0.18em] uppercase">
                {eyebrow}
              </span>
            ) : null}

            {title ? (
              <h2
                id={headingId}
                className="text-tpl-ink max-w-[18ch] text-[clamp(1.8rem,3.6vw,2.9rem)] font-bold tracking-[-0.03em]"
              >
                {title}
              </h2>
            ) : null}

            {intro ? (
              <p className="text-tpl-ink max-w-[52ch] text-[17px] leading-[1.6] font-medium">
                {intro}
              </p>
            ) : null}

            <div className="flex flex-col gap-4">
              {body.map((paragraph) => (
                <p
                  key={paragraph.slice(0, 40)}
                  className="text-tpl-muted max-w-[56ch] text-[15.5px] leading-[1.65]"
                >
                  {paragraph}
                </p>
              ))}
            </div>

            {facts.length ? (
              <dl className="border-tpl-rule mt-1 grid grid-cols-2 gap-x-6 gap-y-4 border-t pt-5">
                {facts.map((fact) => (
                  <div key={fact.label} className="flex flex-col gap-1">
                    <dt className="text-tpl-muted text-[11.5px] font-semibold tracking-[0.14em] uppercase">
                      {fact.label}
                    </dt>
                    <dd className="text-tpl-ink text-[15px] leading-[1.4] font-medium">
                      {fact.value}
                    </dd>
                  </div>
                ))}
              </dl>
            ) : null}

            {action ? (
              <div className="mt-1">
                <TplButton action={action} />
              </div>
            ) : null}
          </TplReveal>

          <TplReveal
            delay={80}
            className={media === "left" ? "lg:order-1" : undefined}
          >
            <Figure
              image={image}
              ratio="4 / 5"
              sizes="(min-width: 1024px) 46vw, 100vw"
            />
          </TplReveal>
        </div>
      </Wrap>
    </Band>
  );
}
