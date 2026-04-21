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
    <div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center"
      style={{ fontFamily: "'Heebo', sans-serif", backdropFilter: "blur(4px)", background: "rgba(80, 100, 140, 0.3)" }}
    >
      {/* Modal card */}
      <div
        className="bg-white flex flex-col items-center w-full"
        style={{ borderRadius: 20, padding: "28px 32px 24px", maxWidth: 640, margin: "0 16px", boxShadow: "0 12px 48px rgba(0,0,0,0.12)" }}
      >
        {/* Title */}
        <h1 style={{ fontSize: 20, color: "#0E1117", lineHeight: 1.3, margin: "0 0 16px", textAlign: "center" }}>
          {t.success.title}
        </h1>

        {/* Toggle */}
        <div className="flex items-center justify-center" style={{ gap: 12, marginBottom: 16 }}>
          <span style={{ fontSize: 11, color: billingCycle === "monthly" ? "#4C96FF" : "#9CA3AF", lineHeight: 1.3, textAlign: "center", whiteSpace: "pre-line" }}>
            {t.success.monthlyLabel}
          </span>
          <div
            className="relative shrink-0 cursor-pointer"
            style={{ width: 32, height: 18, borderRadius: 9, background: billingCycle === "yearly" ? "#4C96FF" : "#D1D5DB" }}
            onClick={() => setBillingCycle(billingCycle === "monthly" ? "yearly" : "monthly")}
          >
            <div style={{ position: "absolute", top: 2, width: 14, height: 14, borderRadius: "50%", background: "#FFF", boxShadow: "0 1px 2px rgba(0,0,0,0.2)", transition: "transform 0.2s", transform: billingCycle === "yearly" ? "translateX(16px)" : "translateX(2px)" }} />
          </div>
          <span style={{ fontSize: 11, color: billingCycle === "yearly" ? "#0E1117" : "#9CA3AF", lineHeight: 1.3, textAlign: "center", whiteSpace: "pre-line" }}>
            {t.success.annualLabel}
          </span>
        </div>

        {/* Cards */}
        <div className="flex items-stretch justify-center w-full" style={{ gap: 12, marginBottom: 18 }}>
          {plans.map((plan) => (
            <div
              key={plan.id}
              className="relative flex flex-col"
              style={{
                flex: 1,
                borderRadius: 12,
                padding: plan.isPopular ? "30px 14px 24px" : "20px 14px 20px",
                background: plan.isPopular ? "linear-gradient(0deg, rgba(76,150,255,0.12) 0%, rgba(76,150,255,0.02) 100%)" : "#FFFFFF",
                border: plan.isPopular ? "1.5px solid rgba(76,150,255,0.4)" : "1px solid #EAEBEB",
                boxShadow: plan.isPopular ? "0 4px 20px rgba(76,150,255,0.10)" : "0 1px 4px rgba(0,0,0,0.03)",
              }}
            >
              {plan.isPopular && (
                <div className="absolute left-1/2 -translate-x-1/2" style={{ top: -16 }}>
                  <svg width="40" height="34" viewBox="0 0 48 40" fill="none">
                    <path d="M24 0L28.5 8L37 4L34 13L44 16L36 22L40 31L30 29L28 38L24 30L20 38L18 29L8 31L12 22L4 16L14 13L11 4L19.5 8L24 0Z" fill="#4C96FF"/>
                    <text x="24" y="22" textAnchor="middle" fill="white" fontSize="7" fontWeight="600" fontFamily="Abel, sans-serif">popular</text>
                  </svg>
                </div>
              )}

              <p style={{ fontSize: 12, color: "#0E1117", lineHeight: 1.2, marginBottom: 6, fontWeight: 600, textAlign: "center", whiteSpace: "pre-line" }}>
                {plan.name}
              </p>

              <div style={{ marginBottom: 10, textAlign: "center" }}>
                <span style={{ fontSize: 16, fontWeight: 700, color: plan.isPopular ? "#4C96FF" : "#0E1117" }}>₪{plan.price}</span>
                <span style={{ fontSize: 9, color: "#9CA3AF", marginInlineStart: 3 }}>{t.success.pricePerYear}</span>
              </div>

              <div className="flex flex-col" style={{ gap: 5 }}>
                {plan.features.map((feature, i) => (
                  <div key={i} className="flex items-center" style={{ gap: 4 }}>
                    <span style={{ fontSize: 9, lineHeight: 1.3, flex: 1, color: plan.isPopular ? "#4C96FF" : "#0E1117", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                      {feature}
                    </span>
                    <Check size={10} className="shrink-0" style={{ color: "#4C96FF" }} />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Blue CTA */}
        <button
          onClick={onContinue}
          className="cursor-pointer"
          style={{
            width: "65%", maxWidth: 360, height: 38,
            borderRadius: 20, backgroundImage: "linear-gradient(168deg, #4C96FF 12%, #1667DB 94%)",
            border: "none", fontSize: 13, color: "#FFFFFF", fontFamily: "'Heebo', sans-serif",
          }}
        >
          {t.success.selectPackage}
        </button>
      </div>

    </div>
  );
}
