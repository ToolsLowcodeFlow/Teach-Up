"use client";

import { useRouter } from "next/navigation";
import { X } from "lucide-react";
import { useLanguage } from "@/lib/i18n/context";

export default function DeleteBannerPage() {
  const { t } = useLanguage();
  const router = useRouter();

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ fontFamily: "'Abel', sans-serif" }}
    >
      <iframe
        src="/admin/advertising"
        className="fixed inset-0 h-screen w-screen border-none"
        style={{ filter: "blur(8px)", pointerEvents: "none", opacity: 0.8, transition: "opacity 0.3s" }}
        tabIndex={-1}
      />
      <div className="fixed inset-0" style={{ background: "rgba(0,0,0,0.3)" }} onClick={() => router.back()} />

      <div
        className="relative z-10 flex flex-col items-center rounded-2xl bg-white"
        style={{ width: 420, padding: "24px 32px 36px", boxShadow: "0 20px 60px rgba(0,0,0,0.15)" }}
      >
        {/* Close - top right */}
        <button onClick={() => router.back()} className="absolute flex cursor-pointer items-center justify-center border-none bg-transparent text-muted-foreground hover:text-foreground" style={{ top: 16, right: 16 }}>
          <X size={20} />
        </button>

        {/* Illustration */}
        <div style={{ marginTop: 16, marginBottom: 24 }}>
          <img src="/images/success-illustration.svg" alt="Delete" style={{ width: 200, height: 170, filter: "hue-rotate(-100deg) saturate(1.5)" }} />
        </div>

        {/* Text */}
        <h2 className="text-center text-[22px] leading-[1.2] text-foreground" style={{ marginBottom: 10 }}>
          {t.admin.deleteBannerTitle}
        </h2>
        <p className="text-center text-sm leading-normal text-muted-foreground" style={{ marginBottom: 24 }}>
          {t.admin.deleteBannerConfirm}
        </p>

        {/* Buttons */}
        <div className="flex w-full items-center gap-4">
          <button
            onClick={() => router.push("/admin/advertising")}
            className="flex-1 cursor-pointer rounded-xl border border-red-400 bg-red-400 text-base text-white transition-colors hover:bg-red-500"
            style={{ height: 52 }}
          >
            {t.admin.deletion}
          </button>
          <button
            onClick={() => router.back()}
            className="flex-1 cursor-pointer rounded-xl border border-foreground bg-white text-base text-foreground transition-colors hover:bg-gray-50"
            style={{ height: 52 }}
          >
            {t.admin.cancellation}
          </button>
        </div>
      </div>
    </div>
  );
}
