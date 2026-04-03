"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ChevronDown, ChevronLeft, ChevronRight, Search, Heart, MapPin, Bell, MessageSquare, Globe } from "lucide-react";
import { useLanguage } from "@/lib/i18n/context";
import { PublicFooter } from "@/components/home/public-footer";

const allJobCards = Array.from({ length: 12 }, (_, i) => ({
  id: i + 1,
  title: "Computer Science Teacher",
  badge: "with at least 4 years of experience",
  description: "This is a dummy paragraph text that aims to fill a space in the website design and demonstrate how the actual text will look. It can be...",
  locations: ["Jaffa", "Tel Aviv"],
  salary: "30,000 - 50,000",
  company: i === 8 ? "Anonymous" : "Company Name",
  date: "08/12/2025",
  isNew: i < 3,
  status: "",
}));

const myJobCards = Array.from({ length: 9 }, (_, i) => ({
  id: i + 100,
  title: "Computer Science Teacher",
  badge: "with at least 4 years of experience",
  description: "This is a dummy paragraph text that aims to fill a space in the website design and demonstrate how the actual text will look. It can be...",
  locations: ["Jaffa", "Tel Aviv"],
  salary: "30,000 - 50,000",
  company: i >= 6 ? "Anonymous" : "Company Name",
  date: "08/12/2025",
  isNew: false,
  status: i < 3 ? "nomination sent" : i < 6 ? "Invitation" : "sent",
}));

type JobCardType = (typeof allJobCards)[0];

function JobCard({ job }: { job: JobCardType }) {
  const [liked, setLiked] = useState(false);
  const router = useRouter();
  return (
    <div
      onClick={() => router.push(`/jobs/${job.id}${job.status ? `?applied=true&outcome=${job.status === "nomination sent" ? "accepted" : "rejected"}` : ""}`)}
      className="flex cursor-pointer flex-col overflow-hidden rounded-[16px] bg-white transition-shadow hover:shadow-md"
      style={{ boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}
    >
      {/* Content */}
      <div className="flex flex-1 flex-col" style={{ padding: "14px 14px" }}>
        <div className="flex items-start justify-between" style={{ marginBottom: 6 }}>
          <div className="flex gap-2">
            <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full" style={{ backgroundImage: "linear-gradient(140deg, #4C96FF 12%, #1667DB 94%)" }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="white"><path d="M20 6h-4V4c0-1.1-.9-2-2-2h-4c-1.1 0-2 .9-2 2v2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm-8-2h4v2h-4V4z"/></svg>
            </div>
            <div className="flex flex-col">
              <h3 className="text-base leading-[1.2] text-foreground">{job.title}</h3>
              <p className="text-xs leading-[1.2] text-primary" style={{ marginTop: 2 }}>{job.badge}</p>
            </div>
          </div>
          <button
            onClick={() => setLiked(!liked)}
            className="flex shrink-0 cursor-pointer items-center justify-center rounded-full border-none bg-transparent"
            style={{ width: 24, height: 24 }}
          >
            <Heart size={16} fill={liked ? "#FF676A" : "none"} className={liked ? "text-[#FF676A]" : "text-[#C0C0C0]"} />
          </button>
        </div>
        {job.status && (
          <span
            className="self-start rounded-full text-[10px] text-white"
            style={{
              padding: "4px 12px",
              marginBottom: 8,
              background: job.status === "Invitation" ? "#20AB7F" : job.status === "nomination sent" ? "#4C96FF" : "#FF8C42",
            }}
          >
            {job.status}
          </span>
        )}
        <p className="text-xs leading-[1.3] text-muted-foreground" style={{ marginBottom: 10 }}>{job.description}</p>

        {/* Location tags */}
        <div className="flex flex-wrap gap-1.5" style={{ marginBottom: 10 }}>
          {job.locations.map((loc) => (
            <span key={loc} className="flex items-center gap-1 rounded-full border border-border-light text-xs text-foreground" style={{ padding: "3px 8px" }}>
              <MapPin size={10} className="text-muted-foreground" />
              {loc}
            </span>
          ))}
        </div>

        {/* Salary */}
        <div className="flex items-center justify-between" style={{ marginBottom: 10 }}>
          <span className="text-xs text-muted-foreground">Salary ₪</span>
          <span className="text-sm text-foreground">{job.salary}</span>
        </div>

        {/* Company + Date - grey box */}
        <div
          className="flex items-center justify-between rounded-[10px]"
          style={{ background: "#F3F3F6", padding: "8px 12px", marginTop: 4 }}
        >
          <div className="flex items-center gap-2">
            <span className="text-xs text-foreground">{job.company}</span>
            <span className="text-xs text-muted-foreground">· {job.date}</span>
          </div>
          <div className="h-6 w-6 overflow-hidden rounded-full">
            <img src="/images/job-avatar.png" alt="" className="h-full w-full object-cover" />
          </div>
        </div>
      </div>
    </div>
  );
}

function FilterDropdown({
  label, options, value, onChange,
}: {
  label: string; options: string[]; value: string; onChange: (v: string) => void;
}) {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative">
      <div
        onClick={() => setOpen(!open)}
        className="flex cursor-pointer items-center justify-between rounded-[10px] border border-border-light bg-[#F7F9FC]"
        style={{ height: 36, padding: "0 10px" }}
      >
        <span className="truncate text-xs" style={{ color: value ? "#0E1117" : "#0E1117" }}>
          {value || label}
        </span>
        <ChevronDown size={12} className="shrink-0 text-muted-foreground" />
      </div>
      {open && (
        <div
          className="absolute z-30 mt-1 max-h-44 w-full overflow-y-auto rounded-[10px] border border-border-light bg-white"
          style={{ boxShadow: "0 4px 16px rgba(0,0,0,0.08)" }}
        >
          <div
            onClick={() => { onChange(""); setOpen(false); }}
            className="cursor-pointer text-xs text-muted-foreground hover:bg-border-light"
            style={{ padding: "8px 10px" }}
          >
            All
          </div>
          {options.map((opt) => (
            <div
              key={opt}
              onClick={() => { onChange(opt); setOpen(false); }}
              className="cursor-pointer text-xs text-foreground hover:bg-border-light"
              style={{ padding: "8px 10px", background: value === opt ? "#EEF3FD" : undefined }}
            >
              {opt}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function JobsPage() {
  const router = useRouter();
  const { locale, toggleLocale } = useLanguage();
  const searchParams = useSearchParams();
  const tabParam = searchParams.get("tab");
  const [activeTab, setActiveTab] = useState<"all" | "my" | "my-empty">(tabParam === "my" ? "my" : tabParam === "my-empty" ? "my-empty" : "all");
  const [currentPage, setCurrentPage] = useState(1);
  const [notifOpen, setNotifOpen] = useState(false);
  const [avatarMenuOpen, setAvatarMenuOpen] = useState(false);

  useEffect(() => {
    if (tabParam === "my") setActiveTab("my");
    else if (tabParam === "my-empty") setActiveTab("my-empty");
    else if (tabParam === "all") setActiveTab("all");
  }, [tabParam]);
  const [filters, setFilters] = useState({
    role: "", field: "", experience: "", scope: "", language: "", training: "", salary: 50000,
  });

  // Hide global language switcher on this page
  useEffect(() => {
    const el = document.querySelector(".lang-switcher-global") as HTMLElement;
    if (el) el.style.display = "none";
    return () => { if (el) el.style.display = ""; };
  }, []);

  return (
    <div className="flex min-h-screen flex-col bg-[#F7F9FC]" style={{ fontFamily: "'Abel', sans-serif" }}>
      {/* Top nav */}
      <header className="sticky top-0 z-40 bg-white" style={{ borderBottom: "1px solid #F3F3F6" }}>
        <div className="mx-auto flex max-w-[1375px] items-center justify-between" style={{ padding: "12px 40px" }}>
          {/* Left: Logo + nav links */}
          <div className="flex items-center gap-10">
            <div className="flex items-center gap-1.5 text-2xl">
              <span className="text-foreground">TEACH</span>
              <span className="text-[#2C7AEA]">UP</span>
            </div>
            <nav className="flex items-center gap-8 text-base">
              <a onClick={() => setActiveTab("all")} className="relative cursor-pointer pb-5" style={{ color: activeTab === "all" ? "#0E1117" : "#647787" }}>
                Job search
                {activeTab === "all" && <span className="absolute left-1/2 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-primary" style={{ bottom: -8 }} />}
              </a>
              <a onClick={() => setActiveTab("my")} className="relative cursor-pointer pb-5" style={{ color: (activeTab === "my" || activeTab === "my-empty") ? "#0E1117" : "#647787" }}>
                My jobs
                {(activeTab === "my" || activeTab === "my-empty") && <span className="absolute left-1/2 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-primary" style={{ bottom: -8 }} />}
              </a>
              <a onClick={() => router.push("/contact")} className="cursor-pointer pb-5 text-muted-foreground hover:text-foreground">Contact us</a>
            </nav>
          </div>

          {/* Right: language + icons + avatar */}
          <div className="flex items-center gap-5">
            <button onClick={toggleLocale} className="flex cursor-pointer items-center gap-1.5 border-none bg-transparent text-sm text-muted-foreground hover:text-foreground">
              <Globe size={16} />
              <span>{locale === "en" ? "עב" : "EN"}</span>
            </button>
            <div className="flex items-center gap-4">
              <button onClick={() => router.push("/favorites")} className="flex cursor-pointer items-center justify-center border-none bg-transparent text-muted-foreground hover:text-foreground">
                <Heart size={18} />
              </button>
              <div className="relative">
                <button onClick={() => setNotifOpen(!notifOpen)} className="flex cursor-pointer items-center justify-center border-none bg-transparent text-muted-foreground hover:text-foreground">
                  <Bell size={18} />
                </button>
                {notifOpen && (
                  <>
                    <div className="fixed inset-0 z-50" onClick={() => setNotifOpen(false)} />
                    <div className="absolute right-0 top-10 z-50 flex w-[420px] flex-col rounded-2xl bg-white shadow-xl" style={{ padding: "20px 0" }}>
                      <h3 className="text-center text-lg text-foreground" style={{ marginBottom: 16 }}>Notifications</h3>
                      {[
                        { msg: "We wanted to inform you that Tel Aviv University has updated your application status.", time: "4 hours ago", logo: "/images/chat-company-logo.png", anon: false },
                        { msg: "We wanted to let you know that there is a new update from an anonymous source regarding your application status.", time: "4 hours ago", logo: "", anon: true },
                        { msg: "We wanted to inform you that Tel Aviv University has updated your application status.", time: "4 hours ago", logo: "/images/chat-company-logo.png", anon: false },
                        { msg: "We wanted to inform you that Tel Aviv University has updated your application status.", time: "4 hours ago", logo: "/images/chat-company-logo.png", anon: false },
                      ].map((notif, i) => (
                        <div key={i} className="flex items-start gap-3 border-b border-border-light" style={{ padding: "14px 20px" }}>
                          <div className="flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-xl" style={{ background: notif.anon ? "#E8EEF5" : "#0E1117", padding: notif.anon ? 0 : 6 }}>
                            {notif.anon ? (
                              <svg width="20" height="20" viewBox="0 0 24 24" fill="#9CA3AF"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" /></svg>
                            ) : (
                              <img src={notif.logo} alt="" className="h-full w-full object-contain" />
                            )}
                          </div>
                          <div className="flex flex-1 flex-col gap-1">
                            <p className="text-sm leading-[1.3] text-foreground">{notif.msg}</p>
                            <span className="text-xs text-muted-foreground">{notif.time}</span>
                          </div>
                          <button className="shrink-0 cursor-pointer border-none bg-transparent text-xs text-primary underline">View status</button>
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </div>
              <button onClick={() => router.push("/messages")} className="flex cursor-pointer items-center justify-center border-none bg-transparent text-muted-foreground hover:text-foreground">
                <MessageSquare size={18} />
              </button>
            </div>
            <div className="relative flex items-center gap-1">
              <button onClick={() => router.push("/profile")} className="flex cursor-pointer items-center border-none bg-transparent">
                <div className="h-9 w-9 overflow-hidden rounded-full border border-border-light transition-opacity hover:opacity-80">
                  <img src="/images/job-avatar.png" alt="Profile" className="h-full w-full object-cover" />
                </div>
              </button>
              <button onClick={() => setAvatarMenuOpen(!avatarMenuOpen)} className="flex cursor-pointer items-center justify-center border-none bg-transparent text-muted-foreground hover:text-foreground">
                <ChevronDown size={14} />
              </button>
              {avatarMenuOpen && (
                <>
                  <div className="fixed inset-0 z-50" onClick={() => setAvatarMenuOpen(false)} />
                  <div className="absolute right-0 top-12 z-50 flex min-w-36 flex-col gap-1 rounded-xl border border-border-light bg-white shadow-lg" style={{ padding: "12px 16px" }}>
                    <button onClick={() => { setAvatarMenuOpen(false); router.push("/profile"); }} className="flex w-full whitespace-nowrap py-2 text-start text-sm text-foreground transition-colors hover:text-primary">Personal area</button>
                    <button className="flex w-full whitespace-nowrap py-2 text-start text-sm text-red-400 transition-colors hover:text-red-600" onClick={() => setAvatarMenuOpen(false)}>Disengagement</button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="mx-auto flex w-full max-w-[1375px] flex-1 flex-col" style={{ padding: "24px 40px 0" }}>
        {/* Sort + Tabs row */}
        <div className="flex items-center justify-between" style={{ marginBottom: 20 }}>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setActiveTab("all")}
              className="cursor-pointer border-none bg-transparent"
              style={{
                color: activeTab === "all" ? "#0E1117" : "#647787",
                fontSize: activeTab === "all" ? 24 : 16,
                textDecoration: activeTab === "all" ? "none" : "underline",
                textUnderlineOffset: 4,
              }}
            >
              All jobs
            </button>
            <button
              onClick={() => setActiveTab("my")}
              className="cursor-pointer border-none bg-transparent"
              style={{
                color: (activeTab === "my" || activeTab === "my-empty") ? "#0E1117" : "#647787",
                fontSize: (activeTab === "my" || activeTab === "my-empty") ? 24 : 16,
                textDecoration: (activeTab === "my" || activeTab === "my-empty") ? "none" : "underline",
                textUnderlineOffset: 4,
              }}
            >
              My jobs
            </button>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Sort by</span>
            <ChevronDown size={14} className="text-muted-foreground" />
          </div>
        </div>

        {/* Main layout: cards + filters */}
        <div className="flex gap-8">
          {/* Job cards grid */}
          <div className="flex-1">
            {activeTab === "my-empty" ? (
              <div className="flex flex-col items-center justify-center" style={{ minHeight: 500, gap: 20 }}>
                {/* Empty state illustration */}
                <svg width="160" height="140" viewBox="0 0 160 140" fill="none">
                  <ellipse cx="80" cy="120" rx="60" ry="10" fill="#EEF2F7" />
                  <rect x="45" y="30" width="70" height="85" rx="8" fill="#E4EBF5" />
                  <rect x="55" y="42" width="50" height="6" rx="3" fill="#C8D4E4" />
                  <rect x="55" y="54" width="40" height="6" rx="3" fill="#C8D4E4" />
                  <rect x="55" y="66" width="45" height="6" rx="3" fill="#C8D4E4" />
                  <rect x="55" y="78" width="35" height="6" rx="3" fill="#C8D4E4" />
                  <circle cx="110" cy="45" r="20" fill="#D6E4FF" />
                  <path d="M103 45L108 50L118 40" stroke="#4C96FF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                  <rect x="105" y="85" width="30" height="35" rx="4" fill="#4C96FF" opacity="0.15" />
                  <path d="M115 95L120 100L130 90" stroke="#4C96FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>

                <h2 className="text-center text-[20px] leading-[1.2] text-foreground">
                  No nominations have been submitted yet.
                </h2>
                <p className="max-w-sm text-center text-sm leading-[1.5] text-muted-foreground">
                  The jobs you have applied for will be displayed here. To start managing your applications, you can go to Job Search and apply for your first job.
                </p>
                <button
                  onClick={() => setActiveTab("all")}
                  className="cursor-pointer rounded-[10px] text-base text-white"
                  style={{
                    padding: "12px 32px",
                    border: "none",
                    backgroundImage: "linear-gradient(168deg, #4C96FF 12%, #1667DB 94%)",
                  }}
                >
                  Beyond job search
                </button>
              </div>
            ) : (<>
              <div className="grid grid-cols-3 gap-5">
                {(activeTab === "all" ? allJobCards : myJobCards).map((job) => (
                  <JobCard key={job.id} job={job} />
                ))}
              </div>
              <div className="flex items-center justify-center gap-2" style={{ padding: "30px 0" }}>
                <button className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border border-border-light bg-white">
                  <ChevronLeft size={14} className="text-muted-foreground" />
                </button>
                {[1, 2, 3].map((p) => (
                  <button
                    key={p}
                    onClick={() => setCurrentPage(p)}
                    className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border-none text-sm"
                    style={{ background: currentPage === p ? "#4C96FF" : "transparent", color: currentPage === p ? "white" : "#0E1117" }}
                  >
                    {p}
                  </button>
                ))}
                <span className="text-sm text-muted-foreground">...</span>
                <button onClick={() => setCurrentPage(8)} className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border-none text-sm text-foreground">
                  8
                </button>
                <button className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border border-border-light bg-white">
                  <ChevronRight size={14} className="text-muted-foreground" />
                </button>
              </div>
            </>)}
          </div>

          {/* Filters sidebar - right side */}
          <div
            className="shrink-0 self-start rounded-[20px] bg-white"
            style={{ width: 240, padding: "20px 16px", boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}
          >
            <div className="flex flex-col" style={{ gap: 16 }}>
              <p className="text-lg text-foreground" style={{ marginBottom: 4 }}>Filters</p>

              {/* Search */}
              <div className="flex items-center rounded-[10px] border border-border-light bg-[#F7F9FC]" style={{ height: 36, padding: "0 10px" }}>
                <Search size={14} className="shrink-0 text-muted-foreground/30" />
                <input type="text" placeholder="Free search..." className="mx-1.5 flex-1 border-none bg-transparent text-xs text-foreground outline-none placeholder:text-muted-foreground/30" />
              </div>

              {/* Role */}
              <FilterDropdown
                label="role"
                options={["Teacher", "Tutor", "Teaching Assistant", "Substitute Teacher", "Counselor", "Instructor"]}
                value={filters.role}
                onChange={(v) => setFilters((p) => ({ ...p, role: v }))}
              />

              {/* Field of knowledge */}
              <FilterDropdown
                label="Field of knowledge"
                options={["Mathematics", "English", "Science", "History", "Art", "Music", "Physical Education", "Computer Science", "Special Education"]}
                value={filters.field}
                onChange={(v) => setFilters((p) => ({ ...p, field: v }))}
              />

              {/* Years of experience - slider */}
              <div className="flex flex-col" style={{ gap: 8 }}>
                <span className="text-xs text-foreground">Search by years of experience</span>
                <input
                  type="range"
                  min="0"
                  max="30"
                  value={filters.experience || 0}
                  onChange={(e) => setFilters((p) => ({ ...p, experience: e.target.value }))}
                  className="w-full"
                  style={{ accentColor: "#4C96FF" }}
                />
                <div className="flex items-center justify-between text-[10px] text-muted-foreground">
                  <span>0 years</span>
                  <span>{filters.experience || 0} years</span>
                </div>
              </div>

              {/* Scope of work */}
              <FilterDropdown
                label="Scope of work"
                options={["Full-time", "Part-time", "Freelance", "Contract", "Temporary"]}
                value={filters.scope}
                onChange={(v) => setFilters((p) => ({ ...p, scope: v }))}
              />

              {/* Languages */}
              <FilterDropdown
                label="Languages"
                options={["Hebrew", "English", "Arabic", "Russian", "French", "Spanish", "Amharic"]}
                value={filters.language}
                onChange={(v) => setFilters((p) => ({ ...p, language: v }))}
              />

              {/* Training */}
              <FilterDropdown
                label="training"
                options={["B.Ed", "M.Ed", "Teaching Certificate", "Montessori", "Waldorf", "Special Education Certificate"]}
                value={filters.training}
                onChange={(v) => setFilters((p) => ({ ...p, training: v }))}
              />

              {/* Salary range */}
              <div className="flex flex-col" style={{ gap: 8 }}>
                <span className="text-xs text-foreground">Salary</span>
                <input
                  type="range"
                  min="0"
                  max="100000"
                  value={filters.salary}
                  onChange={(e) => setFilters((p) => ({ ...p, salary: Number(e.target.value) }))}
                  className="w-full"
                  style={{ accentColor: "#4C96FF" }}
                />
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>₪0</span>
                  <span>₪{filters.salary.toLocaleString()}</span>
                </div>
              </div>

              {/* Search button */}
              <button
                className="w-full cursor-pointer rounded-[10px] text-sm text-white"
                style={{ height: 40, border: "none", backgroundImage: "linear-gradient(173deg, #4C96FF 12%, #1667DB 94%)" }}
              >
                Search
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Blue CTA banner */}
      <div className="mx-auto w-full" style={{ maxWidth: 1375, padding: "40px 40px 0" }}>
        <div className="relative flex flex-col items-center justify-center overflow-hidden rounded-[20px]" style={{ background: "linear-gradient(135deg, #4C96FF 0%, #1667DB 100%)", padding: "65px 40px" }}>
          {/* Background glow */}
          <div
            className="pointer-events-none absolute"
            style={{
              width: 500,
              height: 500,
              top: -150,
              left: -150,
              background: "radial-gradient(circle, rgba(255,255,255,0.18) 0%, transparent 65%)",
              borderRadius: "50%",
            }}
          />
          {/* Grid boxes */}
          <div className="pointer-events-none absolute" style={{ left: -20, top: -20, right: -20, bottom: -20, opacity: 0.08 }}>
            {[0, 1, 2, 3].map((row) => (
              <div key={row} className="flex" style={{ marginBottom: -2 }}>
                {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((col) => (
                  <div key={col} style={{ width: 160, height: 80, border: "2px solid white", marginRight: -2 }} />
                ))}
              </div>
            ))}
          </div>
          <h2 className="relative text-center text-white" style={{ fontSize: "clamp(26px, 2.8vw, 38px)", lineHeight: 1.3, marginBottom: 28 }}>
            Lorem Ipsum Dolor Sit<br />Emet, Consectetur Dollar
          </h2>
          <button className="relative cursor-pointer rounded-full border-none bg-white text-base text-foreground transition-colors hover:bg-white/90" style={{ padding: "12px 36px", fontFamily: "'Abel', sans-serif" }}>
            Lorem Ipsum
          </button>
        </div>
      </div>

      <PublicFooter />
    </div>
  );
}
