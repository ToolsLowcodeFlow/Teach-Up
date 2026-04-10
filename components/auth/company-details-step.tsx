"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  companyDetailsSchema,
  type CompanyDetailsFormData,
} from "@/lib/validations/institution";
import { EMPLOYER_TYPES } from "@/lib/constants";
import Link from "next/link";
import { useLanguage } from "@/lib/i18n/context";
import { OnboardingSplitLayout } from "./onboarding-split-layout";
import { Checkbox } from "@/components/ui/checkbox";

interface CompanyDetailsStepProps {
  onSubmit: (data: CompanyDetailsFormData) => void;
  defaultValues?: Partial<CompanyDetailsFormData>;
}

export function CompanyDetailsStep({
  onSubmit,
  defaultValues,
}: CompanyDetailsStepProps) {
  const { t } = useLanguage();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isValid },
  } = useForm<CompanyDetailsFormData>({
    resolver: zodResolver(companyDetailsSchema),
    defaultValues: {
      company_name: defaultValues?.company_name ?? "",
      phone: defaultValues?.phone ?? "",
      number_of_employees: defaultValues?.number_of_employees ?? "",
      employer_type: defaultValues?.employer_type ?? "",
      privacy_accepted: defaultValues?.privacy_accepted ?? undefined,
    },
    mode: "onChange",
  });

  const privacyAccepted = watch("privacy_accepted");

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
    <OnboardingSplitLayout step={{ current: 2, total: 4 }}>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col justify-between" style={{ maxWidth: 520, height: "100%" }}>

        {/* Top — Title + Fields */}
        <div className="flex flex-col" style={{ gap: "clamp(20px, 3vh, 40px)" }}>

          {/* Title */}
          <h1 style={{ fontSize: "clamp(28px, 3vw, 42px)", color: "#0E1117", lineHeight: 1.1, margin: 0, fontFamily: "'Abel', sans-serif" }}>
            {t.companyDetails.title}
          </h1>

          {/* Form fields */}
          <div className="flex flex-col" style={{ gap: "clamp(14px, 1.8vh, 24px)" }}>

            {/* Company Name */}
            <div className="flex flex-col" style={{ gap: 6 }}>
              <label style={{ fontFamily: "'Abel', sans-serif", fontSize: "clamp(14px, 1.2vw, 18px)", color: "#414042", lineHeight: 1.1 }}>
                {t.companyDetails.companyName}
              </label>
              <input
                {...register("company_name")}
                placeholder="Type here..."
                className="placeholder:opacity-30 placeholder:text-[#647787]"
                style={{ ...inputStyle, borderColor: errors.company_name ? "#EF4444" : "#F3F3F6" }}
              />
            </div>

            {/* Phone */}
            <div className="flex flex-col" style={{ gap: 6 }}>
              <label style={{ fontFamily: "'Abel', sans-serif", fontSize: "clamp(14px, 1.2vw, 18px)", color: "#414042", lineHeight: 1.1 }}>
                {t.companyDetails.phone}
              </label>
              <input
                type="tel"
                {...register("phone")}
                placeholder="Type here..."
                className="placeholder:opacity-30 placeholder:text-[#647787]"
                style={{ ...inputStyle, borderColor: errors.phone ? "#EF4444" : "#F3F3F6" }}
              />
            </div>

            {/* Number of Employees */}
            <div className="flex flex-col" style={{ gap: 6 }}>
              <label style={{ fontFamily: "'Abel', sans-serif", fontSize: "clamp(14px, 1.2vw, 18px)", color: "#414042", lineHeight: 1.1 }}>
                {t.companyDetails.numberOfEmployees}
              </label>
              <input
                {...register("number_of_employees")}
                placeholder="Type here..."
                className="placeholder:opacity-30 placeholder:text-[#647787]"
                style={{ ...inputStyle, borderColor: errors.number_of_employees ? "#EF4444" : "#F3F3F6" }}
              />
            </div>

            {/* Employer Type — dropdown with chevron */}
            <div className="flex flex-col" style={{ gap: 6 }}>
              <label style={{ fontFamily: "'Abel', sans-serif", fontSize: "clamp(14px, 1.2vw, 18px)", color: "#414042", lineHeight: 1.1 }}>
                {t.companyDetails.employerType}
              </label>
              <div className="relative">
                <select
                  value={watch("employer_type")}
                  onChange={(e) => setValue("employer_type", e.target.value, { shouldValidate: true })}
                  style={{
                    ...inputStyle,
                    borderColor: errors.employer_type ? "#EF4444" : "#EAEBEB",
                    appearance: "none",
                    cursor: "pointer",
                    paddingInlineStart: 36,
                  }}
                >
                  <option value="">{t.companyDetails.choose}</option>
                  {EMPLOYER_TYPES.map((item) => (
                    <option key={item.value} value={item.value}>{item.label}</option>
                  ))}
                </select>
                {/* Chevron on start side */}
                <svg
                  width="10" height="6" viewBox="0 0 10 6" fill="none"
                  className="absolute top-1/2 -translate-y-1/2"
                  style={{ insetInlineStart: 14 }}
                >
                  <path d="M1 1L5 5L9 1" stroke="#647787" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>

            {/* Privacy checkbox */}
            <div className="flex items-center" style={{ gap: 10 }}>
              <label
                htmlFor="privacy"
                style={{ fontFamily: "'Abel', sans-serif", fontSize: "clamp(12px, 1vw, 14px)", color: "#647787", cursor: "pointer", lineHeight: 1.4 }}
              >
                {t.companyDetails.privacyCheckbox}{" "}
                <Link href="/privacy" style={{ color: "#4C96FF", textDecoration: "underline" }} target="_blank">
                  {t.companyDetails.privacyLink}
                </Link>
              </label>
              <Checkbox
                id="privacy"
                checked={privacyAccepted === true}
                onCheckedChange={(checked) =>
                  setValue("privacy_accepted", checked === true ? true : (undefined as unknown as true), { shouldValidate: true })
                }
              />
            </div>
          </div>
        </div>

        {/* Bottom — Buttons */}
        <div className="flex flex-col" style={{ gap: 10 }}>
          <div className="flex items-center" style={{ gap: 16 }}>
            <button
              type="submit"
              disabled={!isValid}
              className="flex items-center justify-center cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
              style={{
                width: 162, height: 40, borderRadius: 10,
                backgroundImage: "linear-gradient(168.47deg, rgb(76, 150, 255) 12.19%, rgb(22, 103, 219) 93.76%)",
                border: "none", fontSize: 16, color: "#FFFFFF", fontFamily: "'Abel', sans-serif",
              }}
            >
              continuation
            </button>
            <button
              type="button"
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
          {!isValid && (
            <p style={{ fontSize: 12, color: "#FF676A", fontFamily: "'Abel', sans-serif", lineHeight: 1.3, margin: 0 }}>
              {t.common.fillAllFields}
            </p>
          )}
        </div>
      </form>
    </OnboardingSplitLayout>
  );
}
