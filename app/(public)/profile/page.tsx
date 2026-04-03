"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { ChevronDown, Eye, EyeOff, Heart, Bell, MessageSquare, Globe } from "lucide-react";
import { useLanguage } from "@/lib/i18n/context";

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
          <span>{value || "Select..."}</span>
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
  const { locale, toggleLocale } = useLanguage();
  const imageRef = useRef<HTMLInputElement>(null);
  const [activeTab, setActiveTab] = useState<"personal" | "professional">("personal");
  const [notifOpen, setNotifOpen] = useState(false);
  const [avatarMenuOpen, setAvatarMenuOpen] = useState(false);
  const [profileImage, setProfileImage] = useState<string | null>(null);
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
  const certFileRef = useRef<HTMLInputElement>(null);
  const resumeRef = useRef<HTMLInputElement>(null);

  const [form, setForm] = useState({
    firstName: "May", lastName: "Bozo", mobile: "0527083931",
    email: "msmdrhsj@gmail.com", gender: "female", area: "Tel Aviv - Jaffa",
  });
  const [passwords, setPasswords] = useState({ current: "", newPass: "", verify: "" });

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
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white" style={{ borderBottom: "1px solid #F3F3F6" }}>
        <div className="mx-auto flex max-w-[1375px] items-center justify-between" style={{ padding: "12px 40px" }}>
          <div className="flex items-center gap-10">
            <div className="flex items-center gap-1.5 text-2xl">
              <span className="text-foreground">TEACH</span>
              <span className="text-[#2C7AEA]">UP</span>
            </div>
            <nav className="flex items-center gap-8 text-base">
              <a onClick={() => router.push("/jobs")} className="cursor-pointer text-muted-foreground hover:text-foreground">Job search</a>
              <a onClick={() => router.push("/jobs?tab=my")} className="cursor-pointer text-muted-foreground hover:text-foreground">My jobs</a>
              <a onClick={() => router.push("/contact")} className="cursor-pointer text-muted-foreground hover:text-foreground">Contact us</a>
            </nav>
          </div>
          <div className="flex items-center gap-5">
            <button onClick={toggleLocale} className="flex cursor-pointer items-center gap-1.5 border-none bg-transparent text-sm text-muted-foreground hover:text-foreground">
              <Globe size={16} /><span>{locale === "en" ? "עב" : "EN"}</span>
            </button>
            <div className="flex items-center gap-4">
              <button onClick={() => router.push("/favorites")} className="flex cursor-pointer items-center justify-center border-none bg-transparent text-muted-foreground hover:text-foreground"><Heart size={18} /></button>
              <div className="relative">
                <button onClick={() => setNotifOpen(!notifOpen)} className="flex cursor-pointer items-center justify-center border-none bg-transparent text-muted-foreground hover:text-foreground"><Bell size={18} /></button>
                {notifOpen && (
                  <>
                    <div className="fixed inset-0 z-50" onClick={() => setNotifOpen(false)} />
                    <div className="absolute right-0 top-10 z-50 flex w-[420px] flex-col rounded-2xl bg-white shadow-xl" style={{ padding: "20px 0" }}>
                      <h3 className="text-center text-lg text-foreground" style={{ marginBottom: 16 }}>Notifications</h3>
                      {[
                        { msg: "We wanted to inform you that Tel Aviv University has updated your application status.", time: "4 hours ago", logo: "/images/chat-company-logo.png", anon: false },
                        { msg: "We wanted to let you know that there is a new update from an anonymous source.", time: "4 hours ago", logo: "", anon: true },
                      ].map((notif, i) => (
                        <div key={i} className="flex items-start gap-3 border-b border-border-light" style={{ padding: "14px 20px" }}>
                          <div className="flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-xl" style={{ background: notif.anon ? "#E8EEF5" : "#0E1117", padding: notif.anon ? 0 : 6 }}>
                            {notif.anon ? <svg width="20" height="20" viewBox="0 0 24 24" fill="#9CA3AF"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" /></svg> : <img src={notif.logo} alt="" className="h-full w-full object-contain" />}
                          </div>
                          <div className="flex flex-1 flex-col gap-1"><p className="text-sm leading-[1.3] text-foreground">{notif.msg}</p><span className="text-xs text-muted-foreground">{notif.time}</span></div>
                          <button className="shrink-0 cursor-pointer border-none bg-transparent text-xs text-primary underline">View status</button>
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </div>
              <button onClick={() => router.push("/messages")} className="flex cursor-pointer items-center justify-center border-none bg-transparent text-muted-foreground"><MessageSquare size={18} /></button>
            </div>
            <div className="relative flex items-center gap-1">
              <button onClick={() => router.push("/profile")} className="flex cursor-pointer items-center border-none bg-transparent">
                <div className="h-9 w-9 overflow-hidden rounded-full border border-border-light"><img src="/images/job-avatar.png" alt="" className="h-full w-full object-cover" /></div>
              </button>
              <button onClick={() => setAvatarMenuOpen(!avatarMenuOpen)} className="flex cursor-pointer items-center justify-center border-none bg-transparent text-muted-foreground hover:text-foreground"><ChevronDown size={14} /></button>
              {avatarMenuOpen && (
                <>
                  <div className="fixed inset-0 z-50" onClick={() => setAvatarMenuOpen(false)} />
                  <div className="absolute right-0 top-12 z-50 flex min-w-36 flex-col gap-1 rounded-xl border border-border-light bg-white shadow-lg" style={{ padding: "12px 16px" }}>
                    <button onClick={() => { setAvatarMenuOpen(false); router.push("/profile"); }} className="flex w-full whitespace-nowrap py-2 text-start text-sm text-foreground transition-colors hover:text-primary">Personal area</button>
                    <button className="flex w-full whitespace-nowrap py-2 text-start text-sm text-red-400 transition-colors hover:text-red-600" onClick={() => setAvatarMenuOpen(false)}>Disengagement</button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="mx-auto w-full max-w-[1375px]" style={{ padding: "24px 40px 64px" }}>
        <div className="rounded-2xl bg-white" style={{ padding: "36px 40px 40px" }}>
          <h1 className="text-[28px] leading-tight text-foreground" style={{ marginBottom: 20 }}>My profile</h1>

          {/* Tabs */}
          <div className="inline-flex items-center gap-1.5 rounded-xl bg-[#F7F9FC]" style={{ marginBottom: 32, padding: 6 }}>
            <button
              onClick={() => setActiveTab("personal")}
              className="rounded-xl text-sm transition-colors"
              style={{ padding: "12px 40px", background: activeTab === "personal" ? "linear-gradient(168deg, #4C96FF 12%, #1667DB 94%)" : "transparent", color: activeTab === "personal" ? "white" : "#0E1117", border: "none", cursor: "pointer" }}
            >
              Personal details
            </button>
            <button
              onClick={() => setActiveTab("professional")}
              className="rounded-xl text-sm transition-colors"
              style={{ padding: "12px 40px", background: activeTab === "professional" ? "linear-gradient(168deg, #4C96FF 12%, #1667DB 94%)" : "transparent", color: activeTab === "professional" ? "white" : "#0E1117", border: "none", cursor: "pointer" }}
            >
              Professional background
            </button>
          </div>

          {activeTab === "personal" && (
            <div className="flex flex-col gap-8 lg:flex-row lg:gap-12">
              {/* Left — Profile picture + personal fields */}
              <div className="flex-1">
                <h2 className="text-xl text-primary" style={{ marginBottom: 16 }}>Profile picture</h2>
                <div className="flex flex-col items-start" style={{ marginBottom: 28, gap: 12 }}>
                  <input ref={imageRef} type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                  <div className="h-28 w-28 shrink-0 overflow-hidden rounded-xl bg-muted-foreground/20">
                    <img src={profileImage || "/images/job-avatar.png"} alt="Profile" className="h-full w-full object-cover" />
                  </div>
                  <button onClick={() => imageRef.current?.click()} className="cursor-pointer rounded-lg border border-border-light text-sm text-foreground transition-colors hover:bg-gray-50" style={{ padding: "8px 20px" }}>
                    Change image
                  </button>
                </div>

                <div className="flex flex-col gap-5">
                  {[
                    { label: "First name", key: "firstName" },
                    { label: "Last name", key: "lastName" },
                    { label: "Mobile number", key: "mobile" },
                    { label: "Email address", key: "email" },
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
                    <label className="text-sm text-foreground">Gender</label>
                    <button onClick={() => setGenderOpen(!genderOpen)} className="flex w-full cursor-pointer items-center justify-between rounded-lg border border-border bg-[#F7F9FC] text-sm text-foreground" style={{ padding: "14px 16px" }}>
                      <span>{form.gender}</span>
                      <ChevronDown size={16} className="text-muted-foreground" />
                    </button>
                    {genderOpen && (
                      <>
                        <div className="fixed inset-0 z-10" onClick={() => setGenderOpen(false)} />
                        <div className="absolute left-0 top-full z-20 mt-1 w-full overflow-hidden rounded-lg border border-border-light bg-white shadow-lg">
                          {["Male", "Female", "Other", "Prefer not to say"].map((opt) => (
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
                    <label className="text-sm text-foreground">area</label>
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
                <h2 className="text-xl text-primary" style={{ marginBottom: 20 }}>Change password</h2>
                <div className="flex flex-col gap-5">
                  <div className="flex flex-col gap-2">
                    <label className="text-sm text-foreground">Current password</label>
                    <div className="relative">
                      <input type={showCurrent ? "text" : "password"} placeholder="Type here..." value={passwords.current} onChange={(e) => setPasswords({ ...passwords, current: e.target.value })} className="w-full rounded-lg border border-border bg-[#F7F9FC] text-sm text-foreground placeholder:text-muted-foreground/40 focus:border-primary/30 focus:bg-white focus:outline-none" style={{ padding: "14px 40px 14px 16px" }} />
                      <button onClick={() => setShowCurrent(!showCurrent)} className="absolute inset-y-0 right-3 flex items-center border-none bg-transparent text-muted-foreground">
                        {showCurrent ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-sm text-foreground">New password</label>
                    <div className="relative">
                      <input type={showNew ? "text" : "password"} placeholder="Type here..." value={passwords.newPass} onChange={(e) => setPasswords({ ...passwords, newPass: e.target.value })} className="w-full rounded-lg border border-border bg-[#F7F9FC] text-sm text-foreground placeholder:text-muted-foreground/40 focus:border-primary/30 focus:bg-white focus:outline-none" style={{ padding: "14px 40px 14px 16px" }} />
                      <button onClick={() => setShowNew(!showNew)} className="absolute inset-y-0 right-3 flex items-center border-none bg-transparent text-muted-foreground">
                        {showNew ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-sm text-foreground">Verify new password</label>
                    <div className="relative">
                      <input type={showVerify ? "text" : "password"} placeholder="Type here..." value={passwords.verify} onChange={(e) => setPasswords({ ...passwords, verify: e.target.value })} className="w-full rounded-lg border border-border bg-[#F7F9FC] text-sm text-foreground placeholder:text-muted-foreground/40 focus:border-primary/30 focus:bg-white focus:outline-none" style={{ padding: "14px 40px 14px 16px" }} />
                      <button onClick={() => setShowVerify(!showVerify)} className="absolute inset-y-0 right-3 flex items-center border-none bg-transparent text-muted-foreground">
                        {showVerify ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                    </div>
                  </div>
                </div>

                <p className="text-xs text-red-400" style={{ marginTop: 8 }}>
                  Password guidelines: 8 characters, numbers and letters
                </p>
              </div>
            </div>
          )}

          {activeTab === "professional" && (
            <div className="flex flex-col gap-8 lg:flex-row lg:gap-12">
              {/* Left — Professional background fields */}
              <div className="flex-1">
                <h2 className="text-xl text-primary" style={{ marginBottom: 20 }}>Professional background</h2>
                <div className="flex flex-col gap-5">
                  {/* Role */}
                  <ProfDropdown label="Role" value={profRole} open={profRoleOpen} setOpen={setProfRoleOpen} options={["Teacher", "Tutor", "Teaching Assistant", "Substitute Teacher", "Counselor", "Instructor"]} onSelect={(v) => setProfRole(v)} onClear={() => setProfRole("")} hasTag />

                  {/* Field of knowledge */}
                  <ProfDropdown label="Field of knowledge" value={profField} open={profFieldOpen} setOpen={setProfFieldOpen} options={["Mathematics", "English", "Science", "History", "Art", "Music", "Physics", "Computer Science"]} onSelect={(v) => setProfField(v)} onClear={() => setProfField("")} hasTag />

                  {/* About yourself */}
                  <div className="flex flex-col gap-2">
                    <label className="text-sm text-foreground">A few words about yourself</label>
                    <textarea
                      defaultValue="This is dummy text intended to illustrate a template in a design interface, and to illustrate the text that should be entered in this area."
                      className="w-full resize-none rounded-lg border border-border bg-[#F7F9FC] text-sm text-foreground focus:border-primary/30 focus:bg-white focus:outline-none"
                      style={{ padding: "14px 16px", height: 90 }}
                    />
                  </div>

                  {/* Languages */}
                  <ProfDropdown label="Languages" value={profLang} open={profLangOpen} setOpen={setProfLangOpen} options={["Hebrew", "English", "Arabic", "Russian", "French", "Spanish"]} onSelect={(v) => setProfLang(v)} onClear={() => setProfLang("")} hasTag />

                  {/* Skills */}
                  <div className="flex flex-col gap-2">
                    <label className="text-sm text-foreground">Skills</label>
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
                    <p onClick={() => setSkills([...skills, ""])} className="cursor-pointer text-sm text-primary underline">Add another field +</p>
                  </div>

                  {/* Mobile with car */}
                  <ProfDropdown label="Mobile with car" value={profCar} open={profCarOpen} setOpen={setProfCarOpen} options={["yes", "not"]} onSelect={(v) => setProfCar(v)} onClear={() => {}} hasTag={false} />

                  {/* Do you have a dealer */}
                  <ProfDropdown label="Do you have a dealer?" value={profDealer} open={profDealerOpen} setOpen={setProfDealerOpen} options={["yes", "no"]} onSelect={(v) => setProfDealer(v)} onClear={() => {}} hasTag={false} />

                  {/* Teaching preferences */}
                  <ProfDropdown label="Teaching preferences" value={profTeaching} open={profTeachingOpen} setOpen={setProfTeachingOpen} options={["Online", "In-person", "Both", "Hybrid"]} onSelect={(v) => setProfTeaching(v)} onClear={() => {}} hasTag={false} />
                </div>
              </div>

              {/* Right — Certificates, Work experience, Resume */}
              <div className="self-start lg:w-[420px]">
                {/* Certificates */}
                <h2 className="text-xl text-foreground" style={{ marginBottom: 16 }}>Certificates and training</h2>
                <div className="flex flex-col gap-5" style={{ marginBottom: 32 }}>
                  {certificates.map((cert, idx) => (
                    <div key={idx} className="flex flex-col gap-4">
                      {idx > 0 && (
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-muted-foreground">Certificate {idx + 1}</span>
                          <button onClick={() => setCertificates(certificates.filter((_, i) => i !== idx))} className="cursor-pointer border-none bg-transparent text-xs text-red-400 underline hover:text-red-600">Remove</button>
                        </div>
                      )}
                      <div className="flex flex-col gap-2">
                        <label className="text-sm text-foreground">Name of the educational institution</label>
                        <input type="text" placeholder="Type here..." value={cert.institution} onChange={(e) => { const c = [...certificates]; c[idx].institution = e.target.value; setCertificates(c); }} className="w-full rounded-lg border border-border bg-[#F7F9FC] text-sm text-foreground placeholder:text-muted-foreground/40 focus:border-primary/30 focus:bg-white focus:outline-none" style={{ padding: "14px 16px" }} />
                      </div>
                      <div className="flex flex-col gap-2">
                        <label className="text-sm text-foreground">Enter information or upload a file</label>
                        <input type="text" placeholder="Type here..." value={cert.info} onChange={(e) => { const c = [...certificates]; c[idx].info = e.target.value; setCertificates(c); }} className="w-full rounded-lg border border-border bg-[#F7F9FC] text-sm text-foreground placeholder:text-muted-foreground/40 focus:border-primary/30 focus:bg-white focus:outline-none" style={{ padding: "14px 16px" }} />
                      </div>
                    </div>
                  ))}
                  <input ref={certFileRef} type="file" accept=".pdf,.doc,.docx,.jpg,.png" className="hidden" />
                  <button onClick={() => certFileRef.current?.click()} className="cursor-pointer self-start rounded-lg border border-foreground text-sm text-foreground transition-colors hover:bg-gray-50" style={{ padding: "8px 20px" }}>Upload file +</button>
                  <p onClick={() => setCertificates([...certificates, { institution: "", info: "" }])} className="cursor-pointer text-sm text-primary underline">Add another field +</p>
                </div>

                {/* Work experience */}
                <h2 className="text-xl text-foreground" style={{ marginBottom: 16 }}>Work experience</h2>
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
                        <button className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border border-border-light bg-white text-muted-foreground"><svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" /></svg></button>
                        <button onClick={() => setWorkExps(workExps.filter((w) => w.id !== exp.id))} className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border border-border-light bg-white text-red-400"><svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" /></svg></button>
                      </div>
                    </div>
                  ))}
                </div>
                <button onClick={() => setWorkExps([...workExps, { id: Date.now(), role: "New Role", company: "New Company", dates: "Jan 2024 - Present" }])} className="cursor-pointer self-start rounded-lg border border-foreground text-sm text-foreground transition-colors hover:bg-gray-50" style={{ padding: "8px 20px", marginBottom: 32 }}>Add a workplace +</button>

                {/* Resume file */}
                <h2 className="text-xl text-foreground" style={{ marginBottom: 16 }}>Resume file</h2>
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
                    Upload resume +
                  </button>
                )}
              </div>
            </div>
          )}

          {/* Buttons */}
          <div className="flex items-center justify-end gap-4" style={{ marginTop: 40 }}>
            <button className="cursor-pointer rounded-lg text-sm text-white transition-colors hover:opacity-90" style={{ padding: "12px 32px", border: "none", backgroundImage: "linear-gradient(168deg, #4C96FF 12%, #1667DB 94%)" }}>
              Saving changes
            </button>
            <button className="cursor-pointer rounded-lg border border-foreground text-sm text-foreground transition-colors hover:bg-gray-50" style={{ padding: "12px 32px" }}>
              Cancel changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
