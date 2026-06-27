"use client";

import { useMemo, useState } from "react";
import {
  IconExtras,
  IconFoundation,
  IconInterior,
  IconSize,
  IconStructure,
} from "@/components/icons";
import {
  calculateHouse,
  CEILING_OPTIONS,
  FINISH_OPTIONS,
  FOUNDATION_OPTIONS,
  GARAGE_OPTIONS,
  HVAC_OPTIONS,
  REGION_OPTIONS,
  ROOF_OPTIONS,
  ROOF_PITCH_OPTIONS,
  SIDING_OPTIONS,
  SITE_SLOPE_OPTIONS,
  STORY_OPTIONS,
  WALL_OPTIONS,
  type CeilingHeight,
  type FinishLevel,
  type FoundationType,
  type GarageSize,
  type HvacType,
  type RegionFactor,
  type RoofPitch,
  type RoofType,
  type SidingType,
  type SiteSlope,
  type WallType,
} from "@/lib/calculators/house";
import {
  FieldsetSection,
  RangeResultRow,
  SelectField,
  SliderField,
  formatCurrencyRange,
  formatNumber,
} from "./shared";

export function HouseCalculator() {
  const [livingAreaSqFt, setLivingAreaSqFt] = useState(2400);
  const [stories, setStories] = useState<1 | 2 | 3>(2);
  const [bedrooms, setBedrooms] = useState(4);
  const [bathrooms, setBathrooms] = useState(2.5);
  const [ceilingHeightFt, setCeilingHeightFt] = useState<CeilingHeight>(9);
  const [foundation, setFoundation] = useState<FoundationType>("basement-unfinished");
  const [siteSlope, setSiteSlope] = useState<SiteSlope>("flat");
  const [wallType, setWallType] = useState<WallType>("wood-frame");
  const [roofType, setRoofType] = useState<RoofType>("architectural");
  const [roofPitch, setRoofPitch] = useState<RoofPitch>("medium");
  const [sidingType, setSidingType] = useState<SidingType>("fiber-cement");
  const [finishLevel, setFinishLevel] = useState<FinishLevel>("standard");
  const [hvacType, setHvacType] = useState<HvacType>("standard");
  const [fireplaces, setFireplaces] = useState(1);
  const [deckSqFt, setDeckSqFt] = useState(200);
  const [region, setRegion] = useState<RegionFactor>("average");
  const [garageBays, setGarageBays] = useState<GarageSize>(2);
  const [contingencyPercent, setContingencyPercent] = useState(10);

  const result = useMemo(
    () =>
      calculateHouse({
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
      }),
    [
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
    ],
  );

  const maxItemHigh = Math.max(...result.lineItems.map((i) => i.cost.high), 1);

  return (
    <div className="grid gap-6 xl:grid-cols-[1fr_400px] xl:gap-10">
      <form
        className="space-y-5"
        onSubmit={(e) => e.preventDefault()}
        aria-label="House construction cost calculator inputs"
      >
        <FieldsetSection
          icon={<IconSize size={20} />}
          title="Home size & layout"
        >
          <SliderField
            id="house-area"
            label="Living area"
            value={livingAreaSqFt}
            min={800}
            max={8000}
            step={50}
            formatValue={(v) => `${formatNumber(v)} sq ft`}
            hint="Total heated living space, all floors combined"
            onChange={setLivingAreaSqFt}
          />
          <div className="grid gap-4 sm:grid-cols-2">
            <SelectField
              id="house-stories"
              label="Stories"
              value={stories}
              options={STORY_OPTIONS}
              onChange={setStories}
            />
            <SelectField
              id="house-ceiling"
              label="Ceiling height"
              value={ceilingHeightFt}
              options={CEILING_OPTIONS}
              onChange={setCeilingHeightFt}
            />
          </div>
          <SliderField
            id="house-bedrooms"
            label="Bedrooms"
            value={bedrooms}
            min={1}
            max={8}
            formatValue={(v) => String(v)}
            onChange={setBedrooms}
          />
          <SliderField
            id="house-bathrooms"
            label="Bathrooms"
            value={bathrooms}
            min={1}
            max={6}
            step={0.5}
            formatValue={(v) => String(v)}
            hint="Include half baths (e.g. 2.5 = 2 full + 1 half)"
            onChange={setBathrooms}
          />
        </FieldsetSection>

        <FieldsetSection
          icon={<IconFoundation size={20} />}
          title="Foundation & site"
        >
          <SelectField
            id="house-foundation"
            label="Foundation type"
            value={foundation}
            options={FOUNDATION_OPTIONS}
            hint="Biggest structural cost driver after home size"
            onChange={setFoundation}
          />
          <SelectField
            id="house-slope"
            label="Lot slope"
            value={siteSlope}
            options={SITE_SLOPE_OPTIONS}
            hint="Steep lots increase excavation and foundation cost"
            onChange={setSiteSlope}
          />
        </FieldsetSection>

        <FieldsetSection
          icon={<IconStructure size={20} />}
          title="Structure & roof"
        >
          <SelectField
            id="house-walls"
            label="Wall construction"
            value={wallType}
            options={WALL_OPTIONS}
            onChange={setWallType}
          />
          <div className="grid gap-4 sm:grid-cols-2">
            <SelectField
              id="house-roof"
              label="Roof material"
              value={roofType}
              options={ROOF_OPTIONS}
              onChange={setRoofType}
            />
            <SelectField
              id="house-pitch"
              label="Roof pitch"
              value={roofPitch}
              options={ROOF_PITCH_OPTIONS}
              onChange={setRoofPitch}
            />
          </div>
          <SelectField
            id="house-siding"
            label="Exterior siding"
            value={sidingType}
            options={SIDING_OPTIONS}
            onChange={setSidingType}
          />
        </FieldsetSection>

        <FieldsetSection
          icon={<IconInterior size={20} />}
          title="Systems & finishes"
        >
          <SelectField
            id="house-finish"
            label="Interior & exterior finish level"
            value={finishLevel}
            options={FINISH_OPTIONS}
            onChange={setFinishLevel}
          />
          <SelectField
            id="house-hvac"
            label="HVAC system"
            value={hvacType}
            options={HVAC_OPTIONS}
            onChange={setHvacType}
          />
          <SelectField
            id="house-region"
            label="Your region"
            value={region}
            options={REGION_OPTIONS}
            hint="Adjusts labor and material costs for your area"
            onChange={setRegion}
          />
        </FieldsetSection>

        <FieldsetSection
          icon={<IconExtras size={20} />}
          title="Extras & contingency"
        >
          <SelectField
            id="house-garage"
            label="Attached garage"
            value={garageBays}
            options={GARAGE_OPTIONS}
            onChange={setGarageBays}
          />
          <SliderField
            id="house-deck"
            label="Deck / patio area"
            value={deckSqFt}
            min={0}
            max={800}
            step={25}
            formatValue={(v) => (v === 0 ? "None" : `${formatNumber(v)} sq ft`)}
            onChange={setDeckSqFt}
          />
          <SliderField
            id="house-fireplaces"
            label="Fireplaces"
            value={fireplaces}
            min={0}
            max={3}
            formatValue={(v) => (v === 0 ? "None" : String(v))}
            onChange={setFireplaces}
          />
          <SliderField
            id="house-contingency"
            label="Contingency buffer"
            value={contingencyPercent}
            min={5}
            max={20}
            formatValue={(v) => `${v}%`}
            hint="Recommended reserve for change orders and surprises"
            onChange={setContingencyPercent}
          />
        </FieldsetSection>
      </form>

      <section
        aria-live="polite"
        aria-label="House construction cost estimate"
        className="bento-card h-fit border-brand/20 bg-gradient-to-br from-brand-light to-surface p-6 sm:p-8 xl:sticky xl:top-24"
      >
        <h2 className="text-lg font-bold text-foreground">Cost estimate range</h2>
        <p className="mt-1 text-sm text-muted">
          {formatNumber(livingAreaSqFt)} sq ft · {stories} story
          {stories > 1 ? "s" : ""} · {bedrooms} bed · {bathrooms} bath
        </p>

        <div className="mt-5 rounded-xl bg-surface/80 p-4 ring-1 ring-brand/15">
          <p className="text-xs font-semibold uppercase tracking-wide text-muted">
            Total project cost
          </p>
          <p className="mt-1 text-2xl font-extrabold text-brand sm:text-3xl">
            {formatCurrencyRange(result.total.low, result.total.high)}
          </p>
          <p className="mt-1 text-sm text-muted">
            {formatCurrencyRange(result.costPerSqFt.low, result.costPerSqFt.high)} per sq ft
          </p>
        </div>

        <div className="mt-5">
          <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-muted">
            Cost breakdown
          </p>
          {result.lineItems.map((item) => (
            <RangeResultRow
              key={item.id}
              label={item.label}
              description={item.description}
              low={item.cost.low}
              high={item.cost.high}
              barPercent={(item.cost.high / maxItemHigh) * 100}
            />
          ))}
          <RangeResultRow
            label={`Contingency (${contingencyPercent}%)`}
            description="Budget reserve for unforeseen costs"
            low={result.contingency.low}
            high={result.contingency.high}
          />
          <RangeResultRow
            label="Total with contingency"
            low={result.total.low}
            high={result.total.high}
            highlight
          />
        </div>

        <p className="mt-5 text-xs text-muted leading-relaxed">
          Ranges reflect 2026 US national averages. Not a bid — use for early budgeting and contractor discussions.
        </p>
      </section>
    </div>
  );
}
