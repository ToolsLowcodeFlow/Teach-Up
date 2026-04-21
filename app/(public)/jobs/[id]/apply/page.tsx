"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronRight, Link2, Trash2 } from "lucide-react";
import { useLanguage } from "@/lib/i18n/context";

export default function JobApplyPage() {
  const router = useRouter();
  const { t, direction } = useLanguage();
  const jd = t.jobDetails;
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
      style={{ fontFamily: "'Heebo', sans-serif" }}
    >
      <div className="fixed inset-0" style={{ background: "rgba(0,0,0,0.4)", backdropFilter: "blur(8px)", WebkitBackdropFilter: "blur(8px)" }} onClick={() => router.back()} />

      <div
        className="relative z-10 flex overflow-hidden rounded-[20px] bg-white"
        style={{ width: "90vw", maxWidth: 960, height: "88vh", boxShadow: "0 20px 60px rgba(0,0,0,0.15)" }}
        dir={direction}
      >
        {/* LEFT — Application form */}
        <div className="flex flex-1 flex-col">
          {/* Fixed Header */}
          <div className="shrink-0 border-b border-border-light" style={{ padding: "24px 32px 16px" }}>
            <div className="flex items-center gap-2">
              <h1 className="text-[24px] leading-[1.1] text-foreground">{jd.applying}</h1>
              <button onClick={() => router.back()} className="flex cursor-pointer items-center justify-center border-none bg-transparent text-muted-foreground hover:text-foreground">
                <ChevronRight size={20} />
              </button>
            </div>
          </div>

          {/* Scrollable content */}
          <div className="flex-1 overflow-y-auto" style={{ padding: "20px 32px 36px" }}>
          {/* Subtitle */}
          <p className="text-sm text-foreground" style={{ marginBottom: 20 }}>{jd.tellEmployer}</p>

          {/* Cover letter */}
          <textarea
            value={coverLetter}
            onChange={(e) => setCoverLetter(e.target.value)}
            className="w-full resize-none rounded-[10px] border border-border-light bg-[#F7F9FC] text-xs leading-[1.6] text-muted-foreground outline-none"
            style={{ height: 140, padding: 16, marginBottom: 28 }}
          />

          {/* Filter questions */}
          <div className="flex flex-col" style={{ gap: 6, marginBottom: 16 }}>
            <h3 className="text-base text-foreground">{jd.filterQuestion}</h3>
            <p className="text-xs text-muted-foreground">{jd.filterQuestionDesc}</p>
          </div>

          <div className="flex flex-col" style={{ gap: 20, marginBottom: 28 }}>
            {["Lorem Ipsum Dolor Lorem Ipsum for you?", "Lorem Ipsum Dolor Lorem Ipsum for you?", "Lorem Ipsum Dolor Lorem Ipsum for you?"].map((question, i) => (
              <div key={i} className="flex flex-col" style={{ gap: 8 }}>
                <p className="text-sm text-foreground">{question}</p>
                <textarea
                  placeholder={jd.typeAnswerHere}
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
            <h3 className="text-base text-foreground">{jd.yourCV}</h3>
            <div
              className="flex items-center justify-between rounded-[10px] border border-border-light"
              style={{ padding: "14px 16px", background: "linear-gradient(180deg, #FFFDF7 0%, #FFF8E8 100%)" }}
            >
              <div className="flex items-center gap-2">
                <Link2 size={14} className="text-muted-foreground" />
                <div className="flex flex-col">
                  <span className="text-xs text-primary">{jd.resumeFileName}</span>
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
              fontFamily: "'Heebo', sans-serif",
              flexShrink: 0,
            }}
          >
            {jd.completionAndApplication}
          </button>
          </div>
        </div>

        {/* RIGHT — Sidebar full height */}
        <div className="flex shrink-0 flex-col border-l border-border-light" style={{ width: 280, padding: "24px 20px" }}>
          <div className="flex flex-1 flex-col rounded-2xl bg-white" style={{ padding: "22px 16px", gap: 14, boxShadow: "0 4px 24px rgba(0,0,0,0.08)" }}>
            <h3 className="text-center text-[18px] text-foreground" style={{ lineHeight: 1.2 }}>{jd.candidacyStatus}</h3>
            <p className="text-center text-xs leading-[1.4] text-muted-foreground">
              {jd.candidacyStatusDesc}
            </p>

            <div className="h-px w-full bg-border-light" />

            <div className="flex items-center justify-between rounded-[10px] border border-border-light bg-[#F7F9FC]" style={{ padding: "10px 12px" }}>
              <span className="text-sm text-foreground">{jd.newCandidacy}</span>
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
