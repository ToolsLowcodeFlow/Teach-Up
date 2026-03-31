"use client";

import { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { Star, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/lib/i18n/context";

interface ReviewModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ReviewModal({ open, onOpenChange }: ReviewModalProps) {
  const { t } = useLanguage();
  const [selected, setSelected] = useState<number | null>(null);

  const ratings = [
    { value: 1, label: t.reviewModal.veryBad },
    { value: 2, label: t.reviewModal.bad },
    { value: 3, label: t.reviewModal.average },
    { value: 4, label: t.reviewModal.veryGood },
    { value: 5, label: t.reviewModal.likedVeryMuch },
  ];

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-60 bg-black/40 backdrop-blur-sm" />
        <Dialog.Content className="fixed left-1/2 top-1/2 z-60 w-full max-w-lg -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-white shadow-xl focus:outline-none">
          <div style={{ padding: "32px 36px" }}>
            {/* Close */}
            <Dialog.Close className="absolute end-4 top-4 flex h-8 w-8 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-gray-100">
              <X className="h-4 w-4" />
            </Dialog.Close>

            {/* Title */}
            <Dialog.Title style={{ marginBottom: 28 }} className="text-center text-xl font-medium text-foreground">
              {t.reviewModal.title}
            </Dialog.Title>
            <Dialog.Description className="sr-only">{t.reviewModal.title}</Dialog.Description>

            {/* Star ratings */}
            <div style={{ marginBottom: 28, direction: "ltr" }} className="flex items-start justify-center gap-4">
              {ratings.map((rating) => (
                <button
                  key={rating.value}
                  onClick={() => setSelected(rating.value)}
                  className="flex flex-col items-center gap-2"
                >
                  <Star
                    className={cn(
                      "h-10 w-10 transition-colors",
                      selected !== null && rating.value <= selected
                        ? "fill-warning text-warning"
                        : "text-border"
                    )}
                  />
                  <span className="max-w-16 text-center text-xs text-foreground">
                    {rating.label}
                  </span>
                </button>
              ))}
            </div>

            {/* Comment */}
            <textarea
              placeholder={t.reviewModal.addComment}
              rows={4}
              style={{ padding: "14px 16px" }}
              className="mb-6 w-full resize-none rounded-xl border border-border-light bg-white text-sm text-foreground placeholder:text-muted-foreground/40 focus:border-primary/30 focus:outline-none"
            />

            {/* Submit */}
            <button
              onClick={() => onOpenChange(false)}
              style={{ padding: "14px 24px" }}
              className="w-full rounded-xl bg-primary text-base text-white transition-colors hover:bg-primary-dark"
            >
              {t.reviewModal.sendReply}
            </button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
