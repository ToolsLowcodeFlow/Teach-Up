"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, MessageSquareText, Bell, Heart, Globe } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/lib/i18n/context";

interface EmployerNavbarProps {
  onPostJob?: () => void;
}

export function EmployerNavbar({ onPostJob }: EmployerNavbarProps) {
  const pathname = usePathname();
  const { t, locale, toggleLocale } = useLanguage();

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
            <button className="flex h-10 w-10 items-center justify-center rounded-full transition-colors hover:bg-gray-100">
              <Heart className="h-5 w-5 text-foreground" />
            </button>
            <button className="flex h-10 w-10 items-center justify-center rounded-full transition-colors hover:bg-gray-100">
              <Bell className="h-5 w-5 text-foreground" />
            </button>
            <button className="flex h-10 w-10 items-center justify-center rounded-full transition-colors hover:bg-gray-100">
              <MessageSquareText className="h-5 w-5 text-foreground" />
            </button>
          </div>

          <button
            onClick={onPostJob}
            style={{ padding: "10px 24px" }}
            className="hidden items-center justify-center whitespace-nowrap rounded-full bg-foreground text-base leading-none text-white transition-colors hover:bg-foreground/90 xl:flex"
          >
            {t.dashboard.jobPosting}
          </button>

          <button className="flex items-center gap-2">
            <div className="h-8 w-8 overflow-hidden rounded-full bg-muted-foreground/20">
              <div className="flex h-full w-full items-center justify-center text-xs text-muted-foreground">
                U
              </div>
            </div>
            <ChevronDown className="h-3 w-3 text-foreground" />
          </button>
        </div>
      </div>
    </header>
  );
}
