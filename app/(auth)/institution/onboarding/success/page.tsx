"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Check } from "lucide-react";
import { useLanguage } from "@/lib/i18n/context";

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

export default function OnboardingSuccessPage() {
  const router = useRouter();
  const { t } = useLanguage();
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("yearly");

  return (
    <div className="w-screen h-screen flex flex-col overflow-hidden" style={{ fontFamily: "'Heebo', sans-serif" }}>

      {/* Background split */}
      <div className="absolute inset-0 flex">
        <div style={{ flex: "0 0 63%", background: "#F7F9FC" }} />
        <div className="hidden lg:block relative overflow-hidden" style={{ flex: "0 0 37%", background: "#EFF5FE" }}>
          <div className="absolute pointer-events-none flex flex-col" style={{ left: 0, top: -6, opacity: 0.3 }}>
            {[0, 1, 2].map((row) => (
              <div key={row} className="flex" style={{ marginBottom: -2.87 }}>
                {[0, 1, 2, 3].map((col) => (
                  <div key={col} style={{ width: 201, height: 201, border: "2.87px solid white", marginRight: -2.87 }} />
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Overlay */}
      <div className="absolute inset-0" style={{ background: "rgba(80, 100, 140, 0.25)" }} />

      {/* Logo */}
      <div className="relative z-10 flex justify-end shrink-0" style={{ padding: "20px 36px 0" }}>
        <div className="flex gap-[6px] items-center" style={{ fontSize: 20, lineHeight: 1.2, opacity: 0.7 }}>
          <span style={{ color: "#0E1117" }}>TEACH</span>
          <span style={{ color: "#2C7AEA" }}>UP</span>
        </div>
      </div>

      {/* Modal — centered */}
      <div className="relative z-10 flex-1 flex items-center justify-center px-4">
        <div
          className="bg-white flex flex-col items-center w-full"
          style={{ borderRadius: 20, padding: "28px 40px 24px", maxWidth: 850, boxShadow: "0 12px 48px rgba(0,0,0,0.10)" }}
        >
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
                  background: plan.isPopular
                    ? "linear-gradient(180deg, rgba(76,150,255,0.06) 0%, #FFFFFF 100%)"
                    : "#FFFFFF",
                  border: plan.isPopular ? "1.5px solid rgba(76,150,255,0.4)" : "1px solid #EAEBEB",
                  boxShadow: plan.isPopular
                    ? "0 4px 20px rgba(76,150,255,0.10)"
                    : "0 1px 4px rgba(0,0,0,0.03)",
                }}
              >
                {/* Popular badge — star/seal shape */}
                {plan.isPopular && (
                  <div className="absolute left-1/2 -translate-x-1/2" style={{ top: -18 }}>
                    <svg width="48" height="40" viewBox="0 0 48 40" fill="none">
                      <path d="M24 0L28.5 8L37 4L34 13L44 16L36 22L40 31L30 29L28 38L24 30L20 38L18 29L8 31L12 22L4 16L14 13L11 4L19.5 8L24 0Z" fill="#4C96FF"/>
                      <text x="24" y="22" textAnchor="middle" fill="white" fontSize="7" fontWeight="600" fontFamily="Abel, sans-serif">popular</text>
                    </svg>
                  </div>
                )}

                {/* Name — centered */}
                <p style={{ fontSize: 14, color: "#0E1117", lineHeight: 1.2, marginBottom: 8, fontWeight: 600, textAlign: "center", whiteSpace: "pre-line" }}>
                  {plan.name}
                </p>

                {/* Price — centered */}
                <div style={{ marginBottom: 12, textAlign: "center" }}>
                  <span style={{ fontSize: 20, fontWeight: 700, color: plan.isPopular ? "#4C96FF" : "#0E1117" }}>₪{plan.price}</span>
                  <span style={{ fontSize: 10, color: "#9CA3AF", marginInlineStart: 3 }}>{t.success.pricePerYear}</span>
                </div>

                {/* Features */}
                <div className="flex flex-col" style={{ gap: 6 }}>
                  {plan.features.map((feature, i) => (
                    <div key={i} className="flex items-center" style={{ gap: 6 }}>
                      <span style={{
                        fontSize: 10, lineHeight: 1.3, flex: 1,
                        color: plan.isPopular ? "#4C96FF" : "#0E1117",
                        whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
                      }}>
                        {feature}
                      </span>
                      <Check size={11} className="shrink-0" style={{ color: plan.isPopular ? "#4C96FF" : "#4C96FF" }} />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Golden CTA — inside modal */}
          <button
            onClick={() => router.push("/institution/dashboard")}
            className="cursor-pointer"
            style={{
              width: "70%", maxWidth: 420, height: 40,
              borderRadius: 20, background: "linear-gradient(90deg, #F59E0B 0%, #D97706 100%)",
              border: "none", fontSize: 13, color: "#FFFFFF", fontFamily: "'Heebo', sans-serif",
              marginBottom: 16,
            }}
          >
            {t.success.selectPackage}
          </button>

          {/* Buttons — inside modal at bottom */}
          <div className="flex items-center" style={{ gap: 10 }}>
            <button
              className="flex items-center justify-center cursor-pointer"
              style={{ width: 120, height: 32, borderRadius: 8, backgroundImage: "linear-gradient(168deg, #4C96FF 12%, #1667DB 94%)", border: "none", fontSize: 13, color: "#FFFFFF", fontFamily: "'Heebo', sans-serif" }}
            >
              continuation
            </button>
            <button
              onClick={() => router.push("/institution/dashboard")}
              className="flex items-center justify-center cursor-pointer"
              style={{ width: 100, height: 32, borderRadius: 8, background: "#FFFFFF", border: "1px solid #EAEBEB", fontSize: 13, color: "#647787", fontFamily: "'Heebo', sans-serif" }}
            >
              return
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
