import type { CalculatorSeoContent } from "./types";

export const irrigationContent: CalculatorSeoContent = {
  slug: "irrigation",
  meta: {
    title: "Sprinkler System Calculator — Zones, Heads & Cost Estimator",
    description:
      "Size your lawn sprinkler system in minutes. Free irrigation calculator estimates zones, heads, pipe, GPM flow & 2026 US install costs for rotor, spray & drip systems.",
    keywords: [
      "sprinkler system calculator",
      "irrigation calculator",
      "lawn sprinkler calculator",
      "how many sprinkler heads do I need",
      "irrigation zone calculator",
      "sprinkler system cost",
      "lawn irrigation cost",
      "sprinkler head calculator",
      "irrigation system design",
      "how much does a sprinkler system cost",
      "rotor vs spray heads",
      "drip irrigation calculator",
      "lawn watering system cost",
    ],
  },
  hero: {
    title: "Sprinkler & Irrigation Calculator",
    description:
      "Design your lawn irrigation system with instant zone count, sprinkler head totals, pipe length, water flow (GPM), and installed cost. Built for US residential yards using rotor, spray, and drip systems.",
  },
  intro: [
    "An properly sized sprinkler system keeps your lawn green without wasting water or overloading your home's plumbing. The EstiCube irrigation calculator analyzes your lawn and garden square footage, sprinkler head type, soil conditions, and water pressure to estimate zones, head count, pipe runs, and total installation cost.",
    "Whether you are planning a new in-ground system for a half-acre lot or upgrading an outdated sprinkler setup, use this tool to understand system scope and budget before hiring an irrigation contractor or starting a DIY install.",
  ],
  sections: [
    {
      id: "irrigation-cost-guide",
      title: "How much does a sprinkler system cost in the US?",
      paragraphs: [
        "A professionally installed residential sprinkler system in the United States costs $2,500 to $8,000 for most homes, with an average of $3,500–$5,000 for a 5,000 sq ft lawn. Cost drivers include yard size, number of zones, head type, soil conditions, and whether your water meter can support the required flow rate.",
        "Per-square-foot pricing averages $0.50–$1.50 for installation. A basic 4-zone system for a quarter-acre lot might run $2,800. A 8-zone system with rotor heads, drip lines for garden beds, and a smart WiFi controller can exceed $7,000. DIY installation cuts labor costs by 50–60% but requires trenching equipment and plumbing knowledge.",
        "Ongoing costs: expect $100–$300 annually for winterization in cold climates and $50–$150 for spring startup and head adjustments. Smart controllers save 15–30% on water bills by adjusting for weather.",
      ],
    },
    {
      id: "irrigation-design",
      title: "How sprinkler zones and heads work",
      paragraphs: [
        "Each irrigation zone is a circuit of sprinkler heads that run simultaneously, controlled by one valve. Residential systems typically limit each zone to 10–12 gallons per minute (GPM) to stay within household water supply capacity. Larger lawns need more zones — not more heads per zone.",
        "Rotor heads cover large open areas (1,500–2,800 sq ft each) with rotating streams. Spray heads cover smaller areas and corners (150–250 sq ft each) with fixed patterns. Drip irrigation delivers water directly to garden bed roots with minimal evaporation — ideal for shrubs, flowers, and vegetable gardens.",
      ],
    },
    {
      id: "irrigation-planning-tips",
      title: "Sprinkler system planning tips",
      paragraphs: [
        "Test your water pressure and flow rate before designing a system. Attach a pressure gauge to an outdoor spigot — most homes deliver 40–80 PSI. Measure flow by timing how long it takes to fill a 5-gallon bucket. If flow is under 8 GPM, you may need more zones or a larger water meter upgrade.",
        "Separate sunny and shady areas into different zones since they need different watering durations. Keep spray heads and rotor heads on separate zones — they apply water at different rates and cannot run together efficiently. Check local watering restrictions and backflow preventer requirements before installation.",
      ],
    },
  ],
  howTo: {
    title: "How to use the sprinkler system calculator",
    steps: [
      "Measure your total lawn area and garden bed area in square feet. Use satellite maps or a measuring wheel for accuracy.",
      "Select sprinkler head type: rotors for large open lawns, spray heads for small or irregular areas, drip for garden beds.",
      "Choose your soil type — sandy soil drains fast and needs more water; clay holds moisture longer.",
      "Enter your home water pressure in PSI (measure at an outdoor faucet with a $15 pressure gauge).",
      "Review zone count, head quantity, pipe length, GPM requirement, weekly water usage, and installed cost.",
      "Share the estimate with irrigation contractors for accurate bids, or use it to plan a DIY zone layout.",
    ],
  },
  faq: {
    title: "Sprinkler system calculator FAQ",
    items: [
      {
        question: "How many sprinkler zones do I need?",
        answer:
          "Divide your total system GPM requirement by your available flow per zone (typically 10–12 GPM for residential homes). A 5,000 sq ft lawn with rotor heads needs roughly 2 heads (5,000 ÷ 2,500 coverage), using ~7 GPM — fitting in one zone. A full acre (43,560 sq ft) typically needs 4–6 zones. Our calculator determines optimal zone count automatically.",
      },
      {
        question: "How many sprinkler heads do I need for my lawn?",
        answer:
          "Divide your lawn square footage by each head's coverage area: rotor heads cover ~2,500 sq ft, spray heads ~200 sq ft, drip zones ~100 sq ft. A 5,000 sq ft lawn with rotors needs about 2 heads. The same lawn with spray heads needs 25 heads. Overlapping head-to-head coverage is required for even watering — never space heads at their maximum radius.",
      },
      {
        question: "How much does a sprinkler system cost for 1 acre?",
        answer:
          "Irrigating one acre (43,560 sq ft) typically costs $6,000–$12,000 installed in the US. Large properties need 6–10 zones, 15–25 rotor heads, extensive pipe runs, and often a booster pump if municipal flow is insufficient. Per-zone costs run $500–$800 for materials and $400–$600 for labor.",
      },
      {
        question: "Rotor heads vs spray heads — which should I use?",
        answer:
          "Use rotor heads for open lawn areas larger than 30×30 feet — they throw water 25–50 feet and cover up to 2,800 sq ft per head. Use spray heads for areas smaller than 30 feet wide, strips along sidewalks, and corners. Never mix rotors and sprays on the same zone because they apply water at different rates. Use drip irrigation for garden beds, trees, and shrubs.",
      },
      {
        question: "What GPM do I need for a sprinkler system?",
        answer:
          "Calculate total GPM by multiplying head count by each head's flow rate: rotors use ~3.5 GPM, sprays ~1.5 GPM, drip ~0.5 GPM per zone. A zone with 3 rotors needs ~10.5 GPM. Most residential water meters supply 12–20 GPM total. If your system needs more GPM than your supply, add zones so each runs independently within capacity.",
      },
      {
        question: "How much water does a lawn sprinkler system use?",
        answer:
          "A typical US lawn needs about 1 inch of water per week during summer — roughly 0.62 gallons per square foot. A 5,000 sq ft lawn uses approximately 3,100 gallons per week. Sandy soil needs 20–30% more; clay needs 15–20% less. Our calculator estimates weekly water usage based on your total area and soil type.",
      },
      {
        question: "How much does it cost to install a sprinkler system yourself?",
        answer:
          "DIY sprinkler installation costs $0.25–$0.50 per square foot for materials — $1,250–$2,500 for a 5,000 sq ft lawn. You will need to rent a trencher ($150–$250/day), buy a controller ($80–$300), valves ($25–$40 each), heads ($8–$20 each), and pipe ($0.50–$1.50/ft). Budget a full weekend per zone for trenching, pipe laying, and testing.",
      },
      {
        question: "Do I need a backflow preventer for my sprinkler system?",
        answer:
          "Yes — virtually all US municipalities require an approved backflow preventer on irrigation systems connected to potable water. It stops lawn chemicals and soil bacteria from entering your drinking water. Installation costs $150–$400 for the device plus $75–$150 for annual testing in most states. Check your local water utility requirements.",
      },
      {
        question: "When is the best time to water your lawn?",
        answer:
          "Water between 4 AM and 10 AM when evaporation is lowest and wind is calm. Most US lawns need 1–1.5 inches of water per week, split across 2–3 watering days per local restrictions. Avoid evening watering — it promotes fungal disease. Smart WiFi controllers adjust schedules automatically based on weather and soil moisture.",
      },
      {
        question: "How long does sprinkler system installation take?",
        answer:
          "Professional irrigation contractors install a standard 4–6 zone residential system in 1–2 days for a typical suburban lot. Larger properties (half acre or more) take 3–5 days. DIY installation takes 2–4 weekends depending on experience, soil hardness, and zone count. Winterization and spring startup each take 1–2 hours annually.",
      },
    ],
  },
  webAppDescription:
    "Free sprinkler and irrigation calculator for US homeowners. Estimate zones, heads, pipe length, water flow, and installed cost for rotor, spray, and drip systems.",
};
