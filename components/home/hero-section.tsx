"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search, ChevronDown } from "lucide-react";
import { useLanguage } from "@/lib/i18n/context";

function HeroDropdown({ label, options, value, onChange }: { label: string; options: string[]; value: string; onChange: (v: string) => void }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative flex flex-1">
      <button onClick={() => setOpen(!open)} className="flex w-full cursor-pointer items-center justify-between border-none bg-transparent px-3 py-2 text-sm">
        <span style={{ color: value ? "#0E1117" : "#0E1117" }}>{value || label}</span>
        <ChevronDown className="h-3 w-3 text-muted-foreground" />
      </button>
      {open && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setOpen(false)} />
          <div className="absolute left-0 top-full z-20 mt-2 w-full overflow-hidden rounded-lg border border-border-light bg-white shadow-lg" style={{ padding: "6px 6px" }}>
            {options.map((opt) => (
              <div key={opt} onClick={() => { onChange(opt); setOpen(false); }} className="cursor-pointer rounded-md px-3 py-2 text-sm text-foreground hover:bg-[#F7F9FC]" style={{ background: value === opt ? "#EEF4FD" : undefined }}>
                {opt}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export function HeroSection() {
  const { t, locale } = useLanguage();
  const router = useRouter();
  const isHe = locale === "he";
  const [area, setArea] = useState("");
  const [experience, setExperience] = useState("");
  const [role, setRole] = useState("");

  const areaOptions = isHe ? ["תל אביב", "ירושלים", "חיפה", "באר שבע", "נתניה", "אילת", "הרצליה"] : ["Tel Aviv", "Jerusalem", "Haifa", "Be'er Sheva", "Netanya", "Eilat", "Herzliya"];
  const experienceOptions = isHe ? ["0-2 שנים", "3-5 שנים", "6-10 שנים", "10+ שנים"] : ["0-2 years", "3-5 years", "6-10 years", "10+ years"];
  const roleOptions = isHe ? ["מורה", "מורה פרטי", "עוזר הוראה", "יועץ", "מדריך"] : ["Teacher", "Tutor", "Teaching Assistant", "Counselor", "Instructor"];

  const handleSearch = () => {
    router.push("/jobs");
  };

  return (
    <section className="relative min-h-screen overflow-hidden bg-linear-to-b from-[#D6E4FF] via-primary-light to-[#F7F9FC]">
      {/* Background grid */}
      <div className="pointer-events-none absolute inset-0" style={{ opacity: 0.35 }}>
        <div className="flex h-full flex-wrap">
          {Array.from({ length: 48 }, (_, i) => (
            <div key={i} style={{ width: 200, height: 200, border: "1px solid white", background: i === 3 || i === 14 || i === 25 || i === 40 ? "rgba(255,255,255,0.5)" : "transparent" }} />
          ))}
        </div>
      </div>

      {/* Floating icons */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-16 top-32 flex h-16 w-16 items-center justify-center rounded-full bg-white shadow-lg">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M20 7H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z" stroke="white" strokeWidth="2"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" stroke="white" strokeWidth="2"/></svg>
          </div>
        </div>
        <div className="absolute right-16 top-24 flex h-16 w-16 items-center justify-center rounded-full bg-white shadow-lg">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><circle cx="11" cy="11" r="6" stroke="white" strokeWidth="2"/><path d="m21 21-4.35-4.35" stroke="white" strokeWidth="2" strokeLinecap="round"/></svg>
          </div>
        </div>
        <div className="absolute bottom-48 left-20 flex h-14 w-14 items-center justify-center rounded-full bg-white shadow-lg">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/70">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="8" r="4" stroke="white" strokeWidth="2"/><path d="M20 21a8 8 0 1 0-16 0" stroke="white" strokeWidth="2"/></svg>
          </div>
        </div>
        <div className="absolute bottom-24 left-8 flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-lg">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/50">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" stroke="white" strokeWidth="2"/></svg>
          </div>
        </div>
        <div className="absolute bottom-56 right-0 flex h-16 w-16 items-center justify-center rounded-full bg-white shadow-lg">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/80">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M20 7H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z" stroke="white" strokeWidth="2"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" stroke="white" strokeWidth="2"/></svg>
          </div>
        </div>
        <div className="absolute right-1/3 top-40 h-4 w-4 rounded-full bg-primary/30" />
      </div>

      {/* Content */}
      <div style={{ paddingTop: 120, paddingBottom: 80 }} className="relative flex min-h-screen flex-col items-center justify-center px-6 text-center">
        <h1 style={{ marginBottom: 24 }} className="max-w-3xl text-center text-5xl leading-tight text-foreground lg:text-6xl">
          {t.home.heroTitle1}
          <br />
          <span className="text-foreground/30">{t.home.heroTitle2}</span>
        </h1>

        <p style={{ marginBottom: 48 }} className="max-w-xl text-center text-sm leading-relaxed text-muted-foreground">
          {t.home.heroSubtitle}
        </p>

        {/* Search bar */}
        <div className="w-full max-w-2xl">
          <p style={{ marginBottom: 8 }} className="text-center text-xs text-muted-foreground">
            {t.home.startLooking}
          </p>
          <div style={{ padding: "8px" }} className="mx-auto flex items-center gap-2 rounded-2xl bg-white shadow-lg">
            <button
              onClick={handleSearch}
              style={{ padding: "12px 20px" }}
              className="flex shrink-0 cursor-pointer items-center gap-2 rounded-xl border-none bg-primary text-sm text-white transition-colors hover:bg-primary-dark"
            >
              {t.home.findNextPlace}
              <Search className="h-4 w-4" />
            </button>

            <div className="h-8 w-px bg-border-light" />
            <HeroDropdown label={t.home.area} options={areaOptions} value={area} onChange={setArea} />
            <div className="h-8 w-px bg-border-light" />
            <HeroDropdown label={t.home.experience} options={experienceOptions} value={experience} onChange={setExperience} />
            <div className="h-8 w-px bg-border-light" />
            <HeroDropdown label={t.home.role} options={roleOptions} value={role} onChange={setRole} />
          </div>
        </div>
      </div>
    </section>
  );
}
