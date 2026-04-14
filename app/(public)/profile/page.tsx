"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { ChevronDown, Eye, EyeOff, X } from "lucide-react";
import { useLanguage } from "@/lib/i18n/context";
import { createClient } from "@/lib/supabase/client";
import { SeekerNavbar } from "@/components/seeker/seeker-navbar";
import { useUser } from "@/lib/hooks/use-user";

function ProfDropdown({ label, value, open, setOpen, options, onSelect, onClear, hasTag }: {
  label: string; value: string; open: boolean; setOpen: (v: boolean) => void;
  options: string[]; onSelect: (v: string) => void; onClear: () => void; hasTag: boolean;
}) {
  return (
    <div className="relative flex flex-col gap-2">
      <label className="text-sm text-foreground">{label}</label>
      <div onClick={() => setOpen(!open)} className="flex w-full cursor-pointer items-center justify-between rounded-lg border border-border bg-[#F7F9FC] text-sm text-foreground" style={{ padding: "10px 16px" }}>
        {hasTag && value ? (
          <div className="flex items-center gap-1.5 rounded bg-border-light" style={{ padding: "4px 8px" }}>
            <span onClick={(e) => { e.stopPropagation(); onClear(); }} className="cursor-pointer text-xs text-muted-foreground hover:text-foreground">x</span>
            <span className="text-sm">{value}</span>
          </div>
        ) : (
          <span>{value || "..."}</span>
        )}
        <ChevronDown size={16} className="text-muted-foreground" />
      </div>
      {open && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setOpen(false)} />
          <div className="absolute left-0 top-full z-20 mt-1 max-h-48 w-full overflow-y-auto rounded-lg border border-border-light bg-white shadow-lg">
            {options.map((opt) => (
              <div key={opt} onClick={() => { onSelect(opt.toLowerCase()); setOpen(false); }} className="cursor-pointer text-sm text-foreground transition-colors hover:bg-[#F7F9FC]" style={{ padding: "10px 16px", background: value === opt.toLowerCase() ? "#EEF4FD" : undefined }}>
                {opt}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default function ProfilePage() {
  const router = useRouter();
  const { locale, direction, t } = useLanguage();
  const isHe = locale === "he";
  const { user } = useUser();
  const imageRef = useRef<HTMLInputElement>(null);
  const [activeTab, setActiveTab] = useState<"personal" | "professional">("personal");
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [formLoaded, setFormLoaded] = useState(false);
  const [genderOpen, setGenderOpen] = useState(false);
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showVerify, setShowVerify] = useState(false);

  // Professional background state
  const [profRole, setProfRole] = useState("teacher");
  const [profRoleOpen, setProfRoleOpen] = useState(false);
  const [profField, setProfField] = useState("Physics");
  const [profFieldOpen, setProfFieldOpen] = useState(false);
  const [profLang, setProfLang] = useState("Hebrew");
  const [profLangOpen, setProfLangOpen] = useState(false);
  const [profCar, setProfCar] = useState("not");
  const [profCarOpen, setProfCarOpen] = useState(false);
  const [profDealer, setProfDealer] = useState("yes");
  const [profDealerOpen, setProfDealerOpen] = useState(false);
  const [profTeaching, setProfTeaching] = useState("Lorem Ipsum");
  const [profTeachingOpen, setProfTeachingOpen] = useState(false);

  // Certificates, skills, work experience, resume
  const [certificates, setCertificates] = useState([{ institution: "", info: "" }]);
  const [skills, setSkills] = useState(["Lorem Ipsum"]);
  const [workExps, setWorkExps] = useState([
    { id: 1, role: "Lorem Ipsum", company: "College of Management", dates: "Jan 2020 - Aug 2023" },
    { id: 2, role: "Lorem Ipsum", company: "College of Management", dates: "Jan 2020 - Aug 2023" },
    { id: 3, role: "Lorem Ipsum", company: "College of Management", dates: "Jan 2020 - Aug 2023" },
  ]);
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [hasResume, setHasResume] = useState(true);
  const [editingWork, setEditingWork] = useState<{ id: number; role: string; company: string; dates: string } | null>(null);
  const certFileRef = useRef<HTMLInputElement>(null);
  const resumeRef = useRef<HTMLInputElement>(null);

  const [form, setForm] = useState({
    firstName: "", lastName: "", mobile: "",
    email: "", gender: "", area: "",
  });
  const [passwords, setPasswords] = useState({ current: "", newPass: "", verify: "" });

  // Load user data into form from auth metadata
  useEffect(() => {
    if (user && !formLoaded) {
      const fetchMeta = async () => {
        const supabase = createClient();
        const { data: { user: authUser } } = await supabase.auth.getUser();
        const meta = authUser?.user_metadata || {};
        const nameParts = user.fullName.split(" ");
        setForm({
          firstName: meta.first_name || nameParts[0] || "",
          lastName: meta.last_name || nameParts.slice(1).join(" ") || "",
          mobile: meta.mobile || "",
          email: user.email,
          gender: meta.gender || "",
          area: meta.area || "",
        });
        if (user.avatarUrl) setProfileImage(user.avatarUrl);
        setFormLoaded(true);
      };
      fetchMeta();
    }
  }, [user, formLoaded]);

  useEffect(() => {
    const el = document.querySelector(".lang-switcher-global") as HTMLElement;
    if (el) el.style.display = "none";
    return () => { if (el) el.style.display = ""; };
  }, []);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => setProfileImage(ev.target?.result as string);
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-[#F7F9FC]" style={{ fontFamily: "'Abel', sans-serif" }}>
      <SeekerNavbar />

      {/* Content */}
      <div className="w-full" style={{ padding: "24px 40px 64px" }} dir={direction}>
        <div className="rounded-2xl bg-white" style={{ padding: "36px 40px 40px" }}>
          <h1 className="text-[28px] leading-tight text-foreground" style={{ marginBottom: 20 }}>{t.profile.title}</h1>

          {/* Tabs */}
          <div className="inline-flex items-center gap-1.5 rounded-xl bg-[#F7F9FC]" style={{ marginBottom: 32, padding: 6 }}>
            <button
              onClick={() => setActiveTab("personal")}
              className="rounded-xl text-sm transition-colors"
              style={{ padding: "12px 40px", background: activeTab === "personal" ? "linear-gradient(168deg, #4C96FF 12%, #1667DB 94%)" : "transparent", color: activeTab === "personal" ? "white" : "#0E1117", border: "none", cursor: "pointer" }}
            >
              {isHe ? "פרטים אישיים" : "Personal details"}
            </button>
            <button
              onClick={() => setActiveTab("professional")}
              className="rounded-xl text-sm transition-colors"
              style={{ padding: "12px 40px", background: activeTab === "professional" ? "linear-gradient(168deg, #4C96FF 12%, #1667DB 94%)" : "transparent", color: activeTab === "professional" ? "white" : "#0E1117", border: "none", cursor: "pointer" }}
            >
              {isHe ? "רקע מקצועי" : "Professional background"}
            </button>
          </div>

          {activeTab === "personal" && (
            <div className="flex flex-col gap-8 lg:flex-row lg:gap-12">
              {/* Left — Profile picture + personal fields */}
              <div className="flex-1">
                <h2 className="text-xl text-primary" style={{ marginBottom: 16 }}>{isHe ? "תמונת פרופיל" : "Profile picture"}</h2>
                <div className="flex flex-col items-start" style={{ marginBottom: 28, gap: 12 }}>
                  <input ref={imageRef} type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                  <div className="h-28 w-28 shrink-0 overflow-hidden rounded-xl bg-muted-foreground/20">
                    <img src={profileImage || "/images/job-avatar.png"} alt="Profile" className="h-full w-full object-cover" />
                  </div>
                  <button onClick={() => imageRef.current?.click()} className="cursor-pointer rounded-lg border border-border-light text-sm text-foreground transition-colors hover:bg-gray-50" style={{ padding: "8px 20px" }}>
                    {t.profile.changeImage}
                  </button>
                </div>

                <div className="flex flex-col gap-5">
                  {[
                    { label: isHe ? "שם פרטי" : "First name", key: "firstName" },
                    { label: isHe ? "שם משפחה" : "Last name", key: "lastName" },
                    { label: isHe ? "מספר נייד" : "Mobile number", key: "mobile" },
                    { label: isHe ? "כתובת אימייל" : "Email address", key: "email" },
                  ].map((field) => (
                    <div key={field.key} className="flex flex-col gap-2">
                      <label className="text-sm text-foreground">{field.label}</label>
                      <input
                        type="text"
                        value={form[field.key as keyof typeof form]}
                        onChange={(e) => setForm({ ...form, [field.key]: e.target.value })}
                        className="w-full rounded-lg border border-border bg-[#F7F9FC] text-sm text-foreground focus:border-primary/30 focus:bg-white focus:outline-none"
                        style={{ padding: "14px 16px" }}
                      />
                    </div>
                  ))}

                  {/* Gender */}
                  <div className="relative flex flex-col gap-2">
                    <label className="text-sm text-foreground">{isHe ? "מגדר" : "Gender"}</label>
                    <button onClick={() => setGenderOpen(!genderOpen)} className="flex w-full cursor-pointer items-center justify-between rounded-lg border border-border bg-[#F7F9FC] text-sm text-foreground" style={{ padding: "14px 16px" }}>
                      <span>{form.gender}</span>
                      <ChevronDown size={16} className="text-muted-foreground" />
                    </button>
                    {genderOpen && (
                      <>
                        <div className="fixed inset-0 z-10" onClick={() => setGenderOpen(false)} />
                        <div className="absolute left-0 top-full z-20 mt-1 w-full overflow-hidden rounded-lg border border-border-light bg-white shadow-lg">
                          {(isHe ? ["זכר", "נקבה", "אחר", "מעדיף/ה לא לציין"] : ["Male", "Female", "Other", "Prefer not to say"]).map((opt) => (
                            <div
                              key={opt}
                              onClick={() => { setForm({ ...form, gender: opt.toLowerCase() }); setGenderOpen(false); }}
                              className="cursor-pointer text-sm text-foreground transition-colors hover:bg-[#F7F9FC]"
                              style={{ padding: "10px 16px", background: form.gender === opt.toLowerCase() ? "#EEF4FD" : undefined }}
                            >
                              {opt}
                            </div>
                          ))}
                        </div>
                      </>
                    )}
                  </div>

                  {/* Area */}
                  <div className="flex flex-col gap-2">
                    <label className="text-sm text-foreground">{isHe ? "אזור" : "Area"}</label>
                    <input
                      type="text"
                      value={form.area}
                      onChange={(e) => setForm({ ...form, area: e.target.value })}
                      className="w-full rounded-lg border border-border bg-[#F7F9FC] text-sm text-foreground focus:border-primary/30 focus:bg-white focus:outline-none"
                      style={{ padding: "14px 16px" }}
                    />
                  </div>
                </div>
              </div>

              {/* Right — Change password */}
              <div className="self-start lg:w-96">
                <h2 className="text-xl text-primary" style={{ marginBottom: 20 }}>{t.profile.changePassword}</h2>
                <div className="flex flex-col gap-5">
                  <div className="flex flex-col gap-2">
                    <label className="text-sm text-foreground">{t.profile.currentPassword}</label>
                    <div className="relative">
                      <input type={showCurrent ? "text" : "password"} placeholder={isHe ? "הקלד כאן..." : "Type here..."} value={passwords.current} onChange={(e) => setPasswords({ ...passwords, current: e.target.value })} className="w-full rounded-lg border border-border bg-[#F7F9FC] text-sm text-foreground placeholder:text-muted-foreground/40 focus:border-primary/30 focus:bg-white focus:outline-none" style={{ padding: "14px 40px 14px 16px" }} />
                      <button onClick={() => setShowCurrent(!showCurrent)} className="absolute inset-y-0 right-3 flex items-center border-none bg-transparent text-muted-foreground">
                        {showCurrent ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-sm text-foreground">{t.profile.newPassword}</label>
                    <div className="relative">
                      <input type={showNew ? "text" : "password"} placeholder={isHe ? "הקלד כאן..." : "Type here..."} value={passwords.newPass} onChange={(e) => setPasswords({ ...passwords, newPass: e.target.value })} className="w-full rounded-lg border border-border bg-[#F7F9FC] text-sm text-foreground placeholder:text-muted-foreground/40 focus:border-primary/30 focus:bg-white focus:outline-none" style={{ padding: "14px 40px 14px 16px" }} />
                      <button onClick={() => setShowNew(!showNew)} className="absolute inset-y-0 right-3 flex items-center border-none bg-transparent text-muted-foreground">
                        {showNew ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-sm text-foreground">{t.profile.verifyNewPassword}</label>
                    <div className="relative">
                      <input type={showVerify ? "text" : "password"} placeholder={isHe ? "הקלד כאן..." : "Type here..."} value={passwords.verify} onChange={(e) => setPasswords({ ...passwords, verify: e.target.value })} className="w-full rounded-lg border border-border bg-[#F7F9FC] text-sm text-foreground placeholder:text-muted-foreground/40 focus:border-primary/30 focus:bg-white focus:outline-none" style={{ padding: "14px 40px 14px 16px" }} />
                      <button onClick={() => setShowVerify(!showVerify)} className="absolute inset-y-0 right-3 flex items-center border-none bg-transparent text-muted-foreground">
                        {showVerify ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                    </div>
                  </div>
                </div>

                <p className="text-xs text-red-400" style={{ marginTop: 8 }}>
                  {isHe ? "הנחיות סיסמה: 8 תווים, מספרים ואותיות" : "Password guidelines: 8 characters, numbers and letters"}
                </p>
              </div>
            </div>
          )}

          {activeTab === "professional" && (
            <div className="flex flex-col gap-8 lg:flex-row lg:gap-12">
              {/* Left — Professional background fields */}
              <div className="flex-1">
                <h2 className="text-xl text-primary" style={{ marginBottom: 20 }}>{isHe ? "רקע מקצועי" : "Professional background"}</h2>
                <div className="flex flex-col gap-5">
                  {/* Role */}
                  <ProfDropdown label={isHe ? "תפקיד" : "Role"} value={profRole} open={profRoleOpen} setOpen={setProfRoleOpen} options={isHe ? ["מורה", "מורה פרטי", "עוזר הוראה", "מורה ממלא מקום", "יועץ", "מדריך"] : ["Teacher", "Tutor", "Teaching Assistant", "Substitute Teacher", "Counselor", "Instructor"]} onSelect={(v) => setProfRole(v)} onClear={() => setProfRole("")} hasTag />

                  {/* Field of knowledge */}
                  <ProfDropdown label={isHe ? "תחום ידע" : "Field of knowledge"} value={profField} open={profFieldOpen} setOpen={setProfFieldOpen} options={isHe ? ["מתמטיקה", "אנגלית", "מדעים", "היסטוריה", "אמנות", "מוזיקה", "פיזיקה", "מדעי המחשב"] : ["Mathematics", "English", "Science", "History", "Art", "Music", "Physics", "Computer Science"]} onSelect={(v) => setProfField(v)} onClear={() => setProfField("")} hasTag />

                  {/* About yourself */}
                  <div className="flex flex-col gap-2">
                    <label className="text-sm text-foreground">{isHe ? "כמה מילים על עצמך" : "A few words about yourself"}</label>
                    <textarea
                      defaultValue="This is dummy text intended to illustrate a template in a design interface, and to illustrate the text that should be entered in this area."
                      className="w-full resize-none rounded-lg border border-border bg-[#F7F9FC] text-sm text-foreground focus:border-primary/30 focus:bg-white focus:outline-none"
                      style={{ padding: "14px 16px", height: 90 }}
                    />
                  </div>

                  {/* Languages */}
                  <ProfDropdown label={isHe ? "שפות" : "Languages"} value={profLang} open={profLangOpen} setOpen={setProfLangOpen} options={isHe ? ["עברית", "אנגלית", "ערבית", "רוסית", "צרפתית", "ספרדית"] : ["Hebrew", "English", "Arabic", "Russian", "French", "Spanish"]} onSelect={(v) => setProfLang(v)} onClear={() => setProfLang("")} hasTag />

                  {/* Skills */}
                  <div className="flex flex-col gap-2">
                    <label className="text-sm text-foreground">{isHe ? "כישורים" : "Skills"}</label>
                    {skills.map((skill, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <input type="text" value={skill} onChange={(e) => { const s = [...skills]; s[idx] = e.target.value; setSkills(s); }} className="w-full rounded-lg border border-border bg-[#F7F9FC] text-sm text-foreground focus:border-primary/30 focus:bg-white focus:outline-none" style={{ padding: "14px 16px" }} />
                        {idx > 0 && (
                          <button onClick={() => setSkills(skills.filter((_, i) => i !== idx))} className="flex h-8 w-8 shrink-0 cursor-pointer items-center justify-center rounded-full border border-border-light bg-white text-red-400">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" /></svg>
                          </button>
                        )}
                      </div>
                    ))}
                    <p onClick={() => setSkills([...skills, ""])} className="cursor-pointer text-sm text-primary underline">{t.profile.addAnotherField}</p>
                  </div>

                  {/* Mobile with car */}
                  <ProfDropdown label={isHe ? "ניידות עם רכב" : "Mobile with car"} value={profCar} open={profCarOpen} setOpen={setProfCarOpen} options={isHe ? ["כן", "לא"] : ["yes", "not"]} onSelect={(v) => setProfCar(v)} onClear={() => {}} hasTag={false} />

                  {/* Do you have a dealer */}
                  <ProfDropdown label={isHe ? "יש לך תעודת הוראה?" : "Do you have a dealer?"} value={profDealer} open={profDealerOpen} setOpen={setProfDealerOpen} options={isHe ? ["כן", "לא"] : ["yes", "no"]} onSelect={(v) => setProfDealer(v)} onClear={() => {}} hasTag={false} />

                  {/* Teaching preferences */}
                  <ProfDropdown label={isHe ? "העדפות הוראה" : "Teaching preferences"} value={profTeaching} open={profTeachingOpen} setOpen={setProfTeachingOpen} options={isHe ? ["אונליין", "פרונטלי", "שניהם", "היברידי"] : ["Online", "In-person", "Both", "Hybrid"]} onSelect={(v) => setProfTeaching(v)} onClear={() => {}} hasTag={false} />
                </div>
              </div>

              {/* Right — Certificates, Work experience, Resume */}
              <div className="self-start lg:w-[420px]">
                {/* Certificates */}
                <h2 className="text-xl text-foreground" style={{ marginBottom: 16 }}>{isHe ? "תעודות והכשרות" : "Certificates and training"}</h2>
                <div className="flex flex-col gap-5" style={{ marginBottom: 32 }}>
                  {certificates.map((cert, idx) => (
                    <div key={idx} className="flex flex-col gap-4">
                      {idx > 0 && (
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-muted-foreground">{isHe ? `תעודה ${idx + 1}` : `Certificate ${idx + 1}`}</span>
                          <button onClick={() => setCertificates(certificates.filter((_, i) => i !== idx))} className="cursor-pointer border-none bg-transparent text-xs text-red-400 underline hover:text-red-600">{isHe ? "הסרה" : "Remove"}</button>
                        </div>
                      )}
                      <div className="flex flex-col gap-2">
                        <label className="text-sm text-foreground">{isHe ? "שם המוסד החינוכי" : "Name of the educational institution"}</label>
                        <input type="text" placeholder={isHe ? "הקלד כאן..." : "Type here..."} value={cert.institution} onChange={(e) => { const c = [...certificates]; c[idx].institution = e.target.value; setCertificates(c); }} className="w-full rounded-lg border border-border bg-[#F7F9FC] text-sm text-foreground placeholder:text-muted-foreground/40 focus:border-primary/30 focus:bg-white focus:outline-none" style={{ padding: "14px 16px" }} />
                      </div>
                      <div className="flex flex-col gap-2">
                        <label className="text-sm text-foreground">{isHe ? "הזן מידע או העלה קובץ" : "Enter information or upload a file"}</label>
                        <input type="text" placeholder={isHe ? "הקלד כאן..." : "Type here..."} value={cert.info} onChange={(e) => { const c = [...certificates]; c[idx].info = e.target.value; setCertificates(c); }} className="w-full rounded-lg border border-border bg-[#F7F9FC] text-sm text-foreground placeholder:text-muted-foreground/40 focus:border-primary/30 focus:bg-white focus:outline-none" style={{ padding: "14px 16px" }} />
                      </div>
                    </div>
                  ))}
                  <input ref={certFileRef} type="file" accept=".pdf,.doc,.docx,.jpg,.png" className="hidden" />
                  <button onClick={() => certFileRef.current?.click()} className="cursor-pointer self-start rounded-lg border border-foreground text-sm text-foreground transition-colors hover:bg-gray-50" style={{ padding: "8px 20px" }}>{isHe ? "העלאת קובץ +" : "Upload file +"}</button>
                  <p onClick={() => setCertificates([...certificates, { institution: "", info: "" }])} className="cursor-pointer text-sm text-primary underline">{t.profile.addAnotherField}</p>
                </div>

                {/* Work experience */}
                <h2 className="text-xl text-foreground" style={{ marginBottom: 16 }}>{isHe ? "ניסיון תעסוקתי" : "Work experience"}</h2>
                <div className="flex flex-col gap-4" style={{ marginBottom: 16 }}>
                  {workExps.map((exp) => (
                    <div key={exp.id} className="flex items-center justify-between rounded-lg border border-border-light bg-[#F7F9FC]" style={{ padding: "10px 14px" }}>
                      <div className="flex items-center gap-2">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full" style={{ backgroundImage: "linear-gradient(140deg, #4C96FF 12%, #1667DB 94%)" }}>
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="white"><path d="M20 6h-4V4c0-1.1-.9-2-2-2h-4c-1.1 0-2 .9-2 2v2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm-8-2h4v2h-4V4z" /></svg>
                        </div>
                        <div className="flex flex-col">
                          <span className="text-sm text-foreground">{exp.role}</span>
                          <span className="text-xs text-foreground">{exp.company}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-xs text-muted-foreground">{exp.dates}</span>
                        <button onClick={() => setEditingWork(exp)} className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border border-border-light bg-white text-muted-foreground hover:bg-gray-50"><svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" /></svg></button>
                        <button onClick={() => setWorkExps(workExps.filter((w) => w.id !== exp.id))} className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border border-border-light bg-white text-red-400"><svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" /></svg></button>
                      </div>
                    </div>
                  ))}
                </div>
                <button onClick={() => setWorkExps([...workExps, { id: Date.now(), role: "New Role", company: "New Company", dates: "Jan 2024 - Present" }])} className="cursor-pointer self-start rounded-lg border border-foreground text-sm text-foreground transition-colors hover:bg-gray-50" style={{ padding: "8px 20px", marginBottom: 32 }}>{isHe ? "הוסף מקום עבודה +" : "Add a workplace +"}</button>

                {/* Resume file */}
                <h2 className="text-xl text-foreground" style={{ marginBottom: 16 }}>{isHe ? "קובץ קורות חיים" : "Resume file"}</h2>
                <input ref={resumeRef} type="file" accept=".pdf,.doc,.docx" onChange={(e) => { if (e.target.files?.[0]) { setResumeFile(e.target.files[0]); setHasResume(true); } }} className="hidden" />
                {hasResume ? (
                  <div className="flex items-center justify-between rounded-lg border border-border-light" style={{ padding: "12px 14px", background: "linear-gradient(180deg, #FFFDF7 0%, #FFF8E8 100%)" }}>
                    <div className="flex items-center gap-2">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="#647787"><path d="M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1zM8 13h8v-2H8v2zm9-6h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1s-1.39 3.1-3.1 3.1h-4V17h4c2.76 0 5-2.24 5-5s-2.24-5-5-5z" /></svg>
                      <div className="flex flex-col">
                        <span className="text-xs text-primary">{resumeFile ? resumeFile.name : "CV"}</span>
                        <span className="text-[10px] text-muted-foreground">{resumeFile ? `${(resumeFile.size / 1024).toFixed(0)} KB` : "142 KB"}</span>
                      </div>
                    </div>
                    <button onClick={() => { setHasResume(false); setResumeFile(null); }} className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border border-border-light bg-white text-red-400"><svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" /></svg></button>
                  </div>
                ) : (
                  <button onClick={() => resumeRef.current?.click()} className="cursor-pointer rounded-lg border border-foreground text-sm text-foreground transition-colors hover:bg-gray-50" style={{ padding: "8px 20px" }}>
                    {isHe ? "העלאת קורות חיים +" : "Upload resume +"}
                  </button>
                )}
              </div>
            </div>
          )}

          {/* Buttons */}
          <div className="flex items-center justify-end gap-4" style={{ marginTop: 40 }}>
            <button className="cursor-pointer rounded-lg text-sm text-white transition-colors hover:opacity-90" style={{ padding: "12px 32px", border: "none", backgroundImage: "linear-gradient(168deg, #4C96FF 12%, #1667DB 94%)" }}>
              {t.profile.savingChanges}
            </button>
            <button className="cursor-pointer rounded-lg border border-foreground text-sm text-foreground transition-colors hover:bg-gray-50" style={{ padding: "12px 32px" }}>
              {t.profile.cancelChanges}
            </button>
          </div>
        </div>
      </div>

      {/* Edit Work Experience Modal */}
      {editingWork && (
        <div className="fixed inset-0 z-50 flex items-center justify-center" style={{ background: "rgba(0,0,0,0.4)", backdropFilter: "blur(8px)" }} onClick={() => setEditingWork(null)}>
          <div className="relative rounded-[20px] bg-white" style={{ width: 380, padding: "32px 28px", boxShadow: "0px 20px 60px rgba(0,0,0,0.15)" }} onClick={(e) => e.stopPropagation()}>
            <button onClick={() => setEditingWork(null)} className="absolute flex cursor-pointer items-center justify-center border-none bg-transparent text-muted-foreground hover:text-foreground" style={{ top: 16, right: 16 }}>
              <X size={18} />
            </button>
            <h3 className="text-[20px] text-foreground" style={{ marginBottom: 24 }}>{isHe ? "עריכת מקום עבודה" : "Edit workplace"}</h3>
            <div className="flex flex-col" style={{ gap: 16 }}>
              <div className="flex flex-col gap-2">
                <label className="text-sm text-foreground">{isHe ? "תפקיד" : "Role"}</label>
                <input type="text" value={editingWork.role} onChange={(e) => setEditingWork({ ...editingWork, role: e.target.value })} className="rounded-[10px] border border-border-light bg-white text-sm text-foreground outline-none focus:border-primary/30" style={{ height: 44, padding: "0 16px" }} />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm text-foreground">{isHe ? "חברה" : "Company"}</label>
                <input type="text" value={editingWork.company} onChange={(e) => setEditingWork({ ...editingWork, company: e.target.value })} className="rounded-[10px] border border-border-light bg-white text-sm text-foreground outline-none focus:border-primary/30" style={{ height: 44, padding: "0 16px" }} />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm text-foreground">{isHe ? "תאריכים" : "Dates"}</label>
                <input type="text" value={editingWork.dates} onChange={(e) => setEditingWork({ ...editingWork, dates: e.target.value })} className="rounded-[10px] border border-border-light bg-white text-sm text-foreground outline-none focus:border-primary/30" style={{ height: 44, padding: "0 16px" }} />
              </div>
              <div className="flex items-center gap-3" style={{ marginTop: 8 }}>
                <button onClick={() => { setWorkExps(workExps.map((w) => w.id === editingWork.id ? editingWork : w)); setEditingWork(null); }} className="flex-1 cursor-pointer rounded-[10px] text-sm text-white" style={{ height: 42, border: "none", backgroundImage: "linear-gradient(168deg, #4C96FF 12%, #1667DB 94%)" }}>{isHe ? "שמירה" : "Save"}</button>
                <button onClick={() => setEditingWork(null)} className="flex-1 cursor-pointer rounded-[10px] border border-foreground bg-white text-sm text-foreground" style={{ height: 42 }}>{isHe ? "ביטול" : "Cancel"}</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
