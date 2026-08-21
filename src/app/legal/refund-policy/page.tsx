import { LegalLayout } from "@/components/legal/LegalLayout";
import { refundPosition, offer } from "@/data/offer";
import { brand } from "@/config/brand";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Refund Policy",
  description: `Our refund position for the ${offer.price} template offer.`,
  path: "/legal/refund-policy",
});

/**
 * Pulls directly from `refundPosition` and `offer` in `src/data/offer.ts`
 * rather than restating the numbers here, so this page and the offer itself
 * can never drift apart.
 */
export default function RefundPolicyPage() {
  return (
    <LegalLayout title="Refund Policy" lastUpdated="August 14, 2026">
      <p>
        This policy covers the {offer.price} template offer. Refunds for custom
        fixed-scope or dedicated-squad engagements are governed by that project&apos;s
        specific contract, not by this page.
      </p>

      <div>
        <h2>Before we start customizing your template</h2>
        <p>{refundPosition.beforeWorkStarts}</p>
      </div>

      <div>
        <h2>After work has started</h2>
        <p>{refundPosition.afterWorkStarts}</p>
      </div>

      <div>
        <h2>If we cannot deliver</h2>
        <p>{refundPosition.ifWeCannotDeliver}</p>
      </div>

      <div>
        <h2>What is not covered</h2>
        <p>
          A change of mind after your one included revision round is not grounds for a
          refund; further changes are quoted and billed separately, as described on the
          pricing page. This policy also does not cover work explicitly listed as excluded
          on the template offer page.
        </p>
      </div>

      <div>
        <h2>How to request a refund</h2>
        <p>
          Email{" "}
          <a
            href={`mailto:${brand.email.sales}`}
            className="text-ink underline decoration-dotted underline-offset-4"
          >
            {brand.email.sales}
          </a>{" "}
          with your name and the email address you used when you started your brief. We
          will confirm the outcome within a few business days.
        </p>
      </div>
    </LegalLayout>
  );
}
