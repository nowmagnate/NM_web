"use client";

import { useMemo, useState } from "react";
import { Band, Wrap, BandHead } from "../parts/Band";
import { Figure } from "../parts/Figure";
import { TplButton } from "../parts/TplButton";
import { TplReveal } from "../parts/TplReveal";
import { revealDelay } from "../parts/cascade";
import { cn } from "@/lib/cn";
import type { Section } from "../schema";

type Props = Extract<Section, { type: "listings" }>;

/**
 * The inventory archetype's swappable slot: a searchable grid of things you
 * might buy or rent.
 *
 * IT FILTERS FOR REAL, and that mattered enough to make this the only client
 * component among the content sections. The obvious build for "hero with
 * search" on a statically exported page is a search box that does nothing, or
 * one that posts somewhere that does not exist. Both are a lie told in the
 * first viewport of a page whose entire job is finding a property, and a buyer
 * demoing this template would find out in about four seconds.
 *
 * So the filtering happens here, in the browser, over the array already in the
 * page. No server, no index, no API. It works on a static export, it works
 * offline, and it is genuinely useful on a list of the size a single agent
 * actually publishes.
 *
 * EVERY CARD IS THE SAME SIZE, unlike `projectIndex` where the first is wide.
 * A portfolio's order is an argument and weighting one entry is a claim the
 * studio is making. A property list is inventory, and making one listing
 * bigger is a claim the agent has not earned.
 *
 * WITHOUT JAVASCRIPT the filter row simply never appears and every listing is
 * rendered, which is the correct degradation: a visitor gets the full list
 * rather than an empty grid behind a control that does not work.
 */
export function Listings({
  id,
  eyebrow,
  title,
  intro,
  filters,
  items,
  note,
  action,
  tone,
  ghost,
}: Props) {
  const headingId = id ? `${id}-title` : undefined;
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("all");

  // Derived from the data rather than configured separately, so the dropdown
  // cannot drift out of sync with the listings it filters.
  const statuses = useMemo(
    () => [...new Set(items.map((item) => item.status).filter(Boolean))] as string[],
    [items],
  );

  const shown = useMemo(() => {
    const q = query.trim().toLowerCase();
    return items.filter((item) => {
      if (status !== "all" && item.status !== status) return false;
      if (!q) return true;
      return (
        item.title.toLowerCase().includes(q) ||
        item.address.toLowerCase().includes(q) ||
        item.meta.some((m) => m.toLowerCase().includes(q))
      );
    });
  }, [items, query, status]);

  const field =
    "rounded-tpl border border-tpl-rule-strong bg-tpl-bg px-4 py-3 text-[15px] text-tpl-ink " +
    "placeholder:text-tpl-muted focus:border-tpl-accent-deep focus:outline-none " +
    "transition-colors duration-200 ease-tpl";

  return (
    <Band id={id} tone={tone} labelledBy={headingId} ghost={ghost}>
      <Wrap className="flex flex-col gap-[clamp(2rem,4vw,3rem)]">
        <BandHead eyebrow={eyebrow} title={title} intro={intro} id={headingId}>
          {action ? <TplButton action={action} /> : null}
        </BandHead>

        {filters ? (
          <TplReveal className="border-tpl-rule flex flex-col gap-3 border-y py-4 sm:flex-row sm:items-center">
            <label htmlFor={`${id ?? "listings"}-q`} className="sr-only">
              Search listings
            </label>
            <input
              id={`${id ?? "listings"}-q`}
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search by street, area or size"
              className={cn(field, "flex-1")}
            />

            {statuses.length ? (
              <>
                <label htmlFor={`${id ?? "listings"}-s`} className="sr-only">
                  Filter by status
                </label>
                <select
                  id={`${id ?? "listings"}-s`}
                  value={status}
                  onChange={(event) => setStatus(event.target.value)}
                  className={cn(field, "sm:w-[220px]")}
                >
                  <option value="all">All listings</option>
                  {statuses.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </>
            ) : null}

            <p
              aria-live="polite"
              className="text-tpl-muted shrink-0 text-[14px] tabular-nums sm:w-[150px] sm:text-right"
            >
              {shown.length} of {items.length}
            </p>
          </TplReveal>
        ) : null}

        {shown.length ? (
          <ul className="grid gap-x-7 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
            {shown.map((item, index) => (
              <TplReveal
                as="li"
                key={item.address}
                delay={revealDelay(index, 55, 330)}
                className="flex flex-col gap-4"
              >
                <div className="relative">
                  <Figure
                    image={item.image}
                    ratio="4 / 3"
                    sizes="(min-width: 1024px) 32vw, (min-width: 640px) 46vw, 100vw"
                  />
                  {item.status ? (
                    <span className="bg-tpl-bg text-tpl-ink rounded-tpl absolute top-3 left-3 px-3 py-1.5 text-[11.5px] font-semibold tracking-[0.08em] uppercase">
                      {item.status}
                    </span>
                  ) : null}
                </div>

                <div className="flex flex-col gap-2">
                  <div className="flex items-baseline justify-between gap-4">
                    <h3 className="text-tpl-ink text-[1.15rem] leading-[1.25]">
                      {item.title}
                    </h3>
                    <span className="text-tpl-ink shrink-0 text-[1.05rem] font-semibold tabular-nums">
                      {item.price}
                    </span>
                  </div>

                  <p className="text-tpl-muted text-[14.5px]">{item.address}</p>

                  {item.meta.length ? (
                    <ul className="border-tpl-rule text-tpl-muted flex flex-wrap gap-x-4 gap-y-1 border-t pt-2.5 text-[13.5px]">
                      {item.meta.map((m) => (
                        <li key={m}>{m}</li>
                      ))}
                    </ul>
                  ) : null}
                </div>
              </TplReveal>
            ))}
          </ul>
        ) : (
          <p className="text-tpl-muted border-tpl-rule rounded-tpl border border-dashed px-6 py-12 text-center text-[15px]">
            Nothing matches that. Clear the search to see all {items.length} listings.
          </p>
        )}

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
