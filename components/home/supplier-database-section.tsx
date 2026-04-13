"use client";

import { useRouter } from "next/navigation";
import { useLanguage } from "@/lib/i18n/context";

export function SupplierDatabaseSection() {
  const router = useRouter();
  const { locale } = useLanguage();
  const isHe = locale === "he";

  return (
    <section
      className="relative flex flex-col items-center justify-center overflow-hidden"
      style={{
        padding: "70px 40px",
        backgroundImage: "linear-gradient(180deg, #E8F0FE 0%, #D6E4FF 50%, #E8F0FE 100%)",
      }}
    >
      {/* Left ellipse blur */}
      <div
        className="pointer-events-none absolute"
        style={{
          width: 781,
          height: 329,
          left: -653,
          top: 89,
          background: "radial-gradient(circle, rgba(76,150,255,0.08) 0%, transparent 70%)",
          borderRadius: "50%",
        }}
      />
      {/* Right ellipse blur */}
      <div
        className="pointer-events-none absolute"
        style={{
          width: 781,
          height: 329,
          right: -653,
          top: 89,
          background: "radial-gradient(circle, rgba(76,150,255,0.08) 0%, transparent 70%)",
          borderRadius: "50%",
        }}
      />

      {/* Blue icon circle */}
      <div
        className="relative flex items-center justify-center overflow-hidden rounded-full"
        style={{
          width: 72,
          height: 72,
          backgroundImage: "linear-gradient(140deg, #4C96FF 12%, #1667DB 94%)",
          border: "2px solid white",
          boxShadow: "0 0 0 14px rgba(255,255,255,0.61)",
          marginBottom: 10,
        }}
      >
        <img src="/images/user-search-icon.svg" alt="" style={{ width: 36, height: 36 }} />
      </div>

      {/* Title */}
      <h2
        className="text-center text-foreground"
        style={{
          fontSize: "clamp(36px, 4vw, 56px)",
          lineHeight: 1.1,
          marginBottom: 20,
          maxWidth: 625,
        }}
      >
        {isHe ? "מאגר ספקים הגדול בישראל" : "The largest database of education suppliers in Israel"}
      </h2>

      {/* Subtitle */}
      <p
        className="text-center text-muted-foreground"
        style={{
          fontSize: "clamp(14px, 1.4vw, 20px)",
          lineHeight: 1.2,
          marginBottom: 30,
          maxWidth: 625,
        }}
      >
        {isHe
          ? "בפורטל שלנו תוכלו לחשוף את המשרות שלכם לקהל גדול וממוקד של אנשי חינוך, בצורה פשוטה, נוחה ומקצועית"
          : "On our portal, you can expose your jobs to a large and focused audience of educators, in a simple, convenient and professional way"}
      </p>

      {/* Button */}
      <button
        onClick={() => router.push("/supplier-database")}
        className="relative cursor-pointer rounded-[10px] text-base text-white transition-opacity hover:opacity-90"
        style={{
          padding: "14px 48px",
          border: "none",
          backgroundImage: "linear-gradient(171deg, #4C96FF 12%, #1667DB 94%)",
        }}
      >
        {isHe ? "כניסה למאגר הספקים" : "Enter the supplier database"}
      </button>
    </section>
  );
}
