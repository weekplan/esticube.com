export const SITE_NAME = "EstiCube";
export const SITE_URL = "https://esticube.com";
export const SITE_TAGLINE = "Free Construction Cost Calculators for US Homeowners";

export const CALCULATORS = [
  {
    slug: "house",
    title: "House Building Cost Calculator",
    shortTitle: "House",
    description:
      "Full home construction estimator — foundation, basement, framing, roof, MEP & finishes. Cost ranges for every building phase.",
    href: "/calculators/house",
    icon: "house" as const,
    keywords: [
      "house building cost calculator",
      "home construction cost estimator",
      "cost to build a house",
      "new home construction cost",
    ],
  },
  {
    slug: "fence",
    title: "Fence Calculator",
    shortTitle: "Fence",
    description:
      "Estimate fence posts, panels, pickets, and installed cost per foot. Free fence material calculator for wood, vinyl, chain-link, and aluminum.",
    href: "/calculators/fence",
    icon: "fence" as const,
    keywords: [
      "fence cost calculator",
      "fence material calculator",
      "how much fence do I need",
      "fence post spacing calculator",
    ],
  },
  {
    slug: "deck",
    title: "Deck Calculator",
    shortTitle: "Deck",
    description:
      "Estimate decking boards, joists, footings, and total installed cost. Free deck material calculator with 2026 US price averages for wood, composite, and PVC.",
    href: "/calculators/deck",
    icon: "deck" as const,
    keywords: [
      "deck cost calculator",
      "deck board calculator",
      "deck material estimator",
      "how many deck boards do I need",
    ],
  },
  {
    slug: "irrigation",
    title: "Sprinkler & Irrigation Calculator",
    shortTitle: "Irrigation",
    description:
      "Size sprinkler zones, heads, pipe, and water flow for your lawn. Free irrigation calculator with 2026 US install cost estimates.",
    href: "/calculators/irrigation",
    icon: "irrigation" as const,
    keywords: [
      "sprinkler system calculator",
      "irrigation zone calculator",
      "lawn watering calculator",
      "how many sprinkler heads do I need",
    ],
  },
  {
    slug: "striping",
    title: "Parking Lot Line Striping Calculator",
    shortTitle: "Striping",
    description:
      "Estimate pavement marking linear feet, traffic paint gallons, and striping cost. Includes stalls, ADA symbols, fire lanes, arrows, and mobilization.",
    href: "/calculators/striping",
    icon: "striping" as const,
    keywords: [
      "line striping calculator",
      "parking lot striping cost",
      "pavement marking calculator",
      "striping paint calculator",
    ],
  },
] as const;

export type CalculatorSlug = (typeof CALCULATORS)[number]["slug"];
export type IconName = (typeof CALCULATORS)[number]["icon"];
