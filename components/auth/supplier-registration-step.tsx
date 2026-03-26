"use client";

import { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus, Upload, Trash2 } from "lucide-react";
import {
  supplierRegistrationSchema,
  type SupplierRegistrationFormData,
} from "@/lib/validations/supplier";
import { AREAS_OF_ACTIVITY } from "@/lib/constants";
import { useLanguage } from "@/lib/i18n/context";
import { OnboardingLayout } from "./onboarding-layout";

interface SupplierRegistrationStepProps {
  onSubmit: (data: SupplierRegistrationFormData) => void;
  onBack: () => void;
  onSkip: () => void;
}

export function SupplierRegistrationStep({
  onSubmit,
  onBack,
  onSkip,
}: SupplierRegistrationStepProps) {
  const { t } = useLanguage();
  const [serviceImages, setServiceImages] = useState<Record<number, string>>({});

  const {
    register,
    handleSubmit,
    control,
    setValue,
    watch,
  } = useForm<SupplierRegistrationFormData>({
    resolver: zodResolver(supplierRegistrationSchema),
    defaultValues: {
      area_of_activity: "",
      contact_name: "",
      phone: "",
      email: "",
      age_group: "",
      services: [{ service_type: "", service_name: "", description: "", image_url: "" }],
    },
  });

  const { fields, append, remove } = useFieldArray({ control, name: "services" });

  const handleServiceImageUpload = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const url = reader.result as string;
        setServiceImages((prev) => ({ ...prev, [index]: url }));
        setValue(`services.${index}.image_url`, url);
      };
      reader.readAsDataURL(file);
    }
  };

  const inputClass =
    "w-full h-[44px] rounded-lg border border-[#E5E7EB] bg-white px-4 text-[14px] text-[#1F2937] outline-none focus:border-[#4B7BF5] focus:ring-2 focus:ring-[#4B7BF5]/20 transition-colors";
  const selectClass =
    "w-full h-[44px] rounded-lg border border-[#E5E7EB] bg-white px-4 text-[14px] text-[#1F2937] outline-none focus:border-[#4B7BF5] focus:ring-2 focus:ring-[#4B7BF5]/20 transition-colors appearance-none cursor-pointer";

  return (
    <OnboardingLayout step={{ current: 4, total: 4 }}>
      <h1 className="text-[24px] font-bold text-[#1F2937] text-center mb-2">
        {t.supplierRegistration.title}
      </h1>
      <p className="text-[13px] text-[#6B7280] text-center mb-10 leading-relaxed max-w-md mx-auto">
        {t.supplierRegistration.subtitle}
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <div>
          <label className="block text-[13px] text-[#6B7280] mb-2 text-end">
            {t.supplierRegistration.areaOfActivity}
          </label>
          <select
            value={watch("area_of_activity")}
            onChange={(e) => setValue("area_of_activity", e.target.value, { shouldValidate: true })}
            className={selectClass}
          >
            <option value="">{t.supplierRegistration.choose}</option>
            {AREAS_OF_ACTIVITY.map((item) => (
              <option key={item.value} value={item.value}>{item.label}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-[13px] text-[#6B7280] mb-2 text-end">
            {t.supplierRegistration.contactName}
          </label>
          <input {...register("contact_name")} className={inputClass} />
        </div>

        <div>
          <label className="block text-[13px] text-[#6B7280] mb-2 text-end">
            {t.supplierRegistration.phoneNumber}
          </label>
          <input type="tel" {...register("phone")} className={inputClass} />
        </div>

        <div>
          <label className="block text-[13px] text-[#6B7280] mb-2 text-end">
            {t.supplierRegistration.emailAddress}
          </label>
          <input type="email" {...register("email")} className={inputClass} />
        </div>

        <div>
          <label className="block text-[13px] text-[#6B7280] mb-2 text-end">
            {t.supplierRegistration.agePrices}
          </label>
          <select
            value={watch("age_group") ?? ""}
            onChange={(e) => setValue("age_group", e.target.value)}
            className={selectClass}
          >
            <option value="">{t.supplierRegistration.choose}</option>
            <option value="children">Children</option>
            <option value="youth">Youth</option>
            <option value="adults">Adults</option>
            <option value="all">All Ages</option>
          </select>
        </div>

        {/* Services */}
        {fields.map((field, index) => (
          <div key={field.id} className="space-y-5 border-t border-[#E5E7EB] pt-5">
            <div>
              <label className="block text-[13px] text-[#6B7280] mb-2 text-end">
                {t.supplierRegistration.serviceType}
              </label>
              <select
                value={watch(`services.${index}.service_type`)}
                onChange={(e) => setValue(`services.${index}.service_type`, e.target.value, { shouldValidate: true })}
                className={selectClass}
              >
                <option value="">{t.supplierRegistration.choose}</option>
                <option value="tutoring">Tutoring</option>
                <option value="consulting">Consulting</option>
                <option value="training">Training</option>
                <option value="workshops">Workshops</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div>
              <label className="block text-[13px] text-[#6B7280] mb-2 text-end">
                {t.supplierRegistration.serviceName}
              </label>
              <input {...register(`services.${index}.service_name`)} className={inputClass} />
              <button type="button" className="mt-1 text-[12px] text-[#4B7BF5] hover:underline cursor-pointer">
                {t.supplierRegistration.serviceDetails}
              </button>
            </div>

            <div>
              <label className="block text-[13px] text-[#6B7280] mb-2 text-end">
                {t.supplierRegistration.description}
              </label>
              <textarea
                rows={3}
                {...register(`services.${index}.description`)}
                className="w-full rounded-lg border border-[#E5E7EB] bg-white px-4 py-3 text-[14px] text-[#1F2937] outline-none focus:border-[#4B7BF5] focus:ring-2 focus:ring-[#4B7BF5]/20 transition-colors resize-none"
              />
            </div>

            <div>
              <label className="cursor-pointer">
                <span className="inline-flex items-center gap-2 text-[13px] text-[#4B7BF5] hover:text-[#3A62C4] transition-colors">
                  <Upload className="w-4 h-4" />
                  {t.supplierRegistration.addImageToPost}
                </span>
                <input type="file" accept="image/*" className="hidden" onChange={(e) => handleServiceImageUpload(index, e)} />
              </label>
              {serviceImages[index] && (
                <div className="mt-2 w-40 h-28 rounded-lg overflow-hidden border border-[#E5E7EB]">
                  <img src={serviceImages[index]} alt="Service" className="w-full h-full object-cover" />
                </div>
              )}
            </div>

            {fields.length > 1 && (
              <button type="button" onClick={() => remove(index)} className="inline-flex items-center gap-1 text-[13px] text-[#EF4444] hover:text-[#DC2626] cursor-pointer">
                <Trash2 className="w-4 h-4" />
                {t.supplierRegistration.removeService}
              </button>
            )}
          </div>
        ))}

        <button
          type="button"
          onClick={() => append({ service_type: "", service_name: "", description: "", image_url: "" })}
          className="inline-flex items-center gap-1 text-[13px] text-[#4B7BF5] hover:text-[#3A62C4] transition-colors cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          {t.supplierRegistration.addAnotherService}
        </button>

        {/* Actions */}
        <div className="flex items-center gap-3 pt-6">
          <button type="button" onClick={onBack} className="text-[13px] text-[#6B7280] hover:text-[#1F2937] cursor-pointer">
            {t.supplierRegistration.hopping}
          </button>
          <button type="submit" className="h-[44px] px-10 bg-[#4B7BF5] hover:bg-[#3A62C4] text-white text-[14px] font-medium rounded-lg transition-colors cursor-pointer">
            {t.common.continue}
          </button>
          <button type="button" onClick={onSkip} className="h-[44px] px-10 border border-[#E5E7EB] text-[#6B7280] text-[14px] font-medium rounded-lg hover:bg-[#F9FAFB] transition-colors cursor-pointer">
            {t.common.skip}
          </button>
        </div>
      </form>
    </OnboardingLayout>
  );
}
