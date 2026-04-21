"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { X, MoreHorizontal, MapPin, BadgeCheck, Calendar } from "lucide-react";
import { useLanguage } from "@/lib/i18n/context";

type JobStatus = "open" | "closed";
const postedJobStatuses: JobStatus[] = Array.from({ length: 6 }, (_, i) =>
  i < 2 ? "open" : "closed"
);

export default function SupplierDetailPage() {
  const router = useRouter();
  const { t, direction } = useLanguage();
  const [jobMenuOpen, setJobMenuOpen] = useState<number | null>(null);
  const jobStatusLabel: Record<JobStatus, string> = {
    open: t.admin.statusOpen,
    closed: t.admin.statusClosed,
  };
  const postedJobs = postedJobStatuses.map((status, i) => ({
    id: i + 1,
    title: t.admin.sampleJobTitleAdmin,
    badge: t.admin.sampleJobSubtitle,
    description: t.admin.sampleJobDescription,
    date: "09/12/2026",
    location: t.admin.sampleJobLocation,
    salary: "30,000 - 50,000",
    status,
    candidates: "1,240",
  }));

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto"
      style={{ fontFamily: "'Heebo', sans-serif" }}
    >
      <div className="fixed inset-0" style={{ background: "rgba(0,0,0,0.4)", backdropFilter: "blur(8px)", WebkitBackdropFilter: "blur(8px)" }} onClick={() => router.back()} />

      <div
        className="relative z-10 my-8 flex w-full max-w-[520px] flex-col rounded-2xl bg-white"
        style={{ boxShadow: "0 20px 60px rgba(0,0,0,0.15)", maxHeight: "calc(100vh - 64px)" }}
      >
        {/* Fixed Company header + Close */}
        <div className="shrink-0 border-b border-border-light" style={{ padding: "24px 28px 16px" }}>
        <div className="flex items-start justify-between" style={{ marginBottom: 16 }}>
        <div className="flex items-start gap-4">
          <div className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-[#0E1117]" style={{ padding: 8 }}>
            <img src="/images/chat-company-logo.png" alt="" className="h-full w-full object-contain" />
          </div>
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <h1 className="text-[22px] leading-[1.1] text-foreground">{t.admin.sampleSupplierName}</h1>
              <span className="rounded-full bg-primary text-[10px] text-white" style={{ padding: "2px 10px" }}>{t.admin.statusNew}</span>
            </div>
            <p className="text-xs text-muted-foreground">{t.admin.serviceTypeLabel}: {t.admin.sampleLoremShort} | {t.admin.employerTypeLabel}: {t.admin.sampleLoremShort}</p>
          </div>
        </div>
          <button onClick={() => router.back()} className="flex shrink-0 cursor-pointer items-center justify-center border-none bg-transparent text-muted-foreground hover:text-foreground">
            <X size={20} />
          </button>
        </div>

        {/* Contact info */}
        <div className="flex items-center gap-6 text-xs text-foreground" style={{ marginBottom: 20 }}>
          <span>{t.admin.emailAddressLabel}: mayffd@gmail.com 📋</span>
          <span>{t.admin.phoneNumberLabel}: 052-7049494 📋</span>
        </div>

        </div>

        {/* Scrollable content */}
        <div className="flex-1 overflow-y-auto" style={{ padding: "20px 28px 40px" }}>
        {/* Action buttons */}
        <div className="flex items-center gap-4" style={{ marginBottom: 28 }}>
          <button className="flex-1 cursor-pointer rounded-lg border border-foreground bg-white py-3 text-sm text-foreground transition-colors hover:bg-gray-50">
            {t.admin.providerBlocking}
          </button>
          <button onClick={() => router.push("/admin/suppliers/delete/1")} className="flex-1 cursor-pointer rounded-lg border border-red-400 bg-white py-3 text-sm text-red-400 transition-colors hover:bg-red-50">
            {t.admin.deleteProvider}
          </button>
        </div>

        {/* System activity */}
        <h3 className="text-base text-foreground" style={{ marginBottom: 12 }}>{t.admin.systemActivity}</h3>
        <div className="grid grid-cols-3 gap-3" style={{ marginBottom: 28 }}>
          <div className="flex flex-col items-center gap-1 rounded-xl border border-border-light bg-white" style={{ padding: "14px 10px" }}>
            <span className="text-[10px] text-muted-foreground">{t.admin.orbit}</span>
            <span className="text-lg text-foreground">{`\u20aa100 ${t.admin.monthlyPrice.split("\n")[0]}`}</span>
          </div>
          <div className="flex flex-col items-center gap-1 rounded-xl border border-border-light bg-white" style={{ padding: "14px 10px" }}>
            <span className="text-[10px] text-muted-foreground">{t.admin.jobsFilled}</span>
            <span className="text-lg text-foreground">380</span>
          </div>
          <div className="flex flex-col items-center gap-1 rounded-xl border border-border-light bg-white" style={{ padding: "14px 10px" }}>
            <span className="text-[10px] text-muted-foreground">{t.admin.jobsInSystem}</span>
            <span className="text-lg text-foreground">260/1000</span>
          </div>
        </div>

        {/* Posted jobs */}
        <h3 className="text-base text-foreground" style={{ marginBottom: 12 }}>{t.admin.postedJobs}</h3>
        <div className="grid grid-cols-2 gap-4">
          {postedJobs.map((job) => (
            <div key={job.id} onClick={() => router.push(`${window.location.pathname}/job/${job.id}`)} className="flex cursor-pointer flex-col rounded-xl border border-border-light bg-white transition-shadow hover:shadow-md" style={{ padding: "14px" }}>
              {/* Title row */}
              <div className="flex items-start justify-between" style={{ marginBottom: 6 }}>
                <div className="flex items-start gap-1.5">
                  <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full" style={{ backgroundImage: "linear-gradient(140deg, #4C96FF 12%, #1667DB 94%)" }}>
                    <svg width="8" height="8" viewBox="0 0 24 24" fill="white"><path d="M20 6h-4V4c0-1.1-.9-2-2-2h-4c-1.1 0-2 .9-2 2v2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm-8-2h4v2h-4V4z" /></svg>
                  </div>
                  <div className="flex flex-col">
                    <div className="flex items-center gap-1">
                      <span className="text-xs leading-[1.2] text-foreground">{job.title}</span>
                      <BadgeCheck size={12} className="shrink-0 text-primary" />
                    </div>
                    <span className="text-[9px] leading-[1.2] text-primary">{job.badge}</span>
                  </div>
                </div>
                <div className="relative">
                  <button onClick={() => setJobMenuOpen(jobMenuOpen === job.id ? null : job.id)} className="flex cursor-pointer items-center justify-center border-none bg-transparent text-muted-foreground">
                    <MoreHorizontal size={16} />
                  </button>
                  {jobMenuOpen === job.id && (
                    <>
                      <div className="fixed inset-0 z-10" onClick={() => setJobMenuOpen(null)} />
                      <div className="absolute right-0 top-6 z-20 flex min-w-36 flex-col gap-0.5 rounded-lg border border-border-light bg-white shadow-lg" style={{ padding: "8px 12px" }}>
                        <button onClick={() => setJobMenuOpen(null)} className="w-full whitespace-nowrap py-1 text-start text-[11px] text-foreground hover:text-primary">{t.admin.becomeHotJob}</button>
                        <button onClick={() => setJobMenuOpen(null)} className="w-full whitespace-nowrap py-1 text-start text-[11px] text-foreground hover:text-primary">{t.admin.jobHopping}</button>
                        <button onClick={() => setJobMenuOpen(null)} className="w-full whitespace-nowrap py-1 text-start text-[11px] text-foreground hover:text-primary">{t.admin.adBlocking}</button>
                        <button onClick={() => setJobMenuOpen(null)} className="w-full whitespace-nowrap py-1 text-start text-[11px] text-red-400 hover:text-red-600">{t.admin.deletingAd}</button>
                      </div>
                    </>
                  )}
                </div>
              </div>

              <p className="text-[9px] leading-[1.3] text-muted-foreground" style={{ marginBottom: 6 }}>{job.description}</p>

              {/* Date + Location */}
              <div className="flex items-center gap-3 text-[9px] text-foreground" style={{ marginBottom: 6 }}>
                <span className="flex items-center gap-1"><Calendar size={8} className="text-muted-foreground" /> {t.admin.dateLabel}: {job.date}</span>
                <span className="flex items-center gap-1"><MapPin size={8} className="text-primary" /> {job.location}</span>
              </div>

              {/* Salary */}
              <div className="flex items-center justify-between text-[9px]" style={{ marginBottom: 8 }}>
                <span className="text-muted-foreground">{t.admin.salaryLabel}</span>
                <span className="text-sm text-foreground">{job.salary}</span>
              </div>

              {/* Status badge */}
              <span
                className="self-start rounded-full text-[9px]"
                style={{
                  padding: "3px 10px",
                  color: job.status === "open" ? "#20AB7F" : "#FF676A",
                  border: `1px solid ${job.status === "open" ? "#20AB7F" : "#FF676A"}`,
                  marginBottom: 8,
                }}
              >
                {jobStatusLabel[job.status]}
              </span>

              {/* Total candidates */}
              <div className="rounded-lg bg-[#F3F3F6] text-center text-[9px] text-muted-foreground" style={{ padding: "8px 10px" }}>
                {t.admin.totalCandidates} · {job.candidates}
              </div>
            </div>
          ))}
        </div>
        </div>
      </div>
    </div>
  );
}
