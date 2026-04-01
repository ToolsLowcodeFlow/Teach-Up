"use client";

const suppliers = [
  { img: "/images/supplier-1.png", size: 90, left: "6%", top: "20%" },
  { img: "/images/supplier-3.png", size: 100, left: "19%", top: "55%" },
  { img: "/images/supplier-1.png", size: 95, left: "33%", top: "10%" },
  { img: "/images/supplier-4.png", size: 140, left: "44%", top: "30%", center: true },
  { img: "/images/supplier-3.png", size: 105, left: "60%", top: "5%" },
  { img: "/images/supplier-5.png", size: 90, left: "74%", top: "50%" },
  { img: "/images/supplier-4.png", size: 100, left: "87%", top: "15%" },
];

export function SupplierDatabaseSection() {
  return (
    <section style={{ padding: "60px 40px 40px" }} className="flex flex-col items-center bg-[#F7F9FC]">
      <h2 style={{ marginBottom: 16 }} className="text-center text-4xl leading-tight text-foreground">
        Supplier database
      </h2>

      <p style={{ marginBottom: 28 }} className="max-w-xl text-center text-sm leading-relaxed text-muted-foreground">
        This is a dummy paragraph text that is intended to fill a space in a website design and demonstrate how. This is a dummy paragraph text that is intended to fill a space in a website design and demonstrate how
      </p>

      <button
        style={{ padding: "14px 48px", marginBottom: 48 }}
        className="rounded-xl bg-primary text-sm text-white transition-colors hover:bg-primary-dark"
      >
        Viewing the supplier database
      </button>

      {/* Logos with curve */}
      <div className="relative w-full max-w-5xl" style={{ height: 300 }}>
        {/* Dashed curve from Figma */}
        <img
          src="/images/supplier-curve.svg"
          alt=""
          className="pointer-events-none absolute inset-0 h-full w-full object-contain"
          style={{ opacity: 0.5 }}
        />

        {/* Logo circles */}
        {suppliers.map((s, i) => (
          <div
            key={i}
            className="absolute overflow-hidden rounded-full"
            style={{
              width: s.size,
              height: s.size,
              left: s.left,
              top: s.top,
              border: s.center ? "2px solid #77BFFF" : "2px dashed rgba(76,150,255,0.3)",
              background: "#FCFCFD",
              padding: s.center ? 4 : 2,
            }}
          >
            <div className="flex h-full w-full items-center justify-center overflow-hidden rounded-full bg-white">
              <img
                src={s.img}
                alt={`Supplier ${i + 1}`}
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
