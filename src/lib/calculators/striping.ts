export type StallLayout = "90" | "60" | "parallel";
export type StripingJobType = "restripe" | "new-layout";
export type StripingPaint = "water-based" | "oil-based" | "thermoplastic";

export type StripingInput = {
  stalls: number;
  handicapStalls: number;
  stallLayout: StallLayout;
  jobType: StripingJobType;
  paintType: StripingPaint;
  arrows: number;
  stopBars: number;
  fireLaneLf: number;
  crosswalks: number;
  /** Optional direct LF for road centerlines, edge lines, etc. */
  customLineLf: number;
};

export type StripingLineItem = {
  label: string;
  linearFeet: number;
  quantity?: number;
};

export type StripingResult = {
  stalls: number;
  handicapStalls: number;
  lineItems: StripingLineItem[];
  totalLinearFeet: number;
  whiteYellowGallons: number;
  blueRedGallons: number;
  mobilizationCost: number;
  surfacePrepCost: number;
  layoutCost: number;
  trafficControlCost: number;
  paintMaterialCost: number;
  stencilMaterialCost: number;
  materialCost: number;
  laborCost: number;
  totalCost: number;
  costPerStall: number;
  costPerLf: number;
};

const STALL_LF: Record<StallLayout, number> = {
  "90": 38,
  "60": 48,
  parallel: 25,
};

const PAINT: Record<
  StripingPaint,
  { label: string; lfPerGallon: number; materialPerLf: number; laborPerLf: number }
> = {
  "water-based": {
    label: "Water-Based Acrylic",
    lfPerGallon: 380,
    materialPerLf: 0.12,
    laborPerLf: 0.18,
  },
  "oil-based": {
    label: "Oil-Based Alkyd",
    lfPerGallon: 340,
    materialPerLf: 0.16,
    laborPerLf: 0.2,
  },
  thermoplastic: {
    label: "Thermoplastic (Hot-Applied)",
    lfPerGallon: 280,
    materialPerLf: 0.42,
    laborPerLf: 0.35,
  },
};

const JOB_MULTIPLIER: Record<StripingJobType, { lfFactor: number; layoutFlat: number }> = {
  restripe: { lfFactor: 1, layoutFlat: 0 },
  "new-layout": { lfFactor: 1.12, layoutFlat: 185 },
};

const MOBILIZATION = 325;
const TRAFFIC_CONTROL = 85;
const SURFACE_PREP_PER_STALL = 4.5;

const HANDICAP_LF_EACH = 24;
const HANDICAP_STENCIL_EACH = 38;
const ARROW_LF_EACH = 14;
const ARROW_STENCIL_EACH = 22;
const STOP_BAR_LF_EACH = 18;
const STOP_BAR_STENCIL_EACH = 18;
const CROSSWALK_LF_EACH = 96;
const FIRE_LANE_WIDTH_FACTOR = 1.5;

export function calculateStriping(input: StripingInput): StripingResult {
  const {
    stalls,
    handicapStalls,
    stallLayout,
    jobType,
    paintType,
    arrows,
    stopBars,
    fireLaneLf,
    crosswalks,
    customLineLf,
  } = input;

  const job = JOB_MULTIPLIER[jobType];
  const paint = PAINT[paintType];

  const stallLf = Math.round(stalls * STALL_LF[stallLayout] * job.lfFactor);
  const handicapLf = Math.round(handicapStalls * HANDICAP_LF_EACH);
  const arrowLf = arrows * ARROW_LF_EACH;
  const stopBarLf = stopBars * STOP_BAR_LF_EACH;
  const fireLf = Math.round(fireLaneLf * FIRE_LANE_WIDTH_FACTOR);
  const crosswalkLf = crosswalks * CROSSWALK_LF_EACH;
  const customLf = Math.max(0, customLineLf);

  const whiteYellowLf = stallLf + arrowLf + stopBarLf + crosswalkLf + customLf;
  const blueRedLf = handicapLf + fireLf;
  const totalLinearFeet = whiteYellowLf + blueRedLf;

  const lineItems: StripingLineItem[] = [
    {
      label: "Parking stall lines (4 in.)",
      linearFeet: stallLf,
      quantity: stalls,
    },
    {
      label: "ADA handicap markings",
      linearFeet: handicapLf,
      quantity: handicapStalls,
    },
    {
      label: "Directional arrows",
      linearFeet: arrowLf,
      quantity: arrows,
    },
    {
      label: "Stop bars (12 in.)",
      linearFeet: stopBarLf,
      quantity: stopBars,
    },
    {
      label: "Fire lane stripes (6 in.)",
      linearFeet: fireLf,
      quantity: fireLaneLf > 0 ? Math.round(fireLaneLf) : undefined,
    },
    {
      label: "Crosswalk markings",
      linearFeet: crosswalkLf,
      quantity: crosswalks,
    },
  ];

  if (customLf > 0) {
    lineItems.push({
      label: "Centerlines / edge lines / custom",
      linearFeet: customLf,
    });
  }

  const whiteYellowGallons = Math.ceil(whiteYellowLf / paint.lfPerGallon);
  const blueRedGallons = Math.ceil(blueRedLf / (paint.lfPerGallon * 0.85));

  const mobilizationCost = MOBILIZATION;
  const surfacePrepCost = Math.round(
    stalls * SURFACE_PREP_PER_STALL + crosswalks * 25 + (jobType === "new-layout" ? 95 : 45),
  );
  const layoutCost = job.layoutFlat + (jobType === "new-layout" ? stalls * 1.25 : 0);
  const trafficControlCost = TRAFFIC_CONTROL;

  const paintMaterialCost = Math.round(
    whiteYellowLf * paint.materialPerLf + blueRedLf * paint.materialPerLf * 1.35,
  );
  const stencilMaterialCost =
    handicapStalls * HANDICAP_STENCIL_EACH +
    arrows * ARROW_STENCIL_EACH +
    stopBars * STOP_BAR_STENCIL_EACH;

  const materialCost =
    mobilizationCost +
    paintMaterialCost +
    stencilMaterialCost +
    Math.round(stencilMaterialCost * 0.15);

  const laborCost = Math.round(
    totalLinearFeet * paint.laborPerLf +
      surfacePrepCost * 0.55 +
      layoutCost +
      trafficControlCost * 0.4,
  );

  let totalCost = materialCost + laborCost;

  const minimumJob = jobType === "new-layout" ? 650 : 475;
  if (totalCost < minimumJob) {
    totalCost = minimumJob;
  }

  return {
    stalls,
    handicapStalls,
    lineItems,
    totalLinearFeet,
    whiteYellowGallons,
    blueRedGallons,
    mobilizationCost,
    surfacePrepCost,
    layoutCost,
    trafficControlCost,
    paintMaterialCost,
    stencilMaterialCost,
    materialCost,
    laborCost,
    totalCost,
    costPerStall: stalls > 0 ? Math.round(totalCost / stalls) : 0,
    costPerLf: totalLinearFeet > 0 ? Math.round(totalCost / totalLinearFeet) : 0,
  };
}

export const STALL_LAYOUTS = [
  { value: "90" as const, label: "90° (standard)" },
  { value: "60" as const, label: "60° (angle)" },
  { value: "parallel" as const, label: "Parallel / head-in" },
];

export const STRIPING_JOB_TYPES = [
  { value: "restripe" as const, label: "Restripe existing layout" },
  { value: "new-layout" as const, label: "New layout (measure & chalk)" },
];

export const STRIPING_PAINT_TYPES = Object.entries(PAINT).map(
  ([value, { label }]) => ({ value: value as StripingPaint, label }),
);

export function suggestedHandicapStalls(stalls: number): number {
  if (stalls <= 0) return 0;
  return Math.max(1, Math.ceil(stalls / 25));
}
