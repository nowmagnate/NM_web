import { Band, Wrap, BandHead } from "../parts/Band";
import { Figure } from "../parts/Figure";
import { TplReveal } from "../parts/TplReveal";
import type { Section } from "../schema";

type Props = Extract<Section, { type: "location" }>;

/**
 * Where and when, and the four things a visitor is checking before they set
 * off: the address, today's hours, how to get in, and the phone number.
 *
 * NO EMBEDDED MAP. An iframe from a mapping provider drops a third-party
 * script and a set of cookies onto a page whose only job is a first
 * appointment, costs a second of load on the phone where it is opened, and
 * needs a consent banner in the EU, which is a third of this catalog's market.
 * A link out to the visitor's own map app does the same job, opens in the app
 * they already have their route history in, and costs nothing.
 *
 * `travel` is the parking, the bus route, the step-free entrance. On a
 * practice site that paragraph gets read more than the About page.
 */
export function Location({
  id,
  eyebrow,
  title,
  intro,
  address,
  hours,
  phone,
  email,
  mapsQuery,
  travel,
  image,
  tone,
}: Props) {
  const headingId = id ? `${id}-title` : undefined;
  const mapsHref = mapsQuery
    ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(mapsQuery)}`
    : undefined;

  return (
    <Band id={id} tone={tone} labelledBy={headingId}>
      <Wrap className="flex flex-col gap-[clamp(2.25rem,4.5vw,3.5rem)]">
        <BandHead eyebrow={eyebrow} title={title} intro={intro} id={headingId} />

        <div className="grid gap-[clamp(2rem,4vw,3.5rem)] lg:grid-cols-[1fr_1.1fr] lg:items-start">
          <TplReveal className="flex flex-col gap-8">
            <div className="flex flex-col gap-3">
              <h3 className="text-tpl-muted text-[12px] font-semibold tracking-[0.14em] uppercase">
                Address
              </h3>
              <address className="text-tpl-ink text-[1.05rem] leading-[1.6] not-italic">
                {address.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </address>
              {mapsHref ? (
                <a
                  href={mapsHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="tpl-underline text-tpl-accent-deep w-fit text-[14px] font-semibold"
                >
                  Open in maps
                </a>
              ) : null}
            </div>

            {travel.length ? (
              <ul className="border-tpl-rule flex flex-col gap-2 border-t pt-5">
                {travel.map((item) => (
                  <li key={item} className="text-tpl-muted text-[15px] leading-[1.6]">
                    {item}
                  </li>
                ))}
              </ul>
            ) : null}

            {phone || email ? (
              <div className="border-tpl-rule flex flex-col gap-2 border-t pt-5">
                {phone ? (
                  <a
                    href={`tel:${phone.replace(/[^\d+]/g, "")}`}
                    className="text-tpl-ink text-[1.05rem] font-semibold"
                  >
                    {phone}
                  </a>
                ) : null}
                {email ? (
                  <a
                    href={`mailto:${email}`}
                    className="tpl-underline text-tpl-muted w-fit text-[15px]"
                  >
                    {email}
                  </a>
                ) : null}
              </div>
            ) : null}
          </TplReveal>

          <TplReveal delay={80} className="flex flex-col gap-8">
            <div className="flex flex-col gap-4">
              <h3 className="text-tpl-muted text-[12px] font-semibold tracking-[0.14em] uppercase">
                Opening hours
              </h3>
              <dl className="border-tpl-rule border-t">
                {hours.map((entry) => (
                  <div
                    key={entry.days}
                    className="border-tpl-rule flex items-baseline justify-between gap-6 border-b py-3.5"
                  >
                    <dt className="text-tpl-ink text-[15px] font-medium">
                      {entry.days}
                    </dt>
                    <dd className="text-tpl-muted text-[15px] tabular-nums">
                      {entry.time}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>

            {image ? (
              <Figure
                image={image}
                ratio="16 / 10"
                sizes="(min-width: 1024px) 52vw, 100vw"
              />
            ) : null}
          </TplReveal>
        </div>
      </Wrap>
    </Band>
  );
}
