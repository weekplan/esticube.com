import type { Metadata } from "next";
import Link from "next/link";
import { PageShell } from "@/components/layout/PageShell";
import { SITE_NAME, SITE_URL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Privacy Policy",
  description:
    "How EstiCube collects, uses, and protects your information. GDPR and CCPA-aligned privacy practices for our free construction calculators.",
  path: "/privacy",
  keywords: ["privacy policy", "data protection", "GDPR", "CCPA"],
});

const LAST_UPDATED = "June 27, 2026";

export default function PrivacyPage() {
  return (
    <PageShell className="py-12 sm:py-16">
      <article className="max-w-3xl">
        <p className="text-sm font-semibold uppercase tracking-wider text-brand">
          Legal
        </p>
        <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
          Privacy Policy
        </h1>
        <p className="mt-3 text-sm text-muted">Last updated: {LAST_UPDATED}</p>

        <div className="prose-legal mt-10 space-y-8 text-muted leading-relaxed">
          <section>
            <h2 className="text-xl font-bold text-foreground">Overview</h2>
            <p className="mt-3">
              {SITE_NAME} ({SITE_URL}) provides free construction cost calculators
              for US homeowners and contractors. We respect your privacy and process
              personal data in line with the EU General Data Protection Regulation
              (GDPR), the UK GDPR, the California Consumer Privacy Act (CCPA/CPRA),
              and other applicable privacy laws.
            </p>
            <p className="mt-3">
              Our calculators run in your browser. We do not require an account,
              and we do not collect the measurements or cost inputs you enter into
              calculators unless you voluntarily contact us.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground">Data we process</h2>
            <ul className="mt-3 list-disc space-y-2 pl-5">
              <li>
                <strong className="text-foreground">Technical data:</strong> IP
                address, browser type, device type, pages viewed, and referral URL
                when you visit the site. This may be processed by our hosting
                provider and, only if you consent, by analytics tools.
              </li>
              <li>
                <strong className="text-foreground">Consent records:</strong> Your
                cookie choices are stored locally so we can honor your preferences.
              </li>
              <li>
                <strong className="text-foreground">Communications:</strong> If you
                email us, we process the information you send to respond.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground">Legal bases (GDPR)</h2>
            <ul className="mt-3 list-disc space-y-2 pl-5">
              <li>
                <strong className="text-foreground">Consent:</strong> Optional
                analytics and marketing cookies, where enabled.
              </li>
              <li>
                <strong className="text-foreground">Legitimate interests:</strong>{" "}
                Site security, abuse prevention, and aggregated performance
                monitoring that does not override your rights.
              </li>
              <li>
                <strong className="text-foreground">Legal obligation:</strong>{" "}
                Records we must keep to comply with law.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground">Cookies</h2>
            <p className="mt-3">
              We use strictly necessary cookies to remember your consent. Optional
              cookies are disabled until you opt in. See our{" "}
              <Link href="/cookies" className="font-medium text-brand hover:underline">
                Cookie Policy
              </Link>{" "}
              for a full list and to change your choices at any time.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground">
              California privacy rights
            </h2>
            <p className="mt-3">
              California residents may request access to, deletion of, or correction
              of personal information we hold, and may opt out of the sale or sharing
              of personal information. {SITE_NAME} does not sell personal information
              and does not share it for cross-context behavioral advertising.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground">Your rights</h2>
            <p className="mt-3">
              Depending on your location, you may have the right to access, rectify,
              erase, restrict, or port your data, and to object to certain
              processing. You may withdraw cookie consent at any time via{" "}
              <Link href="/cookies" className="font-medium text-brand hover:underline">
                Cookie settings
              </Link>
              . You may also lodge a complaint with your local data protection
              authority.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground">Data retention</h2>
            <p className="mt-3">
              Consent records are kept for up to 12 months. Server logs are retained
              only as long as needed for security and troubleshooting. Analytics
              data, if enabled, is retained according to the analytics provider&apos;s
              settings.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground">Contact</h2>
            <p className="mt-3">
              Privacy questions:{" "}
              <a
                href="mailto:privacy@esticube.com"
                className="font-medium text-brand hover:underline"
              >
                privacy@esticube.com
              </a>
            </p>
          </section>
        </div>
      </article>
    </PageShell>
  );
}
