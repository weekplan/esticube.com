import type { CookieCategory } from "./consent";

export type CookieDefinition = {
  name: string;
  category: CookieCategory;
  purpose: string;
  provider: string;
  duration: string;
};

export const COOKIE_REGISTRY: CookieDefinition[] = [
  {
    name: "esticube_consent",
    category: "essential",
    purpose:
      "Stores your cookie consent choices so we do not ask again on every visit.",
    provider: "EstiCube",
    duration: "12 months",
  },
];

export const ANALYTICS_COOKIES: CookieDefinition[] = [
  {
    name: "_ga",
    category: "analytics",
    purpose: "Distinguishes unique users for Google Analytics.",
    provider: "Google",
    duration: "2 years",
  },
  {
    name: "_ga_*",
    category: "analytics",
    purpose: "Maintains session state for Google Analytics 4.",
    provider: "Google",
    duration: "2 years",
  },
];

export const MARKETING_COOKIES: CookieDefinition[] = [];

export const CATEGORY_LABELS: Record<CookieCategory, string> = {
  essential: "Strictly necessary",
  analytics: "Analytics",
  marketing: "Marketing",
};

export const CATEGORY_DESCRIPTIONS: Record<CookieCategory, string> = {
  essential:
    "Required for the site to function and to remember your consent. These cannot be disabled.",
  analytics:
    "Help us understand how visitors use EstiCube so we can improve calculators and performance. Loaded only if you opt in.",
  marketing:
    "Used to measure ad campaigns or show relevant offers. EstiCube does not currently use marketing cookies.",
};
