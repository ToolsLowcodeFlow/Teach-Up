"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { MoreHorizontal, Zap, ChevronDown, Search } from "lucide-react";
import { AdminNavbar } from "@/components/admin/admin-navbar";
import { useLanguage } from "@/lib/i18n/context";

type GuideStatus = "new" | "active" | "inactive";
const guideStatuses: GuideStatus[] = Array.from({ length: 8 }, (_, i) =>
  i === 0 ? "new" : i === 6 ? "inactive" : "active"
);

function exportToCSV(data: Record<string, string>[], filename: string) {
  const headers = Object.keys(data[0]);
  const csv = [
    headers.join(","),
    ...data.map((row) => headers.map((h) => `"${row[h]}"`).join(","))
  ].join("\n");
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `${filename}.csv`;
  link.click();
  URL.revokeObjectURL(url);
}

export default function AdminGuidesPage() {
  const { t, direction } = useLanguage();
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const [openMenu, setOpenMenu] = useState<number | null>(null);

  const stats = [
    { label: t.admin.totalInactiveInstructors, value: "760", change: "-12%", positive: false },
    { label: t.admin.totalActiveInstructors, value: "760", change: "+12%", positive: true },
    { label: t.admin.totalInstructors, value: "760", change: "+12%", positive: true },
  ];

  const roles = [t.admin.guideRoleTeacher, t.admin.guideRoleAssistant, t.admin.guideRoleLecturer, t.admin.guideRolePlus2];
  const fields = [t.admin.guideFieldComputerScience, t.admin.guideFieldEnglish, t.admin.guideFieldPhysics];
  const areas = [t.admin.guideAreaTelAviv, t.admin.guideAreaJerusalem, t.admin.guideAreaHaifa];
  const genders = [t.admin.guideGenderFemale, t.admin.guideGenderMale];

  const statusLabel: Record<GuideStatus, string> = {
    new: t.admin.statusNew,
    active: t.admin.statusActive,
    inactive: t.admin.statusInactive,
  };

  const guides = guideStatuses.map((status, i) => ({
    id: i + 1,
    name: i === 2 ? t.admin.sampleSupplierName : t.admin.sampleLoremShort,
    joiningDate: "08/10/26",
    area: areas[i % 3],
    role: roles[i % 4],
    fieldOfKnowledge: fields[i % 3],
    phone: "052-7058732",
    gender: genders[i % 2],
    status,
  }));

  return (
    <div className="min-h-screen bg-[#F7F9FC]" style={{ fontFamily: "'Heebo', sans-serif" }}>
      <AdminNavbar />

      <div dir={direction} style={{ padding: "30px 40px 60px" }}>
        {/* Header */}
        <div className="flex items-start justify-between" style={{ marginBottom: 28 }}>
          <div className="flex flex-col gap-2">
            <h1 className="text-[32px] leading-[1.1] text-foreground">{t.admin.guidesTitle}</h1>
            <p className="text-sm text-muted-foreground">{t.admin.guidesSubtitle}</p>
          </div>
          <button onClick={() => exportToCSV(guides.map((g) => ({ "Name": g.name, "Joining date": g.joiningDate, "Area": g.area, "Role": g.role, "Field of knowledge": g.fieldOfKnowledge, "Phone": g.phone, "Gender": g.gender, "Status": g.status })), "guides")} className="cursor-pointer text-sm text-primary underline hover:text-primary/80">{t.admin.exportToExcel}</button>
        </div>

        {/* Stat cards */}
        <div className="grid grid-cols-3 gap-5" style={{ marginBottom: 32 }}>
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
          {/* Filters */}
          <div className="flex items-center justify-between" style={{ padding: "0 28px", marginBottom: 16 }}>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2"><ChevronDown size={14} className="text-muted-foreground" /></div>
              <div className="flex cursor-pointer items-center gap-2 rounded-lg border border-border-light bg-[#F7F9FC] text-xs text-foreground" style={{ padding: "8px 14px" }}>
                <span>{t.admin.employerType}</span><ChevronDown size={12} className="text-muted-foreground" />
              </div>
              <div className="flex cursor-pointer items-center gap-2 rounded-lg border border-border-light bg-[#F7F9FC] text-xs text-foreground" style={{ padding: "8px 14px" }}>
                <span>{t.admin.serviceType}</span><ChevronDown size={12} className="text-muted-foreground" />
              </div>
              <div className="flex cursor-pointer items-center gap-2 rounded-lg border border-border-light bg-[#F7F9FC] text-xs text-foreground" style={{ padding: "8px 14px" }}>
                <span>{t.admin.status}</span><ChevronDown size={12} className="text-muted-foreground" />
              </div>
            </div>
            <div className="flex items-center rounded-lg border border-border-light bg-[#F7F9FC]" style={{ padding: "8px 14px", width: 200 }}>
              <input type="text" placeholder={t.admin.freeSearch} className="flex-1 border-none bg-transparent text-xs text-foreground outline-none placeholder:text-muted-foreground/30" />
              <Search size={14} className="shrink-0 text-muted-foreground/30" />
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full" style={{ borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ borderBottom: "1px solid #F3F3F6" }}>
                  <th style={{ padding: "12px 28px" }} className="text-start text-xs font-normal text-muted-foreground">{t.admin.instructorName}</th>
                  <th style={{ padding: "12px 16px" }} className="text-start text-xs font-normal text-muted-foreground">{t.admin.joiningDate}</th>
                  <th style={{ padding: "12px 16px" }} className="text-start text-xs font-normal text-muted-foreground">{t.admin.area}</th>
                  <th style={{ padding: "12px 16px" }} className="text-start text-xs font-normal text-muted-foreground">{t.admin.role}</th>
                  <th style={{ padding: "12px 16px" }} className="text-start text-xs font-normal text-muted-foreground">{t.admin.fieldOfKnowledge}</th>
                  <th style={{ padding: "12px 16px" }} className="text-start text-xs font-normal text-muted-foreground">{t.admin.phone}</th>
                  <th style={{ padding: "12px 16px" }} className="text-start text-xs font-normal text-muted-foreground">{t.admin.gender}</th>
                  <th style={{ padding: "12px 16px" }} className="text-start text-xs font-normal text-muted-foreground">{t.admin.status}</th>
                  <th style={{ padding: "12px 28px 12px 16px", width: 50 }} className="text-start text-xs font-normal text-muted-foreground"></th>
                </tr>
              </thead>
              <tbody>
                {guides.map((g) => (
                  <tr key={g.id} style={{ borderBottom: "1px solid #F3F3F6" }} className="transition-colors hover:bg-[#FAFBFD]">
                    <td style={{ padding: "14px 28px" }}>
                      <div className="flex items-center gap-3">
                        <div className="h-8 w-8 shrink-0 overflow-hidden rounded-full">
                          <img src="/images/job-avatar.png" alt="" className="h-full w-full object-cover" />
                        </div>
                        <span className="text-sm text-foreground">{g.name}</span>
                      </div>
                    </td>
                    <td style={{ padding: "14px 16px" }} className="text-sm text-foreground">{g.joiningDate}</td>
                    <td style={{ padding: "14px 16px" }} className="text-sm text-foreground">{g.area}</td>
                    <td style={{ padding: "14px 16px" }} className="text-sm text-foreground">{g.role}</td>
                    <td style={{ padding: "14px 16px" }} className="text-sm text-foreground">{g.fieldOfKnowledge}</td>
                    <td style={{ padding: "14px 16px" }} className="text-sm text-foreground">{g.phone}</td>
                    <td style={{ padding: "14px 16px" }} className="text-sm text-foreground">{g.gender}</td>
                    <td style={{ padding: "14px 16px" }}>
                      <span
                        className="rounded-full text-[10px] text-white"
                        style={{
                          padding: "4px 14px",
                          background: g.status === "new" ? "#4C96FF" : g.status === "active" ? "#20AB7F" : "#FF676A",
                        }}
                      >
                        {statusLabel[g.status]}
                      </span>
                    </td>
                    <td style={{ padding: "14px 28px 14px 16px" }}>
                      <div className="relative">
                        <button
                          onClick={() => setOpenMenu(openMenu === g.id ? null : g.id)}
                          className="flex cursor-pointer items-center justify-center border-none bg-transparent text-muted-foreground hover:text-foreground"
                        >
                          <MoreHorizontal size={18} />
                        </button>
                        {openMenu === g.id && (
                          <>
                            <div className="fixed inset-0 z-10" onClick={() => setOpenMenu(null)} />
                            <div className="absolute right-0 top-8 z-20 flex min-w-44 flex-col gap-1 rounded-xl border border-border-light bg-white shadow-lg" style={{ padding: "10px 14px" }}>
                              <button onClick={() => setOpenMenu(null)} className="flex w-full whitespace-nowrap py-1.5 text-start text-sm text-foreground transition-colors hover:text-primary">{t.admin.blockingGuide}</button>
                              <button onClick={() => setOpenMenu(null)} className="flex w-full whitespace-nowrap py-1.5 text-start text-sm text-red-400 transition-colors hover:text-red-600">{t.admin.deletingGuide}</button>
                            </div>
                          </>
                        )}
                      </div>
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
                  style={{ background: currentPage === p ? "#1E2334" : "transparent", color: currentPage === p ? "white" : "#0E1117" }}
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
