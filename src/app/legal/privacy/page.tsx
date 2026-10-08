import { LegalLayout } from "@/components/legal/LegalLayout";
import { brand } from "@/config/brand";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Privacy Policy",
  description: `How ${brand.legalName} collects and uses your data.`,
  path: "/legal/privacy",
});

/**
 * TODO(legal): drafted to reflect what this codebase actually does — the
 * forms, Firebase, App Check, and the optional analytics/relay integrations
 * — not generic boilerplate. It still needs review by someone qualified
 * before launch, particularly the data-retention period (currently
 * unspecified) and anything GDPR-specific if EU traffic is significant
 * enough to warrant a formal DPA posture.
 */
export default function PrivacyPolicyPage() {
  return (
    <LegalLayout title="Privacy Policy" lastUpdated="August 14, 2026">
      <p>
        This policy explains what {brand.legalName} (&quot;we&quot;, &quot;us&quot;)
        collects through {brand.domain} and what happens to it.
      </p>

      <div>
        <h2>What we collect</h2>
        <p>Directly from you, when you use a form on this site:</p>
        <ul>
          <li>Name, email address, and any company or business name you provide</li>
          <li>The content of your message or project brief</li>
          <li>
            For the template offer: your business type, domain status, and readiness of
            your assets
          </li>
        </ul>
        <p className="mt-4">Automatically, from your browser:</p>
        <ul>
          <li>
            Signals used by Google reCAPTCHA and hCaptcha to distinguish human visitors
            from automated ones on our forms
          </li>
          <li>
            Standard analytics data (pages viewed, general location, device type), only if
            analytics is enabled on this deployment
          </li>
        </ul>
      </div>

      <div>
        <h2>How we use it</h2>
        <ul>
          <li>To respond to your enquiry or template request</li>
          <li>To scope and deliver work you have asked us about</li>
          <li>To protect the site&apos;s forms from spam and abuse</li>
        </ul>
        <p className="mt-4">
          We do not sell your data. We do not use it for advertising. We do not add you to
          a mailing list without your separate, explicit consent.
        </p>
      </div>

      <div>
        <h2>Who we share it with</h2>
        <p>
          Form submissions are stored with Google Firebase (Firestore), Google&apos;s
          cloud database service. Depending on how this deployment is configured, a
          submission may also be relayed to a third-party email service so we get notified
          of it, and payments for the template offer are processed by Razorpay, which has its
          own privacy policy governing that data. Our payment service runs on
          Cloudflare, which handles the order request but does not keep your card details.
        </p>
        <p className="mt-4">
          None of these providers use your data for their own purposes beyond providing
          the service to us.
        </p>
      </div>

      <div>
        <h2>Where your data is processed</h2>
        <p>
          Our infrastructure runs on Google Cloud, which may process data outside your own
          country, including outside the European Economic Area. Google maintains standard
          contractual safeguards for this; ask us if you would like more detail before
          submitting a form.
        </p>
      </div>

      <div>
        <h2>How long we keep it</h2>
        <p>
          We keep enquiry and brief data for as long as reasonably needed to respond to
          you and maintain a record of the engagement, and delete it on request as
          described below.
        </p>
      </div>

      <div>
        <h2>Your rights</h2>
        <p>You can ask us to:</p>
        <ul>
          <li>Send you a copy of what we hold about you</li>
          <li>Correct anything that is wrong</li>
          <li>
            Delete your data, where we are not required to keep it for a legal or
            contractual reason
          </li>
        </ul>
        <p className="mt-4">
          Email{" "}
          <a
            href={`mailto:${brand.email.support}`}
            className="text-ink underline decoration-dotted underline-offset-4"
          >
            {brand.email.support}
          </a>{" "}
          for any of these.
        </p>
      </div>

      <div>
        <h2>Cookies</h2>
        <p>
          This site uses only the cookies strictly needed to run reCAPTCHA and hCaptcha
          (bot protection on forms) and, where enabled, basic analytics. We do not use advertising or
          cross-site tracking cookies.
        </p>
      </div>

      <div>
        <h2>Children</h2>
        <p>
          This site is not directed at children and we do not knowingly collect data from
          anyone under 16.
        </p>
      </div>

      <div>
        <h2>Changes to this policy</h2>
        <p>If this changes materially, the date at the top of this page will update.</p>
      </div>

      <div>
        <h2>Contact</h2>
        <p>
          Questions about this policy:{" "}
          <a
            href={`mailto:${brand.email.support}`}
            className="text-ink underline decoration-dotted underline-offset-4"
          >
            {brand.email.support}
          </a>
        </p>
      </div>
    </LegalLayout>
  );
}
