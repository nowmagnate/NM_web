import { Band, Wrap, Rule } from "../parts/Band";
import type { Section } from "../schema";

type Props = Extract<Section, { type: "footer" }> & {
  brandName: string;
  tagline?: string;
  address: string[];
  phone?: string;
  email?: string;
  social: { label: string; href: string }[];
};

/**
 * The foot of the page, and the last place the practice's address and phone
 * number appear.
 *
 * `legal` is a plain string array rather than a fixed set of fields because
 * the requirement genuinely differs by template and market: a dental practice
 * in the UK names its regulator, a US law firm needs an attorney advertising
 * notice, a German practice needs an Impressum line. A schema that guessed at
 * those would be wrong in most of the twenty-four cases, so it takes the lines
 * the practice was given by whoever regulates it.
 */
export function Footer({
  id,
  columns,
  note,
  legal,
  brandName,
  tagline,
  address,
  phone,
  email,
  social,
}: Props) {
  const year = new Date().getFullYear();

  return (
    <Band id={id} tone="surface" as="footer" className="py-[clamp(3rem,6vw,4.5rem)]">
      <Wrap className="flex flex-col gap-[clamp(2.5rem,5vw,3.5rem)]">
        <div className="grid gap-10 md:grid-cols-[1.3fr_2fr]">
          <div className="flex flex-col gap-4">
            <span className="font-tpl-display text-tpl-ink text-[1.35rem] font-semibold tracking-[-0.02em]">
              {brandName}
            </span>
            {tagline ? (
              <p className="text-tpl-muted max-w-[34ch] text-[15px] leading-[1.6]">
                {tagline}
              </p>
            ) : null}

            <address className="text-tpl-muted text-[15px] leading-[1.7] not-italic">
              {address.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </address>

            <div className="flex flex-col gap-1">
              {phone ? (
                <a
                  href={`tel:${phone.replace(/[^\d+]/g, "")}`}
                  className="text-tpl-ink text-[15px] font-semibold"
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
          </div>

          {columns.length || social.length ? (
            <div className="grid gap-8 sm:grid-cols-3">
              {columns.map((column) => (
                <nav key={column.title} aria-label={column.title} className="flex flex-col gap-3">
                  <h2 className="text-tpl-ink text-[12px] font-semibold tracking-[0.14em] uppercase">
                    {column.title}
                  </h2>
                  <ul className="flex flex-col gap-2">
                    {column.links.map((link) => (
                      <li key={link.href + link.label}>
                        <a
                          href={link.href}
                          className="tpl-underline text-tpl-muted hover:text-tpl-ink text-[15px] transition-colors duration-200"
                        >
                          {link.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </nav>
              ))}

              {social.length ? (
                <nav aria-label="Social" className="flex flex-col gap-3">
                  <h2 className="text-tpl-ink text-[12px] font-semibold tracking-[0.14em] uppercase">
                    Follow
                  </h2>
                  <ul className="flex flex-col gap-2">
                    {social.map((link) => (
                      <li key={link.href}>
                        <a
                          href={link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="tpl-underline text-tpl-muted hover:text-tpl-ink text-[15px] transition-colors duration-200"
                        >
                          {link.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </nav>
              ) : null}
            </div>
          ) : null}
        </div>

        {/* The wordmark at sign scale. It is the last thing on the page and
            the only place the practice's name is set as a graphic rather than
            as a label, which is what makes a footer feel like the end of
            something instead of a list of links that stopped. Cropped by the
            band, so it reads as an object the page is resting on. */}
        <div
          aria-hidden="true"
          className="font-tpl-display text-tpl-ink/12 -mx-[var(--tpl-gutter)] overflow-hidden px-[var(--tpl-gutter)] text-[clamp(3.5rem,15vw,12rem)] leading-[0.82] font-bold tracking-[-0.045em] whitespace-nowrap select-none"
        >
          {brandName}
        </div>

        <Rule />

        <div className="flex flex-col gap-4">
          {note ? (
            <p className="text-tpl-muted max-w-[72ch] text-[13px] leading-[1.6]">
              {note}
            </p>
          ) : null}

          {legal.length ? (
            <ul className="flex flex-col gap-1.5">
              {legal.map((line) => (
                <li key={line} className="text-tpl-muted text-[13px] leading-[1.6]">
                  {line}
                </li>
              ))}
            </ul>
          ) : null}

          <p className="text-tpl-muted text-[13px]">
            {`© ${year} ${brandName}`}
          </p>
        </div>
      </Wrap>
    </Band>
  );
}
