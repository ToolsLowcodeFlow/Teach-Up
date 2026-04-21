"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronLeft, MoreHorizontal, Link2 } from "lucide-react";
import { useLanguage } from "@/lib/i18n/context";

export default function AdminJobDetailPage() {
  const router = useRouter();
  const { t, direction } = useLanguage();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto"
      style={{ fontFamily: "'Heebo', sans-serif" }}
    >
      <div className="fixed inset-0" style={{ background: "rgba(0,0,0,0.4)", backdropFilter: "blur(8px)", WebkitBackdropFilter: "blur(8px)" }} onClick={() => router.back()} />

      <div
        className="relative z-10 my-8 flex w-full max-w-[620px] flex-col rounded-2xl bg-white"
        style={{ boxShadow: "0 20px 60px rgba(0,0,0,0.15)", maxHeight: "calc(100vh - 64px)" }}
      >
        {/* Fixed Top row */}
        <div className="shrink-0 border-b border-border-light" style={{ padding: "24px 32px 16px" }}>
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2">
            <button onClick={() => router.back()} className="flex cursor-pointer items-center justify-center border-none bg-transparent text-muted-foreground hover:text-foreground">
              <ChevronLeft size={20} />
            </button>
            <h1 className="text-[22px] leading-[1.1] text-foreground">{t.admin.jobDetailsTitle}</h1>
          </div>

          {/* Menu */}
          <div className="relative">
            <button onClick={() => setMenuOpen(!menuOpen)} className="flex cursor-pointer items-center justify-center border-none bg-transparent text-muted-foreground hover:text-foreground">
              <MoreHorizontal size={20} />
            </button>
              {menuOpen && (
                <>
                  <div className="fixed inset-0 z-10" onClick={() => setMenuOpen(false)} />
                  <div className="absolute right-0 top-8 z-20 flex min-w-40 flex-col gap-0.5 rounded-xl border border-border-light bg-white shadow-lg" style={{ padding: "10px 14px" }}>
                    <button onClick={() => setMenuOpen(false)} className="w-full whitespace-nowrap py-1.5 text-start text-sm text-foreground hover:text-primary">{t.admin.becomeHotJob}</button>
                    <button onClick={() => setMenuOpen(false)} className="w-full whitespace-nowrap py-1.5 text-start text-sm text-foreground hover:text-primary">{t.admin.jobHopping}</button>
                    <button onClick={() => setMenuOpen(false)} className="w-full whitespace-nowrap py-1.5 text-start text-sm text-foreground hover:text-primary">{t.admin.adBlocking}</button>
                    <button onClick={() => setMenuOpen(false)} className="w-full whitespace-nowrap py-1.5 text-start text-sm text-red-400 hover:text-red-600">{t.admin.deletingAd}</button>
                  </div>
                </>
              )}
          </div>
        </div>
        </div>

        {/* Scrollable content */}
        <div className="flex-1 overflow-y-auto" style={{ padding: "20px 32px 40px" }}>
        {/* Badge */}
        <div className="flex items-center gap-2" style={{ marginBottom: 10 }}>
          <div className="flex h-5 w-5 items-center justify-center rounded-full bg-primary">
            <svg width="10" height="10" viewBox="0 0 24 24" fill="white"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" /></svg>
          </div>
          <span className="text-sm text-foreground">{t.admin.sampleCategory}</span>
        </div>

        {/* Title */}
        <h2 className="text-[20px] leading-[1.2] text-foreground" style={{ marginBottom: 6 }}>
          {t.admin.sampleJobTitle}
        </h2>

        {/* Date + Job number */}
        <div className="flex items-center gap-4 text-xs" style={{ marginBottom: 16 }}>
          <span className="text-primary">08/12/2025</span>
          <span className="text-muted-foreground">{t.admin.jobNumberPrefix} 84844985</span>
        </div>

        {/* Description */}
        <p className="text-xs leading-[1.5] text-muted-foreground" style={{ marginBottom: 20 }}>
          {t.admin.sampleLoremIpsum}
        </p>

        {/* Info grid */}
        <div className="rounded-[10px] border border-border-light" style={{ padding: "14px 18px", marginBottom: 20, background: "linear-gradient(180deg, #F7FAFF 0%, #EEF4FD 100%)" }}>
          <div className="grid grid-cols-6 gap-x-3 gap-y-4 text-center">
            {[
              [t.admin.hoursOfOperation, t.admin.lunchDinner],
              [t.admin.training, t.admin.morningTraining],
              [t.admin.yearsOfExperience, "09"],
              [t.admin.scopeOfWork, t.admin.fullTime],
              [t.admin.area, t.admin.sampleLocation],
              [t.admin.salaryRange, "10,000 - 20,000"],
            ].map(([label, value]) => (
              <div key={label} className="flex flex-col gap-0.5">
                <span className="text-[10px] text-muted-foreground">{label}</span>
                <span className="text-xs text-foreground">{value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Language tags */}
        <div className="flex items-center gap-2" style={{ marginBottom: 20 }}>
          {[t.admin.languageSpanish, t.admin.languageEnglish, t.admin.languageHebrew].map((lang) => (
            <span key={lang} className="rounded-full border border-border-light text-xs text-foreground" style={{ padding: "5px 16px" }}>
              {lang}
            </span>
          ))}
        </div>

        {/* {t.admin.companyDescription} */}
        <div className="flex flex-col" style={{ gap: 8, marginBottom: 20 }}>
          <h3 className="text-base text-foreground">{t.admin.companyDescription}</h3>
          <p className="text-xs leading-[1.5] text-muted-foreground">
            {t.admin.sampleLoremIpsum}
          </p>
          <div className="flex items-center gap-2" style={{ marginTop: 4 }}>
            <div className="h-6 w-6 overflow-hidden rounded-full">
              <img src="/images/job-avatar.png" alt="" className="h-full w-full object-cover" />
            </div>
            <span className="text-xs text-foreground">{t.admin.companyNameLabel}: {t.admin.sampleCompanyName}</span>
          </div>
        </div>

        {/* {t.admin.attachments} */}
        <div className="flex flex-col" style={{ gap: 8 }}>
          <h3 className="text-base text-foreground">{t.admin.attachments}</h3>
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex items-center justify-between rounded-[10px] border border-border-light" style={{ padding: "10px 14px", background: "linear-gradient(180deg, #FFFDF7 0%, #FFF8E8 100%)" }}>
              <div className="flex items-center gap-2">
                <Link2 size={14} className="shrink-0 text-muted-foreground" />
                <span className="text-xs text-primary">{t.admin.sampleJobTitle}</span>
                <span className="text-[10px] text-muted-foreground">142 KB</span>
              </div>
            </div>
          ))}
        </div>
        </div>
      </div>
    </div>
  );
}
