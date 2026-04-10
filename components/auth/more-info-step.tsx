"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Upload, Plus, ImageIcon } from "lucide-react";
import { moreInfoSchema, type MoreInfoFormData } from "@/lib/validations/institution";
import { useLanguage } from "@/lib/i18n/context";
import { OnboardingSplitLayout } from "./onboarding-split-layout";

interface MoreInfoStepProps {
  onSubmit: (data: MoreInfoFormData) => void;
  onBack?: () => void;
  onSkip: () => void;
  defaultValues?: Partial<MoreInfoFormData>;
}

export function MoreInfoStep({ onSubmit, onBack, onSkip, defaultValues }: MoreInfoStepProps) {
  const { t } = useLanguage();
  const [logoPreview, setLogoPreview] = useState<string | null>(defaultValues?.company_logo_url ?? null);
  const [socialLinks, setSocialLinks] = useState<string[]>(defaultValues?.social_media_links ?? [""]);

  const { register, handleSubmit, setValue, watch } = useForm<MoreInfoFormData>({
    resolver: zodResolver(moreInfoSchema),
    mode: "onChange",
    defaultValues: {
      company_logo_url: defaultValues?.company_logo_url ?? "",
      website: defaultValues?.website ?? "",
      social_media_links: defaultValues?.social_media_links ?? [],
      description: defaultValues?.description ?? "",
    },
  });

  const watchedWebsite = watch("website");
  const watchedDescription = watch("description");
  const isFormValid = !!(logoPreview && watchedWebsite?.trim() && watchedDescription?.trim() && socialLinks.some((l) => l.trim() !== ""));

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const url = reader.result as string;
        setLogoPreview(url);
        setValue("company_logo_url", url);
      };
      reader.readAsDataURL(file);
    }
  };

  const addSocialLink = () => setSocialLinks([...socialLinks, ""]);
  const updateSocialLink = (index: number, value: string) => {
    const updated = [...socialLinks];
    updated[index] = value;
    setSocialLinks(updated);
    setValue("social_media_links", updated.filter((l) => l.trim() !== ""));
  };

  const onFormSubmit = (data: MoreInfoFormData) => {
    data.social_media_links = socialLinks.filter((l) => l.trim() !== "");
    onSubmit(data);
  };

  const inputStyle: React.CSSProperties = {
    width: "100%",
    height: "clamp(40px, 4vh, 48px)",
    borderRadius: 10,
    padding: "0 20px",
    border: "1px solid #F3F3F6",
    background: "#FFFFFF",
    outline: "none",
    fontFamily: "'Abel', sans-serif",
    fontSize: "clamp(13px, 1vw, 14px)",
    color: "#0E1117",
  };

  return (
    <OnboardingSplitLayout step={{ current: 3, total: 4 }}>
      <form onSubmit={handleSubmit(onFormSubmit)} className="flex flex-col justify-between" style={{ maxWidth: 520, height: "100%" }}>

        {/* Top — Title + Fields */}
        <div className="flex flex-col" style={{ gap: "clamp(8px, 1.3vh, 24px)" }}>

          {/* Title + Subtitle */}
          <div className="flex flex-col" style={{ gap: 8 }}>
            <h1 style={{ fontSize: "clamp(26px, 2.8vw, 40px)", color: "#0E1117", lineHeight: 1.1, margin: 0, fontFamily: "'Abel', sans-serif" }}>
              {t.moreInfo.title}
            </h1>
            <p style={{ fontSize: "clamp(12px, 0.9vw, 14px)", color: "#647787", lineHeight: 1.4, margin: 0, fontFamily: "'Abel', sans-serif" }}>
              {t.moreInfo.subtitle}
            </p>
          </div>

          {/* Company Logo */}
          <div className="flex flex-col" style={{ gap: 6 }}>
            <label style={{ fontFamily: "'Abel', sans-serif", fontSize: "clamp(14px, 1.2vw, 18px)", color: "#414042", lineHeight: 1.1 }}>
              {t.moreInfo.companyLogo}
            </label>
            <div className="flex flex-col items-center" style={{ gap: 8 }}>
              <div
                className="flex flex-col items-center justify-center"
                style={{ width: 110, height: "clamp(60px, 8vh, 100px)", borderRadius: 10, border: "1.5px dashed #D1D5DB", background: "#FAFBFC" }}
              >
                {logoPreview ? (
                  <img src={logoPreview} alt="Logo" style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: 10 }} />
                ) : (
                  <>
                    <ImageIcon size={24} style={{ color: "#D1D5DB" }} />
                    <span style={{ fontSize: 11, color: "#9CA3AF", marginTop: 4, fontFamily: "'Abel', sans-serif" }}>290X288</span>
                  </>
                )}
              </div>
              <label className="cursor-pointer">
                <span
                  className="flex items-center justify-center"
                  style={{ height: 32, padding: "0 16px", borderRadius: 8, border: "1px solid #EAEBEB", background: "#FFFFFF", fontFamily: "'Abel', sans-serif", fontSize: 13, color: "#414042" }}
                >
                  {t.moreInfo.changeImage}
                </span>
                <input type="file" accept="image/*" className="hidden" onChange={handleLogoUpload} />
              </label>
            </div>
          </div>

          {/* Company Website */}
          <div className="flex flex-col" style={{ gap: 6 }}>
            <label style={{ fontFamily: "'Abel', sans-serif", fontSize: "clamp(14px, 1.2vw, 18px)", color: "#414042", lineHeight: 1.1 }}>
              {t.moreInfo.companyWebsite}
            </label>
            <input
              type="url"
              {...register("website")}
              placeholder="Type here..."
              className="placeholder:opacity-30 placeholder:text-[#647787]"
              style={inputStyle}
            />
          </div>

          {/* Social Media Links */}
          <div className="flex flex-col" style={{ gap: 6 }}>
            <label style={{ fontFamily: "'Abel', sans-serif", fontSize: "clamp(14px, 1.2vw, 18px)", color: "#414042", lineHeight: 1.1 }}>
              {t.moreInfo.socialMediaLinks}
            </label>
            <div className="flex flex-col" style={{ gap: 8 }}>
              {socialLinks.map((link, index) => (
                <input
                  key={index}
                  type="url"
                  value={link}
                  onChange={(e) => updateSocialLink(index, e.target.value)}
                  placeholder="Type here..."
                  className="placeholder:opacity-30 placeholder:text-[#647787]"
                  style={inputStyle}
                />
              ))}
            </div>
            <button
              type="button"
              onClick={addSocialLink}
              className="flex items-center cursor-pointer self-end"
              style={{ gap: 4, background: "none", border: "none", fontFamily: "'Abel', sans-serif", fontSize: 14, color: "#4C96FF", padding: 0 }}
            >
              Add another field <Plus size={14} />
            </button>
          </div>

          {/* Company Description */}
          <div className="flex flex-col" style={{ gap: 6 }}>
            <label style={{ fontFamily: "'Abel', sans-serif", fontSize: "clamp(14px, 1.2vw, 18px)", color: "#414042", lineHeight: 1.1 }}>
              {t.moreInfo.companyDescription}
            </label>
            <textarea
              {...register("description")}
              placeholder="Type here..."
              className="placeholder:opacity-30 placeholder:text-[#647787]"
              style={{
                width: "100%",
                height: "clamp(60px, 8vh, 120px)",
                borderRadius: 10,
                padding: "12px 20px",
                border: "1px solid #F3F3F6",
                background: "#FFFFFF",
                outline: "none",
                fontFamily: "'Abel', sans-serif",
                fontSize: "clamp(13px, 1vw, 14px)",
                color: "#0E1117",
                resize: "none",
              }}
            />
          </div>
        </div>

        {/* Bottom — Buttons */}
        <div className="flex flex-col shrink-0" style={{ gap: 8, paddingTop: "clamp(8px, 1vh, 16px)" }}>
          <div className="flex items-center" style={{ gap: 16 }}>
            <button
              type="submit"
              disabled={!isFormValid}
              className="flex items-center justify-center disabled:cursor-not-allowed"
              style={{
                width: 162, height: 40, borderRadius: 10,
                backgroundImage: "linear-gradient(168.47deg, rgb(76, 150, 255) 12.19%, rgb(22, 103, 219) 93.76%)",
                border: "none", fontSize: 16, color: "#FFFFFF", fontFamily: "'Abel', sans-serif",
                cursor: isFormValid ? "pointer" : "not-allowed",
                opacity: isFormValid ? 1 : 0.4,
              }}
            >
              continuation
            </button>
            <button
              type="button"
              onClick={onBack}
              className="flex items-center justify-center cursor-pointer"
              style={{
                width: 140, height: 40, borderRadius: 10,
                background: "#FFFFFF", border: "1px solid #EAEBEB",
                fontSize: 16, color: "#647787", fontFamily: "'Abel', sans-serif",
              }}
            >
              return
            </button>
          </div>
          {!isFormValid && (
            <p style={{ fontSize: 12, color: "#FF676A", fontFamily: "'Abel', sans-serif", lineHeight: 1.3, margin: 0 }}>
              {t.common.fillAllFields}
            </p>
          )}
        </div>
      </form>
    </OnboardingSplitLayout>
  );
}
