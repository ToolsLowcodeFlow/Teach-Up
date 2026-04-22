"use client";

import { useMemo, useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/lib/i18n/context";
import { JobsFilterSidebar } from "@/components/dashboard/jobs-filter-sidebar";
import { EmptyJobsIllustration } from "@/components/dashboard/empty-jobs-illustration";
import { JobCard, type JobCardData } from "@/components/dashboard/job-card";
import { Pagination } from "@/components/dashboard/pagination";
import { JobDetailsModal } from "@/components/dashboard/job-details-modal";
import { useMyJobs, type Job, JOBS_REFRESH_EVENT } from "@/lib/hooks/use-my-jobs";
import { createClient } from "@/lib/supabase/client";

type JobTab = "open" | "all" | "closed";

const PAGE_SIZE = 9;

function formatDate(value: string | null): string {
  if (!value) return "";
  const d = new Date(value);
  if (isNaN(d.getTime())) return value;
  const dd = String(d.getDate()).padStart(2, "0");
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  return `${dd}/${mm}/${d.getFullYear()}`;
}

function toCardData(job: Job): JobCardData {
  const subtitleParts = [job.field_of_knowledge, job.role].filter(Boolean) as string[];
  return {
    id: job.id,
    title: job.title,
    subtitle: subtitleParts.join(" · "),
    description: job.description,
    date: formatDate(job.start_date || job.created_at),
    location: job.area || "",
    salaryMin: job.salary_min ?? 0,
    salaryMax: job.salary_max ?? 0,
    status: job.status,
    totalCandidates: 0,
    isVerified: job.is_verified,
  };
}

export default function MyJobsPage() {
  const { t } = useLanguage();
  const { jobs, loading } = useMyJobs();

  const [activeTab, setActiveTab] = useState<JobTab>("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedJob, setSelectedJob] = useState<JobCardData | null>(null);
  const [selectedDetail, setSelectedDetail] = useState<Job | null>(null);

  const openJob = (card: JobCardData, detail: Job | null) => {
    setSelectedJob(card);
    setSelectedDetail(detail);
  };

  const deleteJob = async (id: string) => {
    const supabase = createClient();
    const { error } = await supabase.from("jobs").delete().eq("id", id);
    if (error) {
      console.error("Failed to delete job:", error);
      return;
    }
    window.dispatchEvent(new Event(JOBS_REFRESH_EVENT));
  };

  const jobsById = useMemo(() => {
    const map = new Map<string, Job>();
    jobs.forEach((j) => map.set(j.id, j));
    return map;
  }, [jobs]);

  const tabs: { key: JobTab; label: string }[] = [
    { key: "open", label: t.dashboard.openJobs },
    { key: "all", label: t.dashboard.allJobs },
    { key: "closed", label: t.dashboard.closedJobs },
  ];

  const templateJobs: JobCardData[] = useMemo(
    () =>
      Array.from({ length: 9 }, (_, i) => ({
        id: `template-${i + 1}`,
        title: t.admin.sampleJobTitleAdmin,
        subtitle: t.admin.sampleJobSubtitle,
        description: t.admin.sampleJobDescription,
        date: "09/12/2026",
        location: t.admin.sampleJobLocation,
        salaryMin: 30000,
        salaryMax: 50000,
        status: i % 3 === 0 ? ("closed" as const) : ("open" as const),
        totalCandidates: 1240,
        isVerified: true,
      })),
    [t]
  );

  const filteredJobs = useMemo(() => {
    const allCards = [...jobs.map(toCardData), ...templateJobs];
    return activeTab === "all"
      ? allCards
      : allCards.filter((j) => j.status === activeTab);
  }, [jobs, templateJobs, activeTab]);

  const totalPages = Math.max(1, Math.ceil(filteredJobs.length / PAGE_SIZE));
  const safePage = Math.min(currentPage, totalPages);
  const pageJobs = filteredJobs.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE);
  const hasJobs = filteredJobs.length > 0;

  return (
    <div style={{ padding: "24px 40px 64px" }} className="w-full">
      <div style={{ marginBottom: 16 }} className="flex items-center justify-between">
        <div className="flex items-baseline gap-5">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => {
                setActiveTab(tab.key);
                setCurrentPage(1);
              }}
              className={cn(
                "whitespace-nowrap transition-colors",
                activeTab === tab.key
                  ? "text-[28px] leading-tight text-foreground xl:text-[32px]"
                  : "text-base text-foreground underline"
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <button className="flex items-center gap-3 text-sm tracking-tight text-foreground">
          <ChevronDown className="h-3 w-3" />
          <span>{t.dashboard.sortBy}</span>
        </button>
      </div>

      <div className="flex flex-col-reverse gap-8 lg:flex-row lg:gap-10">
        <div className="min-w-0 flex-1">
          {loading ? (
            <div className="flex min-h-100 items-center justify-center text-sm text-muted-foreground">
              Loading...
            </div>
          ) : hasJobs ? (
            <>
              <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
                {pageJobs.map((job) => {
                  const detail = jobsById.get(job.id) ?? null;
                  const isReal = !!detail;
                  return (
                    <div key={job.id} className="cursor-pointer" onClick={() => openJob(job, detail)}>
                      <JobCard
                        job={job}
                        onView={() => openJob(job, detail)}
                        onEdit={() => openJob(job, detail)}
                        onDelete={isReal ? () => deleteJob(job.id) : undefined}
                      />
                    </div>
                  );
                })}
              </div>

              <div style={{ marginTop: 40 }}>
                <Pagination
                  currentPage={safePage}
                  totalPages={totalPages}
                  onPageChange={setCurrentPage}
                />
              </div>
            </>
          ) : (
            <div className="flex min-h-100 items-center justify-center">
              <EmptyJobsIllustration />
            </div>
          )}
        </div>

        <JobsFilterSidebar />
      </div>

      <JobDetailsModal
        open={!!selectedJob}
        onOpenChange={(open) => {
          if (!open) {
            setSelectedJob(null);
            setSelectedDetail(null);
          }
        }}
        job={selectedJob}
        detail={selectedDetail}
      />
    </div>
  );
}
