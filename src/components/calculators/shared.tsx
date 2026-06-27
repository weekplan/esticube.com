import type { ReactNode } from "react";

type FormFieldProps = {
  label: string;
  id: string;
  hint?: string;
  children: ReactNode;
};

export function FormField({ label, id, hint, children }: FormFieldProps) {
  return (
    <div className="space-y-1.5">
      <label htmlFor={id} className="block text-sm font-medium text-foreground">
        {label}
      </label>
      {children}
      {hint && <p className="text-xs text-muted">{hint}</p>}
    </div>
  );
}

type SliderFieldProps = {
  label: string;
  id: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  formatValue?: (v: number) => string;
  hint?: string;
  onChange: (v: number) => void;
};

export function SliderField({
  label,
  id,
  value,
  min,
  max,
  step = 1,
  formatValue = (v) => String(v),
  hint,
  onChange,
}: SliderFieldProps) {
  return (
    <FormField label={label} id={id} hint={hint}>
      <div className="space-y-2">
        <div className="flex items-center justify-between gap-3">
          <input
            id={id}
            type="range"
            min={min}
            max={max}
            step={step}
            value={value}
            onChange={(e) => onChange(Number(e.target.value))}
            className="h-2 w-full cursor-pointer appearance-none rounded-full bg-surface-3 accent-brand [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-brand [&::-webkit-slider-thumb]:shadow-md"
            aria-valuemin={min}
            aria-valuemax={max}
            aria-valuenow={value}
            aria-valuetext={formatValue(value)}
          />
          <span className="min-w-[4.5rem] shrink-0 rounded-lg bg-brand-light px-2.5 py-1 text-center text-sm font-bold tabular-nums text-brand">
            {formatValue(value)}
          </span>
        </div>
      </div>
    </FormField>
  );
}

type SelectFieldProps<T extends string | number> = {
  label: string;
  id: string;
  value: T;
  hint?: string;
  options: { value: T; label: string }[];
  onChange: (v: T) => void;
};

export function SelectField<T extends string | number>({
  label,
  id,
  value,
  hint,
  options,
  onChange,
}: SelectFieldProps<T>) {
  return (
    <FormField label={label} id={id} hint={hint}>
      <select
        id={id}
        value={value}
        onChange={(e) =>
          onChange(
            (typeof value === "number"
              ? Number(e.target.value)
              : e.target.value) as T,
          )
        }
        className={selectClass}
      >
        {options.map((o) => (
          <option key={String(o.value)} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </FormField>
  );
}

type FieldsetSectionProps = {
  icon: ReactNode;
  title: string;
  children: ReactNode;
};

export function FieldsetSection({ icon, title, children }: FieldsetSectionProps) {
  return (
    <fieldset className="space-y-4 rounded-2xl border border-border bg-surface-2/50 p-5 sm:p-6">
      <legend className="flex w-full items-center gap-3 px-1 text-base font-bold text-foreground">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand text-white shadow-sm shadow-brand/20">
          {icon}
        </span>
        {title}
      </legend>
      <div className="space-y-4">{children}</div>
    </fieldset>
  );
}

export const inputClass =
  "w-full rounded-xl border border-border bg-surface px-4 py-3 text-base text-foreground shadow-sm transition-colors focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20 min-h-[48px]";

export const selectClass = inputClass;

type ResultRowProps = {
  label: string;
  value: string | number;
  highlight?: boolean;
};

export function ResultRow({ label, value, highlight }: ResultRowProps) {
  return (
    <div
      className={`flex items-center justify-between gap-4 py-2.5 text-sm ${
        highlight
          ? "border-t-2 border-brand pt-3 font-semibold text-foreground"
          : "border-t border-border text-muted"
      }`}
    >
      <span>{label}</span>
      <span className={highlight ? "text-brand text-base" : "text-foreground font-medium tabular-nums"}>
        {value}
      </span>
    </div>
  );
}

type RangeResultRowProps = {
  label: string;
  description?: string;
  low: number;
  high: number;
  highlight?: boolean;
  barPercent?: number;
};

export function RangeResultRow({
  label,
  description,
  low,
  high,
  highlight,
  barPercent,
}: RangeResultRowProps) {
  return (
    <div
      className={`py-3 ${
        highlight
          ? "border-t-2 border-brand pt-4"
          : "border-t border-border"
      }`}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <p className={`text-sm ${highlight ? "font-bold text-foreground" : "font-medium text-foreground"}`}>
            {label}
          </p>
          {description && (
            <p className="mt-0.5 text-xs text-muted leading-relaxed">{description}</p>
          )}
        </div>
        <p className={`shrink-0 text-right tabular-nums ${highlight ? "text-base font-bold text-brand" : "text-sm font-semibold text-foreground"}`}>
          {formatCurrencyRange(low, high)}
        </p>
      </div>
      {barPercent !== undefined && barPercent > 0 && (
        <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-surface-3">
          <div
            className="h-full rounded-full bg-gradient-to-r from-brand/60 to-brand"
            style={{ width: `${Math.min(barPercent, 100)}%` }}
          />
        </div>
      )}
    </div>
  );
}

export function formatCurrency(n: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(n);
}

export function formatCurrencyRange(low: number, high: number) {
  if (low === high) return formatCurrency(low);
  return `${formatCurrency(low)} – ${formatCurrency(high)}`;
}

export function formatNumber(n: number) {
  return new Intl.NumberFormat("en-US").format(n);
}
