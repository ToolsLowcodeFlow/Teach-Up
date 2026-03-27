"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
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

  const handleCompanyDetailsSubmit = (data: CompanyDetailsFormData) => {
    setCompanyData(data);
    setStep(2);
  };

  const handleMoreInfoSubmit = (data: MoreInfoFormData) => {
    setMoreInfoData(data);
    setStep(3);
  };

  const handleSupplierSubmit = async (data: SupplierRegistrationFormData) => {
    console.log("All onboarding data:", { companyData, moreInfoData, supplierData: data });
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
