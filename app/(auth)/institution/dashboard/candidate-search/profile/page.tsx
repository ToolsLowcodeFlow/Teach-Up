"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Mail, MapPin, Phone, BadgeCheck, Link2, ChevronLeft, ChevronRight, MessageSquare } from "lucide-react";
import { useLanguage } from "@/lib/i18n/context";
import { ReviewModal } from "@/components/dashboard/review-modal";

function getMockWork(isHe: boolean) {
  const title = isHe ? "מרצה בכיר" : "Senior Lecturer";
  const inst = isHe ? "המכללה למנהל" : "College of Management";
  return [
    { period: "Jan 2020 - Aug 2023", title, institution: inst },
    { period: "Jan 2020 - Aug 2023", title, institution: inst },
    { period: "Jan 2020 - Aug 2023", title, institution: inst },
    { period: "Jan 2020 - Aug 2023", title, institution: inst },
  ];
}

export default function CandidateSearchProfilePage() {
  const { t, locale } = useLanguage();
  const isHe = locale === "he";
  const router = useRouter();
  const [reviewOpen, setReviewOpen] = useState(false);
  const mockWorkExperience = getMockWork(isHe);

  const detailsGrid = [
    { label: t.candidateProfile.teachingPreferences, value: "Lorem Ipsum" },
    { label: t.candidateProfile.dealerType, value: "Lorem Ipsum" },
    { label: t.candidateProfile.mobileWithCar, value: isHe ? "כן" : "yes" },
    { label: t.candidateProfile.yearsOfExperience, value: "04" },
    { label: t.candidateProfile.gender, value: isHe ? "נקבה" : "female" },
  ];

  const skillTags = [isHe ? "ספרדית" : "Spanish", isHe ? "ספרדית" : "Spanish", isHe ? "ספרדית" : "Spanish", isHe ? "אנגלית" : "English", isHe ? "עברית" : "Hebrew"];
  const languageTags = [isHe ? "עברית" : "Hebrew", isHe ? "אנגלית" : "English", isHe ? "ספרדית" : "Spanish", isHe ? "ספרדית" : "Spanish", isHe ? "ספרדית" : "Spanish"];

  return (
    <div className="w-full">
      {/* Blue gradient banner */}
      <div className="relative h-16 overflow-hidden bg-linear-to-r from-[#D6E8FF] to-background">
        <div className="pointer-events-none absolute inset-0 flex" style={{ opacity: 0.35 }}>
          {Array.from({ length: 12 }, (_, i) => (
            <div key={i} style={{ width: 96, height: 96, border: "2px solid white", marginRight: -2, background: i === 2 || i === 8 ? "rgba(255,255,255,0.5)" : "transparent" }} />
          ))}
        </div>
        <div style={{ padding: "0 40px" }} className="relative flex h-full items-center gap-2 text-sm text-foreground">
          <button onClick={() => router.push("/institution/dashboard/candidate-search")} className="flex h-8 w-8 items-center justify-center rounded-full transition-colors hover:bg-white/50">
            {isHe ? <ChevronRight className="h-5 w-5 text-foreground" /> : <ChevronLeft className="h-5 w-5 text-foreground" />}
          </button>
          <span>{isHe ? "מורה למדעי המחשב למכללה מוכרת" : "Computer Science Teacher for a Recognized College"}</span>
        </div>
      </div>

      {/* Main content */}
      <div style={{ padding: "32px 40px 64px" }}>
        <div className="flex flex-col gap-8 lg:flex-row lg:gap-12">
          {/* Left: Avatar */}
          <div className="hidden lg:block">
            <div className="h-50 w-50 overflow-hidden rounded-2xl bg-[#E8EEF7]">
              <div className="flex h-full w-full items-center justify-center">
                <div className="h-24 w-24 rounded-full bg-primary/30" />
              </div>
            </div>
          </div>

          {/* Center: Name + Bio + Details */}
          <div className="flex-1">
            <h1 style={{ marginBottom: 8 }} className="text-3xl font-medium text-foreground">
              {isHe ? "מאי בוזו" : "May Bozo"}
            </h1>
            <div style={{ marginBottom: 16 }} className="flex items-center gap-3 text-sm text-muted-foreground">
              <span>{isHe ? "מורה" : "Teacher"}</span>
              <div className="flex items-center gap-1 text-foreground">
                {isHe ? "מדעי המחשב" : "Computer Science"}
                <BadgeCheck className="h-4 w-4 text-primary" />
              </div>
            </div>

            <p style={{ marginBottom: 24 }} className="text-sm leading-relaxed text-muted-foreground">
              {isHe
                ? "זהו טקסט דמה לפסקה שמטרתו למלא מקום בעיצוב האתר ולהדגים כיצד ייראה הטקסט בפועל. ניתן להשתמש בו כדי להמחיש את העיצוב ולהציג את המבנה הכללי של הדף. זהו טקסט דמה לפסקה שמטרתו למלא מקום בעיצוב האתר ולהדגים כיצד ייראה הטקסט בפועל."
                : "Some leaves of Ipsum dolor sit amet, consectetur adipiscing elite goler monferr sobert lorm shebts yhol, Lorem Ipsum dolor sit amet, consectetur adipiscing elite goler monferr sobert lorm shebts yhol, Lorem Ipsum dolor sit amet, consectetur adipiscing alite goler monferr sobert lorm shebts yhol, Lorem Ipsum dolor habindtham's,"}
            </p>

            {/* Details grid */}
            <div style={{ marginBottom: 24 }} className="grid grid-cols-5 gap-4">
              {detailsGrid.map((item) => (
                <div key={item.label} className="flex flex-col gap-1 text-center">
                  <span className="text-xs text-muted-foreground">{item.label}</span>
                  <span className="text-sm font-medium text-foreground">{item.value}</span>
                </div>
              ))}
            </div>

            {/* Resume */}
            <p style={{ marginBottom: 10 }} className="text-sm text-foreground">
              {t.candidateProfile.resume}
            </p>
            <div style={{ padding: "14px 16px" }} className="rounded-xl border border-border-light bg-[#F0F4FA]">
              <div className="flex items-center gap-2">
                <Link2 className="h-5 w-5 text-primary/60" />
                <div className="flex flex-col gap-0.5">
                  <span className="text-sm text-primary">{isHe ? "קובץ קורות חיים של מאי בוזו" : "May Bozo's resume file"}</span>
                  <span className="text-xs text-muted-foreground">142 KB</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Actions */}
          <div className="flex w-full flex-col gap-4 lg:w-55">
            <button
              onClick={() => setReviewOpen(true)}
              style={{ padding: "12px 24px" }}
              className="flex cursor-pointer items-center justify-center gap-2 rounded-xl border-2 border-foreground text-sm text-foreground transition-colors hover:bg-gray-50"
            >
              <MessageSquare className="h-4 w-4" />
              {t.candidateProfile.sendMessage}
            </button>

            <div style={{ marginTop: 8 }} className="flex flex-col gap-3">
              <div className="flex items-center gap-2 text-sm text-foreground">
                <MapPin className="h-4 w-4 text-success" />
                <span>{isHe ? "יפו - תל אביב, ישראל" : "Jaffa - Tel Aviv, Israel"}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-foreground">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span>Loramipsum@gmail.com</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-foreground">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <span>052 - 70939174</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom section */}
        <div style={{ marginTop: 40 }} className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          {/* Left: Work Experience */}
          <div className="flex flex-col gap-8">
            <div style={{ padding: "28px 28px 36px" }} className="rounded-2xl bg-white">
              <h3 style={{ marginBottom: 20 }} className="text-xl font-medium text-foreground">
                {t.candidateProfile.workExperience}
              </h3>
              <div className="flex flex-col gap-3">
                {mockWorkExperience.map((exp, i) => (
                  <div key={i} style={{ padding: "14px 16px" }} className="flex items-center gap-3 rounded-xl bg-[#F7F9FC]">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary">
                      <MessageSquare className="h-4 w-4 text-white" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-sm font-medium text-foreground">{exp.title}</span>
                      <span className="text-xs text-muted-foreground">{exp.institution}</span>
                    </div>
                    <span className="ms-auto text-xs text-muted-foreground">{exp.period}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Skills & Languages */}
          <div style={{ padding: 28 }} className="self-start rounded-2xl bg-white">
            <h3 style={{ marginBottom: 16 }} className="text-xl font-medium text-foreground">
              {t.candidateProfile.skills}
            </h3>
            <div style={{ marginBottom: 28 }} className="flex flex-wrap gap-2">
              {skillTags.map((tag, i) => (
                <span key={i} style={{ padding: "8px 18px" }} className="rounded-full bg-[#F7F9FC] text-sm text-foreground">{tag}</span>
              ))}
            </div>

            <h3 style={{ marginBottom: 16 }} className="text-xl font-medium text-foreground">
              {t.candidateProfile.languages}
            </h3>
            <div className="flex flex-wrap gap-2">
              {languageTags.map((tag, i) => (
                <span key={i} style={{ padding: "8px 18px" }} className="rounded-full bg-[#F7F9FC] text-sm text-foreground">{tag}</span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <ReviewModal open={reviewOpen} onOpenChange={setReviewOpen} />
    </div>
  );
}
