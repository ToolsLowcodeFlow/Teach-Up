"use client";

import { BadgeCheck, MapPin } from "lucide-react";
import { useLanguage } from "@/lib/i18n/context";

interface JobPreviewCard {
  title: string;
  field: string;
  description: string;
  location: string;
  author: string;
  date: string;
  tag?: "new" | "hot";
}

function JobCard({ job, isHe }: { job: JobPreviewCard; isHe: boolean }) {
  const topGradient = job.tag === "hot"
    ? "linear-gradient(180deg, rgba(255,75,75,0.15) 0%, transparent 40%)"
    : job.tag === "new"
    ? "linear-gradient(180deg, rgba(32,171,127,0.15) 0%, transparent 40%)"
    : "none";
  const bottomGradient = job.tag === "hot"
    ? "linear-gradient(0deg, rgba(255,75,75,0.08) 0%, transparent 30%)"
    : job.tag === "new"
    ? "linear-gradient(0deg, rgba(32,171,127,0.08) 0%, transparent 30%)"
    : "none";

  return (
    <div style={{ padding: 20, width: 260, backgroundImage: `${topGradient}, ${bottomGradient}` }} className="shrink-0 rounded-2xl bg-white shadow-sm">
      <div style={{ marginBottom: 10 }} className="flex items-center justify-between">
        {job.tag && (
          <span
            style={{ padding: "3px 10px" }}
            className={`rounded-full text-xs text-white ${job.tag === "new" ? "bg-success" : "bg-danger"}`}
          >
            {job.tag === "new" ? (isHe ? "משרה חדשה" : "New job") : (isHe ? "משרה חמה" : "Hot job")}
          </span>
        )}
        <div className="ms-auto flex items-center gap-1 text-xs text-foreground">
          {job.field}
          <BadgeCheck className="h-4 w-4 text-primary" />
        </div>
      </div>
      <p style={{ marginBottom: 8 }} className="text-sm font-medium leading-tight text-foreground">{job.title}</p>
      <p style={{ marginBottom: 10 }} className="text-xs leading-relaxed text-muted-foreground">{job.description}</p>
      <div style={{ marginBottom: 14 }} className="flex items-center gap-1.5 text-xs text-foreground">
        <span>{job.location}</span>
        <MapPin className="h-3 w-3 text-primary" />
      </div>
      <div className="flex items-center gap-2 border-t border-border-light pt-3">
        <div className="h-7 w-7 shrink-0 overflow-hidden rounded-full bg-muted-foreground/20">
          <img src="/images/avatar-woman.jpg" alt={job.author} className="h-full w-full object-cover" />
        </div>
        <span className="text-xs text-muted-foreground">{job.author} · {job.date}</span>
      </div>
    </div>
  );
}

export function LeadingJobsSection() {
  const { locale } = useLanguage();
  const isHe = locale === "he";

  const title = isHe ? "משרות מובילות בעולם החינוך וההוראה." : "Leading jobs in the world of education and teaching.";
  const subtitle = isHe
    ? "כאן מחכה לכם מבחר עדכני של משרות בעולם החינוך. פשוט דפדפו בין המשרות, מצאו את מה שמרגיש נכון, וצאו לדרך מקצועית חדשה שמאפשרת לכם להשפיע."
    : "Here, a current selection of positions in the world of education awaits. Simply browse through the positions, find what feels right, and embark on a new professional path that allows you to make an impact.";

  const field = isHe ? "מדעי המחשב" : "Computer Science";
  const jobTitle = isHe ? "מורה למדעי המחשב עם לפחות 4 שנות ניסיון" : "Computer Science Teacher with at least 4 years of experience";
  const desc = isHe ? "זהו טקסט דמה לפסקה שמטרתו למלא מקום בעיצוב האתר ולהדגים כיצד ייראה הטקסט בפועל. ניתן להשתמש בו..." : "This is a dummy paragraph text that is intended to fill space in the website design and demonstrate how the actual text will look. It can be used...";
  const loc = isHe ? "יפו - תל אביב" : "Jaffa - Tel Aviv";
  const author = isHe ? "מאי בוזו" : "May Bozo";

  const mockJobs: JobPreviewCard[] = [
    { title: jobTitle, field, description: desc, location: loc, author, date: "08/12/2025" },
    { title: jobTitle, field, description: desc, location: loc, author, date: "08/12/2025", tag: "new" },
    { title: jobTitle, field, description: desc, location: loc, author, date: "08/12/2025" },
    { title: jobTitle, field, description: desc, location: loc, author, date: "08/12/2025" },
    { title: jobTitle, field, description: desc, location: loc, author, date: "08/12/2025" },
  ];

  const mockJobs2: JobPreviewCard[] = [
    { title: jobTitle, field, description: desc, location: loc, author, date: "08/12/2025" },
    { title: jobTitle, field, description: desc, location: loc, author, date: "08/12/2025" },
    { title: jobTitle, field, description: desc, location: loc, author, date: "08/12/2025" },
    { title: jobTitle, field, description: desc, location: loc, author, date: "08/12/2025", tag: "hot" },
  ];

  return (
    <section style={{ paddingBottom: 60 }} className="bg-[#F7F9FC]">
      <div className="overflow-hidden border-y border-border-light bg-white py-2.5">
        <div className="flex animate-marquee items-center whitespace-nowrap">
          {Array.from({ length: 20 }, (_, i) => (
            <span key={i} className="flex items-center text-sm text-muted-foreground" style={{ marginRight: 32 }}>
              <span className="text-xs text-primary" style={{ marginRight: 6 }}>✦</span>TEACH UP
            </span>
          ))}
        </div>
      </div>

      <div style={{ padding: "60px 40px 40px" }} className="flex flex-col items-center text-center">
        <h2 style={{ marginBottom: 16 }} className="max-w-2xl text-center text-4xl leading-tight text-foreground">{title}</h2>
        <p className="max-w-2xl text-center text-sm leading-relaxed text-muted-foreground">{subtitle}</p>
      </div>

      <div style={{ marginBottom: 20, padding: "10px 0" }} className="overflow-hidden">
        <div className="flex animate-scroll-left gap-5" style={{ paddingInline: 40 }}>
          {[...mockJobs, ...mockJobs].map((job, i) => (
            <JobCard key={i} job={job} isHe={isHe} />
          ))}
        </div>
      </div>

      <div style={{ padding: "10px 0" }} className="overflow-hidden">
        <div className="flex animate-scroll-right gap-5" style={{ paddingInline: 40 }}>
          {[...mockJobs2, ...mockJobs2].map((job, i) => (
            <JobCard key={i} job={job} isHe={isHe} />
          ))}
        </div>
      </div>
    </section>
  );
}
