"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  const pages: (number | "...")[] = [];

  if (totalPages <= 5) {
    for (let i = 1; i <= totalPages; i++) pages.push(i);
  } else {
    pages.push(1);
    if (currentPage > 3) pages.push("...");
    for (
      let i = Math.max(2, currentPage - 1);
      i <= Math.min(totalPages - 1, currentPage + 1);
      i++
    ) {
      pages.push(i);
    }
    if (currentPage < totalPages - 2) pages.push("...");
    pages.push(totalPages);
  }

  return (
    <div className="flex items-center justify-center gap-2">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="flex h-9 w-9 items-center justify-center rounded-full border border-border-light transition-colors hover:bg-gray-100 disabled:opacity-30"
      >
        <ChevronLeft className="h-4 w-4" />
      </button>

      {pages.map((page, i) =>
        page === "..." ? (
          <span key={`dots-${i}`} className="px-1 text-sm text-muted-foreground">
            ...
          </span>
        ) : (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={cn(
              "flex h-9 w-9 items-center justify-center rounded-full text-sm transition-colors",
              currentPage === page
                ? "bg-foreground text-white"
                : "text-foreground hover:bg-gray-100"
            )}
          >
            {page}
          </button>
        )
      )}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="flex h-9 w-9 items-center justify-center rounded-full border border-border-light transition-colors hover:bg-gray-100 disabled:opacity-30"
      >
        <ChevronRight className="h-4 w-4" />
      </button>
    </div>
  );
}
