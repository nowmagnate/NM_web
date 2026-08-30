import { Band, Wrap, BandHead } from "../parts/Band";
import { Figure } from "../parts/Figure";
import { TplReveal } from "../parts/TplReveal";
import { revealDelay } from "../parts/cascade";
import type { Section } from "../schema";

type Props = Extract<Section, { type: "people" }>;

/**
 * Named practitioners with faces.
 *
 * This is most of what "trust" means on a practice site, and it is the band
 * most often left as a stock photograph of a smiling stranger. The layout is
 * built to make that hard: portraits are a tall crop, so a landscape stock
 * image will look wrong in it, and every person carries a role and a
 * credential line, so an entry with nothing to say looks conspicuously empty.
 *
 * Credentials are a list rather than a sentence because they are scanned, not
 * read, and because the letters after a name are the thing a cautious visitor
 * is actually checking.
 */
export function People({ id, eyebrow, title, intro, people, tone }: Props) {
  const headingId = id ? `${id}-title` : undefined;
  const columns =
    people.length >= 4 ? "sm:grid-cols-2 lg:grid-cols-4" : "sm:grid-cols-2 lg:grid-cols-3";

  return (
    <Band id={id} tone={tone} labelledBy={headingId}>
      <Wrap className="flex flex-col gap-[clamp(2.25rem,4.5vw,3.5rem)]">
        <BandHead eyebrow={eyebrow} title={title} intro={intro} id={headingId} />

        <ul className={`grid gap-x-7 gap-y-10 ${columns}`}>
          {people.map((person, index) => (
            <TplReveal
              as="li"
              key={person.name}
              delay={revealDelay(index, 70)}
              className="flex flex-col gap-5"
            >
              <Figure
                image={person.image}
                ratio="4 / 5"
                sizes="(min-width: 1024px) 24vw, (min-width: 640px) 46vw, 100vw"
              />

              <div className="flex flex-col gap-2">
                <h3 className="text-tpl-ink text-[1.2rem] leading-[1.25]">
                  {person.name}
                </h3>
                <p className="text-tpl-accent-deep text-[13px] font-semibold tracking-[0.06em] uppercase">
                  {person.role}
                </p>
                {person.bio ? (
                  <p className="text-tpl-muted text-[15px] leading-[1.6]">
                    {person.bio}
                  </p>
                ) : null}
                {person.credentials.length ? (
                  <ul className="border-tpl-rule mt-1 flex flex-col gap-1 border-t pt-3">
                    {person.credentials.map((credential) => (
                      <li key={credential} className="text-tpl-muted text-[13px]">
                        {credential}
                      </li>
                    ))}
                  </ul>
                ) : null}
              </div>
            </TplReveal>
          ))}
        </ul>
      </Wrap>
    </Band>
  );
}
