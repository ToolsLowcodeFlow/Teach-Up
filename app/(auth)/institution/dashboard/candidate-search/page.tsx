"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { useLanguage } from "@/lib/i18n/context";
import { CandidateCard, type CandidateCardData } from "@/components/dashboard/candidate-card";
import { CandidateSearchFilters } from "@/components/dashboard/candidate-search-filters";
import { Pagination } from "@/components/dashboard/pagination";

export default function CandidateSearchPage() {
  const { t } = useLanguage();
  const cs = t.candidateSearch;
  const mockCandidates: CandidateCardData[] = Array.from({ length: 9 }, (_, i) => ({
    id: String(i + 1),
    name: cs.candidateName,
    role: cs.teacher,
    field: cs.computerScience,
    description: cs.candidateDescription,
    experience: 4,
    location: cs.jaffaTelAviv,
    isFavorited: i % 3 === 0,
  }));
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <div style={{ padding: "24px 40px 64px" }} className="w-full">
      {/* Top bar */}
      <div style={{ marginBottom: 16 }} className="flex items-center justify-between">
        <h1 className="text-[28px] leading-tight text-foreground xl:text-[32px]">
          {t.candidateSearch.title}
        </h1>

        <button className="flex items-center gap-3 text-sm tracking-tight text-foreground">
          <ChevronDown className="h-3 w-3" />
          <span>{t.dashboard.sortBy}</span>
        </button>
      </div>

      {/* Content: Cards left, Filters right */}
      <div className="flex flex-col-reverse gap-8 lg:flex-row lg:gap-10">
        {/* Candidate cards grid */}
        <div className="min-w-0 flex-1">
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
            {mockCandidates.map((candidate) => (
              <CandidateCard key={candidate.id} candidate={candidate} />
            ))}
          </div>

          <div style={{ marginTop: 40 }}>
            <Pagination
              currentPage={currentPage}
              totalPages={8}
              onPageChange={setCurrentPage}
            />
          </div>
        </div>

        {/* Filters */}
        <CandidateSearchFilters />
      </div>
    </div>
  );
}
