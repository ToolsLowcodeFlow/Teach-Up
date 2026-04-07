"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Check, MoreHorizontal } from "lucide-react";
import { AdminNavbar } from "@/components/admin/admin-navbar";
import { useLanguage } from "@/lib/i18n/context";

const plans = [
  { id: "basic", name: "Lorem Ipsum\nDolores", price: 110, isPopular: false, features: ["Lorem Ipsum Dolor Sit Emmet, Consectetur", "Lorem Ipsum Dolor Sit Emmet, Consectetur", "Lorem Ipsum Dolor Sit Emmet, Consectetur", "Lorem Ipsum Dolor Sit Emmet, Consectetur"] },
  { id: "professional", name: "Lorem Ipsum\nDolores", price: 110, isPopular: true, features: ["Lorem Ipsum Dolor Sit Emmet, Consectetur", "Lorem Ipsum Dolor Sit Emmet, Consectetur", "Lorem Ipsum Dolor Sit Emmet, Consectetur", "Lorem Ipsum Dolor Sit Emmet, Consectetur"] },
  { id: "enterprise", name: "Lorem Ipsum\nDolores", price: 110, isPopular: false, features: ["Lorem Ipsum Dolor Sit Emmet, Consectetur", "Lorem Ipsum Dolor Sit Emmet, Consectetur", "Lorem Ipsum Dolor Sit Emmet, Consectetur", "Lorem Ipsum Dolor Sit Emmet, Consectetur"] },
];

export default function AdminRoutesPage() {
  const { t, direction } = useLanguage();
  const router = useRouter();
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("yearly");
  const [openMenu, setOpenMenu] = useState<string | null>(null);

  return (
    <div className="flex h-screen flex-col overflow-hidden bg-[#F7F9FC]" style={{ fontFamily: "'Abel', sans-serif" }}>
      <AdminNavbar />

      <div dir={direction} className="flex flex-1 flex-col" style={{ padding: "20px 40px 20px" }}>
        {/* Header */}
        <div className="flex flex-col gap-1 shrink-0" style={{ marginBottom: 16 }}>
          <h1 className="text-[28px] leading-[1.1] text-foreground">{t.admin.routesTitle}</h1>
          <p className="text-sm text-muted-foreground">{t.admin.routesSubtitle}</p>
        </div>

        {/* Pricing card */}
        <div className="flex flex-1 flex-col justify-center rounded-2xl bg-white" style={{ padding: "24px 32px" }}>
          {/* Toggle */}
          <div className="flex items-center justify-center" style={{ gap: 14, marginBottom: 16 }}>
            <div
              className="text-center"
              style={{ fontSize: 14, lineHeight: 1.2, color: billingCycle === "monthly" ? "#0E1117" : "#647787", whiteSpace: "pre-line" }}
            >
              {t.admin.monthlyPrice}
            </div>
            <div
              className="relative shrink-0 cursor-pointer"
              style={{ width: 48, height: 28, borderRadius: 50, background: "#FFFFFF", border: "1.5px solid #D0D5DD" }}
              onClick={() => setBillingCycle(billingCycle === "monthly" ? "yearly" : "monthly")}
            >
              <div
                style={{
                  position: "absolute", top: 2, width: 22, height: 22, borderRadius: 50,
                  backgroundImage: "linear-gradient(140deg, #4C96FF 12%, #1667DB 94%)",
                  transition: "transform 0.2s",
                  transform: billingCycle === "yearly" ? "translateX(22px)" : "translateX(2px)",
                }}
              />
            </div>
            <div
              className="text-center"
              style={{ fontSize: 14, lineHeight: 1.2, color: billingCycle === "yearly" ? "#0E1117" : "#647787", whiteSpace: "pre-line" }}
            >
              {t.admin.annualPrice}
            </div>
          </div>

          {/* Cards */}
          <div className="flex flex-1 items-stretch justify-center" style={{ gap: 36, paddingTop: 20 }}>
            {plans.map((plan) => (
              <div
                key={plan.id}
                className="relative flex flex-col items-center justify-center"
                style={{
                  width: 303, borderRadius: 20,
                  padding: "clamp(24px, 3vh, 40px) 24px",
                  background: plan.isPopular ? "linear-gradient(180deg, white 36%, #BCE0FF 100%)" : "#FFFFFF",
                  border: plan.isPopular ? "1px solid #4C96FF" : "1px solid #F3F3F6",
                  boxShadow: "0px 4px 24px rgba(0,0,0,0.08)",
                }}
              >
                {/* Popular badge */}
                {plan.isPopular && (
                  <div className="absolute flex items-center justify-center" style={{ top: -20, left: -10, width: 50, height: 50 }}>
                    <img src="/images/popular-badge.svg" alt="" className="absolute h-full w-full" />
                    <span className="relative text-white" style={{ fontSize: 9, lineHeight: 1 }}>{t.admin.popular}</span>
                  </div>
                )}

                {/* Menu button */}
                <div className="absolute" style={{ top: 12, right: 12 }}>
                  <div className="relative">
                    <button
                      onClick={() => setOpenMenu(openMenu === plan.id ? null : plan.id)}
                      className="flex cursor-pointer items-center justify-center border-none bg-transparent text-muted-foreground hover:text-foreground"
                    >
                      <MoreHorizontal size={18} />
                    </button>
                    {openMenu === plan.id && (
                      <>
                        <div className="fixed inset-0 z-10" onClick={() => setOpenMenu(null)} />
                        <div className="absolute right-0 top-7 z-20 flex min-w-32 flex-col gap-1 rounded-xl border border-border-light bg-white shadow-lg" style={{ padding: "10px 14px" }}>
                          <button onClick={() => { setOpenMenu(null); router.push(`/admin/routes/edit/${plan.id}`); }} className="flex w-full whitespace-nowrap py-1.5 text-start text-sm text-foreground transition-colors hover:text-primary">{t.admin.editRoute}</button>
                          <button onClick={() => setOpenMenu(null)} className="flex w-full whitespace-nowrap py-1.5 text-start text-sm text-foreground transition-colors hover:text-primary">{t.admin.hidingRoute}</button>
                        </div>
                      </>
                    )}
                  </div>
                </div>

                <div className="flex w-[270px] flex-col items-center" style={{ gap: "clamp(12px, 1.8vh, 20px)" }}>
                  {/* Title + Price */}
                  <div className="flex flex-col items-center" style={{ gap: 10 }}>
                    <p className="text-center text-foreground" style={{ fontSize: "clamp(20px, 1.8vw, 26px)", lineHeight: 1.1, whiteSpace: "pre-line" }}>
                      {plan.name}
                    </p>
                    <p className="text-center text-foreground" style={{ fontSize: "clamp(20px, 1.8vw, 26px)" }}>
                      <span>₪{plan.price} </span>
                      <span style={{ fontSize: "clamp(13px, 1.1vw, 16px)" }}>{t.admin.pricePerYear}</span>
                    </p>
                  </div>

                  {/* Divider */}
                  <div className="h-px w-full bg-[#E8E8EA]" />

                  {/* Features */}
                  <div className="flex w-full flex-col" style={{ gap: "clamp(8px, 1.5vh, 18px)" }}>
                    {plan.features.map((feature, i) => (
                      <div key={i} className="flex w-full items-center" style={{ gap: 6 }}>
                        <Check size={16} className="shrink-0 text-primary" strokeWidth={2.5} />
                        <span className="flex-1 text-foreground" style={{ fontSize: "clamp(13px, 1.1vw, 16px)", lineHeight: 1.2 }}>
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
