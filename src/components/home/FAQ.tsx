import { PageShell } from "@/components/layout/PageShell";

const FAQS = [
  {
    question: "How accurate are these construction calculators?",
    answer:
      "Our calculators provide planning-level estimates based on national US averages for materials and labor. Actual costs vary by state, city, site conditions, and contractor. Use results for budgeting and material shopping — always get quotes from licensed local pros for final numbers.",
  },
  {
    question: "Are the calculators free to use?",
    answer:
      "Yes, every calculator on EstiCube is completely free. No account required, no hidden fees, and no email sign-up. We believe homeowners deserve access to the same estimating tools contractors use.",
  },
  {
    question: "What units do the calculators use?",
    answer:
      "All calculators use US customary units: feet and inches for dimensions, square feet for area, gallons for water volume, PSI for water pressure, and US dollars for cost estimates.",
  },
  {
    question: "Can contractors use these calculators?",
    answer:
      "Absolutely. Contractors, landscapers, and fence installers use EstiCube for quick on-site material takeoffs and client estimates. Results include material quantities and separate labor line items.",
  },
];

export function FAQ() {
  return (
    <section aria-labelledby="faq-heading" className="py-16 sm:py-24">
      <PageShell wide className="max-w-3xl">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-brand">
            FAQ
          </p>
          <h2
            id="faq-heading"
            className="mt-2 text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl"
          >
            Frequently asked questions
          </h2>
        </div>

        <dl className="mt-12 space-y-4">
          {FAQS.map((faq) => (
            <div
              key={faq.question}
              className="bento-card p-6"
            >
              <dt className="text-base font-bold text-foreground">{faq.question}</dt>
              <dd className="mt-2.5 text-sm text-muted leading-relaxed">
                {faq.answer}
              </dd>
            </div>
          ))}
        </dl>
      </PageShell>
    </section>
  );
}

export { FAQS };
