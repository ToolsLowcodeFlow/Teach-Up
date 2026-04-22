"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import * as Dialog from "@radix-ui/react-dialog";
import { Heart, BadgeCheck, MoreHorizontal, Link2, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/lib/i18n/context";
import type { JobCardData } from "./job-card";
import type { Job } from "@/lib/hooks/use-my-jobs";
import { ScreeningQuestionsModal } from "./screening-questions-modal";

type ApplicantStatus = "in_progress" | "accepted" | "rejected";

interface Applicant {
  id: string;
  name: string;
  status: ApplicantStatus;
}

const mockApplicantStatuses: { id: string; status: ApplicantStatus }[] = [
  { id: "1", status: "in_progress" },
  { id: "2", status: "in_progress" },
  { id: "3", status: "accepted" },
  { id: "4", status: "in_progress" },
  { id: "5", status: "rejected" },
  { id: "6", status: "in_progress" },
  { id: "7", status: "in_progress" },
  { id: "8", status: "rejected" },
  { id: "9", status: "rejected" },
];

interface JobDetailsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  job: JobCardData | null;
  detail?: Job | null;
}

function formatDate(value: string | null | undefined): string {
  if (!value) return "";
  const d = new Date(value);
  if (isNaN(d.getTime())) return value;
  const dd = String(d.getDate()).padStart(2, "0");
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  return `${dd}/${mm}/${d.getFullYear()}`;
}

function StatusBadge({ status }: { status: ApplicantStatus }) {
  const { t } = useLanguage();
  const labels: Record<ApplicantStatus, string> = {
    in_progress: t.jobDetails.inProgress,
    accepted: t.jobDetails.accepted,
    rejected: t.jobDetails.rejected,
  };
  return (
    <span
      className={cn(
        "text-xs",
        status === "rejected" ? "text-danger" : "text-success"
      )}
    >
      {labels[status]}
    </span>
  );
}

function ApplicantRow({ applicant }: { applicant: Applicant }) {
  const { t } = useLanguage();
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const [screeningOpen, setScreeningOpen] = useState(false);

  return (
    <div
      style={{ padding: "12px 20px" }}
      className="flex items-center gap-3 border-b border-border-light transition-colors hover:bg-gray-50"
    >
      {/* Avatar */}
      <div className="h-10 w-10 shrink-0 overflow-hidden rounded-full bg-muted-foreground/20">
        <div className="flex h-full w-full items-center justify-center text-xs text-muted-foreground">
          {applicant.name.charAt(0)}
        </div>
      </div>

      {/* Name + status */}
      <div className="flex flex-1 flex-col">
        <span className="text-sm text-foreground">{applicant.name}</span>
        <StatusBadge status={applicant.status} />
      </div>

      {/* Three dots menu */}
      <div className="relative shrink-0">
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="flex h-7 w-7 items-center justify-center rounded-full transition-colors hover:bg-gray-100"
        >
          <MoreHorizontal className="h-4 w-4 text-muted-foreground" />
        </button>

        {menuOpen && (
          <>
            <div className="fixed inset-0 z-10" onClick={() => setMenuOpen(false)} />
            <div
              style={{ padding: "12px 16px" }}
              className="absolute end-0 top-8 z-20 flex min-w-52 flex-col gap-2 rounded-xl border border-border-light bg-white shadow-lg"
            >
              <button
                className="flex w-full whitespace-nowrap rounded-md py-1 text-start text-sm text-foreground transition-colors hover:text-primary"
                onClick={() => { setMenuOpen(false); router.push("/institution/dashboard/candidate-profile"); }}
              >
                {t.jobDetails.viewProfile}
              </button>
              <button
                className="flex w-full whitespace-nowrap rounded-md py-1 text-start text-sm text-foreground transition-colors hover:text-primary"
                onClick={() => { setMenuOpen(false); setScreeningOpen(true); }}
              >
                {t.jobDetails.viewScreeningQuestions}
              </button>
              <button
                className="flex w-full whitespace-nowrap rounded-md py-1 text-start text-sm text-foreground transition-colors hover:text-primary"
                onClick={() => setMenuOpen(false)}
              >
                {t.jobDetails.downloadResume}
              </button>
            </div>
          </>
        )}
      </div>

      <ScreeningQuestionsModal open={screeningOpen} onOpenChange={setScreeningOpen} />
    </div>
  );
}

export function JobDetailsModal({ open, onOpenChange, job, detail }: JobDetailsModalProps) {
  const { t } = useLanguage();

  if (!job) return null;

  const jobTitle = detail?.title ?? t.admin.sampleJobTitle;
  const jobDescription = detail?.description ?? t.admin.sampleLoremIpsum;
  const jobCategory = detail?.field_of_knowledge || t.admin.sampleCategory;
  const jobDate = detail ? formatDate(detail.created_at) : "08/12/2025";
  const jobNumber = detail ? detail.id.slice(0, 8).toUpperCase() : "84844065";

  const salaryValue =
    detail && (detail.salary_min || detail.salary_max)
      ? `${(detail.salary_min ?? 0).toLocaleString()} - ${(detail.salary_max ?? 0).toLocaleString()}`
      : "10,000 - 20,000";

  const detailsRow1 = [
    { label: t.jobDetails.hoursOfOperation, value: detail?.hours_of_operation || t.admin.lunchDinner },
    { label: t.jobDetails.role, value: detail?.role || t.admin.sampleLoremShort },
    { label: t.jobDetails.transactionType, value: detail?.transaction_type || t.admin.sampleLoremShort },
    { label: t.jobDetails.educationStage, value: detail?.education_stage || t.admin.sampleLoremShort },
    { label: t.jobDetails.startDate, value: detail?.start_date || "08/10/2026" },
  ];

  const detailsRow2 = [
    { label: t.jobDetails.training, value: detail?.training || t.admin.morningTraining },
    { label: t.jobDetails.yearsOfExperience, value: detail?.years_of_experience || "09" },
    { label: t.jobDetails.scopeOfWork, value: detail?.scope_of_work || t.admin.fullTime },
    { label: t.jobDetails.area, value: detail?.area || t.admin.sampleLocation },
    { label: `${t.jobDetails.salaryRange} \u20AA`, value: salaryValue },
  ];

  const defaultLanguages = [t.admin.languageSpanish, t.admin.languageEnglish, t.admin.languageHebrew];
  const parsedLanguages = detail?.languages
    ? detail.languages.split(",").map((s) => s.trim()).filter(Boolean)
    : [];
  const languageList = parsedLanguages.length ? parsedLanguages : defaultLanguages;

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm" />
        <Dialog.Content className="fixed left-1/2 top-1/2 z-50 flex max-h-[90vh] w-full max-w-[960px] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-2xl bg-white shadow-xl focus:outline-none">
          {/* Left panel: Applicants */}
          <div className="flex w-[280px] shrink-0 flex-col border-e border-border-light">
            <div style={{ padding: "24px 20px 16px" }}>
              <Dialog.Title className="text-xl font-medium text-foreground">
                {t.jobDetails.apply}
              </Dialog.Title>
              <p className="mt-1 text-xs text-muted-foreground">
                1,200 {t.jobDetails.applicationsSubmitted}
              </p>
            </div>

            <div className="flex-1 overflow-y-auto">
              {mockApplicantStatuses.map((a) => (
                <ApplicantRow key={a.id} applicant={{ ...a, name: t.admin.sampleApplicantName }} />
              ))}
            </div>
          </div>

          {/* Right panel: Job details */}
          <div className="flex flex-1 flex-col">
            {/* Fixed header */}
            <div className="shrink-0 border-b border-border-light" style={{ padding: "28px 32px 20px" }}>
              <Dialog.Close className="absolute end-4 top-4 flex h-8 w-8 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-gray-100">
                <X className="h-4 w-4" />
              </Dialog.Close>
              <Dialog.Description className="sr-only">
                {jobTitle} - {t.jobDetails.title}
              </Dialog.Description>
              <h3 className="text-2xl font-medium text-foreground">
                {t.jobDetails.title}
              </h3>
            </div>

            {/* Scrollable content */}
            <div className="flex-1 overflow-y-auto" style={{ padding: "20px 32px 32px" }}>

              {/* Favorites + Category */}
              <div style={{ marginBottom: 22 }} className="flex items-center justify-between">
                <button className="flex items-center gap-2 rounded-full border border-border-light bg-[#F7F9FC] px-4 py-2 text-sm text-foreground transition-colors hover:bg-gray-100">
                  {t.jobDetails.addToFavorites}
                  <Heart className="h-4 w-4" />
                </button>
                <div className="flex items-center gap-1.5 text-sm text-foreground">
                  {jobCategory}
                  <BadgeCheck className="h-5 w-5 text-primary" />
                </div>
              </div>

              {/* Job title */}
              <h4 className="mb-1 text-center text-xl font-medium text-foreground">
                {jobTitle}
              </h4>
              <p style={{ marginBottom: 10 }} className="text-center text-xs text-muted-foreground">
                {jobDate} &middot; {t.jobDetails.jobNumber} &middot; {jobNumber}
              </p>

              {/* Description */}
              <p style={{ marginBottom: 28 }} className="text-center text-sm leading-relaxed text-foreground">
                {jobDescription}
              </p>

              {/* Details grid - light grey background */}
              <div style={{ padding: "20px 16px", marginBottom: 22 }} className="rounded-xl bg-[#F7F9FC]">
                <div className="grid grid-cols-5 gap-y-5">
                  {detailsRow1.map((item) => (
                    <div key={item.label} className="flex flex-col gap-1 text-center">
                      <span className="text-xs text-muted-foreground">{item.label}</span>
                      <span className="text-sm font-medium text-foreground">{item.value}</span>
                    </div>
                  ))}
                  {detailsRow2.map((item) => (
                    <div key={item.label} className="flex flex-col gap-1 text-center">
                      <span className="text-xs text-muted-foreground">{item.label}</span>
                      <span className="text-sm font-medium text-foreground">{item.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Language tags */}
              <div style={{ marginBottom: 28 }} className="flex items-center gap-3">
                {languageList.map((lang) => (
                  <span
                    key={lang}
                    style={{ padding: "10px 20px" }}
                    className="rounded-full bg-linear-to-b from-border-light to-[#E8EEF7] text-sm text-foreground"
                  >
                    {lang}
                  </span>
                ))}
              </div>

              {/* Divider */}
              <div style={{ marginBottom: 22 }} className="h-px bg-border-light" />

              {/* Company description */}
              <h5 style={{ marginBottom: 10 }} className="text-base font-medium text-foreground">
                {t.jobDetails.companyDescription}
              </h5>
              <p style={{ marginBottom: 22 }} className="text-center text-sm leading-relaxed text-muted-foreground">
                {t.admin.sampleLoremIpsum}
              </p>

              {/* Company name */}
              <div style={{ marginBottom: 28 }} className="flex items-center gap-3">
                <div className="h-8 w-8 shrink-0 overflow-hidden rounded-full bg-muted-foreground/20">
                  <div className="flex h-full w-full items-center justify-center text-xs text-muted-foreground">
                    L
                  </div>
                </div>
                <span className="text-sm text-foreground">
                  {t.jobDetails.companyName}: {t.admin.sampleCompanyName}
                </span>
              </div>

              {/* Divider */}
              <div style={{ marginBottom: 22 }} className="h-px bg-border-light" />

              {/* Attachments */}
              <h5 style={{ marginBottom: 14 }} className="text-base font-medium text-foreground">
                {t.jobDetails.attachments}
              </h5>
              <div className="flex flex-col gap-3">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    style={{ padding: "14px 16px" }}
                    className="flex items-center justify-between rounded-xl bg-gradient-to-r from-[#F7F9FC] to-white"
                  >
                    <div className="flex flex-col gap-0.5">
                      <span className="text-sm text-primary">
                        {t.admin.sampleJobTitle}
                      </span>
                      <span className="text-xs text-muted-foreground">142 KB</span>
                    </div>
                    <Link2 className="h-5 w-5 shrink-0 text-primary/60" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
