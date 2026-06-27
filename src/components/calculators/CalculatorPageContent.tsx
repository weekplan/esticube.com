import Link from "next/link";
import type { ReactNode } from "react";
import { IconArrowRight } from "@/components/icons";
import type { CalculatorSeoContent } from "@/lib/content/types";
import { CALCULATORS } from "@/lib/constants";
import { PageShell } from "@/components/layout/PageShell";

type CalculatorPageContentProps = {
  children: ReactNode;
  content: CalculatorSeoContent;
};

export function CalculatorPageContent({
  children,
  content,
}: CalculatorPageContentProps) {
  const related = CALCULATORS.filter((c) => c.slug !== content.slug);

  return (
    <PageShell className="py-10 sm:py-14">
      {/* Intro */}
      <div className="max-w-3xl space-y-4">
        {content.intro.map((paragraph) => (
          <p key={paragraph.slice(0, 40)} className="text-muted leading-relaxed">
            {paragraph}
          </p>
        ))}
      </div>

      {/* Calculator widget */}
      <div className="mt-8">{children}</div>

      {/* SEO content sections */}
      {content.sections.map((section) => (
        <section
          key={section.id}
          id={section.id}
          aria-labelledby={`${section.id}-heading`}
          className="mt-14 max-w-3xl"
        >
          <h2
            id={`${section.id}-heading`}
            className="text-xl font-bold text-foreground sm:text-2xl"
          >
            {section.title}
          </h2>
          <div className="mt-4 space-y-4">
            {section.paragraphs.map((paragraph) => (
              <p key={paragraph.slice(0, 40)} className="text-sm text-muted leading-relaxed sm:text-base">
                {paragraph}
              </p>
            ))}
          </div>
        </section>
      ))}

      {/* How-to */}
      <section
        aria-labelledby="how-to-heading"
        className="mt-14"
      >
        <h2
          id="how-to-heading"
          className="text-xl font-bold text-foreground sm:text-2xl"
        >
          {content.howTo.title}
        </h2>
        <ol className="bento-card mt-5 list-decimal space-y-3 p-6 pl-10 text-sm text-muted leading-relaxed sm:p-8 sm:text-base">
          {content.howTo.steps.map((step) => (
            <li key={step}>{step}</li>
          ))}
        </ol>
      </section>

      {/* FAQ */}
      <section aria-labelledby="calc-faq-heading" className="mt-14">
        <h2
          id="calc-faq-heading"
          className="text-xl font-bold text-foreground sm:text-2xl"
        >
          {content.faq.title}
        </h2>
        <dl className="mt-5 space-y-4">
          {content.faq.items.map((faq) => (
            <div key={faq.question} className="bento-card p-5 sm:p-6">
              <dt className="font-semibold text-foreground">{faq.question}</dt>
              <dd className="mt-2 text-sm text-muted leading-relaxed sm:text-base">
                {faq.answer}
              </dd>
            </div>
          ))}
        </dl>
      </section>

      {/* Internal links */}
      <section aria-labelledby="related-calculators" className="mt-14">
        <h2
          id="related-calculators"
          className="text-lg font-bold text-foreground"
        >
          More free calculators
        </h2>
        <ul className="mt-4 grid gap-3 sm:grid-cols-2">
          {related.map((calc) => (
            <li key={calc.slug}>
              <Link
                href={calc.href}
                className="bento-card group flex items-center justify-between p-4 sm:p-5"
              >
                <div>
                  <p className="font-semibold text-foreground">{calc.title}</p>
                  <p className="mt-0.5 text-sm text-muted line-clamp-2">
                    {calc.description}
                  </p>
                </div>
                <IconArrowRight
                  size={18}
                  className="shrink-0 text-brand transition-transform group-hover:translate-x-1"
                />
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </PageShell>
  );
}
