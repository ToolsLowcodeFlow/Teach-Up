"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ChevronDown, Heart, Bell, MessageSquare, Globe, MapPin, BadgeCheck } from "lucide-react";
import { useLanguage } from "@/lib/i18n/context";
import { PublicFooter } from "@/components/home/public-footer";

const favoriteJobs = Array.from({ length: 8 }, (_, i) => ({
  id: i + 1,
  title: "Computer Science Teacher",
  badge: "with at least 4 years of experience",
  description: "This is a dummy paragraph text that aims to fill a space in the website design and demonstrate how the actual text will look. It can be used...",
  location: "Jaffa - Tel Aviv",
  salary: "30,000 - 50,000",
  company: "Company Name",
  date: "08/12/2025",
}));

export default function FavoritesPage() {
  const router = useRouter();
  const { locale, toggleLocale } = useLanguage();
  const [notifOpen, setNotifOpen] = useState(false);
  const [jobs, setJobs] = useState(favoriteJobs);

  useEffect(() => {
    const el = document.querySelector(".lang-switcher-global") as HTMLElement;
    if (el) el.style.display = "none";
    return () => { if (el) el.style.display = ""; };
  }, []);

  return (
    <div className="flex min-h-screen flex-col bg-[#F7F9FC]" style={{ fontFamily: "'Abel', sans-serif" }}>
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white" style={{ borderBottom: "1px solid #F3F3F6" }}>
        <div className="mx-auto flex max-w-[1375px] items-center justify-between" style={{ padding: "12px 40px" }}>
          <div className="flex items-center gap-10">
            <div className="flex items-center gap-1.5 text-2xl">
              <span className="text-foreground">TEACH</span>
              <span className="text-[#2C7AEA]">UP</span>
            </div>
            <nav className="flex items-center gap-8 text-base">
              <a onClick={() => router.push("/jobs")} className="cursor-pointer text-muted-foreground hover:text-foreground">Job search</a>
              <a onClick={() => router.push("/jobs?tab=my")} className="cursor-pointer text-muted-foreground hover:text-foreground">My jobs</a>
              <a onClick={() => router.push("/contact")} className="cursor-pointer text-muted-foreground hover:text-foreground">Contact us</a>
            </nav>
          </div>
          <div className="flex items-center gap-5">
            <button onClick={toggleLocale} className="flex cursor-pointer items-center gap-1.5 border-none bg-transparent text-sm text-muted-foreground hover:text-foreground">
              <Globe size={16} /><span>{locale === "en" ? "עב" : "EN"}</span>
            </button>
            <div className="flex items-center gap-4">
              <button onClick={() => router.push("/favorites")} className="flex cursor-pointer items-center justify-center border-none bg-transparent text-foreground"><Heart size={18} /></button>
              <div className="relative">
                <button onClick={() => setNotifOpen(!notifOpen)} className="flex cursor-pointer items-center justify-center border-none bg-transparent text-muted-foreground hover:text-foreground"><Bell size={18} /></button>
                {notifOpen && (
                  <>
                    <div className="fixed inset-0 z-50" onClick={() => setNotifOpen(false)} />
                    <div className="absolute right-0 top-10 z-50 flex w-[420px] flex-col rounded-2xl bg-white shadow-xl" style={{ padding: "20px 0" }}>
                      <h3 className="text-center text-lg text-foreground" style={{ marginBottom: 16 }}>Notifications</h3>
                      <div className="flex items-start gap-3 border-b border-border-light" style={{ padding: "14px 20px" }}>
                        <div className="flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-[#0E1117]" style={{ padding: 6 }}>
                          <img src="/images/chat-company-logo.png" alt="" className="h-full w-full object-contain" />
                        </div>
                        <div className="flex flex-1 flex-col gap-1"><p className="text-sm leading-[1.3] text-foreground">We wanted to inform you that Tel Aviv University has updated your application status.</p><span className="text-xs text-muted-foreground">4 hours ago</span></div>
                        <button className="shrink-0 cursor-pointer border-none bg-transparent text-xs text-primary underline">View status</button>
                      </div>
                    </div>
                  </>
                )}
              </div>
              <button onClick={() => router.push("/messages")} className="flex cursor-pointer items-center justify-center border-none bg-transparent text-muted-foreground"><MessageSquare size={18} /></button>
            </div>
            <div className="relative flex items-center gap-1">
              <button onClick={() => router.push("/profile")} className="flex cursor-pointer items-center border-none bg-transparent">
                <div className="h-9 w-9 overflow-hidden rounded-full border border-border-light"><img src="/images/job-avatar.png" alt="" className="h-full w-full object-cover" /></div>
              </button>
              <ChevronDown size={14} className="text-muted-foreground" />
            </div>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="mx-auto w-full max-w-[1375px]" style={{ padding: "30px 40px 60px" }}>
        <h1 className="text-[28px] leading-[1.1] text-foreground" style={{ marginBottom: 28 }}>My favorites</h1>

        {/* 4-column grid */}
        <div className="grid grid-cols-4 gap-5">
          {jobs.map((job) => (
            <div
              key={job.id}
              onClick={() => router.push(`/jobs/${job.id}`)}
              className="flex cursor-pointer flex-col overflow-hidden rounded-[16px] bg-white transition-shadow hover:shadow-md"
              style={{ boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}
            >
              <div className="flex flex-1 flex-col" style={{ padding: "14px 14px" }}>
                {/* Title + badge */}
                <div className="flex items-start gap-2" style={{ marginBottom: 6 }}>
                  <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full" style={{ backgroundImage: "linear-gradient(140deg, #4C96FF 12%, #1667DB 94%)" }}>
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="white"><path d="M20 6h-4V4c0-1.1-.9-2-2-2h-4c-1.1 0-2 .9-2 2v2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm-8-2h4v2h-4V4z" /></svg>
                  </div>
                  <div className="flex flex-col">
                    <div className="flex items-center gap-1">
                      <span className="text-sm leading-[1.2] text-foreground">{job.title}</span>
                      <BadgeCheck size={14} className="shrink-0 text-primary" />
                    </div>
                    <span className="text-[10px] leading-[1.2] text-primary">{job.badge}</span>
                  </div>
                </div>

                {/* Description */}
                <p className="text-[10px] leading-[1.3] text-muted-foreground" style={{ marginBottom: 8 }}>{job.description}</p>

                {/* Location */}
                <div className="flex items-center gap-1 text-[10px] text-foreground" style={{ marginBottom: 8 }}>
                  <span>{job.location}</span>
                  <MapPin size={10} className="text-primary" />
                </div>

                {/* Salary */}
                <div className="flex items-center justify-between" style={{ marginBottom: 8 }}>
                  <span className="text-[10px] text-muted-foreground">Salary ₪</span>
                  <span className="text-sm text-foreground">{job.salary}</span>
                </div>

                {/* Company footer */}
                <div className="flex items-center justify-between rounded-lg bg-[#F3F3F6]" style={{ padding: "8px 10px" }}>
                  <div className="flex items-center gap-2">
                    <Heart size={14} fill="#FF676A" className="text-[#FF676A]" />
                    <span className="text-[10px] text-foreground">{job.company} · {job.date}</span>
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
