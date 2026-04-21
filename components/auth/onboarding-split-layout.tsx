"use client";

interface OnboardingSplitLayoutProps {
  children: React.ReactNode;
  step?: { current: number; total: number };
}

export function OnboardingSplitLayout({ children, step }: OnboardingSplitLayoutProps) {
  return (
    <div
      className="w-screen h-screen overflow-hidden flex"
      style={{ fontFamily: "'Heebo', sans-serif", background: "#F7F9FC" }}
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

        {/* Main — fills remaining height */}
        <div className="flex-1 flex min-h-0" style={{ padding: "1vh 4vw 2vh" }}>
          {children}
        </div>
      </div>

      {/* RIGHT — Blue panel */}
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
