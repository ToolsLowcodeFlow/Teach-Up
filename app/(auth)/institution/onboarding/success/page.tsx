"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Check } from "lucide-react";
import { useLanguage } from "@/lib/i18n/context";
import { OnboardingLayout } from "@/components/auth/onboarding-layout";

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

  const handleSelectPlan = (planId: string) => {
    console.log("Selected plan:", planId, billingCycle);
    router.push("/institution/dashboard");
  };

  return (
    <OnboardingLayout>
      <div className="text-center mb-8">
        <h1 className="text-[22px] font-bold text-[#1F2937] mb-2">
          {t.success.title}
        </h1>
      </div>

      {/* Billing Toggle */}
      <div className="flex items-center justify-center gap-5 mb-10">
        <button
          type="button"
          onClick={() => setBillingCycle("monthly")}
          className={`text-[13px] font-medium transition-colors cursor-pointer whitespace-pre-line text-center leading-tight ${
            billingCycle === "monthly" ? "text-[#1F2937]" : "text-[#9CA3AF]"
          }`}
        >
          {t.success.monthlyLabel}
        </button>
        <div
          className={`relative w-[48px] h-[26px] rounded-full transition-colors cursor-pointer shrink-0 ${
            billingCycle === "yearly" ? "bg-[#4B7BF5]" : "bg-[#D1D5DB]"
          }`}
          onClick={() => setBillingCycle(billingCycle === "monthly" ? "yearly" : "monthly")}
        >
          <div
            className={`absolute top-[3px] w-[20px] h-[20px] rounded-full bg-white shadow-md transition-transform ${
              billingCycle === "yearly" ? "translate-x-[24px]" : "translate-x-[3px]"
            }`}
          />
        </div>
        <button
          type="button"
          onClick={() => setBillingCycle("yearly")}
          className={`text-[13px] font-medium transition-colors cursor-pointer whitespace-pre-line text-center leading-tight ${
            billingCycle === "yearly" ? "text-[#1F2937]" : "text-[#9CA3AF]"
          }`}
        >
          {t.success.annualLabel}
        </button>
      </div>

      {/* Pricing Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 items-start">
        {plans.map((plan) => (
          <div
            key={plan.id}
            className={`relative rounded-2xl p-6 transition-all ${
              plan.isPopular
                ? "bg-[#4B7BF5] text-white shadow-xl md:scale-105 md:-mt-2 md:mb-2 z-10"
                : "bg-white border border-[#E5E7EB] shadow-sm"
            }`}
          >
            {plan.isPopular && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#3A62C4] text-white text-[11px] font-semibold px-4 py-1 rounded-full whitespace-nowrap">
                {t.success.mostPopular}
              </div>
            )}

            <h3 className={`text-[16px] font-bold mb-3 ${plan.isPopular ? "text-white" : "text-[#1F2937]"}`}>
              {plan.name}
            </h3>

            <div className="mb-5">
              <span className={`text-[28px] font-bold ${plan.isPopular ? "text-white" : "text-[#1F2937]"}`}>
                ₪{plan.price}
              </span>
              <span className={`text-[12px] ms-1 ${plan.isPopular ? "text-white/70" : "text-[#9CA3AF]"}`}>
                {t.success.pricePerYear}
              </span>
            </div>

            <ul className="space-y-2.5">
              {plan.features.map((feature, i) => (
                <li key={i} className="flex items-start gap-2 text-[12px]">
                  <Check className={`w-4 h-4 shrink-0 mt-0.5 ${plan.isPopular ? "text-white" : "text-[#4B7BF5]"}`} />
                  <span className={plan.isPopular ? "text-white/85" : "text-[#6B7280]"}>
                    {feature}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* CTA */}
      <div className="mt-10 text-center">
        <button
          onClick={() => handleSelectPlan("professional")}
          className="h-[46px] px-10 bg-[#F59E0B] hover:bg-[#D97706] text-white text-[14px] font-medium rounded-lg transition-colors cursor-pointer shadow-sm"
        >
          {t.success.selectPackage}
        </button>
      </div>

      {/* Actions */}
      <div className="flex items-center justify-center gap-3 mt-5">
        <button
          type="button"
          className="h-[42px] px-8 bg-[#4B7BF5] hover:bg-[#3A62C4] text-white text-[13px] font-medium rounded-lg transition-colors cursor-pointer"
        >
          {t.common.continue}
        </button>
        <button
          type="button"
          onClick={() => router.push("/institution/dashboard")}
          className="h-[42px] px-8 border border-[#E5E7EB] text-[#6B7280] text-[13px] font-medium rounded-lg hover:bg-[#F9FAFB] transition-colors cursor-pointer"
        >
          {t.common.skip}
        </button>
      </div>
    </OnboardingLayout>
  );
}
