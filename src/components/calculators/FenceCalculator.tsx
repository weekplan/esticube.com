"use client";

import { useMemo, useState } from "react";
import {
  calculateFence,
  FENCE_MATERIALS,
  type FenceMaterial,
} from "@/lib/calculators/fence";
import {
  FormField,
  ResultRow,
  formatCurrency,
  formatNumber,
  inputClass,
  selectClass,
} from "./shared";

export function FenceCalculator() {
  const [lengthFt, setLengthFt] = useState(150);
  const [heightFt, setHeightFt] = useState(6);
  const [material, setMaterial] = useState<FenceMaterial>("wood-privacy");
  const [gates, setGates] = useState(1);
  const [postSpacingFt, setPostSpacingFt] = useState(8);

  const result = useMemo(
    () =>
      calculateFence({
        lengthFt,
        heightFt,
        material,
        gates,
        postSpacingFt,
      }),
    [lengthFt, heightFt, material, gates, postSpacingFt],
  );

  return (
    <div className="grid gap-6 lg:grid-cols-2 lg:gap-8">
      <form
        className="bento-card space-y-5 p-6 sm:p-8"
        onSubmit={(e) => e.preventDefault()}
        aria-label="Fence calculator inputs"
      >
        <FormField label="Fence length (feet)" id="fence-length" hint="Total linear feet along property line">
          <input
            id="fence-length"
            type="number"
            min={10}
            max={2000}
            value={lengthFt}
            onChange={(e) => setLengthFt(Number(e.target.value))}
            className={inputClass}
            inputMode="numeric"
          />
        </FormField>

        <FormField label="Fence height (feet)" id="fence-height">
          <input
            id="fence-height"
            type="number"
            min={3}
            max={12}
            step={0.5}
            value={heightFt}
            onChange={(e) => setHeightFt(Number(e.target.value))}
            className={inputClass}
            inputMode="decimal"
          />
        </FormField>

        <FormField label="Material type" id="fence-material">
          <select
            id="fence-material"
            value={material}
            onChange={(e) => setMaterial(e.target.value as FenceMaterial)}
            className={selectClass}
          >
            {FENCE_MATERIALS.map((m) => (
              <option key={m.value} value={m.value}>
                {m.label}
              </option>
            ))}
          </select>
        </FormField>

        <div className="grid grid-cols-2 gap-4">
          <FormField label="Gates" id="fence-gates">
            <input
              id="fence-gates"
              type="number"
              min={0}
              max={10}
              value={gates}
              onChange={(e) => setGates(Number(e.target.value))}
              className={inputClass}
              inputMode="numeric"
            />
          </FormField>

          <FormField label="Post spacing (ft)" id="fence-spacing" hint="Typically 6–8 ft">
            <input
              id="fence-spacing"
              type="number"
              min={6}
              max={10}
              value={postSpacingFt}
              onChange={(e) => setPostSpacingFt(Number(e.target.value))}
              className={inputClass}
              inputMode="numeric"
            />
          </FormField>
        </div>
      </form>

      <section
        aria-live="polite"
        aria-label="Fence estimate results"
        className="bento-card border-brand/20 bg-gradient-to-br from-brand-light to-surface p-6 sm:p-8"
      >
        <h2 className="text-lg font-semibold text-foreground">Your Estimate</h2>
        <p className="mt-1 text-sm text-muted">
          Materials and installed cost for {formatNumber(result.linearFeet)} linear feet
        </p>

        <div className="mt-4">
          <ResultRow label="Fence posts" value={formatNumber(result.posts)} />
          <ResultRow label="Panels / sections" value={formatNumber(result.panels)} />
          <ResultRow label="Horizontal rails" value={formatNumber(result.rails)} />
          {result.pickets > 0 && (
            <ResultRow label="Pickets" value={formatNumber(result.pickets)} />
          )}
          <ResultRow label="Concrete bags (80 lb)" value={formatNumber(result.concreteBags)} />
          <ResultRow label="Materials" value={formatCurrency(result.materialCost)} />
          <ResultRow label="Labor (est.)" value={formatCurrency(result.laborCost)} />
          <ResultRow label="Total installed cost" value={formatCurrency(result.totalCost)} highlight />
          <ResultRow label="Cost per linear foot" value={formatCurrency(result.costPerFt)} />
        </div>
      </section>
    </div>
  );
}
