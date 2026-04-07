"use client";

import { useRouter } from "next/navigation";
import { X } from "lucide-react";
import { useLanguage } from "@/lib/i18n/context";

export default function BannerWarningPage() {
  const { t, direction } = useLanguage();
  const router = useRouter();

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ fontFamily: "'Abel', sans-serif" }}
    >
      {/* Background: render advertising page behind with blur */}
      <iframe
        src="/admin/advertising"
        className="fixed inset-0 h-screen w-screen border-none"
        style={{ filter: "blur(8px)", pointerEvents: "none", opacity: 0.8, transition: "opacity 0.3s" }}
        tabIndex={-1}
      />
      <div className="fixed inset-0" style={{ background: "rgba(0,0,0,0.3)" }} onClick={() => router.back()} />

      <div
        dir={direction}
        className="relative z-10 flex flex-col items-center rounded-2xl bg-white"
        style={{ width: 420, padding: "24px 32px 36px", boxShadow: "0 20px 60px rgba(0,0,0,0.15)" }}
      >
        {/* Close */}
        <button onClick={() => router.back()} className="absolute flex cursor-pointer items-center justify-center border-none bg-transparent text-muted-foreground hover:text-foreground" style={{ top: 16, right: 16 }}>
          <X size={20} />
        </button>

        {/* Illustration */}
        <div style={{ marginTop: 16, marginBottom: 24 }}>
          <img src="/images/success-illustration.svg" alt="Warning" style={{ width: 200, height: 170, filter: "hue-rotate(-100deg) saturate(1.5)" }} />
        </div>

        {/* Text */}
        <h2 className="text-center text-[22px] leading-[1.2] text-foreground" style={{ marginBottom: 10 }}>
          {t.admin.payAttention}
        </h2>
        <p className="text-center text-sm leading-[1.5] text-muted-foreground" style={{ maxWidth: 360 }}>
          {t.admin.payAttentionSubtitle}
        </p>
      </div>
    </div>
  );
}
