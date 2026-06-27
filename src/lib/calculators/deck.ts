export type DeckMaterial = "pressure-treated" | "cedar" | "composite" | "pvc";
export type JoistSpacing = 12 | 16 | 24;

export type DeckInput = {
  lengthFt: number;
  widthFt: number;
  material: DeckMaterial;
  joistSpacing: JoistSpacing;
  includeRailing: boolean;
  railingSides: number;
};

export type DeckResult = {
  areaSqFt: number;
  boards: number;
  joists: number;
  beams: number;
  footings: number;
  screws: number;
  concreteBags: number;
  railingLf: number;
  materialCost: number;
  laborCost: number;
  totalCost: number;
  costPerSqFt: number;
};

const DECK_RATES: Record<
  DeckMaterial,
  { boardCost: number; laborPerSqFt: number; label: string }
> = {
  "pressure-treated": {
    boardCost: 3.5,
    laborPerSqFt: 12,
    label: "Pressure-Treated Pine",
  },
  cedar: { boardCost: 6.5, laborPerSqFt: 14, label: "Cedar" },
  composite: { boardCost: 9, laborPerSqFt: 16, label: "Composite" },
  pvc: { boardCost: 11, laborPerSqFt: 18, label: "PVC" },
};

const BOARD_COVERAGE_SQFT = 5.33; // 5/4x6 @ 16" OC effective

export function calculateDeck(input: DeckInput): DeckResult {
  const {
    lengthFt,
    widthFt,
    material,
    joistSpacing,
    includeRailing,
    railingSides,
  } = input;
  const areaSqFt = lengthFt * widthFt;
  const boards = Math.ceil(areaSqFt / BOARD_COVERAGE_SQFT) + 2;
  const joists = Math.ceil((lengthFt * 12) / joistSpacing) + 1;
  const beams = Math.ceil(widthFt / 8) + 1;
  const footings = beams * 2;
  const screws = boards * 20;
  const concreteBags = footings * 2;
  const railingLf = includeRailing
    ? railingSides * Math.max(lengthFt, widthFt)
    : 0;
  const rates = DECK_RATES[material];
  const deckingCost = boards * rates.boardCost * 8;
  const framingCost = joists * 12 + beams * 35 + footings * 15;
  const railingCost = railingLf * 45;
  const hardwareCost = screws * 0.08 + concreteBags * 6;
  const materialCost = Math.round(
    deckingCost + framingCost + railingCost + hardwareCost,
  );
  const laborCost = Math.round(areaSqFt * rates.laborPerSqFt);
  const totalCost = materialCost + laborCost;

  return {
    areaSqFt,
    boards,
    joists,
    beams,
    footings,
    screws,
    concreteBags,
    railingLf: Math.round(railingLf),
    materialCost,
    laborCost,
    totalCost,
    costPerSqFt: Math.round(totalCost / areaSqFt),
  };
}

export const DECK_MATERIALS = Object.entries(DECK_RATES).map(
  ([value, { label }]) => ({ value: value as DeckMaterial, label }),
);
