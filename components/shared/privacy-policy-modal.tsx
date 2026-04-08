"use client";

import { X } from "lucide-react";
import { useLanguage } from "@/lib/i18n/context";

interface PrivacyPolicyModalProps {
  open: boolean;
  onClose: () => void;
}

export function PrivacyPolicyModal({ open, onClose }: PrivacyPolicyModalProps) {
  const { locale } = useLanguage();
  const isHe = locale === "he";
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center" style={{ background: "rgba(0,0,0,0.4)", backdropFilter: "blur(8px)" }} onClick={onClose}>
      <div className="relative max-h-[80vh] w-[600px] overflow-y-auto rounded-[20px] bg-white" style={{ padding: "32px 36px", boxShadow: "0 20px 60px rgba(0,0,0,0.15)" }} onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} className="absolute flex cursor-pointer items-center justify-center border-none bg-transparent text-muted-foreground hover:text-foreground" style={{ top: 16, right: 16 }}>
          <X size={20} />
        </button>
        <h2 className="text-[22px] text-foreground" style={{ marginBottom: 20 }}>{isHe ? "מדיניות פרטיות" : "Privacy Policy"}</h2>
        <div className="flex flex-col gap-4 text-sm leading-[1.7] text-muted-foreground">
          <p>{isHe ? "ברוכים הבאים ל-TEACH UP. אנו מחויבים להגן על הפרטיות שלך ולטפל במידע האישי שלך בזהירות ובשקיפות." : "Welcome to TEACH UP. We are committed to protecting your privacy and handling your personal information with care and transparency."}</p>
          <h3 className="text-base text-foreground">{isHe ? "1. מידע שאנו אוספים" : "1. Information We Collect"}</h3>
          <p>{isHe ? "אנו אוספים מידע שאתה מספק ישירות, כולל שם, כתובת אימייל, מספר טלפון, קורות חיים, ופרטי ניסיון תעסוקתי. אנו גם אוספים נתוני שימוש ומידע על המכשיר שלך באופן אוטומטי." : "We collect information you provide directly, including name, email address, phone number, resume, and employment experience details. We also automatically collect usage data and device information."}</p>
          <h3 className="text-base text-foreground">{isHe ? "2. כיצד אנו משתמשים במידע שלך" : "2. How We Use Your Information"}</h3>
          <p>{isHe ? "אנו משתמשים במידע שלך כדי: לספק ולשפר את השירותים שלנו, להתאים הצעות עבודה רלוונטיות, לאפשר תקשורת בין מעסיקים ומועמדים, ולשלוח עדכונים והתראות." : "We use your information to: provide and improve our services, match you with relevant job opportunities, enable communication between employers and candidates, and send updates and notifications."}</p>
          <h3 className="text-base text-foreground">{isHe ? "3. שיתוף מידע" : "3. Information Sharing"}</h3>
          <p>{isHe ? "אנו משתפים את המידע שלך רק עם מעסיקים שאליהם הגשת מועמדות, ספקי שירות הפועלים מטעמנו, ובמקרים בהם נדרש על פי חוק." : "We share your information only with employers you apply to, service providers acting on our behalf, and when required by law."}</p>
          <h3 className="text-base text-foreground">{isHe ? "4. אבטחת מידע" : "4. Data Security"}</h3>
          <p>{isHe ? "אנו מיישמים אמצעי אבטחה טכניים וארגוניים מתאימים כדי להגן על המידע האישי שלך מפני גישה בלתי מורשית, שינוי, חשיפה או השמדה." : "We implement appropriate technical and organizational security measures to protect your personal information from unauthorized access, alteration, disclosure, or destruction."}</p>
          <h3 className="text-base text-foreground">{isHe ? "5. הזכויות שלך" : "5. Your Rights"}</h3>
          <p>{isHe ? "יש לך את הזכות לגשת, לתקן, למחוק או להגביל את עיבוד המידע האישי שלך. ניתן ליצור קשר עם צוות התמיכה שלנו בכל שאלה." : "You have the right to access, correct, delete, or restrict the processing of your personal information. You can contact our support team with any questions."}</p>
          <h3 className="text-base text-foreground">{isHe ? "6. יצירת קשר" : "6. Contact Us"}</h3>
          <p>{isHe ? "לשאלות בנוגע למדיניות פרטיות זו, ניתן לפנות אלינו בכתובת: connect@lowcodeflow.co" : "For questions about this privacy policy, you can reach us at: connect@lowcodeflow.co"}</p>
        </div>
      </div>
    </div>
  );
}
