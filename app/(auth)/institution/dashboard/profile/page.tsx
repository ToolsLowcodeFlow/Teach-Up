"use client";

import { useState } from "react";
import { Eye, EyeOff, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/lib/i18n/context";

type ProfileTab = "company" | "more" | "supplier";

export default function ProfilePage() {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState<ProfileTab>("company");
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showVerify, setShowVerify] = useState(false);

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
              <img src="/images/avatar-woman.jpg" alt="Company logo" className="h-full w-full object-cover" />
            </div>
            <button
              style={{ padding: "8px 20px" }}
              className="rounded-lg border border-border-light text-sm text-foreground transition-colors hover:bg-gray-50"
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
            <div className="flex flex-col gap-2">
              <label className="text-sm text-foreground">{t.profile.employerType}</label>
              <button
                style={{ padding: "14px 16px" }}
                className="flex w-full items-center justify-between rounded-lg border border-border bg-[#F7F9FC] text-sm text-muted-foreground/60"
              >
                <span>{t.createJob.choicePlaceholder}</span>
                <ChevronDown className="h-4 w-4 text-muted-foreground" />
              </button>
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
          <input
            type="text"
            placeholder={t.createJob.typePlaceholder}
            style={{ padding: "14px 16px" }}
            className="w-full rounded-lg border border-border bg-[#F7F9FC] text-sm text-foreground placeholder:text-muted-foreground/40 focus:border-primary/30 focus:bg-white focus:outline-none"
          />
          <button className="self-end text-sm text-primary underline transition-colors hover:text-primary-dark">
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
            <div className="flex flex-col gap-2">
              <label className="text-sm text-foreground">{t.profile.serviceName}</label>
              <input
                type="text"
                defaultValue="Lorem Ipsum"
                style={{ padding: "14px 16px" }}
                className="w-full rounded-lg border border-border bg-[#F7F9FC] text-sm text-foreground focus:border-primary/30 focus:bg-white focus:outline-none"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm text-foreground">{t.profile.description}</label>
              <input
                type="text"
                defaultValue="Lorem Ipsum"
                style={{ padding: "14px 16px" }}
                className="w-full rounded-lg border border-border bg-[#F7F9FC] text-sm text-foreground focus:border-primary/30 focus:bg-white focus:outline-none"
              />
            </div>
            <button className="self-start text-sm text-primary underline transition-colors hover:text-primary-dark">
              {t.profile.addAnotherService}
            </button>
            <button
              style={{ padding: "10px 20px" }}
              className="self-start rounded-lg border border-border-light text-sm text-foreground transition-colors hover:bg-gray-50"
            >
              {t.profile.additionalUpload}
            </button>
            {/* Image preview */}
            <div className="relative w-40">
              <div className="h-28 w-40 overflow-hidden rounded-lg bg-muted-foreground/20">
                <img src="/images/avatar-woman.jpg" alt="Upload" className="h-full w-full object-cover" />
              </div>
              <button className="absolute -bottom-2 -start-2 flex h-6 w-6 items-center justify-center rounded-full bg-danger text-white">
                <span className="text-xs">&#x1F5D1;</span>
              </button>
            </div>
          </div>
        </div>

        {/* Right: Areas + Contact details */}
        <div className="flex-1">
          <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-2">
              <label className="text-sm text-foreground">{t.profile.areasOfActivity}</label>
              <button
                style={{ padding: "14px 16px" }}
                className="flex w-full items-center justify-between rounded-lg border border-border bg-[#F7F9FC] text-sm text-muted-foreground/60"
              >
                <span>{t.createJob.choicePlaceholder}</span>
                <ChevronDown className="h-4 w-4 text-muted-foreground" />
              </button>
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
            <div className="flex flex-col gap-2">
              <label className="text-sm text-foreground">{t.profile.ageGroups}</label>
              <button
                style={{ padding: "14px 16px" }}
                className="flex w-full items-center justify-between rounded-lg border border-border bg-[#F7F9FC] text-sm text-muted-foreground/60"
              >
                <span>{t.createJob.choicePlaceholder}</span>
                <ChevronDown className="h-4 w-4 text-muted-foreground" />
              </button>
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm text-foreground">{t.profile.serviceType}</label>
              <button
                style={{ padding: "14px 16px" }}
                className="flex w-full items-center justify-between rounded-lg border border-border bg-[#F7F9FC] text-sm text-muted-foreground/60"
              >
                <span>{t.createJob.choicePlaceholder}</span>
                <ChevronDown className="h-4 w-4 text-muted-foreground" />
              </button>
            </div>
          </div>
        </div>
      </div>
      )}

      {/* Footer buttons */}
      <div style={{ marginTop: 32 }} className="flex items-center justify-end gap-3">
        <button
          style={{ padding: "10px 24px" }}
          className="rounded-lg bg-primary text-sm text-white transition-colors hover:bg-primary-dark"
        >
          {t.profile.savingChanges}
        </button>
        <button
          style={{ padding: "10px 24px" }}
          className="rounded-lg border border-foreground/30 text-sm text-foreground transition-colors hover:bg-gray-50"
        >
          {t.profile.cancelChanges}
        </button>
      </div>
      </div>
    </div>
  );
}
