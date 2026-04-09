"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { ChevronDown, X } from "lucide-react";
import { useLanguage } from "@/lib/i18n/context";

export default function CreateBannerPage() {
  const { t } = useLanguage();
  const locationOptions = [t.admin.upperBanner, t.admin.lowerBanner, t.admin.sidebarOption, t.admin.popupOption];
  const screenOptions = [t.admin.homePageOption, t.admin.jobSearchOption, t.admin.profileOption, t.admin.messagesOption, t.admin.contactUsOption];
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
      <div className="fixed inset-0" style={{ background: "rgba(0,0,0,0.4)", backdropFilter: "blur(8px)", WebkitBackdropFilter: "blur(8px)" }} onClick={() => router.back()} />

      {/* Side panel */}
      <div
        className="relative z-10 flex w-full max-w-[480px] flex-col rounded-2xl bg-white"
        style={{ margin: "24px 24px 24px 0", boxShadow: "0 10px 50px rgba(0,0,0,0.15)", maxHeight: "calc(100vh - 48px)" }}
      >
        {/* Close button */}
        <button onClick={() => router.back()} className="absolute z-20 flex cursor-pointer items-center justify-center rounded-full border-none bg-white text-muted-foreground hover:text-foreground" style={{ top: 12, right: 12, width: 32, height: 32, boxShadow: "0 2px 6px rgba(0,0,0,0.1)" }}>
          <X size={16} />
        </button>

        {/* Fixed Header */}
        <div className="flex shrink-0 items-center justify-between border-b border-border-light" style={{ padding: "28px 32px 20px", paddingRight: 60 }}>
          <h1 className="text-[22px] leading-[1.1] text-foreground">{t.admin.createNewBanner.replace(" +", "")}</h1>
          <div className="flex items-center gap-3">
            <button
              onClick={() => router.back()}
              className="cursor-pointer rounded-lg text-sm text-white"
              style={{ padding: "8px 20px", border: "none", backgroundImage: "linear-gradient(168deg, #4C96FF 12%, #1667DB 94%)" }}
            >
              {t.admin.creation}
            </button>
            <button
              onClick={() => router.back()}
              className="cursor-pointer rounded-lg border border-foreground bg-white text-sm text-foreground"
              style={{ padding: "8px 20px" }}
            >
              {t.admin.cancellation}
            </button>
          </div>
        </div>

        {/* Scrollable Form */}
        <div className="flex-1 overflow-y-auto" style={{ padding: "20px 32px 40px" }}>
        <div className="flex flex-col" style={{ gap: 20 }}>
          {/* {t.admin.bannerLocation} - dropdown */}
          <div className="relative flex flex-col gap-2">
            <label className="text-sm text-foreground">{t.admin.bannerLocation}</label>
            <div onClick={() => setLocationOpen(!locationOpen)} className="flex cursor-pointer items-center justify-between rounded-lg border border-border-light bg-white" style={{ padding: "12px 14px" }}>
              <span className="text-sm" style={{ color: form.location ? "#0E1117" : "#647787" }}>{form.location || t.admin.choice}</span>
              <ChevronDown size={14} className="text-muted-foreground" />
            </div>
            {locationOpen && (
              <>
                <div className="fixed inset-0 z-10" onClick={() => setLocationOpen(false)} />
                <div className="absolute left-0 top-full z-20 mt-1 w-full overflow-hidden rounded-lg border border-border-light bg-white shadow-lg">
                  {locationOptions.map((opt) => (
                    <div key={opt} onClick={() => { setForm({ ...form, location: opt }); setLocationOpen(false); }} className="cursor-pointer text-sm hover:bg-[#F7F9FC]"
                    style={{ padding: "14px 20px", color: "#0E1117", background: form.location === opt ? "#EEF4FD" : undefined }}>
                      {opt}
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Banner name */}
          <div className="flex flex-col gap-2">
            <label className="text-sm text-foreground">{t.admin.bannerNameNotDisplayed}</label>
            <input type="text" placeholder={t.admin.typeHere} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full rounded-lg border border-border-light bg-white text-sm text-foreground outline-none placeholder:text-muted-foreground/30" style={{ padding: "12px 14px" }} />
          </div>

          {/* Banner content */}
          <div className="flex flex-col gap-2">
            <label className="text-sm text-foreground">{t.admin.bannerContent}</label>
            <textarea placeholder={t.admin.typeHere} value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value.slice(0, 40) })} className="w-full resize-none rounded-lg border border-border-light bg-white text-sm text-foreground outline-none placeholder:text-muted-foreground/30" style={{ padding: "12px 14px", height: 60 }} />
            <span className="text-xs text-red-400">{t.admin.limitedTo40} ({form.content.length}/40)</span>
          </div>

          {/* Button text */}
          <div className="flex flex-col gap-2">
            <label className="text-sm text-foreground">{t.admin.buttonText}</label>
            <input type="text" placeholder={t.admin.typeHere} value={form.buttonText} onChange={(e) => setForm({ ...form, buttonText: e.target.value })} className="w-full rounded-lg border border-border-light bg-white text-sm text-foreground outline-none placeholder:text-muted-foreground/30" style={{ padding: "12px 14px" }} />
          </div>

          {/* Third-party referral link */}
          <div className="flex flex-col gap-2">
            <label className="text-sm text-foreground">{t.admin.referralLink}</label>
            <input type="text" placeholder={t.admin.typeHere} value={form.referralLink} onChange={(e) => setForm({ ...form, referralLink: e.target.value })} className="w-full rounded-lg border border-border-light bg-white text-sm text-foreground outline-none placeholder:text-muted-foreground/30" style={{ padding: "12px 14px" }} />
          </div>

          {/* Button switch to internal screen - dropdown */}
          <div className="relative flex flex-col gap-2">
            <label className="text-sm text-foreground">{t.admin.internalScreen}</label>
            <div onClick={() => setScreenOpen(!screenOpen)} className="flex cursor-pointer items-center justify-between rounded-lg border border-border-light bg-white" style={{ padding: "12px 14px" }}>
              <span className="text-sm" style={{ color: form.internalScreen ? "#0E1117" : "#647787" }}>{form.internalScreen || t.admin.choice}</span>
              <ChevronDown size={14} className="text-muted-foreground" />
            </div>
            {screenOpen && (
              <>
                <div className="fixed inset-0 z-10" onClick={() => setScreenOpen(false)} />
                <div className="absolute left-0 top-full z-20 mt-1 w-full overflow-hidden rounded-lg border border-border-light bg-white shadow-lg">
                  {screenOptions.map((opt) => (
                    <div key={opt} onClick={() => { setForm({ ...form, internalScreen: opt }); setScreenOpen(false); }} className="cursor-pointer text-sm hover:bg-[#F7F9FC]"
                    style={{ padding: "14px 20px", color: "#0E1117", background: form.internalScreen === opt ? "#EEF4FD" : undefined }}>
                      {opt}
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Background image */}
          <div className="flex flex-col gap-3">
            <label className="text-sm text-foreground">{t.admin.choosingBackground}</label>
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
                {t.admin.uploadBackground}
              </button>
            )}

            <span className="cursor-pointer text-sm text-primary underline">{t.admin.selectExisting}</span>
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
    </div>
  );
}
