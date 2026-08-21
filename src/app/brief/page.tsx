import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Section } from "@/components/ui/Section";
import { Faq } from "@/components/sections/Faq";
import { BriefForm } from "@/components/forms/BriefForm";
import { templateFaq } from "@/data/faq";
import { formattedTemplatePrice } from "@/config/brand";
import { pageMetadata } from "@/lib/metadata";
import { faqJsonLd } from "@/lib/jsonLd";

export const metadata = pageMetadata({
  title: "Start a brief",
  description: `Tell us about your business and we'll customize a template for ${formattedTemplatePrice()}.`,
  path: "/brief",
});

export default function BriefPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(templateFaq)) }}
      />
      <Header />
      <main id="main">
        <Section spacing="compact" className="pt-32">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <h1 className="font-display text-4xl leading-[1.05] md:text-5xl">
                Start your brief.
              </h1>
              <p className="text-ink-muted mt-5 max-w-[38ch] leading-relaxed">
                Ten minutes of your time gets a firm start date and a clear list of what
                we still need from you.
              </p>
            </div>

            <div className="lg:col-span-7 lg:col-start-6">
              <BriefForm />
            </div>
          </div>
        </Section>

        <Faq items={templateFaq} />
      </main>
      <Footer />
    </>
  );
}
