import Link from "next/link";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { approvedTestimonials } from "@/data/clients";
import { caseStudies } from "@/data/case-studies";
import { cta } from "@/config/site";

/**
 * Selected work.
 *
 * No case studies are published yet, so this renders a composed empty state
 * rather than fabricated projects. Inventing client work on a services site
 * is a risk that outlives the launch: the first prospect who asks a follow-up
 * question about a project that never happened costs more than the section
 * was ever worth.
 *
 * The empty state says something true and points at the two things that ARE
 * real: the referral history, and the option to ask directly. It is composed,
 * not apologetic.
 *
 * Gated on data length: adding an entry to `case-studies.ts` switches this to
 * the grid automatically, and `testimonials.ts` likewise. An empty heading
 * with nothing under it is worse than no section.
 */
export function SelectedWork() {
  const hasWork = caseStudies.length > 0;
  const hasQuotes = approvedTestimonials.length > 0;

  return (
    <Section id="work" spacing="large">
      {hasWork ? (
        <>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <h2 className="font-display max-w-[18ch] text-[clamp(2rem,4.4vw,3.4rem)] leading-[1.05] font-semibold">
              Selected work.
            </h2>
            <Button href={cta.work.href}>{cta.work.label}</Button>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-px md:grid-cols-2">
            {caseStudies.map((study) => (
              <Link
                key={study.slug}
                href={`/work/${study.slug}`}
                className="border-rule bg-bg border p-8 transition-shadow duration-[--t-base] ease-(--ease-settle) hover:shadow-[var(--lift)]"
              >
                <p className="ui-label text-ink-faint text-[10px]">
                  {study.client} · {study.year}
                </p>
                <h3 className="font-display mt-3 text-[21px] leading-[1.15] font-semibold">
                  {study.title}
                </h3>
                <p className="text-ink-muted mt-3 max-w-[52ch] text-[15px] leading-[1.6]">
                  {study.summary}
                </p>
              </Link>
            ))}
          </div>
        </>
      ) : (
        <div className="mx-auto max-w-[62ch] text-center">
          <h2 className="font-display text-[clamp(2rem,4.4vw,3.4rem)] leading-[1.05] font-semibold">
            Most of our work sits behind an NDA.
          </h2>
          <p className="text-ink-muted mx-auto mt-6 max-w-[54ch] text-[16px] leading-[1.65]">
            Nine years of client projects, almost all of it under agreements that do not
            allow a public write-up. We are putting case studies together with the clients
            who have said yes. Until those are live, the honest answer is to ask, and we
            will walk you through relevant work directly.
          </p>
          <div className="mt-10 flex justify-center">
            <Button href={cta.primary.href}>{cta.primary.label}</Button>
          </div>
        </div>
      )}

      {hasQuotes ? (
        <div className="mt-16 grid grid-cols-1 gap-px md:grid-cols-3">
          {approvedTestimonials.slice(0, 3).map((t) => (
            <figure key={t.author} className="border-rule bg-bg border p-8">
              <blockquote className="text-ink text-[16px] leading-[1.6]">
                {t.quote}
              </blockquote>
              <figcaption className="ui-label text-ink-faint mt-6 text-[10px]">
                {t.author}, {t.role} at {t.company}
              </figcaption>
            </figure>
          ))}
        </div>
      ) : null}
    </Section>
  );
}
