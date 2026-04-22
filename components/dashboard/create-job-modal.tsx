"use client";

import { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { Upload, CheckCircle2, X } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLanguage } from "@/lib/i18n/context";
import { createClient } from "@/lib/supabase/client";
import { jobSchema, type JobFormData } from "@/lib/validations/job";
import { JOBS_REFRESH_EVENT } from "@/lib/hooks/use-my-jobs";
import { DropdownSelect } from "./dropdown-select";

interface FormFieldProps {
  label: string;
  error?: string;
  children: React.ReactNode;
}

function FormField({ label, error, children }: FormFieldProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm text-foreground">{label}</label>
      {children}
      {error && <span className="text-xs text-danger">{error}</span>}
    </div>
  );
}

function TextInput({
  placeholder,
  error,
  ...rest
}: React.InputHTMLAttributes<HTMLInputElement> & { error?: boolean }) {
  return (
    <input
      type="text"
      placeholder={placeholder}
      {...rest}
      style={{ padding: "14px 16px" }}
      className={`w-full rounded-lg border bg-white text-sm text-foreground placeholder:text-muted-foreground/40 focus:border-primary/30 focus:outline-none ${
        error ? "border-danger" : "border-border-light"
      }`}
    />
  );
}

interface CreateJobModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const DEFAULTS: JobFormData = {
  title: "",
  description: "",
  hours_of_operation: "",
  start_date: "",
  field_of_knowledge: "",
  role: "",
  years_of_experience: "",
  area: "",
  training: "",
  scope_of_work: "",
  languages: "",
  salary_range: "",
  transaction_type: "",
  education_stage: "",
  screening_questions: [""],
  files: [],
  is_anonymous: false,
};

function parseSalaryRange(input: string | undefined): {
  salary_min: number | null;
  salary_max: number | null;
} {
  if (!input) return { salary_min: null, salary_max: null };
  const nums = input
    .replace(/[^\d-]/g, "")
    .split("-")
    .map((s) => s.trim())
    .filter(Boolean)
    .map((s) => parseInt(s, 10))
    .filter((n) => !isNaN(n));
  if (nums.length === 0) return { salary_min: null, salary_max: null };
  if (nums.length === 1) return { salary_min: nums[0], salary_max: nums[0] };
  return { salary_min: Math.min(nums[0], nums[1]), salary_max: Math.max(nums[0], nums[1]) };
}

export function CreateJobModal({ open, onOpenChange }: CreateJobModalProps) {
  const { t } = useLanguage();
  const [fileCount, setFileCount] = useState(1);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<JobFormData>({
    resolver: zodResolver(jobSchema),
    defaultValues: DEFAULTS,
  });

  const screeningQuestions = watch("screening_questions") ?? [""];
  const isAnonymous = watch("is_anonymous");

  const handleClose = (next: boolean) => {
    if (!next) {
      reset(DEFAULTS);
      setFileCount(1);
      setSubmitError(null);
    }
    onOpenChange(next);
  };

  const onSubmit = async (data: JobFormData) => {
    setSubmitError(null);
    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      setSubmitError("You must be signed in to post a job.");
      return;
    }

    const { salary_min, salary_max } = parseSalaryRange(data.salary_range);
    const cleanedQuestions = (data.screening_questions ?? [])
      .map((q) => q.trim())
      .filter(Boolean);

    const { error } = await supabase.from("jobs").insert({
      institution_id: user.id,
      title: data.title,
      description: data.description,
      hours_of_operation: data.hours_of_operation || null,
      start_date: data.start_date || null,
      field_of_knowledge: data.field_of_knowledge || null,
      role: data.role || null,
      years_of_experience: data.years_of_experience || null,
      area: data.area || null,
      training: data.training || null,
      scope_of_work: data.scope_of_work || null,
      languages: data.languages || null,
      salary_min,
      salary_max,
      transaction_type: data.transaction_type || null,
      education_stage: data.education_stage || null,
      screening_questions: cleanedQuestions,
      files: [],
      is_anonymous: !!data.is_anonymous,
      status: "open",
    });

    if (error) {
      setSubmitError(error.message);
      return;
    }

    window.dispatchEvent(new Event(JOBS_REFRESH_EVENT));
    handleClose(false);
  };

  const dropdownOptions = [
    t.candidateSearch.option1,
    t.candidateSearch.option2,
    t.candidateSearch.option3,
  ];

  return (
    <Dialog.Root open={open} onOpenChange={handleClose}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm" />
        <Dialog.Content className="fixed left-1/2 top-1/2 z-50 flex max-h-[90vh] w-full max-w-[540px] -translate-x-1/2 -translate-y-1/2 flex-col rounded-2xl bg-white shadow-xl focus:outline-none">
          {/* Fixed Header */}
          <div className="shrink-0 border-b border-border-light" style={{ padding: "32px 36px 20px" }}>
            <Dialog.Close className="absolute end-4 top-4 flex h-8 w-8 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-gray-100">
              <X className="h-4 w-4" />
            </Dialog.Close>
            <Dialog.Title className="mb-1 text-2xl font-medium text-foreground">
              {t.createJob.title}
            </Dialog.Title>
            <Dialog.Description className="text-base text-primary">
              {t.createJob.jobDetails}
            </Dialog.Description>
          </div>

          {/* Scrollable Form */}
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex-1 overflow-y-auto"
            style={{ padding: "20px 36px 28px" }}
          >
            <div className="flex flex-col gap-5">
              <FormField label={t.createJob.jobTitle} error={errors.title?.message}>
                <TextInput
                  placeholder={t.createJob.typePlaceholder}
                  error={!!errors.title}
                  {...register("title")}
                />
              </FormField>

              <FormField label={t.createJob.jobDescription} error={errors.description?.message}>
                <textarea
                  {...register("description")}
                  placeholder={t.createJob.typePlaceholder}
                  rows={3}
                  style={{ padding: "14px 16px" }}
                  className={`w-full resize-none rounded-lg border bg-white text-sm text-foreground placeholder:text-muted-foreground/40 focus:border-primary/30 focus:outline-none ${
                    errors.description ? "border-danger" : "border-border-light"
                  }`}
                />
              </FormField>

              <div className="grid grid-cols-2 gap-4">
                <FormField label={t.createJob.hoursOfOperation}>
                  <TextInput placeholder={t.createJob.typePlaceholder} {...register("hours_of_operation")} />
                </FormField>
                <FormField label={t.createJob.startDate}>
                  <TextInput placeholder={t.createJob.typePlaceholder} {...register("start_date")} />
                </FormField>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <FormField label={t.createJob.fieldOfKnowledge}>
                  <DropdownSelect
                    label={t.createJob.choicePlaceholder}
                    options={dropdownOptions}
                    value={watch("field_of_knowledge") || ""}
                    onChange={(v) => setValue("field_of_knowledge", v)}
                    placeholder
                  />
                </FormField>
                <FormField label={t.createJob.role}>
                  <DropdownSelect
                    label={t.createJob.choicePlaceholder}
                    options={dropdownOptions}
                    value={watch("role") || ""}
                    onChange={(v) => setValue("role", v)}
                    placeholder
                  />
                </FormField>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <FormField label={t.createJob.yearsOfExperience}>
                  <TextInput placeholder={t.createJob.typePlaceholder} {...register("years_of_experience")} />
                </FormField>
                <FormField label={t.createJob.area}>
                  <TextInput placeholder={t.createJob.typePlaceholder} {...register("area")} />
                </FormField>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <FormField label={t.createJob.training}>
                  <DropdownSelect
                    label={t.createJob.choicePlaceholder}
                    options={dropdownOptions}
                    value={watch("training") || ""}
                    onChange={(v) => setValue("training", v)}
                    placeholder
                  />
                </FormField>
                <FormField label={t.createJob.scopeOfWork}>
                  <DropdownSelect
                    label={t.createJob.choicePlaceholder}
                    options={dropdownOptions}
                    value={watch("scope_of_work") || ""}
                    onChange={(v) => setValue("scope_of_work", v)}
                    placeholder
                  />
                </FormField>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <FormField label={t.createJob.languages}>
                  <DropdownSelect
                    label={t.createJob.choicePlaceholder}
                    options={dropdownOptions}
                    value={watch("languages") || ""}
                    onChange={(v) => setValue("languages", v)}
                    placeholder
                  />
                </FormField>
                <FormField label={t.createJob.salaryRange}>
                  <TextInput
                    placeholder="30000 - 50000"
                    {...register("salary_range")}
                  />
                </FormField>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <FormField label={t.createJob.transactionType}>
                  <DropdownSelect
                    label={t.createJob.choicePlaceholder}
                    options={dropdownOptions}
                    value={watch("transaction_type") || ""}
                    onChange={(v) => setValue("transaction_type", v)}
                    placeholder
                  />
                </FormField>
                <FormField label={t.createJob.educationStage}>
                  <DropdownSelect
                    label={t.createJob.choicePlaceholder}
                    options={dropdownOptions}
                    value={watch("education_stage") || ""}
                    onChange={(v) => setValue("education_stage", v)}
                    placeholder
                  />
                </FormField>
              </div>

              {/* Screening questions */}
              <div className="mt-2">
                <p className="mb-3 text-base text-primary">
                  {t.createJob.screeningQuestions}
                </p>
                {screeningQuestions.map((_, i) => (
                  <div key={i} className="mb-3">
                    <label className="mb-1.5 block text-sm text-foreground">
                      {t.createJob.question} {String(i + 1).padStart(2, "0")}
                    </label>
                    <TextInput
                      placeholder={t.createJob.typePlaceholder}
                      {...register(`screening_questions.${i}` as const)}
                    />
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() =>
                    setValue("screening_questions", [...screeningQuestions, ""])
                  }
                  className="text-sm text-primary underline transition-colors hover:text-primary-dark"
                >
                  {t.createJob.addAnotherField}
                </button>
              </div>

              {/* Add files — UI only for now (no upload wired yet) */}
              <div className="mt-2">
                <p className="mb-3 text-base text-foreground">
                  {t.createJob.addFiles}
                </p>
                {Array.from({ length: fileCount }, (_, i) => (
                  <div
                    key={i}
                    style={{ padding: "14px 16px" }}
                    className="mb-3 flex items-center gap-2 rounded-lg border border-border-light"
                  >
                    <Upload className="h-4 w-4 text-muted-foreground" />
                    <span className="flex-1 text-sm text-muted-foreground">
                      {t.createJob.uploadFile}
                    </span>
                    <CheckCircle2 className="h-5 w-5 text-primary" />
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => setFileCount((c) => c + 1)}
                  className="text-sm text-primary underline transition-colors hover:text-primary-dark"
                >
                  {t.createJob.addAnotherFile}
                </button>
              </div>

              {/* Anonymous toggle */}
              <div className="flex items-center justify-between">
                <span className="text-sm text-foreground">
                  {t.createJob.postAnonymously}
                </span>
                <button
                  type="button"
                  onClick={() => setValue("is_anonymous", !isAnonymous)}
                  className={`relative inline-flex h-7 w-12 shrink-0 cursor-pointer items-center rounded-full transition-colors ${
                    isAnonymous ? "bg-primary" : "bg-gray-300"
                  }`}
                >
                  <span
                    className={`inline-block h-5 w-5 rounded-full bg-white shadow-md transition-transform ${
                      isAnonymous ? "translate-x-6" : "translate-x-1"
                    }`}
                  />
                </button>
              </div>

              {submitError && (
                <p className="text-sm text-danger">{submitError}</p>
              )}
            </div>

            {/* Footer buttons */}
            <div className="mt-8 flex items-center gap-3">
              <button
                type="submit"
                disabled={isSubmitting}
                style={{ padding: "10px 24px" }}
                className="rounded-lg bg-primary text-sm text-white transition-colors hover:bg-primary-dark disabled:opacity-60"
              >
                {isSubmitting ? "..." : t.createJob.submitButton}
              </button>
              <button
                type="button"
                onClick={() => handleClose(false)}
                style={{ padding: "10px 24px" }}
                className="rounded-lg border border-border text-sm text-foreground transition-colors hover:bg-gray-50"
              >
                {t.createJob.cancelButton}
              </button>
            </div>
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
