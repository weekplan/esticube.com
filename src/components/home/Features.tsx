import {
  IconDollar,
  IconMobile,
  IconRuler,
  IconShield,
  IconSpeed,
} from "@/components/icons";
import { PageShell } from "@/components/layout/PageShell";

const FEATURES = [
  {
    icon: IconSpeed,
    title: "Lightning Fast",
    description:
      "Zero bloat, no sign-up. Results update instantly as you type — optimized for 100/100 Core Web Vitals.",
    color: "bg-amber-50 text-amber-600 ring-amber-100",
  },
  {
    icon: IconMobile,
    title: "Mobile First",
    description:
      "Designed for phones and tablets first. Large touch targets, readable text, and thumb-friendly controls.",
    color: "bg-blue-50 text-blue-600 ring-blue-100",
  },
  {
    icon: IconDollar,
    title: "US Cost Data",
    description:
      "Estimates based on typical US material prices and labor rates. Plan your budget before calling contractors.",
    color: "bg-emerald-50 text-emerald-600 ring-emerald-100",
  },
  {
    icon: IconRuler,
    title: "Imperial Units",
    description:
      "Feet, inches, square feet, gallons, and PSI — the measurements American homeowners actually use.",
    color: "bg-violet-50 text-violet-600 ring-violet-100",
  },
  {
    icon: IconShield,
    title: "100% Free",
    description:
      "No accounts, no paywalls, no email capture. Professional-grade calculators available to everyone.",
    color: "bg-rose-50 text-rose-600 ring-rose-100",
  },
];

export function Features() {
  return (
    <section
      aria-labelledby="features-heading"
      className="border-y border-border bg-surface py-16 sm:py-24"
    >
      <PageShell wide>
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-brand">
            Why EstiCube
          </p>
          <h2
            id="features-heading"
            className="mt-2 text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl"
          >
            Built for homeowners &amp; pros
          </h2>
        </div>

        <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((feature) => (
            <li
              key={feature.title}
              className="bento-card flex flex-col p-6 sm:p-7"
            >
              <span
                className={`flex h-16 w-16 items-center justify-center rounded-2xl ring-1 ${feature.color}`}
              >
                <feature.icon size={32} strokeWidth={1.5} />
              </span>
              <h3 className="mt-5 text-lg font-bold text-foreground">
                {feature.title}
              </h3>
              <p className="mt-2 text-sm text-muted leading-relaxed">
                {feature.description}
              </p>
            </li>
          ))}
        </ul>
      </PageShell>
    </section>
  );
}
