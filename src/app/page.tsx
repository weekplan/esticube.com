import Link from "next/link";
import { Illustration } from "@/components/brand/Illustration";
import { CalculatorGrid } from "@/components/home/CalculatorGrid";
import { FAQ, FAQS } from "@/components/home/FAQ";
import { Features } from "@/components/home/Features";
import { IconArrowRight } from "@/components/icons";
import { PageShell } from "@/components/layout/PageShell";
import { JsonLd } from "@/components/seo/JsonLd";
import { CALCULATORS } from "@/lib/constants";
import { faqJsonLd } from "@/lib/seo";

const STATS = [
  { value: "5", label: "Free calculators" },
  { value: "0$", label: "Always free" },
  { value: "100", label: "CWV score target" },
];

export default function HomePage() {
  return (
    <>
      <JsonLd data={faqJsonLd(FAQS)} />

      <section className="relative overflow-hidden">
        <div className="hero-grid pointer-events-none absolute inset-0" aria-hidden="true" />
        <div className="pointer-events-none absolute -left-32 top-0 h-96 w-96 rounded-full bg-brand/15 blur-3xl" aria-hidden="true" />
        <div className="pointer-events-none absolute -right-32 bottom-0 h-80 w-80 rounded-full bg-accent/10 blur-3xl" aria-hidden="true" />

        <PageShell wide className="relative py-12 sm:py-16 lg:py-24">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <div className="text-center lg:text-left">
              <span className="inline-flex items-center gap-2 rounded-full border border-brand/20 bg-brand-light px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-brand">
                2026 · US Construction Estimators
              </span>
              <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl lg:text-6xl lg:leading-[1.08]">
                Estimate smarter.
                <br />
                <span className="bg-gradient-to-r from-brand to-brand-dark bg-clip-text text-transparent">
                  Build with confidence.
                </span>
              </h1>
              <p className="mt-5 max-w-xl text-base text-muted leading-relaxed sm:text-lg lg:mx-0 mx-auto">
                Free construction cost estimates — from full home builds to fences,
                decks, and irrigation. Realistic cost ranges, built for US homeowners.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center lg:justify-start">
                <Link
                  href={CALCULATORS[0].href}
                  className="inline-flex min-h-[52px] items-center justify-center gap-2 rounded-2xl bg-brand px-7 py-3.5 text-base font-semibold text-white shadow-lg shadow-brand/25 transition-all hover:bg-brand-dark hover:shadow-brand/35"
                >
                  Estimate house build cost
                  <IconArrowRight size={18} />
                </Link>
                <Link
                  href="#calculators"
                  className="inline-flex min-h-[52px] items-center justify-center rounded-2xl border border-border bg-surface px-7 py-3.5 text-base font-semibold text-foreground transition-colors hover:bg-surface-2"
                >
                  Browse calculators
                </Link>
              </div>

              <dl className="mt-10 grid grid-cols-3 gap-4 border-t border-border pt-8">
                {STATS.map((stat) => (
                  <div key={stat.label}>
                    <dt className="text-2xl font-extrabold text-foreground sm:text-3xl">
                      {stat.value}
                    </dt>
                    <dd className="mt-0.5 text-xs text-muted sm:text-sm">{stat.label}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <Illustration
              name="hero"
              size="hero"
              priority
              className="mx-auto lg:ml-auto"
            />
          </div>
        </PageShell>
      </section>

      <CalculatorGrid />
      <Features />
      <FAQ />
    </>
  );
}
