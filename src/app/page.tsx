import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { TrustBar } from "@/components/sections/TrustBar";
import { CapabilityBento } from "@/components/sections/CapabilityBento";
import { TemplatesBreak } from "@/components/sections/TemplatesBreak";
import { SinceStory } from "@/components/sections/SinceStory";
import { Process } from "@/components/sections/Process";
import { EngagementModels } from "@/components/sections/EngagementModels";
import { SelectedWork } from "@/components/sections/SelectedWork";
import { Products } from "@/components/sections/Products";
import { Faq } from "@/components/sections/Faq";
import { FinalCta } from "@/components/sections/FinalCta";
import { generalFaq } from "@/data/faq";
import { faqJsonLd } from "@/lib/jsonLd";

/**
 * Home page. Struck & Assayed; the system is recorded in /DESIGN.md.
 *
 * The scroll is paced rather than uniform: dense passages earn quiet ones,
 * and the one dark field lands in the middle where the page changes audience.
 *
 *   1  Hero              struck headline + hallmark strip, one continuous plate
 *   2  TrustBar          milled pocket, marks only
 *   3  CapabilityBento   ruled index of 11, NOT a grid of tiles
 *   4  TemplatesBreak    the one dark field + sweepable row  ← the hinge
 *   5  SinceStory        two-column, objections struck as pockets
 *   6  Process           CSS sticky stack; the order carries information
 *   7  EngagementModels  three plates, one struck in the assay mark
 *   8  SelectedWork      composed empty state until real work exists
 *   9  Products          ruled ledger of what the company ships itself
 *  10  Faq               sticky heading + milled divisions
 *  11  FinalCta          centred close, hallmark strip returns
 *
 * EYEBROWS ARE RATIONED, NOT BANNED. The previous system outlawed the kicker
 * label outright; SPECTRUM reinstated it as a typographic device and this page
 * spends it exactly twice, on CapabilityBento and Products, both of which are
 * long ruled lists that need naming before the heading lands. Everywhere else
 * the heading still carries its own weight.
 *
 * The hallmark strip appears exactly twice, opening and closing the page:
 * the argument made once, then signed.
 */
export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(generalFaq)) }}
      />
      <Header />
      <main id="main">
        <Hero />
        <TrustBar />
        <CapabilityBento />
        <TemplatesBreak />
        <SinceStory />
        <Process />
        <EngagementModels />
        <SelectedWork />
        <Products />
        <Faq items={generalFaq} />
        <FinalCta />
      </main>
      <Footer />
    </>
  );
}
