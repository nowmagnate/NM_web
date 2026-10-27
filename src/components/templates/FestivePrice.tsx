"use client";

import { useEffect, useState } from "react";
import { brand, festiveOfferActive, formattedStandardPrice } from "@/config/brand";
import { cn } from "@/lib/cn";

/**
 * The template price with the standard price struck through while the festive
 * offer runs, and the plain standard price afterwards.
 *
 * Both prices are real: the standard price is what the payments Worker charges
 * once the offer ends, and the festive price is applied automatically until then
 * (`npm run check:payments` keeps the site and the Worker in step). Which one is
 * current is worked out in the browser, because a static page cannot know the
 * date it will be read on. The server render shows the festive price, so a
 * visitor during the offer sees no change after hydration.
 */
export function FestivePrice({ className }: { className?: string }) {
  const [festive, setFestive] = useState(true);
  useEffect(() => setFestive(festiveOfferActive()), []);

  const standard = formattedStandardPrice();
  const offerPrice = `$${brand.templateFestive.price}`;

  if (!festive) return <span className={className}>{standard}</span>;

  return (
    <span className={className}>
      <span className="sr-only">Standard price {standard}. Festive offer </span>
      <s aria-hidden="true" className={cn("text-ink-muted mr-2 font-normal")}>
        {standard}
      </s>
      {offerPrice}
    </span>
  );
}
