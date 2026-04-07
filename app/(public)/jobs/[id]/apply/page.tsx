"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronRight, Link2, Trash2 } from "lucide-react";
import { useLanguage } from "@/lib/i18n/context";

export default function JobApplyPage() {
  const router = useRouter();
  const { locale, direction } = useLanguage();
  const isHe = locale === "he";
  const [coverLetter, setCoverLetter] = useState(
    "Lorem Ipsum Dolor Sit Emmet, Consector Adipiscing Elite Goler Monferrer Sobert Lorem Shabdach Yehol, Lorem Ipsum Dolor Sit Emmet, Consector Adipiscing Elite Goler Monferrer Sobert Lorem Shabdach Yehol, Lorem Ipsum Dolor Sit Emmet, Consector Adipiscing Elite Goler Monferrer Sobert Lorem Shabdach Yehol, Lorem Ipsum Dolor Sit Emmet, Consector Adipiscing Elite Goler Monferrer Sobert Lorem Shabdach Yehol, Lorem Ipsum Dolor Habinbhams."
  );
  const [answers, setAnswers] = useState(["", "", ""]);

  const updateAnswer = (index: number, value: string) => {
    setAnswers((prev) => prev.map((a, i) => (i === index ? value : a)));
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ fontFamily: "'Abel', sans-serif" }}
    >
      <div className="fixed inset-0" style={{ background: "rgba(0,0,0,0.4)", backdropFilter: "blur(8px)", WebkitBackdropFilter: "blur(8px)" }} onClick={() => router.back()} />

      <div
        className="relative z-10 flex overflow-hidden rounded-[20px] bg-white"
        style={{ width: "90vw", maxWidth: 960, height: "88vh", boxShadow: "0 20px 60px rgba(0,0,0,0.15)" }}
      >
        {/* LEFT — Application form (scrollable) */}
        <div className="flex flex-1 flex-col overflow-y-auto" style={{ padding: "24px 32px 36px" }}>
          {/* Header */}
          <div className="flex items-center gap-2" style={{ marginBottom: 20 }}>
            <h1 className="text-[24px] leading-[1.1] text-foreground">Applying</h1>
            <button onClick={() => router.back()} className="flex cursor-pointer items-center justify-center border-none bg-transparent text-muted-foreground hover:text-foreground">
              <ChevronRight size={20} />
            </button>
          </div>

          {/* Subtitle */}
          <p className="text-sm text-foreground" style={{ marginBottom: 20 }}>Tell the employer a little about yourself.</p>

          {/* Cover letter */}
          <textarea
            value={coverLetter}
            onChange={(e) => setCoverLetter(e.target.value)}
            className="w-full resize-none rounded-[10px] border border-border-light bg-[#F7F9FC] text-xs leading-[1.6] text-muted-foreground outline-none"
            style={{ height: 140, padding: 16, marginBottom: 28 }}
          />

          {/* Filter questions */}
          <div className="flex flex-col" style={{ gap: 6, marginBottom: 16 }}>
            <h3 className="text-base text-foreground">Filter question</h3>
            <p className="text-xs text-muted-foreground">Please answer in as much detail as possible to expedite the recruitment process.</p>
          </div>

          <div className="flex flex-col" style={{ gap: 20, marginBottom: 28 }}>
            {["Lorem Ipsum Dolor Lorem Ipsum for you?", "Lorem Ipsum Dolor Lorem Ipsum for you?", "Lorem Ipsum Dolor Lorem Ipsum for you?"].map((question, i) => (
              <div key={i} className="flex flex-col" style={{ gap: 8 }}>
                <p className="text-sm text-foreground">{question}</p>
                <textarea
                  placeholder="Type your answer here..."
                  value={answers[i]}
                  onChange={(e) => updateAnswer(i, e.target.value)}
                  className="w-full resize-none rounded-[10px] border border-border-light bg-white text-xs text-foreground outline-none placeholder:text-muted-foreground/30"
                  style={{ height: 50, padding: "10px 14px" }}
                />
              </div>
            ))}
          </div>

          {/* Your CV */}
          <div className="flex flex-col" style={{ gap: 10, marginBottom: 32 }}>
            <h3 className="text-base text-foreground">Your CV</h3>
            <div
              className="flex items-center justify-between rounded-[10px] border border-border-light"
              style={{ padding: "14px 16px", background: "linear-gradient(180deg, #FFFDF7 0%, #FFF8E8 100%)" }}
            >
              <div className="flex items-center gap-2">
                <Link2 size={14} className="text-muted-foreground" />
                <div className="flex flex-col">
                  <span className="text-xs text-primary">May Bozo&apos;s resume file</span>
                  <span className="text-[10px] text-muted-foreground">142 KB</span>
                </div>
              </div>
              <Trash2 size={16} className="cursor-pointer text-red-400 hover:text-red-600" />
            </div>
          </div>

          {/* Submit button */}
          <button
            onClick={() => router.push(`${window.location.pathname}/success`)}
            className="w-full cursor-pointer rounded-[10px] text-base text-white"
            style={{
              height: 50,
              border: "none",
              backgroundImage: "linear-gradient(168deg, #4C96FF 12%, #1667DB 94%)",
              fontFamily: "'Abel', sans-serif",
              flexShrink: 0,
            }}
          >
            Completion and application
          </button>
        </div>

        {/* RIGHT — Sidebar full height */}
        <div className="flex shrink-0 flex-col border-l border-border-light" style={{ width: 280, padding: "24px 20px" }}>
          <div className="flex flex-1 flex-col rounded-2xl bg-white" style={{ padding: "22px 16px", gap: 14, boxShadow: "0 4px 24px rgba(0,0,0,0.08)" }}>
            <h3 className="text-center text-[18px] text-foreground" style={{ lineHeight: 1.2 }}>Candidacy status</h3>
            <p className="text-center text-xs leading-[1.4] text-muted-foreground">
              This is a dummy paragraph text that is intended to fill space in the website design and demonstrate how the actual text will look.
            </p>

            <div className="h-px w-full bg-border-light" />

            <div className="flex items-center justify-between rounded-[10px] border border-border-light bg-[#F7F9FC]" style={{ padding: "10px 12px" }}>
              <span className="text-sm text-foreground">New candidacy</span>
              <div className="flex h-5 w-5 items-center justify-center rounded-full bg-[#20AB7F]">
                <svg width="10" height="10" viewBox="0 0 24 24" fill="white"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" /></svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
