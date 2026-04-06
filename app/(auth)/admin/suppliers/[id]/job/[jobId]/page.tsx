"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronLeft, MoreHorizontal, Link2 } from "lucide-react";

export default function AdminJobDetailPage() {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto"
      style={{ fontFamily: "'Abel', sans-serif" }}
    >
      <iframe
        src="/admin/suppliers"
        className="fixed inset-0 h-screen w-screen border-none"
        style={{ filter: "blur(6px)", pointerEvents: "none", opacity: 0.7 }}
        tabIndex={-1}
      />
      <div className="fixed inset-0 h-screen w-screen" style={{ background: "rgba(0,0,0,0.35)" }} onClick={() => router.back()} />

      <div
        className="relative z-10 my-8 w-full max-w-[620px] rounded-2xl bg-white"
        style={{ padding: "24px 32px 40px", boxShadow: "0 20px 60px rgba(0,0,0,0.15)" }}
      >
        {/* Top row */}
        <div className="flex items-start justify-between" style={{ marginBottom: 16 }}>
          <div className="flex items-center gap-2">
            <button onClick={() => router.back()} className="flex cursor-pointer items-center justify-center border-none bg-transparent text-muted-foreground hover:text-foreground">
              <ChevronLeft size={20} />
            </button>
            <h1 className="text-[22px] leading-[1.1] text-foreground">Job details</h1>
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
                    <button onClick={() => setMenuOpen(false)} className="w-full whitespace-nowrap py-1.5 text-start text-sm text-foreground hover:text-primary">Become a hot job</button>
                    <button onClick={() => setMenuOpen(false)} className="w-full whitespace-nowrap py-1.5 text-start text-sm text-foreground hover:text-primary">Job hopping</button>
                    <button onClick={() => setMenuOpen(false)} className="w-full whitespace-nowrap py-1.5 text-start text-sm text-foreground hover:text-primary">Ad blocking</button>
                    <button onClick={() => setMenuOpen(false)} className="w-full whitespace-nowrap py-1.5 text-start text-sm text-red-400 hover:text-red-600">Deleting an ad</button>
                  </div>
                </>
              )}
          </div>
        </div>

        {/* Badge */}
        <div className="flex items-center gap-2" style={{ marginBottom: 10 }}>
          <div className="flex h-5 w-5 items-center justify-center rounded-full bg-primary">
            <svg width="10" height="10" viewBox="0 0 24 24" fill="white"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" /></svg>
          </div>
          <span className="text-sm text-foreground">Computer Science</span>
        </div>

        {/* Title */}
        <h2 className="text-[20px] leading-[1.2] text-foreground" style={{ marginBottom: 6 }}>
          Computer Science Teacher for a<br />Recognized College
        </h2>

        {/* Date + Job number */}
        <div className="flex items-center gap-4 text-xs" style={{ marginBottom: 16 }}>
          <span className="text-primary">08/12/2025</span>
          <span className="text-muted-foreground">Job number · 84844985</span>
        </div>

        {/* Description */}
        <p className="text-xs leading-[1.5] text-muted-foreground" style={{ marginBottom: 20 }}>
          Lorem Ipsum Dolor Sit Emmet, Consecteur Adipiscing Elite Goler Monferrer Sobert Lorem Shabdach Yehol, Lorem Ipsum Dolor Sit Emmet, Consecteur Adipiscing Elite Goler Monferrer Sobert Lorem Shabdach Yehol, Lorem Ipsum Dolor Sit Emmet, Consecteur Adipiscing Elite Goler Monferrer Sobert Lorem Shabdach Yehol,
        </p>

        {/* Info grid */}
        <div className="rounded-[10px] border border-border-light" style={{ padding: "14px 18px", marginBottom: 20, background: "linear-gradient(180deg, #F7FAFF 0%, #EEF4FD 100%)" }}>
          <div className="grid grid-cols-6 gap-x-3 gap-y-4 text-center">
            {[
              ["Hours of operation", "Lunch / Dinner"],
              ["training", "Morning training"],
              ["Years of experience", "09"],
              ["Scope of work", "Full-time"],
              ["area", "Tel Aviv, Israel"],
              ["Salary range ₪", "10,000 - 20,000"],
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
          {["Spanish", "English", "Hebrew"].map((lang) => (
            <span key={lang} className="rounded-full border border-border-light text-xs text-foreground" style={{ padding: "5px 16px" }}>
              {lang}
            </span>
          ))}
        </div>

        {/* Company Description */}
        <div className="flex flex-col" style={{ gap: 8, marginBottom: 20 }}>
          <h3 className="text-base text-foreground">Company Description</h3>
          <p className="text-xs leading-[1.5] text-muted-foreground">
            Lorem Ipsum Dolor Sit Emmet, Consecteur Adipiscing Elite Goler Monferrer Sobert Lorem Shabdach Yehol, Lorem Ipsum Dolor Sit Emmet, Consecteur Adipiscing Elite Goler Monferrer Sobert Lorem Shabdach Yehol, Lorem Ipsum Dolor Sit Emmet, Consecteur Adipiscing Elite Goler Monferrer Sobert Lorem Shabdach Yehol,
          </p>
          <div className="flex items-center gap-2" style={{ marginTop: 4 }}>
            <div className="h-6 w-6 overflow-hidden rounded-full">
              <img src="/images/job-avatar.png" alt="" className="h-full w-full object-cover" />
            </div>
            <span className="text-xs text-foreground">Company Name: Lor Ipsum</span>
          </div>
        </div>

        {/* Attachments */}
        <div className="flex flex-col" style={{ gap: 8 }}>
          <h3 className="text-base text-foreground">Attachments</h3>
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex items-center justify-between rounded-[10px] border border-border-light" style={{ padding: "10px 14px", background: "linear-gradient(180deg, #FFFDF7 0%, #FFF8E8 100%)" }}>
              <div className="flex items-center gap-2">
                <Link2 size={14} className="shrink-0 text-muted-foreground" />
                <span className="text-xs text-primary">Computer Science Teacher for a Recognized College</span>
                <span className="text-[10px] text-muted-foreground">142 KB</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
