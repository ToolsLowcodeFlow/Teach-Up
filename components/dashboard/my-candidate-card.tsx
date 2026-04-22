"use client";

import { useState } from "react";
import Link from "next/link";
import { MoreHorizontal, BadgeCheck, Briefcase, MapPin } from "lucide-react";
import { useLanguage } from "@/lib/i18n/context";

export interface MyCandidateCardData {
  id: string;
  name: string;
  role: string;
  field: string;
  status: string;
  description: string;
  experience: number;
  location: string;
}

interface MyCandidateCardProps {
  candidate: MyCandidateCardData;
}

export function MyCandidateCard({ candidate }: MyCandidateCardProps) {
  const { t } = useLanguage();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div style={{ padding: 24 }} className="relative flex flex-col rounded-2xl bg-white">
      {/* Menu - absolute top right */}
      <div className="absolute inset-e-4 top-4">
        <div className="relative">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="flex h-7 w-7 items-center justify-center rounded-full transition-colors hover:bg-gray-100"
          >
            <MoreHorizontal className="h-5 w-5 text-muted-foreground" />
          </button>
          {menuOpen && (
            <>
              <div className="fixed inset-0 z-10" onClick={() => setMenuOpen(false)} />
              <div
                style={{ padding: "12px 16px" }}
                className="absolute inset-e-0 top-8 z-20 flex min-w-52 flex-col gap-2 rounded-xl border border-border-light bg-white shadow-lg"
              >
                {[
                  t.candidateProfile.sendMessage,
                  t.jobDetails.addToFavorites,
                  t.myCandidates.viewAssociatedJob,
                ].map((action) => (
                  <button
                    key={action}
                    className="flex w-full whitespace-nowrap rounded-md py-1 text-start text-sm text-foreground transition-colors hover:text-primary"
                    onClick={() => setMenuOpen(false)}
                  >
                    {action}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      {/* Status banner + field badge */}
      <div style={{ marginBottom: 12, paddingInlineEnd: 48 }} className="flex flex-col gap-2">
        <span className="text-xs text-muted-foreground">{candidate.status}</span>
        <div className="flex items-center gap-1 text-xs text-foreground">
          {candidate.field}
          <BadgeCheck className="h-4 w-4 text-primary" />
        </div>
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

      {/* Divider */}
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

      {/* Divider */}
      <div style={{ margin: "12px 0" }} className="h-px bg-border-light" />

      {/* View profile button */}
      <Link
        href="/institution/dashboard/candidate-profile"
        style={{ padding: "8px 16px" }}
        className="flex items-center justify-center rounded-xl border border-foreground/30 text-sm text-foreground transition-colors hover:bg-gray-50"
      >
        {t.candidateSearch.viewProfile}
      </Link>
    </div>
  );
}
