"use client";

import { useMemo, useState } from "react";
import {
  calculateDeck,
  DECK_MATERIALS,
  type DeckMaterial,
  type JoistSpacing,
} from "@/lib/calculators/deck";
import {
  FormField,
  ResultRow,
  formatCurrency,
  formatNumber,
  inputClass,
  selectClass,
} from "./shared";

export function DeckCalculator() {
  const [lengthFt, setLengthFt] = useState(16);
  const [widthFt, setWidthFt] = useState(12);
  const [material, setMaterial] = useState<DeckMaterial>("pressure-treated");
  const [joistSpacing, setJoistSpacing] = useState<JoistSpacing>(16);
  const [includeRailing, setIncludeRailing] = useState(true);
  const [railingSides, setRailingSides] = useState(3);

  const result = useMemo(
    () =>
      calculateDeck({
        lengthFt,
        widthFt,
        material,
        joistSpacing,
        includeRailing,
        railingSides,
      }),
    [lengthFt, widthFt, material, joistSpacing, includeRailing, railingSides],
  );

  return (
    <div className="grid gap-6 lg:grid-cols-2 lg:gap-8">
      <form
        className="bento-card space-y-5 p-6 sm:p-8"
        onSubmit={(e) => e.preventDefault()}
        aria-label="Deck calculator inputs"
      >
        <div className="grid grid-cols-2 gap-4">
          <FormField label="Length (feet)" id="deck-length">
            <input
              id="deck-length"
              type="number"
              min={4}
              max={60}
              value={lengthFt}
              onChange={(e) => setLengthFt(Number(e.target.value))}
              className={inputClass}
              inputMode="numeric"
            />
          </FormField>

          <FormField label="Width (feet)" id="deck-width">
            <input
              id="deck-width"
              type="number"
              min={4}
              max={40}
              value={widthFt}
              onChange={(e) => setWidthFt(Number(e.target.value))}
              className={inputClass}
              inputMode="numeric"
            />
          </FormField>
        </div>

        <FormField label="Decking material" id="deck-material">
          <select
            id="deck-material"
            value={material}
            onChange={(e) => setMaterial(e.target.value as DeckMaterial)}
            className={selectClass}
          >
            {DECK_MATERIALS.map((m) => (
              <option key={m.value} value={m.value}>
                {m.label}
              </option>
            ))}
          </select>
        </FormField>

        <FormField label="Joist spacing" id="deck-joists" hint="16&quot; on-center is most common">
          <select
            id="deck-joists"
            value={joistSpacing}
            onChange={(e) => setJoistSpacing(Number(e.target.value) as JoistSpacing)}
            className={selectClass}
          >
            <option value={12}>12&quot; OC</option>
            <option value={16}>16&quot; OC</option>
            <option value={24}>24&quot; OC</option>
          </select>
        </FormField>

        <fieldset className="space-y-3">
          <legend className="text-sm font-medium text-foreground">Railing</legend>
          <label className="flex items-center gap-3 min-h-[44px] cursor-pointer">
            <input
              type="checkbox"
              checked={includeRailing}
              onChange={(e) => setIncludeRailing(e.target.checked)}
              className="h-5 w-5 rounded border-border text-brand focus:ring-brand/20"
            />
            <span className="text-sm text-foreground">Include railing</span>
          </label>

          {includeRailing && (
            <FormField label="Railing sides" id="deck-railing-sides">
              <input
                id="deck-railing-sides"
                type="number"
                min={1}
                max={4}
                value={railingSides}
                onChange={(e) => setRailingSides(Number(e.target.value))}
                className={inputClass}
                inputMode="numeric"
              />
            </FormField>
          )}
        </fieldset>
      </form>

      <section
        aria-live="polite"
        aria-label="Deck estimate results"
        className="bento-card border-brand/20 bg-gradient-to-br from-brand-light to-surface p-6 sm:p-8"
      >
        <h2 className="text-lg font-semibold text-foreground">Your Estimate</h2>
        <p className="mt-1 text-sm text-muted">
          {formatNumber(result.areaSqFt)} sq ft deck build
        </p>

        <div className="mt-4">
          <ResultRow label="Decking boards (8 ft)" value={formatNumber(result.boards)} />
          <ResultRow label="Joists" value={formatNumber(result.joists)} />
          <ResultRow label="Support beams" value={formatNumber(result.beams)} />
          <ResultRow label="Concrete footings" value={formatNumber(result.footings)} />
          <ResultRow label="Deck screws" value={formatNumber(result.screws)} />
          <ResultRow label="Concrete bags (80 lb)" value={formatNumber(result.concreteBags)} />
          {result.railingLf > 0 && (
            <ResultRow label="Railing (linear ft)" value={formatNumber(result.railingLf)} />
          )}
          <ResultRow label="Materials" value={formatCurrency(result.materialCost)} />
          <ResultRow label="Labor (est.)" value={formatCurrency(result.laborCost)} />
          <ResultRow label="Total installed cost" value={formatCurrency(result.totalCost)} highlight />
          <ResultRow label="Cost per sq ft" value={formatCurrency(result.costPerSqFt)} />
        </div>
      </section>
    </div>
  );
}
