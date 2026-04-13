"use client";

import { useLanguage } from "@/lib/i18n/context";

export function FindNextJobSection() {
  const { locale } = useLanguage();
  const isHe = locale === "he";

  const features = [
    { icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" stroke="white" strokeWidth="2"/></svg>, title: isHe ? "בלי לרדוף אחרי קבוצות פייסבוק" : "No need to chase Facebook groups" },
    { icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M17 3a2.83 2.83 0 0 1 4 4L7.5 20.5 2 22l1.5-5.5Z" stroke="white" strokeWidth="2"/></svg>, title: isHe ? "משרות מותאמות בדיוק לפי תחום ואזור" : "Jobs tailored precisely by field and region" },
    { icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="m4 17 6-6-6-6M12 19h8" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>, title: isHe ? "שליטה מלאה על מה שמתאים לך" : "Full control over what suits you" },
    { icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" stroke="white" strokeWidth="2" strokeLinecap="round"/><path d="M22 4 12 14.01l-3-3" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>, title: isHe ? "קבלת פניות מחברות אמיתיות בלבד" : "Accepting inquiries from real companies only" },
  ];

  const description = isHe
    ? "זהו טקסט דמה לפסקה שמטרתו למלא מקום בעיצוב האתר ולהדגים כיצד."
    : "This is a dummy paragraph text that aims to fill a space in the website design and demonstrate how.";

  return (
    <section style={{ padding: "60px 40px", backgroundImage: "linear-gradient(180deg, #E8F0FE 0%, #D6E4FF 50%, #E8F0FE 100%)" }} className="flex justify-center">
      <div className="flex w-full max-w-5xl flex-col items-center gap-10 lg:flex-row lg:items-center">
        <div className="flex flex-1 flex-col items-start justify-center">
          <h2 style={{ marginBottom: 20 }} className="text-4xl leading-tight text-foreground">
            {isHe ? ".הדרך הקלה למצוא את המשרה הבאה שלך" : "The easy way to find your next job."}
          </h2>
          <p style={{ marginBottom: 28 }} className="max-w-md text-sm leading-relaxed text-muted-foreground">
            {isHe ? "בפלטפורמה שלנו תוכלו למצוא בקלות משרות שמתאימות לכם, בצורה פשוטה, נוחה וממוקדת, כל ההזדמנויות במקום אחד." : "On our platform you can easily find jobs that suit you, in a simple, convenient and focused way, all opportunities in one place."}
          </p>
          <button style={{ padding: "14px 36px" }} className="cursor-pointer rounded-xl border-none bg-primary text-sm text-white transition-colors hover:bg-primary-dark">
            {isHe ? "צפייה בכל המשרות שלנו" : "View all our jobs"}
          </button>
        </div>
        <div className="flex-1 overflow-hidden rounded-2xl border border-[#E8EEF7] bg-white">
          <div className="grid grid-cols-2">
            {features.map((f, i) => {
              const cornerGradient = "radial-gradient(ellipse at top right, rgba(76,150,255,0.25) 0%, rgba(76,150,255,0.08) 40%, transparent 70%)";
              return (
              <div key={i} style={{ padding: "36px 24px 28px", backgroundImage: cornerGradient }} className={`flex flex-col items-center text-center ${i % 2 === 0 ? "border-e border-border-light" : ""} ${i < 2 ? "border-b border-border-light" : ""}`}>
                <div style={{ marginBottom: 20 }} className="relative flex h-12 w-12 items-center justify-center">
                  <div className="absolute inset-0 rounded-full bg-primary/10" style={{ transform: "scale(1.6)" }} />
                  <div className="absolute inset-0 rounded-full bg-primary/5" style={{ transform: "scale(2.1)" }} />
                  <div className="relative flex h-12 w-12 items-center justify-center rounded-full bg-primary">{f.icon}</div>
                </div>
                <h3 style={{ marginBottom: 10 }} className="text-sm font-medium leading-tight text-foreground">{f.title}</h3>
                <p className="text-xs leading-relaxed text-muted-foreground">{description}</p>
              </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
