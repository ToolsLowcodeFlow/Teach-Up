"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { X, MoreHorizontal, MapPin, BadgeCheck, Calendar } from "lucide-react";

const postedJobs = Array.from({ length: 6 }, (_, i) => ({
  id: i + 1,
  title: "Computer Science Teacher",
  badge: "with at least 4 years of experience",
  description: "This is a dummy paragraph text that aims to fill a space in the website design and demonstrate how the actual text will look. It can be used...",
  date: "09/12/2026",
  location: "Jaffa - Tel Aviv",
  salary: "30,000 - 50,000",
  status: i < 2 ? "Open position" : "Closed position",
  candidates: "1,240",
}));

export default function SupplierDetailPage() {
  const router = useRouter();
  const [jobMenuOpen, setJobMenuOpen] = useState<number | null>(null);

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto"
      style={{ fontFamily: "'Abel', sans-serif" }}
    >
      {/* Blurred suppliers page background */}
      <iframe
        src="/admin/suppliers"
        className="fixed inset-0 h-screen w-screen border-none"
        style={{ filter: "blur(6px)", pointerEvents: "none", opacity: 0.7 }}
        tabIndex={-1}
      />
      <div className="fixed inset-0 h-screen w-screen" style={{ background: "rgba(0,0,0,0.35)" }} onClick={() => router.back()} />

      <div
        className="relative z-10 my-8 w-full max-w-[520px] rounded-2xl bg-white"
        style={{ padding: "24px 28px 40px", boxShadow: "0 20px 60px rgba(0,0,0,0.15)" }}
      >
        {/* Company header + Close */}
        <div className="flex items-start justify-between" style={{ marginBottom: 16 }}>
        <div className="flex items-start gap-4">
          <div className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-[#0E1117]" style={{ padding: 8 }}>
            <img src="/images/chat-company-logo.png" alt="" className="h-full w-full object-contain" />
          </div>
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <h1 className="text-[22px] leading-[1.1] text-foreground">Tel Aviv University</h1>
              <span className="rounded-full bg-primary text-[10px] text-white" style={{ padding: "2px 10px" }}>new</span>
            </div>
            <p className="text-xs text-muted-foreground">Service Type: Lorem Ipsum | Employer Type: Lorem Ipsum</p>
          </div>
        </div>
          <button onClick={() => router.back()} className="flex shrink-0 cursor-pointer items-center justify-center border-none bg-transparent text-muted-foreground hover:text-foreground">
            <X size={20} />
          </button>
        </div>

        {/* Contact info */}
        <div className="flex items-center gap-6 text-xs text-foreground" style={{ marginBottom: 20 }}>
          <span>Email address: mayffd@gmail.com 📋</span>
          <span>Phone number: 052-7049494 📋</span>
        </div>

        {/* Action buttons */}
        <div className="flex items-center gap-4" style={{ marginBottom: 28 }}>
          <button className="flex-1 cursor-pointer rounded-lg border border-foreground bg-white py-3 text-sm text-foreground transition-colors hover:bg-gray-50">
            Provider blocking
          </button>
          <button onClick={() => router.push("/admin/suppliers/delete/1")} className="flex-1 cursor-pointer rounded-lg border border-red-400 bg-white py-3 text-sm text-red-400 transition-colors hover:bg-red-50">
            Delete a provider
          </button>
        </div>

        {/* System activity */}
        <h3 className="text-base text-foreground" style={{ marginBottom: 12 }}>System activity</h3>
        <div className="grid grid-cols-3 gap-3" style={{ marginBottom: 28 }}>
          <div className="flex flex-col items-center gap-1 rounded-xl border border-border-light bg-white" style={{ padding: "14px 10px" }}>
            <span className="text-[10px] text-muted-foreground">orbit</span>
            <span className="text-lg text-foreground">₪100 monthly</span>
          </div>
          <div className="flex flex-col items-center gap-1 rounded-xl border border-border-light bg-white" style={{ padding: "14px 10px" }}>
            <span className="text-[10px] text-muted-foreground">Jobs filled</span>
            <span className="text-lg text-foreground">380</span>
          </div>
          <div className="flex flex-col items-center gap-1 rounded-xl border border-border-light bg-white" style={{ padding: "14px 10px" }}>
            <span className="text-[10px] text-muted-foreground">Jobs in the system</span>
            <span className="text-lg text-foreground">260/1000</span>
          </div>
        </div>

        {/* Posted jobs */}
        <h3 className="text-base text-foreground" style={{ marginBottom: 12 }}>Posted jobs</h3>
        <div className="grid grid-cols-2 gap-4">
          {postedJobs.map((job) => (
            <div key={job.id} onClick={() => router.push(`${window.location.pathname}/job/${job.id}`)} className="flex cursor-pointer flex-col rounded-xl border border-border-light bg-white transition-shadow hover:shadow-md" style={{ padding: "14px" }}>
              {/* Title row */}
              <div className="flex items-start justify-between" style={{ marginBottom: 6 }}>
                <div className="flex items-start gap-1.5">
                  <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full" style={{ backgroundImage: "linear-gradient(140deg, #4C96FF 12%, #1667DB 94%)" }}>
                    <svg width="8" height="8" viewBox="0 0 24 24" fill="white"><path d="M20 6h-4V4c0-1.1-.9-2-2-2h-4c-1.1 0-2 .9-2 2v2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm-8-2h4v2h-4V4z" /></svg>
                  </div>
                  <div className="flex flex-col">
                    <div className="flex items-center gap-1">
                      <span className="text-xs leading-[1.2] text-foreground">{job.title}</span>
                      <BadgeCheck size={12} className="shrink-0 text-primary" />
                    </div>
                    <span className="text-[9px] leading-[1.2] text-primary">{job.badge}</span>
                  </div>
                </div>
                <div className="relative">
                  <button onClick={() => setJobMenuOpen(jobMenuOpen === job.id ? null : job.id)} className="flex cursor-pointer items-center justify-center border-none bg-transparent text-muted-foreground">
                    <MoreHorizontal size={16} />
                  </button>
                  {jobMenuOpen === job.id && (
                    <>
                      <div className="fixed inset-0 z-10" onClick={() => setJobMenuOpen(null)} />
                      <div className="absolute right-0 top-6 z-20 flex min-w-36 flex-col gap-0.5 rounded-lg border border-border-light bg-white shadow-lg" style={{ padding: "8px 12px" }}>
                        <button onClick={() => setJobMenuOpen(null)} className="w-full whitespace-nowrap py-1 text-start text-[11px] text-foreground hover:text-primary">Become a hot job</button>
                        <button onClick={() => setJobMenuOpen(null)} className="w-full whitespace-nowrap py-1 text-start text-[11px] text-foreground hover:text-primary">Job hopping</button>
                        <button onClick={() => setJobMenuOpen(null)} className="w-full whitespace-nowrap py-1 text-start text-[11px] text-foreground hover:text-primary">Ad blocking</button>
                        <button onClick={() => setJobMenuOpen(null)} className="w-full whitespace-nowrap py-1 text-start text-[11px] text-red-400 hover:text-red-600">Deleting an ad</button>
                      </div>
                    </>
                  )}
                </div>
              </div>

              <p className="text-[9px] leading-[1.3] text-muted-foreground" style={{ marginBottom: 6 }}>{job.description}</p>

              {/* Date + Location */}
              <div className="flex items-center gap-3 text-[9px] text-foreground" style={{ marginBottom: 6 }}>
                <span className="flex items-center gap-1"><Calendar size={8} className="text-muted-foreground" /> Date: {job.date}</span>
                <span className="flex items-center gap-1"><MapPin size={8} className="text-primary" /> {job.location}</span>
              </div>

              {/* Salary */}
              <div className="flex items-center justify-between text-[9px]" style={{ marginBottom: 8 }}>
                <span className="text-muted-foreground">Salary ₪</span>
                <span className="text-sm text-foreground">{job.salary}</span>
              </div>

              {/* Status badge */}
              <span
                className="self-start rounded-full text-[9px]"
                style={{
                  padding: "3px 10px",
                  color: job.status === "Open position" ? "#20AB7F" : "#FF676A",
                  border: `1px solid ${job.status === "Open position" ? "#20AB7F" : "#FF676A"}`,
                  marginBottom: 8,
                }}
              >
                {job.status}
              </span>

              {/* Total candidates */}
              <div className="rounded-lg bg-[#F3F3F6] text-center text-[9px] text-muted-foreground" style={{ padding: "8px 10px" }}>
                Total candidates · {job.candidates}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
