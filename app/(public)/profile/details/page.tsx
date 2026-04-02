"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { ChevronDown, Trash2, Pencil, Briefcase, Upload, X } from "lucide-react";

const genderOptions = ["Male", "Female", "Other", "Prefer not to say"];
const carOptions = ["Yes", "No"];
const dealerOptions = ["Yes", "No"];
const teachingPrefOptions = ["Online", "In-person", "Both", "Hybrid"];
const languageOptions = ["Hebrew", "English", "Arabic", "Russian", "French", "Spanish", "Amharic"];
const roleOptions = ["Teacher", "Tutor", "Teaching Assistant", "Substitute Teacher", "Counselor", "Instructor"];
const companyOptions = ["College of Management", "Tel Aviv University", "Hebrew University", "Technion", "Ben-Gurion University", "Bar-Ilan University"];

function SelectField({
  label, options, value, onChange, placeholder, required,
}: {
  label: string; options: string[]; value: string; onChange: (v: string) => void; placeholder?: string; required?: boolean;
}) {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative flex flex-col" style={{ gap: 10 }}>
      <label className="text-base text-foreground">
        {label}{required && <span style={{ color: "#FF676A" }}> *</span>}
      </label>
      <div
        onClick={() => setOpen(!open)}
        className="flex cursor-pointer items-center justify-between rounded-[10px] border border-border-light bg-white"
        style={{ height: 40, padding: "0 14px" }}
      >
        <span className="text-sm" style={{ color: value ? "#0E1117" : "#647787", opacity: value ? 1 : 0.3 }}>
          {value || placeholder || "Select..."}
        </span>
        <ChevronDown size={14} className="text-muted-foreground" />
      </div>
      {open && (
        <div className="absolute z-20 mt-1 max-h-48 w-full overflow-y-auto rounded-[10px] border border-border-light bg-white" style={{ top: "100%", boxShadow: "0 4px 24px rgba(0,0,0,0.08)" }}>
          {options.map((opt) => (
            <div key={opt} onClick={() => { onChange(opt); setOpen(false); }} className="cursor-pointer text-sm text-foreground hover:bg-border-light"
              style={{ padding: "10px 14px" }}>
              {opt}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function MultiSelectField({
  label, options, values, onChange,
}: {
  label: string; options: string[]; values: string[]; onChange: (v: string[]) => void;
}) {
  const [open, setOpen] = useState(false);
  const available = options.filter((o) => !values.includes(o));
  return (
    <div className="relative flex flex-col" style={{ gap: 10 }}>
      <label className="text-base text-foreground">{label}</label>
      <div
        onClick={() => setOpen(!open)}
        className="flex min-h-[40px] cursor-pointer items-center justify-between rounded-[10px] border border-border-light bg-white"
        style={{ padding: "4px 14px", flexWrap: "wrap", gap: 4 }}
      >
        <div className="flex flex-wrap gap-1.5">
          {values.map((v) => (
            <div key={v} className="flex items-center gap-1.5 rounded-[5px] bg-border-light text-sm text-foreground" style={{ padding: "4px 8px" }}>
              <span onClick={(e) => { e.stopPropagation(); onChange(values.filter((x) => x !== v)); }} className="cursor-pointer text-xs text-muted-foreground hover:text-foreground">
                <X size={10} />
              </span>
              <span>{v}</span>
            </div>
          ))}
          {values.length === 0 && <span className="text-sm text-muted-foreground/30">Select languages...</span>}
        </div>
        <ChevronDown size={14} className="shrink-0 text-muted-foreground" />
      </div>
      {open && available.length > 0 && (
        <div className="absolute z-20 mt-1 max-h-48 w-full overflow-y-auto rounded-[10px] border border-border-light bg-white" style={{ top: "100%", boxShadow: "0 4px 24px rgba(0,0,0,0.08)" }}>
          {available.map((opt) => (
            <div key={opt} onClick={() => { onChange([...values, opt]); setOpen(false); }} className="cursor-pointer text-sm text-foreground hover:bg-border-light"
              style={{ padding: "10px 14px" }}>
              {opt}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

interface WorkExp { id: number; role: string; company: string; startMonth: string; startYear: string; endMonth: string; endYear: string; current: boolean; }

export default function ProfileDetailsPage() {
  const router = useRouter();
  const imageRef = useRef<HTMLInputElement>(null);
  const certFileRef = useRef<HTMLInputElement>(null);

  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [certFile, setCertFile] = useState<File | null>(null);
  const [gender, setGender] = useState("");
  const [yearsExp, setYearsExp] = useState("");
  const [languages, setLanguages] = useState<string[]>(["Hebrew"]);
  const [mobileWithCar, setMobileWithCar] = useState("");
  const [hasDealer, setHasDealer] = useState("");
  const [teachingPref, setTeachingPref] = useState("");
  const [certName, setCertName] = useState("");
  const [certInfo, setCertInfo] = useState("");
  const [additionalSkills, setAdditionalSkills] = useState("");

  const [workExps, setWorkExps] = useState<WorkExp[]>([
    { id: 1, role: "Lorem Ipsum", company: "College of Management", startMonth: "January", startYear: "2020", endMonth: "August", endYear: "2023", current: false },
    { id: 2, role: "Lorem Ipsum", company: "College of Management", startMonth: "January", startYear: "2020", endMonth: "August", endYear: "2023", current: false },
    { id: 3, role: "Lorem Ipsum", company: "College of Management", startMonth: "January", startYear: "2020", endMonth: "August", endYear: "2023", current: false },
  ]);

  const [showAddWorkplace, setShowAddWorkplace] = useState(false);
  const [newWork, setNewWork] = useState({ role: "", company: "", startMonth: "January", startYear: "2023", endMonth: "", endYear: "", current: false });

  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const years = Array.from({ length: 30 }, (_, i) => String(2025 - i));

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => setProfileImage(ev.target?.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleAddWorkplace = () => {
    if (!newWork.role || !newWork.company) return;
    setWorkExps((prev) => [...prev, { ...newWork, id: Date.now() }]);
    setNewWork({ role: "", company: "", startMonth: "January", startYear: "2023", endMonth: "", endYear: "", current: false });
    setShowAddWorkplace(false);
  };

  const deleteWorkExp = (id: number) => setWorkExps((prev) => prev.filter((w) => w.id !== id));

  return (
    <div className="flex h-screen w-screen overflow-hidden" style={{ fontFamily: "'Abel', sans-serif", background: "#F7F9FC" }}>
      {/* LEFT — Form */}
      <div className="flex flex-1 flex-col overflow-y-auto">
        <div className="flex shrink-0 items-center justify-between" style={{ padding: "3vh 4vw 0 4vw" }}>
          <div className="flex items-center" style={{ fontSize: "clamp(24px, 2.2vw, 34px)", gap: 8.5, lineHeight: 1.2 }}>
            <span style={{ color: "#0E1117" }}>TEACH</span>
            <span style={{ color: "#2C7AEA" }}>UP</span>
          </div>
          <p style={{ fontSize: "clamp(12px, 1.1vw, 16px)", color: "#97A2C2", lineHeight: 1.2 }}>Step 03 of 03</p>
        </div>

        <div className="flex flex-1 flex-col" style={{ padding: "4vh 4vw 4vh" }}>
          <h1 style={{ fontSize: "clamp(24px, 2.4vw, 36px)", color: "#0E1117", lineHeight: 1.1, margin: "0 0 clamp(20px, 3vh, 30px)", maxWidth: 602 }}>
            The information you share here will allow others to understand who is behind the profile and what makes you unique.
          </h1>

          <div className="flex flex-col" style={{ gap: 30, maxWidth: 499 }}>
            {/* Profile picture */}
            <div className="flex flex-col items-start" style={{ gap: 20 }}>
              <p className="text-[22px] text-muted-foreground">Profile picture</p>
              <input ref={imageRef} type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
              <div className="flex flex-col items-start">
                <div
                  onClick={() => imageRef.current?.click()}
                  className="flex cursor-pointer flex-col items-center justify-center overflow-hidden rounded-[10px] border border-border-light"
                  style={{ width: 144, height: 144, background: profileImage ? "transparent" : "#E9F0FD" }}
                >
                  {profileImage ? (
                    <img src={profileImage} alt="Profile" className="h-full w-full object-cover" />
                  ) : (
                    <>
                      <Upload size={24} className="text-muted-foreground" />
                      <span className="mt-2 text-base text-foreground">290X288</span>
                    </>
                  )}
                </div>
                <button onClick={() => imageRef.current?.click()} className="mt-3 cursor-pointer rounded-[10px] border border-foreground bg-white text-sm text-foreground" style={{ padding: "8px 12px", width: 144 }}>
                  {profileImage ? "Change image" : "Upload image"}
                </button>
              </div>
            </div>

            {/* Dropdowns */}
            <div className="flex flex-col" style={{ gap: 20 }}>
              <SelectField label="Gender" options={genderOptions} value={gender} onChange={setGender} placeholder="Select..." />

              <div className="flex flex-col" style={{ gap: 10 }}>
                <label className="text-base text-foreground">Years of experience</label>
                <input type="text" placeholder="Type here..." value={yearsExp} onChange={(e) => setYearsExp(e.target.value)} className="rounded-[10px] border border-border-light bg-white text-sm text-foreground outline-none placeholder:text-muted-foreground/30" style={{ height: 40, padding: "0 14px" }} />
              </div>

              <MultiSelectField label="Languages" options={languageOptions} values={languages} onChange={setLanguages} />
              <SelectField label="Mobile with car" options={carOptions} value={mobileWithCar} onChange={setMobileWithCar} placeholder="Select..." />
              <SelectField label="Do you have a dealer?" options={dealerOptions} value={hasDealer} onChange={setHasDealer} placeholder="Select..." />
              <SelectField label="Teaching preferences" options={teachingPrefOptions} value={teachingPref} onChange={setTeachingPref} placeholder="Select..." />
            </div>

            {/* Certificates */}
            <div className="flex flex-col" style={{ gap: 20 }}>
              <h2 style={{ fontSize: 24, color: "#0E1117", lineHeight: 1.1, margin: 0 }}>Certificates and training</h2>

              <div className="flex flex-col" style={{ gap: 10 }}>
                <label className="text-base text-foreground">Name of the educational institution</label>
                <input type="text" placeholder="Type here..." value={certName} onChange={(e) => setCertName(e.target.value)} className="rounded-[10px] border border-border-light bg-white text-sm text-foreground outline-none placeholder:text-muted-foreground/30" style={{ height: 40, padding: "0 14px" }} />
              </div>

              <div className="flex flex-col" style={{ gap: 10 }}>
                <label className="text-base text-foreground">Enter information or upload a file</label>
                <input type="text" placeholder="Type here..." value={certInfo} onChange={(e) => setCertInfo(e.target.value)} className="rounded-[10px] border border-border-light bg-white text-sm text-foreground outline-none placeholder:text-muted-foreground/30" style={{ height: 40, padding: "0 14px" }} />
              </div>

              <input ref={certFileRef} type="file" accept=".pdf,.doc,.docx,.jpg,.png" onChange={(e) => { if (e.target.files?.[0]) setCertFile(e.target.files[0]); }} className="hidden" />
              {certFile ? (
                <div className="flex items-center gap-2 self-start rounded-[10px] border border-border-light bg-white px-3 py-2 text-sm text-foreground">
                  <span className="max-w-[150px] truncate">{certFile.name}</span>
                  <button onClick={() => setCertFile(null)} className="cursor-pointer border-none bg-transparent text-muted-foreground hover:text-foreground"><X size={14} /></button>
                </div>
              ) : (
                <button onClick={() => certFileRef.current?.click()} className="cursor-pointer self-start rounded-[10px] border border-foreground bg-white text-sm text-foreground" style={{ padding: "8px 12px", width: 184 }}>
                  Upload file +
                </button>
              )}
              <p className="cursor-pointer text-base text-primary underline">Add another field +</p>
            </div>

            {/* Additional skills */}
            <div className="flex flex-col" style={{ gap: 10 }}>
              <label className="text-base text-foreground">Additional skills</label>
              <input type="text" placeholder="Type here..." value={additionalSkills} onChange={(e) => setAdditionalSkills(e.target.value)} className="rounded-[10px] border border-border-light bg-white text-sm text-foreground outline-none placeholder:text-muted-foreground/30" style={{ height: 40, padding: "0 14px" }} />
              <p className="cursor-pointer text-base text-primary underline">Add another field +</p>
            </div>

            {/* Work experience */}
            <div className="flex flex-col" style={{ gap: 20 }}>
              <p className="text-base text-muted-foreground">Work experience</p>
              <div className="flex flex-col" style={{ gap: 12 }}>
                {workExps.map((exp) => (
                  <div key={exp.id} className="flex items-center justify-between rounded-[10px] border border-border-light bg-border-light" style={{ height: 57, padding: "0 16px" }}>
                    <div className="flex items-center gap-2.5">
                      <div className="flex h-[33px] w-[33px] items-center justify-center rounded-full" style={{ backgroundImage: "linear-gradient(140deg, #4C96FF 12%, #1667DB 94%)" }}>
                        <Briefcase size={15} className="text-white" />
                      </div>
                      <div className="flex flex-col" style={{ gap: 2 }}>
                        <span className="text-base text-foreground">{exp.role}</span>
                        <span className="text-sm text-foreground">{exp.company}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-5">
                      <span className="text-sm text-muted-foreground">{exp.startMonth.slice(0, 3)} {exp.startYear} - {exp.current ? "Present" : `${exp.endMonth.slice(0, 3)} ${exp.endYear}`}</span>
                      <div className="flex items-center gap-2.5">
                        <button className="flex h-[33px] w-[33px] items-center justify-center rounded-full border border-border-light bg-white"><Pencil size={14} className="text-muted-foreground" /></button>
                        <button onClick={() => deleteWorkExp(exp.id)} className="flex h-[33px] w-[33px] cursor-pointer items-center justify-center rounded-full border border-border-light bg-white"><Trash2 size={14} className="text-muted-foreground" /></button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <button onClick={() => setShowAddWorkplace(true)} className="cursor-pointer self-start rounded-[10px] border border-foreground bg-white text-sm text-foreground" style={{ padding: "8px 12px", width: 184 }}>
                Add a workplace +
              </button>
            </div>

            {/* Buttons */}
            <div className="flex items-center" style={{ gap: 20, paddingBottom: 40 }}>
              <button onClick={() => router.push("/jobs")} className="flex cursor-pointer items-center justify-center text-white" style={{ width: 162, height: 40, borderRadius: 10, backgroundImage: "linear-gradient(168deg, #4C96FF 12%, #1667DB 94%)", border: "none", fontSize: 16 }}>
                continuation
              </button>
              <button onClick={() => router.back()} className="flex cursor-pointer items-center justify-center text-foreground" style={{ width: 162, height: 40, borderRadius: 10, background: "white", border: "1px solid #0E1117", fontSize: 16 }}>
                return
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT — Blue panel */}
      <div className="relative hidden shrink-0 overflow-hidden lg:block" style={{ width: "37%", background: "#EFF5FE" }}>
        <div className="pointer-events-none absolute flex flex-col" style={{ left: -20, top: -4, opacity: 0.55 }}>
          {[0, 1, 2].map((row) => (
            <div key={row} className="flex" style={{ marginBottom: -2 }}>
              {[0, 1, 2, 3].map((col) => (
                <div key={col} style={{ width: 140, height: 140, border: "2px solid white", marginRight: -2, background: (row === 0 && col === 1) || (row === 2 && col === 3) ? "white" : "transparent" }} />
              ))}
            </div>
          ))}
        </div>
        <div className="pointer-events-none absolute flex flex-col" style={{ left: -20, top: 420, opacity: 0.55 }}>
          {[0, 1, 2, 3, 4].map((row) => (
            <div key={row} className="flex" style={{ marginBottom: -2 }}>
              {[0, 1, 2, 3].map((col) => (
                <div key={col} style={{ width: 140, height: 140, border: "2px solid white", marginRight: -2, background: (row === 1 && col === 1) ? "white" : "transparent" }} />
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Add workplace modal */}
      {showAddWorkplace && (
        <div className="fixed inset-0 z-50 flex items-center justify-center" style={{ background: "rgba(0,0,0,0.3)" }} onClick={() => setShowAddWorkplace(false)}>
          <div className="overflow-hidden rounded-[16px] bg-white" style={{ width: 300, padding: "20px 20px", boxShadow: "0px 4px 24px rgba(0,0,0,0.08)" }} onClick={(e) => e.stopPropagation()}>
            <div className="flex flex-col" style={{ gap: 12 }}>
              <label className="text-sm text-foreground">role *</label>
              <select value={newWork.role} onChange={(e) => setNewWork({ ...newWork, role: e.target.value })} className="rounded-lg border-none bg-[#F8F8F8] text-sm text-foreground outline-none" style={{ height: 40, padding: "0 14px" }}>
                <option value="">Select...</option>
                {roleOptions.map((o) => <option key={o} value={o}>{o}</option>)}
              </select>

              <label className="text-sm text-foreground">company *</label>
              <select value={newWork.company} onChange={(e) => setNewWork({ ...newWork, company: e.target.value })} className="rounded-lg border-none bg-[#F8F8F8] text-sm text-foreground outline-none" style={{ height: 40, padding: "0 14px" }}>
                <option value="">Select...</option>
                {companyOptions.map((o) => <option key={o} value={o}>{o}</option>)}
              </select>

              <label className="text-sm text-foreground">Start date</label>
              <div className="flex gap-2.5">
                <select value={newWork.startMonth} onChange={(e) => setNewWork({ ...newWork, startMonth: e.target.value })} className="flex-1 rounded-lg border-none bg-[#F8F8F8] text-sm text-foreground outline-none" style={{ height: 40, padding: "0 14px" }}>
                  {months.map((m) => <option key={m} value={m}>{m}</option>)}
                </select>
                <select value={newWork.startYear} onChange={(e) => setNewWork({ ...newWork, startYear: e.target.value })} className="flex-1 rounded-lg border-none bg-[#F8F8F8] text-sm text-foreground outline-none" style={{ height: 40, padding: "0 14px" }}>
                  {years.map((y) => <option key={y} value={y}>{y}</option>)}
                </select>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm text-foreground">Current workplace</span>
                <div onClick={() => setNewWork({ ...newWork, current: !newWork.current })} className="relative h-5 w-10 cursor-pointer rounded-full" style={{ background: newWork.current ? "#4C96FF" : "#D1D5DB" }}>
                  <div className="absolute top-0.5 h-4 w-4 rounded-full bg-white transition-transform" style={{ transform: newWork.current ? "translateX(22px)" : "translateX(2px)" }} />
                </div>
              </div>

              {!newWork.current && (
                <>
                  <label className="text-sm text-foreground">End date</label>
                  <div className="flex gap-2.5">
                    <select value={newWork.endMonth} onChange={(e) => setNewWork({ ...newWork, endMonth: e.target.value })} className="flex-1 rounded-lg border-none bg-[#F8F8F8] text-sm text-foreground outline-none" style={{ height: 40, padding: "0 14px" }}>
                      <option value="">month</option>
                      {months.map((m) => <option key={m} value={m}>{m}</option>)}
                    </select>
                    <select value={newWork.endYear} onChange={(e) => setNewWork({ ...newWork, endYear: e.target.value })} className="flex-1 rounded-lg border-none bg-[#F8F8F8] text-sm text-foreground outline-none" style={{ height: 40, padding: "0 14px" }}>
                      <option value="">year</option>
                      {years.map((y) => <option key={y} value={y}>{y}</option>)}
                    </select>
                  </div>
                </>
              )}

              <div className="flex items-center justify-between" style={{ marginTop: 8 }}>
                <button onClick={handleAddWorkplace} className="cursor-pointer border-none bg-transparent text-sm text-primary">Approval</button>
                <button onClick={() => setShowAddWorkplace(false)} className="cursor-pointer border-none bg-transparent text-sm" style={{ color: "#B1B5B9" }}>Reset</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
