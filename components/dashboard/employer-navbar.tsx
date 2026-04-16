"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ChevronDown, MessageSquareText, Bell, Heart, Globe, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/lib/i18n/context";
import { createClient } from "@/lib/supabase/client";
import { useUser } from "@/lib/hooks/use-user";
import { useState } from "react";

interface EmployerNavbarProps {
  onPostJob?: () => void;
}

export function EmployerNavbar({ onPostJob }: EmployerNavbarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { t, locale, toggleLocale } = useLanguage();
  const { user } = useUser();
  const [avatarMenu, setAvatarMenu] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);

  const handleLogout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/login");
  };

  const navLinks = [
    { label: t.dashboard.myJobs, href: "/institution/dashboard" },
    { label: t.dashboard.myCandidates, href: "/institution/dashboard/my-candidates" },
    { label: t.dashboard.candidateSearch, href: "/institution/dashboard/candidate-search" },
    { label: t.dashboard.messages, href: "/institution/dashboard/messages" },
    { label: t.dashboard.contactUs, href: "/institution/dashboard/contact" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white">
      <div style={{ padding: "0 40px" }} className="flex h-20 items-center justify-between">
        {/* Start side: Logo + Nav links */}
        <div className="flex items-center gap-8 xl:gap-14">
          <Link
            href="/institution/dashboard"
            className="flex shrink-0 items-center gap-2 text-[28px] leading-tight"
          >
            <span className="text-foreground">TEACH</span>
            <span className="text-[#2C7AEA]">UP</span>
          </Link>

          <nav className="hidden items-center gap-1 xl:flex xl:gap-3">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "relative whitespace-nowrap px-2 py-2.5 text-sm text-foreground transition-colors hover:text-primary xl:text-base",
                    isActive && "xl:text-lg"
                  )}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute -bottom-1 left-1/2 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-primary" />
                  )}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* End side: Lang switch + Icons + Job posting + Avatar */}
        <div className="flex items-center gap-4">
          {/* Language switcher */}
          <button
            onClick={toggleLocale}
            className="flex items-center gap-1.5 rounded-full border border-border px-3 py-1.5 text-sm text-dark-gray transition-colors hover:bg-gray-50"
            title={locale === "en" ? "Switch to Hebrew" : "Switch to English"}
          >
            <Globe className="h-4 w-4 text-primary" />
            {locale === "en" ? "עב" : "EN"}
          </button>

          <div className="flex items-center gap-1">
            <Link href="/institution/dashboard/favorites" className="flex h-10 w-10 items-center justify-center rounded-full transition-colors hover:bg-gray-100">
              <Heart className="h-5 w-5 text-foreground" />
            </Link>
            {/* Notifications bell */}
            <div className="relative">
              <button
                onClick={() => setNotifOpen(!notifOpen)}
                className="flex h-10 w-10 items-center justify-center rounded-full transition-colors hover:bg-gray-100"
              >
                <Bell className="h-5 w-5 text-foreground" />
              </button>
              {notifOpen && (
                <>
                  <div className="fixed inset-0 z-10" onClick={() => setNotifOpen(false)} />
                  <div className="absolute top-12 z-20 flex w-[420px] flex-col rounded-2xl bg-white shadow-xl" style={{ padding: "20px 0", insetInlineEnd: 0 }}>
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
            {/* Messages */}
            <Link href="/institution/dashboard/messages" className="flex h-10 w-10 items-center justify-center rounded-full transition-colors hover:bg-gray-100">
              <MessageSquareText className="h-5 w-5 text-foreground" />
            </Link>
          </div>

          <button
            onClick={onPostJob}
            style={{ padding: "10px 24px" }}
            className="hidden items-center justify-center whitespace-nowrap rounded-full bg-foreground text-base leading-none text-white transition-colors hover:bg-foreground/90 xl:flex"
          >
            {t.dashboard.jobPosting}
          </button>

          <div className="relative flex items-center gap-2">
            <button onClick={() => router.push("/institution/dashboard/profile")} className="flex h-8 w-8 cursor-pointer items-center justify-center overflow-hidden rounded-full border-none" style={{ background: user?.avatarUrl ? "transparent" : "linear-gradient(140deg, #4C96FF 12%, #1667DB 94%)" }}>
              {user?.avatarUrl ? (
                <img src={user.avatarUrl} alt="" className="h-full w-full object-cover" />
              ) : (
                <span className="text-sm font-medium text-white">{user?.initial || "U"}</span>
              )}
            </button>
            <button onClick={() => setAvatarMenu(!avatarMenu)} className="flex cursor-pointer items-center justify-center border-none bg-transparent">
              <ChevronDown className="h-3 w-3 text-foreground" />
            </button>
            {avatarMenu && (
              <>
                <div className="fixed inset-0 z-10" onClick={() => setAvatarMenu(false)} />
                <div
                  style={{ padding: "12px 16px" }}
                  className="absolute inset-e-0 top-10 z-20 flex min-w-40 flex-col gap-2 rounded-xl border border-border-light bg-white shadow-lg"
                >
                  <Link
                    href="/institution/dashboard/profile"
                    onClick={() => setAvatarMenu(false)}
                    className="whitespace-nowrap py-1 text-sm text-foreground transition-colors hover:text-primary"
                  >
                    {t.profile.personalArea}
                  </Link>
                  <button
                    onClick={() => setAvatarMenu(false)}
                    className="whitespace-nowrap py-1 text-start text-sm text-danger transition-colors hover:text-danger/70"
                  >
                    {t.profile.disengagement}
                  </button>
                  <div className="my-1 h-px w-full bg-border-light" />
                  <button
                    onClick={handleLogout}
                    className="flex w-full items-center gap-2 whitespace-nowrap py-1 text-start text-sm text-foreground transition-colors hover:text-primary"
                  >
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
