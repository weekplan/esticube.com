import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { CalculatorPageContent } from "@/components/calculators/CalculatorPageContent";
import { CalculatorPageHero } from "@/components/calculators/CalculatorPageHero";
import { JsonLd } from "@/components/seo/JsonLd";
import { stripingContent } from "@/lib/content/striping";
import { SITE_URL } from "@/lib/constants";
import {
  breadcrumbJsonLd,
  buildMetadata,
  faqJsonLd,
  howToJsonLd,
  webAppJsonLd,
} from "@/lib/seo";

const StripingCalculator = dynamic(
  () =>
    import("@/components/calculators/StripingCalculator").then(
      (m) => m.StripingCalculator,
    ),
  {
    loading: () => (
      <div className="h-96 animate-pulse rounded-2xl bg-surface-2" />
    ),
  },
);

const content = stripingContent;
const url = `${SITE_URL}/calculators/striping`;

export const metadata: Metadata = buildMetadata({
  title: content.meta.title,
  description: content.meta.description,
  path: "/calculators/striping",
  keywords: content.meta.keywords,
});

export default function StripingCalculatorPage() {
  return (
    <article>
      <JsonLd
        data={[
          webAppJsonLd(
            "Parking Lot Line Striping Calculator",
            content.webAppDescription,
            url,
          ),
          breadcrumbJsonLd([
            { name: "Home", url: SITE_URL },
            { name: "Line Striping Calculator", url },
          ]),
          faqJsonLd(content.faq.items),
          howToJsonLd(
            content.howTo.title,
            content.intro[0] ?? "",
            content.howTo.steps,
            url,
          ),
        ]}
      />

      <CalculatorPageHero
        slug="striping"
        title={content.hero.title}
        description={content.hero.description}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Line Striping Calculator" },
        ]}
      />

      <CalculatorPageContent content={content}>
        <StripingCalculator />
      </CalculatorPageContent>
    </article>
  );
}
