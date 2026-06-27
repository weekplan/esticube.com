export type CostRange = { low: number; high: number };

export type FoundationType =
  | "slab"
  | "crawl"
  | "basement-unfinished"
  | "basement-finished";

export type WallType = "wood-frame" | "icf" | "cmu" | "sip";

export type RoofType = "asphalt" | "architectural" | "metal" | "tile";

export type RoofPitch = "low" | "medium" | "steep";

export type SidingType = "vinyl" | "fiber-cement" | "brick" | "stone";

export type HvacType = "standard" | "high-efficiency" | "geothermal";

export type SiteSlope = "flat" | "moderate" | "steep";

export type CeilingHeight = 8 | 9 | 10;

export type FinishLevel = "economy" | "standard" | "premium" | "luxury";

export type RegionFactor = "low" | "average" | "high" | "very-high";

export type GarageSize = 0 | 1 | 2 | 3;

export type HouseInput = {
  livingAreaSqFt: number;
  stories: 1 | 2 | 3;
  bedrooms: number;
  bathrooms: number;
  ceilingHeightFt: CeilingHeight;
  foundation: FoundationType;
  wallType: WallType;
  roofType: RoofType;
  roofPitch: RoofPitch;
  sidingType: SidingType;
  finishLevel: FinishLevel;
  hvacType: HvacType;
  fireplaces: number;
  deckSqFt: number;
  siteSlope: SiteSlope;
  region: RegionFactor;
  garageBays: GarageSize;
  contingencyPercent: number;
};

export type LineItem = {
  id: string;
  label: string;
  description: string;
  cost: CostRange;
};

export type HouseResult = {
  footprintSqFt: number;
  roofAreaSqFt: number;
  lineItems: LineItem[];
  subtotal: CostRange;
  contingency: CostRange;
  total: CostRange;
  costPerSqFt: CostRange;
};

const REGION_MULTIPLIER: Record<RegionFactor, { low: number; high: number }> = {
  low: { low: 0.82, high: 0.88 },
  average: { low: 1.0, high: 1.0 },
  high: { low: 1.18, high: 1.28 },
  "very-high": { low: 1.35, high: 1.55 },
};

const WALL_MULTIPLIER: Record<WallType, { low: number; high: number }> = {
  "wood-frame": { low: 1.0, high: 1.0 },
  icf: { low: 1.1, high: 1.18 },
  cmu: { low: 1.12, high: 1.22 },
  sip: { low: 1.06, high: 1.14 },
};

const ROOF_PITCH_FACTOR: Record<RoofPitch, { low: number; high: number }> = {
  low: { low: 1.05, high: 1.08 },
  medium: { low: 1.15, high: 1.22 },
  steep: { low: 1.28, high: 1.38 },
};

const SIDING_MULTIPLIER: Record<SidingType, { low: number; high: number }> = {
  vinyl: { low: 0.9, high: 0.95 },
  "fiber-cement": { low: 1.0, high: 1.05 },
  brick: { low: 1.25, high: 1.35 },
  stone: { low: 1.45, high: 1.6 },
};

const HVAC_MULTIPLIER: Record<HvacType, { low: number; high: number }> = {
  standard: { low: 1.0, high: 1.0 },
  "high-efficiency": { low: 1.12, high: 1.18 },
  geothermal: { low: 1.35, high: 1.5 },
};

const SITE_SLOPE_MULTIPLIER: Record<SiteSlope, { low: number; high: number }> = {
  flat: { low: 1.0, high: 1.0 },
  moderate: { low: 1.08, high: 1.15 },
  steep: { low: 1.18, high: 1.3 },
};

const FINISH_INTERIOR: Record<FinishLevel, { low: number; high: number }> = {
  economy: { low: 32, high: 52 },
  standard: { low: 52, high: 78 },
  premium: { low: 78, high: 115 },
  luxury: { low: 115, high: 175 },
};

const EXTERIOR_FINISH: Record<FinishLevel, { low: number; high: number }> = {
  economy: { low: 18, high: 28 },
  standard: { low: 26, high: 38 },
  premium: { low: 36, high: 52 },
  luxury: { low: 48, high: 68 },
};

function range(low: number, high: number): CostRange {
  return {
    low: Math.round(Math.max(0, low)),
    high: Math.round(Math.max(low, high)),
  };
}

function multiplyRange(r: CostRange, lowMul: number, highMul: number): CostRange {
  return range(r.low * lowMul, r.high * highMul);
}

function addRanges(...items: CostRange[]): CostRange {
  return range(
    items.reduce((s, r) => s + r.low, 0),
    items.reduce((s, r) => s + r.high, 0),
  );
}

function foundationCost(
  footprint: number,
  foundation: FoundationType,
  siteSlope: SiteSlope,
): CostRange {
  const slope = SITE_SLOPE_MULTIPLIER[siteSlope];
  let base: CostRange;
  switch (foundation) {
    case "slab":
      base = range(footprint * 9, footprint * 15);
      break;
    case "crawl":
      base = range(footprint * 14, footprint * 22);
      break;
    case "basement-unfinished":
      base = range(footprint * 30, footprint * 46);
      break;
    case "basement-finished":
      base = range(footprint * 62, footprint * 92);
      break;
  }
  return multiplyRange(base, slope.low, slope.high);
}

function roofCost(
  roofArea: number,
  roofType: RoofType,
  roofPitch: RoofPitch,
): CostRange {
  const pitch = ROOF_PITCH_FACTOR[roofPitch];
  const rates: Record<RoofType, CostRange> = {
    asphalt: range(roofArea * 6, roofArea * 10),
    architectural: range(roofArea * 9, roofArea * 15),
    metal: range(roofArea * 13, roofArea * 24),
    tile: range(roofArea * 16, roofArea * 30),
  };
  return multiplyRange(rates[roofType], pitch.low, pitch.high);
}

function garageCost(bays: GarageSize): CostRange {
  switch (bays) {
    case 0:
      return range(0, 0);
    case 1:
      return range(22000, 38000);
    case 2:
      return range(38000, 62000);
    case 3:
      return range(58000, 88000);
  }
}

export function calculateHouse(input: HouseInput): HouseResult {
  const {
    livingAreaSqFt,
    stories,
    bedrooms,
    bathrooms,
    ceilingHeightFt,
    foundation,
    wallType,
    roofType,
    roofPitch,
    sidingType,
    finishLevel,
    hvacType,
    fireplaces,
    deckSqFt,
    siteSlope,
    region,
    garageBays,
    contingencyPercent,
  } = input;

  const footprintSqFt = Math.round(livingAreaSqFt / stories);
  const baseRoofFactor = stories === 1 ? 1.1 : 1.18;
  const roofAreaSqFt = Math.round(
    footprintSqFt * baseRoofFactor * ROOF_PITCH_FACTOR[roofPitch].high,
  );
  const wallMul = WALL_MULTIPLIER[wallType];
  const regionMul = REGION_MULTIPLIER[region];
  const ceilingMul = 1 + (ceilingHeightFt - 8) * 0.04;
  const slopeMul = SITE_SLOPE_MULTIPLIER[siteSlope];

  const sitePermits = multiplyRange(
    range(6000 + livingAreaSqFt * 2.5, 18000 + livingAreaSqFt * 6),
    slopeMul.low,
    slopeMul.high,
  );

  const foundationRange = foundationCost(footprintSqFt, foundation, siteSlope);

  const framing = multiplyRange(
    range(livingAreaSqFt * 16 * ceilingMul, livingAreaSqFt * 26 * ceilingMul),
    wallMul.low,
    wallMul.high,
  );

  const roof = roofCost(
    Math.round(footprintSqFt * baseRoofFactor),
    roofType,
    roofPitch,
  );

  const sidingMul = SIDING_MULTIPLIER[sidingType];
  const exterior = multiplyRange(
    range(
      livingAreaSqFt * EXTERIOR_FINISH[finishLevel].low,
      livingAreaSqFt * EXTERIOR_FINISH[finishLevel].high,
    ),
    sidingMul.low * ceilingMul,
    sidingMul.high * ceilingMul,
  );

  const bathMul = 1 + Math.max(0, bathrooms - 2) * 0.04;
  const hvacMul = HVAC_MULTIPLIER[hvacType];
  const mep = multiplyRange(
    range(livingAreaSqFt * 26 * bathMul, livingAreaSqFt * 46 * bathMul),
    hvacMul.low,
    hvacMul.high,
  );

  const bedroomMul = 1 + Math.max(0, bedrooms - 3) * 0.02;
  const interior = multiplyRange(
    range(
      livingAreaSqFt * FINISH_INTERIOR[finishLevel].low * bedroomMul,
      livingAreaSqFt * FINISH_INTERIOR[finishLevel].high * bedroomMul,
    ),
    ceilingMul,
    ceilingMul,
  );

  const garage = garageCost(garageBays);

  const deck =
    deckSqFt > 0
      ? range(deckSqFt * 35, deckSqFt * 65)
      : range(0, 0);

  const fireplaceCost =
    fireplaces > 0
      ? range(fireplaces * 4500, fireplaces * 12000)
      : range(0, 0);

  const lineItems: LineItem[] = [
    {
      id: "site",
      label: "Site work & permits",
      description: "Excavation, grading, utility connections, building permits",
      cost: sitePermits,
    },
    {
      id: "foundation",
      label:
        foundation === "basement-finished"
          ? "Foundation & finished basement"
          : foundation === "basement-unfinished"
            ? "Foundation & unfinished basement"
            : foundation === "crawl"
              ? "Foundation & crawl space"
              : "Foundation & slab",
      description: "Footings, concrete, waterproofing, basement walls if applicable",
      cost: foundationRange,
    },
    {
      id: "framing",
      label: "Framing & structural walls",
      description: "Floor systems, exterior & interior walls, shear walls, lumber or ICF/block",
      cost: framing,
    },
    {
      id: "roof",
      label: "Roof structure & covering",
      description: "Trusses or rafters, sheathing, underlayment, shingles or metal",
      cost: roof,
    },
    {
      id: "exterior",
      label: "Exterior envelope & siding",
      description: "Siding, windows, exterior doors, insulation, house wrap",
      cost: exterior,
    },
    {
      id: "mep",
      label: "Plumbing, electrical & HVAC",
      description: "Rough-in and finish for all mechanical, electrical, and plumbing systems",
      cost: mep,
    },
    {
      id: "interior",
      label: "Interior finishes",
      description: "Drywall, flooring, cabinets, countertops, fixtures, paint, trim",
      cost: interior,
    },
  ];

  if (garageBays > 0) {
    lineItems.push({
      id: "garage",
      label: `Attached garage (${garageBays}-car)`,
      description: "Foundation, framing, roof, door, and basic finish for garage",
      cost: garage,
    });
  }

  if (deckSqFt > 0) {
    lineItems.push({
      id: "deck",
      label: `Deck / patio (${deckSqFt} sq ft)`,
      description: "Outdoor living space, footings, decking, and railing",
      cost: deck,
    });
  }

  if (fireplaces > 0) {
    lineItems.push({
      id: "fireplace",
      label: `Fireplace${fireplaces > 1 ? "s" : ""} (${fireplaces})`,
      description: "Firebox, chimney or vent, hearth, and finish",
      cost: fireplaceCost,
    });
  }

  const rawSubtotal = addRanges(...lineItems.map((i) => i.cost));
  const subtotal = multiplyRange(rawSubtotal, regionMul.low, regionMul.high);
  const contingencyLow = contingencyPercent / 100;
  const contingencyHigh = (contingencyPercent + 4) / 100;
  const contingency = range(
    subtotal.low * contingencyLow,
    subtotal.high * contingencyHigh,
  );
  const total = addRanges(subtotal, contingency);
  const costPerSqFt = range(
    total.low / livingAreaSqFt,
    total.high / livingAreaSqFt,
  );

  return {
    footprintSqFt,
    roofAreaSqFt,
    lineItems: lineItems.map((item) => ({
      ...item,
      cost: multiplyRange(item.cost, regionMul.low, regionMul.high),
    })),
    subtotal,
    contingency,
    total,
    costPerSqFt,
  };
}

export const FOUNDATION_OPTIONS = [
  { value: "slab" as const, label: "Slab on grade" },
  { value: "crawl" as const, label: "Crawl space" },
  { value: "basement-unfinished" as const, label: "Unfinished basement" },
  { value: "basement-finished" as const, label: "Finished basement" },
];

export const WALL_OPTIONS = [
  { value: "wood-frame" as const, label: "Wood frame (stick-built)" },
  { value: "icf" as const, label: "ICF (insulated concrete forms)" },
  { value: "cmu" as const, label: "Concrete block (CMU)" },
  { value: "sip" as const, label: "Structural insulated panels (SIP)" },
];

export const ROOF_OPTIONS = [
  { value: "asphalt" as const, label: "Asphalt shingles" },
  { value: "architectural" as const, label: "Architectural shingles" },
  { value: "metal" as const, label: "Standing seam metal" },
  { value: "tile" as const, label: "Clay / concrete tile" },
];

export const ROOF_PITCH_OPTIONS = [
  { value: "low" as const, label: "Low pitch (4/12 or less)" },
  { value: "medium" as const, label: "Medium pitch (5/12 – 8/12)" },
  { value: "steep" as const, label: "Steep pitch (9/12+)" },
];

export const SIDING_OPTIONS = [
  { value: "vinyl" as const, label: "Vinyl siding" },
  { value: "fiber-cement" as const, label: "Fiber cement (Hardie)" },
  { value: "brick" as const, label: "Brick veneer" },
  { value: "stone" as const, label: "Natural stone veneer" },
];

export const HVAC_OPTIONS = [
  { value: "standard" as const, label: "Standard forced air" },
  { value: "high-efficiency" as const, label: "High-efficiency (96%+ AFUE)" },
  { value: "geothermal" as const, label: "Geothermal heat pump" },
];

export const SITE_SLOPE_OPTIONS = [
  { value: "flat" as const, label: "Flat lot" },
  { value: "moderate" as const, label: "Moderate slope" },
  { value: "steep" as const, label: "Steep / hillside lot" },
];

export const CEILING_OPTIONS = [
  { value: 8 as const, label: "8 ft — standard" },
  { value: 9 as const, label: "9 ft — popular upgrade" },
  { value: 10 as const, label: "10 ft — luxury" },
];

export const FINISH_OPTIONS = [
  { value: "economy" as const, label: "Economy — builder grade" },
  { value: "standard" as const, label: "Standard — mid-range" },
  { value: "premium" as const, label: "Premium — high-end" },
  { value: "luxury" as const, label: "Luxury — custom finishes" },
];

export const REGION_OPTIONS = [
  { value: "low" as const, label: "Lower cost area (rural South/Midwest)" },
  { value: "average" as const, label: "National average" },
  { value: "high" as const, label: "Higher cost area (suburban metros)" },
  { value: "very-high" as const, label: "Very high cost (CA, NY, HI, major cities)" },
];

export const STORY_OPTIONS = [
  { value: 1 as const, label: "1 story" },
  { value: 2 as const, label: "2 stories" },
  { value: 3 as const, label: "3 stories" },
];

export const GARAGE_OPTIONS = [
  { value: 0 as const, label: "No garage" },
  { value: 1 as const, label: "1-car garage" },
  { value: 2 as const, label: "2-car garage" },
  { value: 3 as const, label: "3-car garage" },
];
