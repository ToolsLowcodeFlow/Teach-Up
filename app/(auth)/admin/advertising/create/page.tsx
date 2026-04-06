"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { ChevronDown, X } from "lucide-react";

const locationOptions = ["Upper banner", "Lower banner", "Sidebar", "Popup"];
const screenOptions = ["Home page", "Job search", "Profile", "Messages", "Contact us"];

export default function CreateBannerPage() {
  const router = useRouter();
  const fileRef = useRef<HTMLInputElement>(null);
  const [locationOpen, setLocationOpen] = useState(false);
  const [screenOpen, setScreenOpen] = useState(false);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [form, setForm] = useState({
    location: "", name: "", content: "", buttonText: "", referralLink: "", internalScreen: "",
  });

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadedFile(file);
      const reader = new FileReader();
      reader.onload = (ev) => setUploadedImage(ev.target?.result as string);
      reader.readAsDataURL(file);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex justify-end"
      style={{ fontFamily: "'Abel', sans-serif" }}
    >
      <iframe
        src="/admin/advertising"
        className="fixed inset-0 h-screen w-screen border-none"
        style={{ filter: "blur(6px)", pointerEvents: "none", opacity: 0.7 }}
        tabIndex={-1}
      />
      <div className="fixed inset-0 h-screen w-screen" style={{ background: "rgba(0,0,0,0.35)" }} onClick={() => router.back()} />

      {/* Side panel */}
      <div
        className="relative z-10 flex w-full max-w-[480px] flex-col overflow-y-auto rounded-2xl bg-white"
        style={{ padding: "28px 32px 40px", margin: "24px 24px 24px 0", boxShadow: "0 10px 50px rgba(0,0,0,0.15)", maxHeight: "calc(100vh - 48px)" }}
      >
        {/* Close button */}
        <button onClick={() => router.back()} className="absolute z-20 flex cursor-pointer items-center justify-center rounded-full border-none bg-white text-muted-foreground hover:text-foreground" style={{ top: 12, right: 12, width: 32, height: 32, boxShadow: "0 2px 6px rgba(0,0,0,0.1)" }}>
          <X size={16} />
        </button>

        {/* Header */}
        <div className="flex items-center justify-between" style={{ marginBottom: 28, paddingRight: 28 }}>
          <h1 className="text-[22px] leading-[1.1] text-foreground">Create a new banner</h1>
          <div className="flex items-center gap-3">
            <button
              onClick={() => router.back()}
              className="cursor-pointer rounded-lg text-sm text-white"
              style={{ padding: "8px 20px", border: "none", backgroundImage: "linear-gradient(168deg, #4C96FF 12%, #1667DB 94%)" }}
            >
              creation
            </button>
            <button
              onClick={() => router.back()}
              className="cursor-pointer rounded-lg border border-foreground bg-white text-sm text-foreground"
              style={{ padding: "8px 20px" }}
            >
              Cancellation
            </button>
          </div>
        </div>

        {/* Form */}
        <div className="flex flex-col" style={{ gap: 20 }}>
          {/* Banner location - dropdown */}
          <div className="relative flex flex-col gap-2">
            <label className="text-sm text-foreground">Banner location</label>
            <div onClick={() => setLocationOpen(!locationOpen)} className="flex cursor-pointer items-center justify-between rounded-lg border border-border-light bg-white" style={{ padding: "12px 14px" }}>
              <span className="text-sm" style={{ color: form.location ? "#0E1117" : "#647787" }}>{form.location || "choice"}</span>
              <ChevronDown size={14} className="text-muted-foreground" />
            </div>
            {locationOpen && (
              <>
                <div className="fixed inset-0 z-10" onClick={() => setLocationOpen(false)} />
                <div className="absolute left-0 top-full z-20 mt-1 w-full overflow-hidden rounded-lg border border-border-light bg-white shadow-lg">
                  {locationOptions.map((opt) => (
                    <div key={opt} onClick={() => { setForm({ ...form, location: opt }); setLocationOpen(false); }} className="cursor-pointer text-sm hover:bg-[#F7F9FC]"
                    style={{ padding: "14px 20px", color: "#0E1117" }} style={{ background: form.location === opt ? "#EEF4FD" : undefined }}>
                      {opt}
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Banner name */}
          <div className="flex flex-col gap-2">
            <label className="text-sm text-foreground">Banner name (not displayed)</label>
            <input type="text" placeholder="Type here..." value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full rounded-lg border border-border-light bg-white text-sm text-foreground outline-none placeholder:text-muted-foreground/30" style={{ padding: "12px 14px" }} />
          </div>

          {/* Banner content */}
          <div className="flex flex-col gap-2">
            <label className="text-sm text-foreground">Banner content</label>
            <textarea placeholder="Type here..." value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value.slice(0, 40) })} className="w-full resize-none rounded-lg border border-border-light bg-white text-sm text-foreground outline-none placeholder:text-muted-foreground/30" style={{ padding: "12px 14px", height: 60 }} />
            <span className="text-xs text-red-400">Limited to 40 characters ({form.content.length}/40)</span>
          </div>

          {/* Button text */}
          <div className="flex flex-col gap-2">
            <label className="text-sm text-foreground">Button text (optional)</label>
            <input type="text" placeholder="Type here..." value={form.buttonText} onChange={(e) => setForm({ ...form, buttonText: e.target.value })} className="w-full rounded-lg border border-border-light bg-white text-sm text-foreground outline-none placeholder:text-muted-foreground/30" style={{ padding: "12px 14px" }} />
          </div>

          {/* Third-party referral link */}
          <div className="flex flex-col gap-2">
            <label className="text-sm text-foreground">Third-party referral link (optional)</label>
            <input type="text" placeholder="Type here..." value={form.referralLink} onChange={(e) => setForm({ ...form, referralLink: e.target.value })} className="w-full rounded-lg border border-border-light bg-white text-sm text-foreground outline-none placeholder:text-muted-foreground/30" style={{ padding: "12px 14px" }} />
          </div>

          {/* Button switch to internal screen - dropdown */}
          <div className="relative flex flex-col gap-2">
            <label className="text-sm text-foreground">Button switch to internal screen (optional)</label>
            <div onClick={() => setScreenOpen(!screenOpen)} className="flex cursor-pointer items-center justify-between rounded-lg border border-border-light bg-white" style={{ padding: "12px 14px" }}>
              <span className="text-sm" style={{ color: form.internalScreen ? "#0E1117" : "#647787" }}>{form.internalScreen || "choice"}</span>
              <ChevronDown size={14} className="text-muted-foreground" />
            </div>
            {screenOpen && (
              <>
                <div className="fixed inset-0 z-10" onClick={() => setScreenOpen(false)} />
                <div className="absolute left-0 top-full z-20 mt-1 w-full overflow-hidden rounded-lg border border-border-light bg-white shadow-lg">
                  {screenOptions.map((opt) => (
                    <div key={opt} onClick={() => { setForm({ ...form, internalScreen: opt }); setScreenOpen(false); }} className="cursor-pointer text-sm hover:bg-[#F7F9FC]"
                    style={{ padding: "14px 20px", color: "#0E1117" }} style={{ background: form.internalScreen === opt ? "#EEF4FD" : undefined }}>
                      {opt}
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Background image */}
          <div className="flex flex-col gap-3">
            <label className="text-sm text-foreground">Choosing a background image for a banner</label>
            <input ref={fileRef} type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />

            {uploadedImage ? (
              <div className="relative">
                <div className="h-24 w-full overflow-hidden rounded-xl">
                  <img src={uploadedImage} alt="Uploaded" className="h-full w-full object-cover" />
                </div>
                <button onClick={() => { setUploadedImage(null); setUploadedFile(null); }} className="absolute right-2 top-2 flex h-6 w-6 cursor-pointer items-center justify-center rounded-full border-none bg-white/80 text-foreground">
                  <X size={14} />
                </button>
                <span className="mt-1 text-xs text-muted-foreground">{uploadedFile?.name}</span>
              </div>
            ) : (
              <button onClick={() => fileRef.current?.click()} className="cursor-pointer self-start rounded-lg border border-foreground bg-white text-sm text-foreground" style={{ padding: "8px 20px" }}>
                Upload a background image for the banner +
              </button>
            )}

            <span className="cursor-pointer text-sm text-primary underline">Selecting an existing background</span>
          </div>

          {/* Preview banners */}
          <div className="flex flex-col gap-3" style={{ marginTop: 8 }}>
            <div className="h-24 w-full overflow-hidden rounded-xl">
              <img src="/images/banner-1.jpg" alt="Banner preview" className="h-full w-full object-cover" />
            </div>
            <div className="h-24 w-full overflow-hidden rounded-xl">
              <img src="/images/banner-2.jpg" alt="Banner preview" className="h-full w-full object-cover" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
