import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { brand } from "@/config/brand";
import { pageMetadata } from "@/lib/metadata";

/**
 * Where checkout ends. Not indexed: it is only meaningful straight after a
 * payment, and `?o=<order id>` is for the buyer's own reference.
 */
export const metadata: Metadata = {
  ...pageMetadata({
    title: "Thank you",
    description: "Your payment was received.",
    path: "/thank-you",
  }),
  robots: { index: false, follow: false },
};

export default function ThankYouPage() {
  return (
    <>
      <Header />
      <main id="main">
        <Section spacing="compact" className="pt-[max(8rem,20vh)]">
          <div className="mx-auto max-w-[54ch] text-center">
            <h1 className="spectrum-text font-display text-3xl leading-[1.08] text-balance md:text-4xl">
              Payment received. Thank you.
            </h1>
            <p className="text-ink-muted mt-5 leading-relaxed">
              We have your order and will be in touch at the email you gave us. Razorpay also sends
              a payment receipt. If nothing has reached you within one business day, write to{" "}
              <a href={`mailto:${brand.email.enquiry}`} className="text-ink underline">
                {brand.email.enquiry}
              </a>{" "}
              and quote your order reference.
            </p>
            <div className="mt-9 flex justify-center gap-3">
              <Button href="/templates">Browse templates</Button>
              <Button href="/" variant="text">
                Back to home
              </Button>
            </div>
          </div>
        </Section>
      </main>
      <Footer />
    </>
  );
}
