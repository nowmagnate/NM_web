import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Section } from "@/components/ui/Section";
import { Faq } from "@/components/sections/Faq";
import { ContactForm } from "@/components/forms/ContactForm";
import { generalFaq } from "@/data/faq";
import { pageMetadata } from "@/lib/metadata";
import { faqJsonLd } from "@/lib/jsonLd";

export const metadata = pageMetadata({
  title: "Contact",
  description: "Tell us what you're building. We reply within one business day.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(generalFaq)) }}
      />
      <Header />
      <main id="main">
        <Section spacing="compact" className="pt-32">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <h1 className="font-display text-4xl leading-[1.05] md:text-5xl">
                Let&apos;s talk.
              </h1>
              <p className="text-ink-muted mt-5 max-w-[38ch] leading-relaxed">
                Tell us what you are building. We will tell you honestly whether we are
                the right team for it.
              </p>
            </div>

            <div className="lg:col-span-7 lg:col-start-6">
              <ContactForm />
            </div>
          </div>
        </Section>

        <Faq items={generalFaq} />
      </main>
      <Footer />
    </>
  );
}
