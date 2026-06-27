"use client";

import { useMemo, useState } from "react";
import {
  STALL_LAYOUTS,
  STRIPING_JOB_TYPES,
  STRIPING_PAINT_TYPES,
  calculateStriping,
  suggestedHandicapStalls,
  type StallLayout,
  type StripingJobType,
  type StripingPaint,
} from "@/lib/calculators/striping";
import {
  FormField,
  ResultRow,
  formatCurrency,
  formatNumber,
  inputClass,
  selectClass,
} from "./shared";

export function StripingCalculator() {
  const [stalls, setStalls] = useState(50);
  const [handicapStalls, setHandicapStalls] = useState(2);
  const [handicapManual, setHandicapManual] = useState(false);
  const [stallLayout, setStallLayout] = useState<StallLayout>("90");
  const [jobType, setJobType] = useState<StripingJobType>("restripe");
  const [paintType, setPaintType] = useState<StripingPaint>("water-based");
  const [arrows, setArrows] = useState(4);
  const [stopBars, setStopBars] = useState(2);
  const [fireLaneLf, setFireLaneLf] = useState(120);
  const [crosswalks, setCrosswalks] = useState(1);
  const [customLineLf, setCustomLineLf] = useState(0);

  const effectiveHandicap = handicapManual
    ? handicapStalls
    : suggestedHandicapStalls(stalls);

  const result = useMemo(
    () =>
      calculateStriping({
        stalls,
        handicapStalls: effectiveHandicap,
        stallLayout,
        jobType,
        paintType,
        arrows,
        stopBars,
        fireLaneLf,
        crosswalks,
        customLineLf,
      }),
    [
      stalls,
      effectiveHandicap,
      stallLayout,
      jobType,
      paintType,
      arrows,
      stopBars,
      fireLaneLf,
      crosswalks,
      customLineLf,
    ],
  );

  return (
    <div className="grid gap-6 lg:grid-cols-2 lg:gap-8">
      <form
        className="bento-card space-y-5 p-6 sm:p-8"
        onSubmit={(e) => e.preventDefault()}
        aria-label="Line striping calculator inputs"
      >
        <FormField
          label="Parking spaces"
          id="striping-stalls"
          hint="Standard 9×18 ft stalls unless angled layout selected"
        >
          <input
            id="striping-stalls"
            type="number"
            min={1}
            max={2000}
            value={stalls}
            onChange={(e) => {
              const next = Number(e.target.value);
              setStalls(next);
              if (!handicapManual) {
                setHandicapStalls(suggestedHandicapStalls(next));
              }
            }}
            className={inputClass}
            inputMode="numeric"
          />
        </FormField>

        <div className="grid grid-cols-2 gap-4">
          <FormField
            label="ADA spaces"
            id="striping-handicap"
            hint="1 per 25 stalls (ADA minimum)"
          >
            <input
              id="striping-handicap"
              type="number"
              min={0}
              max={200}
              value={effectiveHandicap}
              onChange={(e) => {
                setHandicapManual(true);
                setHandicapStalls(Number(e.target.value));
              }}
              className={inputClass}
              inputMode="numeric"
            />
          </FormField>

          <FormField label="Stall layout" id="striping-layout">
            <select
              id="striping-layout"
              value={stallLayout}
              onChange={(e) => setStallLayout(e.target.value as StallLayout)}
              className={selectClass}
            >
              {STALL_LAYOUTS.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
          </FormField>
        </div>

        <FormField label="Job type" id="striping-job">
          <select
            id="striping-job"
            value={jobType}
            onChange={(e) => setJobType(e.target.value as StripingJobType)}
            className={selectClass}
          >
            {STRIPING_JOB_TYPES.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        </FormField>

        <FormField label="Paint / marking material" id="striping-paint">
          <select
            id="striping-paint"
            value={paintType}
            onChange={(e) => setPaintType(e.target.value as StripingPaint)}
            className={selectClass}
          >
            {STRIPING_PAINT_TYPES.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        </FormField>

        <div className="grid grid-cols-2 gap-4">
          <FormField label="Directional arrows" id="striping-arrows">
            <input
              id="striping-arrows"
              type="number"
              min={0}
              max={100}
              value={arrows}
              onChange={(e) => setArrows(Number(e.target.value))}
              className={inputClass}
              inputMode="numeric"
            />
          </FormField>

          <FormField label="Stop bars" id="striping-stop-bars">
            <input
              id="striping-stop-bars"
              type="number"
              min={0}
              max={50}
              value={stopBars}
              onChange={(e) => setStopBars(Number(e.target.value))}
              className={inputClass}
              inputMode="numeric"
            />
          </FormField>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <FormField
            label="Fire lane (linear ft)"
            id="striping-fire-lane"
            hint="6 in. red stripes at curb or drive lane"
          >
            <input
              id="striping-fire-lane"
              type="number"
              min={0}
              max={5000}
              value={fireLaneLf}
              onChange={(e) => setFireLaneLf(Number(e.target.value))}
              className={inputClass}
              inputMode="numeric"
            />
          </FormField>

          <FormField label="Crosswalks" id="striping-crosswalks">
            <input
              id="striping-crosswalks"
              type="number"
              min={0}
              max={20}
              value={crosswalks}
              onChange={(e) => setCrosswalks(Number(e.target.value))}
              className={inputClass}
              inputMode="numeric"
            />
          </FormField>
        </div>

        <FormField
          label="Extra line markings (linear ft)"
          id="striping-custom"
          hint="Centerlines, double yellow, edge lines, hatching"
        >
          <input
            id="striping-custom"
            type="number"
            min={0}
            max={10000}
            value={customLineLf}
            onChange={(e) => setCustomLineLf(Number(e.target.value))}
            className={inputClass}
            inputMode="numeric"
          />
        </FormField>
      </form>

      <section
        aria-live="polite"
        aria-label="Line striping estimate results"
        className="bento-card border-brand/20 bg-gradient-to-br from-brand-light to-surface p-6 sm:p-8"
      >
        <h2 className="text-lg font-semibold text-foreground">Your Estimate</h2>
        <p className="mt-1 text-sm text-muted">
          {formatNumber(result.stalls)} stalls · {formatNumber(result.totalLinearFeet)} LF of markings
        </p>

        <div className="mt-4">
          <p className="pb-1 text-xs font-semibold uppercase tracking-wide text-brand">
            Marking takeoff
          </p>
          {result.lineItems
            .filter((item) => item.linearFeet > 0)
            .map((item) => (
              <ResultRow
                key={item.label}
                label={
                  item.quantity !== undefined
                    ? `${item.label} (${formatNumber(item.quantity)})`
                    : item.label
                }
                value={`${formatNumber(item.linearFeet)} LF`}
              />
            ))}
          <ResultRow
            label="Total linear feet"
            value={`${formatNumber(result.totalLinearFeet)} LF`}
          />
          <ResultRow
            label="White / yellow paint"
            value={`${formatNumber(result.whiteYellowGallons)} gal`}
          />
          {(result.blueRedGallons > 0 || result.handicapStalls > 0 || fireLaneLf > 0) && (
            <ResultRow
              label="Blue / red paint"
              value={`${formatNumber(result.blueRedGallons)} gal`}
            />
          )}

          <p className="mt-4 pb-1 text-xs font-semibold uppercase tracking-wide text-brand">
            Always included on pro bids
          </p>
          <ResultRow label="Mobilization & setup" value={formatCurrency(result.mobilizationCost)} />
          <ResultRow label="Surface prep (blow / sweep)" value={formatCurrency(result.surfacePrepCost)} />
          {result.layoutCost > 0 && (
            <ResultRow label="Layout & chalk lines" value={formatCurrency(result.layoutCost)} />
          )}
          <ResultRow label="Traffic control (cones)" value={formatCurrency(result.trafficControlCost)} />
          <ResultRow label="Traffic paint" value={formatCurrency(result.paintMaterialCost)} />
          {result.stencilMaterialCost > 0 && (
            <ResultRow
              label="Stencils (ADA, arrows, stop bars)"
              value={formatCurrency(result.stencilMaterialCost)}
            />
          )}

          <ResultRow label="Materials & mobilization" value={formatCurrency(result.materialCost)} />
          <ResultRow label="Labor (est.)" value={formatCurrency(result.laborCost)} />
          <ResultRow label="Total job cost" value={formatCurrency(result.totalCost)} highlight />
          {result.stalls > 0 && (
            <ResultRow label="Cost per parking space" value={formatCurrency(result.costPerStall)} />
          )}
          <ResultRow label="Cost per linear foot" value={formatCurrency(result.costPerLf)} />
        </div>
      </section>
    </div>
  );
}
