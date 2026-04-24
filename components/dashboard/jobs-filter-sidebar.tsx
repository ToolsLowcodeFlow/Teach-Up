"use client";

import { Search } from "lucide-react";
import { useLanguage } from "@/lib/i18n/context";
import { DropdownSelect } from "./dropdown-select";

interface RangeSliderProps {
  label: string;
  dual?: boolean;
  value: number[];
  onChange: (value: number[]) => void;
  min?: number;
  max?: number;
  step?: number;
  formatValue?: (v: number) => string;
}

function RangeSlider({ label, dual, value, onChange, min = 0, max = 100, step = 1, formatValue }: RangeSliderProps) {
  const range = max - min;
  const pct = (v: number) => ((v - min) / range) * 100;
  const display = formatValue
    ? dual
      ? `${formatValue(value[0])} – ${formatValue(value[1])}`
      : formatValue(value[0])
    : null;

  return (
    <div className="flex w-full flex-col gap-3.5">
      <div className="flex items-center justify-between gap-3">
        <span className="text-sm tracking-tight text-foreground">{label}</span>
        {display && (
          <span className="text-xs tracking-tight text-muted-foreground">{display}</span>
        )}
      </div>
      <div className="relative h-4 w-full">
        <div className="absolute top-1/2 h-2 w-full -translate-y-1/2 rounded-lg border border-white bg-[#E8EEF7]" />
        <div
          className="absolute top-1/2 h-2 -translate-y-1/2 rounded-full bg-[#77BFFF]"
          style={{
            insetInlineStart: dual ? `${pct(value[0])}%` : "0%",
            width: dual ? `${pct(value[1]) - pct(value[0])}%` : `${pct(value[0])}%`,
          }}
        />
        {dual ? (
          <>
            <input
              type="range"
              min={min}
              max={max}
              step={step}
              value={value[0]}
              onChange={(e) => onChange([Math.min(Number(e.target.value), value[1]), value[1]])}
              className="pointer-events-none absolute inset-0 h-full w-full cursor-pointer appearance-none bg-transparent [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:border-[2.5px] [&::-webkit-slider-thumb]:border-[#77BFFF] [&::-webkit-slider-thumb]:bg-white"
            />
            <input
              type="range"
              min={min}
              max={max}
              step={step}
              value={value[1]}
              onChange={(e) => onChange([value[0], Math.max(Number(e.target.value), value[0])])}
              className="pointer-events-none absolute inset-0 h-full w-full cursor-pointer appearance-none bg-transparent [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:border-[2.5px] [&::-webkit-slider-thumb]:border-[#77BFFF] [&::-webkit-slider-thumb]:bg-white"
            />
          </>
        ) : (
          <input
            type="range"
            min={min}
            max={max}
            step={step}
            value={value[0]}
            onChange={(e) => onChange([Number(e.target.value)])}
            className="pointer-events-none absolute inset-0 h-full w-full cursor-pointer appearance-none bg-transparent [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:border-[2.5px] [&::-webkit-slider-thumb]:border-[#77BFFF] [&::-webkit-slider-thumb]:bg-white"
          />
        )}
      </div>
    </div>
  );
}

export interface JobFilters {
  freeSearch: string;
  role: string;
  fieldOfKnowledge: string;
  scopeOfWork: string;
  region: string;
  languages: string;
  training: string;
  minExperience: number;
  salary: [number, number];
}

export const MAX_EXPERIENCE = 30;
export const MAX_SALARY = 50000;

export const DEFAULT_FILTERS: JobFilters = {
  freeSearch: "",
  role: "",
  fieldOfKnowledge: "",
  scopeOfWork: "",
  region: "",
  languages: "",
  training: "",
  minExperience: 0,
  salary: [0, MAX_SALARY],
};

interface JobsFilterSidebarProps {
  filters: JobFilters;
  onChange: (filters: JobFilters) => void;
  onClear: () => void;
  roleOptions: string[];
  fieldOptions: string[];
  scopeOptions: string[];
  regionOptions: string[];
  languageOptions: string[];
  trainingOptions: string[];
}

export function JobsFilterSidebar({
  filters,
  onChange,
  onClear,
  roleOptions,
  fieldOptions,
  scopeOptions,
  regionOptions,
  languageOptions,
  trainingOptions,
}: JobsFilterSidebarProps) {
  const { t } = useLanguage();
  const set = <K extends keyof JobFilters>(key: K, value: JobFilters[K]) =>
    onChange({ ...filters, [key]: value });

  const hasActiveFilters =
    filters.freeSearch.trim() !== "" ||
    filters.role !== "" ||
    filters.fieldOfKnowledge !== "" ||
    filters.scopeOfWork !== "" ||
    filters.region !== "" ||
    filters.languages !== "" ||
    filters.training !== "" ||
    filters.minExperience > 0 ||
    filters.salary[0] > 0 ||
    filters.salary[1] < MAX_SALARY;

  return (
    <aside style={{ padding: 24 }} className="w-full rounded-[20px] bg-linear-to-b from-white to-white/0 lg:max-w-87.5">
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between gap-3">
          <h2 className="text-[22px] leading-tight text-foreground">
            {t.dashboard.filters}
          </h2>
          {hasActiveFilters && (
            <button
              type="button"
              onClick={onClear}
              className="cursor-pointer text-xs tracking-tight text-primary underline hover:text-primary-dark"
            >
              {t.dashboard.clearFilters}
            </button>
          )}
        </div>

        <div className="flex w-full flex-col gap-5">
          <div style={{ padding: "12px 16px" }} className="flex w-full items-center gap-2.5 rounded-[10px] border border-border-light bg-white focus-within:border-primary/30">
            <Search className="h-4 w-4 shrink-0 text-muted-foreground" />
            <input
              type="text"
              value={filters.freeSearch}
              onChange={(e) => set("freeSearch", e.target.value)}
              placeholder={t.dashboard.freeSearch}
              className="flex-1 border-none bg-transparent text-sm tracking-tight text-foreground placeholder:text-muted-foreground/30 focus:outline-none"
            />
          </div>

          <DropdownSelect
            label={t.dashboard.role}
            options={roleOptions}
            value={filters.role}
            onChange={(v) => set("role", v === filters.role ? "" : v)}
          />
          <DropdownSelect
            label={t.dashboard.fieldOfKnowledge}
            options={fieldOptions}
            value={filters.fieldOfKnowledge}
            onChange={(v) => set("fieldOfKnowledge", v === filters.fieldOfKnowledge ? "" : v)}
          />

          <RangeSlider
            label={t.dashboard.experienceYears}
            value={[filters.minExperience]}
            onChange={(v) => set("minExperience", v[0])}
            min={0}
            max={MAX_EXPERIENCE}
            formatValue={(v) => `${v}+ ${t.dashboard.years}`}
          />

          <DropdownSelect
            label={t.dashboard.scopeOfWork}
            options={scopeOptions}
            value={filters.scopeOfWork}
            onChange={(v) => set("scopeOfWork", v === filters.scopeOfWork ? "" : v)}
          />
          <DropdownSelect
            label={t.dashboard.searchByRegion}
            options={regionOptions}
            value={filters.region}
            onChange={(v) => set("region", v === filters.region ? "" : v)}
            placeholder
          />
          <DropdownSelect
            label={t.dashboard.languages}
            options={languageOptions}
            value={filters.languages}
            onChange={(v) => set("languages", v === filters.languages ? "" : v)}
          />
          <DropdownSelect
            label={t.dashboard.training}
            options={trainingOptions}
            value={filters.training}
            onChange={(v) => set("training", v === filters.training ? "" : v)}
          />

          <RangeSlider
            label={t.dashboard.salary}
            dual
            value={filters.salary}
            onChange={(v) => set("salary", [v[0], v[1]])}
            min={0}
            max={MAX_SALARY}
            step={500}
            formatValue={(v) => `₪${v.toLocaleString()}`}
          />
        </div>

        {/* Spacer */}
        <div className="h-2" />
      </div>
    </aside>
  );
}
