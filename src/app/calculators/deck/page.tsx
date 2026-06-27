import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { CalculatorPageContent } from "@/components/calculators/CalculatorPageContent";
import { CalculatorPageHero } from "@/components/calculators/CalculatorPageHero";
import { JsonLd } from "@/components/seo/JsonLd";
import { deckContent } from "@/lib/content/deck";
import { SITE_URL } from "@/lib/constants";
import {
  breadcrumbJsonLd,
  buildMetadata,
  faqJsonLd,
  howToJsonLd,
  imageObjectJsonLd,
  webAppJsonLd,
} from "@/lib/seo";

const DeckCalculator = dynamic(
  () =>
    import("@/components/calculators/DeckCalculator").then(
      (m) => m.DeckCalculator,
    ),
  {
    loading: () => (
      <div className="h-96 animate-pulse rounded-2xl bg-surface-2" />
    ),
  },
);

const content = deckContent;
const url = `${SITE_URL}/calculators/deck`;

export const metadata: Metadata = buildMetadata({
  title: content.meta.title,
  description: content.meta.description,
  path: "/calculators/deck",
  keywords: content.meta.keywords,
  ogImage: "/illustrations/deck-illustration.webp",
});

export default function DeckCalculatorPage() {
  return (
    <article>
      <JsonLd
        data={[
          webAppJsonLd("Deck Cost Calculator", content.webAppDescription, url),
          breadcrumbJsonLd([
            { name: "Home", url: SITE_URL },
            { name: "Deck Cost Calculator", url },
          ]),
          faqJsonLd(content.faq.items),
          howToJsonLd(
            content.howTo.title,
            content.intro[0] ?? "",
            content.howTo.steps,
            url,
          ),
          imageObjectJsonLd(
            "Deck calculator illustration",
            "Wooden deck with railing for deck cost estimation",
            url,
            "/illustrations/deck-illustration.webp",
          ),
        ]}
      />

      <CalculatorPageHero
        slug="deck"
        title={content.hero.title}
        description={content.hero.description}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Deck Calculator" },
        ]}
      />

      <CalculatorPageContent content={content}>
        <DeckCalculator />
      </CalculatorPageContent>
    </article>
  );
}
