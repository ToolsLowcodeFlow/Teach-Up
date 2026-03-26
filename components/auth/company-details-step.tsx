"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  companyDetailsSchema,
  type CompanyDetailsFormData,
} from "@/lib/validations/institution";
import { EMPLOYER_TYPES, NUMBER_OF_EMPLOYEES } from "@/lib/constants";
import { useLanguage } from "@/lib/i18n/context";
import { OnboardingLayout } from "./onboarding-layout";
import { Checkbox } from "@/components/ui/checkbox";
import Link from "next/link";

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

  const inputClass =
    "w-full h-[44px] rounded-lg border border-[#E5E7EB] bg-white px-4 text-[14px] text-[#1F2937] outline-none focus:border-[#4B7BF5] focus:ring-2 focus:ring-[#4B7BF5]/20 transition-colors";
  const selectClass =
    "w-full h-[44px] rounded-lg border border-[#E5E7EB] bg-white px-4 text-[14px] text-[#1F2937] outline-none focus:border-[#4B7BF5] focus:ring-2 focus:ring-[#4B7BF5]/20 transition-colors appearance-none cursor-pointer";

  return (
    <OnboardingLayout step={{ current: 2, total: 4 }}>
      <h1 className="text-[24px] font-bold text-[#1F2937] text-center mb-10">
        {t.companyDetails.title}
      </h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <label className="block text-[13px] text-[#6B7280] mb-2 text-end">
            {t.companyDetails.companyName}
          </label>
          <input
            {...register("company_name")}
            className={`${inputClass} ${errors.company_name ? "border-[#EF4444]" : ""}`}
          />
        </div>

        <div>
          <label className="block text-[13px] text-[#6B7280] mb-2 text-end">
            {t.companyDetails.phone}
          </label>
          <input
            type="tel"
            {...register("phone")}
            className={`${inputClass} ${errors.phone ? "border-[#EF4444]" : ""}`}
          />
        </div>

        <div>
          <label className="block text-[13px] text-[#6B7280] mb-2 text-end">
            {t.companyDetails.numberOfEmployees}
          </label>
          <select
            value={watch("number_of_employees")}
            onChange={(e) =>
              setValue("number_of_employees", e.target.value, { shouldValidate: true })
            }
            className={`${selectClass} ${errors.number_of_employees ? "border-[#EF4444]" : ""}`}
          >
            <option value="">{t.companyDetails.select}</option>
            {NUMBER_OF_EMPLOYEES.map((item) => (
              <option key={item.value} value={item.value}>
                {item.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-[13px] text-[#6B7280] mb-2 text-end">
            {t.companyDetails.employerType}
          </label>
          <select
            value={watch("employer_type")}
            onChange={(e) =>
              setValue("employer_type", e.target.value, { shouldValidate: true })
            }
            className={`${selectClass} ${errors.employer_type ? "border-[#EF4444]" : ""}`}
          >
            <option value="">{t.companyDetails.choose}</option>
            {EMPLOYER_TYPES.map((item) => (
              <option key={item.value} value={item.value}>
                {item.label}
              </option>
            ))}
          </select>
        </div>

        {/* Privacy Policy */}
        <div className="flex items-start gap-3">
          <Checkbox
            id="privacy"
            checked={privacyAccepted === true}
            onCheckedChange={(checked) =>
              setValue(
                "privacy_accepted",
                checked === true ? true : (undefined as unknown as true),
                { shouldValidate: true }
              )
            }
            className="mt-0.5"
          />
          <label htmlFor="privacy" className="text-[13px] text-[#6B7280] cursor-pointer leading-relaxed">
            {t.companyDetails.privacyCheckbox}{" "}
            <Link
              href="/privacy"
              className="text-[#4B7BF5] hover:underline"
              target="_blank"
            >
              {t.companyDetails.privacyLink}
            </Link>
          </label>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3 pt-6">
          <button
            type="submit"
            disabled={!isValid}
            className="h-[44px] px-10 bg-[#4B7BF5] hover:bg-[#3A62C4] text-white text-[14px] font-medium rounded-lg transition-colors disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
          >
            {t.common.continue}
          </button>
          <button
            type="button"
            className="h-[44px] px-10 border border-[#E5E7EB] text-[#6B7280] text-[14px] font-medium rounded-lg hover:bg-[#F9FAFB] transition-colors cursor-pointer"
          >
            {t.common.skip}
          </button>
        </div>
      </form>
    </OnboardingLayout>
  );
}
