import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { CalculatorPageContent } from "@/components/calculators/CalculatorPageContent";
import { CalculatorPageHero } from "@/components/calculators/CalculatorPageHero";
import { JsonLd } from "@/components/seo/JsonLd";
import { houseContent } from "@/lib/content/house";
import { SITE_URL } from "@/lib/constants";
import {
  breadcrumbJsonLd,
  buildMetadata,
  faqJsonLd,
  howToJsonLd,
  imageObjectJsonLd,
  webAppJsonLd,
} from "@/lib/seo";

const HouseCalculator = dynamic(
  () =>
    import("@/components/calculators/HouseCalculator").then(
      (m) => m.HouseCalculator,
    ),
  {
    loading: () => (
      <div className="h-[32rem] animate-pulse rounded-2xl bg-surface-2" />
    ),
  },
);

const content = houseContent;
const url = `${SITE_URL}/calculators/house`;

export const metadata: Metadata = buildMetadata({
  title: content.meta.title,
  description: content.meta.description,
  path: "/calculators/house",
  keywords: content.meta.keywords,
  ogImage: "/illustrations/house-illustration.webp",
});

export default function HouseCalculatorPage() {
  return (
    <article>
      <JsonLd
        data={[
          webAppJsonLd(
            "House Building Cost Calculator",
            content.webAppDescription,
            url,
          ),
          breadcrumbJsonLd([
            { name: "Home", url: SITE_URL },
            { name: "House Building Cost Calculator", url },
          ]),
          faqJsonLd(content.faq.items),
          howToJsonLd(
            content.howTo.title,
            content.intro[0] ?? "",
            content.howTo.steps,
            url,
          ),
          imageObjectJsonLd(
            "House building cost calculator illustration",
            "House under construction showing foundation and framing",
            url,
            "/illustrations/house-illustration.webp",
          ),
        ]}
      />

      <CalculatorPageHero
        slug="house"
        title={content.hero.title}
        description={content.hero.description}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "House Calculator" },
        ]}
      />

      <CalculatorPageContent content={content}>
        <HouseCalculator />
      </CalculatorPageContent>
    </article>
  );
}
