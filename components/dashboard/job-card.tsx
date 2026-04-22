"use client";

import { useState } from "react";
import { MoreHorizontal, MapPin, Calendar, BadgeCheck } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/lib/i18n/context";

export interface JobCardData {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  date: string;
  location: string;
  salaryMin: number;
  salaryMax: number;
  status: "open" | "closed";
  totalCandidates: number;
  isVerified?: boolean;
}

interface JobCardProps {
  job: JobCardData;
  onView?: () => void;
  onEdit?: () => void;
  onStatusToggle?: () => void;
  onDelete?: () => void;
}

export function JobCard({ job, onView, onEdit, onStatusToggle, onDelete }: JobCardProps) {
  const { t } = useLanguage();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="relative flex flex-col rounded-2xl bg-white" style={{ padding: 24 }}>
      {/* Row 1: Title + badge on start, menu on end */}
      <div className="mb-2 flex items-start justify-between">
        <div className="flex flex-1 flex-col gap-1">
          <div className="flex items-center gap-1.5">
            {job.isVerified && (
              <BadgeCheck className="h-5 w-5 shrink-0 text-primary" />
            )}
            <span className="text-lg font-medium leading-tight text-foreground">
              {job.title}
            </span>
          </div>
          <p className="text-sm leading-snug text-foreground">
            {job.subtitle}
          </p>
        </div>

        <div className="relative ms-2">
          <button
            onClick={(e) => { e.stopPropagation(); setMenuOpen(!menuOpen); }}
            className="flex h-8 w-8 items-center justify-center rounded-full transition-colors hover:bg-gray-100"
          >
            <MoreHorizontal className="h-5 w-5 text-muted-foreground" />
          </button>

          {menuOpen && (
            <>
            <div className="fixed inset-0 z-40" onClick={(e) => { e.stopPropagation(); setMenuOpen(false); }} />
            <div style={{ padding: "10px 6px" }} className="absolute inset-e-0 top-9 z-50 min-w-45 rounded-xl border border-border-light bg-white shadow-lg">
              <button className="flex w-full px-4 py-2 text-start text-sm text-foreground transition-colors hover:bg-gray-50" onClick={(e) => { e.stopPropagation(); setMenuOpen(false); onView?.(); }}>
                {t.jobCard.viewJob}
              </button>
              <button className="flex w-full px-4 py-2 text-start text-sm text-foreground transition-colors hover:bg-gray-50" onClick={(e) => { e.stopPropagation(); setMenuOpen(false); onEdit?.(); }}>
                {t.jobCard.editJob}
              </button>
              <button className="flex w-full px-4 py-2 text-start text-sm text-foreground transition-colors hover:bg-gray-50" onClick={(e) => { e.stopPropagation(); setMenuOpen(false); }}>
                {t.jobCard.popUpAd}
              </button>
              <button className="flex w-full px-4 py-2 text-start text-sm text-foreground transition-colors hover:bg-gray-50" onClick={(e) => { e.stopPropagation(); setMenuOpen(false); }}>
                {t.jobCard.jobActivation}
              </button>
              <div className="my-1 h-px bg-border-light" />
              <button className="flex w-full px-4 py-2 text-start text-sm text-foreground transition-colors hover:bg-gray-50" onClick={(e) => { e.stopPropagation(); setMenuOpen(false); onStatusToggle?.(); }}>
                {t.jobCard.closeJob}
              </button>
              {onDelete && (
                <button className="flex w-full px-4 py-2 text-start text-sm text-danger transition-colors hover:bg-red-50" onClick={(e) => { e.stopPropagation(); setMenuOpen(false); onDelete(); }}>
                  {t.jobCard.deleteJob}
                </button>
              )}
            </div>
            </>
          )}
        </div>
      </div>

      {/* Description */}
      <p className="mb-4 text-xs leading-relaxed text-muted-foreground">
        {job.description}
      </p>

      {/* Date + Location */}
      <div className="mb-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-foreground">
        <div className="flex items-center gap-1.5">
          <Calendar className="h-3.5 w-3.5 text-muted-foreground" />
          <span>{t.jobCard.date}: {job.date}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <MapPin className="h-3.5 w-3.5 text-muted-foreground" />
          <span>{job.location}</span>
        </div>
      </div>

      {/* Salary */}
      <div className="mb-4 flex items-center gap-2">
        <span className="text-sm text-muted-foreground">{t.jobCard.salary} &#8362;</span>
        <span className="text-lg font-medium text-foreground">
          {job.salaryMin.toLocaleString()} - {job.salaryMax.toLocaleString()}
        </span>
      </div>

      {/* Status badge */}
      <div style={{ marginBottom: 10 }}>
        <span
          style={{ padding: "6px 14px" }}
          className={cn(
            "inline-block rounded-full border text-sm",
            job.status === "open"
              ? "border-success/30 bg-success/5 text-success"
              : "border-danger/30 bg-danger/5 text-danger"
          )}
        >
          {job.status === "open" ? t.jobCard.openPosition : t.jobCard.closedPosition}
        </span>
      </div>

      {/* Total candidates */}
      <div style={{ padding: 11 }} className="rounded-lg bg-[#F7F9FC] text-sm text-muted-foreground">
        {t.jobCard.totalCandidates} : {job.totalCandidates.toLocaleString()}
      </div>
    </div>
  );
}
