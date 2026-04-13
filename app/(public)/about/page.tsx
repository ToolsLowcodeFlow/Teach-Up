"use client";

import { useState } from "react";
import { Plus, X } from "lucide-react";
import { PublicNavbar } from "@/components/home/public-navbar";
import { EasyWaySection } from "@/components/home/easy-way-section";
import { PublicFooter } from "@/components/home/public-footer";
import { useLanguage } from "@/lib/i18n/context";

function FaqItem({ question, answer, defaultOpen }: { question: string; answer: string; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen ?? false);
  return (
    <div className="border-b border-border-light">
      <button onClick={() => setOpen(!open)} style={{ padding: "18px 0" }} className="flex w-full cursor-pointer items-center justify-between border-none bg-transparent text-start">
        <span className="text-sm text-foreground">{question}</span>
        {open ? <X className="h-4 w-4 shrink-0 text-muted-foreground" /> : <Plus className="h-4 w-4 shrink-0 text-muted-foreground" />}
      </button>
      {open && <p style={{ paddingBottom: 18 }} className="text-sm leading-relaxed text-muted-foreground">{answer}</p>}
    </div>
  );
}

export default function AboutPage() {
  const { locale, direction } = useLanguage();
  const isHe = locale === "he";

  const stats = [
    { number: "257,000", label: isHe ? "משרות שאוישו החודש" : "Jobs filled this month" },
    { number: "257,000", label: isHe ? "משרות שאוישו החודש" : "Jobs filled this month" },
    { number: "257,000", label: isHe ? 'סה"כ משרות באתר' : "Total jobs on the site" },
    { number: "257,000", label: isHe ? "מועמדים רשומים" : "Registered candidates" },
  ];

  const faqs = [
    { question: isHe ? "?האם השימוש ב-TeachUP עולה כסף" : "Does using TeachUP cost money?", answer: isHe ? "לורם איפסום דולור סיט אמט, קונסקטטור אדיפיסינג אלית. סד מונטס מורט, אין שבגט לורם סלגאק." : "Lorem Ipsum Dolor Sit Emmet, Consectetur Adipiscing Elite Goler Monferrer Sobert Lorem Shabdach Yehol, Lakoris Art Sale Litz, And Shebaget Lore Salgak." },
    { question: isHe ? "?איך אני מפרסם משרה" : "How do I post a job?", answer: isHe ? "לורם איפסום דולור סיט אמט, קונסקטטור אדיפיסינג אלית. סד מונטס מורט." : "Lorem Ipsum Dolor Sit Emmet, Consectetur Adipiscing Elite Goler Monferrer Sobert Lorem." },
    { question: isHe ? "?האם אני יכול לנהל מועמדים דרך הפלטפורמה" : "Can I manage candidates through the platform?", answer: isHe ? "לורם איפסום דולור סיט אמט, קונסקטטור אדיפיסינג אלית. סד מונטס מורט." : "Lorem Ipsum Dolor Sit Emmet, Consectetur Adipiscing Elite Goler Monferrer Sobert Lorem." },
    { question: isHe ? "?האם יש תמיכה בעברית" : "Is there Hebrew support?", answer: isHe ? "לורם איפסום דולור סיט אמט, קונסקטטור אדיפיסינג אלית. סד מונטס מורט." : "Lorem Ipsum Dolor Sit Emmet, Consectetur Adipiscing Elite Goler Monferrer Sobert Lorem." },
    { question: isHe ? "?איך יוצרים קשר עם התמיכה" : "How do I contact support?", answer: isHe ? "לורם איפסום דולור סיט אמט, קונסקטטור אדיפיסינג אלית. סד מונטס מורט." : "Lorem Ipsum Dolor Sit Emmet, Consectetur Adipiscing Elite Goler Monferrer Sobert Lorem." },
  ];

  return (
    <div className="min-h-screen bg-background" dir={direction}>
      <PublicNavbar />

      {/* Hero */}
      <section className="relative flex flex-col overflow-hidden bg-[#EFF5FE]" style={{ minHeight: "100vh" }}>
        <div className="pointer-events-none absolute" style={{ width: "60%", height: "100%", top: 0, right: 0, background: "radial-gradient(ellipse at 80% 30%, rgba(76,150,255,0.18) 0%, transparent 60%)" }} />
        <div className="pointer-events-none absolute" style={{ width: "50%", height: "100%", bottom: 0, left: 0, background: "radial-gradient(ellipse at 20% 80%, rgba(76,150,255,0.14) 0%, transparent 60%)" }} />
        <div className="pointer-events-none absolute top-[100px]" style={{ opacity: 0.55, left: -416 }}>
          <div className="flex flex-col">
            {[0, 1, 2].map((row) => (
              <div key={row} className="flex" style={{ marginBottom: -3 }}>
                {[0, 1, 2, 3].map((col) => (
                  <div key={col} style={{ width: 201, height: 201, border: "2.87px solid white", marginRight: -3 }} />
                ))}
              </div>
            ))}
          </div>
        </div>
        <div className="pointer-events-none absolute top-[100px]" style={{ opacity: 0.55, right: -260 }}>
          <div className="flex flex-col">
            {[0, 1, 2].map((row) => (
              <div key={row} className="flex" style={{ marginBottom: -3 }}>
                {[0, 1, 2, 3].map((col) => (
                  <div key={col} style={{ width: 201, height: 201, border: "2.87px solid white", marginRight: -3 }} />
                ))}
              </div>
            ))}
          </div>
        </div>

        <div className="relative mx-auto flex max-w-[1310px] flex-col items-center gap-8 px-10 lg:flex-row lg:items-center" style={{ marginTop: "auto", marginBottom: "auto" }}>
          <div className="flex items-center justify-center lg:w-[42%]" style={{ marginTop: 30 }}>
            <div className="relative aspect-[480/440] w-full max-w-[480px]" style={{ maxHeight: "min(480px, 62vh)" }}>
              <div className="absolute border-2 border-white/30" style={{ background: "linear-gradient(160deg, #A8D8FF 0%, #7CBDF7 100%)", width: "76%", height: "76%", top: "7%", left: "14%", transform: "rotate(8deg)", borderRadius: 28 }} />
              <div className="absolute overflow-hidden border-2 border-white/50" style={{ background: "linear-gradient(160deg, #5AABF5 0%, #3D8BF0 100%)", width: "76%", height: "76%", top: "12%", left: "10%", transform: "rotate(4deg)", borderRadius: 28, boxShadow: "0 8px 32px rgba(76, 150, 255, 0.2)" }}>
                <svg className="absolute inset-0 h-full w-full" viewBox="0 0 290 260" fill="none" preserveAspectRatio="none">
                  <line x1="65" y1="48" x2="30" y2="22" stroke="white" strokeWidth="2.5" strokeLinecap="round" opacity="0.6" />
                  <line x1="48" y1="72" x2="15" y2="60" stroke="white" strokeWidth="2" strokeLinecap="round" opacity="0.5" />
                  <line x1="80" y1="32" x2="68" y2="8" stroke="white" strokeWidth="2" strokeLinecap="round" opacity="0.45" />
                  <line x1="220" y1="48" x2="252" y2="20" stroke="white" strokeWidth="2.5" strokeLinecap="round" opacity="0.6" />
                  <line x1="235" y1="72" x2="265" y2="52" stroke="white" strokeWidth="2" strokeLinecap="round" opacity="0.5" />
                  <line x1="205" y1="36" x2="218" y2="8" stroke="white" strokeWidth="2" strokeLinecap="round" opacity="0.4" />
                  <line x1="65" y1="205" x2="28" y2="230" stroke="white" strokeWidth="2.5" strokeLinecap="round" opacity="0.55" />
                  <line x1="228" y1="205" x2="260" y2="232" stroke="white" strokeWidth="2.5" strokeLinecap="round" opacity="0.55" />
                </svg>
              </div>
              <svg className="absolute z-20" style={{ top: "5%", left: "8%" }} width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M10 0L12 8L20 10L12 12L10 20L8 12L0 10L8 8L10 0Z" fill="white" fillOpacity="0.85" /></svg>
              <svg className="absolute z-20" style={{ top: "9%", right: "4%" }} width="16" height="16" viewBox="0 0 20 20" fill="none"><path d="M10 0L12 8L20 10L12 12L10 20L8 12L0 10L8 8L10 0Z" fill="white" fillOpacity="0.7" /></svg>
              <svg className="absolute z-20" style={{ bottom: "5%", left: "7%" }} width="18" height="18" viewBox="0 0 20 20" fill="none"><path d="M10 0L12 8L20 10L12 12L10 20L8 12L0 10L8 8L10 0Z" fill="white" fillOpacity="0.75" /></svg>
              <img src="/images/about-handshake.png" alt="" className="absolute z-10 object-contain" style={{ width: "76%", height: "76%", top: "12%", left: "10%", transform: "rotate(4deg)" }} />
            </div>
          </div>

          <div className="flex flex-1 flex-col gap-[clamp(16px,2.5vh,40px)] lg:max-w-[566px]">
            <span className="self-end text-[clamp(18px,1.6vw,28px)] leading-[1.1] text-primary">{isHe ? "אודות" : "About"}</span>
            <div className="flex flex-col" style={{ gap: "clamp(16px,2.5vh,35px)" }}>
              <h1 style={{ fontSize: "clamp(32px,4.5vw,72px)" }} className="leading-none text-foreground">
                {isHe ? "!נעים להכיר" : "Nice to meet you!"}
              </h1>
              <div className="flex flex-col" style={{ gap: "clamp(14px,2vh,30px)" }}>
                <p style={{ fontSize: "clamp(13px,1.2vw,18px)" }} className="leading-[1.3] text-foreground">
                  {isHe
                    ? "לורם איפסום דולור סיט אמט, קונסקטטור אדיפיסינג אלית. סד מונטס מורט, לורם איפסום דולור סיט אמט, קונסקטטור אדיפיסינג אלית. סד מונטס מורט, לורם איפסום דולור סיט אמט, קונסקטטור אדיפיסינג אלית. סד מונטס מורט, לורם שבדאך יהול."
                    : "Lorem Ipsum Dolor Sit Amet, Consector Adipiscing Elite Golar Monferrer Sobert Lorem Shabdach Yehol, Lorem Ipsum Dolor Sit Amet, Consector Adipiscing Elite Golar Monferrer Sobert Lorem Shabdach Yehol, Lorem Ipsum Dolor Sit Amet, Consector Adipiscing Elite Golar Monferrer Sobert Lorem Shabdach Yehol."}
                </p>
                <p style={{ fontSize: "clamp(13px,1.2vw,18px)" }} className="leading-[1.3] text-foreground">
                  {isHe
                    ? "לורם איפסום דולור סיט אמט, קונסקטטור אדיפיסינג אלית. סד מונטס מורט, לורם איפסום דולור סיט אמט, קונסקטטור אדיפיסינג אלית. סד מונטס מורט."
                    : "Lorem Ipsum Dolor Sit Emmet, Consecteur Adipiscing Elite Goler Monferrer Sobert Lorem Shabdach Yehol, Lorem Ipsum Dolor Sit Emmet, Consecteur Adipiscing Elite Goler Monferrer Sobert Lorem Shabdach Yehol."}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <EasyWaySection />

      {/* Stats */}
      <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-[#EFF5FE]" style={{ padding: "80px 40px" }}>
        <div className="pointer-events-none absolute" style={{ width: 800, height: 800, top: -350, right: -100, background: "radial-gradient(circle, rgba(76,150,255,0.15) 0%, transparent 70%)", borderRadius: "50%" }} />
        <div className="pointer-events-none absolute" style={{ width: 800, height: 400, bottom: -50, left: -300, background: "radial-gradient(ellipse, rgba(76,150,255,0.12) 0%, transparent 70%)", borderRadius: "50%" }} />
        <div className="pointer-events-none absolute top-[100px]" style={{ opacity: 0.55, left: -416 }}>
          <div className="flex flex-col">
            {[0, 1, 2].map((row) => (
              <div key={`sl${row}`} className="flex" style={{ marginBottom: -3 }}>
                {[0, 1, 2, 3].map((col) => (<div key={`sl${row}${col}`} style={{ width: 201, height: 201, border: "2.87px solid white", marginRight: -3 }} />))}
              </div>
            ))}
          </div>
        </div>
        <div className="pointer-events-none absolute top-[100px]" style={{ opacity: 0.55, right: -260 }}>
          <div className="flex flex-col">
            {[0, 1, 2].map((row) => (
              <div key={`sr${row}`} className="flex" style={{ marginBottom: -3 }}>
                {[0, 1, 2, 3].map((col) => (<div key={`sr${row}${col}`} style={{ width: 201, height: 201, border: "2.87px solid white", marginRight: -3 }} />))}
              </div>
            ))}
          </div>
        </div>

        <div className="relative z-10 flex flex-col items-center" style={{ gap: 50 }}>
          <div className="flex max-w-[632px] flex-col items-center text-center" style={{ gap: 24 }}>
            <h2 className="text-[40px] leading-[1.1] text-foreground">
              {isHe ? "המספרים מדברים" : "The numbers speak"}
            </h2>
            <p className="text-base leading-[1.2] text-muted-foreground">
              {isHe
                ? "לורם איפסום דולור סיט אמט, קונסקטטור אדיפיסינג אלית. סד מונטס מורט, לכנוץ אריר גק ליץ, אנד שבגט לורם סלגאק."
                : "Lorem Ipsum Dolor Sit Emmet, Consecteur Adipiscing Elite Goler Monferrer Sobert Lorem Shabteq Yahol, Leknutz Arir Gek Litz, And Shebagat Livm Solgak."}
            </p>
          </div>
          <div className="grid w-full max-w-[1199px] grid-cols-2 gap-[30px] lg:grid-cols-4">
            {stats.map((stat, i) => (
              <div key={i} className="flex flex-col items-center justify-center rounded-[10px] border border-white text-center" style={{ height: 135, padding: "34px 40px", backgroundImage: "linear-gradient(183deg, rgb(255,255,255) 5%, rgba(119,191,255,0) 260%)", gap: 20 }}>
                <span className="text-[36px] leading-none text-foreground">{stat.number}</span>
                <span className="text-lg leading-none text-foreground">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section style={{ padding: "60px 40px" }} className="flex flex-col items-center bg-background">
        <h2 style={{ marginBottom: 32 }} className="text-center text-3xl leading-tight text-foreground">
          {isHe ? "שאלות נפוצות" : "Frequently Asked Questions"}
        </h2>
        <div className="w-full max-w-2xl">
          {faqs.map((faq, i) => (
            <FaqItem key={i} question={faq.question} answer={faq.answer} defaultOpen={i === 0} />
          ))}
        </div>
      </section>

      <PublicFooter />
    </div>
  );
}
