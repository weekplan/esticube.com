export type FenceMaterial =
  | "wood-privacy"
  | "wood-picket"
  | "vinyl"
  | "chain-link"
  | "aluminum";

export type FenceInput = {
  lengthFt: number;
  heightFt: number;
  material: FenceMaterial;
  gates: number;
  postSpacingFt: number;
};

export type FenceResult = {
  linearFeet: number;
  posts: number;
  panels: number;
  rails: number;
  pickets: number;
  concreteBags: number;
  materialCost: number;
  laborCost: number;
  totalCost: number;
  costPerFt: number;
};

const MATERIAL_RATES: Record<
  FenceMaterial,
  { materialPerFt: number; laborPerFt: number; label: string }
> = {
  "wood-privacy": { materialPerFt: 18, laborPerFt: 12, label: "Wood Privacy" },
  "wood-picket": { materialPerFt: 14, laborPerFt: 10, label: "Wood Picket" },
  vinyl: { materialPerFt: 28, laborPerFt: 14, label: "Vinyl" },
  "chain-link": { materialPerFt: 12, laborPerFt: 8, label: "Chain Link" },
  aluminum: { materialPerFt: 32, laborPerFt: 16, label: "Aluminum" },
};

export function calculateFence(input: FenceInput): FenceResult {
  const { lengthFt, heightFt, material, gates, postSpacingFt } = input;
  const spacing = Math.max(postSpacingFt, 6);
  const posts = Math.ceil(lengthFt / spacing) + 1 + gates * 2;
  const panels = Math.ceil(lengthFt / spacing);
  const rails = panels * (heightFt >= 6 ? 3 : 2);
  const pickets =
    material === "wood-privacy" || material === "wood-picket"
      ? Math.ceil((lengthFt * 12) / 5.5)
      : 0;
  const concreteBags = posts * 1.5;
  const rates = MATERIAL_RATES[material];
  const heightMultiplier = heightFt / 6;
  const materialCost = Math.round(
    lengthFt * rates.materialPerFt * heightMultiplier +
      gates * 150 +
      concreteBags * 6,
  );
  const laborCost = Math.round(lengthFt * rates.laborPerFt * heightMultiplier);
  const totalCost = materialCost + laborCost;

  return {
    linearFeet: lengthFt,
    posts,
    panels,
    rails,
    pickets,
    concreteBags: Math.ceil(concreteBags),
    materialCost,
    laborCost,
    totalCost,
    costPerFt: Math.round(totalCost / lengthFt),
  };
}

export const FENCE_MATERIALS = Object.entries(MATERIAL_RATES).map(
  ([value, { label }]) => ({ value: value as FenceMaterial, label }),
);
