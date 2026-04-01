"use client";

export function SchoolsCtaSection() {
  return (
    <section style={{ padding: "40px 40px 60px" }} className="flex justify-center bg-[#F7F9FC]">
      <div
        style={{ padding: "60px 40px" }}
        className="relative w-full overflow-hidden rounded-3xl"
      >
        {/* Blue gradient */}
        <div className="absolute inset-0 bg-linear-to-r from-primary-dark to-primary" />

        {/* Glow */}
        <div className="absolute" style={{ left: -80, top: -80, width: 350, height: 350, borderRadius: "50%", background: "radial-gradient(circle, rgba(255,255,255,0.2) 0%, transparent 70%)" }} />

        {/* Grid overlay */}
        <div className="pointer-events-none absolute inset-0" style={{ opacity: 0.08 }}>
          <div className="flex h-full flex-wrap">
            {Array.from({ length: 24 }, (_, i) => (
              <div key={i} style={{ width: 140, height: 140, border: "1px solid white" }} />
            ))}
          </div>
        </div>

        {/* Floating icons */}
        <div className="pointer-events-none absolute inset-0">
          {[
            { left: "5%", top: "15%", size: 36, rotate: -15 },
            { left: "12%", top: "35%", size: 28, rotate: 10 },
            { left: "8%", top: "70%", size: 32, rotate: -5 },
            { left: "65%", top: "10%", size: 24, rotate: 20 },
            { left: "85%", top: "25%", size: 30, rotate: -10 },
            { left: "78%", top: "65%", size: 34, rotate: 15 },
            { left: "25%", top: "75%", size: 22, rotate: 5 },
          ].map((icon, i) => (
            <div
              key={i}
              className="absolute flex items-center justify-center text-white/40"
              style={{ left: icon.left, top: icon.top, width: icon.size, height: icon.size, transform: `rotate(${icon.rotate}deg)` }}
            >
              <svg width={icon.size * 0.7} height={icon.size * 0.7} viewBox="0 0 24 24" fill="none">
                {i % 3 === 0 ? (
                  <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" stroke="currentColor" strokeWidth="2" />
                ) : i % 3 === 1 ? (
                  <path d="M22 10v6M2 10l10-5 10 5-10 5z" stroke="currentColor" strokeWidth="2" />
                ) : (
                  <path d="M12 20h9M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z" stroke="currentColor" strokeWidth="2" />
                )}
              </svg>
            </div>
          ))}
        </div>

        {/* Content */}
        <div className="relative flex flex-col items-center text-center">
          <h2 style={{ marginBottom: 28 }} className="text-3xl leading-tight text-white lg:text-4xl">
            Schools, recruit the teachers
            <br />
            you are looking for today!
          </h2>
          <button
            style={{ padding: "14px 40px" }}
            className="rounded-xl bg-white text-sm text-primary transition-colors hover:bg-white/90"
          >
            Special benefit for schools
          </button>
        </div>
      </div>
    </section>
  );
}
