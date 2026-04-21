"use client";

import { useState } from "react";
import { Check } from "lucide-react";
import { PublicNavbar } from "@/components/home/public-navbar";
import { useLanguage } from "@/lib/i18n/context";

const plans = [
  {
    id: "basic",
    name: "Lorem Ipsum\nDolores",
    price: 110,
    isPopular: false,
    features: [
      "Lorem Ipsum Dolor Sit Emmet, Consectetur",
      "Lorem Ipsum Dolor Sit Emmet, Consectetur",
      "Lorem Ipsum Dolor Sit Emmet, Consectetur",
      "Lorem Ipsum Dolor Sit Emmet, Consectetur",
    ],
  },
  {
    id: "professional",
    name: "Lorem Ipsum\nDolores",
    price: 110,
    isPopular: true,
    features: [
      "Lorem Ipsum Dolor Sit Emmet, Consectetur",
      "Lorem Ipsum Dolor Sit Emmet, Consectetur",
      "Lorem Ipsum Dolor Sit Emmet, Consectetur",
      "Lorem Ipsum Dolor Sit Emmet, Consectetur",
    ],
  },
  {
    id: "enterprise",
    name: "Lorem Ipsum\nDolores",
    price: 110,
    isPopular: false,
    features: [
      "Lorem Ipsum Dolor Sit Emmet, Consectetur",
      "Lorem Ipsum Dolor Sit Emmet, Consectetur",
      "Lorem Ipsum Dolor Sit Emmet, Consectetur",
      "Lorem Ipsum Dolor Sit Emmet, Consectetur",
    ],
  },
];

export default function PricesPage() {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("yearly");
  const { locale, direction } = useLanguage();
  const isHe = locale === "he";

  return (
    <div className="flex h-screen flex-col overflow-hidden bg-gradient-to-b from-white from-[40%] to-[#EEF3FD]">
      <PublicNavbar />

      {/* Pricing content */}
      <div className="flex flex-1 flex-col items-center justify-center px-10" style={{ paddingTop: 80 }} dir={direction}>
        <div className="flex w-full max-w-[981px] flex-col items-center" style={{ gap: "clamp(20px, 3vh, 40px)" }}>
          {/* Toggle */}
          <div className="flex items-center" style={{ gap: 18 }}>
            <div
              className="text-center"
              style={{
                fontSize: "clamp(16px, 1.5vw, 22px)",
                lineHeight: 1.1,
                color: billingCycle === "monthly" ? "#0E1117" : "#647787",
                whiteSpace: "pre-line",
              }}
            >
              {isHe ? "מחיר חודשי\nללא התחייבות" : "Monthly price\nwithout obligation"}
            </div>
            <div
              className="relative shrink-0 cursor-pointer"
              style={{
                width: 60,
                height: 36,
                borderRadius: 50,
                background: "#FFFFFF",
                border: "1.5px solid #D0D5DD",
              }}
              onClick={() => setBillingCycle(billingCycle === "monthly" ? "yearly" : "monthly")}
            >
              <div
                style={{
                  position: "absolute",
                  top: 2,
                  width: 30,
                  height: 30,
                  borderRadius: 50,
                  backgroundImage: "linear-gradient(140deg, #4C96FF 12%, #1667DB 94%)",
                  transition: "transform 0.2s",
                  transform: billingCycle === "yearly" ? "translateX(26px)" : "translateX(2px)",
                }}
              />
            </div>
            <div
              className="text-center"
              style={{
                fontSize: "clamp(16px, 1.5vw, 22px)",
                lineHeight: 1.1,
                color: billingCycle === "yearly" ? "#0E1117" : "#647787",
                whiteSpace: "pre-line",
              }}
            >
              {isHe ? "מחיר שנתי\nעד 10% חיסכון" : "Annual price\nup to 10% savings"}
            </div>
          </div>

          {/* Cards row with badge space */}
          <div className="flex w-full items-end justify-center" style={{ gap: 36, paddingTop: 35 }}>
            {plans.map((plan) => (
              <div
                key={plan.id}
                className="relative flex flex-col items-center"
                style={{
                  width: 303,
                  borderRadius: 20,
                  padding: "clamp(28px, 4vh, 50px) 16px",
                  background: plan.isPopular
                    ? "linear-gradient(180deg, white 36%, #BCE0FF 100%)"
                    : "#FFFFFF",
                  border: plan.isPopular
                    ? "1px solid #4C96FF"
                    : "1px solid #F3F3F6",
                  boxShadow: "0px 4px 24px rgba(0,0,0,0.08)",
                }}
              >
                {/* Popular badge */}
                {plan.isPopular && (
                  <div
                    className="absolute flex items-center justify-center"
                    style={{ top: -30, left: -15, width: 65, height: 65 }}
                  >
                    <img
                      src="/images/popular-badge.svg"
                      alt=""
                      className="absolute h-full w-full"
                    />
                    <span
                      className="relative text-white"
                      style={{ fontSize: 11, lineHeight: 1 }}
                    >
                      {isHe ? "פופולרי" : "popular"}
                    </span>
                  </div>
                )}

                <div className="flex w-[270px] flex-col items-center" style={{ gap: "clamp(12px, 1.8vh, 20px)" }}>
                  {/* Title + Price */}
                  <div className="flex flex-col items-center" style={{ gap: 10 }}>
                    <p
                      className="text-center text-foreground"
                      style={{ fontSize: "clamp(20px, 1.8vw, 26px)", lineHeight: 1.1, whiteSpace: "pre-line" }}
                    >
                      {plan.name}
                    </p>
                    <p className="text-center text-foreground" style={{ fontSize: "clamp(20px, 1.8vw, 26px)" }}>
                      <span>₪{plan.price} </span>
                      <span style={{ fontSize: "clamp(13px, 1.1vw, 16px)" }}>{isHe ? "מחיר לשנה" : "Price per year"}</span>
                    </p>
                  </div>

                  {/* Divider */}
                  <div className="h-px w-full bg-[#E8E8EA]" />

                  {/* Features */}
                  <div className="flex w-full flex-col" style={{ gap: "clamp(8px, 1.5vh, 18px)" }}>
                    {plan.features.map((feature, i) => (
                      <div key={i} className="flex w-full items-center" style={{ gap: 6 }}>
                        <Check size={16} className="shrink-0 text-primary" strokeWidth={2.5} />
                        <span
                          className="flex-1 text-foreground"
                          style={{ fontSize: "clamp(13px, 1.1vw, 16px)", lineHeight: 1.2 }}
                        >
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* CTA Button */}
          <button
            className="cursor-pointer text-white"
            style={{
              width: 380,
              height: 50,
              borderRadius: 10,
              backgroundImage: "linear-gradient(174deg, #4C96FF 12%, #1667DB 94%)",
              border: "none",
              fontSize: 16,
              fontFamily: "'Heebo', sans-serif",
              flexShrink: 0,
            }}
          >
            {isHe ? "המשך עם החבילה שנבחרה" : "Continue with the selected package"}
          </button>
        </div>
      </div>
    </div>
  );
}
