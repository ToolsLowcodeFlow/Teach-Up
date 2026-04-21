"use client";

import { useState } from "react";
import { MoreHorizontal, Zap, ChevronRight } from "lucide-react";
import { AdminNavbar } from "@/components/admin/admin-navbar";
import { useLanguage } from "@/lib/i18n/context";

type SupplierStatus = "new" | "active" | "inactive";

const supplierStatuses: SupplierStatus[] = Array.from({ length: 8 }, (_, i) =>
  i === 0 ? "new" : i === 5 ? "inactive" : "active"
);

export default function AdminDashboardPage() {
  const { t, direction } = useLanguage();
  const statusLabel: Record<SupplierStatus, string> = {
    new: t.admin.statusNew,
    active: t.admin.statusActive,
    inactive: t.admin.statusInactive,
  };
  const suppliers = supplierStatuses.map((status, i) => ({
    id: i + 1,
    company: t.admin.sampleSupplierName,
    joiningDate: "08/10/26",
    employees: "578954985",
    serviceType: t.admin.sampleLoremShort,
    employerType: t.admin.sampleLoremShort,
    phone: "052-7058732",
    orbit: `\u20aa100 ${t.admin.monthlyPrice.split("\n")[0]}`,
    status,
  }));
  const [currentPage, setCurrentPage] = useState(1);

  const stats = [
    { label: t.admin.totalJobsFilled, value: "760", change: "+12%", positive: true },
    { label: t.admin.totalJobsInSystem, value: "760", change: "-12%", positive: false },
    { label: t.admin.totalInstructors, value: "760", change: "+12%", positive: true },
    { label: t.admin.totalSuppliers, value: "760", change: "+12%", positive: true },
  ];

  return (
    <div className="min-h-screen bg-[#F7F9FC]" style={{ fontFamily: "'Heebo', sans-serif" }}>
      <AdminNavbar />

      <div dir={direction} style={{ padding: "30px 40px 60px" }}>
        {/* Welcome */}
        <div style={{ marginBottom: 32 }}>
          <h1 className="text-[32px] leading-[1.2] text-foreground" style={{ marginBottom: 8 }}>
            {t.admin.welcomeTitle}
          </h1>
          <p className="text-sm text-muted-foreground">
            {t.admin.welcomeSubtitle}
          </p>
        </div>

        {/* Stat cards */}
        <div className="grid grid-cols-4 gap-5" style={{ marginBottom: 40 }}>
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="flex items-center gap-5 rounded-2xl bg-white"
              style={{ padding: "24px 28px", boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}
            >
              <div
                className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl"
                style={{ backgroundImage: "linear-gradient(140deg, #4C96FF 12%, #1667DB 94%)" }}
              >
                <Zap size={24} className="text-white" fill="white" />
              </div>
              <div className="flex flex-col gap-2">
                <span className="text-xs text-muted-foreground">{stat.label}</span>
                <span className="text-[32px] leading-none text-foreground">{stat.value}</span>
                <span className="text-xs" style={{ color: stat.positive ? "#20AB7F" : "#FF676A" }}>
                  {t.admin.fromLastMonth}  {stat.change}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Table section */}
        <div className="rounded-2xl bg-white" style={{ padding: "24px 0" }}>
          {/* Table header */}
          <div className="flex items-center justify-between" style={{ padding: "0 28px", marginBottom: 16 }}>
            <h2 className="text-lg text-foreground">{t.admin.newSuppliersInSystem}</h2>
            <button className="flex items-center gap-1 text-sm text-primary hover:underline">
              {t.admin.viewAllProviders}
              <ChevronRight size={14} />
            </button>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full" style={{ borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ borderBottom: "1px solid #F3F3F6" }}>
                  <th style={{ padding: "12px 28px 12px 28px" }} className="text-start text-xs font-normal text-muted-foreground">{t.admin.companyName}</th>
                  <th style={{ padding: "12px 16px" }} className="text-start text-xs font-normal text-muted-foreground">{t.admin.joiningDate}</th>
                  <th style={{ padding: "12px 16px" }} className="text-start text-xs font-normal text-muted-foreground">{t.admin.numberOfEmployees}</th>
                  <th style={{ padding: "12px 16px" }} className="text-start text-xs font-normal text-muted-foreground">{t.admin.serviceType}</th>
                  <th style={{ padding: "12px 16px" }} className="text-start text-xs font-normal text-muted-foreground">{t.admin.employerType}</th>
                  <th style={{ padding: "12px 16px" }} className="text-start text-xs font-normal text-muted-foreground">{t.admin.phone}</th>
                  <th style={{ padding: "12px 16px" }} className="text-start text-xs font-normal text-muted-foreground">{t.admin.orbit}</th>
                  <th style={{ padding: "12px 16px" }} className="text-start text-xs font-normal text-muted-foreground">{t.admin.status}</th>
                  <th style={{ padding: "12px 28px 12px 16px", width: 50 }} className="text-start text-xs font-normal text-muted-foreground"></th>
                </tr>
              </thead>
              <tbody>
                {suppliers.map((sup) => (
                  <tr key={sup.id} style={{ borderBottom: "1px solid #F3F3F6" }} className="transition-colors hover:bg-[#FAFBFD]">
                    <td style={{ padding: "14px 28px 14px 28px" }}>
                      <div className="flex items-center gap-3">
                        <div className="h-8 w-8 shrink-0 overflow-hidden rounded-full">
                          <img src="/images/job-avatar.png" alt="" className="h-full w-full object-cover" />
                        </div>
                        <span className="text-sm text-foreground">{sup.company}</span>
                      </div>
                    </td>
                    <td style={{ padding: "14px 16px" }} className="text-sm text-foreground">{sup.joiningDate}</td>
                    <td style={{ padding: "14px 16px" }} className="text-sm text-foreground">{sup.employees}</td>
                    <td style={{ padding: "14px 16px" }} className="text-sm text-foreground">{sup.serviceType}</td>
                    <td style={{ padding: "14px 16px" }} className="text-sm text-foreground">{sup.employerType}</td>
                    <td style={{ padding: "14px 16px" }} className="text-sm text-foreground">{sup.phone}</td>
                    <td style={{ padding: "14px 16px" }} className="text-sm text-foreground">{sup.orbit}</td>
                    <td style={{ padding: "14px 16px" }}>
                      <span
                        className="rounded-full text-[10px] text-white"
                        style={{
                          padding: "4px 14px",
                          background: sup.status === "new" ? "#4C96FF" : sup.status === "active" ? "#20AB7F" : "#FF676A",
                        }}
                      >
                        {statusLabel[sup.status]}
                      </span>
                    </td>
                    <td style={{ padding: "14px 28px 14px 16px" }}>
                      <button className="flex cursor-pointer items-center justify-center border-none bg-transparent text-muted-foreground hover:text-foreground">
                        <MoreHorizontal size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between rounded-b-2xl bg-[#F7F9FC]" style={{ padding: "20px 28px" }}>
            <div className="flex items-center gap-2">
              <button className="cursor-pointer rounded-lg border border-border-light bg-white px-4 py-2 text-xs text-foreground transition-colors hover:bg-gray-50">{t.admin.next}</button>
              {[1, 2, 3].map((p) => (
                <button
                  key={p}
                  onClick={() => setCurrentPage(p)}
                  className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg border-none text-xs"
                  style={{
                    background: currentPage === p ? "#1E2334" : "transparent",
                    color: currentPage === p ? "white" : "#0E1117",
                  }}
                >
                  {p}
                </button>
              ))}
              <span className="text-xs text-muted-foreground" style={{ marginLeft: 8 }}>{t.admin.presenter}</span>
            </div>
            <span className="text-xs text-primary">{t.admin.showingUsers}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
