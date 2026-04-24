"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface DropdownSelectProps {
  label: string;
  options: string[];
  placeholder?: boolean;
  value?: string;
  onChange?: (value: string) => void;
}

export function DropdownSelect({ label, options, placeholder, value, onChange }: DropdownSelectProps) {
  const [open, setOpen] = useState(false);
  const [internal, setInternal] = useState(value || "");
  const isControlled = value !== undefined;
  const selected = isControlled ? value : internal;
  const setSelected = (v: string) => {
    if (!isControlled) setInternal(v);
  };

  return (
    <div className="relative w-full">
      <button
        onClick={() => setOpen(!open)}
        style={{ padding: "12px 16px" }}
        className={cn(
          "flex w-full items-center justify-between rounded-[10px] border border-border-light bg-white text-sm tracking-tight transition-colors hover:border-primary/30",
          !selected && placeholder ? "text-muted-foreground/30" : "text-foreground"
        )}
      >
        <span>{selected || label}</span>
        <ChevronDown className={cn("h-3 w-3 shrink-0 text-muted-foreground transition-transform", open && "rotate-180")} />
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setOpen(false)} />
          <div
            style={{ padding: "6px 0" }}
            className="absolute inset-s-0 top-full z-20 mt-1 max-h-48 w-full overflow-y-auto rounded-xl border border-border-light bg-white shadow-lg"
          >
            {options.map((option) => (
              <button
                key={option}
                onClick={() => {
                  setSelected(option);
                  onChange?.(option);
                  setOpen(false);
                }}
                style={{ padding: "8px 16px" }}
                className={cn(
                  "flex w-full text-start text-sm transition-colors hover:bg-[#F7F9FC]",
                  selected === option ? "text-primary" : "text-foreground"
                )}
              >
                {option}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
