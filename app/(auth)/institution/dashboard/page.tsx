"use client";

import { useMemo, useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/lib/i18n/context";
import {
  JobsFilterSidebar,
  DEFAULT_FILTERS,
  MAX_SALARY,
  type JobFilters,
} from "@/components/dashboard/jobs-filter-sidebar";
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

function parseMinYears(value: string | null): number {
  if (!value) return 0;
  const match = value.match(/\d+/);
  return match ? Number(match[0]) : 0;
}

function uniqueValues(jobs: Job[], key: keyof Job): string[] {
  const set = new Set<string>();
  jobs.forEach((j) => {
    const v = j[key];
    if (typeof v === "string" && v.trim() !== "") set.add(v);
  });
  return Array.from(set).sort();
}

export default function MyJobsPage() {
  const { t } = useLanguage();
  const { jobs, loading } = useMyJobs();

  const [activeTab, setActiveTab] = useState<JobTab>("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedJob, setSelectedJob] = useState<JobCardData | null>(null);
  const [selectedDetail, setSelectedDetail] = useState<Job | null>(null);
  const [filters, setFilters] = useState<JobFilters>(DEFAULT_FILTERS);

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

  const roleOptions = useMemo(() => uniqueValues(jobs, "role"), [jobs]);
  const fieldOptions = useMemo(() => uniqueValues(jobs, "field_of_knowledge"), [jobs]);
  const scopeOptions = useMemo(() => uniqueValues(jobs, "scope_of_work"), [jobs]);
  const regionOptions = useMemo(() => uniqueValues(jobs, "area"), [jobs]);
  const languageOptions = useMemo(() => uniqueValues(jobs, "languages"), [jobs]);
  const trainingOptions = useMemo(() => uniqueValues(jobs, "training"), [jobs]);

  const filteredJobs = useMemo(() => {
    const allCards = [...jobs.map(toCardData), ...templateJobs];
    const query = filters.freeSearch.trim().toLowerCase();

    return allCards.filter((card) => {
      if (activeTab !== "all" && card.status !== activeTab) return false;

      if (query) {
        const haystack = [card.title, card.subtitle, card.description, card.location]
          .filter(Boolean)
          .join(" ")
          .toLowerCase();
        if (!haystack.includes(query)) return false;
      }

      // Salary overlap: job salary range must intersect the filter salary range.
      const jobMin = card.salaryMin ?? 0;
      const jobMax = card.salaryMax ?? 0;
      const [filterMin, filterMax] = filters.salary;
      if (jobMax > 0 && (jobMax < filterMin || jobMin > filterMax)) return false;

      const raw = jobsById.get(card.id);

      // Region uses either card.location (templates) or raw area.
      if (filters.region) {
        const loc = raw?.area || card.location || "";
        if (loc !== filters.region) return false;
      }

      // Fields below come from raw Job only; templates don't carry them → excluded when filter set.
      const dropdownChecks: { value: string; actual: string | null | undefined }[] = [
        { value: filters.role, actual: raw?.role },
        { value: filters.fieldOfKnowledge, actual: raw?.field_of_knowledge },
        { value: filters.scopeOfWork, actual: raw?.scope_of_work },
        { value: filters.languages, actual: raw?.languages },
        { value: filters.training, actual: raw?.training },
      ];
      for (const { value, actual } of dropdownChecks) {
        if (value && actual !== value) return false;
      }

      if (filters.minExperience > 0) {
        const years = parseMinYears(raw?.years_of_experience ?? null);
        if (years < filters.minExperience) return false;
      }

      return true;
    });
  }, [jobs, templateJobs, activeTab, filters, jobsById]);

  const totalPages = Math.max(1, Math.ceil(filteredJobs.length / PAGE_SIZE));
  const safePage = Math.min(currentPage, totalPages);
  const pageJobs = filteredJobs.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE);
  const hasJobs = filteredJobs.length > 0;

  const handleFiltersChange = (next: JobFilters) => {
    setFilters(next);
    setCurrentPage(1);
  };
  const handleClearFilters = () => {
    setFilters({ ...DEFAULT_FILTERS, salary: [0, MAX_SALARY] });
    setCurrentPage(1);
  };

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

        <JobsFilterSidebar
          filters={filters}
          onChange={handleFiltersChange}
          onClear={handleClearFilters}
          roleOptions={roleOptions}
          fieldOptions={fieldOptions}
          scopeOptions={scopeOptions}
          regionOptions={regionOptions}
          languageOptions={languageOptions}
          trainingOptions={trainingOptions}
        />
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
