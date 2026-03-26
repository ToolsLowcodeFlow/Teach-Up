"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/lib/i18n/context";

type Role = "seeker" | "institution";

export default function SelectRolePage() {
  const router = useRouter();
  const { t } = useLanguage();
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleContinue = async () => {
    if (!selectedRole) return;
    setIsLoading(true);
    if (selectedRole === "seeker") {
      router.push("/profile/setup");
    } else {
      router.push("/institution/onboarding");
    }
  };

  return (
    <div className="bg-[#F7F9FC] relative w-full h-screen overflow-hidden flex">

      {/* ===== LEFT PANEL — decorative, stays on left regardless of language ===== */}
      <div className="hidden lg:block absolute left-0 top-0 w-[566px] h-[1024px] bg-[#EFF5FE] overflow-hidden">
        <img src="/images/ellipse1.svg" alt="" className="absolute pointer-events-none" style={{ left: -562, top: 763, width: 781, height: 329 }} />
        <img src="/images/ellipse2.svg" alt="" className="absolute pointer-events-none" style={{ left: 317, top: -319, width: 749, height: 749 }} />
        <div className="absolute pointer-events-none flex flex-col" style={{ left: -228, top: -6, opacity: 0.43 }}>
          {[0, 1, 2].map((row) => (
            <div key={row} className="flex" style={{ marginBottom: -2.87 }}>
              {[0, 1, 2, 3].map((col) => (
                <div key={col} style={{ width: 201, height: 201, border: "2.87px solid white", marginRight: -2.87, background: (row === 0 && col === 1) || (row === 2 && col === 3) ? "white" : "transparent" }} />
              ))}
            </div>
          ))}
        </div>
        <div className="absolute pointer-events-none flex flex-col" style={{ left: -228, top: 588, opacity: 0.43 }}>
          {[0, 1, 2].map((row) => (
            <div key={row} className="flex" style={{ marginBottom: -2.87 }}>
              {[0, 1, 2, 3].map((col) => (
                <div key={col} style={{ width: 201, height: 201, border: "2.87px solid white", marginRight: -2.87, background: (row === 1 && col === 1) ? "white" : "transparent" }} />
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* ===== RIGHT CONTENT — text direction follows locale ===== */}
      <div className="flex-1 flex flex-col lg:ms-[566px]">

        {/* Header — Logo at inline-end */}
        <div className="flex items-start justify-end px-8 lg:px-12 pt-[45px]">
          <div className="flex gap-[8.5px] items-center" style={{ fontFamily: "'Abel', sans-serif", fontSize: 34, lineHeight: 1.2 }}>
            <span className="text-[#0E1117]">TEACH</span>
            <span className="text-[#2C7AEA]">UP</span>
          </div>
        </div>

        {/* Step indicator at inline-end */}
        <div className="flex justify-end px-8 lg:px-12 mt-[20px]">
          <p style={{ fontFamily: "'Abel', sans-serif", fontSize: 16, color: "#97A2C2", lineHeight: 1.2 }}>
            Step 01 of 04
          </p>
        </div>

        {/* Main content — w-602, aligned to inline-end */}
        <div className="flex justify-start px-8 lg:px-12 mt-[12px]">
          <div className="w-full max-w-[602px] flex flex-col gap-[50px] items-start">

            {/* Title + subtitle — text-start (right in LTR English becomes left; in RTL Hebrew becomes right) */}
            {/* Actually for this page: text aligns to END of inline direction */}
            <div className="w-full flex flex-col gap-[30px] items-start text-start" style={{ fontFamily: "'Abel', sans-serif", color: "#0E1117", lineHeight: 1.1 }}>
              <p className="text-[36px] md:text-[50px] w-full">
                {t.selectRole.title}
              </p>
              <p className="text-[24px] md:text-[36px] w-full leading-[1.1]">
                {t.selectRole.subtitle}
              </p>
            </div>

            {/* Prompt + cards */}
            <div className="w-full flex flex-col gap-[20px] items-start">
              <p className="w-full text-start" style={{ fontFamily: "'Abel', sans-serif", fontSize: 22, color: "#647787", lineHeight: 1.2 }}>
                {t.selectRole.prompt}
              </p>

              <div className="w-full flex flex-col gap-[30px] items-start">

                {/* Card 1 — Looking for a job */}
                <button
                  type="button"
                  onClick={() => setSelectedRole("seeker")}
                  className="w-full h-[156px] bg-white rounded-[20px] relative cursor-pointer transition-all"
                  style={{
                    boxShadow: "0px 4px 24px 0px rgba(0,0,0,0.08)",
                    border: selectedRole === "seeker" ? "2px solid #4C96FF" : "2px solid transparent",
                  }}
                >
                  {/* Card inner: text at inline-start, icon at inline-end */}
                  <div className="absolute inset-0 flex items-center justify-between px-[68px]">
                    <div className="flex flex-col gap-px items-start text-start flex-1" style={{ fontFamily: "'Abel', sans-serif", color: "#0E1117", maxWidth: 410 }}>
                      <p className="w-full text-[24px] leading-[1.1]">{t.selectRole.seekerTitle}</p>
                      <p className="w-full text-[16px] leading-[20px]">{t.selectRole.seekerDesc}</p>
                    </div>
                    <div className="relative shrink-0 ms-4" style={{ width: 82, height: 82 }}>
                      <img src="/images/ellipse-blue-ring.svg" alt="" className="absolute inset-0 w-full h-full" />
                      <div
                        className="absolute rounded-full overflow-hidden flex items-center justify-center"
                        style={{ left: 16, top: 16, width: 50, height: 50, background: "linear-gradient(140deg, #4C96FF 12%, #1667DB 94%)", border: "0.86px solid white", boxShadow: "0 0 0 10px rgba(255,255,255,0.61)" }}
                      >
                        <img src="/images/icon-message-text-blue.svg" alt="" style={{ width: 26, height: 26 }} />
                      </div>
                    </div>
                  </div>
                </button>

                {/* Card 2 — Recruits education */}
                <button
                  type="button"
                  onClick={() => setSelectedRole("institution")}
                  className="w-full h-[156px] bg-white rounded-[20px] relative cursor-pointer transition-all"
                  style={{
                    boxShadow: "0px 4px 24px 0px rgba(0,0,0,0.08)",
                    border: selectedRole === "institution" ? "2px solid #4C96FF" : "2px solid transparent",
                  }}
                >
                  <div className="absolute inset-0 flex items-center justify-between px-[68px]">
                    <div className="flex flex-col gap-px items-start text-start flex-1" style={{ fontFamily: "'Abel', sans-serif", color: "#0E1117", maxWidth: 410 }}>
                      <p className="w-full text-[24px] leading-[1.1]">{t.selectRole.institutionTitle}.</p>
                      <p className="w-full text-[16px] leading-[20px]">{t.selectRole.institutionDesc}</p>
                    </div>
                    <div className="relative shrink-0 ms-4" style={{ width: 82, height: 82 }}>
                      <img src="/images/ellipse-purple-ring.svg" alt="" className="absolute inset-0 w-full h-full" />
                      <div
                        className="absolute rounded-full overflow-hidden flex items-center justify-center"
                        style={{ left: 16, top: 16, width: 50, height: 50, background: "#AC4CFF", border: "0.86px solid white", boxShadow: "0 0 0 10px rgba(255,255,255,0.61)" }}
                      >
                        <img src="/images/icon-message-text-purple.svg" alt="" style={{ width: 26, height: 26 }} />
                      </div>
                    </div>
                  </div>
                </button>
              </div>
            </div>

            {/* Continue button — aligned to inline-end */}
            <button
              type="button"
              onClick={handleContinue}
              disabled={!selectedRole || isLoading}
              className="w-[162px] h-[40px] rounded-[10px] flex items-center justify-center cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
              style={{
                backgroundImage: "linear-gradient(168.47deg, rgb(76, 150, 255) 12.19%, rgb(22, 103, 219) 93.76%)",
                border: "none", fontFamily: "'Abel', sans-serif", fontSize: 16, color: "#FFFFFF",
              }}
            >
              {isLoading ? "..." : t.selectRole.continueButton}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
