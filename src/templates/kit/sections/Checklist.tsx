import { Band, Wrap, BandHead } from "../parts/Band";
import { TplButton } from "../parts/TplButton";
import { TplReveal } from "../parts/TplReveal";
import { revealDelay } from "../parts/cascade";
import type { Section } from "../schema";

type Props = Extract<Section, { type: "checklist" }>;

/**
 * Short items in columns, ticked.
 *
 * One component answers four different questions across the catalog, because
 * all four are the same act: a visitor scanning a list for one specific entry.
 * What a clean includes. Which insurers a practice is in network with. Which
 * suburbs a firm covers. What to bring to a first appointment.
 *
 * The tick is drawn as an SVG rather than set as a character, because a
 * checkmark glyph renders differently in every font in the catalog and in
 * several of them not at all. Drawn, it inherits the accent and stays
 * identical across all twenty-four templates.
 *
 * It is `aria-hidden`: a list item that reads "tick, evenings and weekends"
 * to a screen reader is worse than one that reads "evenings and weekends".
 */
function Tick() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 16 16"
      className="text-tpl-accent-deep mt-[3px] h-4 w-4 shrink-0"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M2.5 8.5 L6.5 12.5 L13.5 3.5" />
    </svg>
  );
}

export function Checklist({
  id,
  eyebrow,
  title,
  intro,
  columns,
  note,
  action,
  tone,
  ghost,
}: Props) {
  const headingId = id ? `${id}-title` : undefined;
  const grid =
    columns.length >= 3
      ? "sm:grid-cols-2 lg:grid-cols-3"
      : columns.length === 2
        ? "sm:grid-cols-2"
        : "";

  return (
    <Band id={id} tone={tone} labelledBy={headingId} ghost={ghost}>
      <Wrap className="flex flex-col gap-[clamp(2.25rem,4.5vw,3.5rem)]">
        <BandHead eyebrow={eyebrow} title={title} intro={intro} id={headingId}>
          {action ? <TplButton action={action} className="rounded-tpl-pill" /> : null}
        </BandHead>

        <div className={`grid gap-x-10 gap-y-9 ${grid}`}>
          {columns.map((column, columnIndex) => (
            <TplReveal
              key={column.name ?? columnIndex}
              delay={revealDelay(columnIndex, 80)}
              className="flex flex-col gap-4"
            >
              {column.name ? (
                <h3 className="border-tpl-rule text-tpl-ink border-b pb-3 text-[1.05rem] font-semibold">
                  {column.name}
                </h3>
              ) : null}
              <ul className="flex flex-col gap-2.5">
                {column.items.map((item) => (
                  <li
                    key={item}
                    className="text-tpl-muted flex gap-3 text-[15px] leading-[1.55]"
                  >
                    <Tick />
                    {item}
                  </li>
                ))}
              </ul>
            </TplReveal>
          ))}
        </div>

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
