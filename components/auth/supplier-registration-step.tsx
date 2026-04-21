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
import { OnboardingSplitLayout } from "./onboarding-split-layout";

interface SupplierRegistrationStepProps {
  onSubmit: (data: SupplierRegistrationFormData) => void;
  onBack: () => void;
  onSkip: () => void;
}

export function SupplierRegistrationStep({ onSubmit, onBack, onSkip }: SupplierRegistrationStepProps) {
  const { t } = useLanguage();
  const [serviceImages, setServiceImages] = useState<Record<number, string>>({});

  const { register, handleSubmit, control, setValue, watch } = useForm<SupplierRegistrationFormData>({
    resolver: zodResolver(supplierRegistrationSchema),
    defaultValues: {
      area_of_activity: "", contact_name: "", phone: "", email: "", age_group: "",
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

  const inputStyle: React.CSSProperties = {
    width: "100%", height: "clamp(36px, 3.5vh, 44px)", borderRadius: 10, padding: "0 20px",
    border: "1px solid #F3F3F6", background: "#FFFFFF", outline: "none",
    fontFamily: "'Heebo', sans-serif", fontSize: "clamp(12px, 1vw, 14px)", color: "#0E1117",
  };
  const selectStyle: React.CSSProperties = { ...inputStyle, appearance: "none" as const, cursor: "pointer", paddingInlineStart: 36 };
  const labelStyle: React.CSSProperties = { fontFamily: "'Heebo', sans-serif", fontSize: "clamp(13px, 1.1vw, 16px)", color: "#414042", lineHeight: 1.1 };

  return (
    <OnboardingSplitLayout step={{ current: 4, total: 4 }}>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col" style={{ maxWidth: 520, height: "100%" }}>

        {/* Top — Title + Fields (scrollable) */}
        <div className="flex-1 flex flex-col overflow-y-auto" style={{ gap: "clamp(6px, 1vh, 16px)", paddingBottom: 8, paddingRight: 12, scrollbarWidth: "thin", scrollbarColor: "#D1D5DB transparent" }}>

          {/* Title + Subtitle */}
          <div className="flex flex-col" style={{ gap: 6 }}>
            <h1 style={{ fontSize: "clamp(22px, 2.5vw, 36px)", color: "#0E1117", lineHeight: 1.1, margin: 0, fontFamily: "'Heebo', sans-serif" }}>
              {t.supplierRegistration.title}
            </h1>
            <p style={{ fontSize: "clamp(11px, 0.85vw, 13px)", color: "#647787", lineHeight: 1.4, margin: 0, fontFamily: "'Heebo', sans-serif" }}>
              {t.supplierRegistration.subtitle}
            </p>
          </div>

          {/* Area of Activity — dropdown */}
          <div className="flex flex-col" style={{ gap: 4 }}>
            <label style={labelStyle}>{t.supplierRegistration.areaOfActivity}</label>
            <div className="relative">
              <select
                value={watch("area_of_activity")}
                onChange={(e) => setValue("area_of_activity", e.target.value, { shouldValidate: true })}
                style={selectStyle}
              >
                <option value="">{t.supplierRegistration.choose}</option>
                {AREAS_OF_ACTIVITY.map((item) => (
                  <option key={item.value} value={item.value}>{item.label}</option>
                ))}
              </select>
              <svg width="10" height="6" viewBox="0 0 10 6" fill="none" className="absolute top-1/2 -translate-y-1/2" style={{ insetInlineStart: 14 }}>
                <path d="M1 1L5 5L9 1" stroke="#647787" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>

          {/* Contact Name */}
          <div className="flex flex-col" style={{ gap: 4 }}>
            <label style={labelStyle}>{t.supplierRegistration.contactName}</label>
            <input {...register("contact_name")} placeholder="Type here..." className="placeholder:opacity-30 placeholder:text-[#647787]" style={inputStyle} />
          </div>

          {/* Phone */}
          <div className="flex flex-col" style={{ gap: 4 }}>
            <label style={labelStyle}>{t.supplierRegistration.phoneNumber}</label>
            <input type="tel" {...register("phone")} placeholder="Type here..." className="placeholder:opacity-30 placeholder:text-[#647787]" style={inputStyle} />
          </div>

          {/* Email */}
          <div className="flex flex-col" style={{ gap: 4 }}>
            <label style={labelStyle}>{t.supplierRegistration.emailAddress}</label>
            <input type="email" {...register("email")} placeholder="Type here..." className="placeholder:opacity-30 placeholder:text-[#647787]" style={inputStyle} />
          </div>

          {/* Age Prices — dropdown */}
          <div className="flex flex-col" style={{ gap: 4 }}>
            <label style={labelStyle}>{t.supplierRegistration.agePrices}</label>
            <div className="relative">
              <select value={watch("age_group") ?? ""} onChange={(e) => setValue("age_group", e.target.value)} style={selectStyle}>
                <option value="">{t.supplierRegistration.choose}</option>
                <option value="children">Children</option>
                <option value="youth">Youth</option>
                <option value="adults">Adults</option>
                <option value="all">All Ages</option>
              </select>
              <svg width="10" height="6" viewBox="0 0 10 6" fill="none" className="absolute top-1/2 -translate-y-1/2" style={{ insetInlineStart: 14 }}>
                <path d="M1 1L5 5L9 1" stroke="#647787" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>

          {/* Services */}
          {fields.map((field, index) => (
            <div key={field.id} className="flex flex-col" style={{ gap: "clamp(4px, 0.8vh, 10px)", borderTop: index > 0 ? "1px solid #F3F3F6" : "none", paddingTop: index > 0 ? 8 : 0 }}>
              {/* Service Type — dropdown */}
              <div className="flex flex-col" style={{ gap: 4 }}>
                <label style={labelStyle}>{t.supplierRegistration.serviceType}</label>
                <div className="relative">
                  <select
                    value={watch(`services.${index}.service_type`)}
                    onChange={(e) => setValue(`services.${index}.service_type`, e.target.value, { shouldValidate: true })}
                    style={selectStyle}
                  >
                    <option value="">{t.supplierRegistration.choose}</option>
                    <option value="tutoring">Tutoring</option>
                    <option value="consulting">Consulting</option>
                    <option value="training">Training</option>
                    <option value="workshops">Workshops</option>
                    <option value="other">Other</option>
                  </select>
                  <svg width="10" height="6" viewBox="0 0 10 6" fill="none" className="absolute top-1/2 -translate-y-1/2" style={{ insetInlineStart: 14 }}>
                    <path d="M1 1L5 5L9 1" stroke="#647787" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </div>

              {/* Service Name */}
              <div className="flex flex-col" style={{ gap: 4 }}>
                <label style={labelStyle}>{t.supplierRegistration.serviceName}</label>
                <input {...register(`services.${index}.service_name`)} placeholder="Type here..." className="placeholder:opacity-30 placeholder:text-[#647787]" style={inputStyle} />
                <button type="button" style={{ background: "none", border: "none", fontFamily: "'Heebo', sans-serif", fontSize: 12, color: "#4C96FF", cursor: "pointer", padding: 0, alignSelf: "flex-end" }}>
                  {t.supplierRegistration.serviceDetails}
                </button>
              </div>

              {/* Description */}
              <div className="flex flex-col" style={{ gap: 4 }}>
                <label style={labelStyle}>{t.supplierRegistration.description}</label>
                <textarea
                  {...register(`services.${index}.description`)}
                  placeholder="Type here..."
                  className="placeholder:opacity-30 placeholder:text-[#647787]"
                  style={{ ...inputStyle, height: "clamp(50px, 6vh, 80px)", padding: "10px 20px", resize: "none" }}
                />
              </div>

              {/* Image upload + remove */}
              <div className="flex items-center justify-between">
                <label className="cursor-pointer flex items-center" style={{ gap: 4, fontFamily: "'Heebo', sans-serif", fontSize: 13, color: "#4C96FF" }}>
                  <Upload size={14} /> {t.supplierRegistration.addImageToPost}
                  <input type="file" accept="image/*" className="hidden" onChange={(e) => handleServiceImageUpload(index, e)} />
                </label>
                {serviceImages[index] && (
                  <img src={serviceImages[index]} alt="" style={{ width: 48, height: 36, borderRadius: 6, objectFit: "cover" }} />
                )}
                {fields.length > 1 && (
                  <button type="button" onClick={() => remove(index)} style={{ background: "none", border: "none", color: "#EF4444", cursor: "pointer", fontSize: 12, display: "flex", alignItems: "center", gap: 4 }}>
                    <Trash2 size={12} /> Remove
                  </button>
                )}
              </div>
            </div>
          ))}

          {/* Add another service */}
          <button
            type="button"
            onClick={() => append({ service_type: "", service_name: "", description: "", image_url: "" })}
            style={{ background: "none", border: "none", fontFamily: "'Heebo', sans-serif", fontSize: 14, color: "#4C96FF", cursor: "pointer", padding: 0, alignSelf: "flex-end", display: "flex", alignItems: "center", gap: 4 }}
          >
            Add another service <Plus size={14} />
          </button>
        </div>

        {/* Bottom — Buttons */}
        <div className="flex items-center shrink-0" style={{ gap: 16, paddingTop: "clamp(8px, 1vh, 16px)" }}>
          <button type="button" onClick={onSkip} style={{ background: "none", border: "none", fontFamily: "'Heebo', sans-serif", fontSize: 14, color: "#647787", cursor: "pointer" }}>
            {t.supplierRegistration.hopping}
          </button>
          <button
            type="submit"
            className="flex items-center justify-center cursor-pointer"
            style={{ width: 162, height: 40, borderRadius: 10, backgroundImage: "linear-gradient(168.47deg, rgb(76, 150, 255) 12.19%, rgb(22, 103, 219) 93.76%)", border: "none", fontSize: 16, color: "#FFFFFF", fontFamily: "'Heebo', sans-serif" }}
          >
            continuation
          </button>
          <button
            type="button"
            onClick={onSkip}
            className="flex items-center justify-center cursor-pointer"
            style={{ width: 140, height: 40, borderRadius: 10, background: "#FFFFFF", border: "1px solid #EAEBEB", fontSize: 16, color: "#647787", fontFamily: "'Heebo', sans-serif" }}
          >
            return
          </button>
        </div>
      </form>
    </OnboardingSplitLayout>
  );
}
