"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { CompanyDetailsStep } from "@/components/auth/company-details-step";
import { MoreInfoStep } from "@/components/auth/more-info-step";
import { SupplierRegistrationStep } from "@/components/auth/supplier-registration-step";
import { PricingModal } from "@/components/auth/pricing-modal";
import type { CompanyDetailsFormData } from "@/lib/validations/institution";
import type { MoreInfoFormData } from "@/lib/validations/institution";
import type { SupplierRegistrationFormData } from "@/lib/validations/supplier";

export default function InstitutionOnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [showPricing, setShowPricing] = useState(false);
  const [companyData, setCompanyData] = useState<CompanyDetailsFormData | null>(null);
  const [moreInfoData, setMoreInfoData] = useState<MoreInfoFormData | null>(null);

  const handleCompanyDetailsSubmit = async (data: CompanyDetailsFormData) => {
    setCompanyData(data);
    const supabase = createClient();
    await supabase.auth.updateUser({
      data: {
        company_name: data.company_name,
        phone: data.phone,
        number_of_employees: data.number_of_employees,
        employer_type: data.employer_type,
      },
    });
    // Also update full_name in profiles table
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      await supabase.from("profiles").upsert({
        id: user.id,
        role: "institution",
        full_name: data.company_name,
      });
    }
    setStep(2);
  };

  const handleMoreInfoSubmit = async (data: MoreInfoFormData) => {
    setMoreInfoData(data);
    const supabase = createClient();
    await supabase.auth.updateUser({
      data: {
        company_logo_url: data.company_logo_url,
        website: data.website,
        social_media_links: data.social_media_links,
        company_description: data.description,
      },
    });
    setStep(3);
  };

  const handleSupplierSubmit = async (data: SupplierRegistrationFormData) => {
    const supabase = createClient();
    await supabase.auth.updateUser({
      data: { supplier_data: data },
    });
    setShowPricing(true);
  };

  const handleSkip = () => {
    if (step === 2) {
      setStep(3);
    } else if (step === 3) {
      setShowPricing(true);
    }
  };

  return (
    <div className="relative">
      {step === 1 && (
        <CompanyDetailsStep
          onSubmit={handleCompanyDetailsSubmit}
          defaultValues={companyData ?? undefined}
        />
      )}
      {step === 2 && (
        <MoreInfoStep
          onSubmit={handleMoreInfoSubmit}
          onBack={() => setStep(1)}
          onSkip={handleSkip}
          defaultValues={moreInfoData ?? undefined}
        />
      )}
      {step >= 3 && (
        <SupplierRegistrationStep
          onSubmit={handleSupplierSubmit}
          onBack={() => setStep(2)}
          onSkip={handleSkip}
        />
      )}

      {/* Pricing modal overlays on top of step 3 */}
      {showPricing && (
        <PricingModal
          onContinue={() => router.push("/institution/dashboard")}
          onReturn={() => setShowPricing(false)}
        />
      )}
    </div>
  );
}
