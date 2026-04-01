"use client";

export function BlueCtaSection() {
  return (
    <section style={{ padding: "40px 40px" }} className="flex justify-center bg-[#F7F9FC]">
      <div
        style={{ padding: "44px 40px" }}
        className="relative w-full overflow-hidden rounded-3xl"
      >
        {/* Blue gradient background */}
        <div className="absolute inset-0 bg-linear-to-r from-primary-dark to-primary" />

        {/* Glow */}
        <div
          className="absolute"
          style={{ left: -60, top: -60, width: 300, height: 300, borderRadius: "50%", background: "radial-gradient(circle, rgba(255,255,255,0.25) 0%, transparent 70%)" }}
        />

        {/* Grid overlay */}
        <div className="pointer-events-none absolute inset-0" style={{ opacity: 0.1 }}>
          <div className="flex h-full flex-wrap">
            {Array.from({ length: 24 }, (_, i) => (
              <div key={i} style={{ width: 140, height: 140, border: "1px solid white" }} />
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="relative flex flex-col items-center text-center">
          <h2 style={{ marginBottom: 28 }} className="text-3xl leading-tight text-white lg:text-4xl">
            Lorem Ipsum Dolor Sit
            <br />
            Emet, Consectetur Dollar
          </h2>
          <button
            style={{ padding: "12px 48px" }}
            className="rounded-xl bg-white text-sm text-primary transition-colors hover:bg-white/90"
          >
            Lorem Ipsum
          </button>
        </div>
      </div>
    </section>
  );
}
