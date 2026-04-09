"use client";

import { useState, useRef } from "react";
import { Eye, EyeOff, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/lib/i18n/context";

type ProfileTab = "company" | "more" | "supplier";

export default function ProfilePage() {
  const { t, locale } = useLanguage();
  const isHe = locale === "he";
  const [activeTab, setActiveTab] = useState<ProfileTab>("company");
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showVerify, setShowVerify] = useState(false);
  const [companyLogo, setCompanyLogo] = useState("/images/avatar-woman.jpg");
  const [saved, setSaved] = useState(false);
  const [socialLinks, setSocialLinks] = useState([""]);
  const [services, setServices] = useState([{ name: "Lorem Ipsum", description: "Lorem Ipsum" }]);
  const [supplierImages, setSupplierImages] = useState<string[]>(["/images/avatar-woman.jpg"]);
  const [employerType, setEmployerType] = useState("");
  const [employerTypeOpen, setEmployerTypeOpen] = useState(false);
  const [areasOpen, setAreasOpen] = useState(false);
  const [areasValue, setAreasValue] = useState("");
  const [ageGroupOpen, setAgeGroupOpen] = useState(false);
  const [ageGroupValue, setAgeGroupValue] = useState("");
  const [serviceTypeOpen, setServiceTypeOpen] = useState(false);
  const [serviceTypeValue, setServiceTypeValue] = useState("");
  const logoRef = useRef<HTMLInputElement>(null);
  const supplierFileRef = useRef<HTMLInputElement>(null);

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => setCompanyLogo(ev.target?.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleSupplierImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => setSupplierImages((prev) => [...prev, ev.target?.result as string]);
      reader.readAsDataURL(file);
    }
    e.target.value = "";
  };

  const employerTypes = isHe ? ["מכללה", "אוניברסיטה", "בית ספר", "ארגון", "אחר"] : ["College", "University", "School", "Organization", "Other"];
  const areaOptions = isHe ? ["תל אביב", "ירושלים", "חיפה", "באר שבע", "נתניה"] : ["Tel Aviv", "Jerusalem", "Haifa", "Be'er Sheva", "Netanya"];
  const ageGroupOptions = isHe ? ["ילדים", "נוער", "מבוגרים", "כל הגילאים"] : ["Children", "Youth", "Adults", "All Ages"];
  const serviceTypeOptions = isHe ? ["הוראה", "הדרכה", "ייעוץ", "אחר"] : ["Teaching", "Training", "Consulting", "Other"];

  const tabs: { key: ProfileTab; label: string }[] = [
    { key: "company", label: t.profile.companyDetails },
    { key: "more", label: t.profile.moreInformation },
    { key: "supplier", label: t.profile.supplierDatabase },
  ];

  return (
    <div style={{ padding: "24px 40px 64px" }} className="w-full">
      <div style={{ padding: "36px 40px 40px" }} className="rounded-2xl bg-white">
      {/* Title */}
      <h1 style={{ marginBottom: 20 }} className="text-[28px] leading-tight text-foreground xl:text-[32px]">
        {t.profile.title}
      </h1>

      {/* Tabs */}
      <div style={{ marginBottom: 32, padding: "6px" }} className="inline-flex items-center gap-1.5 rounded-xl bg-[#F7F9FC]">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            style={{ padding: "12px 40px" }}
            className={cn(
              "rounded-xl text-sm transition-colors",
              activeTab === tab.key
                ? "bg-primary text-white"
                : "text-foreground hover:bg-gray-200"
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content */}
      {activeTab === "company" && (
      <div className="flex flex-col gap-8 lg:flex-row lg:gap-8">
        {/* Left: Company details */}
        <div className="flex-1">
          {/* Company logo */}
          <h2 style={{ marginBottom: 16 }} className="text-xl text-primary">
            {t.profile.companyLogo}
          </h2>
          <div style={{ marginBottom: 28 }} className="flex items-center gap-4">
            <div className="h-28 w-28 shrink-0 overflow-hidden rounded-xl bg-muted-foreground/20">
              <img src={companyLogo} alt="Company logo" className="h-full w-full object-cover" />
            </div>
            <input ref={logoRef} type="file" accept="image/*" onChange={handleLogoUpload} className="hidden" />
            <button
              onClick={() => logoRef.current?.click()}
              style={{ padding: "8px 20px" }}
              className="cursor-pointer rounded-lg border border-border-light text-sm text-foreground transition-colors hover:bg-gray-50"
            >
              {t.profile.changeImage}
            </button>
          </div>

          <div className="flex flex-col gap-5">
            {/* Company name */}
            <div className="flex flex-col gap-2">
              <label className="text-sm text-foreground">{t.profile.companyName}</label>
              <input
                type="text"
                defaultValue="May"
                style={{ padding: "14px 16px" }}
                className="w-full rounded-lg border border-border bg-[#F7F9FC] text-sm text-foreground focus:border-primary/30 focus:bg-white focus:outline-none"
              />
            </div>

            {/* Phone */}
            <div className="flex flex-col gap-2">
              <label className="text-sm text-foreground">{t.profile.phone}</label>
              <input
                type="text"
                defaultValue="0527083931"
                style={{ padding: "14px 16px" }}
                className="w-full rounded-lg border border-border bg-[#F7F9FC] text-sm text-foreground focus:border-primary/30 focus:bg-white focus:outline-none"
              />
            </div>

            {/* Number of employees */}
            <div className="flex flex-col gap-2">
              <label className="text-sm text-foreground">{t.profile.numberOfEmployees}</label>
              <input
                type="text"
                defaultValue="589385983859835"
                style={{ padding: "14px 16px" }}
                className="w-full rounded-lg border border-border bg-[#F7F9FC] text-sm text-foreground focus:border-primary/30 focus:bg-white focus:outline-none"
              />
            </div>

            {/* Employer type */}
            <div className="relative flex flex-col gap-2">
              <label className="text-sm text-foreground">{t.profile.employerType}</label>
              <button
                onClick={() => setEmployerTypeOpen(!employerTypeOpen)}
                style={{ padding: "14px 16px" }}
                className="flex w-full cursor-pointer items-center justify-between rounded-lg border border-border bg-[#F7F9FC] text-sm"
              >
                <span style={{ color: employerType ? "#0E1117" : "#647787" }}>{employerType || (isHe ? "בחירה" : "choice")}</span>
                <ChevronDown className="h-4 w-4 text-muted-foreground" />
              </button>
              {employerTypeOpen && (
                <>
                  <div className="fixed inset-0 z-10" onClick={() => setEmployerTypeOpen(false)} />
                  <div className="absolute left-0 top-full z-20 mt-1 w-full overflow-hidden rounded-lg border border-border-light bg-white shadow-lg" style={{ padding: "6px 6px" }}>
                    {employerTypes.map((opt) => (
                      <div key={opt} onClick={() => { setEmployerType(opt); setEmployerTypeOpen(false); }} className="cursor-pointer px-4 py-2.5 text-sm text-foreground hover:bg-[#F7F9FC]" style={{ background: employerType === opt ? "#EEF4FD" : undefined }}>{opt}</div>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Right: Change password */}
        <div className="self-start lg:w-96">
          <h2 style={{ marginBottom: 20 }} className="text-xl text-primary">
            {t.profile.changePassword}
          </h2>

          <div className="flex flex-col gap-5">
            {/* Current password */}
            <div className="flex flex-col gap-2">
              <label className="text-sm text-foreground">{t.profile.currentPassword}</label>
              <div className="relative">
                <input
                  type={showCurrent ? "text" : "password"}
                  placeholder={t.createJob.typePlaceholder}
                  style={{ padding: "14px 40px 14px 16px" }}
                  className="w-full rounded-lg border border-border bg-[#F7F9FC] text-sm text-foreground placeholder:text-muted-foreground/40 focus:border-primary/30 focus:bg-white focus:outline-none"
                />
                <button
                  onClick={() => setShowCurrent(!showCurrent)}
                  className="absolute inset-y-0 inset-e-3 flex items-center text-muted-foreground"
                >
                  {showCurrent ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            {/* New password */}
            <div className="flex flex-col gap-2">
              <label className="text-sm text-foreground">{t.profile.newPassword}</label>
              <div className="relative">
                <input
                  type={showNew ? "text" : "password"}
                  placeholder={t.createJob.typePlaceholder}
                  style={{ padding: "14px 40px 14px 16px" }}
                  className="w-full rounded-lg border border-border bg-[#F7F9FC] text-sm text-foreground placeholder:text-muted-foreground/40 focus:border-primary/30 focus:bg-white focus:outline-none"
                />
                <button
                  onClick={() => setShowNew(!showNew)}
                  className="absolute inset-y-0 inset-e-3 flex items-center text-muted-foreground"
                >
                  {showNew ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            {/* Verify new password */}
            <div className="flex flex-col gap-2">
              <label className="text-sm text-foreground">{t.profile.verifyNewPassword}</label>
              <div className="relative">
                <input
                  type={showVerify ? "text" : "password"}
                  placeholder={t.createJob.typePlaceholder}
                  style={{ padding: "14px 40px 14px 16px" }}
                  className="w-full rounded-lg border border-border bg-[#F7F9FC] text-sm text-foreground placeholder:text-muted-foreground/40 focus:border-primary/30 focus:bg-white focus:outline-none"
                />
                <button
                  onClick={() => setShowVerify(!showVerify)}
                  className="absolute inset-y-0 inset-e-3 flex items-center text-muted-foreground"
                >
                  {showVerify ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      )}

      {/* More information tab */}
      {activeTab === "more" && (
      <div className="flex flex-col gap-5 lg:max-w-lg">
        {/* Company website */}
        <div className="flex flex-col gap-2">
          <label className="text-sm text-foreground">{t.profile.companyWebsite}</label>
          <input
            type="text"
            defaultValue="www.cnjvnkcv.co.il"
            style={{ padding: "14px 16px" }}
            className="w-full rounded-lg border border-border bg-[#F7F9FC] text-sm text-foreground focus:border-primary/30 focus:bg-white focus:outline-none"
          />
        </div>

        {/* Social media links */}
        <div className="flex flex-col gap-2">
          <label className="text-sm text-foreground">{t.profile.socialMediaLinks}</label>
          {socialLinks.map((link, i) => (
            <input
              key={i}
              type="text"
              value={link}
              onChange={(e) => setSocialLinks((prev) => prev.map((l, idx) => idx === i ? e.target.value : l))}
              placeholder={t.createJob.typePlaceholder}
              style={{ padding: "14px 16px" }}
              className="w-full rounded-lg border border-border bg-[#F7F9FC] text-sm text-foreground placeholder:text-muted-foreground/40 focus:border-primary/30 focus:bg-white focus:outline-none"
            />
          ))}
          <button onClick={() => setSocialLinks((prev) => [...prev, ""])} className="cursor-pointer self-end border-none bg-transparent text-sm text-primary underline transition-colors hover:text-primary-dark">
            {t.profile.addAnotherField}
          </button>
        </div>

        {/* Company description */}
        <div className="flex flex-col gap-2">
          <label className="text-sm text-foreground">{t.profile.companyDescription}</label>
          <textarea
            placeholder={t.createJob.typePlaceholder}
            rows={5}
            style={{ padding: "14px 16px" }}
            className="w-full resize-none rounded-lg border border-border bg-[#F7F9FC] text-sm text-foreground placeholder:text-muted-foreground/40 focus:border-primary/30 focus:bg-white focus:outline-none"
          />
        </div>
      </div>
      )}

      {/* Supplier database tab */}
      {activeTab === "supplier" && (
      <div className="flex flex-col gap-8 lg:flex-row lg:gap-12">
        {/* Left: Services details */}
        <div className="flex-1">
          <h2 style={{ marginBottom: 20 }} className="text-lg text-primary">
            {t.profile.servicesDetails}
          </h2>
          <div className="flex flex-col gap-5">
            {services.map((svc, i) => (
              <div key={i} className="flex flex-col gap-3">
                <div className="flex flex-col gap-2">
                  <label className="text-sm text-foreground">{t.profile.serviceName}</label>
                  <input
                    type="text"
                    value={svc.name}
                    onChange={(e) => setServices((prev) => prev.map((s, idx) => idx === i ? { ...s, name: e.target.value } : s))}
                    style={{ padding: "14px 16px" }}
                    className="w-full rounded-lg border border-border bg-[#F7F9FC] text-sm text-foreground focus:border-primary/30 focus:bg-white focus:outline-none"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-sm text-foreground">{t.profile.description}</label>
                  <input
                    type="text"
                    value={svc.description}
                    onChange={(e) => setServices((prev) => prev.map((s, idx) => idx === i ? { ...s, description: e.target.value } : s))}
                    style={{ padding: "14px 16px" }}
                    className="w-full rounded-lg border border-border bg-[#F7F9FC] text-sm text-foreground focus:border-primary/30 focus:bg-white focus:outline-none"
                  />
                </div>
                {services.length > 1 && (
                  <button onClick={() => setServices((prev) => prev.filter((_, idx) => idx !== i))} className="cursor-pointer self-start border-none bg-transparent text-xs text-red-400 underline">{isHe ? "הסר שירות" : "Remove service"}</button>
                )}
              </div>
            ))}
            <button onClick={() => setServices((prev) => [...prev, { name: "", description: "" }])} className="cursor-pointer self-start border-none bg-transparent text-sm text-primary underline transition-colors hover:text-primary-dark">
              {t.profile.addAnotherService}
            </button>
            <input ref={supplierFileRef} type="file" accept="image/*" onChange={handleSupplierImageUpload} className="hidden" />
            <button
              onClick={() => supplierFileRef.current?.click()}
              style={{ padding: "10px 20px" }}
              className="cursor-pointer self-start rounded-lg border border-border-light text-sm text-foreground transition-colors hover:bg-gray-50"
            >
              {t.profile.additionalUpload}
            </button>
            {/* Image previews */}
            <div className="flex flex-wrap gap-3">
              {supplierImages.map((img, i) => (
                <div key={i} className="relative w-40">
                  <div className="h-28 w-40 overflow-hidden rounded-lg bg-muted-foreground/20">
                    <img src={img} alt="Upload" className="h-full w-full object-cover" />
                  </div>
                  <button onClick={() => setSupplierImages((prev) => prev.filter((_, idx) => idx !== i))} className="absolute -bottom-2 -start-2 flex h-6 w-6 cursor-pointer items-center justify-center rounded-full border-none bg-danger text-white">
                    <span className="text-xs">&#x2715;</span>
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Areas + Contact details */}
        <div className="flex-1">
          <div className="flex flex-col gap-5">
            <div className="relative flex flex-col gap-2">
              <label className="text-sm text-foreground">{t.profile.areasOfActivity}</label>
              <button onClick={() => setAreasOpen(!areasOpen)} style={{ padding: "14px 16px" }} className="flex w-full cursor-pointer items-center justify-between rounded-lg border border-border bg-[#F7F9FC] text-sm">
                <span style={{ color: areasValue ? "#0E1117" : "#647787" }}>{areasValue || (isHe ? "בחירה" : "choice")}</span>
                <ChevronDown className="h-4 w-4 text-muted-foreground" />
              </button>
              {areasOpen && (
                <>
                  <div className="fixed inset-0 z-10" onClick={() => setAreasOpen(false)} />
                  <div className="absolute left-0 top-full z-20 mt-1 w-full overflow-hidden rounded-lg border border-border-light bg-white shadow-lg" style={{ padding: "6px 6px" }}>
                    {areaOptions.map((opt) => (
                      <div key={opt} onClick={() => { setAreasValue(opt); setAreasOpen(false); }} className="cursor-pointer px-4 py-2.5 text-sm text-foreground hover:bg-[#F7F9FC]" style={{ background: areasValue === opt ? "#EEF4FD" : undefined }}>{opt}</div>
                    ))}
                  </div>
                </>
              )}
            </div>

            <h3 style={{ marginTop: 8 }} className="text-lg text-primary">
              {t.profile.contactDetails}
            </h3>

            <div className="flex flex-col gap-2">
              <label className="text-sm text-foreground">{t.profile.contactName}</label>
              <input
                type="text"
                defaultValue="Lorem Ipsum"
                style={{ padding: "14px 16px" }}
                className="w-full rounded-lg border border-border bg-[#F7F9FC] text-sm text-foreground focus:border-primary/30 focus:bg-white focus:outline-none"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm text-foreground">{t.profile.phoneNumber}</label>
              <input
                type="text"
                defaultValue="Lorem Ipsum"
                style={{ padding: "14px 16px" }}
                className="w-full rounded-lg border border-border bg-[#F7F9FC] text-sm text-foreground focus:border-primary/30 focus:bg-white focus:outline-none"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm text-foreground">{t.profile.emailAddress}</label>
              <input
                type="text"
                defaultValue="Lorem Ipsum"
                style={{ padding: "14px 16px" }}
                className="w-full rounded-lg border border-border bg-[#F7F9FC] text-sm text-foreground focus:border-primary/30 focus:bg-white focus:outline-none"
              />
            </div>
            <div className="relative flex flex-col gap-2">
              <label className="text-sm text-foreground">{t.profile.ageGroups}</label>
              <button onClick={() => setAgeGroupOpen(!ageGroupOpen)} style={{ padding: "14px 16px" }} className="flex w-full cursor-pointer items-center justify-between rounded-lg border border-border bg-[#F7F9FC] text-sm">
                <span style={{ color: ageGroupValue ? "#0E1117" : "#647787" }}>{ageGroupValue || (isHe ? "בחירה" : "choice")}</span>
                <ChevronDown className="h-4 w-4 text-muted-foreground" />
              </button>
              {ageGroupOpen && (
                <>
                  <div className="fixed inset-0 z-10" onClick={() => setAgeGroupOpen(false)} />
                  <div className="absolute left-0 top-full z-20 mt-1 w-full overflow-hidden rounded-lg border border-border-light bg-white shadow-lg" style={{ padding: "6px 6px" }}>
                    {ageGroupOptions.map((opt) => (
                      <div key={opt} onClick={() => { setAgeGroupValue(opt); setAgeGroupOpen(false); }} className="cursor-pointer px-4 py-2.5 text-sm text-foreground hover:bg-[#F7F9FC]" style={{ background: ageGroupValue === opt ? "#EEF4FD" : undefined }}>{opt}</div>
                    ))}
                  </div>
                </>
              )}
            </div>
            <div className="relative flex flex-col gap-2">
              <label className="text-sm text-foreground">{t.profile.serviceType}</label>
              <button onClick={() => setServiceTypeOpen(!serviceTypeOpen)} style={{ padding: "14px 16px" }} className="flex w-full cursor-pointer items-center justify-between rounded-lg border border-border bg-[#F7F9FC] text-sm">
                <span style={{ color: serviceTypeValue ? "#0E1117" : "#647787" }}>{serviceTypeValue || (isHe ? "בחירה" : "choice")}</span>
                <ChevronDown className="h-4 w-4 text-muted-foreground" />
              </button>
              {serviceTypeOpen && (
                <>
                  <div className="fixed inset-0 z-10" onClick={() => setServiceTypeOpen(false)} />
                  <div className="absolute left-0 top-full z-20 mt-1 w-full overflow-hidden rounded-lg border border-border-light bg-white shadow-lg" style={{ padding: "6px 6px" }}>
                    {serviceTypeOptions.map((opt) => (
                      <div key={opt} onClick={() => { setServiceTypeValue(opt); setServiceTypeOpen(false); }} className="cursor-pointer px-4 py-2.5 text-sm text-foreground hover:bg-[#F7F9FC]" style={{ background: serviceTypeValue === opt ? "#EEF4FD" : undefined }}>{opt}</div>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
      )}

      {/* Footer buttons */}
      <div style={{ marginTop: 32 }} className="flex items-center justify-end gap-3">
        {saved && (
          <span className="text-sm text-success" style={{ marginRight: 12 }}>
            {isHe ? "השינויים נשמרו בהצלחה!" : "Changes saved successfully!"}
          </span>
        )}
        <button
          onClick={() => { setSaved(true); setTimeout(() => setSaved(false), 3000); }}
          style={{ padding: "10px 24px" }}
          className="cursor-pointer rounded-lg bg-primary text-sm text-white transition-colors hover:bg-primary-dark"
        >
          {t.profile.savingChanges}
        </button>
        <button
          onClick={() => window.location.reload()}
          style={{ padding: "10px 24px" }}
          className="cursor-pointer rounded-lg border border-foreground/30 text-sm text-foreground transition-colors hover:bg-gray-50"
        >
          {t.profile.cancelChanges}
        </button>
      </div>
      </div>
    </div>
  );
}
