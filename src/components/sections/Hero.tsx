"use client";

import { useState, useEffect, useCallback } from "react";
import { useReducedMotion } from "motion/react";
import { Button } from "@/components/ui/Button";
import { HeroLaptop } from "@/components/sections/HeroLaptop";
import { cta } from "@/config/site";
import { brand, yearsInBusiness, formattedTemplatePrice } from "@/config/brand";
import { positioning, engagementModels } from "@/data/story";
import { offer } from "@/data/offer";
import { cn } from "@/lib/cn";

/**
 * FIRST VIEWPORT — a two-slide carousel, text left, a drawn mark right.
 *
 * The slide is authored as a sequence rather than a block: eyebrow, headline,
 * paragraph, actions, each rising 50px into place a beat after the last, while
 * the mark on the right scales up from 0.94. That stagger is the template's
 * signature and it is what makes an otherwise plain white screen feel directed.
 *
 * The entrance is CSS keyframes, NOT a JS animation library, and that is a
 * correctness decision rather than a preference. Layers driven from
 * `opacity: 0` by a script are blank whenever the script has not run — before
 * hydration, in a background tab where requestAnimationFrame is throttled, in
 * any headless render. `animation-fill-mode: both` gets the identical result
 * and fails visible. React's `key` on the slide root remounts the subtree on
 * every advance, which restarts the keyframes for free.
 *
 * TWO SLIDES, TWO AUDIENCES, which is why a carousel is defensible here rather
 * than the usual hero-slider hedge: the studio sells to founders commissioning
 * a build AND to local practices buying a fixed-price site, and those buyers
 * want opposite things from the first screen. Both slides are reachable
 * without waiting — dots and arrows are real controls, autoplay pauses on
 * hover and on focus, and it never starts at all under reduced motion.
 *
 * The right-hand mark is drawn, not stocked. Slide one plots one rule per
 * trading year, so the visual IS the claim in the headline; slide two plots
 * the template grid with one square picked out. Neither is an abstract blob.
 */

/**
 * Both slides read from the same content modules the rest of the site uses,
 * so nothing here is a second copy of a claim that lives elsewhere.
 */
const slides = [
  {
    key: "studio",
    eyebrow: `Building since ${brand.foundedYear}`,
    headline: positioning.headline,
    body: "Web, mobile and AI products for founders who need them built properly the first time.",
    action: cta.primary,
    secondary: cta.work,
    figure: "years" as const,
  },
  {
    key: "templates",
    eyebrow: `Template sites · ${formattedTemplatePrice()}`,
    headline: "A good site for your practice, quickly.",
    body: engagementModels[2].detail,
    action: cta.templates,
    secondary: cta.brief,
    figure: "grid" as const,
  },
];

const AUTOPLAY_MS = 7000;

/** Layer n rises a beat after layer n-1. */
const riseDelay = (order: number) => ({ animationDelay: `${100 + order * 100}ms` });

export function Hero() {
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const go = useCallback((next: number) => {
    setIndex(((next % slides.length) + slides.length) % slides.length);
  }, []);

  // Autoplay. Reduced motion disables it outright rather than shortening it:
  // an auto-advancing hero is motion the user did not ask for, and the arrows
  // and dots make every slide reachable without it.
  useEffect(() => {
    if (reduce || paused) return;
    const id = window.setInterval(
      () => setIndex((i) => (i + 1) % slides.length),
      AUTOPLAY_MS,
    );
    return () => window.clearInterval(id);
  }, [reduce, paused]);

  const slide = slides[index];

  return (
    <section
      aria-roledescription="carousel"
      aria-label="Introduction"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
      className="relative overflow-hidden pt-[112px] lg:pt-[152px]"
    >
      <HeroLaptop />

      <div className="relative mx-auto w-full max-w-[1600px] px-6 md:px-12 lg:px-[73px]">
        <div className="grid items-center gap-14 pb-20 lg:min-h-[620px] lg:grid-cols-2 lg:gap-8 lg:pb-28">
          {/* ---- Copy -------------------------------------------------
              No aria-live. The slide changes on a timer, and a live region on
              auto-advancing content reads the whole hero aloud every seven
              seconds. Each dot carries its slide's headline in its label,
              which is how this is navigated non-visually. */}
          <div key={slide.key}>
            <p className="eyebrow rise" style={riseDelay(0)}>
              {slide.eyebrow}
            </p>

            <h1
              className={cn(
                "font-display rise mt-6 max-w-[13ch] font-semibold",
                "text-[clamp(2.75rem,5.6vw,5rem)] leading-[1.125]",
              )}
              style={riseDelay(1)}
            >
              {slide.headline}
            </h1>

            <p
              className="text-ink-muted rise mt-8 max-w-[424px] text-[17px] leading-[1.41]"
              style={riseDelay(2)}
            >
              {slide.body}
            </p>

            <div
              className="rise mt-11 flex flex-wrap items-center gap-8"
              style={riseDelay(3)}
            >
              <Button href={slide.action.href} size="md">
                {slide.action.label}
              </Button>
              <Button href={slide.secondary.href} variant="text" size="md">
                {slide.secondary.label}
              </Button>
            </div>

            {/* The three facts a buyer checks first. True on both slides, so
                they sit inside the keyed subtree only to keep the stagger
                intact; the strings themselves do not change. */}
            <ul
              className="text-ink-faint rise mt-16 flex flex-wrap items-center gap-x-5 gap-y-3"
              style={riseDelay(4)}
            >
              {[
                `${yearsInBusiness()} years shipping`,
                "You talk to the builders",
                `${offer.turnaround} on templates`,
              ].map((fact, i) => (
                <li key={fact} className="ui-label flex items-center gap-5 text-[11px]">
                  {i > 0 ? (
                    <span aria-hidden="true" className="bg-rule-strong h-3 w-px" />
                  ) : null}
                  {fact}
                </li>
              ))}
            </ul>
          </div>

          {/* ---- Figure ------------------------------------------------ */}
          <div className="relative order-first lg:order-last">
            <div key={slide.key} className="scale-in" style={{ animationDelay: "200ms" }}>
              {slide.figure === "years" ? <YearsFigure /> : <TemplateGridFigure />}
            </div>
          </div>
        </div>

        {/* ---- Controls ------------------------------------------------ */}
        <div className="border-rule flex items-center gap-8 border-t py-7">
          <div className="flex items-center gap-3">
            <CarouselArrow direction="prev" onClick={() => go(index - 1)} />
            <CarouselArrow direction="next" onClick={() => go(index + 1)} />
          </div>

          <ol className="flex items-center gap-3">
            {slides.map((s, i) => (
              <li key={s.key}>
                <button
                  type="button"
                  onClick={() => go(i)}
                  aria-label={`Slide ${i + 1} of ${slides.length}: ${s.headline}`}
                  aria-current={i === index ? "true" : undefined}
                  className={cn(
                    "block h-1.5 rounded-full transition-[width,background-color]",
                    "duration-[--t-base] ease-(--ease-settle)",
                    "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink",
                    i === index
                      ? "w-10 bg-[image:var(--spectrum)]"
                      : "bg-ink-ghost hover:bg-ink-muted w-1.5",
                  )}
                />
              </li>
            ))}
          </ol>

          <span className="ui-label text-ink-faint ml-auto text-[11px] tabular-nums">
            {String(index + 1).padStart(2, "0")}
            <span className="text-ink-ghost">
              {" "}
              / {String(slides.length).padStart(2, "0")}
            </span>
          </span>
        </div>
      </div>
    </section>
  );
}

function CarouselArrow({
  direction,
  onClick,
}: {
  direction: "prev" | "next";
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={direction === "prev" ? "Previous slide" : "Next slide"}
      className={cn(
        "border-rule text-ink grid h-11 w-11 place-items-center border",
        "transition-[background-color,color,border-color] duration-[--t-fast] ease-out",
        "hover:bg-ink hover:border-ink hover:text-bg",
        "focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-ink",
      )}
    >
      <svg
        viewBox="0 0 15 26"
        aria-hidden="true"
        className={cn("h-3.5 w-2", direction === "prev" && "rotate-180")}
        fill="currentColor"
      >
        <path d="M14.106,13.605L2.6,25.027L1.508,24.02L12.51,13.102L1.592,2.184L2.6,1.176l11.506,11.422V13.605z" />
      </svg>
    </button>
  );
}

/**
 * One rule per trading year, the newest longest. The figure is the headline's
 * claim plotted rather than illustrated, so it stays true automatically:
 * `yearsInBusiness()` drives the row count.
 */
function YearsFigure() {
  const years = Array.from(
    { length: yearsInBusiness() + 1 },
    (_, i) => brand.foundedYear + i,
  );

  return (
    <figure className="ml-auto w-full max-w-[560px]">
      <ul className="flex flex-col gap-[7px]">
        {years.map((year, i) => {
          const ratio = (i + 1) / years.length;
          return (
            <li key={year} className="flex items-center gap-5">
              <span className="ui-label text-ink-ghost w-10 shrink-0 text-[10px] tabular-nums">
                {year}
              </span>
              <span
                aria-hidden="true"
                className="h-px bg-[image:var(--spectrum)]"
                style={{ width: `${28 + ratio * 72}%` }}
              />
            </li>
          );
        })}
      </ul>
      <figcaption className="ui-label text-ink-faint mt-8 text-[10px]">
        {brand.foundedYear} to {brand.foundedYear + yearsInBusiness()} · one line per year
        of delivery
      </figcaption>
    </figure>
  );
}

/**
 * The template catalog as a grid of plates, one picked out in the spectrum —
 * the shape of the offer: many to choose from, one becomes yours.
 */
function TemplateGridFigure() {
  const cells = Array.from({ length: 12 }, (_, i) => i);
  const chosen = 4;

  return (
    <figure className="ml-auto w-full max-w-[560px]">
      <ul className="grid grid-cols-4 gap-3">
        {cells.map((i) => (
          <li
            key={i}
            aria-hidden="true"
            className={cn(
              "aspect-[3/4]",
              // Outlined, not filled. `bg-bg-soft` (#fbf9f9) is a hair off
              // the white sheet, so it costs almost nothing to drop — but it
              // is opaque, and the hero's 3D object sits BEHIND this grid.
              // Filled tiles chopped that object into strips between boxes
              // that are themselves near-invisible, which read as a
              // rendering fault rather than as depth.
              i === chosen ? "bg-[image:var(--spectrum)]" : "border-rule border",
            )}
          />
        ))}
      </ul>
      <figcaption className="ui-label text-ink-faint mt-8 text-[10px]">
        One template, customized to your practice · {offer.price} one-time
      </figcaption>
    </figure>
  );
}
