"use client";

import { useLanguage } from "@/lib/i18n/context";

export function EasyWaySection() {
  const { locale } = useLanguage();
  const isHe = locale === "he";

  const features = [
    { icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>, title: isHe ? "סוכן חכם למציאת מדריכים" : "Smart agent for finding guides", description: isHe ? "זהו טקסט דמה לפסקה שמטרתו למלא מקום בעיצוב האתר ולהדגים כיצד." : "This is a dummy paragraph text that aims to fill a space in the website design and demonstrate how." },
    { icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" stroke="white" strokeWidth="2" strokeLinecap="round"/><path d="M22 4 12 14.01l-3-3" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>, title: isHe ? "משרות שמקבלות פניות רלוונטיות באמת" : "Jobs that receive truly relevant applications", description: isHe ? "זהו טקסט דמה לפסקה שמטרתו למלא מקום בעיצוב האתר ולהדגים כיצד." : "This is a dummy paragraph text that aims to fill a space in the website design and demonstrate how." },
    { icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M20 7H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z" stroke="white" strokeWidth="2"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" stroke="white" strokeWidth="2"/></svg>, title: isHe ? "פרסום משרות ממוקד לקהל היעד" : "Targeted job advertising for the target audience", description: isHe ? "זהו טקסט דמה לפסקה שמטרתו למלא מקום בעיצוב האתר ולהדגים כיצד." : "This is a dummy paragraph text that aims to fill a space in the website design and demonstrate how." },
    { icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><circle cx="11" cy="11" r="6" stroke="white" strokeWidth="2"/><path d="m21 21-4.35-4.35" stroke="white" strokeWidth="2" strokeLinecap="round"/></svg>, title: isHe ? "מאגר אנשי החינוך הגדול בישראל" : "The largest database of education professionals in Israel", description: isHe ? "זהו טקסט דמה לפסקה שמטרתו למלא מקום בעיצוב האתר ולהדגים כיצד." : "This is a dummy paragraph text that aims to fill a space in the website design and demonstrate how." },
  ];

  return (
    <section style={{ padding: "60px 40px" }} className="flex flex-col items-center bg-[#F7F9FC]">
      <div style={{ marginBottom: 20 }} className="text-center">
        <h2 className="max-w-2xl text-4xl leading-tight text-foreground">
          {isHe ? "הדרך הקלה למצוא אנשי חינוך והוראה." : "The easy way to find education and teaching professionals."}
        </h2>
      </div>
      <p style={{ marginBottom: 28 }} className="mx-auto max-w-xl text-center text-sm leading-relaxed text-muted-foreground">
        {isHe ? "בפורטל שלנו תוכלו לחשוף את המשרות שלכם לקהל גדול וממוקד של אנשי חינוך, בצורה פשוטה, נוחה ומקצועית." : "On our portal, you can expose your jobs to a large and focused audience of educators, in a simple, convenient and professional way."}
      </p>
      <div style={{ marginBottom: 48 }} className="flex justify-center">
        <button style={{ padding: "14px 48px" }} className="cursor-pointer rounded-xl border-none bg-primary text-sm text-white transition-colors hover:bg-primary-dark">
          {isHe ? "התחל לפרסם משרה" : "Start posting a job"}
        </button>
      </div>
      <div className="relative mx-auto w-full" style={{ maxWidth: 1200, padding: "0 40px" }}>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, i) => (
            <div key={i} style={{ padding: "48px 24px 40px" }} className="flex flex-col items-center rounded-2xl border border-[#E8EEF7] bg-gradient-to-b from-[#F0F4FA] to-white text-center">
              <div style={{ marginBottom: 28 }} className="relative flex h-14 w-14 items-center justify-center">
                <div className="absolute inset-0 rounded-full bg-primary/10" style={{ transform: "scale(1.6)" }} />
                <div className="absolute inset-0 rounded-full bg-primary/5" style={{ transform: "scale(2.1)" }} />
                <div className="relative flex h-14 w-14 items-center justify-center rounded-full bg-primary shadow-lg shadow-primary/20">{feature.icon}</div>
              </div>
              <h3 style={{ marginBottom: 12 }} className="text-lg font-medium leading-tight text-foreground">{feature.title}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
