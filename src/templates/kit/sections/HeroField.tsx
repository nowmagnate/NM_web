import { Band, Wrap } from "../parts/Band";
import { Backdrop } from "../parts/Backdrop";
import { Chip } from "../parts/Chip";
import { Ghost } from "../parts/Ghost";
import { Seal } from "../parts/Seal";
import { TplButton } from "../parts/TplButton";
import type { Section } from "../schema";

type Props = Extract<Section, { type: "heroField" }>;

/**
 * THE HERO. The photograph is the ground.
 *
 * The earlier version of this file placed the hero image as an OBJECT inside a
 * tinted field, with its edges masked so it would dissolve. That was the wrong
 * model and it read exactly as wrong: a picture stuck into the middle of the
 * copy. An object in a layout is something the type sits next to. What was
 * asked for, and what a 2026 hero actually is, is type printed ON a
 * photograph.
 *
 * So the band is now the image, full bleed, from the top of the page. The nav
 * sits over it. The ghost lettering sits over it. The headline sits over it.
 * There is one surface.
 *
 * LEGIBILITY IS ARITHMETIC, NOT TASTE. White type over an unknown photograph
 * is a coin toss, and a client will swap this image for a bright kitchen
 * without asking. So every composition names the region its type occupies and
 * the scrim covers that region with at least 72% ink. Composited over a pure
 * white photograph that still clears 7:1 for `--tpl-on-ink`. There is no image
 * that breaks it, because the scrim decides, not the picture.
 *
 * FIVE COMPOSITIONS, and they now differ by where the type sits and therefore
 * where the ink is heaviest, rather than by where an object was placed:
 *
 *   `offset`     type bottom left, ink weighted left, photograph open right.
 *   `centred`    type centred, near-flat veil, photograph reads as atmosphere.
 *   `banner`     type along the foot, ink weighted bottom, sky open above.
 *   `split`      type right half, ink weighted right, photograph open left.
 *   `editorial`  headline split around the measure, ink weighted top.
 *
 * No two templates in one category may use the same one. See
 * `design/TEMPLATE-DIRECTION.md`.
 */

const BAND =
  "relative isolate overflow-hidden flex flex-col justify-end " +
  "min-h-[min(92vh,940px)] pt-[calc(var(--tpl-anchor)+1rem)] pb-[clamp(1.5rem,3vw,2.5rem)]";

/**
 * Type on the photograph is always the light ink, at FULL STRENGTH, with no
 * opacity modifier anywhere.
 *
 * There used to be an 85% tier for secondary text. `check:contrast` failed it
 * on Threshold, whose ink is the lightest in the catalog, and the right fix was
 * to delete the tier rather than to darken the scrim further. Two reasons.
 *
 * Dimming type over a photograph is backwards: the small uppercase labels that
 * were wearing the 85% need MORE contrast than the headline, not less. And a
 * tier that only just passes on today's palettes is a trap for the next
 * template, whose ink nobody has chosen yet.
 *
 * Hierarchy over media comes from size and weight, which cost nothing.
 */
const ON_MEDIA = "text-tpl-on-ink";

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <span className="tpl-enter bg-tpl-on-ink/15 text-tpl-on-ink rounded-tpl-pill w-fit px-4 py-2 text-[12px] font-semibold tracking-[0.14em] uppercase backdrop-blur-sm">
      {children}
    </span>
  );
}

function Headline({
  headline,
  className,
}: {
  headline: Props["headline"];
  className?: string;
}) {
  return (
    <h1 className={className}>
      {headline.lead ? (
        <span className="font-tpl-body text-tpl-on-ink pr-[0.18em] font-light tracking-[-0.02em]">
          {headline.lead}
        </span>
      ) : null}
      {headline.main}
    </h1>
  );
}

function Sub({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <p className={`text-tpl-on-ink text-[16.5px] leading-[1.6] ${className ?? ""}`}>
      {children}
    </p>
  );
}

function Actions({ actions }: { actions: Props["actions"] }) {
  if (!actions.length) return null;
  return (
    <div className="flex flex-wrap items-center gap-3">
      {actions.map((action) => (
        <TplButton
          key={action.href + action.label}
          action={action}
          // On a dark scrim the accent field goes muddy and its label loses
          // contrast against the ground behind it, so the primary action
          // inverts to a light pill with ink type. That is the standard
          // treatment for an action over a photograph and it is also the only
          // one that survives an arbitrary client accent.
          className={
            action.style === "primary"
              ? "rounded-tpl-pill bg-tpl-on-ink text-tpl-ink border-tpl-on-ink hover:bg-transparent hover:text-tpl-on-ink"
              : "rounded-tpl-pill border-tpl-on-ink/45 text-tpl-on-ink hover:bg-tpl-on-ink hover:text-tpl-ink"
          }
        />
      ))}
    </div>
  );
}

function Chips({ chips, centred }: { chips: string[]; centred?: boolean }) {
  if (!chips.length) return null;
  return (
    <ul className={`flex flex-wrap gap-2.5 ${centred ? "justify-center" : ""}`}>
      {chips.map((chip) => (
        <li key={chip}>
          <Chip>{chip}</Chip>
        </li>
      ))}
    </ul>
  );
}

/**
 * The row of things a visitor is actually checking: the hours, the parking,
 * whether new patients are being taken. It sits over the foot of the
 * photograph, which every scrim covers heavily for exactly this reason.
 */
function Facts({ facts }: { facts: Props["facts"] }) {
  if (!facts.length) return null;
  return (
    <Wrap className="relative mt-[clamp(2rem,4vw,3rem)]">
      <dl className="border-tpl-on-ink/25 grid grid-cols-2 border-t md:grid-cols-4">
        {facts.map((fact) => (
          <div
            key={fact.label}
            className="border-tpl-on-ink/20 flex flex-col gap-1.5 border-b py-4 pr-6 md:border-b-0 md:py-5"
          >
            <dt className="text-tpl-on-ink text-[11.5px] font-semibold tracking-[0.14em] uppercase">
              {fact.label}
            </dt>
            <dd className="text-tpl-on-ink text-[15px] leading-[1.45] font-medium">
              {fact.value}
            </dd>
          </div>
        ))}
      </dl>
    </Wrap>
  );
}

export function HeroField(props: Props) {
  const scrim =
    props.layout === "centred"
      ? "full"
      : props.layout === "banner"
        ? "bottom"
        : props.layout === "split"
          ? "right"
          : props.layout === "editorial"
            ? "top"
            : "left";

  return (
    <Band id={props.id} tone={props.tone} flush className={BAND}>
      <Backdrop image={props.subject} scrim={scrim} />
      <Body {...props} />
      <Facts facts={props.facts} />
    </Band>
  );
}

function Body(props: Props) {
  switch (props.layout) {
    case "centred":
      return <Centred {...props} />;
    case "banner":
      return <Banner {...props} />;
    case "split":
      return <Split {...props} />;
    case "editorial":
      return <Editorial {...props} />;
    default:
      return <Offset {...props} />;
  }
}

/* ------------------------------------------------------------------ offset */

function Offset({ eyebrow, headline, sub, actions, chips, ghost, seal }: Props) {
  return (
    <>
      <Ghost
        words={ghost}
        onMedia
        className="top-[calc(var(--tpl-anchor)+0.5rem)] left-0 w-full"
      />
      <Wrap className="relative flex flex-col items-start gap-7 lg:max-w-[1180px]">
        {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
        <Headline
          headline={headline}
          className={`tpl-enter ${ON_MEDIA} max-w-[13ch] text-[clamp(2.9rem,8vw,6.2rem)] leading-[0.94] font-bold tracking-[-0.035em] [--tpl-delay:60ms]`}
        />
        <div className="tpl-enter flex w-full flex-col gap-6 [--tpl-delay:180ms] lg:max-w-[62%]">
          <Sub className="max-w-[46ch]">{sub}</Sub>
          <Actions actions={actions} />
          <Chips chips={chips} />
        </div>
      </Wrap>
      {seal ? (
        <Seal
          ring={seal.ring}
          center={seal.center}
          className="absolute right-[6%] bottom-[26%] hidden h-[clamp(88px,8vw,120px)] w-[clamp(88px,8vw,120px)] -rotate-6 lg:block"
        />
      ) : null}
    </>
  );
}

/* ----------------------------------------------------------------- centred */

function Centred({ eyebrow, headline, sub, actions, chips, ghost, seal }: Props) {
  return (
    <>
      <Ghost
        words={ghost}
        onMedia
        className="top-[calc(var(--tpl-anchor)+0.5rem)] left-1/2 w-max -translate-x-1/2 text-center"
      />
      <Wrap className="relative flex flex-col items-center gap-7 text-center">
        {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
        <Headline
          headline={headline}
          className={`tpl-enter ${ON_MEDIA} max-w-[16ch] text-[clamp(2.6rem,7.2vw,5.6rem)] leading-[0.96] font-bold tracking-[-0.03em] [--tpl-delay:60ms]`}
        />
        <div className="tpl-enter flex flex-col items-center gap-6 [--tpl-delay:180ms]">
          <Sub className="max-w-[52ch] text-center">{sub}</Sub>
          <Actions actions={actions} />
          <Chips chips={chips} centred />
        </div>
      </Wrap>
      {seal ? (
        <Seal
          ring={seal.ring}
          center={seal.center}
          className="absolute right-[7%] bottom-[28%] hidden h-[clamp(84px,7vw,110px)] w-[clamp(84px,7vw,110px)] rotate-6 lg:block"
        />
      ) : null}
    </>
  );
}

/* ------------------------------------------------------------------ banner */

/** Type along the foot, so the photograph keeps its whole upper half. */
function Banner({ eyebrow, headline, sub, actions, chips, ghost, seal }: Props) {
  return (
    <>
      <Ghost
        words={ghost}
        onMedia
        className="top-[calc(var(--tpl-anchor)+0.5rem)] right-0 w-max text-right"
      />
      <Wrap className="relative flex flex-col gap-7">
        {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between lg:gap-16">
          <Headline
            headline={headline}
            className={`tpl-enter ${ON_MEDIA} max-w-[14ch] text-[clamp(2.7rem,7.4vw,5.8rem)] leading-[0.95] font-bold tracking-[-0.035em] [--tpl-delay:60ms]`}
          />
          <div className="tpl-enter flex shrink-0 flex-col gap-5 [--tpl-delay:180ms] lg:max-w-[38ch] lg:pb-2">
            <Sub>{sub}</Sub>
            <Actions actions={actions} />
          </div>
        </div>
        <Chips chips={chips} />
      </Wrap>
      {seal ? (
        <Seal
          ring={seal.ring}
          center={seal.center}
          className="absolute top-[22%] right-[7%] hidden h-[clamp(84px,7vw,112px)] w-[clamp(84px,7vw,112px)] -rotate-6 lg:block"
        />
      ) : null}
    </>
  );
}

/* ------------------------------------------------------------------- split */

/** Type in the right half, so the photograph keeps the left. */
function Split({ eyebrow, headline, sub, actions, chips, ghost, seal }: Props) {
  return (
    <>
      <Ghost words={ghost} onMedia className="bottom-[-0.12em] left-0 w-max" />
      <Wrap className="relative flex flex-col items-start gap-7 lg:ml-auto lg:w-[54%]">
        {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
        <Headline
          headline={headline}
          className={`tpl-enter ${ON_MEDIA} max-w-[14ch] text-[clamp(2.5rem,6vw,4.6rem)] leading-[0.96] font-bold tracking-[-0.03em] [--tpl-delay:60ms]`}
        />
        <div className="tpl-enter flex flex-col gap-6 [--tpl-delay:180ms]">
          <Sub className="max-w-[44ch]">{sub}</Sub>
          <Actions actions={actions} />
          <Chips chips={chips} />
        </div>
      </Wrap>
      {seal ? (
        <Seal
          ring={seal.ring}
          center={seal.center}
          className="absolute bottom-[30%] left-[8%] hidden h-[clamp(88px,7.5vw,116px)] w-[clamp(88px,7.5vw,116px)] rotate-6 lg:block"
        />
      ) : null}
    </>
  );
}

/* --------------------------------------------------------------- editorial */

/**
 * The headline split around the full measure, sitting high on the photograph.
 * The lead is pushed right and the main pushed left, so the two halves bracket
 * the image rather than stacking on it. A masthead rather than a caption.
 */
function Editorial({ eyebrow, headline, sub, actions, chips, ghost, seal }: Props) {
  const halved = Boolean(headline.lead);

  return (
    <>
      <Ghost words={ghost} onMedia className="right-0 bottom-[-0.1em] w-max text-right" />

      {/* Anchored to the top, where this composition's scrim is heaviest. */}
      <Wrap className="absolute inset-x-0 top-[calc(var(--tpl-anchor)+1rem)] flex flex-col gap-4">
        {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
        {halved ? (
          <>
            <span
              className={`tpl-enter font-tpl-display ${ON_MEDIA} block w-full text-right text-[clamp(2rem,5.6vw,4.4rem)] leading-[1] font-normal tracking-[-0.02em] [--tpl-delay:60ms]`}
            >
              {headline.lead}
            </span>
            <h1
              className={`tpl-enter ${ON_MEDIA} block w-full text-left text-[clamp(2.3rem,6.4vw,5rem)] leading-[0.98] font-bold tracking-[-0.03em] [--tpl-delay:140ms]`}
            >
              {headline.main}
            </h1>
          </>
        ) : (
          <Headline
            headline={headline}
            className={`tpl-enter ${ON_MEDIA} max-w-[16ch] text-[clamp(2.4rem,6.4vw,5rem)] leading-[0.98] font-bold tracking-[-0.03em] [--tpl-delay:60ms]`}
          />
        )}
      </Wrap>

      <Wrap className="relative flex flex-col items-start gap-6">
        <div className="tpl-enter flex flex-col gap-6 [--tpl-delay:200ms] lg:max-w-[54%]">
          <Sub className="max-w-[48ch]">{sub}</Sub>
          <Actions actions={actions} />
          <Chips chips={chips} />
        </div>
      </Wrap>

      {seal ? (
        <Seal
          ring={seal.ring}
          center={seal.center}
          className="absolute right-[7%] bottom-[30%] hidden h-[clamp(84px,7vw,110px)] w-[clamp(84px,7vw,110px)] -rotate-6 lg:block"
        />
      ) : null}
    </>
  );
}
