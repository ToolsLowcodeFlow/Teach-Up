"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { ChevronRight, Trash2, Link2, X } from "lucide-react";
import { useLanguage } from "@/lib/i18n/context";

interface ScreeningQuestionsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ScreeningQuestionsModal({ open, onOpenChange }: ScreeningQuestionsModalProps) {
  const { t } = useLanguage();
  const mockQuestions = [
    { question: t.admin.sampleScreeningQuestion, answer: t.admin.sampleScreeningAnswer },
    { question: t.admin.sampleScreeningQuestion, answer: t.admin.sampleScreeningAnswer },
  ];

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-60 bg-black/40 backdrop-blur-sm" />
        <Dialog.Content className="fixed left-1/2 top-1/2 z-60 max-h-[85vh] w-full max-w-145 -translate-x-1/2 -translate-y-1/2 overflow-y-auto rounded-2xl bg-white shadow-xl focus:outline-none">
          <div style={{ padding: "32px 36px" }}>
            {/* Close button */}
            <Dialog.Close className="absolute inset-e-4 top-4 flex h-8 w-8 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-gray-100">
              <X className="h-4 w-4" />
            </Dialog.Close>

            {/* Title */}
            <div style={{ marginBottom: 22 }} className="flex items-center gap-2">
              <Dialog.Title className="text-2xl font-medium text-foreground">
                {t.jobDetails.screeningQuestions}
              </Dialog.Title>
              <ChevronRight className="h-5 w-5 text-foreground" />
            </div>

            {/* About candidate */}
            <Dialog.Description className="sr-only">
              {t.jobDetails.screeningQuestions} - {t.jobDetails.aboutCandidate}
            </Dialog.Description>
            <p style={{ marginBottom: 14 }} className="text-sm text-foreground">
              {t.jobDetails.aboutCandidate}
            </p>

            {/* About text block */}
            <div
              style={{ padding: 20, marginBottom: 28 }}
              className="rounded-xl bg-[#F7F9FC] text-start text-sm leading-relaxed text-muted-foreground"
            >
              {t.admin.sampleLoremIpsum}
            </div>

            {/* Q&A pairs */}
            <div style={{ marginBottom: 28 }} className="flex flex-col gap-5">
              {mockQuestions.map((qa, i) => (
                <div key={i} className="flex flex-col gap-2">
                  <p className="text-sm text-foreground">{qa.question}</p>
                  <div
                    style={{ padding: "14px 16px" }}
                    className="rounded-xl bg-[#F7F9FC] text-sm text-muted-foreground"
                  >
                    {qa.answer}
                  </div>
                </div>
              ))}
            </div>

            {/* Candidate's resume */}
            <p style={{ marginBottom: 14 }} className="text-sm font-medium text-foreground">
              {t.jobDetails.candidateResume}
            </p>
            <div
              style={{ padding: "14px 16px" }}
              className="flex items-center gap-3 rounded-xl bg-linear-to-r from-[#F7F9FC] to-white"
            >
              <button className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-danger transition-colors hover:bg-red-50">
                <Trash2 className="h-4 w-4" />
              </button>
              <div className="flex flex-1 flex-col items-end gap-0.5">
                <span className="text-sm text-primary">{t.admin.sampleApplicantResume}</span>
                <span className="text-xs text-muted-foreground">142 KB</span>
              </div>
              <Link2 className="h-5 w-5 shrink-0 text-primary/60" />
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
