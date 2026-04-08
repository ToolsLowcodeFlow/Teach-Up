"use client";

import { useLanguage } from "@/lib/i18n/context";
import { CandidateCard, type CandidateCardData } from "@/components/dashboard/candidate-card";

export default function FavoritesPage() {
  const { t } = useLanguage();
  const cs = t.candidateSearch;
  const mockFavorites: CandidateCardData[] = Array.from({ length: 8 }, (_, i) => ({
    id: String(i + 1),
    name: cs.candidateName,
    role: cs.teacher,
    field: cs.computerScience,
    description: cs.candidateDescription,
    experience: 4,
    location: cs.jaffaTelAviv,
    isFavorited: true,
  }));

  return (
    <div style={{ padding: "24px 40px 64px" }} className="w-full">
      <h1 style={{ marginBottom: 20 }} className="text-[28px] leading-tight text-foreground xl:text-[32px]">
        {t.favorites.title}
      </h1>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {mockFavorites.map((candidate) => (
          <CandidateCard key={candidate.id} candidate={candidate} />
        ))}
      </div>
    </div>
  );
}
