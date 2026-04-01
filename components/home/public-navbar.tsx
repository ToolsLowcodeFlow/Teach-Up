"use client";

import Link from "next/link";
import { useLanguage } from "@/lib/i18n/context";

export function PublicNavbar() {
  const { t } = useLanguage();

  return (
    <header className="absolute inset-x-0 top-0 z-50">
      <div style={{ padding: "12px 40px" }}>
        <div style={{ padding: "8px 20px" }} className="flex items-center justify-between rounded-full border border-white/80 bg-white/70 shadow-sm backdrop-blur-md">
          {/* Left: Logo + Nav links */}
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center gap-2 text-2xl leading-tight">
              <span className="text-foreground">TEACH</span>
              <span className="text-[#2C7AEA]">UP</span>
            </Link>

            <nav className="hidden items-center gap-6 lg:flex">
              <Link href="/about" className="text-sm text-foreground transition-colors hover:text-primary">
                {t.home.about}
              </Link>
              <Link href="/about#contact" className="text-sm text-foreground transition-colors hover:text-primary">
                {t.home.contactUs}
              </Link>
              <Link href="/about#suppliers" className="text-sm text-foreground transition-colors hover:text-primary">
                {t.home.supplierDatabase}
              </Link>
              <Link href="/about#prices" className="text-sm text-foreground transition-colors hover:text-primary">
                {t.home.prices}
              </Link>
            </nav>
          </div>

          {/* Right: Action buttons */}
          <div className="flex items-center gap-3">
            <Link
              href="/register"
              style={{ padding: "10px 20px" }}
              className="rounded-xl border border-border-light bg-white text-sm text-foreground transition-colors hover:bg-gray-50"
            >
              {t.home.registrationLogin}
            </Link>
            <Link
              href="/login"
              style={{ padding: "10px 20px" }}
              className="rounded-xl bg-foreground text-sm text-white transition-colors hover:bg-foreground/90"
            >
              {t.home.jobPosting}
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
