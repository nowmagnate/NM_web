import { Band, Wrap, BandHead } from "../parts/Band";
import { Figure } from "../parts/Figure";
import { TplButton } from "../parts/TplButton";
import { TplReveal } from "../parts/TplReveal";
import { revealDelay } from "../parts/cascade";
import type { Section } from "../schema";

type Props = Extract<Section, { type: "projectIndex" }>;

/**
 * THE SWAPPABLE SLOT for the portfolio-led archetype.
 *
 * WHY IT IS ASYMMETRIC BY DEFAULT. Every project at the same size reads as a
 * contact sheet, and a contact sheet flattens a portfolio into inventory: the
 * eye scans it the way it scans a search result, and nothing in it is allowed
 * to be more important than anything else. Alternating one full-width project
 * against a pair gives the index a rhythm and lets a studio put its strongest
 * work at the size it deserves without having to caption it "featured".
 *
 * The pattern is: one wide, two side by side, repeat. Index 0, 3, 6 and so on
 * take the full measure. It is arithmetic rather than a per-project flag,
 * because a flag is one more thing a client has to understand and get right,
 * and reordering the array is a decision they already know how to make.
 *
 * `grid` exists for the templates where the work genuinely is a set of equals:
 * a photographer's genres, a stager's rooms.
 */
export function ProjectIndex({
  id,
  eyebrow,
  title,
  intro,
  layout,
  projects,
  note,
  action,
  tone,
  ghost,
}: Props) {
  const headingId = id ? `${id}-title` : undefined;
  const asymmetric = layout === "asymmetric";

  return (
    <Band id={id} tone={tone} labelledBy={headingId} ghost={ghost}>
      <Wrap className="flex flex-col gap-[clamp(2.25rem,4.5vw,3.5rem)]">
        <BandHead eyebrow={eyebrow} title={title} intro={intro} id={headingId}>
          {action ? <TplButton action={action} /> : null}
        </BandHead>

        <ul
          className={
            asymmetric
              ? "grid grid-cols-1 gap-x-7 gap-y-[clamp(2.5rem,5vw,4rem)] md:grid-cols-2"
              : "grid grid-cols-1 gap-x-7 gap-y-10 sm:grid-cols-2 lg:grid-cols-3"
          }
        >
          {projects.map((project, index) => {
            const wide = asymmetric && index % 3 === 0;

            return (
              <TplReveal
                as="li"
                key={project.title}
                delay={revealDelay(index, 70)}
                className={`flex flex-col gap-5 ${wide ? "md:col-span-2" : ""}`}
              >
                <Figure
                  image={project.image}
                  ratio={wide ? "16 / 9" : "4 / 3"}
                  sizes={
                    wide
                      ? "(min-width: 1024px) 1100px, 100vw"
                      : "(min-width: 1024px) 46vw, 100vw"
                  }
                />

                <div
                  className={`flex flex-col gap-2 ${wide ? "md:max-w-[64ch]" : ""}`}
                >
                  <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
                    <h3
                      className={`text-tpl-ink leading-[1.2] ${
                        wide ? "text-[clamp(1.4rem,2.6vw,2rem)]" : "text-[1.2rem]"
                      }`}
                    >
                      {project.title}
                    </h3>
                    {project.meta ? (
                      <span className="text-tpl-muted text-[13px] tracking-[0.04em]">
                        {project.meta}
                      </span>
                    ) : null}
                  </div>

                  {project.body ? (
                    <p className="text-tpl-muted text-[15px] leading-[1.6]">
                      {project.body}
                    </p>
                  ) : null}
                </div>
              </TplReveal>
            );
          })}
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
