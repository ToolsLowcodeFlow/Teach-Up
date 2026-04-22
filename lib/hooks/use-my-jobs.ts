"use client";

import { useCallback, useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";

export interface Job {
  id: string;
  institution_id: string;
  title: string;
  description: string;
  hours_of_operation: string | null;
  start_date: string | null;
  field_of_knowledge: string | null;
  role: string | null;
  years_of_experience: string | null;
  area: string | null;
  training: string | null;
  scope_of_work: string | null;
  languages: string | null;
  salary_min: number | null;
  salary_max: number | null;
  transaction_type: string | null;
  education_stage: string | null;
  screening_questions: string[];
  files: string[];
  is_anonymous: boolean;
  status: "open" | "closed";
  is_verified: boolean;
  created_at: string;
  updated_at: string;
}

export const JOBS_REFRESH_EVENT = "teachup:jobs-refresh";

export function useMyJobs() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchJobs = useCallback(async () => {
    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      setJobs([]);
      setLoading(false);
      return;
    }

    const { data, error } = await supabase
      .from("jobs")
      .select("*")
      .eq("institution_id", user.id)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Failed to load jobs:", error);
      setJobs([]);
    } else {
      setJobs((data || []) as Job[]);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    void fetchJobs();
    const handler = () => {
      void fetchJobs();
    };
    window.addEventListener(JOBS_REFRESH_EVENT, handler);
    return () => window.removeEventListener(JOBS_REFRESH_EVENT, handler);
  }, [fetchJobs]);

  return { jobs, loading, refresh: fetchJobs };
}
