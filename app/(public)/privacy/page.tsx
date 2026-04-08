"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { useLanguage } from "@/lib/i18n/context";

export default function PrivacyPolicyPage() {
  const router = useRouter();
  const { locale, direction } = useLanguage();
  const isHe = locale === "he";

  return (
    <div className="min-h-screen bg-[#F7F9FC]" dir={direction} style={{ fontFamily: "'Abel', sans-serif" }}>
      <div className="mx-auto w-full" style={{ padding: "40px 40px 80px" }}>
        {/* Back button */}
        <button
          onClick={() => router.back()}
          className="mb-8 flex cursor-pointer items-center gap-2 border-none bg-transparent text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft size={16} />
          {isHe ? "חזרה" : "Back"}
        </button>

        {/* Logo */}
        <div className="mb-6 flex items-center gap-1.5 text-2xl">
          <span className="text-foreground">TEACH</span>
          <span className="text-[#2C7AEA]">UP</span>
        </div>

        {/* Content */}
        <div className="rounded-[20px] bg-white" style={{ padding: "40px 48px", boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}>
          <h1 className="text-[28px] text-foreground" style={{ marginBottom: 8 }}>
            {isHe ? "מדיניות פרטיות" : "Privacy Policy"}
          </h1>
          <p className="text-xs text-muted-foreground" style={{ marginBottom: 32 }}>
            {isHe ? "עדכון אחרון: אפריל 2026" : "Last updated: April 2026"}
          </p>

          <div className="flex flex-col gap-6 text-sm leading-[1.8] text-muted-foreground">
            <p>
              {isHe
                ? "ברוכים הבאים ל-TEACH UP. אנו מחויבים להגן על הפרטיות שלך ולטפל במידע האישי שלך בזהירות ובשקיפות. מדיניות פרטיות זו מתארת כיצד אנו אוספים, משתמשים ומגנים על המידע שלך כשאתה משתמש בפלטפורמה שלנו."
                : "Welcome to TEACH UP. We are committed to protecting your privacy and handling your personal information with care and transparency. This Privacy Policy describes how we collect, use, and protect your information when you use our platform."}
            </p>

            <h2 className="text-lg text-foreground">{isHe ? "1. מידע שאנו אוספים" : "1. Information We Collect"}</h2>
            <p>
              {isHe
                ? "אנו אוספים מידע שאתה מספק ישירות, כולל אך לא רק:"
                : "We collect information you provide directly, including but not limited to:"}
            </p>
            <ul className="list-disc" style={{ paddingInlineStart: 24 }}>
              <li>{isHe ? "שם מלא, כתובת אימייל ומספר טלפון" : "Full name, email address, and phone number"}</li>
              <li>{isHe ? "קורות חיים, ניסיון תעסוקתי וכישורים" : "Resume, employment experience, and skills"}</li>
              <li>{isHe ? "תמונת פרופיל והעדפות הוראה" : "Profile picture and teaching preferences"}</li>
              <li>{isHe ? "פרטי חברה (למעסיקים)" : "Company details (for employers)"}</li>
              <li>{isHe ? "נתוני שימוש ומידע על המכשיר שלך" : "Usage data and device information"}</li>
            </ul>

            <h2 className="text-lg text-foreground">{isHe ? "2. כיצד אנו משתמשים במידע שלך" : "2. How We Use Your Information"}</h2>
            <p>{isHe ? "אנו משתמשים במידע שלך למטרות הבאות:" : "We use your information for the following purposes:"}</p>
            <ul className="list-disc" style={{ paddingInlineStart: 24 }}>
              <li>{isHe ? "לספק, לתחזק ולשפר את השירותים שלנו" : "To provide, maintain, and improve our services"}</li>
              <li>{isHe ? "להתאים הצעות עבודה רלוונטיות עבורך" : "To match you with relevant job opportunities"}</li>
              <li>{isHe ? "לאפשר תקשורת בין מעסיקים ומועמדים" : "To enable communication between employers and candidates"}</li>
              <li>{isHe ? "לשלוח עדכונים, התראות והודעות שירות" : "To send updates, notifications, and service messages"}</li>
              <li>{isHe ? "לנתח דפוסי שימוש ולשפר את חוויית המשתמש" : "To analyze usage patterns and improve user experience"}</li>
            </ul>

            <h2 className="text-lg text-foreground">{isHe ? "3. שיתוף מידע" : "3. Information Sharing"}</h2>
            <p>
              {isHe
                ? "אנו לא מוכרים את המידע האישי שלך. אנו משתפים את המידע שלך רק במקרים הבאים:"
                : "We do not sell your personal information. We share your information only in the following cases:"}
            </p>
            <ul className="list-disc" style={{ paddingInlineStart: 24 }}>
              <li>{isHe ? "עם מעסיקים שאליהם הגשת מועמדות" : "With employers you apply to"}</li>
              <li>{isHe ? "עם ספקי שירות הפועלים מטעמנו (אירוח, ניתוח נתונים)" : "With service providers acting on our behalf (hosting, analytics)"}</li>
              <li>{isHe ? "כאשר נדרש על פי חוק או צו בית משפט" : "When required by law or court order"}</li>
              <li>{isHe ? "להגנה על הזכויות, הרכוש או הבטיחות שלנו או של אחרים" : "To protect the rights, property, or safety of us or others"}</li>
            </ul>

            <h2 className="text-lg text-foreground">{isHe ? "4. אבטחת מידע" : "4. Data Security"}</h2>
            <p>
              {isHe
                ? "אנו מיישמים אמצעי אבטחה טכניים וארגוניים מתאימים כדי להגן על המידע האישי שלך מפני גישה בלתי מורשית, שינוי, חשיפה או השמדה. אנו משתמשים בהצפנה, בקרת גישה ואמצעי אבטחה מתקדמים נוספים."
                : "We implement appropriate technical and organizational security measures to protect your personal information from unauthorized access, alteration, disclosure, or destruction. We use encryption, access controls, and other advanced security measures."}
            </p>

            <h2 className="text-lg text-foreground">{isHe ? "5. שמירת מידע" : "5. Data Retention"}</h2>
            <p>
              {isHe
                ? "אנו שומרים את המידע האישי שלך כל עוד חשבונך פעיל או כנדרש לצורך מתן השירותים. ניתן לבקש מחיקת חשבון בכל עת, ואנו נמחק את המידע שלך בהתאם לחוקים החלים."
                : "We retain your personal information as long as your account is active or as needed to provide services. You can request account deletion at any time, and we will delete your information in accordance with applicable laws."}
            </p>

            <h2 className="text-lg text-foreground">{isHe ? "6. הזכויות שלך" : "6. Your Rights"}</h2>
            <p>{isHe ? "יש לך את הזכויות הבאות בנוגע למידע האישי שלך:" : "You have the following rights regarding your personal information:"}</p>
            <ul className="list-disc" style={{ paddingInlineStart: 24 }}>
              <li>{isHe ? "זכות גישה - לבקש עותק של המידע שלך" : "Right of access — to request a copy of your information"}</li>
              <li>{isHe ? "זכות תיקון - לתקן מידע שגוי או לא מעודכן" : "Right to rectification — to correct inaccurate or outdated information"}</li>
              <li>{isHe ? "זכות מחיקה - לבקש מחיקת המידע שלך" : "Right to erasure — to request deletion of your information"}</li>
              <li>{isHe ? "זכות הגבלת עיבוד - להגביל את אופן השימוש במידע שלך" : "Right to restrict processing — to limit how your information is used"}</li>
              <li>{isHe ? "זכות ניידות - לקבל את המידע שלך בפורמט מובנה" : "Right to portability — to receive your information in a structured format"}</li>
            </ul>

            <h2 className="text-lg text-foreground">{isHe ? "7. עוגיות (Cookies)" : "7. Cookies"}</h2>
            <p>
              {isHe
                ? "אנו משתמשים בעוגיות וטכנולוגיות מעקב דומות כדי לשפר את חוויית הגלישה שלך, לנתח תנועה באתר ולהתאים תוכן. ניתן לנהל את העדפות העוגיות דרך הגדרות הדפדפן שלך."
                : "We use cookies and similar tracking technologies to enhance your browsing experience, analyze site traffic, and personalize content. You can manage cookie preferences through your browser settings."}
            </p>

            <h2 className="text-lg text-foreground">{isHe ? "8. שינויים במדיניות" : "8. Changes to This Policy"}</h2>
            <p>
              {isHe
                ? "אנו עשויים לעדכן מדיניות פרטיות זו מעת לעת. נודיע לך על שינויים מהותיים באמצעות הודעה באתר או בדוא\"ל. המשך השימוש בשירותים לאחר השינויים מהווה הסכמה למדיניות המעודכנת."
                : "We may update this Privacy Policy from time to time. We will notify you of material changes through a notice on the site or by email. Continued use of our services after changes constitutes acceptance of the updated policy."}
            </p>

            <h2 className="text-lg text-foreground">{isHe ? "9. יצירת קשר" : "9. Contact Us"}</h2>
            <p>
              {isHe
                ? "לשאלות, בקשות או תלונות בנוגע למדיניות פרטיות זו או לטיפול במידע האישי שלך, ניתן לפנות אלינו:"
                : "For questions, requests, or complaints regarding this Privacy Policy or the handling of your personal information, you can contact us:"}
            </p>
            <div className="rounded-[10px] bg-[#F7F9FC]" style={{ padding: "16px 20px" }}>
              <p className="text-foreground">TEACH UP</p>
              <p>connect@lowcodeflow.co</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
