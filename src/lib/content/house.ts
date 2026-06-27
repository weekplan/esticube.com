import type { CalculatorSeoContent } from "./types";

export const houseContent: CalculatorSeoContent = {
  slug: "house",
  meta: {
    title: "House Building Cost Calculator — Full Construction Estimate",
    description:
      "Estimate the full cost to build a house in the US. Free calculator with cost ranges for foundation, basement, framing, roof, MEP & finishes — not a single fixed price.",
    keywords: [
      "house building cost calculator",
      "home construction cost estimator",
      "cost to build a house",
      "cost to build a house per square foot",
      "new home construction cost calculator",
      "house foundation cost calculator",
      "basement construction cost",
      "house framing cost estimate",
      "roof replacement cost new build",
      "custom home build cost",
      "residential construction estimator",
      "how much does it cost to build a house",
    ],
  },
  hero: {
    title: "House Building Cost Calculator",
    description:
      "Estimate the full cost to build a new home — foundation, basement, framing, roof, exterior, MEP, and interior finishes. Every line item shows a realistic cost range, not a false-precise number.",
  },
  intro: [
    "Building a new home is the largest financial project most Americans ever undertake — and early cost clarity is essential before you buy land, hire an architect, or sign with a builder. The EstiCube house building cost calculator breaks your project into major construction phases and returns cost ranges based on 2026 US national data.",
    "Unlike simple per-square-foot calculators that give one misleading number, this estimator accounts for your foundation type (slab, crawl space, or basement), wall construction, roof material, finish level, garage, and regional labor costs. Use the ranges for budgeting, financing conversations, and comparing builder proposals.",
  ],
  sections: [
    {
      id: "house-cost-overview",
      title: "How much does it cost to build a house in the US?",
      paragraphs: [
        "In 2026, the cost to build a new single-family home in the United States typically falls between $150 and $400+ per square foot of living area, depending on finish quality, location, and design complexity. A 2,400 sq ft home with standard finishes averages $432,000–$600,000 nationally — but can exceed $900,000 in high-cost metros or drop below $350,000 in rural areas with economy finishes.",
        "Our calculator returns ranges rather than single numbers because real project costs depend on dozens of variables: soil conditions affect foundation price, roof pitch changes roofing area, and cabinet selections alone can swing interior costs by $50,000 or more. Ranges reflect what contractors actually experience on jobsites.",
        "These estimates include construction costs only — not land purchase, architectural fees ($15,000–$80,000), engineering, or financing costs. Add 8–12% contingency on top of any estimate for change orders and unforeseen conditions.",
      ],
    },
    {
      id: "house-cost-breakdown",
      title: "What is included in the cost breakdown?",
      paragraphs: [
        "The estimator covers seven major construction categories plus optional garage: site work and permits, foundation and basement, framing and structural walls, roof structure and covering, exterior envelope (siding, windows, doors, insulation), plumbing/electrical/HVAC systems, and interior finishes (drywall, flooring, cabinets, fixtures, paint).",
        "Foundation and basement costs vary dramatically. A slab-on-grade foundation on flat land might run $15,000–$30,000 for a 1,200 sq ft footprint, while a finished basement adds $75,000–$150,000+ to the same footprint. Framing and roof together typically represent 22–32% of total shell cost before any interior work begins.",
        "MEP systems (mechanical, electrical, plumbing) and interior finishes together account for 45–60% of total construction cost on most US homes — which is why finish level selection has the largest impact on your final range.",
      ],
    },
    {
      id: "house-planning",
      title: "Planning your custom home build",
      paragraphs: [
        "Start with a realistic living area target and foundation decision before engaging builders. In northern US climates, full basements are common and add usable square footage at lower cost per foot than above-grade construction. In the South and West, slab-on-grade dominates due to soil conditions and frost depth.",
        "Get at least three bids from licensed general contractors or builders once you have preliminary plans. Use this calculator's range as a sanity check — if a bid falls far below the low end, ask what is excluded. If far above the high end, understand what upgrades drive the premium.",
        "Budget land, utility connections, driveway, and landscaping separately. These site costs add $30,000–$150,000+ beyond the house itself on many lots, especially rural parcels requiring septic, well, or long driveway installation.",
      ],
    },
  ],
  howTo: {
    title: "How to use the house building cost calculator",
    steps: [
      "Enter your total living area in square feet — all heated floors combined, not including garage or unfinished attic.",
      "Select the number of stories. This determines footprint size, which affects foundation and roof costs.",
      "Choose your foundation type: slab, crawl space, unfinished basement, or finished basement.",
      "Pick wall construction (wood frame is most common in the US) and roof material.",
      "Select your finish level from economy builder-grade to luxury custom — this significantly affects interior and exterior costs.",
      "Set your region cost factor and garage size to adjust for local labor and material prices.",
      "Review the cost range breakdown by category. Use the total range for early budgeting and financing discussions.",
    ],
  },
  faq: {
    title: "House building cost calculator FAQ",
    items: [
      {
        question: "How much does it cost to build a 2,000 sq ft house?",
        answer:
          "A 2,000 sq ft new home typically costs $300,000–$500,000 to build in the US in 2026, depending on finish level and location. Economy builds in lower-cost regions start around $260,000–$340,000. Premium builds in coastal metros can reach $700,000–$900,000+. Use the calculator with your specific foundation, finish, and region settings for a personalized range.",
      },
      {
        question: "How much does a house foundation cost?",
        answer:
          "Foundation costs depend on type and footprint size. A concrete slab runs $9–$15 per square foot of footprint. Crawl space foundations cost $14–$22/sq ft. An unfinished basement costs $30–$46/sq ft of footprint including walls and waterproofing. A finished basement ranges $62–$92/sq ft. For a 1,200 sq ft footprint, expect $11,000–$18,000 for slab or $36,000–$110,000 for finished basement.",
      },
      {
        question: "How much does it cost to finish a basement?",
        answer:
          "Finishing a basement beyond the unfinished shell adds approximately $32–$46 per square foot for framing, insulation, drywall, flooring, electrical, plumbing rough-in, and basic finishes. A 1,200 sq ft finished basement adds roughly $38,000–$55,000 on top of the unfinished basement cost. High-end finishes with bathrooms, wet bars, and custom trim push costs toward $70–$90/sq ft.",
      },
      {
        question: "What is the cost to frame a house?",
        answer:
          "Framing costs typically run $16–$26 per square foot of living area for wood frame construction in the US, including floor systems, exterior walls, interior load-bearing walls, and roof trusses or rafters. ICF and concrete block walls cost 10–22% more. For a 2,400 sq ft two-story home, framing labor and materials range $38,000–$62,000 before roof sheathing and exterior wrap.",
      },
      {
        question: "How much does a new roof cost on a house?",
        answer:
          "New construction roofing costs $6–$30 per square foot of roof area depending on material. Asphalt shingles are $6–$10/sq ft installed. Architectural shingles $9–$15/sq ft. Standing seam metal $13–$24/sq ft. Clay or concrete tile $16–$30/sq ft. A 1,500 sq ft roof area (typical for a 2-story 2,400 sq ft home) ranges $9,000–$45,000 depending on material choice.",
      },
      {
        question: "How much does it cost to build a house per square foot?",
        answer:
          "National averages in 2026: economy builds $130–$180/sq ft, standard mid-range $180–$250/sq ft, premium $250–$350/sq ft, and luxury custom homes $350–$500+/sq ft. These figures include all construction phases but not land. High-cost cities like San Francisco, New York, and Honolulu can exceed $600/sq ft for premium construction.",
      },
      {
        question: "Is it cheaper to build or buy a house?",
        answer:
          "In most US markets in 2026, buying an existing home is faster and sometimes cheaper due to high construction labor costs. Building custom makes sense when you own land, need specific design, or live in areas with limited housing inventory. Custom builds offer exact layout control but typically take 10–18 months and require more oversight. Compare our build estimate against local resale prices per square foot.",
      },
      {
        question: "How long does it take to build a new house?",
        answer:
          "A production builder home takes 6–9 months from permit to completion. Custom homes average 10–18 months depending on size, complexity, and weather. Foundation work takes 2–4 weeks, framing 3–6 weeks, MEP rough-in 4–8 weeks, and interior finishes 8–16 weeks. Supply chain delays and permit backlogs in busy markets can add months.",
      },
      {
        question: "What is not included in this estimate?",
        answer:
          "This calculator covers construction hard costs only. Excluded items: land purchase, architectural and engineering fees ($15,000–$80,000), survey and soil testing, utility tap fees, driveway and sidewalk, landscaping, furniture, appliances (sometimes excluded by builders), property taxes during construction, construction loan interest, and HOA fees. Budget these separately.",
      },
      {
        question: "Why does the calculator show ranges instead of exact prices?",
        answer:
          "Exact construction prices are impossible to predict without site-specific bids. Soil bearing capacity, labor availability, material price volatility, and design changes all affect final cost. Ranges reflect real-world variability and prevent false precision. Use the low end for conservative planning and the high end for financing buffers. Always obtain licensed contractor bids before committing.",
      },
    ],
  },
  webAppDescription:
    "Free house building cost calculator for US homeowners. Estimate cost ranges for foundation, basement, framing, roof, MEP, and interior finishes.",
};
