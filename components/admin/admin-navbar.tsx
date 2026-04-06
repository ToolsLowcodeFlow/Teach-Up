"use client";

import { useRouter, usePathname } from "next/navigation";

const navItems = [
  { label: "Dashboard", href: "/admin/dashboard" },
  { label: "Suppliers", href: "/admin/suppliers" },
  { label: "Guides", href: "/admin/guides" },
  { label: "Advertising banner", href: "/admin/advertising" },
  { label: "Routes", href: "/admin/routes" },
  { label: "Blocked", href: "/admin/blocked" },
];

export function AdminNavbar() {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40">
      <div style={{ background: "#0E1117" }}>
        <div className="mx-auto flex max-w-[1375px] items-end justify-between" style={{ padding: "0 40px" }}>
          {/* Left: Logo */}
          <div className="flex items-center gap-1.5 text-2xl" style={{ lineHeight: 1.2, padding: "18px 0" }}>
            <span className="text-white">TEACH</span>
            <span className="text-[#2C7AEA]">UP</span>
          </div>

          {/* Right: Nav items */}
          <nav className="flex items-end gap-0">
            {navItems.map((item) => {
              const isActive = pathname === item.href || pathname?.startsWith(item.href + "/");
              return (
                <div key={item.href} className="relative" style={{ marginBottom: -1 }}>
                  <button
                    onClick={() => router.push(item.href)}
                    className="relative z-10 cursor-pointer border-none text-sm"
                    style={{
                      padding: isActive ? "12px 28px 14px" : "12px 24px 14px",
                      background: isActive ? "#F7F9FC" : "transparent",
                      color: isActive ? "#0E1117" : "rgba(255,255,255,0.6)",
                      borderRadius: isActive ? "10px 10px 0 0" : 0,
                      fontFamily: "'Abel', sans-serif",
                    }}
                  >
                    {item.label}
                  </button>
                </div>
              );
            })}
          </nav>
        </div>
      </div>
    </header>
  );
}
