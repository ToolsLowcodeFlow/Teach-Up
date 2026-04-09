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

const mockJobs: JobPreviewCard[] = [
  { title: "Computer Science Teacher with at least 4 years of experience", field: "Computer Science", description: "This is a dummy paragraph text that is intended to fill space in the website design and demonstrate how the actual text will look. It can be used...", location: "Jaffa - Tel Aviv", author: "May Bozo", date: "08/12/2025" },
  { title: "Computer Science Teacher with at least 4 years of experience", field: "Computer Science", description: "This is a dummy paragraph text that is intended to fill space in the website design and demonstrate how the actual text will look. It can be used...", location: "Jaffa - Tel Aviv", author: "May Bozo", date: "08/12/2025", tag: "new" },
  { title: "Computer Science Teacher with at least 4 years of experience", field: "Computer Science", description: "This is a dummy paragraph text that is intended to fill space in the website design and demonstrate how the actual text will look. It can be used...", location: "Jaffa - Tel Aviv", author: "May Bozo", date: "08/12/2025" },
  { title: "Computer Science Teacher with at least 4 years of experience", field: "Computer Science", description: "This is a dummy paragraph text that is intended to fill space in the website design and demonstrate how the actual text will look. It can be used...", location: "Jaffa - Tel Aviv", author: "May Bozo", date: "08/12/2025" },
  { title: "Computer Science Teacher with at least 4 years of experience", field: "Computer Science", description: "This is a dummy paragraph text that is intended to fill space in the website design and demonstrate how the actual text will look. It can be used...", location: "Jaffa - Tel Aviv", author: "May Bozo", date: "08/12/2025" },
];

const mockJobs2: JobPreviewCard[] = [
  { title: "Computer Science Teacher with at least 4 years of experience", field: "Computer Science", description: "This is a dummy paragraph text that is intended to fill space in the website design and demonstrate how the actual text will look. It can be used...", location: "Jaffa - Tel Aviv", author: "May Bozo", date: "08/12/2025" },
  { title: "Computer Science Teacher with at least 4 years of experience", field: "Computer Science", description: "This is a dummy paragraph text that is intended to fill space in the website design and demonstrate how the actual text will look. It can be used...", location: "Jaffa - Tel Aviv", author: "May Bozo", date: "08/12/2025" },
  { title: "Computer Science Teacher with at least 4 years of experience", field: "Computer Science", description: "This is a dummy paragraph text that is intended to fill space in the website design and demonstrate how the actual text will look. It can be used...", location: "Jaffa - Tel Aviv", author: "May Bozo", date: "08/12/2025" },
  { title: "Computer Science Teacher with at least 4 years of experience", field: "Computer Science", description: "This is a dummy paragraph text that is intended to fill space in the website design and demonstrate how the actual text will look. It can be used...", location: "Jaffa - Tel Aviv", author: "May Bozo", date: "08/12/2025", tag: "hot" },
];

function JobCard({ job }: { job: JobPreviewCard }) {
  return (
    <div style={{ padding: 20, width: 260 }} className="shrink-0 rounded-2xl bg-white shadow-sm">
      {/* Field badge + tag */}
      <div style={{ marginBottom: 10 }} className="flex items-center justify-between">
        {job.tag && (
          <span
            style={{ padding: "3px 10px" }}
            className={`rounded-full text-xs text-white ${job.tag === "new" ? "bg-success" : "bg-danger"}`}
          >
            {job.tag === "new" ? "New job" : "Hot job"}
          </span>
        )}
        <div className="ms-auto flex items-center gap-1 text-xs text-foreground">
          {job.field}
          <BadgeCheck className="h-4 w-4 text-primary" />
        </div>
      </div>

      {/* Title */}
      <p style={{ marginBottom: 8 }} className="text-sm font-medium leading-tight text-foreground">
        {job.title}
      </p>

      {/* Description */}
      <p style={{ marginBottom: 10 }} className="text-xs leading-relaxed text-muted-foreground">
        {job.description}
      </p>

      {/* Location */}
      <div style={{ marginBottom: 14 }} className="flex items-center gap-1.5 text-xs text-foreground">
        <span>{job.location}</span>
        <MapPin className="h-3 w-3 text-primary" />
      </div>

      {/* Author */}
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
  const { t } = useLanguage();

  return (
    <section style={{ paddingBottom: 60 }} className="bg-[#F7F9FC]">
      {/* Marquee */}
      <div className="overflow-hidden border-y border-border-light bg-white py-2.5">
        <div className="flex animate-marquee items-center whitespace-nowrap">
          {Array.from({ length: 20 }, (_, i) => (
            <span key={i} className="flex items-center text-sm text-muted-foreground" style={{ marginRight: 32 }}>
              <span className="text-xs text-primary" style={{ marginRight: 6 }}>✦</span>TEACH UP
            </span>
          ))}
        </div>
      </div>

      {/* Title */}
      <div style={{ padding: "60px 40px 40px" }} className="flex flex-col items-center text-center">
        <h2 style={{ marginBottom: 16 }} className="max-w-2xl text-center text-4xl leading-tight text-foreground">
          Leading jobs in the world of education and teaching.
        </h2>
        <p className="max-w-2xl text-center text-sm leading-relaxed text-muted-foreground">
          Here, a current selection of positions in the world of education awaits. Simply browse through the positions, find what feels right, and embark on a new professional path that allows you to make an impact.
        </p>
      </div>

      {/* Job cards row 1 — moves right to left */}
      <div style={{ marginBottom: 20, padding: "10px 0" }} className="overflow-hidden">
        <div className="flex animate-scroll-left gap-5" style={{ paddingInline: 40 }}>
          {[...mockJobs, ...mockJobs].map((job, i) => (
            <JobCard key={i} job={job} />
          ))}
        </div>
      </div>

      {/* Job cards row 2 — moves left to right */}
      <div style={{ padding: "10px 0" }} className="overflow-hidden">
        <div className="flex animate-scroll-right gap-5" style={{ paddingInline: 40 }}>
          {[...mockJobs2, ...mockJobs2].map((job, i) => (
            <JobCard key={i} job={job} />
          ))}
        </div>
      </div>
    </section>
  );
}
