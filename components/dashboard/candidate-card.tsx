"use client";

import { useState } from "react";
import Link from "next/link";
import { Heart, BadgeCheck, Briefcase, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/lib/i18n/context";

export interface CandidateCardData {
  id: string;
  name: string;
  role: string;
  field: string;
  description: string;
  experience: number;
  location: string;
  isFavorited?: boolean;
  avatarUrl?: string;
}

interface CandidateCardProps {
  candidate: CandidateCardData;
}

export function CandidateCard({ candidate }: CandidateCardProps) {
  const { t } = useLanguage();
  const [favorited, setFavorited] = useState(candidate.isFavorited ?? false);

  return (
    <div style={{ padding: 24 }} className="flex flex-col rounded-2xl bg-white">
      {/* Top row: heart + field badge */}
      <div style={{ marginBottom: 14 }} className="flex items-center justify-between">
        <div className="flex items-center gap-1 text-sm text-foreground">
          {candidate.field}
          <BadgeCheck className="h-4 w-4 text-primary" />
        </div>
        <button onClick={() => setFavorited(!favorited)}>
          <Heart
            className={cn(
              "h-5 w-5 transition-colors",
              favorited ? "fill-danger text-danger" : "text-muted-foreground"
            )}
          />
        </button>
      </div>

      {/* Avatar + Name + Role */}
      <div style={{ marginBottom: 12 }} className="flex items-center gap-3">
        <div className="h-10 w-10 shrink-0 overflow-hidden rounded-full bg-muted-foreground/20">
          <div className="flex h-full w-full items-center justify-center text-xs text-muted-foreground">
            {candidate.name.charAt(0)}
          </div>
        </div>
        <div className="flex flex-col">
          <span className="text-sm font-medium text-foreground">{candidate.name}</span>
          <span className="text-xs text-success">{candidate.role}</span>
        </div>
      </div>

      {/* Description */}
      <p className="text-xs leading-relaxed text-muted-foreground">
        {candidate.description}
      </p>

      <div style={{ margin: "12px 0" }} className="h-px bg-border-light" />

      {/* Experience + Location */}
      <div className="flex items-center justify-between text-xs text-foreground">
        <div className="flex items-center gap-1.5">
          <Briefcase className="h-3.5 w-3.5 text-muted-foreground" />
          <span>{t.candidateSearch.experience}: {String(candidate.experience).padStart(2, "0")} {t.candidateSearch.years}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <MapPin className="h-3.5 w-3.5 text-primary" />
          <span>{candidate.location}</span>
        </div>
      </div>

      <div style={{ margin: "12px 0" }} className="h-px bg-border-light" />

      {/* View profile button */}
      <Link
        href="/institution/dashboard/candidate-search/profile"
        style={{ padding: "8px 16px" }}
        className="flex items-center justify-center rounded-xl border border-foreground/30 text-sm text-foreground transition-colors hover:bg-gray-50"
      >
        {t.candidateSearch.viewProfile}
      </Link>
    </div>
  );
}
