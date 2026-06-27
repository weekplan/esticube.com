export type SprinklerType = "rotor" | "spray" | "drip";
export type SoilType = "clay" | "loam" | "sandy";

export type IrrigationInput = {
  lawnSqFt: number;
  gardenSqFt: number;
  sprinklerType: SprinklerType;
  soilType: SoilType;
  waterPressurePsi: number;
};

export type IrrigationResult = {
  totalSqFt: number;
  zones: number;
  heads: number;
  pipeLf: number;
  dripEmitterFt: number;
  gpmRequired: number;
  controllerCost: number;
  materialCost: number;
  laborCost: number;
  totalCost: number;
  weeklyWaterGallons: number;
};

const COVERAGE: Record<SprinklerType, { sqFt: number; gpm: number; label: string }> = {
  rotor: { sqFt: 2500, gpm: 3.5, label: "Rotor Heads" },
  spray: { sqFt: 200, gpm: 1.5, label: "Spray Heads" },
  drip: { sqFt: 100, gpm: 0.5, label: "Drip Irrigation" },
};

const SOIL_MULTIPLIER: Record<SoilType, { factor: number; label: string }> = {
  clay: { factor: 0.8, label: "Clay" },
  loam: { factor: 1.0, label: "Loam" },
  sandy: { factor: 1.3, label: "Sandy" },
};

const MAX_GPM_PER_ZONE = 12;

export function calculateIrrigation(input: IrrigationInput): IrrigationResult {
  const { lawnSqFt, gardenSqFt, sprinklerType, soilType, waterPressurePsi } =
    input;
  const totalSqFt = lawnSqFt + gardenSqFt;
  const coverage = COVERAGE[sprinklerType];
  const soil = SOIL_MULTIPLIER[soilType];
  const heads = Math.ceil(totalSqFt / coverage.sqFt);
  const gpmRequired = heads * coverage.gpm;
  const zones = Math.max(1, Math.ceil(gpmRequired / MAX_GPM_PER_ZONE));
  const pipeLf = Math.round(Math.sqrt(totalSqFt) * 4 + zones * 30);
  const dripEmitterFt = sprinklerType === "drip" ? gardenSqFt * 2 : 0;
  const pressureFactor = waterPressurePsi < 40 ? 1.15 : 1;
  const controllerCost = 180 + zones * 45;
  const headCost = heads * (sprinklerType === "rotor" ? 18 : sprinklerType === "spray" ? 8 : 12);
  const pipeCost = pipeLf * 1.2;
  const valveCost = zones * 35;
  const dripCost = dripEmitterFt * 0.35;
  const materialCost = Math.round(
    (controllerCost + headCost + pipeCost + valveCost + dripCost) *
      soil.factor *
      pressureFactor,
  );
  const laborCost = Math.round(totalSqFt * 0.85 + zones * 120);
  const totalCost = materialCost + laborCost;
  const weeklyWaterGallons = Math.round(
    totalSqFt * 0.62 * soil.factor,
  );

  return {
    totalSqFt,
    zones,
    heads,
    pipeLf,
    dripEmitterFt: Math.round(dripEmitterFt),
    gpmRequired: Math.round(gpmRequired * 10) / 10,
    controllerCost,
    materialCost,
    laborCost,
    totalCost,
    weeklyWaterGallons,
  };
}

export const SPRINKLER_TYPES = Object.entries(COVERAGE).map(
  ([value, { label }]) => ({ value: value as SprinklerType, label }),
);

export const SOIL_TYPES = Object.entries(SOIL_MULTIPLIER).map(
  ([value, { label }]) => ({ value: value as SoilType, label }),
);
