"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Upload, Plus, ImageIcon } from "lucide-react";
import { moreInfoSchema, type MoreInfoFormData } from "@/lib/validations/institution";
import { useLanguage } from "@/lib/i18n/context";
import { OnboardingLayout } from "./onboarding-layout";

interface MoreInfoStepProps {
  onSubmit: (data: MoreInfoFormData) => void;
  onBack?: () => void;
  onSkip: () => void;
  defaultValues?: Partial<MoreInfoFormData>;
}

export function MoreInfoStep({
  onSubmit,
  onSkip,
  defaultValues,
}: MoreInfoStepProps) {
  const { t } = useLanguage();
  const [logoPreview, setLogoPreview] = useState<string | null>(
    defaultValues?.company_logo_url ?? null
  );
  const [socialLinks, setSocialLinks] = useState<string[]>(
    defaultValues?.social_media_links ?? [""]
  );

  const { register, handleSubmit, setValue } = useForm<MoreInfoFormData>({
    resolver: zodResolver(moreInfoSchema),
    defaultValues: {
      company_logo_url: defaultValues?.company_logo_url ?? "",
      website: defaultValues?.website ?? "",
      social_media_links: defaultValues?.social_media_links ?? [],
      description: defaultValues?.description ?? "",
    },
  });

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

  const inputClass =
    "w-full h-[44px] rounded-lg border border-[#E5E7EB] bg-white px-4 text-[14px] text-[#1F2937] outline-none focus:border-[#4B7BF5] focus:ring-2 focus:ring-[#4B7BF5]/20 transition-colors";

  return (
    <OnboardingLayout step={{ current: 3, total: 4 }}>
      <h1 className="text-[24px] font-bold text-[#1F2937] text-center mb-2">
        {t.moreInfo.title}
      </h1>
      <p className="text-[13px] text-[#6B7280] text-center mb-10 leading-relaxed max-w-md mx-auto">
        {t.moreInfo.subtitle}
      </p>

      <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-6">
        {/* Company Logo */}
        <div>
          <label className="block text-[13px] text-[#6B7280] mb-2 text-end">
            {t.moreInfo.companyLogo}
          </label>
          <div className="flex flex-col items-center gap-3">
            <div className="w-24 h-24 rounded-lg border-2 border-dashed border-[#D1D5DB] flex items-center justify-center bg-[#F9FAFB] overflow-hidden">
              {logoPreview ? (
                <img src={logoPreview} alt="Logo" className="w-full h-full object-cover" />
              ) : (
                <ImageIcon className="w-8 h-8 text-[#D1D5DB]" />
              )}
            </div>
            <div className="text-[11px] text-[#9CA3AF]">290 X 288</div>
            <label className="cursor-pointer">
              <span className="inline-flex items-center gap-2 text-[13px] text-[#4B7BF5] border border-[#4B7BF5] rounded-lg px-4 py-2 hover:bg-[#F5F8FF] transition-colors">
                <Upload className="w-4 h-4" />
                {t.moreInfo.changeImage}
              </span>
              <input type="file" accept="image/*" className="hidden" onChange={handleLogoUpload} />
            </label>
          </div>
        </div>

        {/* Company Website */}
        <div>
          <label className="block text-[13px] text-[#6B7280] mb-2 text-end">
            {t.moreInfo.companyWebsite}
          </label>
          <input type="url" {...register("website")} className={inputClass} />
        </div>

        {/* Social Media Links */}
        <div>
          <label className="block text-[13px] text-[#6B7280] mb-2 text-end">
            {t.moreInfo.socialMediaLinks}
          </label>
          <div className="space-y-2">
            {socialLinks.map((link, index) => (
              <input
                key={index}
                type="url"
                value={link}
                onChange={(e) => updateSocialLink(index, e.target.value)}
                className={inputClass}
              />
            ))}
          </div>
          <button
            type="button"
            onClick={addSocialLink}
            className="mt-2 inline-flex items-center gap-1 text-[13px] text-[#4B7BF5] hover:text-[#3A62C4] transition-colors cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            {t.moreInfo.addAnotherLink}
          </button>
        </div>

        {/* Company Description */}
        <div>
          <label className="block text-[13px] text-[#6B7280] mb-2 text-end">
            {t.moreInfo.companyDescription}
          </label>
          <textarea
            rows={4}
            {...register("description")}
            className="w-full rounded-lg border border-[#E5E7EB] bg-white px-4 py-3 text-[14px] text-[#1F2937] outline-none focus:border-[#4B7BF5] focus:ring-2 focus:ring-[#4B7BF5]/20 transition-colors resize-none"
          />
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3 pt-6">
          <button
            type="submit"
            className="h-[44px] px-10 bg-[#4B7BF5] hover:bg-[#3A62C4] text-white text-[14px] font-medium rounded-lg transition-colors cursor-pointer"
          >
            {t.common.continue}
          </button>
          <button
            type="button"
            onClick={onSkip}
            className="h-[44px] px-10 border border-[#E5E7EB] text-[#6B7280] text-[14px] font-medium rounded-lg hover:bg-[#F9FAFB] transition-colors cursor-pointer"
          >
            {t.common.skip}
          </button>
        </div>
      </form>
    </OnboardingLayout>
  );
}
