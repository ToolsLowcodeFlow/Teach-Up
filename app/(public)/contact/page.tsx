"use client";

import { useState, useEffect } from "react";
import { Phone } from "lucide-react";
import { useLanguage } from "@/lib/i18n/context";
import { SeekerNavbar } from "@/components/seeker/seeker-navbar";
import { PublicFooter } from "@/components/home/public-footer";

export default function ContactPage() {
  const { locale, direction, t } = useLanguage();
  const [form, setForm] = useState({ name: "", mobile: "", email: "", message: "" });

  useEffect(() => {
    const el = document.querySelector(".lang-switcher-global") as HTMLElement;
    if (el) el.style.display = "none";
    return () => { if (el) el.style.display = ""; };
  }, []);

  return (
    <div className="flex min-h-screen flex-col bg-[#F7F9FC]" style={{ fontFamily: "'Abel', sans-serif" }}>
      <SeekerNavbar activeNav="contactUs" />

      {/* Content */}
      <div className="mx-auto flex w-full max-w-[1375px] flex-1 gap-12" style={{ padding: "40px 40px 60px" }} dir={direction}>
        {/* Left — Contact info */}
        <div className="flex flex-col" style={{ width: 480, gap: 24 }}>
          <h1 className="text-[36px] leading-[1.2] text-foreground">{t.contactUs.title}</h1>
          <p className="text-lg leading-[1.4] text-foreground">{t.contactUs.subtitle}</p>
          <p className="text-sm text-muted-foreground">{t.contactUs.feelFree}</p>

          {/* Contact methods */}
          <div className="flex flex-wrap items-center gap-4" style={{ marginTop: 8 }}>
            <div className="flex items-center gap-2 rounded-full border border-border-light bg-white text-sm text-foreground" style={{ padding: "8px 16px" }}>
              <span>052-7040414</span>
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#25D366]">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" /></svg>
              </div>
            </div>
            <div className="flex items-center gap-2 rounded-full border border-border-light bg-white text-sm text-foreground" style={{ padding: "8px 16px" }}>
              <span>loramipsum@gmail.com</span>
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="white"><path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" /></svg>
              </div>
            </div>
            <div className="flex items-center gap-2 rounded-full border border-border-light bg-white text-sm text-foreground" style={{ padding: "8px 16px" }}>
              <span>02 - 6793021</span>
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary">
                <Phone size={12} className="text-white" />
              </div>
            </div>
          </div>
        </div>

        {/* Right — Contact form */}
        <div className="flex flex-1 flex-col rounded-2xl bg-white" style={{ padding: "32px 36px" }}>
          <div className="flex flex-col" style={{ gap: 20 }}>
            <div className="flex flex-col gap-2">
              <label className="text-sm text-foreground">{t.contactUs.fullName}</label>
              <input type="text" placeholder={locale === "he" ? "הקלד כאן..." : "Type here..."} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full rounded-lg border border-border bg-[#F7F9FC] text-sm text-foreground placeholder:text-muted-foreground/40 focus:border-primary/30 focus:bg-white focus:outline-none" style={{ padding: "14px 16px" }} />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm text-foreground">{t.contactUs.mobileNumber}</label>
              <input type="tel" placeholder={locale === "he" ? "הקלד כאן..." : "Type here..."} value={form.mobile} onChange={(e) => setForm({ ...form, mobile: e.target.value })} className="w-full rounded-lg border border-border bg-[#F7F9FC] text-sm text-foreground placeholder:text-muted-foreground/40 focus:border-primary/30 focus:bg-white focus:outline-none" style={{ padding: "14px 16px" }} />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm text-foreground">{t.contactUs.email}</label>
              <input type="email" placeholder={locale === "he" ? "הקלד כאן..." : "Type here..."} value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="w-full rounded-lg border border-border bg-[#F7F9FC] text-sm text-foreground placeholder:text-muted-foreground/40 focus:border-primary/30 focus:bg-white focus:outline-none" style={{ padding: "14px 16px" }} />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm text-foreground">{t.contactUs.message}</label>
              <textarea placeholder={locale === "he" ? "הודעה" : "message"} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} className="w-full resize-none rounded-lg border border-border bg-[#F7F9FC] text-sm text-foreground placeholder:text-muted-foreground/40 focus:border-primary/30 focus:bg-white focus:outline-none" style={{ padding: "14px 16px", height: 140 }} />
            </div>
            <button className="cursor-pointer rounded-lg text-sm text-white" style={{ padding: "12px 32px", border: "none", backgroundImage: "linear-gradient(168deg, #4C96FF 12%, #1667DB 94%)", alignSelf: direction === "rtl" ? "flex-start" : "flex-end" }}>
              {t.contactUs.sending}
            </button>
          </div>
        </div>
      </div>

      <PublicFooter />
    </div>
  );
}
