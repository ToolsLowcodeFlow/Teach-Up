"use client";

import { useState } from "react";
import { Check, Mail, MapPin, Phone, BadgeCheck, Link2, ChevronRight, ChevronUp, MessageSquare } from "lucide-react";
import { useLanguage } from "@/lib/i18n/context";

const mockWorkExperience = [
  { period: "Jan 2020 - Aug 2023", title: "Senior Lecturer", institution: "College of Management" },
  { period: "Jan 2020 - Aug 2023", title: "Senior Lecturer", institution: "College of Management" },
  { period: "Jan 2020 - Aug 2023", title: "Senior Lecturer", institution: "College of Management" },
  { period: "Jan 2020 - Aug 2023", title: "Senior Lecturer", institution: "College of Management" },
];

const mockCertificates = [
  { institution: "Name of the institution: Lorem Ipsum", description: "Lorem Ipsum Dolor Lumbihabal Basibhasbahal Saba Sabi", hasFile: true },
  { institution: "Institution Name: Lorem Ipsum", description: "Lorem Ipsum Dolor Lumbihabal Basibhasbahal Saba Sabi", hasFile: false },
  { institution: "Institution Name: Lorem Ipsum", description: "Lorem Ipsum Dolor Lumbihabal Basibhasbahal Saba Sabi", hasFile: true },
  { institution: "Name of the institution: Lorem Ipsum", description: "Lorem Ipsum Dolor Lumbihabal Basibhasbahal Saba Sabi", hasFile: false },
];

function ApplyDropdown() {
  const { t } = useLanguage();
  const [open, setOpen] = useState(false);

  const options = [
    { label: t.candidateProfile.invitedFirstInterview, color: "bg-success" },
    { label: t.candidateProfile.calledSecondInterview, color: "bg-success" },
    { label: t.candidateProfile.accepted, color: "bg-success" },
    { label: t.candidateProfile.rejected, color: "bg-danger" },
  ];

  return (
    <div className="flex w-full flex-col lg:w-55">
      <div className="relative">
        <button
          onClick={() => setOpen(!open)}
          style={{ padding: "14px 24px" }}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-success text-base text-white transition-colors hover:bg-success/90"
        >
          <ChevronUp className={`h-5 w-5 transition-transform ${open ? "" : "rotate-180"}`} />
          {t.candidateProfile.apply}
        </button>

        {open && (
          <>
            <div className="fixed inset-0 z-10" onClick={() => setOpen(false)} />
            <div
              style={{ padding: 12 }}
              className="absolute start-0 top-full z-20 mt-2 flex w-full flex-col gap-2 rounded-2xl bg-white shadow-xl"
            >
              {options.map((opt) => (
                <button
                  key={opt.label}
                  onClick={() => setOpen(false)}
                  style={{ padding: "12px 16px" }}
                  className={`w-full rounded-xl text-sm text-white transition-opacity hover:opacity-90 ${opt.color}`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default function CandidateProfilePage() {
  const { t } = useLanguage();

  const detailsGrid = [
    { label: t.candidateProfile.teachingPreferences, value: "Lorem Ipsum" },
    { label: t.candidateProfile.dealerType, value: "Lorem Ipsum" },
    { label: t.candidateProfile.mobileWithCar, value: "yes" },
    { label: t.candidateProfile.yearsOfExperience, value: "04" },
    { label: t.candidateProfile.gender, value: "female" },
  ];

  const skillTags = ["Spanish", "Spanish", "Spanish", "English", "Hebrew"];
  const languageTags = ["Spanish", "Spanish", "Spanish", "English", "Hebrew"];

  return (
    <div className="w-full">
      {/* Blue gradient banner with grid pattern */}
      <div className="relative h-16 overflow-hidden bg-linear-to-r from-[#D6E8FF] to-background">
        {/* Grid boxes pattern */}
        <div className="pointer-events-none absolute inset-0 flex" style={{ opacity: 0.35 }}>
          {Array.from({ length: 12 }, (_, i) => (
            <div
              key={i}
              style={{
                width: 96,
                height: 96,
                border: "2px solid white",
                marginRight: -2,
                background: i === 2 || i === 8 ? "rgba(255,255,255,0.5)" : "transparent",
              }}
            />
          ))}
        </div>
        {/* Breadcrumb */}
        <div style={{ padding: "0 40px" }} className="relative flex h-full items-center gap-2 text-sm text-foreground">
          <span>Computer Science Teacher for a Recognized College</span>
          <ChevronRight className="h-4 w-4" />
        </div>
      </div>

      {/* Main content */}
      <div style={{ padding: "32px 40px 64px" }}>
        {/* Profile header */}
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
              May Bozo
            </h1>
            <div style={{ marginBottom: 16 }} className="flex items-center gap-3 text-sm text-muted-foreground">
              <span>Teacher</span>
              <div className="flex items-center gap-1 text-foreground">
                Computer Science
                <BadgeCheck className="h-4 w-4 text-primary" />
              </div>
            </div>

            <p style={{ marginBottom: 24 }} className="text-sm leading-relaxed text-muted-foreground">
              Some leaves of Ipsum dolor sit amet, consectetur adipiscing elite goler monferr sobert lorm shebts yhol, Lorem
              Ipsum dolor sit amet, consectetur adipiscing elite goler monferr sobert lorm shebts yhol, Lorem Ipsum dolor sit
              amet, consectetur adipiscing alite goler monferr sobert lorm shebts yhol, Lorem Ipsum dolor sit amet,
              consectetur adipiscing elite goler monferr sobert lorm shebts yhol, Lorem Ipsum dolor habindtham&apos;s,
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
            <div
              style={{ padding: "14px 16px" }}
              className="rounded-xl border border-border-light bg-[#F0F4FA]"
            >
              <div className="flex items-center gap-2">
                <Link2 className="h-5 w-5 text-primary/60" />
                <div className="flex flex-col gap-0.5">
                  <span className="text-sm text-primary">May Bozo&apos;s resume file</span>
                  <span className="text-xs text-muted-foreground">142 KB</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Actions */}
          <div className="flex w-full flex-col gap-4 lg:w-55">
            <ApplyDropdown />
            <button
              style={{ padding: "12px 24px" }}
              className="flex items-center justify-center gap-2 rounded-xl border-2 border-foreground text-sm text-foreground transition-colors hover:bg-gray-50"
            >
              <MessageSquare className="h-4 w-4" />
              {t.candidateProfile.sendMessage}
            </button>

            <div style={{ marginTop: 8 }} className="flex flex-col gap-3">
              <div className="flex items-center gap-2 text-sm text-foreground">
                <MapPin className="h-4 w-4 text-success" />
                <span>Jaffa - Tel Aviv, Israel</span>
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
          {/* Left column: Work Experience + Certificates */}
          <div className="flex flex-col gap-8">
            {/* Work Experience card */}
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

            {/* Certificates and training card */}
            <div style={{ padding: "28px 28px 36px" }} className="rounded-2xl bg-white">
              <h3 style={{ marginBottom: 20 }} className="text-xl font-medium text-foreground">
                {t.candidateProfile.certificatesAndTraining}
              </h3>
              <div className="flex flex-col gap-3">
                {mockCertificates.map((cert, i) => (
                  <div key={i} style={{ padding: "14px 16px" }} className="flex items-center gap-3 rounded-xl bg-[#F7F9FC]">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary">
                      <MessageSquare className="h-4 w-4 text-white" />
                    </div>
                    <div className="flex flex-1 flex-col">
                      <span className="text-sm font-medium text-foreground">{cert.institution}</span>
                      <span className="text-xs text-muted-foreground">{cert.description}</span>
                    </div>
                    {cert.hasFile && (
                      <button className="shrink-0 text-xs text-primary underline">
                        {t.candidateProfile.downloadFile}
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right column: Skills & Languages */}
          <div style={{ padding: 28 }} className="self-start rounded-2xl bg-white">
            <h3 style={{ marginBottom: 16 }} className="text-xl font-medium text-foreground">
              {t.candidateProfile.skills}
            </h3>
            <div style={{ marginBottom: 28 }} className="flex flex-wrap gap-2">
              {skillTags.map((tag, i) => (
                <span
                  key={i}
                  style={{ padding: "8px 18px" }}
                  className="rounded-full bg-[#F7F9FC] text-sm text-foreground"
                >
                  {tag}
                </span>
              ))}
            </div>

            <h3 style={{ marginBottom: 16 }} className="text-xl font-medium text-foreground">
              {t.candidateProfile.languages}
            </h3>
            <div className="flex flex-wrap gap-2">
              {languageTags.map((tag, i) => (
                <span
                  key={i}
                  style={{ padding: "8px 18px" }}
                  className="rounded-full bg-[#F7F9FC] text-sm text-foreground"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
