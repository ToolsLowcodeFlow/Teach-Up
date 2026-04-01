"use client";

import { PublicNavbar } from "@/components/home/public-navbar";
import { HeroSection } from "@/components/home/hero-section";
import { LeadingJobsSection } from "@/components/home/leading-jobs-section";
import { EasyWaySection } from "@/components/home/easy-way-section";
import { BlueCtaSection } from "@/components/home/blue-cta-section";
import { SupplierDatabaseSection } from "@/components/home/supplier-database-section";
import { TestimonialsSection } from "@/components/home/testimonials-section";
import { FindNextJobSection } from "@/components/home/find-next-job-section";
import { SchoolsCtaSection } from "@/components/home/schools-cta-section";
import { PublicFooter } from "@/components/home/public-footer";

export default function Home() {
  return (
    <div className="min-h-screen">
      <PublicNavbar />
      <HeroSection />
      <LeadingJobsSection />
      <EasyWaySection />
      <BlueCtaSection />
      <SupplierDatabaseSection />
      <TestimonialsSection />
      <FindNextJobSection />
      <SchoolsCtaSection />
      <PublicFooter />
    </div>
  );
}
