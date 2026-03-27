"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Check } from "lucide-react";
import { useLanguage } from "@/lib/i18n/context";

interface PricingPlan {
  id: string;
  name: string;
  price: number;
  features: string[];
  isPopular: boolean;
}

const plans: PricingPlan[] = [
  {
    id: "basic",
    name: "Lorem Ipsum Dolores",
    price: 110,
    features: [
      "Lorem ipsum Dolor Sit Erimet. Conectore",
      "Lorem ipsum Dolor Sit Erimet. Conectore",
      "Lorem ipsum Dolor Sit Erimet. Conectore",
    ],
    isPopular: false,
  },
  {
    id: "professional",
    name: "Lorem Ipsum Dolores",
    price: 110,
    features: [
      "Lorem ipsum Dolor Sit Erimet. Conectore",
      "Lorem ipsum Dolor Sit Erimet. Conectore",
      "Lorem ipsum Dolor Sit Erimet. Conectore",
    ],
    isPopular: true,
  },
  {
    id: "enterprise",
    name: "Lorem Ipsum Dolores",
    price: 110,
    features: [
      "Lorem ipsum Dolor Sit Erimet. Conectore",
      "Lorem ipsum Dolor Sit Erimet. Conectore",
      "Lorem ipsum Dolor Sit Erimet. Conectore",
    ],
    isPopular: false,
  },
];

export default function OnboardingSuccessPage() {
  const router = useRouter();
  const { t } = useLanguage();
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("monthly");

  return (
    <div
      className="w-screen h-screen flex items-center justify-center overflow-hidden"
      style={{ background: "rgba(0,0,0,0.08)", fontFamily: "'Abel', sans-serif" }}
    >
      {/* Modal card */}
      <div
        className="bg-white flex flex-col items-center"
        style={{
          borderRadius: 20,
          padding: "clamp(24px, 3vh, 40px) clamp(32px, 4vw, 60px)",
          maxWidth: 900,
          width: "90vw",
          maxHeight: "90vh",
        }}
      >
        {/* Logo */}
        <div className="flex gap-[8.5px] items-center self-end" style={{ fontSize: "clamp(20px, 1.8vw, 28px)", lineHeight: 1.2, marginBottom: "clamp(8px, 1vh, 16px)" }}>
          <span style={{ color: "#0E1117" }}>TEACH</span>
          <span style={{ color: "#2C7AEA" }}>UP</span>
        </div>

        {/* Title */}
        <h1 style={{ fontSize: "clamp(22px, 2.5vw, 36px)", color: "#0E1117", lineHeight: 1.1, margin: 0, textAlign: "center", marginBottom: "clamp(12px, 1.5vh, 24px)" }}>
          {t.success.title}
        </h1>

        {/* Billing Toggle */}
        <div className="flex items-center justify-center" style={{ gap: "clamp(12px, 1.5vw, 24px)", marginBottom: "clamp(16px, 2vh, 32px)" }}>
          <button
            type="button"
            onClick={() => setBillingCycle("monthly")}
            className="cursor-pointer"
            style={{
              background: "none", border: "none",
              fontSize: "clamp(11px, 1vw, 14px)", fontFamily: "'Abel', sans-serif",
              color: billingCycle === "monthly" ? "#0E1117" : "#9CA3AF",
              whiteSpace: "pre-line", textAlign: "center", lineHeight: 1.3,
            }}
          >
            {t.success.monthlyLabel}
          </button>
          <div
            className="relative shrink-0 cursor-pointer"
            style={{
              width: 44, height: 24, borderRadius: 12,
              background: billingCycle === "yearly" ? "#4C96FF" : "#D1D5DB",
              transition: "background 0.2s",
            }}
            onClick={() => setBillingCycle(billingCycle === "monthly" ? "yearly" : "monthly")}
          >
            <div
              style={{
                position: "absolute", top: 2, width: 20, height: 20, borderRadius: "50%",
                background: "#FFFFFF", boxShadow: "0 1px 3px rgba(0,0,0,0.2)",
                transition: "transform 0.2s",
                transform: billingCycle === "yearly" ? "translateX(22px)" : "translateX(2px)",
              }}
            />
          </div>
          <button
            type="button"
            onClick={() => setBillingCycle("yearly")}
            className="cursor-pointer"
            style={{
              background: "none", border: "none",
              fontSize: "clamp(11px, 1vw, 14px)", fontFamily: "'Abel', sans-serif",
              color: billingCycle === "yearly" ? "#0E1117" : "#9CA3AF",
              whiteSpace: "pre-line", textAlign: "center", lineHeight: 1.3,
            }}
          >
            {t.success.annualLabel}
          </button>
        </div>

        {/* Pricing Cards */}
        <div className="flex items-start justify-center w-full" style={{ gap: "clamp(12px, 1.5vw, 24px)", marginBottom: "clamp(16px, 2vh, 32px)" }}>
          {plans.map((plan) => (
            <div
              key={plan.id}
              className="relative flex flex-col"
              style={{
                flex: 1,
                borderRadius: 16,
                padding: "clamp(16px, 2vh, 28px) clamp(14px, 1.5vw, 24px)",
                background: plan.isPopular ? "linear-gradient(175deg, #4C96FF 12%, #1667DB 94%)" : "#FFFFFF",
                border: plan.isPopular ? "none" : "1px solid #EAEBEB",
                boxShadow: plan.isPopular ? "0 8px 32px rgba(76,150,255,0.25)" : "0 2px 8px rgba(0,0,0,0.04)",
                transform: plan.isPopular ? "scale(1.05)" : "none",
                zIndex: plan.isPopular ? 1 : 0,
              }}
            >
              {plan.isPopular && (
                <div
                  className="absolute -top-3 left-1/2 -translate-x-1/2 flex items-center justify-center"
                  style={{ background: "#1667DB", color: "#FFFFFF", fontSize: 11, fontWeight: 600, padding: "3px 14px", borderRadius: 20, whiteSpace: "nowrap" }}
                >
                  {t.success.mostPopular}
                </div>
              )}

              <p style={{ fontSize: "clamp(14px, 1.2vw, 18px)", color: plan.isPopular ? "#FFFFFF" : "#0E1117", lineHeight: 1.1, marginBottom: "clamp(8px, 1vh, 14px)", fontWeight: 600 }}>
                {plan.name}
              </p>

              <div style={{ marginBottom: "clamp(10px, 1.2vh, 18px)" }}>
                <span style={{ fontSize: "clamp(22px, 2.2vw, 32px)", fontWeight: 700, color: plan.isPopular ? "#FFFFFF" : "#0E1117" }}>
                  ₪{plan.price}
                </span>
                <span style={{ fontSize: "clamp(10px, 0.9vw, 13px)", color: plan.isPopular ? "rgba(255,255,255,0.7)" : "#9CA3AF", marginInlineStart: 4 }}>
                  {t.success.pricePerYear}
                </span>
              </div>

              <div className="flex flex-col" style={{ gap: "clamp(6px, 0.8vh, 10px)" }}>
                {plan.features.map((feature, i) => (
                  <div key={i} className="flex items-start" style={{ gap: 8 }}>
                    <Check size={14} className="shrink-0" style={{ marginTop: 2, color: plan.isPopular ? "#FFFFFF" : "#4C96FF" }} />
                    <span style={{ fontSize: "clamp(10px, 0.9vw, 13px)", lineHeight: 1.4, color: plan.isPopular ? "rgba(255,255,255,0.85)" : "#647787" }}>
                      {feature}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* CTA Button — golden */}
        <button
          onClick={() => router.push("/institution/dashboard")}
          className="cursor-pointer"
          style={{
            width: "clamp(280px, 40vw, 420px)", height: "clamp(40px, 4.5vh, 50px)",
            borderRadius: 24, background: "#F59E0B", border: "none",
            fontSize: "clamp(13px, 1.1vw, 16px)", color: "#FFFFFF", fontFamily: "'Abel', sans-serif",
            marginBottom: "clamp(10px, 1.2vh, 18px)",
          }}
        >
          {t.success.selectPackage}
        </button>

        {/* Bottom buttons */}
        <div className="flex items-center" style={{ gap: 12 }}>
          <button
            className="flex items-center justify-center cursor-pointer"
            style={{ width: 140, height: 36, borderRadius: 10, backgroundImage: "linear-gradient(168deg, #4C96FF 12%, #1667DB 94%)", border: "none", fontSize: 14, color: "#FFFFFF", fontFamily: "'Abel', sans-serif" }}
          >
            {t.common.continue}
          </button>
          <button
            onClick={() => router.push("/institution/dashboard")}
            className="flex items-center justify-center cursor-pointer"
            style={{ width: 120, height: 36, borderRadius: 10, background: "#FFFFFF", border: "1px solid #EAEBEB", fontSize: 14, color: "#647787", fontFamily: "'Abel', sans-serif" }}
          >
            {t.common.skip}
          </button>
        </div>
      </div>
    </div>
  );
}
