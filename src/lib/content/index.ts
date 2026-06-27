import { deckContent } from "./deck";
import { fenceContent } from "./fence";
import { houseContent } from "./house";
import { irrigationContent } from "./irrigation";
import type { CalculatorSeoContent } from "./types";

export const CALCULATOR_CONTENT: Record<string, CalculatorSeoContent> = {
  house: houseContent,
  deck: deckContent,
  fence: fenceContent,
  irrigation: irrigationContent,
};

export function getCalculatorContent(slug: string): CalculatorSeoContent {
  const content = CALCULATOR_CONTENT[slug];
  if (!content) throw new Error(`Unknown calculator content: ${slug}`);
  return content;
}

export { deckContent, fenceContent, houseContent, irrigationContent };
export type { CalculatorSeoContent, FaqItem, ContentSection } from "./types";
