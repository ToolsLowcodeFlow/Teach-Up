"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Heart, MapPin, BadgeCheck } from "lucide-react";
import { useLanguage } from "@/lib/i18n/context";
import { SeekerNavbar } from "@/components/seeker/seeker-navbar";
import { PublicFooter } from "@/components/home/public-footer";

const favoriteJobs = Array.from({ length: 8 }, (_, i) => ({
  id: i + 1,
  title: "Computer Science Teacher",
  titleHe: "מורה למדעי המחשב",
  badge: "with at least 4 years of experience",
  badgeHe: "עם לפחות 4 שנות ניסיון",
  description: "This is a dummy paragraph text that aims to fill a space in the website design and demonstrate how the actual text will look. It can be used...",
  descriptionHe: "זהו טקסט פיקטיבי שנועד למלא מקום בעיצוב האתר ולהדגים כיצד ייראה הטקסט בפועל. ניתן להשתמש...",
  location: "Jaffa - Tel Aviv",
  locationHe: "יפו - תל אביב",
  salary: "30,000 - 50,000",
  company: "Company Name",
  companyHe: "שם חברה",
  date: "08/12/2025",
}));

export default function FavoritesPage() {
  const router = useRouter();
  const { locale, direction, t } = useLanguage();

  useEffect(() => {
    const el = document.querySelector(".lang-switcher-global") as HTMLElement;
    if (el) el.style.display = "none";
    return () => { if (el) el.style.display = ""; };
  }, []);

  const isHe = locale === "he";

  return (
    <div className="flex min-h-screen flex-col bg-[#F7F9FC]" style={{ fontFamily: "'Heebo', sans-serif" }}>
      <SeekerNavbar />

      {/* Content */}
      <div className="w-full" style={{ padding: "30px 40px 60px" }} dir={direction}>
        <h1 className="text-[28px] leading-[1.1] text-foreground" style={{ marginBottom: 28 }}>{t.favorites.title}</h1>

        {/* 4-column grid */}
        <div className="grid grid-cols-4 gap-5">
          {favoriteJobs.map((job) => (
            <div
              key={job.id}
              onClick={() => router.push(`/jobs/${job.id}`)}
              className="flex cursor-pointer flex-col overflow-hidden rounded-[16px] bg-white transition-shadow hover:shadow-md"
              style={{ boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}
            >
              <div className="flex flex-1 flex-col" style={{ padding: "14px 14px" }}>
                <div className="flex items-start gap-2" style={{ marginBottom: 6 }}>
                  <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full" style={{ backgroundImage: "linear-gradient(140deg, #4C96FF 12%, #1667DB 94%)" }}>
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="white"><path d="M20 6h-4V4c0-1.1-.9-2-2-2h-4c-1.1 0-2 .9-2 2v2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm-8-2h4v2h-4V4z" /></svg>
                  </div>
                  <div className="flex flex-col">
                    <div className="flex items-center gap-1">
                      <span className="text-sm leading-[1.2] text-foreground">{isHe ? job.titleHe : job.title}</span>
                      <BadgeCheck size={14} className="shrink-0 text-primary" />
                    </div>
                    <span className="text-[10px] leading-[1.2] text-primary">{isHe ? job.badgeHe : job.badge}</span>
                  </div>
                </div>
                <p className="text-[10px] leading-[1.3] text-muted-foreground" style={{ marginBottom: 8 }}>{isHe ? job.descriptionHe : job.description}</p>
                <div className="flex items-center gap-1 text-[10px] text-foreground" style={{ marginBottom: 8 }}>
                  <span>{isHe ? job.locationHe : job.location}</span>
                  <MapPin size={10} className="text-primary" />
                </div>
                <div className="flex items-center justify-between" style={{ marginBottom: 8 }}>
                  <span className="text-[10px] text-muted-foreground">{isHe ? "שכר ₪" : "Salary ₪"}</span>
                  <span className="text-sm text-foreground">{job.salary}</span>
                </div>
                <div className="flex items-center justify-between rounded-lg bg-[#F3F3F6]" style={{ padding: "8px 10px" }}>
                  <div className="flex items-center gap-2">
                    <Heart size={14} fill="#FF676A" className="text-[#FF676A]" />
                    <span className="text-[10px] text-foreground">{isHe ? job.companyHe : job.company} · {job.date}</span>
                  </div>
                  <div className="h-6 w-6 overflow-hidden rounded-full">
                    <img src="/images/job-avatar.png" alt="" className="h-full w-full object-cover" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <PublicFooter />
    </div>
  );
}
