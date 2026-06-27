export type FaqItem = {
  question: string;
  answer: string;
};

export type ContentSection = {
  id: string;
  title: string;
  paragraphs: string[];
};

export type CalculatorSeoContent = {
  slug: string;
  meta: {
    title: string;
    description: string;
    keywords: string[];
  };
  hero: {
    title: string;
    description: string;
  };
  intro: string[];
  sections: ContentSection[];
  howTo: {
    title: string;
    steps: string[];
  };
  faq: {
    title: string;
    items: FaqItem[];
  };
  webAppDescription: string;
};
