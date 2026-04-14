"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronDown, Heart, Bell, MessageSquare, Globe, LogOut } from "lucide-react";
import { useLanguage } from "@/lib/i18n/context";
import { createClient } from "@/lib/supabase/client";
import { useUser } from "@/lib/hooks/use-user";

interface SeekerNavbarProps {
  activeNav?: "jobSearch" | "myJobs" | "contactUs" | "";
}

export function SeekerNavbar({ activeNav = "" }: SeekerNavbarProps) {
  const router = useRouter();
  const { locale, direction, t, toggleLocale } = useLanguage();
  const { user } = useUser();
  const [notifOpen, setNotifOpen] = useState(false);
  const [avatarMenuOpen, setAvatarMenuOpen] = useState(false);

  const handleLogout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/login");
  };

  return (
    <header className="sticky top-0 z-40 bg-white" style={{ borderBottom: "1px solid #F3F3F6" }} dir={direction}>
      <div className="flex items-center justify-between" style={{ padding: "12px 40px" }}>
        {/* Left: Logo + nav links */}
        <div className="flex items-center gap-10">
          <div className="flex items-center gap-1.5 text-2xl">
            <span className="text-foreground">TEACH</span>
            <span className="text-[#2C7AEA]">UP</span>
          </div>
          <nav className="flex items-center gap-8 text-base">
            <a onClick={() => router.push("/jobs")} className="relative cursor-pointer pb-5 text-muted-foreground hover:text-foreground" style={{ color: activeNav === "jobSearch" ? "#0E1117" : undefined }}>
              {t.seekerNav.jobSearch}
              {activeNav === "jobSearch" && <span className="absolute left-1/2 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-primary" style={{ bottom: -8 }} />}
            </a>
            <a onClick={() => router.push("/jobs?tab=my")} className="relative cursor-pointer pb-5 text-muted-foreground hover:text-foreground" style={{ color: activeNav === "myJobs" ? "#0E1117" : undefined }}>
              {t.dashboard.myJobs}
              {activeNav === "myJobs" && <span className="absolute left-1/2 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-primary" style={{ bottom: -8 }} />}
            </a>
            <a onClick={() => router.push("/contact")} className="relative cursor-pointer pb-5 text-muted-foreground hover:text-foreground" style={{ color: activeNav === "contactUs" ? "#0E1117" : undefined }}>
              {t.dashboard.contactUs}
              {activeNav === "contactUs" && <span className="absolute left-1/2 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-primary" style={{ bottom: -8 }} />}
            </a>
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
            {/* Notifications */}
            <div className="relative">
              <button onClick={() => setNotifOpen(!notifOpen)} className="flex cursor-pointer items-center justify-center border-none bg-transparent text-muted-foreground hover:text-foreground">
                <Bell size={18} />
              </button>
              {notifOpen && (
                <>
                  <div className="fixed inset-0 z-50" onClick={() => setNotifOpen(false)} />
                  <div className="absolute top-10 z-50 flex w-[420px] flex-col rounded-2xl bg-white shadow-xl" style={{ padding: "20px 0", insetInlineEnd: 0 }}>
                    <h3 className="text-center text-lg text-foreground" style={{ marginBottom: 16 }}>
                      {t.seekerNav.notifications}
                    </h3>
                    {[
                      { msg: t.seekerNav.notifMsg1, time: t.seekerNav.hoursAgo, logo: "/images/chat-company-logo.png", anon: false },
                      { msg: t.seekerNav.notifMsg2, time: t.seekerNav.hoursAgo, logo: "", anon: true },
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
                        <button className="shrink-0 cursor-pointer border-none bg-transparent text-xs text-primary underline">
                          {t.seekerNav.viewStatus}
                        </button>
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
          {/* Avatar with dropdown */}
          <div className="relative flex items-center gap-1">
            <button onClick={() => router.push("/profile")} className="flex cursor-pointer items-center border-none bg-transparent">
              <div className="flex h-9 w-9 items-center justify-center overflow-hidden rounded-full border border-border-light transition-opacity hover:opacity-80" style={{ background: user?.avatarUrl ? "transparent" : "linear-gradient(140deg, #4C96FF 12%, #1667DB 94%)" }}>
                {user?.avatarUrl ? (
                  <img src={user.avatarUrl} alt="" className="h-full w-full object-cover" />
                ) : (
                  <span className="text-sm font-medium text-white">{user?.initial || "U"}</span>
                )}
              </div>
            </button>
            <button onClick={() => setAvatarMenuOpen(!avatarMenuOpen)} className="flex cursor-pointer items-center justify-center border-none bg-transparent text-muted-foreground hover:text-foreground">
              <ChevronDown size={14} />
            </button>
            {avatarMenuOpen && (
              <>
                <div className="fixed inset-0 z-50" onClick={() => setAvatarMenuOpen(false)} />
                <div className="absolute top-12 z-50 flex min-w-36 flex-col gap-1 rounded-xl border border-border-light bg-white shadow-lg" style={{ padding: "12px 16px", insetInlineEnd: 0 }}>
                  <button onClick={() => { setAvatarMenuOpen(false); router.push("/profile"); }} className="flex w-full whitespace-nowrap py-2 text-start text-sm text-foreground transition-colors hover:text-primary">
                    {t.profile.personalArea}
                  </button>
                  <button className="flex w-full whitespace-nowrap py-2 text-start text-sm text-red-400 transition-colors hover:text-red-600" onClick={() => setAvatarMenuOpen(false)}>
                    {t.profile.disengagement}
                  </button>
                  <div className="my-1 h-px w-full bg-border-light" />
                  <button onClick={handleLogout} className="flex w-full items-center gap-2 whitespace-nowrap py-2 text-start text-sm text-foreground transition-colors hover:text-primary">
                    <LogOut size={14} />
                    {t.profile.logout}
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
