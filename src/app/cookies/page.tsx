import type { Metadata } from "next";
import { CookieSettingsLink } from "@/components/consent/CookieSettingsLink";
import { PageShell } from "@/components/layout/PageShell";
import {
  ANALYTICS_COOKIES,
  CATEGORY_LABELS,
  COOKIE_REGISTRY,
  MARKETING_COOKIES,
} from "@/lib/cookies/registry";
import { SITE_NAME } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Cookie Policy",
  description:
    "Learn which cookies EstiCube uses, why they are used, and how to manage your consent preferences.",
  path: "/cookies",
  keywords: ["cookie policy", "cookie consent", "GDPR cookies"],
});

const LAST_UPDATED = "June 27, 2026";

function CookieTable({ cookies }: { cookies: typeof COOKIE_REGISTRY }) {
  if (cookies.length === 0) {
    return (
      <p className="mt-3 text-sm text-muted">
        No cookies in this category are currently in use.
      </p>
    );
  }

  return (
    <div className="mt-4 overflow-x-auto rounded-xl border border-border">
      <table className="min-w-full text-left text-sm">
        <thead className="bg-surface-2 text-xs uppercase tracking-wide text-muted">
          <tr>
            <th className="px-4 py-3 font-semibold">Cookie</th>
            <th className="px-4 py-3 font-semibold">Purpose</th>
            <th className="px-4 py-3 font-semibold">Provider</th>
            <th className="px-4 py-3 font-semibold">Duration</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border bg-surface">
          {cookies.map((cookie) => (
            <tr key={cookie.name}>
              <td className="px-4 py-3 font-mono text-xs text-foreground">
                {cookie.name}
              </td>
              <td className="px-4 py-3 text-muted">{cookie.purpose}</td>
              <td className="px-4 py-3 text-muted">{cookie.provider}</td>
              <td className="px-4 py-3 text-muted">{cookie.duration}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function CookiesPage() {
  return (
    <PageShell className="py-12 sm:py-16">
      <article className="max-w-4xl">
        <p className="text-sm font-semibold uppercase tracking-wider text-brand">
          Legal
        </p>
        <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
          Cookie Policy
        </h1>
        <p className="mt-3 text-sm text-muted">Last updated: {LAST_UPDATED}</p>

        <div className="mt-10 space-y-10 text-muted leading-relaxed">
          <section className="max-w-3xl">
            <h2 className="text-xl font-bold text-foreground">How we use cookies</h2>
            <p className="mt-3">
              {SITE_NAME} uses cookies and similar technologies to operate the site
              and, only with your consent, to understand how visitors use our
              calculators. Non-essential cookies are blocked until you choose to
              allow them.
            </p>
            <p className="mt-3">
              You can update your choices at any time:
            </p>
            <div className="mt-4">
              <CookieSettingsLink className="inline-flex min-h-[44px] items-center justify-center rounded-xl bg-brand px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-dark" />
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground">
              {CATEGORY_LABELS.essential}
            </h2>
            <p className="mt-2 text-sm">
              These cookies are required and do not require consent under EU
              ePrivacy rules because they store your privacy choice.
            </p>
            <CookieTable cookies={COOKIE_REGISTRY} />
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground">
              {CATEGORY_LABELS.analytics}
            </h2>
            <p className="mt-2 text-sm">
              Loaded only if you click &quot;Accept all&quot; or enable Analytics in
              cookie preferences. If analytics is disabled, these cookies are not
              set.
            </p>
            <CookieTable cookies={ANALYTICS_COOKIES} />
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground">
              {CATEGORY_LABELS.marketing}
            </h2>
            <p className="mt-2 text-sm">
              {SITE_NAME} does not currently use marketing cookies. The category is
              available in preferences for transparency if this changes.
            </p>
            <CookieTable cookies={MARKETING_COOKIES} />
          </section>

          <section className="max-w-3xl">
            <h2 className="text-xl font-bold text-foreground">Browser controls</h2>
            <p className="mt-3">
              You can also delete or block cookies through your browser settings.
              Blocking strictly necessary cookies may prevent us from remembering
              your consent choice and the banner may reappear.
            </p>
          </section>
        </div>
      </article>
    </PageShell>
  );
}
