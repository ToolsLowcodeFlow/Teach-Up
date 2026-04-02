"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { ChevronDown, X } from "lucide-react";

const roleOptions = ["Teacher", "Tutor", "Teaching Assistant", "Substitute Teacher", "Counselor", "Instructor"];
const fieldOptions = ["Mathematics", "English", "Science", "History", "Art", "Music", "Physical Education", "Computer Science", "Special Education"];
const areaOptions = ["Tel Aviv", "Jerusalem", "Haifa", "Be'er Sheva", "Netanya", "Eilat", "Herzliya", "Rishon LeZion"];

function SelectField({
  label, options, value, onChange, required, placeholder,
}: {
  label: string; options: string[]; value: string; onChange: (v: string) => void; required?: boolean; placeholder?: string;
}) {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative flex flex-col" style={{ gap: 10 }}>
      <label className="text-base text-foreground">
        {label}{required && <span style={{ color: "#FF676A" }}> *</span>}
      </label>
      <div
        onClick={() => setOpen(!open)}
        className="flex cursor-pointer items-center justify-between rounded-[10px] border border-[#F3F3F6] bg-white"
        style={{ height: 40, padding: "0 14px" }}
      >
        <span className="text-sm" style={{ color: value ? "#0E1117" : "#647787", opacity: value ? 1 : 0.3 }}>
          {value || placeholder || "Select..."}
        </span>
        <ChevronDown size={14} className="text-muted-foreground" />
      </div>
      {open && (
        <div
          className="absolute z-20 mt-1 max-h-48 w-full overflow-y-auto rounded-[10px] border border-[#F3F3F6] bg-white"
          style={{ top: "100%", boxShadow: "0 4px 24px rgba(0,0,0,0.08)" }}
        >
          {options.map((opt) => (
            <div
              key={opt}
              onClick={() => { onChange(opt); setOpen(false); }}
              className="cursor-pointer text-sm text-foreground hover:bg-[#F3F3F6]"
              style={{ padding: "10px 14px" }}
            >
              {opt}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function ProfileSetupPage() {
  const router = useRouter();
  const resumeRef = useRef<HTMLInputElement>(null);
  const [form, setForm] = useState({
    firstName: "", lastName: "", mobile: "", area: "", role: "", fieldOfKnowledge: "", aboutYourself: "",
  });
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [agreedToPolicy, setAgreedToPolicy] = useState(false);

  const updateField = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleResumeUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setResumeFile(file);
  };

  return (
    <div className="flex h-screen w-screen overflow-hidden" style={{ fontFamily: "'Abel', sans-serif", background: "#F7F9FC" }}>
      {/* LEFT — Form content */}
      <div className="flex flex-1 flex-col overflow-y-auto">
        <div className="flex shrink-0 items-center justify-between" style={{ padding: "3vh 4vw 0 4vw" }}>
          <div className="flex items-center" style={{ fontSize: "clamp(24px, 2.2vw, 34px)", gap: 8.5, lineHeight: 1.2 }}>
            <span style={{ color: "#0E1117" }}>TEACH</span>
            <span style={{ color: "#2C7AEA" }}>UP</span>
          </div>
          <p style={{ fontSize: "clamp(12px, 1.1vw, 16px)", color: "#97A2C2", lineHeight: 1.2 }}>Step 02 of 03</p>
        </div>

        <div className="flex flex-1 flex-col" style={{ padding: "4vh 4vw 4vh" }}>
          <h1 style={{ fontSize: "clamp(24px, 2.4vw, 36px)", color: "#0E1117", lineHeight: 1.1, margin: "0 0 clamp(20px, 3vh, 40px)", maxWidth: 602 }}>
            The information you share here will allow others to understand who is behind the profile and what makes you unique.
          </h1>

          <div className="flex flex-col" style={{ gap: 40, maxWidth: 499 }}>
            <div className="flex flex-col" style={{ gap: 20 }}>
              {/* Text inputs */}
              {([
                { key: "firstName", label: "First name", required: true },
                { key: "lastName", label: "Last name", required: true },
                { key: "mobile", label: "Mobile number", required: true, type: "tel" },
              ] as const).map((f) => (
                <div key={f.key} className="flex flex-col" style={{ gap: 10 }}>
                  <label className="text-base text-foreground">
                    {f.label}{f.required && <span style={{ color: "#FF676A" }}> *</span>}
                  </label>
                  <input
                    type={f.type || "text"}
                    placeholder="Type here..."
                    value={form[f.key]}
                    onChange={(e) => updateField(f.key, e.target.value)}
                    className="rounded-[10px] border border-[#F3F3F6] bg-white text-sm text-foreground outline-none placeholder:text-muted-foreground/30"
                    style={{ height: 40, padding: "0 14px" }}
                  />
                </div>
              ))}

              {/* Dropdowns */}
              <SelectField label="Area" options={areaOptions} value={form.area} onChange={(v) => updateField("area", v)} required placeholder="Select area..." />
              <SelectField label="Role" options={roleOptions} value={form.role} onChange={(v) => updateField("role", v)} placeholder="Select role..." />
              <SelectField label="Field of knowledge" options={fieldOptions} value={form.fieldOfKnowledge} onChange={(v) => updateField("fieldOfKnowledge", v)} placeholder="Select field..." />
            </div>

            {/* Resume section */}
            <div className="flex flex-col" style={{ gap: 14 }}>
              <h2 style={{ fontSize: "clamp(24px, 2.4vw, 36px)", color: "#0E1117", lineHeight: 1.1, margin: 0 }}>Uploading a resume</h2>
              <p className="text-base text-muted-foreground">Upload a resume or write a few words about yourself instead of a CV</p>

              <div className="flex flex-col items-start" style={{ gap: 10 }}>
                <p className="text-[22px] text-muted-foreground">Resume file</p>
                <input ref={resumeRef} type="file" accept=".pdf,.doc,.docx" onChange={handleResumeUpload} className="hidden" />
                {resumeFile ? (
                  <div className="flex items-center gap-2 rounded-[10px] border border-[#F3F3F6] bg-white px-3 py-2 text-sm text-foreground">
                    <span className="max-w-[150px] truncate">{resumeFile.name}</span>
                    <button onClick={() => setResumeFile(null)} className="cursor-pointer border-none bg-transparent text-muted-foreground hover:text-foreground">
                      <X size={14} />
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => resumeRef.current?.click()}
                    className="cursor-pointer rounded-[10px] border border-foreground bg-white text-sm text-foreground"
                    style={{ padding: "8px 12px", width: 184 }}
                  >
                    Add file +
                  </button>
                )}
              </div>
            </div>

            {/* About yourself */}
            <div className="flex flex-col" style={{ gap: 10 }}>
              <label className="text-base text-foreground">A few words about yourself</label>
              <textarea
                placeholder="Type here..."
                value={form.aboutYourself}
                onChange={(e) => updateField("aboutYourself", e.target.value)}
                className="resize-none rounded-[10px] border border-[#F3F3F6] bg-white text-sm text-foreground outline-none placeholder:text-muted-foreground/30"
                style={{ height: 111, padding: 14 }}
              />
            </div>

            {/* Privacy */}
            <div className="flex items-center" style={{ gap: 6 }}>
              <input type="checkbox" checked={agreedToPolicy} onChange={(e) => setAgreedToPolicy(e.target.checked)} className="shrink-0 cursor-pointer" style={{ width: 22, height: 22, accentColor: "#4C96FF" }} />
              <span className="text-sm text-foreground">I have read and agree to <u>the privacy policy.</u></span>
            </div>

            {/* Buttons */}
            <div className="flex items-center" style={{ gap: 20, paddingBottom: 40 }}>
              <button onClick={() => router.push("/profile/details")} className="flex cursor-pointer items-center justify-center text-white" style={{ width: 162, height: 40, borderRadius: 10, backgroundImage: "linear-gradient(168deg, #4C96FF 12%, #1667DB 94%)", border: "none", fontSize: 16 }}>
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
    </div>
  );
}
