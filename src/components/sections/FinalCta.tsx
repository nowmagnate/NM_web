import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { Hallmark } from "@/components/ui/Hallmark";
import { cta } from "@/config/site";
import { brand, makersMark } from "@/config/brand";

/**
 * The close: the page ends anchored, and the provenance strip returns.
 *
 * Opening and closing on the same object is the argument made twice. Centring
 * is right here specifically: there is nothing to compare against, the
 * message is the design, and the reader who reached this point has already
 * decided.
 *
 * ONE INTENT, ONE LABEL. The same `cta.primary.label` string as the nav and
 * the hero; three different phrasings would read as three different actions.
 */
export function FinalCta() {
  return (
    <Section spacing="large">
      {/* Container is a rem width, not a `ch` one: `ch` on this wrapper would
          resolve against the 16px body size and squeeze the display heading
          inside it into a narrow column. */}
      <div className="mx-auto flex max-w-[44rem] flex-col items-center text-center">
        <h2 className="spectrum-text font-display max-w-[13ch] text-[clamp(2.25rem,5.4vw,4rem)] leading-[1.02] font-semibold">
          Tell us what you are building.
        </h2>
        <p className="text-ink-muted mt-7 max-w-[44ch] text-[16px] leading-[1.65]">
          We will tell you honestly whether we are the right team for it, and what it
          would take.
        </p>

        <div className="mt-11 flex flex-wrap items-center justify-center gap-4">
          <Button href={cta.primary.href} size="lg">
            {cta.primary.label}
          </Button>
          <Button href={`mailto:${brand.email.sales}`} size="lg" variant="text">
            {brand.email.sales}
          </Button>
        </div>

        <Hallmark
          size="sm"
          className="mt-14"
          marks={[
            { glyph: makersMark(), label: "Maker's mark" },
            { glyph: String(brand.foundedYear), label: "Date letter" },
            { glyph: "IN", label: "Home office: India", kind: "disc" },
          ]}
        />
      </div>
    </Section>
  );
}
