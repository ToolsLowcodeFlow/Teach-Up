"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ChevronDown, Search } from "lucide-react";
import { useLanguage } from "@/lib/i18n/context";
import { SeekerNavbar } from "@/components/seeker/seeker-navbar";

export default function MessagesPage() {
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

      <div className="flex w-full flex-1 gap-5" style={{ padding: "20px 40px" }} dir={direction}>
        {/* Left — Sidebar */}
        <div className="flex shrink-0 flex-col rounded-2xl bg-white" style={{ width: 280, padding: "20px", boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}>
          <div className="flex items-center justify-between rounded-[10px] border border-border-light bg-[#F7F9FC]" style={{ height: 44, padding: "0 14px", marginBottom: 14 }}>
            <span className="text-base text-foreground">{t.messages.allMessages}</span>
            <ChevronDown size={14} className="text-muted-foreground" />
          </div>
          <div className="flex items-center rounded-[10px] border border-border-light bg-[#F7F9FC]" style={{ height: 44, padding: "0 14px", marginBottom: 10 }}>
            <input type="text" placeholder={t.messages.searchMessages} className="flex-1 border-none bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground/30" />
            <Search size={16} className="shrink-0 text-muted-foreground/30" />
          </div>
          <button
            onClick={() => router.push("/messages/1")}
            className="cursor-pointer rounded-[10px] border border-border-light bg-[#F7F9FC] text-sm text-foreground hover:bg-border-light"
            style={{ padding: "10px 14px", textAlign: direction === "rtl" ? "right" : "left" }}
          >
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 shrink-0 overflow-hidden rounded-full">
                <img src="/images/job-avatar.png" alt="" className="h-full w-full object-cover" />
              </div>
              <div className="flex flex-col">
                <span className="text-sm text-foreground">{isHe ? "יותם ישראלי" : "Yotam Israeli"}</span>
                <span className="text-[10px] text-muted-foreground">Lorem Ipsum Dolor...</span>
              </div>
            </div>
          </button>
        </div>

        {/* Right — Message content area */}
        <div className="flex flex-1 flex-col items-center justify-center rounded-2xl bg-white" style={{ boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}>
          <svg width="180" height="170" viewBox="0 0 180 170" fill="none" style={{ marginBottom: 24 }}>
            <circle cx="90" cy="85" r="70" fill="#E8EEF5" opacity="0.5" />
            <rect x="55" y="50" width="70" height="50" rx="12" fill="#D4DCE8" />
            <rect x="60" y="55" width="40" height="5" rx="2.5" fill="#BFC8D6" />
            <rect x="60" y="64" width="50" height="5" rx="2.5" fill="#BFC8D6" />
            <rect x="60" y="73" width="30" height="5" rx="2.5" fill="#BFC8D6" />
            <circle cx="65" cy="105" r="16" fill="#4C96FF" />
            <circle cx="58" cy="105" r="2.5" fill="white" />
            <circle cx="65" cy="105" r="2.5" fill="white" />
            <circle cx="72" cy="105" r="2.5" fill="white" />
            <circle cx="140" cy="60" r="4" fill="#D4DCE8" />
            <circle cx="45" cy="45" r="3" fill="#D4DCE8" />
            <circle cx="130" cy="110" r="5" fill="#D4DCE8" />
            <ellipse cx="90" cy="140" rx="55" ry="8" fill="#E8EEF5" />
          </svg>
          <h2 className="text-center text-[20px] leading-[1.2] text-foreground" style={{ marginBottom: 10 }}>
            {t.messages.noMessages}
          </h2>
          <p className="max-w-md text-center text-sm leading-[1.5] text-muted-foreground">
            {t.messages.noMessagesSubtitle}
          </p>
        </div>
      </div>
    </div>
  );
}
