"use client";

import { useEffect, useState } from "react";

interface AuthLayoutProps {
  children: React.ReactNode;
}

export function AuthLayout({ children }: AuthLayoutProps) {
  // Scale card to fit viewport on smaller screens
  const [scale, setScale] = useState(1);

  useEffect(() => {
    function calcScale() {
      const vh = window.innerHeight;
      // Card is 802px + some vertical padding (~40px total)
      // If viewport can't fit it, scale down
      const needed = 860;
      if (vh < needed) {
        setScale(Math.max(vh / needed, 0.65));
      } else {
        setScale(1);
      }
    }
    calcScale();
    window.addEventListener("resize", calcScale);
    return () => window.removeEventListener("resize", calcScale);
  }, []);

  return (
    <div className="bg-[#EFF5FE] relative w-full h-screen overflow-hidden flex items-center justify-center">

      {/* Background ellipses */}
      {/* Ellipse 1 — center-left glow (Figma: left:-401, top:480) */}
      <img src="/images/ellipse1.svg" alt="" className="absolute pointer-events-none hidden md:block" style={{ left: "-15%", top: "30%", width: "55%", opacity: 0.9 }} />
      {/* Ellipse 2 — top-right strong glow (Figma: left:1066, top:-351) */}
      <img src="/images/ellipse2.svg" alt="" className="absolute pointer-events-none hidden md:block" style={{ right: "-5%", top: "-20%", width: "55%", opacity: 1 }} />
      {/* Ellipse 3 — bottom-right subtle (Figma: left:1197, top:887) */}
      <img src="/images/ellipse3.svg" alt="" className="absolute pointer-events-none hidden md:block" style={{ right: "-5%", bottom: "-15%", width: "40%", opacity: 0.7 }} />

      {/* Grid pattern — left */}
      <div className="absolute pointer-events-none hidden xl:flex flex-col" style={{ left: "-5%", top: "20%", opacity: 0.31 }}>
        {[0, 1, 2].map((row) => (
          <div key={row} className="flex" style={{ marginBottom: -2 }}>
            {[0, 1, 2, 3].map((col) => (
              <div key={col} style={{ width: 140, height: 140, border: "2px solid white", marginRight: -2 }} />
            ))}
          </div>
        ))}
      </div>

      {/* Grid pattern — right */}
      <div className="absolute pointer-events-none hidden xl:flex flex-col" style={{ right: "-5%", top: "20%", opacity: 0.31 }}>
        {[0, 1, 2].map((row) => (
          <div key={row} className="flex" style={{ marginBottom: -2 }}>
            {[0, 1, 2, 3].map((col) => (
              <div key={col} style={{ width: 140, height: 140, border: "2px solid white", marginRight: -2 }} />
            ))}
          </div>
        ))}
      </div>

      {/* Floating icons */}
      <div className="absolute hidden lg:block" style={{ left: "6%", top: "10%" }}>
        <div className="rounded-full overflow-hidden flex items-center justify-center" style={{ width: 80, height: 80, background: "linear-gradient(140deg, #4C96FF 12%, #1667DB 94%)", border: "1.3px solid white", boxShadow: "0 0 0 12px rgba(255,255,255,0.61)" }}>
          <img src="/images/icon-frame.svg" alt="" style={{ width: 48, height: 48 }} />
        </div>
      </div>
      <div className="absolute hidden lg:block" style={{ right: "4%", top: "8%" }}>
        <div className="rounded-full overflow-hidden flex items-center justify-center" style={{ width: 64, height: 64, background: "linear-gradient(140deg, #4C96FF 12%, #1667DB 94%)", border: "1.3px solid white", boxShadow: "0 0 0 12px rgba(255,255,255,0.61)" }}>
          <img src="/images/icon-user-search1.svg" alt="" style={{ width: 34, height: 34 }} />
        </div>
      </div>
      <div className="absolute hidden xl:block" style={{ right: "14%", top: "22%" }}>
        <div className="rounded-full" style={{ width: 32, height: 32, background: "linear-gradient(140deg, #4C96FF 12%, #1667DB 94%)", border: "0.67px solid white", boxShadow: "0 0 0 6px rgba(255,255,255,0.61)", opacity: 0.12 }} />
      </div>
      <div className="absolute hidden lg:block" style={{ left: "3%", bottom: "22%" }}>
        <div className="rounded-full overflow-hidden flex items-center justify-center" style={{ width: 56, height: 56, background: "linear-gradient(141deg, #4C96FF 12%, #1667DB 94%)", boxShadow: "0 0 0 10px rgba(255,255,255,0.38)", opacity: 0.46 }}>
          <img src="/images/icon-search-status.svg" alt="" style={{ width: 35, height: 35 }} />
        </div>
      </div>
      <div className="absolute hidden lg:block" style={{ left: "4%", bottom: "8%" }}>
        <div className="rounded-full overflow-hidden flex items-center justify-center" style={{ width: 36, height: 36, background: "linear-gradient(140deg, #4C96FF 12%, #1667DB 94%)", border: "0.75px solid white", boxShadow: "0 0 0 7px rgba(255,255,255,0.61)" }}>
          <img src="/images/icon-user-search3.svg" alt="" style={{ width: 19, height: 19 }} />
        </div>
      </div>
      <div className="absolute hidden lg:block" style={{ right: "2%", top: "48%" }}>
        <div className="rounded-full overflow-hidden flex items-center justify-center" style={{ width: 80, height: 80, background: "linear-gradient(140deg, #4C96FF 12%, #1667DB 94%)", border: "1.3px solid white", boxShadow: "0 0 0 12px rgba(255,255,255,0.61)" }}>
          <img src="/images/icon-frame.svg" alt="" style={{ width: 48, height: 48 }} />
        </div>
      </div>
      <div className="absolute hidden lg:block" style={{ right: "3%", bottom: "10%" }}>
        <div className="rounded-full overflow-hidden flex items-center justify-center" style={{ width: 56, height: 56, background: "linear-gradient(141deg, #4C96FF 12%, #1667DB 94%)", boxShadow: "0 0 0 10px rgba(255,255,255,0.38)", opacity: 0.46 }}>
          <img src="/images/icon-search-status.svg" alt="" style={{ width: 35, height: 35 }} />
        </div>
      </div>

      {/* Card — exact Figma size, scaled to fit viewport */}
      <div
        className="relative z-10"
        style={{
          width: 587,
          maxWidth: "95vw",
          transform: `scale(${scale})`,
          transformOrigin: "center center",
        }}
      >
        {children}
      </div>
    </div>
  );
}
