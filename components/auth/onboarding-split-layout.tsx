"use client";

interface OnboardingSplitLayoutProps {
  children: React.ReactNode;
  step?: { current: number; total: number };
}

export function OnboardingSplitLayout({ children, step }: OnboardingSplitLayoutProps) {
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
          {step && (
            <p style={{ fontSize: "clamp(12px, 1.1vw, 16px)", color: "#97A2C2", lineHeight: 1.2 }}>
              Step {String(step.current).padStart(2, "0")} of {String(step.total).padStart(2, "0")}
            </p>
          )}
        </div>

        {/* Main — fills remaining height, children stretch to fill */}
        <div className="flex-1 flex" style={{ padding: "1vh 4vw 2vh" }}>
          {children}
        </div>
      </div>

      {/* RIGHT — Blue panel */}
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
