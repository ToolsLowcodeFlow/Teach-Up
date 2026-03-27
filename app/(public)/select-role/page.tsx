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
    <div
      className="w-screen h-screen overflow-hidden flex"
      style={{ fontFamily: "'Abel', sans-serif", background: "#F7F9FC" }}
    >
      {/* LEFT — Content */}
      <div className="flex-1 flex flex-col h-full">

        {/* Top bar */}
        <div className="flex items-center justify-between shrink-0" style={{ padding: "3vh 4vw 0 4vw" }}>
          <div className="flex gap-[8.5px] items-center" style={{ fontSize: "clamp(24px, 2.2vw, 34px)", lineHeight: 1.2 }}>
            <span style={{ color: "#0E1117" }}>TEACH</span>
            <span style={{ color: "#2C7AEA" }}>UP</span>
          </div>
          <p style={{ fontSize: "clamp(12px, 1.1vw, 16px)", color: "#97A2C2", lineHeight: 1.2 }}>
            Step 01 of 04
          </p>
        </div>

        {/* Main — vertically centered */}
        <div className="flex-1 flex items-center" style={{ padding: "0 4vw" }}>
          <div className="flex flex-col" style={{ gap: "clamp(16px, 2.5vh, 40px)", maxWidth: 620 }}>

            {/* Title + Subtitle */}
            <div className="flex flex-col" style={{ gap: "clamp(10px, 1.5vh, 20px)" }}>
              <h1 style={{ fontSize: "clamp(28px, 3.3vw, 50px)", color: "#0E1117", lineHeight: 1.1, margin: 0 }}>
                {t.selectRole.title}
              </h1>
              <p style={{ fontSize: "clamp(20px, 2.2vw, 36px)", color: "#0E1117", lineHeight: 1.1, margin: 0 }}>
                {t.selectRole.subtitle}
              </p>
            </div>

            {/* Prompt */}
            <p style={{ fontSize: "clamp(14px, 1.4vw, 22px)", color: "#647787", lineHeight: 1.3, margin: 0 }}>
              {t.selectRole.prompt}
            </p>

            {/* Cards */}
            <div className="flex flex-col" style={{ gap: "clamp(12px, 1.5vh, 24px)" }}>

              {/* Card 1 */}
              <button
                type="button"
                onClick={() => setSelectedRole("seeker")}
                className="flex items-center text-start cursor-pointer transition-all"
                style={{
                  padding: "clamp(16px, 2vh, 30px) clamp(20px, 2.5vw, 40px)",
                  background: "#FFFFFF",
                  borderRadius: 20,
                  boxShadow: "0px 4px 24px 0px rgba(0,0,0,0.08)",
                  border: selectedRole === "seeker" ? "2px solid #4C96FF" : "2px solid transparent",
                  gap: "clamp(20px, 3vw, 50px)",
                }}
              >
                <div className="relative shrink-0" style={{ width: "clamp(56px, 5.5vw, 82px)", height: "clamp(56px, 5.5vw, 82px)" }}>
                  <img src="/images/ellipse-blue-ring.svg" alt="" className="absolute inset-0 w-full h-full" />
                  <div
                    className="absolute rounded-full overflow-hidden flex items-center justify-center"
                    style={{ left: "19.5%", top: "19.5%", width: "61%", height: "61%", background: "linear-gradient(140deg, #4C96FF 12%, #1667DB 94%)", border: "0.86px solid white", boxShadow: "0 0 0 10px rgba(255,255,255,0.61)" }}
                  >
                    <img src="/images/icon-message-text-blue.svg" alt="" style={{ width: "52%", height: "52%" }} />
                  </div>
                </div>
                <div className="flex flex-col" style={{ gap: 4 }}>
                  <p style={{ fontSize: "clamp(16px, 1.5vw, 24px)", color: "#0E1117", lineHeight: 1.1, margin: 0 }}>{t.selectRole.seekerTitle}</p>
                  <p style={{ fontSize: "clamp(12px, 1vw, 16px)", color: "#0E1117", lineHeight: 1.4, margin: 0, opacity: 0.6 }}>{t.selectRole.seekerDesc}</p>
                </div>
              </button>

              {/* Card 2 */}
              <button
                type="button"
                onClick={() => setSelectedRole("institution")}
                className="flex items-center text-start cursor-pointer transition-all"
                style={{
                  padding: "clamp(16px, 2vh, 30px) clamp(20px, 2.5vw, 40px)",
                  background: "#FFFFFF",
                  borderRadius: 20,
                  boxShadow: "0px 4px 24px 0px rgba(0,0,0,0.08)",
                  border: selectedRole === "institution" ? "2px solid #4C96FF" : "2px solid transparent",
                  gap: "clamp(20px, 3vw, 50px)",
                }}
              >
                <div className="relative shrink-0" style={{ width: "clamp(56px, 5.5vw, 82px)", height: "clamp(56px, 5.5vw, 82px)" }}>
                  <img src="/images/ellipse-purple-ring.svg" alt="" className="absolute inset-0 w-full h-full" />
                  <div
                    className="absolute rounded-full overflow-hidden flex items-center justify-center"
                    style={{ left: "19.5%", top: "19.5%", width: "61%", height: "61%", background: "#AC4CFF", border: "0.86px solid white", boxShadow: "0 0 0 10px rgba(255,255,255,0.61)" }}
                  >
                    <img src="/images/icon-message-text-purple.svg" alt="" style={{ width: "52%", height: "52%" }} />
                  </div>
                </div>
                <div className="flex flex-col" style={{ gap: 4 }}>
                  <p style={{ fontSize: "clamp(16px, 1.5vw, 24px)", color: "#0E1117", lineHeight: 1.1, margin: 0 }}>{t.selectRole.institutionTitle}.</p>
                  <p style={{ fontSize: "clamp(12px, 1vw, 16px)", color: "#0E1117", lineHeight: 1.4, margin: 0, opacity: 0.6 }}>{t.selectRole.institutionDesc}</p>
                </div>
              </button>
            </div>

            {/* Continue */}
            <button
              type="button"
              onClick={handleContinue}
              disabled={!selectedRole || isLoading}
              className="flex items-center justify-center cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
              style={{
                width: 162, height: 40, borderRadius: 10,
                backgroundImage: "linear-gradient(168.47deg, rgb(76, 150, 255) 12.19%, rgb(22, 103, 219) 93.76%)",
                border: "none", fontSize: 16, color: "#FFFFFF",
              }}
            >
              {isLoading ? "..." : t.selectRole.continueButton}
            </button>
          </div>
        </div>
      </div>

      {/* RIGHT — Blue panel (fills to edge) */}
      <div className="hidden lg:block shrink-0 overflow-hidden relative h-full" style={{ width: "37%", background: "#EFF5FE" }}>
        <img src="/images/ellipse1.svg" alt="" className="absolute pointer-events-none" style={{ right: -400, top: "70%", width: 781, height: 329 }} />
        <img src="/images/ellipse2.svg" alt="" className="absolute pointer-events-none" style={{ left: -200, top: -319, width: 749, height: 749 }} />
        <div className="absolute pointer-events-none flex flex-col" style={{ left: -30, top: -6, opacity: 0.43 }}>
          {[0, 1, 2].map((row) => (
            <div key={row} className="flex" style={{ marginBottom: -2.87 }}>
              {[0, 1, 2, 3].map((col) => (
                <div key={col} style={{ width: 201, height: 201, border: "2.87px solid white", marginRight: -2.87, background: (row === 0 && col === 1) || (row === 2 && col === 3) ? "white" : "transparent" }} />
              ))}
            </div>
          ))}
        </div>
        <div className="absolute pointer-events-none flex flex-col" style={{ left: -30, top: 588, opacity: 0.43 }}>
          {[0, 1, 2].map((row) => (
            <div key={row} className="flex" style={{ marginBottom: -2.87 }}>
              {[0, 1, 2, 3].map((col) => (
                <div key={col} style={{ width: 201, height: 201, border: "2.87px solid white", marginRight: -2.87, background: (row === 1 && col === 1) ? "white" : "transparent" }} />
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
