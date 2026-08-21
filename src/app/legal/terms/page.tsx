import { LegalLayout } from "@/components/legal/LegalLayout";
import { brand } from "@/config/brand";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Terms of Service",
  description: `The terms governing use of ${brand.domain} and any engagement with us.`,
  path: "/legal/terms",
});

/**
 * TODO(legal): the governing-law clause below is deliberately left as a
 * placeholder — that decision belongs to the business and whoever drafts
 * the real contract each client signs, not to a default picked here. Review
 * the whole document before it governs a real engagement; this describes
 * the offerings correctly but is not a substitute for legal advice.
 */
export default function TermsPage() {
  return (
    <LegalLayout title="Terms of Service" lastUpdated="August 14, 2026">
      <p>
        These terms govern your use of {brand.domain} and any engagement with{" "}
        {brand.legalName}. Using this site, or starting a project with us, means you agree
        to them.
      </p>

      <div>
        <h2>What we offer</h2>
        <p>Two kinds of engagement, described in full on our pricing page:</p>
        <ul>
          <li>
            Custom software work, quoted per project (fixed scope) or billed monthly
            (dedicated squad)
          </li>
          <li>
            The template-based landing page offer, a fixed one-time fee covering the scope
            listed on that offer&apos;s page
          </li>
        </ul>
        <p className="mt-4">
          For custom engagements, the specific scope, timeline and price agreed in writing
          for that project take precedence over anything general on this site.
        </p>
      </div>

      <div>
        <h2>Payment</h2>
        <p>
          Fixed-scope projects are invoiced by milestone. Dedicated-squad engagements are
          invoiced monthly in arrears. The template offer is paid before customization
          work begins. Late payment may pause active work until resolved.
        </p>
      </div>

      <div>
        <h2>Intellectual property</h2>
        <p>
          Ownership of the code, designs and other deliverables we create for you
          transfers to you on full payment for that work. Until then, they remain ours. We
          may retain the right to reuse general-purpose tools, libraries and know-how that
          are not specific to your project.
        </p>
      </div>

      <div>
        <h2>Your responsibilities</h2>
        <p>
          Projects move at the speed of the information and feedback we get from you.
          Delays in providing content, access, approvals, or assets (logos, photos, copy)
          will extend the timeline correspondingly and are not on us.
        </p>
      </div>

      <div>
        <h2>Warranties and limitation of liability</h2>
        <p>
          We deliver work to a professional standard and will fix defects we introduce,
          reported within a reasonable period after delivery. Beyond that, services are
          provided as-is. To the extent permitted by law, our total liability for any
          claim arising from an engagement is limited to the amount paid for that
          engagement.
        </p>
      </div>

      <div>
        <h2>Termination</h2>
        <p>
          For fixed-scope and dedicated-squad work, either party can end the engagement at
          the close of a billing cycle or milestone. You keep everything delivered and
          paid for up to that point. Specific notice terms for a given engagement are set
          out in that project&apos;s contract.
        </p>
      </div>

      <div>
        <h2>Governing law</h2>
        <p>
          The governing law and jurisdiction for a specific engagement are set out in that
          engagement&apos;s contract.
        </p>
      </div>

      <div>
        <h2>Changes to these terms</h2>
        <p>
          If these terms change materially, the date at the top of this page will update.
        </p>
      </div>

      <div>
        <h2>Contact</h2>
        <p>
          <a
            href={`mailto:${brand.email.sales}`}
            className="text-ink underline decoration-dotted underline-offset-4"
          >
            {brand.email.sales}
          </a>
        </p>
      </div>
    </LegalLayout>
  );
}
