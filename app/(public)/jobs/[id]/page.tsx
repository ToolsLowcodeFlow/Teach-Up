"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { X, Heart, Link2, CheckCircle, XCircle } from "lucide-react";

const rejectedSteps = [
  { label: "New candidacy", status: "done" },
  { label: "Invited for a first interview", status: "done" },
  { label: "Called for a second interview", status: "done" },
  { label: "rejected", status: "rejected" },
];

const acceptedSteps = [
  { label: "New candidacy", status: "done" },
  { label: "Invited for a first interview", status: "done" },
  { label: "Called for a second interview", status: "done" },
  { label: "Accepted", status: "done" },
];

export default function JobDetailPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const applied = searchParams.get("applied") === "true";
  const outcome = searchParams.get("outcome") || "rejected";
  const candidacySteps = outcome === "accepted" ? acceptedSteps : rejectedSteps;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ fontFamily: "'Abel', sans-serif" }}
    >
      {/* Blurred jobs page background */}
      <iframe
        src="/jobs"
        className="absolute inset-0 h-full w-full border-none"
        style={{ filter: "blur(6px)", pointerEvents: "none", opacity: 0.7 }}
        tabIndex={-1}
      />
      <div className="absolute inset-0" style={{ background: "rgba(0,0,0,0.35)" }} onClick={() => router.push(applied ? "/jobs?tab=my" : "/jobs")} />

      <div
        className="relative z-10 flex overflow-hidden rounded-[20px] bg-white"
        style={{ width: "90vw", maxWidth: 960, height: "88vh", boxShadow: "0 20px 60px rgba(0,0,0,0.15)" }}
      >
        {/* LEFT — Job content (scrollable) */}
        <div className="flex-1 overflow-y-auto" style={{ padding: "20px 28px 36px" }}>
          <div className="flex flex-col" style={{ marginBottom: 10 }}>
            <h1 className="text-[22px] leading-[1.1] text-foreground" style={{ marginBottom: 28 }}>Job details</h1>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="rounded-full text-xs text-white" style={{ padding: "4px 14px", backgroundImage: "linear-gradient(135deg, #FF7E7E 0%, #FF4C4C 100%)" }}>Hot job</span>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-foreground">Computer Science</span>
                  <div className="flex h-5 w-5 items-center justify-center rounded-full bg-primary">
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="white"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" /></svg>
                  </div>
                </div>
              </div>
              <div className="flex cursor-pointer items-center gap-2">
                <span className="text-sm" style={{ color: "#FF6B6B" }}>Remove from favorites</span>
                <Heart size={16} style={{ color: "#FF6B6B" }} fill="#FF6B6B" />
              </div>
            </div>
          </div>

          <h2 className="text-[20px] leading-[1.2] text-foreground" style={{ marginBottom: 8 }}>
            Computer Science Teacher for a<br />Recognized College
          </h2>

          <div className="flex items-center gap-4 text-xs" style={{ marginBottom: 20 }}>
            <span className="text-primary">08/12/2025</span>
            <span className="text-muted-foreground">Job number · 84844985</span>
          </div>

          <p className="text-xs leading-[1.5] text-muted-foreground" style={{ marginBottom: 20 }}>
            Lorem Ipsum Dolor Sit Emmet, Consecteur Adipiscing Elite Goler Monferrer Sobert Lorem Shabdach Yehol, Lorem Ipsum Dolor Sit Emmet, Consecteur Adipiscing Elite Goler Monferrer Sobert Lorem Shabdach Yehol, Lorem Ipsum Dolor Sit Emmet, Consecteur Adipiscing Elite Goler Monferrer Sobert Lorem Shabdach Yehol,
          </p>

          <div className="rounded-[10px] border border-border-light" style={{ padding: "14px 18px", marginBottom: 20, background: "linear-gradient(180deg, #F7FAFF 0%, #EEF4FD 100%)" }}>
            <div className="grid grid-cols-5 gap-x-4 gap-y-4 text-center">
              {[
                ["Hours of operation", "Lunch / Dinner"],
                ["role", "Lorem Ipsum"],
                ["Transaction type", "Lorem Ipsum"],
                ["Education stage", "Lorem Ipsum"],
                ["Start date", "08/10/2026"],
                ["training", "Morning training"],
                ["Years of experience", "09"],
                ["Scope of work", "Full-time"],
                ["area", "Tel Aviv, Israel"],
                ["Salary range ₪", "10,000 - 20,000"],
              ].map(([label, value]) => (
                <div key={label} className="flex flex-col gap-0.5">
                  <span className="text-[10px] text-muted-foreground">{label}</span>
                  <span className="text-xs text-foreground">{value}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-2" style={{ marginBottom: 20 }}>
            {["Spanish", "English", "Hebrew"].map((lang) => (
              <span key={lang} className="rounded-full border border-border-light text-xs text-foreground" style={{ padding: "5px 16px" }}>
                {lang}
              </span>
            ))}
          </div>

          <div className="flex flex-col" style={{ gap: 8, marginBottom: 20 }}>
            <h3 className="text-base text-foreground">Company Description</h3>
            <p className="text-xs leading-[1.5] text-muted-foreground">
              Lorem Ipsum Dolor Sit Emmet, Consecteur Adipiscing Elite Goler Monferrer Sobert Lorem Shabdach Yehol, Lorem Ipsum Dolor Sit Emmet, Consecteur Adipiscing Elite Goler Monferrer Sobert Lorem Shabdach Yehol, Lorem Ipsum Dolor Sit Emmet, Consecteur Adipiscing Elite Goler Monferrer Sobert Lorem Shabdach Yehol,
            </p>
            <div className="flex items-center gap-2">
              <div className="h-6 w-6 overflow-hidden rounded-full">
                <img src="/images/job-avatar.png" alt="" className="h-full w-full object-cover" />
              </div>
              <span className="text-xs text-foreground">Company Name: Lor Ipsum</span>
            </div>
          </div>

          <div className="flex flex-col" style={{ gap: 8 }}>
            <h3 className="text-base text-foreground">Attachments</h3>
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center justify-between rounded-[10px] border border-border-light" style={{ padding: "10px 14px", background: "linear-gradient(180deg, #FFFDF7 0%, #FFF8E8 100%)" }}>
                <div className="flex items-center gap-2">
                  <Link2 size={14} className="shrink-0 text-muted-foreground" />
                  <span className="text-xs text-primary">Computer Science Teacher for a Recognized College</span>
                  <span className="text-[10px] text-muted-foreground">142 KB</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT — Sidebar */}
        <div className="flex shrink-0 flex-col border-l border-border-light" style={{ width: 280, padding: "20px" }}>
          {/* Close button */}
          <div className="flex shrink-0 items-start justify-end" style={{ height: 40 }}>
            <button
              onClick={() => router.push(applied ? "/jobs?tab=my" : "/jobs")}
              className="flex cursor-pointer items-center justify-center border-none bg-transparent text-muted-foreground hover:text-foreground"
            >
              <X size={20} />
            </button>
          </div>
          <div className="flex flex-col rounded-2xl bg-white" style={{ padding: "22px 16px", gap: 16, boxShadow: "0 4px 24px rgba(0,0,0,0.08)" }}>
            {applied ? (
              <>
                <h3 className="text-center text-[18px] text-foreground" style={{ lineHeight: 1.2 }}>Candidacy status</h3>
                <p className="text-center text-xs leading-[1.4] text-muted-foreground">
                  This is a dummy paragraph text that is intended to fill space in the website design and demonstrate how the actual text will look.
                </p>
                <div className="flex flex-col" style={{ gap: 10 }}>
                  {candidacySteps.map((step) => (
                    <div key={step.label} className="flex items-center justify-between rounded-[10px] border border-border-light bg-[#F7F9FC]" style={{ padding: "10px 12px" }}>
                      <span className="text-sm text-foreground">{step.label}</span>
                      {step.status === "rejected" ? (
                        <XCircle size={20} className="shrink-0 text-red-400" />
                      ) : (
                        <CheckCircle size={20} className="shrink-0 text-[#20AB7F]" />
                      )}
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <>
                <h3 className="text-center text-[18px] text-foreground" style={{ lineHeight: 1.2 }}>Interested in this job?</h3>
                <p className="text-center text-xs leading-[1.4] text-muted-foreground">
                  This is a dummy paragraph text that is intended to fill space in the website design and demonstrate how the actual text will look.
                </p>
                <button
                  onClick={() => router.push(`${window.location.pathname}/apply`)}
                  className="w-full cursor-pointer rounded-[10px] text-base text-white"
                  style={{ height: 42, border: "none", backgroundImage: "linear-gradient(168deg, #4C96FF 12%, #1667DB 94%)" }}
                >
                  Applying
                </button>

                <div className="h-px w-full bg-border-light" />

                <h4 className="text-[16px] text-foreground">Job sharing</h4>
                {[
                  { label: "Sharing via Facebook", color: "#1877F2", d: "M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" },
                  { label: "Sharing via WhatsApp", color: "#25D366", d: "M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" },
                  { label: "Sharing via LinkedIn", color: "#0A66C2", d: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" },
                ].map((item) => (
                  <button key={item.label} className="flex cursor-pointer items-center justify-between rounded-[10px] border border-border-light bg-[#F7F9FC] text-sm text-foreground" style={{ padding: "10px 12px" }}>
                    <span>{item.label}</span>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill={item.color}><path d={item.d} /></svg>
                  </button>
                ))}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
