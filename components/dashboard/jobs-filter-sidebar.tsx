"use client";

import { useState } from "react";
import { ChevronDown, Search } from "lucide-react";
import { useLanguage } from "@/lib/i18n/context";
import { DropdownSelect } from "./dropdown-select";

interface RangeSliderProps {
  label: string;
  dual?: boolean;
  value: number[];
  onChange: (value: number[]) => void;
}

function RangeSlider({ label, dual, value, onChange }: RangeSliderProps) {
  return (
    <div className="flex w-full flex-col gap-3.5">
      <span className="text-sm tracking-tight text-foreground">{label}</span>
      <div className="relative h-4 w-full">
        <div className="absolute top-1/2 h-2 w-full -translate-y-1/2 rounded-lg border border-white bg-[#E8EEF7]" />
        <div
          className="absolute top-1/2 h-2 -translate-y-1/2 rounded-full bg-[#77BFFF]"
          style={{
            insetInlineStart: dual ? `${value[0]}%` : "0%",
            width: dual ? `${value[1] - value[0]}%` : `${value[0]}%`,
          }}
        />
        {dual ? (
          <>
            <input
              type="range"
              min={0}
              max={100}
              value={value[0]}
              onChange={(e) => onChange([Number(e.target.value), value[1]])}
              className="pointer-events-none absolute inset-0 h-full w-full cursor-pointer appearance-none bg-transparent [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:border-[2.5px] [&::-webkit-slider-thumb]:border-[#77BFFF] [&::-webkit-slider-thumb]:bg-white"
            />
            <input
              type="range"
              min={0}
              max={100}
              value={value[1]}
              onChange={(e) => onChange([value[0], Number(e.target.value)])}
              className="pointer-events-none absolute inset-0 h-full w-full cursor-pointer appearance-none bg-transparent [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:border-[2.5px] [&::-webkit-slider-thumb]:border-[#77BFFF] [&::-webkit-slider-thumb]:bg-white"
            />
          </>
        ) : (
          <input
            type="range"
            min={0}
            max={100}
            value={value[0]}
            onChange={(e) => onChange([Number(e.target.value)])}
            className="pointer-events-none absolute inset-0 h-full w-full cursor-pointer appearance-none bg-transparent [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:border-[2.5px] [&::-webkit-slider-thumb]:border-[#77BFFF] [&::-webkit-slider-thumb]:bg-white"
          />
        )}
      </div>
    </div>
  );
}

export function JobsFilterSidebar() {
  const { t } = useLanguage();
  const [experience, setExperience] = useState([77]);
  const [salary, setSalary] = useState([10, 65]);

  return (
    <aside style={{ padding: 24 }} className="w-full rounded-[20px] bg-linear-to-b from-white to-white/0 lg:max-w-87.5">
      <div className="flex flex-col gap-4">
        <h2 className="text-[22px] leading-tight text-foreground">
          {t.dashboard.filters}
        </h2>

        <div className="flex w-full flex-col gap-5">
          <div style={{ padding: "12px 16px" }} className="flex w-full items-center gap-2.5 rounded-[10px] border border-border-light bg-white">
            <Search className="h-4 w-4 shrink-0 text-muted-foreground" />
            <span className="flex-1 text-sm tracking-tight text-muted-foreground/30">
              {t.dashboard.freeSearch}
            </span>
            <ChevronDown className="h-3 w-3 shrink-0 text-muted-foreground/30" />
          </div>

          <DropdownSelect label={t.dashboard.role} options={[t.candidateSearch.option1, t.candidateSearch.option2, t.candidateSearch.option3]} />
          <DropdownSelect label={t.dashboard.fieldOfKnowledge} options={[t.candidateSearch.option1, t.candidateSearch.option2, t.candidateSearch.option3]} />

          <RangeSlider
            label={t.dashboard.experienceYears}
            value={experience}
            onChange={setExperience}
          />

          <DropdownSelect label={t.dashboard.scopeOfWork} options={[t.candidateSearch.option1, t.candidateSearch.option2, t.candidateSearch.option3]} />
          <DropdownSelect label={t.dashboard.searchByRegion} options={[t.candidateSearch.option1, t.candidateSearch.option2, t.candidateSearch.option3]} placeholder />
          <DropdownSelect label={t.dashboard.languages} options={[t.candidateSearch.option1, t.candidateSearch.option2, t.candidateSearch.option3]} />
          <DropdownSelect label={t.dashboard.training} options={[t.candidateSearch.option1, t.candidateSearch.option2, t.candidateSearch.option3]} />

          <RangeSlider
            label={t.dashboard.salary}
            dual
            value={salary}
            onChange={setSalary}
          />
        </div>

        {/* Search button */}
        <button
          className="mt-2 flex h-12 w-full items-center justify-center rounded-[10px] text-base text-white transition-opacity hover:opacity-90"
          style={{
            backgroundImage:
              "linear-gradient(173deg, #4C96FF 12%, #1667DB 94%)",
          }}
        >
          {t.common.search}
        </button>

        {/* Spacer after search */}
        <div className="h-6" />
      </div>
    </aside>
  );
}
