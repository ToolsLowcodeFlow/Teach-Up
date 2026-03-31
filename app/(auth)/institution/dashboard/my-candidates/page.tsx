"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { useLanguage } from "@/lib/i18n/context";
import { MyCandidateCard, type MyCandidateCardData } from "@/components/dashboard/my-candidate-card";
import { MyCandidatesFilters } from "@/components/dashboard/my-candidates-filters";
import { Pagination } from "@/components/dashboard/pagination";

const mockCandidates: MyCandidateCardData[] = Array.from({ length: 9 }, (_, i) => ({
  id: String(i + 1),
  name: "Yotam Israeli",
  role: "teacher",
  field: "Computer Science",
  status: "An interview invitation has been sent",
  description:
    "This is a dummy paragraph text that is intended to fill space in the website design and demonstrate how the actual text will look. It can be used...",
  experience: 4,
  location: "Jaffa - Tel Aviv",
}));

export default function MyCandidatesPage() {
  const { t } = useLanguage();
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <div style={{ padding: "24px 40px 64px" }} className="w-full">
      {/* Top bar */}
      <div style={{ marginBottom: 16 }} className="flex items-center justify-between">
        <h1 className="text-[28px] leading-tight text-foreground xl:text-[32px]">
          {t.myCandidates.title}
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
              <MyCandidateCard key={candidate.id} candidate={candidate} />
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
        <MyCandidatesFilters />
      </div>
    </div>
  );
}
