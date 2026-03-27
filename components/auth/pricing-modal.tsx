"use client";

import { useState } from "react";
import { Check } from "lucide-react";
import { useLanguage } from "@/lib/i18n/context";

interface PricingModalProps {
  onContinue: () => void;
  onReturn: () => void;
}

const plans = [
  {
    id: "basic", name: "Lorem Ipsum\nDolores", price: 110, isPopular: false,
    features: ["Lorem Ipsum Dolor Sit Emmet, Consectetur", "Lorem Ipsum Dolor Sit Emmet, Consectetur", "Lorem Ipsum Dolor Sit Emmet, Consectetur", "Lorem Ipsum Dolor Sit Emmet, Consectetur"],
  },
  {
    id: "professional", name: "Lorem Ipsum\nDolores", price: 110, isPopular: true,
    features: ["Lorem Ipsum Dolor Sit Emmet, Consectetur", "Lorem Ipsum Dolor Sit Emmet, Consectetur", "Lorem Ipsum Dolor Sit Emmet, Consectetur", "Lorem Ipsum Dolor Sit Emmet, Consectetur"],
  },
  {
    id: "enterprise", name: "Lorem Ipsum\nDolores", price: 110, isPopular: false,
    features: ["Lorem Ipsum Dolor Sit Emmet, Consectetur", "Lorem Ipsum Dolor Sit Emmet, Consectetur", "Lorem Ipsum Dolor Sit Emmet, Consectetur", "Lorem Ipsum Dolor Sit Emmet, Consectetur"],
  },
];

export function PricingModal({ onContinue, onReturn }: PricingModalProps) {
  const { t } = useLanguage();
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("yearly");

  return (
    /* Fixed overlay on top of everything */
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ fontFamily: "'Abel', sans-serif", backdropFilter: "blur(4px)", background: "rgba(80, 100, 140, 0.3)" }}
    >
      {/* Modal card */}
      <div
        className="bg-white flex flex-col items-center w-full"
        style={{ borderRadius: 20, padding: "28px 40px 24px", maxWidth: 850, margin: "0 16px", boxShadow: "0 12px 48px rgba(0,0,0,0.12)" }}
      >
        {/* Logo inside modal top-right */}
        <div className="flex justify-end w-full" style={{ marginBottom: 8 }}>
          <div className="flex gap-[6px] items-center" style={{ fontSize: 18, lineHeight: 1.2, opacity: 0.5 }}>
            <span style={{ color: "#0E1117" }}>TEACH</span>
            <span style={{ color: "#2C7AEA" }}>UP</span>
          </div>
        </div>

        {/* Title */}
        <h1 style={{ fontSize: 24, color: "#0E1117", lineHeight: 1.25, margin: "0 0 16px", textAlign: "center" }}>
          {t.success.title}
        </h1>

        {/* Toggle */}
        <div className="flex items-center justify-center" style={{ gap: 14, marginBottom: 14 }}>
          <span style={{ fontSize: 12, color: billingCycle === "monthly" ? "#4C96FF" : "#9CA3AF", lineHeight: 1.3, textAlign: "center", whiteSpace: "pre-line" }}>
            {t.success.monthlyLabel}
          </span>
          <div
            className="relative shrink-0 cursor-pointer"
            style={{ width: 36, height: 20, borderRadius: 10, background: billingCycle === "yearly" ? "#4C96FF" : "#D1D5DB" }}
            onClick={() => setBillingCycle(billingCycle === "monthly" ? "yearly" : "monthly")}
          >
            <div style={{ position: "absolute", top: 2, width: 16, height: 16, borderRadius: "50%", background: "#FFF", boxShadow: "0 1px 2px rgba(0,0,0,0.2)", transition: "transform 0.2s", transform: billingCycle === "yearly" ? "translateX(18px)" : "translateX(2px)" }} />
          </div>
          <span style={{ fontSize: 12, color: billingCycle === "yearly" ? "#0E1117" : "#9CA3AF", lineHeight: 1.3, textAlign: "center", whiteSpace: "pre-line" }}>
            {t.success.annualLabel}
          </span>
        </div>

        {/* Cards */}
        <div className="flex items-center justify-center w-full" style={{ gap: 14, marginBottom: 18 }}>
          {plans.map((plan) => (
            <div
              key={plan.id}
              className="relative flex flex-col"
              style={{
                flex: 1,
                borderRadius: 14,
                padding: plan.isPopular ? "30px 18px 22px" : "20px 18px 18px",
                background: plan.isPopular ? "linear-gradient(180deg, rgba(76,150,255,0.06) 0%, #FFFFFF 100%)" : "#FFFFFF",
                border: plan.isPopular ? "1.5px solid rgba(76,150,255,0.4)" : "1px solid #EAEBEB",
                boxShadow: plan.isPopular ? "0 4px 20px rgba(76,150,255,0.10)" : "0 1px 4px rgba(0,0,0,0.03)",
              }}
            >
              {/* Popular badge */}
              {plan.isPopular && (
                <div className="absolute left-1/2 -translate-x-1/2" style={{ top: -18 }}>
                  <svg width="48" height="40" viewBox="0 0 48 40" fill="none">
                    <path d="M24 0L28.5 8L37 4L34 13L44 16L36 22L40 31L30 29L28 38L24 30L20 38L18 29L8 31L12 22L4 16L14 13L11 4L19.5 8L24 0Z" fill="#4C96FF"/>
                    <text x="24" y="22" textAnchor="middle" fill="white" fontSize="7" fontWeight="600" fontFamily="Abel, sans-serif">popular</text>
                  </svg>
                </div>
              )}

              <p style={{ fontSize: 14, color: "#0E1117", lineHeight: 1.2, marginBottom: 8, fontWeight: 600, textAlign: "center", whiteSpace: "pre-line" }}>
                {plan.name}
              </p>

              <div style={{ marginBottom: 12, textAlign: "center" }}>
                <span style={{ fontSize: 20, fontWeight: 700, color: plan.isPopular ? "#4C96FF" : "#0E1117" }}>₪{plan.price}</span>
                <span style={{ fontSize: 10, color: "#9CA3AF", marginInlineStart: 3 }}>{t.success.pricePerYear}</span>
              </div>

              <div className="flex flex-col" style={{ gap: 6 }}>
                {plan.features.map((feature, i) => (
                  <div key={i} className="flex items-center" style={{ gap: 6 }}>
                    <span style={{ fontSize: 10, lineHeight: 1.3, flex: 1, color: plan.isPopular ? "#4C96FF" : "#0E1117", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                      {feature}
                    </span>
                    <Check size={11} className="shrink-0" style={{ color: "#4C96FF" }} />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Golden CTA */}
        <button
          onClick={onContinue}
          className="cursor-pointer"
          style={{
            width: "70%", maxWidth: 420, height: 40,
            borderRadius: 20, background: "linear-gradient(90deg, #F59E0B 0%, #D97706 100%)",
            border: "none", fontSize: 13, color: "#FFFFFF", fontFamily: "'Abel', sans-serif",
            marginBottom: 16,
          }}
        >
          {t.success.selectPackage}
        </button>

        {/* Bottom buttons */}
        <div className="flex items-center" style={{ gap: 10 }}>
          <button
            onClick={onContinue}
            className="flex items-center justify-center cursor-pointer"
            style={{ width: 120, height: 32, borderRadius: 8, backgroundImage: "linear-gradient(168deg, #4C96FF 12%, #1667DB 94%)", border: "none", fontSize: 13, color: "#FFFFFF", fontFamily: "'Abel', sans-serif" }}
          >
            continuation
          </button>
          <button
            onClick={onReturn}
            className="flex items-center justify-center cursor-pointer"
            style={{ width: 100, height: 32, borderRadius: 8, background: "#FFFFFF", border: "1px solid #EAEBEB", fontSize: 13, color: "#647787", fontFamily: "'Abel', sans-serif" }}
          >
            return
          </button>
        </div>
      </div>
    </div>
  );
}
