"use client";

import { useState } from "react";
import { ChevronDown, Search, ArrowRight, ArrowLeft, X } from "lucide-react";
import { PublicNavbar } from "@/components/home/public-navbar";
import { useLanguage } from "@/lib/i18n/context";

const suppliers = [
  {
    id: 1,
    name: "Company name Lorem Ipsum Dolores",
    url: "https://shop.super-pharm.co.il/",
    description: "Lorem Ipsum Dolor Sit Amet, Consecteur Adipiscing Elite Goler Montferrer Sobert Lorem Shabdek Yahol, Lorem Shabdek Yahol, Lorem Ipsum Dolor Sit Aemm.",
    contact: "May Bozo",
    phone: "02-6749203",
    email: "lorancc@gmail.com",
    logo: "/images/supplier-logo.png",
    tags: ["Jerusalem", "Tel Aviv"],
    badge: { type: "new" as const, label: "New supplier" },
    gradient: "linear-gradient(180deg, white 18%, #E5FAED 188%)",
    borderColor: "white",
  },
  {
    id: 2,
    name: "Company name Lorem Ipsum Dolores",
    url: "https://shop.super-pharm.co.il/",
    description: "Lorem Ipsum Dolor Sit Amet, Consecteur Adipiscing Elite Goler Montferrer Sobert Lorem Shabdek Yahol, Lorem Shabdek Yahol, Lorem Ipsum Dolor Sit Aemm.",
    contact: "May Bozo",
    phone: "02-6749203",
    email: "lorancc@gmail.com",
    logo: "/images/supplier-logo.png",
    tags: ["Jerusalem", "Tel Aviv"],
    badge: { type: "preferred" as const, label: "Preferred supplier" },
    gradient: "linear-gradient(180deg, white 18%, #CCDCFF 188%)",
    borderColor: "white",
  },
  {
    id: 3,
    name: "Company name Lorem Ipsum Dolores",
    url: "https://shop.super-pharm.co.il/",
    description: "Lorem Ipsum Dolor Sit Amet, Consecteur Adipiscing Elite Goler Montferrer Sobert Lorem Shabdek Yahol, Lorem Shabdek Yahol, Lorem Ipsum Dolor Sit Aemm.",
    contact: "May Bozo",
    phone: "02-6749203",
    email: "lorancc@gmail.com",
    logo: "/images/supplier-logo.png",
    tags: ["Jerusalem", "Tel Aviv"],
    badge: { type: "benefit" as const, label: "There is a benefit with the supplier." },
    gradient: "white",
    borderColor: "#F3F3F6",
  },
];

function BadgeTag({ badge }: { badge: (typeof suppliers)[0]["badge"] }) {
  if (badge.type === "new") {
    return (
      <span
        className="rounded-full text-sm"
        style={{ padding: "6px 14px", background: "#E6FAED", color: "#20AB7F" }}
      >
        {badge.label}
      </span>
    );
  }
  if (badge.type === "preferred") {
    return (
      <span
        className="rounded-full text-sm text-white"
        style={{
          padding: "6px 14px",
          backgroundImage: "linear-gradient(165deg, #4C96FF 12%, #1667DB 94%)",
        }}
      >
        {badge.label}
      </span>
    );
  }
  return (
    <span
      className="flex items-center gap-1.5 rounded-full border border-primary text-sm text-primary"
      style={{ padding: "6px 14px" }}
    >
      <span
        className="flex h-5 w-5 items-center justify-center rounded-full text-white"
        style={{ backgroundImage: "linear-gradient(140deg, #4C96FF 12%, #1667DB 94%)" }}
      >
        <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      </span>
      {badge.label}
    </span>
  );
}

function SupplierDetailModal({
  supplier,
  onClose,
}: {
  supplier: (typeof suppliers)[0];
  onClose: () => void;
}) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ backdropFilter: "blur(2px)", background: "rgba(0,0,0,0.49)" }}
      onClick={onClose}
    >
      <div
        className="relative max-h-[90vh] w-[595px] overflow-y-auto rounded-[20px] bg-white"
        style={{ padding: "36px 46px" }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute cursor-pointer border-none bg-transparent text-muted-foreground hover:text-foreground"
          style={{ top: 16, right: 16 }}
        >
          <X size={20} />
        </button>

        <div className="flex flex-col" style={{ gap: 20 }}>
          {/* Tags */}
          <div className="flex flex-wrap items-center gap-2">
            {supplier.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-[#F3F3F6] text-sm text-foreground"
                style={{ padding: "6px 14px" }}
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Company info */}
          <div className="flex items-start gap-3">
            <div
              className="shrink-0 overflow-hidden rounded-[15px] border border-[#EEEFF4]"
              style={{ width: 74, height: 74, background: "rgba(14,22,67,0.5)" }}
            >
              <img src={supplier.logo} alt="Logo" className="h-full w-full object-cover" />
            </div>
            <div className="flex flex-col gap-1">
              <h3 className="text-[22px] leading-[1.1] text-foreground">{supplier.name}</h3>
              <p className="text-base text-muted-foreground">{supplier.url}</p>
            </div>
          </div>

          {/* Description */}
          <p className="text-base leading-[1.2] text-foreground">{supplier.description}</p>

          {/* Contact info */}
          <div className="flex items-start gap-12 text-base">
            <div className="flex flex-col gap-1">
              <span className="text-muted-foreground">Contact name</span>
              <span className="text-foreground">{supplier.contact}</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-muted-foreground">Contact phone number</span>
              <span className="text-foreground">{supplier.phone}</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-muted-foreground">Email address</span>
              <span className="text-foreground">{supplier.email}</span>
            </div>
          </div>

          {/* Divider */}
          <div className="h-px w-full bg-[#F3F3F6]" />

          {/* Service type */}
          <div className="flex flex-col gap-2.5">
            <p className="text-base text-foreground">Service type</p>
            <div className="flex gap-4">
              <span className="rounded-full border border-[#F3F3F6] text-sm text-foreground" style={{ padding: "6px 14px" }}>Peak days</span>
              <span className="rounded-full border border-[#F3F3F6] text-sm text-foreground" style={{ padding: "6px 14px" }}>Workshops</span>
            </div>
          </div>

          {/* {isHe ? "קבוצת גיל" : "Age group"}s */}
          <div className="flex flex-col gap-2.5">
            <p className="text-base text-foreground">{isHe ? "קבוצת גיל" : "Age group"}s</p>
            <div className="flex gap-4">
              <span className="rounded-full border border-[#F3F3F6] text-sm text-foreground" style={{ padding: "6px 14px" }}>Adults</span>
            </div>
          </div>

          {/* Divider */}
          <div className="h-px w-full bg-[#F3F3F6]" />

          {/* Services details */}
          <p className="text-base text-foreground">Services details</p>
          <div className="flex flex-col" style={{ gap: 19 }}>
            <div className="relative overflow-hidden rounded-[10px] border border-[#F3F3F6]" style={{ padding: 10, minHeight: 60 }}>
              <img src="/images/supplier-service-bg.png" alt="" className="absolute inset-0 h-full w-full rounded-[10px] object-cover" />
              <div className="relative flex flex-col gap-1">
                <p className="text-base text-muted-foreground">Service name Lorem Ipsum Dolor</p>
                <p className="text-base text-foreground">Lorem Ipsum Dolor Sit Emmet, Consectetur Adipiscing Elit Goler Monferrer</p>
              </div>
            </div>
            <div className="relative overflow-hidden rounded-[10px] border border-[#F3F3F6]" style={{ padding: 10, minHeight: 60 }}>
              <img src="/images/supplier-service-bg.png" alt="" className="absolute inset-0 h-full w-full rounded-[10px] object-cover" />
              <div className="relative flex flex-col gap-1">
                <p className="text-base text-muted-foreground">Service name Lorem Ipsum Dolor</p>
                <p className="text-base text-foreground">Lorem Ipsum Dolor Sit Emmet, Consectetur Adipiscing Elit Goler Monferrer</p>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="h-px w-full bg-[#F3F3F6]" />

          {/* Benefit */}
          <div className="flex flex-col gap-1.5">
            <p className="text-base text-primary">Benefit of the doubt</p>
            <p className="text-base leading-[1.2] text-foreground">{supplier.description}</p>
          </div>

          {/* Divider */}
          <div className="h-px w-full bg-[#F3F3F6]" />

          {/* Photos */}
          <div className="flex flex-col gap-3.5">
            <div className="flex items-center justify-between">
              <p className="text-base text-foreground">Photos</p>
              <div className="flex gap-2">
                <button className="flex h-6 w-6 items-center justify-center rounded-full border border-foreground bg-white">
                  <ArrowLeft size={10} />
                </button>
                <button className="flex h-6 w-6 items-center justify-center rounded-full border border-foreground bg-white">
                  <ArrowRight size={10} />
                </button>
              </div>
            </div>
            <div className="flex gap-7">
              <img src="/images/supplier-photo-1.jpg" alt="Photo 1" className="h-28 w-36 rounded-lg object-cover" />
              <img src="/images/supplier-photo-2.jpg" alt="Photo 2" className="h-28 w-36 rounded-lg object-cover" />
              <img src="/images/supplier-photo-1.jpg" alt="Photo 3" className="h-28 w-36 rounded-lg object-cover" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function SupplierCard({ supplier, onOpen }: { supplier: (typeof suppliers)[0]; onOpen: () => void }) {
  return (
    <div
      className="flex items-center rounded-[20px] border"
      style={{
        background: supplier.gradient,
        borderColor: supplier.borderColor,
        padding: "24px 28px",
        minHeight: 240,
        boxShadow: "0px 4px 24px rgba(0,0,0,0.06)",
      }}
    >
      {/* Card content - LTR layout */}
      <div className="flex flex-1 flex-col items-start gap-4">
        {/* Tags row */}
        <div className="flex flex-wrap items-center gap-2">
          <BadgeTag badge={supplier.badge} />
          {supplier.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-[#F3F3F6] text-sm text-foreground"
              style={{ padding: "6px 14px" }}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Company info - logo on left, name on right */}
        <div className="flex items-start gap-3">
          <div
            className="shrink-0 overflow-hidden rounded-[15px] border border-[#EEEFF4]"
            style={{ width: 74, height: 74, background: "rgba(14,22,67,0.5)" }}
          >
            <img src={supplier.logo} alt="Logo" className="h-full w-full object-cover" />
          </div>
          <div className="flex flex-col gap-1">
            <h3 className="text-[22px] leading-[1.1] text-foreground">{supplier.name}</h3>
            <p className="text-base text-muted-foreground">{supplier.url}</p>
          </div>
        </div>

        {/* Description */}
        <p className="text-base leading-[1.2] text-foreground">{supplier.description}</p>

        {/* Contact info - LTR order */}
        <div className="flex items-start gap-12 text-base">
          <div className="flex flex-col gap-1">
            <span className="text-muted-foreground">Contact name</span>
            <span className="text-foreground">{supplier.contact}</span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-muted-foreground">Contact phone number</span>
            <span className="text-foreground">{supplier.phone}</span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-muted-foreground">Email address</span>
            <span className="text-foreground">{supplier.email}</span>
          </div>
        </div>
      </div>

      {/* Arrow button - on the right for LTR */}
      <button
        onClick={onOpen}
        className="ms-10 flex shrink-0 cursor-pointer items-center justify-center rounded-full border border-foreground bg-white"
        style={{ width: 46, height: 46 }}
      >
        <ArrowRight size={18} className="text-foreground" />
      </button>
    </div>
  );
}

export default function SupplierDatabasePage() {
  const [selectedSupplier, setSelectedSupplier] = useState<(typeof suppliers)[0] | null>(null);
  const { locale, direction } = useLanguage();
  const isHe = locale === "he";

  return (
    <div className="min-h-screen bg-[#F7F9FC]">
      <PublicNavbar />

      {selectedSupplier && (
        <SupplierDetailModal
          supplier={selectedSupplier}
          onClose={() => setSelectedSupplier(null)}
        />
      )}

      <div style={{ padding: "120px 40px 60px" }} dir={direction}>
        {/* Title */}
        <h1 className="text-[32px] leading-[1.1] text-foreground" style={{ marginBottom: 36 }}>
          {isHe ? "מאגר הספקים שלנו" : "Our supplier database"} <span className="text-[22px]">(1,000)</span>
        </h1>

        {/* Layout: Cards + Sidebar (filters on right) */}
        <div className="flex gap-8">
          {/* Supplier cards */}
          <div className="flex flex-1 flex-col" style={{ gap: 30 }}>
            {suppliers.map((supplier) => (
              <SupplierCard key={supplier.id} supplier={supplier} onOpen={() => setSelectedSupplier(supplier)} />
            ))}
          </div>

          {/* Filters sidebar - right side */}
          <div
            className="shrink-0 self-start rounded-[20px]"
            style={{
              width: 374,
              padding: "28px 20px",
              background: "linear-gradient(180deg, white 0%, rgba(255,255,255,0) 138%)",
              boxShadow: "0px 4px 24px rgba(0,0,0,0.06)",
            }}
          >
            <div className="flex flex-col" style={{ gap: 20 }}>
              <h2 className="text-[22px] leading-[1.1] text-foreground">{isHe ? "מסננים" : "Filters"}</h2>

              <div className="flex flex-col" style={{ gap: 24 }}>
                {/* Search input */}
                <div
                  className="flex items-center rounded-[10px] border border-[#F3F3F6] bg-white"
                  style={{ height: 44, padding: "0 14px" }}
                >
                  <Search size={18} className="shrink-0 text-muted-foreground/30" />
                  <input
                    type="text"
                    placeholder="Free search..."
                    className="mx-2 flex-1 border-none bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground/30"
                  />
                  <ChevronDown size={14} className="shrink-0 text-muted-foreground" />
                </div>

                {/* {isHe ? "תחומי פעילות" : "Areas of activity"} */}
                <div
                  className="flex items-center justify-between rounded-[10px] border border-[#F3F3F6] bg-white"
                  style={{ height: 44, padding: "0 14px" }}
                >
                  <span className="text-sm text-foreground">{isHe ? "תחומי פעילות" : "Areas of activity"}</span>
                  <ChevronDown size={14} className="shrink-0 text-muted-foreground" />
                </div>

                {/* {isHe ? "קבוצת גיל" : "Age group"} */}
                <div
                  className="flex items-center justify-between rounded-[10px] border border-[#F3F3F6] bg-white"
                  style={{ height: 44, padding: "0 14px" }}
                >
                  <span className="text-sm text-foreground">{isHe ? "קבוצת גיל" : "Age group"}</span>
                  <ChevronDown size={14} className="shrink-0 text-muted-foreground" />
                </div>

                {/* Search button */}
                <button
                  className="w-full cursor-pointer rounded-[10px] text-base text-white"
                  style={{
                    height: 50,
                    border: "none",
                    backgroundImage: "linear-gradient(173deg, #4C96FF 12%, #1667DB 94%)",
                    fontFamily: "'Abel', sans-serif",
                  }}
                >
                  {isHe ? "חיפוש" : "Search"}
</button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
