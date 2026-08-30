import Link from "next/link";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { featuredTemplates, templates } from "@/data/templates";
import { hasLivePreview } from "@/templates/registry";
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
 * The catalog reads as one sweepable row of identical plates. Every unit is
 * the same size and the same shape; the template's own hero photograph is
 * what varies, so a buyer scanning the row sees the work rather than a name
 * for it. The photographs sit under a scrim heavy enough that the type holds
 * at the same weight on every card no matter how bright the image beneath.
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
          continues; every unit identical, only the photograph varying. */}
      <div className="scroll-rail mt-14 flex gap-px overflow-x-auto border-y border-white/10">
        {featuredTemplates.map((template) => {
          // Only a built template has a hero photograph on disk. An unbuilt one
          // keeps the flat plate rather than pointing at an image that is not
          // there: the row never claims to show something that has not been made.
          const live = hasLivePreview(template.slug);

          return (
            <Link
              key={template.slug}
              href={`/templates/${template.slug}`}
              className={cn(
                "snap-item group relative flex aspect-3/4 w-[210px] shrink-0 flex-col justify-between",
                "overflow-hidden bg-white/[0.03] px-6 py-8 md:w-[240px]",
              )}
            >
              {live && (
                <>
                  <Image
                    src={`/templates/${template.slug}/hero.jpg`}
                    alt=""
                    aria-hidden="true"
                    fill
                    sizes="240px"
                    className="object-cover transition-transform duration-[--t-slow] ease-(--ease-settle) group-hover:scale-[1.04]"
                  />
                  {/* Two layers, not one: the flat wash keeps a bright photograph
                      from lifting the dark field, the gradient buys contrast for
                      the name where it actually sits. */}
                  <div
                    aria-hidden="true"
                    className={cn(
                      "absolute inset-0 bg-black/35 transition-colors duration-[--t-base]",
                      "ease-(--ease-settle) group-hover:bg-black/20",
                    )}
                  />
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/45 to-black/10"
                  />
                </>
              )}

              <div className="relative">
                <p className="ui-label text-[10px] text-white/70">{template.practiceType}</p>
              </div>

              <div className="relative">
                <h3 className="font-display text-[19px] leading-[1.2] font-medium">
                  {template.name}
                </h3>

                <div className="mt-4 flex items-end justify-between">
                  <span aria-hidden="true" className="flex gap-1" title={template.palette.name}>
                    {template.palette.swatches.map((swatch) => (
                      <span key={swatch} className="h-5 w-2" style={{ backgroundColor: swatch }} />
                    ))}
                  </span>
                  <span className="tabular font-display text-[13px] text-white/70 transition-colors duration-[--t-base] group-hover:text-white">
                    {offer.price}
                  </span>
                </div>
                <span className="sr-only">Palette: {template.palette.name}</span>
              </div>
            </Link>
          );
        })}

        {/* The rail terminates in the next action rather than a dead stop. It
            stays flat on purpose: after a run of photographs, the plain plate
            is what the eye stops on. */}
        <Link
          href={cta.templates.href}
          className="snap-item flex aspect-3/4 w-[210px] shrink-0 items-center bg-white/[0.03] px-6 py-8 transition-colors duration-[--t-base] hover:bg-white/[0.08] md:w-[240px]"
        >
          <span className="font-display text-[19px] leading-[1.2] font-medium">
            All {templates.length} templates
          </span>
        </Link>
      </div>
    </section>
  );
}
