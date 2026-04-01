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
          <div className="flex flex-col" style={{ gap: "clamp(12px, 1.8vh, 28px)", maxWidth: 580 }}>

            {/* Title + Subtitle */}
            <div className="flex flex-col" style={{ gap: "clamp(8px, 1vh, 14px)" }}>
              <h1 style={{ fontSize: "clamp(24px, 2.2vw, 36px)", color: "#0E1117", lineHeight: 1.1, margin: 0 }}>
                {t.selectRole.title}
              </h1>
              <p style={{ fontSize: "clamp(16px, 1.5vw, 24px)", color: "#0E1117", lineHeight: 1.2, margin: 0 }}>
                {t.selectRole.subtitle}
              </p>
            </div>

            {/* Prompt */}
            <p style={{ fontSize: "clamp(13px, 1.1vw, 18px)", color: "#647787", lineHeight: 1.3, margin: 0 }}>
              {t.selectRole.prompt}
            </p>

            {/* Cards */}
            <div className="flex flex-col" style={{ gap: "clamp(10px, 1.2vh, 18px)" }}>

              {/* Card 1 */}
              <button
                type="button"
                onClick={() => setSelectedRole("seeker")}
                className="flex items-center text-start cursor-pointer transition-all"
                style={{
                  padding: "clamp(14px, 1.6vh, 24px) clamp(16px, 2vw, 30px)",
                  background: "#FFFFFF",
                  borderRadius: 16,
                  boxShadow: "0px 4px 24px 0px rgba(0,0,0,0.08)",
                  border: selectedRole === "seeker" ? "2px solid #4C96FF" : "2px solid transparent",
                  gap: "clamp(16px, 2vw, 30px)",
                }}
              >
                <div className="relative shrink-0" style={{ width: "clamp(48px, 4.5vw, 66px)", height: "clamp(48px, 4.5vw, 66px)" }}>
                  <img src="/images/ellipse-blue-ring.svg" alt="" className="absolute inset-0 w-full h-full" />
                  <div
                    className="absolute rounded-full overflow-hidden flex items-center justify-center"
                    style={{ left: "19.5%", top: "19.5%", width: "61%", height: "61%", background: "linear-gradient(140deg, #4C96FF 12%, #1667DB 94%)", border: "0.86px solid white", boxShadow: "0 0 0 8px rgba(255,255,255,0.61)" }}
                  >
                    <img src="/images/icon-message-text-blue.svg" alt="" style={{ width: "52%", height: "52%" }} />
                  </div>
                </div>
                <div className="flex flex-col" style={{ gap: 3 }}>
                  <p style={{ fontSize: "clamp(14px, 1.2vw, 20px)", color: "#0E1117", lineHeight: 1.1, margin: 0 }}>{t.selectRole.seekerTitle}</p>
                  <p style={{ fontSize: "clamp(11px, 0.85vw, 14px)", color: "#0E1117", lineHeight: 1.4, margin: 0, opacity: 0.6 }}>{t.selectRole.seekerDesc}</p>
                </div>
              </button>

              {/* Card 2 */}
              <button
                type="button"
                onClick={() => setSelectedRole("institution")}
                className="flex items-center text-start cursor-pointer transition-all"
                style={{
                  padding: "clamp(14px, 1.6vh, 24px) clamp(16px, 2vw, 30px)",
                  background: "#FFFFFF",
                  borderRadius: 16,
                  boxShadow: "0px 4px 24px 0px rgba(0,0,0,0.08)",
                  border: selectedRole === "institution" ? "2px solid #4C96FF" : "2px solid transparent",
                  gap: "clamp(16px, 2vw, 30px)",
                }}
              >
                <div className="relative shrink-0" style={{ width: "clamp(48px, 4.5vw, 66px)", height: "clamp(48px, 4.5vw, 66px)" }}>
                  <img src="/images/ellipse-purple-ring.svg" alt="" className="absolute inset-0 w-full h-full" />
                  <div
                    className="absolute rounded-full overflow-hidden flex items-center justify-center"
                    style={{ left: "19.5%", top: "19.5%", width: "61%", height: "61%", background: "#AC4CFF", border: "0.86px solid white", boxShadow: "0 0 0 8px rgba(255,255,255,0.61)" }}
                  >
                    <img src="/images/icon-message-text-purple.svg" alt="" style={{ width: "52%", height: "52%" }} />
                  </div>
                </div>
                <div className="flex flex-col" style={{ gap: 3 }}>
                  <p style={{ fontSize: "clamp(14px, 1.2vw, 20px)", color: "#0E1117", lineHeight: 1.1, margin: 0 }}>{t.selectRole.institutionTitle}.</p>
                  <p style={{ fontSize: "clamp(11px, 0.85vw, 14px)", color: "#0E1117", lineHeight: 1.4, margin: 0, opacity: 0.6 }}>{t.selectRole.institutionDesc}</p>
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
        <img src="/images/ellipse1.svg" alt="" className="absolute pointer-events-none" style={{ right: -300, top: "70%", width: 600, height: 250 }} />
        <img src="/images/ellipse2.svg" alt="" className="absolute pointer-events-none" style={{ left: -150, top: -250, width: 550, height: 550 }} />
        <div className="absolute pointer-events-none flex flex-col" style={{ left: -20, top: -4, opacity: 0.43 }}>
          {[0, 1, 2, 3].map((row) => (
            <div key={row} className="flex" style={{ marginBottom: -2 }}>
              {[0, 1, 2, 3].map((col) => (
                <div key={col} style={{ width: 140, height: 140, border: "2px solid white", marginRight: -2, background: (row === 0 && col === 1) || (row === 2 && col === 3) ? "white" : "transparent" }} />
              ))}
            </div>
          ))}
        </div>
        <div className="absolute pointer-events-none flex flex-col" style={{ left: -20, top: 420, opacity: 0.43 }}>
          {[0, 1, 2, 3].map((row) => (
            <div key={row} className="flex" style={{ marginBottom: -2 }}>
              {[0, 1, 2, 3].map((col) => (
                <div key={col} style={{ width: 140, height: 140, border: "2px solid white", marginRight: -2, background: (row === 1 && col === 1) ? "white" : "transparent" }} />
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
