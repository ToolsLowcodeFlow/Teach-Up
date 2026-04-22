-- Jobs table for TeachUp
-- Institutions post jobs; seekers browse open ones.

CREATE TABLE IF NOT EXISTS public.jobs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  institution_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,

  title TEXT NOT NULL,
  description TEXT NOT NULL,
  hours_of_operation TEXT,
  start_date TEXT,
  field_of_knowledge TEXT,
  role TEXT,
  years_of_experience TEXT,
  area TEXT,
  training TEXT,
  scope_of_work TEXT,
  languages TEXT,
  salary_min INT,
  salary_max INT,
  transaction_type TEXT,
  education_stage TEXT,
  screening_questions TEXT[] DEFAULT '{}',
  files TEXT[] DEFAULT '{}',
  is_anonymous BOOLEAN DEFAULT FALSE,

  status TEXT DEFAULT 'open' CHECK (status IN ('open', 'closed')),
  is_verified BOOLEAN DEFAULT TRUE,

  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS jobs_institution_id_idx ON public.jobs(institution_id);
CREATE INDEX IF NOT EXISTS jobs_status_idx ON public.jobs(status);
CREATE INDEX IF NOT EXISTS jobs_created_at_idx ON public.jobs(created_at DESC);

ALTER TABLE public.jobs ENABLE ROW LEVEL SECURITY;

-- Owner CRUD
DROP POLICY IF EXISTS "Institutions can insert own jobs" ON public.jobs;
CREATE POLICY "Institutions can insert own jobs" ON public.jobs
  FOR INSERT WITH CHECK (auth.uid() = institution_id);

DROP POLICY IF EXISTS "Institutions can view own jobs" ON public.jobs;
CREATE POLICY "Institutions can view own jobs" ON public.jobs
  FOR SELECT USING (auth.uid() = institution_id);

DROP POLICY IF EXISTS "Institutions can update own jobs" ON public.jobs;
CREATE POLICY "Institutions can update own jobs" ON public.jobs
  FOR UPDATE USING (auth.uid() = institution_id);

DROP POLICY IF EXISTS "Institutions can delete own jobs" ON public.jobs;
CREATE POLICY "Institutions can delete own jobs" ON public.jobs
  FOR DELETE USING (auth.uid() = institution_id);

-- Authenticated users can view open jobs (seeker browse)
DROP POLICY IF EXISTS "Authenticated can view open jobs" ON public.jobs;
CREATE POLICY "Authenticated can view open jobs" ON public.jobs
  FOR SELECT TO authenticated USING (status = 'open');

-- Admins see everything
DROP POLICY IF EXISTS "Admins can view all jobs" ON public.jobs;
CREATE POLICY "Admins can view all jobs" ON public.jobs
  FOR SELECT USING (public.is_admin());

-- Auto-update updated_at (reuses handle_updated_at from 001)
DROP TRIGGER IF EXISTS on_jobs_updated ON public.jobs;
CREATE TRIGGER on_jobs_updated
  BEFORE UPDATE ON public.jobs
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();
