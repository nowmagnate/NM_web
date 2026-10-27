"use client";

import { useEffect, useState } from "react";
import { brand, formattedStandardPrice } from "@/config/brand";
import { offer } from "@/data/offer";
import { cn } from "@/lib/cn";

/**
 * The seasonal offer strip on the template pages.
 *
 * Static export means the HTML is frozen at build time but the offer is not, so
 * which deadline to show is worked out in the browser from today's date. The
 * server render and the first client render both show the first stage, so there
 * is no hydration mismatch and no layout shift for a visitor on the first day;
 * the effect then moves to the right stage, or hides the strip after the offer
 * ends.
 *
 * The prices are real. The standard price is what the payments Worker charges
 * from 1 January, and the festive price is applied automatically until then.
 * Do not extend the festive window to keep this strip running: the claim that
 * the standard price applies afterwards has to stay true.
 */
const { festive } = offer;

function todayIso(now: Date): string {
  const m = String(now.getMonth() + 1).padStart(2, "0");
  const d = String(now.getDate()).padStart(2, "0");
  return `${now.getFullYear()}-${m}-${d}`;
}

type Stage = (typeof festive.stages)[number];

/** The first dated stage that has not passed, or null once only the bundle deadline is left. */
function stageFor(today: string): Stage | null {
  return festive.stages.find((s) => today <= s.lastDayIso) ?? null;
}

export function FestiveBanner({ className }: { className?: string }) {
  const [stage, setStage] = useState<Stage | null>(festive.stages[0]);
  const [past, setPast] = useState(false);

  useEffect(() => {
    const today = todayIso(new Date());
    setPast(today > festive.endsOnIso);
    setStage(stageFor(today));
  }, []);

  if (past) return null;

  const standard = formattedStandardPrice();

  return (
    <aside
      aria-label={festive.name}
      className={cn("bg-mark text-ink rounded-(--r-plate) px-5 py-4 md:px-6", className)}
    >
      <p className="font-display text-lg leading-snug">
        {festive.name}:{" "}
        <span className="sr-only">standard price {standard}, festive offer </span>
        <s aria-hidden="true" className="font-normal">
          {standard}
        </s>{" "}
        ${brand.templateFestive.price} until {offer.promo.endsOn}.
      </p>
      <p className="mt-1.5 text-sm leading-relaxed">
        {stage ? (
          <>
            Send your logo, photos and text by {stage.assetsBy} and your site can be live before{" "}
            {stage.liveBefore}.{" "}
          </>
        ) : null}
        Orders placed by {offer.promo.endsOn} include domain and hosting for 3 years and a year of
        fixes if anything breaks. From 1 January the price is {standard}.
      </p>
    </aside>
  );
}
