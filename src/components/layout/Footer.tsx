import Link from "next/link";
import { Logo } from "@/components/brand/Logo";
import { CookieSettingsLink } from "@/components/consent/CookieSettingsLink";
import { CALCULATORS, SITE_TAGLINE } from "@/lib/constants";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-border bg-foreground text-white">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Logo size="md" className="text-white [&_span]:text-white [&_.text-brand]:text-brand-light" />
            <p className="mt-4 max-w-sm text-sm text-white/65 leading-relaxed">
              {SITE_TAGLINE}. Instant material and cost estimates for US
              homeowners and contractors.
            </p>
          </div>

          <nav aria-label="Calculator links" className="lg:col-span-3">
            <p className="text-xs font-semibold uppercase tracking-wider text-white/45">
              Calculators
            </p>
            <ul className="mt-4 space-y-3">
              {CALCULATORS.map((calc) => (
                <li key={calc.slug}>
                  <Link
                    href={calc.href}
                    className="text-sm text-white/75 transition-colors hover:text-brand-light"
                  >
                    {calc.title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="lg:col-span-4">
            <p className="text-xs font-semibold uppercase tracking-wider text-white/45">
              Why EstiCube
            </p>
            <ul className="mt-4 space-y-2 text-sm text-white/65">
              <li>Free — no sign-up required</li>
              <li>US measurements &amp; cost data</li>
              <li>Mobile-first, instant results</li>
              <li>Built for 100/100 Core Web Vitals</li>
            </ul>

            <p className="mt-8 text-xs font-semibold uppercase tracking-wider text-white/45">
              Legal
            </p>
            <ul className="mt-4 space-y-3">
              <li>
                <Link
                  href="/privacy"
                  className="text-sm text-white/75 transition-colors hover:text-brand-light"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/cookies"
                  className="text-sm text-white/75 transition-colors hover:text-brand-light"
                >
                  Cookie Policy
                </Link>
              </li>
              <li>
                <CookieSettingsLink />
              </li>
            </ul>
          </div>
        </div>

        <p className="mt-12 border-t border-white/10 pt-6 text-xs text-white/40">
          © {year} EstiCube. Estimates are for planning purposes only.
          Actual costs vary by region, labor rates, and site conditions.
        </p>
      </div>
    </footer>
  );
}
