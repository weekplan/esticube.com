import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { CalculatorPageContent } from "@/components/calculators/CalculatorPageContent";
import { CalculatorPageHero } from "@/components/calculators/CalculatorPageHero";
import { JsonLd } from "@/components/seo/JsonLd";
import { fenceContent } from "@/lib/content/fence";
import { SITE_URL } from "@/lib/constants";
import {
  breadcrumbJsonLd,
  buildMetadata,
  faqJsonLd,
  howToJsonLd,
  imageObjectJsonLd,
  webAppJsonLd,
} from "@/lib/seo";

const FenceCalculator = dynamic(
  () =>
    import("@/components/calculators/FenceCalculator").then(
      (m) => m.FenceCalculator,
    ),
  {
    loading: () => (
      <div className="h-96 animate-pulse rounded-2xl bg-surface-2" />
    ),
  },
);

const content = fenceContent;
const url = `${SITE_URL}/calculators/fence`;

export const metadata: Metadata = buildMetadata({
  title: content.meta.title,
  description: content.meta.description,
  path: "/calculators/fence",
  keywords: content.meta.keywords,
  ogImage: "/illustrations/fence-illustration.webp",
});

export default function FenceCalculatorPage() {
  return (
    <article>
      <JsonLd
        data={[
          webAppJsonLd("Fence Cost Calculator", content.webAppDescription, url),
          breadcrumbJsonLd([
            { name: "Home", url: SITE_URL },
            { name: "Fence Cost Calculator", url },
          ]),
          faqJsonLd(content.faq.items),
          howToJsonLd(
            content.howTo.title,
            content.intro[0] ?? "",
            content.howTo.steps,
            url,
          ),
          imageObjectJsonLd(
            "Fence calculator illustration",
            "Privacy fence installation for fence cost estimation",
            url,
            "/illustrations/fence-illustration.webp",
          ),
        ]}
      />

      <CalculatorPageHero
        slug="fence"
        title={content.hero.title}
        description={content.hero.description}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Fence Calculator" },
        ]}
      />

      <CalculatorPageContent content={content}>
        <FenceCalculator />
      </CalculatorPageContent>
    </article>
  );
}
