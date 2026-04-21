"use client";

import { useEffect, useState } from "react";
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
  const [sessionChecked, setSessionChecked] = useState(false);

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(({ data, error }) => {
      if (error || !data.user) {
        console.warn("[onboarding] no session on mount, redirecting to /login", error);
        router.push("/login");
        return;
      }
      setSessionChecked(true);
    });
  }, [router]);

  const handleCompanyDetailsSubmit = async (data: CompanyDetailsFormData) => {
    setCompanyData(data);
    const supabase = createClient();
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    if (userError || !user) {
      console.error("[onboarding] no authenticated user, redirecting to /login", userError);
      router.push("/login");
      return;
    }
    // Persist to profiles only. We deliberately do NOT mirror these into
    // auth.user_metadata — anything in user_metadata gets embedded in the JWT,
    // and bloat there silently breaks cookie-based auth (the browser drops
    // cookies > ~4KB and the session becomes unreadable).
    const { error: profileError } = await supabase.from("profiles").upsert({
      id: user.id,
      role: "institution",
      full_name: data.company_name,
      company_name: data.company_name,
      phone: data.phone,
      number_of_employees: data.number_of_employees,
      employer_type: data.employer_type,
    });
    if (profileError) {
      console.error("[onboarding] profile upsert failed", profileError);
      return;
    }
    setStep(2);
  };

  const handleMoreInfoSubmit = async (data: MoreInfoFormData) => {
    setMoreInfoData(data);
    const supabase = createClient();
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    if (userError || !user) {
      console.error("[onboarding] no authenticated user, redirecting to /login", userError);
      router.push("/login");
      return;
    }
    // Persist to profiles only — see note in handleCompanyDetailsSubmit.
    // company_logo_url in particular can be a base64 data URI; if it lands in
    // user_metadata the JWT explodes and cookie-based sessions break.
    const { error: profileError } = await supabase.from("profiles").upsert({
      id: user.id,
      role: "institution",
      company_logo_url: data.company_logo_url,
      website: data.website,
      social_media_links: data.social_media_links,
      company_description: data.description,
    });
    if (profileError) {
      console.error("[onboarding] profile upsert failed", profileError);
      return;
    }
    setStep(3);
  };

  const handleSupplierSubmit = async (data: SupplierRegistrationFormData) => {
    const supabase = createClient();
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    if (userError || !user) {
      console.error("[onboarding] no authenticated user, redirecting to /login", userError);
      router.push("/login");
      return;
    }
    // Persist scalar supplier-contact fields to profiles. Note: the form's
    // `services` array doesn't map onto profiles columns yet — handled in a
    // dedicated services table later. Don't write to user_metadata (JWT bloat).
    const firstService = data.services?.[0];
    const { error: profileError } = await supabase.from("profiles").upsert({
      id: user.id,
      role: "institution",
      contact_name: data.contact_name,
      contact_phone: data.phone,
      contact_email: data.email,
      areas_of_activity: data.area_of_activity ? [data.area_of_activity] : null,
      age_groups: data.age_group ? [data.age_group] : null,
      service_type: firstService?.service_type ?? null,
      service_name: firstService?.service_name ?? null,
      service_description: firstService?.description ?? null,
    });
    if (profileError) {
      console.error("[onboarding] supplier profile upsert failed", profileError);
      return;
    }
    setShowPricing(true);
  };

  const handleSkip = () => {
    if (step === 2) {
      setStep(3);
    } else if (step === 3) {
      setShowPricing(true);
    }
  };

  if (!sessionChecked) {
    return null;
  }

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
