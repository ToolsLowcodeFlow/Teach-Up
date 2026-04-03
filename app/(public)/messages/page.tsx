"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ChevronDown, Search, Heart, Bell, MessageSquare, Globe } from "lucide-react";
import { useLanguage } from "@/lib/i18n/context";

export default function MessagesPage() {
  const router = useRouter();
  const { locale, toggleLocale } = useLanguage();
  const [notifOpen, setNotifOpen] = useState(false);

  // Hide global language switcher on this page
  useEffect(() => {
    const el = document.querySelector(".lang-switcher-global") as HTMLElement;
    if (el) el.style.display = "none";
    return () => { if (el) el.style.display = ""; };
  }, []);

  return (
    <div className="flex min-h-screen flex-col bg-[#F7F9FC]" style={{ fontFamily: "'Abel', sans-serif" }}>
      {/* Top nav — same as jobs page */}
      <header className="sticky top-0 z-40 bg-white" style={{ borderBottom: "1px solid #F3F3F6" }}>
        <div className="mx-auto flex max-w-[1375px] items-center justify-between" style={{ padding: "12px 40px" }}>
          <div className="flex items-center gap-10">
            <div className="flex items-center gap-1.5 text-2xl">
              <span className="text-foreground">TEACH</span>
              <span className="text-[#2C7AEA]">UP</span>
            </div>
            <nav className="flex items-center gap-8 text-base">
              <a onClick={() => router.push("/jobs")} className="relative cursor-pointer pb-5 text-muted-foreground hover:text-foreground">Job search</a>
              <a onClick={() => router.push("/jobs?tab=my")} className="relative cursor-pointer pb-5 text-muted-foreground hover:text-foreground">My jobs</a>
              <a onClick={() => router.push("/contact")} className="cursor-pointer pb-5 text-muted-foreground hover:text-foreground">Contact us</a>
            </nav>
          </div>

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
              <button className="flex cursor-pointer items-center justify-center border-none bg-transparent text-foreground">
                <MessageSquare size={18} />
              </button>
            </div>
            <button className="flex cursor-pointer items-center gap-1.5 border-none bg-transparent">
              <div className="h-9 w-9 overflow-hidden rounded-full border border-border-light">
                <img src="/images/job-avatar.png" alt="Profile" className="h-full w-full object-cover" />
              </div>
              <ChevronDown size={14} className="text-muted-foreground" />
            </button>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="mx-auto flex w-full max-w-[1375px] flex-1 gap-5" style={{ padding: "20px 40px" }}>
        {/* Left — Sidebar */}
        <div
          className="flex shrink-0 flex-col rounded-2xl bg-white"
          style={{ width: 280, padding: "20px", boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}
        >
          <div className="flex items-center justify-between rounded-[10px] border border-border-light bg-[#F7F9FC]" style={{ height: 44, padding: "0 14px", marginBottom: 14 }}>
            <span className="text-base text-foreground">All messages</span>
            <ChevronDown size={14} className="text-muted-foreground" />
          </div>
          <div className="flex items-center rounded-[10px] border border-border-light bg-[#F7F9FC]" style={{ height: 44, padding: "0 14px" }}>
            <input type="text" placeholder="Search messages..." className="flex-1 border-none bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground/30" />
            <Search size={16} className="shrink-0 text-muted-foreground/30" />
          </div>
          <button
            onClick={() => router.push("/messages/1")}
            className="mt-4 cursor-pointer rounded-[10px] border border-border-light bg-[#F7F9FC] text-sm text-foreground hover:bg-border-light"
            style={{ padding: "10px 14px", textAlign: "left" }}
          >
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 shrink-0 overflow-hidden rounded-full">
                <img src="/images/job-avatar.png" alt="" className="h-full w-full object-cover" />
              </div>
              <div className="flex flex-col">
                <span className="text-sm text-foreground">Yotam Israeli</span>
                <span className="text-[10px] text-muted-foreground">Lorem Ipsum Dolor...</span>
              </div>
            </div>
          </button>
        </div>

        {/* Right — Message content area */}
        <div
          className="flex flex-1 flex-col items-center justify-center rounded-2xl bg-white"
          style={{ boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}
        >
          {/* Empty state illustration */}
          <svg width="180" height="170" viewBox="0 0 180 170" fill="none" style={{ marginBottom: 24 }}>
            {/* Background circle */}
            <circle cx="90" cy="85" r="70" fill="#E8EEF5" opacity="0.5" />
            {/* Chat bubbles */}
            <rect x="55" y="50" width="70" height="50" rx="12" fill="#D4DCE8" />
            <rect x="60" y="55" width="40" height="5" rx="2.5" fill="#BFC8D6" />
            <rect x="60" y="64" width="50" height="5" rx="2.5" fill="#BFC8D6" />
            <rect x="60" y="73" width="30" height="5" rx="2.5" fill="#BFC8D6" />
            {/* Small chat bubble with dots */}
            <circle cx="65" cy="105" r="16" fill="#4C96FF" />
            <circle cx="58" cy="105" r="2.5" fill="white" />
            <circle cx="65" cy="105" r="2.5" fill="white" />
            <circle cx="72" cy="105" r="2.5" fill="white" />
            {/* Decorative elements */}
            <circle cx="140" cy="60" r="4" fill="#D4DCE8" />
            <circle cx="45" cy="45" r="3" fill="#D4DCE8" />
            <circle cx="130" cy="110" r="5" fill="#D4DCE8" />
            {/* Ground */}
            <ellipse cx="90" cy="140" rx="55" ry="8" fill="#E8EEF5" />
          </svg>

          <h2 className="text-center text-[20px] leading-[1.2] text-foreground" style={{ marginBottom: 10 }}>
            No messages at the moment
          </h2>
          <p className="max-w-md text-center text-sm leading-[1.5] text-muted-foreground">
            As soon as employers contact you or an important update is received, you will find it here.
          </p>
        </div>

      </div>
    </div>
  );
}
