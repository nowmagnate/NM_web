import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Section } from "@/components/ui/Section";
import { TemplateCatalog } from "@/components/templates/TemplateCatalog";
import { templates } from "@/data/templates";
import { formattedTemplatePrice } from "@/config/brand";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Templates",
  description: `${templates.length} landing page templates for local businesses, customized to your practice for ${formattedTemplatePrice()}.`,
  path: "/templates",
});

/**
 * The $499 catalog. All 24 templates render as real markup on first paint —
 * `TemplateCatalog` no longer depends on `useSearchParams()` specifically so
 * that static export doesn't defer its content to a client-only render (see
 * the comment in that component for what broke when it did). Filtering is a
 * client-side enhancement layered on top of markup that was already there.
 */
export default function TemplatesPage() {
  return (
    <>
      <Header />
      <main id="main">
        <Section spacing="compact" className="pt-32">
          <div className="max-w-[52ch]">
            <h1 className="font-display text-4xl leading-[1.05] md:text-5xl">
              {templates.length} templates, {formattedTemplatePrice()} each.
            </h1>
            <p className="text-ink-muted mt-5 max-w-[48ch] text-lg leading-relaxed">
              Pick one, tell us about your practice, and we customize it in 5 to 7
              business days.
            </p>
            {/* Every template now has a live preview, so this line states that
                rather than a count. If a template is ever added to the catalog
                ahead of being built, its card falls back to the concept chip
                and this sentence needs revisiting. */}
            <p className="text-ink-muted mt-3 max-w-[48ch] text-sm leading-relaxed">
              Every one of them has a live preview you can open and scroll right
              now. Nothing here is a mockup.
            </p>
          </div>
        </Section>

        <Section spacing="compact" className="pt-0">
          {/* sr-only: keeps the h1 -> h2 -> h3 (card titles) hierarchy valid
              without adding a visible heading the design doesn't call for. */}
          <h2 className="sr-only">All templates</h2>
          <TemplateCatalog />
        </Section>
      </main>
      <Footer />
    </>
  );
}
