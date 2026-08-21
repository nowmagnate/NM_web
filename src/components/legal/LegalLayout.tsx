import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Section } from "@/components/ui/Section";

/**
 * Shared chrome for the three legal pages. Content is plain prose, not MDX —
 * these are short, structured documents edited rarely, so a component tree
 * is simpler than standing up a second content pipeline for three pages.
 */
export function LegalLayout({
  title,
  lastUpdated,
  children,
}: {
  title: string;
  lastUpdated: string;
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <main id="main">
        <Section spacing="compact" className="pt-32" container="narrow">
          <h1 className="font-display text-3xl leading-[1.08] md:text-4xl">{title}</h1>
          <p className="text-ink-muted mt-3 text-sm">Last updated {lastUpdated}</p>
        </Section>

        <Section spacing="compact" className="pt-0" container="narrow">
          <div className="text-ink-muted [&_h2]:font-display [&_h2]:text-ink space-y-8 leading-relaxed [&_h2]:mt-2 [&_h2]:text-xl [&_li]:mt-2 [&_ul]:list-disc [&_ul]:pl-5">
            {children}
          </div>
        </Section>
      </main>
      <Footer />
    </>
  );
}
