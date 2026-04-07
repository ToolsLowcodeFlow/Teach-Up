"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { X, Star } from "lucide-react";
import { useLanguage } from "@/lib/i18n/context";

export default function FeedbackPage() {
  const { locale, direction, t } = useLanguage();
  const isHe = locale === "he";

  const ratings = [
    t.reviewModal.likedVeryMuch,
    t.reviewModal.veryGood,
    t.reviewModal.average,
    t.reviewModal.bad,
    t.reviewModal.veryBad,
  ];
  const router = useRouter();
  const [selected, setSelected] = useState<number | null>(null);
  const [comment, setComment] = useState("");

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ fontFamily: "'Abel', sans-serif" }}
    >
      <div className="fixed inset-0" style={{ background: "rgba(0,0,0,0.4)", backdropFilter: "blur(8px)", WebkitBackdropFilter: "blur(8px)" }} onClick={() => router.push("/jobs")} />

      {/* Modal */}
      <div
        className="relative z-10 flex flex-col rounded-[20px] bg-white"
        style={{ width: 420, padding: "24px 28px 32px", boxShadow: "0 20px 60px rgba(0,0,0,0.15)" }}
      >
        {/* Close button */}
        <button
          onClick={() => router.push("/jobs")}
          className="mb-4 flex shrink-0 cursor-pointer items-center justify-center self-start border-none bg-transparent text-muted-foreground hover:text-foreground"
        >
          <X size={20} />
        </button>

        {/* Title */}
        <h2 className="text-center text-[22px] leading-[1.2] text-foreground" style={{ marginBottom: 24 }}>
          {isHe ? "איך היה החוויה שלך?" : "How was your experience?"}
        </h2>

        {/* Star ratings */}
        <div className="flex items-start justify-center gap-2" style={{ marginBottom: 24 }}>
          {ratings.map((label, i) => (
            <button
              key={i}
              onClick={() => setSelected(i)}
              className="flex cursor-pointer flex-col items-center gap-2 border-none bg-transparent"
              style={{ width: 72 }}
            >
              <div
                className="flex items-center justify-center rounded-[10px] border"
                style={{
                  width: 56,
                  height: 56,
                  borderColor: selected === i ? "#4C96FF" : "#F3F3F6",
                  background: selected === i ? "#EEF4FD" : "white",
                }}
              >
                <Star
                  size={28}
                  fill={selected !== null && i <= selected ? "#FFD700" : "none"}
                  className={selected !== null && i <= selected ? "text-[#FFD700]" : "text-[#C8D0DA]"}
                />
              </div>
              <span className="text-center text-[11px] leading-[1.2] text-foreground">{label}</span>
            </button>
          ))}
        </div>

        {/* Comment box */}
        <textarea
          placeholder={t.reviewModal.addComment}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="w-full resize-none rounded-[10px] border border-border-light bg-white text-sm text-foreground outline-none placeholder:text-muted-foreground/40"
          style={{ height: 100, padding: 14, marginBottom: 20 }}
        />

        {/* Submit button */}
        <button
          onClick={() => router.push("/jobs")}
          className="w-full cursor-pointer rounded-[10px] text-base text-white"
          style={{
            height: 48,
            border: "none",
            backgroundImage: "linear-gradient(168deg, #4C96FF 12%, #1667DB 94%)",
          }}
        >
          {t.reviewModal.sendReply}
        </button>
      </div>
    </div>
  );
}
