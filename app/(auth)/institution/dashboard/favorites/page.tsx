"use client";

import { useLanguage } from "@/lib/i18n/context";
import { CandidateCard, type CandidateCardData } from "@/components/dashboard/candidate-card";

const mockFavorites: CandidateCardData[] = Array.from({ length: 8 }, (_, i) => ({
  id: String(i + 1),
  name: "Yotam Israeli",
  role: "teacher",
  field: "Computer Science",
  description:
    "This is a dummy paragraph text that is intended to fill space in the website design and demonstrate how the actual text will look. It can be used...",
  experience: 4,
  location: "Jaffa - Tel Aviv",
  isFavorited: true,
}));

export default function FavoritesPage() {
  const { t } = useLanguage();

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
