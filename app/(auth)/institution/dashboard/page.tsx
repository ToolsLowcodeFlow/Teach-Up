"use client";

import { useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/lib/i18n/context";
import { JobsFilterSidebar } from "@/components/dashboard/jobs-filter-sidebar";
import { EmptyJobsIllustration } from "@/components/dashboard/empty-jobs-illustration";
import { JobCard, type JobCardData } from "@/components/dashboard/job-card";
import { Pagination } from "@/components/dashboard/pagination";
import { JobDetailsModal } from "@/components/dashboard/job-details-modal";

type JobTab = "open" | "all" | "closed";

export default function MyJobsPage() {
  const { t, locale } = useLanguage();

  const buildJobs = (): JobCardData[] => Array.from({ length: 9 }, (_, i) => ({
    id: String(i + 1),
    title: t.admin.sampleJobTitleAdmin,
    subtitle: t.admin.sampleJobSubtitle,
    description: t.admin.sampleJobDescription,
    date: "09/12/2026",
    location: t.admin.sampleJobLocation,
    salaryMin: 30000,
    salaryMax: 50000,
    status: i % 3 === 0 ? "closed" as const : "open" as const,
    totalCandidates: 1240,
    isVerified: true,
  }));

  const [jobs, setJobs] = useState<JobCardData[]>(buildJobs);
  useEffect(() => {
    setJobs((prev) => prev.map((j) => ({
      ...j,
      title: t.admin.sampleJobTitleAdmin,
      subtitle: t.admin.sampleJobSubtitle,
      description: t.admin.sampleJobDescription,
      location: t.admin.sampleJobLocation,
    })));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [locale]);
  const [activeTab, setActiveTab] = useState<JobTab>("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedJob, setSelectedJob] = useState<JobCardData | null>(null);

  const tabs: { key: JobTab; label: string }[] = [
    { key: "open", label: t.dashboard.openJobs },
    { key: "all", label: t.dashboard.allJobs },
    { key: "closed", label: t.dashboard.closedJobs },
  ];

  const filteredJobs =
    activeTab === "all"
      ? jobs
      : jobs.filter((j) => j.status === activeTab);

  const hasJobs = filteredJobs.length > 0;

  return (
    <div style={{ padding: "24px 40px 64px" }} className="w-full">
      {/* Top bar: Tabs on left, Sort by on right */}
      <div style={{ marginBottom: 16 }} className="flex items-center justify-between">
        {/* Job tabs - left */}
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

        {/* Sort by - right */}
        <button className="flex items-center gap-3 text-sm tracking-tight text-foreground">
          <ChevronDown className="h-3 w-3" />
          <span>{t.dashboard.sortBy}</span>
        </button>
      </div>

      {/* Content area: Jobs on left, Filters on right */}
      <div className="flex flex-col-reverse gap-8 lg:flex-row lg:gap-10">
        {/* Jobs content - left side */}
        <div className="min-w-0 flex-1">
          {hasJobs ? (
            <>
              <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
                {filteredJobs.map((job) => (
                  <div key={job.id} className="cursor-pointer" onClick={() => setSelectedJob(job)}>
                    <JobCard
                      job={job}
                      onView={() => setSelectedJob(job)}
                      onEdit={() => setSelectedJob(job)}
                      onStatusToggle={() => {
                        setJobs((prev) => prev.map((j) => j.id === job.id ? { ...j, status: j.status === "open" ? "closed" as const : "open" as const } : j));
                      }}
                    />
                  </div>
                ))}
              </div>

              {/* Pagination */}
              <div style={{ marginTop: 40 }}>
                <Pagination
                  currentPage={currentPage}
                  totalPages={8}
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

        {/* Filter sidebar - right side */}
        <JobsFilterSidebar />
      </div>

      <JobDetailsModal
        open={!!selectedJob}
        onOpenChange={(open) => { if (!open) setSelectedJob(null); }}
        job={selectedJob}
      />
    </div>
  );
}
