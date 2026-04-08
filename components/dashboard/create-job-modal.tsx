"use client";

import { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { Upload, CheckCircle2, X } from "lucide-react";
import { useLanguage } from "@/lib/i18n/context";
import { DropdownSelect } from "./dropdown-select";

interface FormFieldProps {
  label: string;
  children: React.ReactNode;
}

function FormField({ label, children }: FormFieldProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm text-foreground">{label}</label>
      {children}
    </div>
  );
}

function TextInput({ placeholder }: { placeholder: string }) {
  return (
    <input
      type="text"
      placeholder={placeholder}
      style={{ padding: "14px 16px" }}
      className="w-full rounded-lg border border-border-light bg-white text-sm text-foreground placeholder:text-muted-foreground/40 focus:border-primary/30 focus:outline-none"
    />
  );
}

function SelectInput({ placeholder, options }: { placeholder: string; options?: string[] }) {
  const { t } = useLanguage();
  const opts = options || [t.candidateSearch.option1, t.candidateSearch.option2, t.candidateSearch.option3];
  return <DropdownSelect label={placeholder} options={opts} />;
}

interface CreateJobModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CreateJobModal({ open, onOpenChange }: CreateJobModalProps) {
  const { t } = useLanguage();
  const [questionCount, setQuestionCount] = useState(1);
  const [fileCount, setFileCount] = useState(1);
  const [anonymous, setAnonymous] = useState(true);

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm" />
        <Dialog.Content className="fixed left-1/2 top-1/2 z-50 max-h-[90vh] w-full max-w-[540px] -translate-x-1/2 -translate-y-1/2 overflow-y-auto rounded-2xl bg-white shadow-xl focus:outline-none">
          <div style={{ padding: "32px 36px 28px" }}>
            {/* Close button */}
            <Dialog.Close className="absolute end-4 top-4 flex h-8 w-8 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-gray-100">
              <X className="h-4 w-4" />
            </Dialog.Close>

            {/* Header */}
            <Dialog.Title className="mb-1 text-2xl font-medium text-foreground">
              {t.createJob.title}
            </Dialog.Title>
            <Dialog.Description className="mb-6 text-base text-primary">
              {t.createJob.jobDetails}
            </Dialog.Description>

            {/* Form */}
            <div className="flex flex-col gap-5">
              {/* Job title - full width */}
              <FormField label={t.createJob.jobTitle}>
                <TextInput placeholder={t.createJob.typePlaceholder} />
              </FormField>

              {/* Job description - full width textarea */}
              <FormField label={t.createJob.jobDescription}>
                <textarea
                  placeholder={t.createJob.typePlaceholder}
                  rows={3}
                  style={{ padding: "14px 16px" }}
                  className="w-full resize-none rounded-lg border border-border-light bg-white text-sm text-foreground placeholder:text-muted-foreground/40 focus:border-primary/30 focus:outline-none"
                />
              </FormField>

              {/* 2-column rows */}
              <div className="grid grid-cols-2 gap-4">
                <FormField label={t.createJob.hoursOfOperation}>
                  <TextInput placeholder={t.createJob.typePlaceholder} />
                </FormField>
                <FormField label={t.createJob.startDate}>
                  <TextInput placeholder={t.createJob.typePlaceholder} />
                </FormField>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <FormField label={t.createJob.fieldOfKnowledge}>
                  <SelectInput placeholder={t.createJob.choicePlaceholder} />
                </FormField>
                <FormField label={t.createJob.role}>
                  <SelectInput placeholder={t.createJob.choicePlaceholder} />
                </FormField>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <FormField label={t.createJob.yearsOfExperience}>
                  <TextInput placeholder={t.createJob.typePlaceholder} />
                </FormField>
                <FormField label={t.createJob.area}>
                  <TextInput placeholder={t.createJob.typePlaceholder} />
                </FormField>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <FormField label={t.createJob.training}>
                  <SelectInput placeholder={t.createJob.choicePlaceholder} />
                </FormField>
                <FormField label={t.createJob.scopeOfWork}>
                  <SelectInput placeholder={t.createJob.choicePlaceholder} />
                </FormField>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <FormField label={t.createJob.languages}>
                  <SelectInput placeholder={t.createJob.choicePlaceholder} />
                </FormField>
                <FormField label={t.createJob.salaryRange}>
                  <TextInput placeholder={t.createJob.typePlaceholder} />
                </FormField>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <FormField label={t.createJob.transactionType}>
                  <SelectInput placeholder={t.createJob.choicePlaceholder} />
                </FormField>
                <FormField label={t.createJob.educationStage}>
                  <SelectInput placeholder={t.createJob.choicePlaceholder} />
                </FormField>
              </div>

              {/* Screening questions */}
              <div className="mt-2">
                <p className="mb-3 text-base text-primary">
                  {t.createJob.screeningQuestions}
                </p>
                {Array.from({ length: questionCount }, (_, i) => (
                  <div key={i} className="mb-3">
                    <label className="mb-1.5 block text-sm text-foreground">
                      {t.createJob.question} {String(i + 1).padStart(2, "0")}
                    </label>
                    <TextInput placeholder={t.createJob.typePlaceholder} />
                  </div>
                ))}
                <button
                  onClick={() => setQuestionCount((c) => c + 1)}
                  className="text-sm text-primary underline transition-colors hover:text-primary-dark"
                >
                  {t.createJob.addAnotherField}
                </button>
              </div>

              {/* Add files */}
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
                  onClick={() => setAnonymous(!anonymous)}
                  className={`relative inline-flex h-7 w-12 shrink-0 cursor-pointer items-center rounded-full transition-colors ${anonymous ? "bg-danger" : "bg-gray-300"}`}
                >
                  <span
                    className={`inline-block h-5 w-5 rounded-full bg-white shadow-md transition-transform ${anonymous ? "translate-x-6" : "translate-x-1"}`}
                  />
                </button>
              </div>
            </div>

            {/* Footer buttons */}
            <div className="mt-8 flex items-center gap-3">
              <button
                onClick={() => onOpenChange(false)}
                style={{ padding: "10px 24px" }}
                className="rounded-lg bg-primary text-sm text-white transition-colors hover:bg-primary-dark"
              >
                {t.createJob.submitButton}
              </button>
              <button
                onClick={() => onOpenChange(false)}
                style={{ padding: "10px 24px" }}
                className="rounded-lg border border-border text-sm text-foreground transition-colors hover:bg-gray-50"
              >
                {t.createJob.cancelButton}
              </button>
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
