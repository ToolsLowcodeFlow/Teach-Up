"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { X } from "lucide-react";
import { useLanguage } from "@/lib/i18n/context";

export default function EditRoutePage() {
  const { t } = useLanguage();
  const router = useRouter();
  const [form, setForm] = useState({
    title: "Lorem Ipsum",
    price: "₪110",
    line1: "Lorem Ipsum",
    line2: "Lorem Ipsum",
    line3: "Lorem Ipsum",
    line4: "Lorem Ipsum",
  });

  return (
    <div
      className="fixed inset-0 z-50 flex justify-end"
      style={{ fontFamily: "'Abel', sans-serif" }}
    >
      <div className="fixed inset-0" style={{ background: "rgba(0,0,0,0.4)", backdropFilter: "blur(8px)", WebkitBackdropFilter: "blur(8px)" }} onClick={() => router.back()} />

      {/* Side panel */}
      <div
        className="relative z-10 flex w-full max-w-[480px] flex-col rounded-2xl bg-white"
        style={{ margin: "24px 24px 24px 0", boxShadow: "0 10px 50px rgba(0,0,0,0.15)", maxHeight: "calc(100vh - 48px)" }}
      >
        {/* Close button */}
        <button onClick={() => router.back()} className="absolute z-20 flex cursor-pointer items-center justify-center rounded-full border-none bg-white text-muted-foreground hover:text-foreground" style={{ top: 12, right: 12, width: 32, height: 32, boxShadow: "0 2px 6px rgba(0,0,0,0.1)" }}>
          <X size={16} />
        </button>

        {/* Fixed Header */}
        <div className="flex shrink-0 items-center justify-between border-b border-border-light" style={{ padding: "28px 32px 20px", paddingRight: 60 }}>
          <h1 className="text-[22px] leading-[1.1] text-foreground">{t.admin.editRoute}</h1>
          <div className="flex items-center gap-3">
            <button
              onClick={() => router.back()}
              className="cursor-pointer rounded-lg text-sm text-white"
              style={{ padding: "8px 20px", border: "none", backgroundImage: "linear-gradient(168deg, #4C96FF 12%, #1667DB 94%)" }}
            >
              {t.admin.keeping}
            </button>
            <button
              onClick={() => router.back()}
              className="cursor-pointer rounded-lg border border-foreground bg-white text-sm text-foreground"
              style={{ padding: "8px 20px" }}
            >
              {t.admin.cancellation}
            </button>
          </div>
        </div>

        {/* Scrollable Form */}
        <div className="flex-1 overflow-y-auto" style={{ padding: "20px 32px 40px" }}>
        <div className="flex flex-col" style={{ gap: 20 }}>
          <div className="flex flex-col gap-2">
            <label className="text-sm text-foreground">{t.admin.trackTitle}</label>
            <input type="text" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="w-full rounded-lg border border-border-light bg-white text-sm text-foreground outline-none" style={{ padding: "12px 14px" }} />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm text-foreground">{t.admin.routePrice}</label>
            <input type="text" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} className="w-full rounded-lg border border-border-light bg-white text-sm text-foreground outline-none" style={{ padding: "12px 14px" }} />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm text-foreground">{t.admin.firstLineText}</label>
            <input type="text" value={form.line1} onChange={(e) => setForm({ ...form, line1: e.target.value })} className="w-full rounded-lg border border-border-light bg-white text-sm text-foreground outline-none" style={{ padding: "12px 14px" }} />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm text-foreground">{t.admin.secondLineText}</label>
            <input type="text" value={form.line2} onChange={(e) => setForm({ ...form, line2: e.target.value })} className="w-full rounded-lg border border-border-light bg-white text-sm text-foreground outline-none" style={{ padding: "12px 14px" }} />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm text-foreground">{t.admin.thirdLineText}</label>
            <input type="text" value={form.line3} onChange={(e) => setForm({ ...form, line3: e.target.value })} className="w-full rounded-lg border border-border-light bg-white text-sm text-foreground outline-none" style={{ padding: "12px 14px" }} />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm text-foreground">{t.admin.fourthLineText}</label>
            <input type="text" value={form.line4} onChange={(e) => setForm({ ...form, line4: e.target.value })} className="w-full rounded-lg border border-border-light bg-white text-sm text-foreground outline-none" style={{ padding: "12px 14px" }} />
          </div>
        </div>
        </div>
      </div>
    </div>
  );
}
