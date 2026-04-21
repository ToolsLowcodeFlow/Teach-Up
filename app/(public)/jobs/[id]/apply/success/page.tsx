"use client";

import { useRouter } from "next/navigation";
import { X } from "lucide-react";
import { useLanguage } from "@/lib/i18n/context";

export default function ApplySuccessPage() {
  const router = useRouter();
  const { t } = useLanguage();
  const jd = t.jobDetails;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ fontFamily: "'Heebo', sans-serif" }}
    >
      <div className="fixed inset-0" style={{ background: "rgba(0,0,0,0.4)", backdropFilter: "blur(8px)", WebkitBackdropFilter: "blur(8px)" }} onClick={() => router.push(window.location.pathname.replace("/success", "/feedback"))} />

      <div
        className="relative z-10 flex flex-col items-center rounded-[20px] bg-white"
        style={{ width: 420, padding: "24px 32px 40px", boxShadow: "0 20px 60px rgba(0,0,0,0.15)" }}
      >
        {/* Close button - top right */}
        <button
          onClick={() => router.push(window.location.pathname.replace("/success", "/feedback"))}
          className="absolute flex cursor-pointer items-center justify-center border-none bg-transparent text-muted-foreground hover:text-foreground"
          style={{ top: 16, right: 16 }}
        >
          <X size={20} />
        </button>

        {/* Illustration from Figma */}
        <div className="flex items-center justify-center" style={{ marginBottom: 28, marginTop: 20 }}>
          <img src="/images/success-illustration.svg" alt="Success" style={{ width: 220, height: 180 }} />
        </div>

        {/* Success text */}
        <h2 className="text-center text-[22px] leading-[1.3] text-foreground" style={{ marginBottom: 16 }}>
          {jd.successTitle}
        </h2>

        <p className="text-center text-sm leading-[1.6] text-muted-foreground" style={{ maxWidth: 360 }}>
          {jd.successDesc}
        </p>
      </div>
    </div>
  );
}
