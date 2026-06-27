import Link from "next/link";
import { IconTile } from "@/components/brand/IconTile";
import { ILLUSTRATIONS, Illustration } from "@/components/brand/Illustration";
import { IconArrowRight } from "@/components/icons";
import { PageShell } from "@/components/layout/PageShell";
import { CALCULATORS } from "@/lib/constants";

function CalcVisual({ slug, title, featured }: { slug: string; title: string; featured?: boolean }) {
  if (slug in ILLUSTRATIONS) {
    return (
      <Illustration
        name={slug as keyof typeof ILLUSTRATIONS}
        size="card"
        className="mx-auto transition-transform group-hover:scale-105"
      />
    );
  }
  return (
    <IconTile
      name={slug as "house"}
      label={title}
      size={featured ? "lg" : "md"}
      variant="solid"
    />
  );
}

export function CalculatorGrid() {
  return (
    <section id="calculators" aria-labelledby="calculators-heading" className="py-16 sm:py-24">
      <PageShell wide>
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-wider text-brand">
            Tools
          </p>
          <h2
            id="calculators-heading"
            className="mt-2 text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl"
          >
            Construction calculators
          </h2>
          <p className="mt-4 text-muted leading-relaxed">
            Free cost estimators for whole-home builds and outdoor projects.
            US measurements, regional averages, and realistic cost ranges.
          </p>
        </div>

        <ul className="mt-12 grid gap-6 lg:grid-cols-3">
          {CALCULATORS.map((calc, i) => (
            <li
              key={calc.slug}
              className={i === 0 ? "lg:col-span-3" : undefined}
            >
              <Link
                href={calc.href}
                className={`bento-card group flex h-full overflow-hidden ${
                  i === 0 ? "flex-col sm:flex-row sm:items-center" : "flex-col"
                }`}
              >
                <div
                  className={`flex items-center justify-center bg-gradient-to-br from-brand-light/60 to-surface-2 p-6 ${
                    i === 0 ? "sm:w-1/3 sm:min-w-[220px]" : ""
                  }`}
                >
                  <CalcVisual slug={calc.slug} title={calc.title} featured={i === 0} />
                </div>

                <div className={`flex flex-1 flex-col p-6 sm:p-7 ${i === 0 ? "sm:p-8" : ""}`}>
                  {i === 0 && (
                    <span className="mb-2 inline-flex w-fit rounded-full bg-brand/10 px-2.5 py-0.5 text-xs font-semibold text-brand">
                      Most comprehensive
                    </span>
                  )}
                  <h3 className="text-xl font-bold text-foreground">
                    {calc.title}
                  </h3>
                  <p className="mt-2 flex-1 text-sm text-muted leading-relaxed">
                    {calc.description}
                  </p>

                  <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-brand">
                    Open calculator
                    <IconArrowRight
                      size={16}
                      className="transition-transform group-hover:translate-x-1"
                    />
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </PageShell>
    </section>
  );
}
