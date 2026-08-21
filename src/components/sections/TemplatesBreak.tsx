import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { featuredTemplates, templates } from "@/data/templates";
import { offer } from "@/data/offer";
import { cta } from "@/config/site";
import { cn } from "@/lib/cn";

/**
 * The commercial hinge, and the page's one dark field.
 *
 * The home page serves two readers who want opposite things. This section
 * exists so a local-practice buyer finds their path while scrolling past
 * material written for a founder, which is why it is the single place the
 * page goes dark: spend the device once and it works.
 *
 * The catalog reads as one sweepable row of identical plates with a single
 * varying mark, not as a set of independent cards. Every unit is the same
 * size and the same material; only the practice name, palette and price
 * differ. You read it across.
 */
export function TemplatesBreak() {
  return (
    <section className="bg-bg-deep text-bg-deep-ink py-24 md:py-32">
      <Container>
        <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-[46rem]">
            <h2 className="font-display max-w-[14ch] text-[clamp(2rem,4.6vw,3.6rem)] leading-[1.05] font-semibold">
              A site for your practice, {offer.price} flat.
            </h2>
            <p className="mt-6 max-w-[46ch] text-[16px] leading-[1.6] text-white/60">
              {templates.length} templates for realtors, designers, architects, doctors,
              dentists and law firms. Customized to your practice in {offer.turnaround}.
            </p>
          </div>

          <Button href={cta.templates.href} variant="light" size="lg" className="shrink-0">
            {cta.templates.label}
          </Button>
        </div>
      </Container>

      {/* The bridge. Runs to the viewport edge so it is obvious the row
          continues; every unit identical, only the mark varying. */}
      <div className="scroll-rail mt-14 flex gap-px overflow-x-auto border-y border-white/10">
        {featuredTemplates.map((template) => (
          <Link
            key={template.slug}
            href={`/templates/${template.slug}`}
            className={cn(
              "snap-item group relative flex w-[210px] shrink-0 flex-col justify-between",
              "bg-white/[0.03] px-6 py-8 transition-colors duration-[--t-base] ease-(--ease-settle)",
              "hover:bg-white/[0.08] md:w-[240px]",
            )}
          >
            <div>
              <p className="ui-label text-[10px] text-white/45">{template.practiceType}</p>
              <h3 className="font-display mt-3 text-[19px] leading-[1.2] font-medium">
                {template.name}
              </h3>
            </div>

            {/* The varying mark: the one thing that differs across the row. */}
            <div className="mt-10 flex items-end justify-between">
              <span aria-hidden="true" className="flex gap-1" title={template.palette.name}>
                {template.palette.swatches.map((swatch) => (
                  <span key={swatch} className="h-5 w-2" style={{ backgroundColor: swatch }} />
                ))}
              </span>
              <span className="tabular font-display text-[13px] text-white/45 transition-colors duration-[--t-base] group-hover:text-white">
                {offer.price}
              </span>
            </div>
          </Link>
        ))}

        {/* The rail terminates in the next action rather than a dead stop. */}
        <Link
          href={cta.templates.href}
          className="snap-item flex w-[210px] shrink-0 items-center bg-white/[0.03] px-6 py-8 transition-colors duration-[--t-base] hover:bg-white/[0.08] md:w-[240px]"
        >
          <span className="font-display text-[19px] leading-[1.2] font-medium">
            All {templates.length} templates
          </span>
        </Link>
      </div>
    </section>
  );
}
