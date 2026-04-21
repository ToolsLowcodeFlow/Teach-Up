"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { Globe, LogOut } from "lucide-react";
import { useLanguage } from "@/lib/i18n/context";
import { createClient } from "@/lib/supabase/client";

export function AdminNavbar() {
  const router = useRouter();
  const pathname = usePathname();
  const { locale, t, toggleLocale } = useLanguage();

  // Hide global language switcher on admin pages
  useEffect(() => {
    const el = document.querySelector(".lang-switcher-global") as HTMLElement;
    if (el) el.style.display = "none";
    return () => { if (el) el.style.display = ""; };
  }, []);

  const navItems = [
    { label: t.admin.dashboard, href: "/admin/dashboard" },
    { label: t.admin.suppliers, href: "/admin/suppliers" },
    { label: t.admin.guides, href: "/admin/guides" },
    { label: t.admin.advertisingBanner, href: "/admin/advertising" },
    { label: t.admin.routes, href: "/admin/routes" },
    { label: t.admin.blocked, href: "/admin/blocked" },
  ];

  return (
    <header className="sticky top-0 z-40">
      <div style={{ background: "#0E1117" }}>
        <div className="flex items-end justify-between" style={{ padding: "0 40px" }}>
          {/* Left: Logo */}
          <div onClick={() => router.push("/admin/dashboard")} className="flex cursor-pointer items-center gap-1.5 text-2xl" style={{ lineHeight: 1.2, padding: "18px 0" }}>
            <span className="text-white">TEACH</span>
            <span className="text-[#2C7AEA]">UP</span>
          </div>

          {/* Right: Nav items + Language */}
          <div className="flex items-end gap-4">
            <nav className="flex items-end gap-0">
              {navItems.map((item) => {
                const isActive = pathname === item.href || pathname?.startsWith(item.href + "/");
                return (
                  <button
                    key={item.href}
                    onClick={() => router.push(item.href)}
                    className="cursor-pointer border-none text-sm"
                    style={{
                      padding: "12px 24px",
                      background: isActive ? "#F7F9FC" : "transparent",
                      color: isActive ? "#0E1117" : "rgba(255,255,255,0.6)",
                      borderRadius: isActive ? "10px 10px 0 0" : 0,
                      fontFamily: "'Heebo', sans-serif",
                    }}
                  >
                    {item.label}
                  </button>
                );
              })}
            </nav>
            <button
              onClick={toggleLocale}
              className="flex cursor-pointer items-center gap-1.5 border-none bg-transparent text-sm"
              style={{ padding: "14px 0", color: "rgba(255,255,255,0.6)" }}
            >
              <Globe size={14} />
              <span>{locale === "en" ? "עב" : "EN"}</span>
            </button>
            <button
              onClick={async () => {
                const supabase = createClient();
                await supabase.auth.signOut();
                router.push("/login");
              }}
              className="flex cursor-pointer items-center gap-1.5 border-none bg-transparent text-sm"
              style={{ padding: "14px 0", color: "rgba(255,255,255,0.6)" }}
            >
              <LogOut size={14} />
              <span>{t.profile.logout}</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
