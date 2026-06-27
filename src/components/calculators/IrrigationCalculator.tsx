"use client";

import { useMemo, useState } from "react";
import {
  calculateIrrigation,
  SOIL_TYPES,
  SPRINKLER_TYPES,
  type SoilType,
  type SprinklerType,
} from "@/lib/calculators/irrigation";
import {
  FormField,
  ResultRow,
  formatCurrency,
  formatNumber,
  inputClass,
  selectClass,
} from "./shared";

export function IrrigationCalculator() {
  const [lawnSqFt, setLawnSqFt] = useState(5000);
  const [gardenSqFt, setGardenSqFt] = useState(500);
  const [sprinklerType, setSprinklerType] = useState<SprinklerType>("rotor");
  const [soilType, setSoilType] = useState<SoilType>("loam");
  const [waterPressurePsi, setWaterPressurePsi] = useState(55);

  const result = useMemo(
    () =>
      calculateIrrigation({
        lawnSqFt,
        gardenSqFt,
        sprinklerType,
        soilType,
        waterPressurePsi,
      }),
    [lawnSqFt, gardenSqFt, sprinklerType, soilType, waterPressurePsi],
  );

  return (
    <div className="grid gap-6 lg:grid-cols-2 lg:gap-8">
      <form
        className="bento-card space-y-5 p-6 sm:p-8"
        onSubmit={(e) => e.preventDefault()}
        aria-label="Irrigation calculator inputs"
      >
        <div className="grid grid-cols-2 gap-4">
          <FormField label="Lawn area (sq ft)" id="irr-lawn">
            <input
              id="irr-lawn"
              type="number"
              min={100}
              max={50000}
              value={lawnSqFt}
              onChange={(e) => setLawnSqFt(Number(e.target.value))}
              className={inputClass}
              inputMode="numeric"
            />
          </FormField>

          <FormField label="Garden beds (sq ft)" id="irr-garden">
            <input
              id="irr-garden"
              type="number"
              min={0}
              max={10000}
              value={gardenSqFt}
              onChange={(e) => setGardenSqFt(Number(e.target.value))}
              className={inputClass}
              inputMode="numeric"
            />
          </FormField>
        </div>

        <FormField label="Sprinkler type" id="irr-type">
          <select
            id="irr-type"
            value={sprinklerType}
            onChange={(e) => setSprinklerType(e.target.value as SprinklerType)}
            className={selectClass}
          >
            {SPRINKLER_TYPES.map((t) => (
              <option key={t.value} value={t.value}>
                {t.label}
              </option>
            ))}
          </select>
        </FormField>

        <FormField label="Soil type" id="irr-soil" hint="Affects water needs and runoff">
          <select
            id="irr-soil"
            value={soilType}
            onChange={(e) => setSoilType(e.target.value as SoilType)}
            className={selectClass}
          >
            {SOIL_TYPES.map((s) => (
              <option key={s.value} value={s.value}>
                {s.label}
              </option>
            ))}
          </select>
        </FormField>

        <FormField label="Water pressure (PSI)" id="irr-psi" hint="Typical residential: 40–80 PSI">
          <input
            id="irr-psi"
            type="number"
            min={20}
            max={100}
            value={waterPressurePsi}
            onChange={(e) => setWaterPressurePsi(Number(e.target.value))}
            className={inputClass}
            inputMode="numeric"
          />
        </FormField>
      </form>

      <section
        aria-live="polite"
        aria-label="Irrigation estimate results"
        className="bento-card border-brand/20 bg-gradient-to-br from-brand-light to-surface p-6 sm:p-8"
      >
        <h2 className="text-lg font-semibold text-foreground">Your Estimate</h2>
        <p className="mt-1 text-sm text-muted">
          {formatNumber(result.totalSqFt)} sq ft irrigation coverage
        </p>

        <div className="mt-4">
          <ResultRow label="Irrigation zones" value={formatNumber(result.zones)} />
          <ResultRow label="Sprinkler heads" value={formatNumber(result.heads)} />
          <ResultRow label="Pipe length (ft)" value={formatNumber(result.pipeLf)} />
          {result.dripEmitterFt > 0 && (
            <ResultRow label="Drip line (ft)" value={formatNumber(result.dripEmitterFt)} />
          )}
          <ResultRow label="Flow required (GPM)" value={result.gpmRequired} />
          <ResultRow label="Weekly water (gallons)" value={formatNumber(result.weeklyWaterGallons)} />
          <ResultRow label="Materials" value={formatCurrency(result.materialCost)} />
          <ResultRow label="Labor (est.)" value={formatCurrency(result.laborCost)} />
          <ResultRow label="Total installed cost" value={formatCurrency(result.totalCost)} highlight />
        </div>
      </section>
    </div>
  );
}
