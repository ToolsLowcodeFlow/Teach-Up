interface OnboardingLayoutProps {
  children: React.ReactNode;
  step?: { current: number; total: number };
}

export function OnboardingLayout({ children, step }: OnboardingLayoutProps) {
  return (
    <div className="onboarding-bg min-h-screen flex">
      {/* Left mosaic pattern */}
      <div className="mosaic-pattern hidden lg:block" />

      {/* Right content area */}
      <div className="flex-1 flex flex-col lg:ml-[45%]">
        {/* Header */}
        <header className="flex items-center justify-between px-8 py-5">
          {step && (
            <span className="text-[13px] text-[#6B7280]">
              Step {String(step.current).padStart(2, "0")} of{" "}
              {String(step.total).padStart(2, "0")}
            </span>
          )}
          <div className="ml-auto">
            <span className="text-[20px] font-bold text-[#1F2937]">
              TEACH{" "}
              <span className="text-[#4B7BF5]">UP</span>
            </span>
          </div>
        </header>

        {/* Main content */}
        <main className="flex-1 flex items-start justify-center px-8 pb-16 pt-2">
          <div className="w-full max-w-[520px]">{children}</div>
        </main>
      </div>
    </div>
  );
}
