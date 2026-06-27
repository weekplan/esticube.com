import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { CalculatorPageContent } from "@/components/calculators/CalculatorPageContent";
import { CalculatorPageHero } from "@/components/calculators/CalculatorPageHero";
import { JsonLd } from "@/components/seo/JsonLd";
import { irrigationContent } from "@/lib/content/irrigation";
import { SITE_URL } from "@/lib/constants";
import {
  breadcrumbJsonLd,
  buildMetadata,
  faqJsonLd,
  howToJsonLd,
  imageObjectJsonLd,
  webAppJsonLd,
} from "@/lib/seo";

const IrrigationCalculator = dynamic(
  () =>
    import("@/components/calculators/IrrigationCalculator").then(
      (m) => m.IrrigationCalculator,
    ),
  {
    loading: () => (
      <div className="h-96 animate-pulse rounded-2xl bg-surface-2" />
    ),
  },
);

const content = irrigationContent;
const url = `${SITE_URL}/calculators/irrigation`;

export const metadata: Metadata = buildMetadata({
  title: content.meta.title,
  description: content.meta.description,
  path: "/calculators/irrigation",
  keywords: content.meta.keywords,
  ogImage: "/illustrations/irrigation-illustration.webp",
});

export default function IrrigationCalculatorPage() {
  return (
    <article>
      <JsonLd
        data={[
          webAppJsonLd(
            "Sprinkler & Irrigation Calculator",
            content.webAppDescription,
            url,
          ),
          breadcrumbJsonLd([
            { name: "Home", url: SITE_URL },
            { name: "Sprinkler & Irrigation Calculator", url },
          ]),
          faqJsonLd(content.faq.items),
          howToJsonLd(
            content.howTo.title,
            content.intro[0] ?? "",
            content.howTo.steps,
            url,
          ),
          imageObjectJsonLd(
            "Irrigation calculator illustration",
            "Lawn sprinkler system for irrigation cost estimation",
            url,
            "/illustrations/irrigation-illustration.webp",
          ),
        ]}
      />

      <CalculatorPageHero
        slug="irrigation"
        title={content.hero.title}
        description={content.hero.description}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Irrigation Calculator" },
        ]}
      />

      <CalculatorPageContent content={content}>
        <IrrigationCalculator />
      </CalculatorPageContent>
    </article>
  );
}
