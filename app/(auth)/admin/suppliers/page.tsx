"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { MoreHorizontal, Zap, ChevronDown, ChevronRight, Search } from "lucide-react";
import { AdminNavbar } from "@/components/admin/admin-navbar";

const stats = [
  { label: "Total jobs", value: "760", change: "+12%", positive: true },
  { label: "Total inactive suppliers", value: "760", change: "-12%", positive: false },
  { label: "Total active suppliers", value: "760", change: "+12%", positive: true },
  { label: "Total suppliers in the system", value: "760", change: "+12%", positive: true },
];

const suppliers = Array.from({ length: 8 }, (_, i) => ({
  id: i + 1,
  company: "Tel Aviv University",
  joiningDate: "08/10/26",
  employees: "578954985",
  serviceType: "Lorem Ipsum",
  employerType: "Lorem Ipsum",
  phone: "052-7058732",
  orbit: "₪100 monthly",
  status: i === 0 ? "new" : i === 5 ? "inactive" : "active",
}));

export default function AdminSuppliersPage() {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const [openMenu, setOpenMenu] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-[#F7F9FC]" style={{ fontFamily: "'Abel', sans-serif" }}>
      <AdminNavbar />

      <div className="mx-auto max-w-[1375px]" style={{ padding: "30px 40px 60px" }}>
        {/* Header */}
        <div className="flex items-start justify-between" style={{ marginBottom: 28 }}>
          <div className="flex flex-col gap-2">
            <h1 className="text-[32px] leading-[1.1] text-foreground">Suppliers</h1>
            <p className="max-w-sm text-sm leading-[1.4] text-muted-foreground">
              Managing suppliers, viewing details and jobs, and removing from the system
            </p>
          </div>
          <button className="text-sm text-primary underline hover:text-primary/80">Export to Excel file</button>
        </div>

        {/* Stat cards */}
        <div className="grid grid-cols-4 gap-5" style={{ marginBottom: 32 }}>
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
                  From last month  {stat.change}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Table section */}
        <div className="rounded-2xl bg-white" style={{ padding: "24px 0" }}>
          {/* Filters row */}
          <div className="flex items-center justify-between" style={{ padding: "0 28px", marginBottom: 16 }}>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <ChevronDown size={14} />
              </div>
              <div className="flex cursor-pointer items-center gap-2 rounded-lg border border-border-light bg-[#F7F9FC] text-xs text-foreground" style={{ padding: "8px 14px" }}>
                <span>Employer type</span>
                <ChevronDown size={12} className="text-muted-foreground" />
              </div>
              <div className="flex cursor-pointer items-center gap-2 rounded-lg border border-border-light bg-[#F7F9FC] text-xs text-foreground" style={{ padding: "8px 14px" }}>
                <span>Service type</span>
                <ChevronDown size={12} className="text-muted-foreground" />
              </div>
              <div className="flex cursor-pointer items-center gap-2 rounded-lg border border-border-light bg-[#F7F9FC] text-xs text-foreground" style={{ padding: "8px 14px" }}>
                <span>status</span>
                <ChevronDown size={12} className="text-muted-foreground" />
              </div>
            </div>
            <div className="flex items-center rounded-lg border border-border-light bg-[#F7F9FC]" style={{ padding: "8px 14px", width: 200 }}>
              <input type="text" placeholder="Free search..." className="flex-1 border-none bg-transparent text-xs text-foreground outline-none placeholder:text-muted-foreground/30" />
              <Search size={14} className="shrink-0 text-muted-foreground/30" />
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full" style={{ borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ borderBottom: "1px solid #F3F3F6" }}>
                  <th style={{ padding: "12px 28px" }} className="text-start text-xs font-normal text-muted-foreground">Company name</th>
                  <th style={{ padding: "12px 16px" }} className="text-start text-xs font-normal text-muted-foreground">Joining date</th>
                  <th style={{ padding: "12px 16px" }} className="text-start text-xs font-normal text-muted-foreground">Number of employees</th>
                  <th style={{ padding: "12px 16px" }} className="text-start text-xs font-normal text-muted-foreground">Service type</th>
                  <th style={{ padding: "12px 16px" }} className="text-start text-xs font-normal text-muted-foreground">Employer type</th>
                  <th style={{ padding: "12px 16px" }} className="text-start text-xs font-normal text-muted-foreground">phone</th>
                  <th style={{ padding: "12px 16px" }} className="text-start text-xs font-normal text-muted-foreground">orbit</th>
                  <th style={{ padding: "12px 16px" }} className="text-start text-xs font-normal text-muted-foreground">status</th>
                  <th style={{ padding: "12px 28px 12px 16px", width: 50 }} className="text-start text-xs font-normal text-muted-foreground"></th>
                </tr>
              </thead>
              <tbody>
                {suppliers.map((sup) => (
                  <tr key={sup.id} style={{ borderBottom: "1px solid #F3F3F6" }} className="transition-colors hover:bg-[#FAFBFD]">
                    <td style={{ padding: "14px 28px" }}>
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
                        {sup.status}
                      </span>
                    </td>
                    <td style={{ padding: "14px 28px 14px 16px" }}>
                      <div className="relative">
                        <button
                          onClick={() => setOpenMenu(openMenu === sup.id ? null : sup.id)}
                          className="flex cursor-pointer items-center justify-center border-none bg-transparent text-muted-foreground hover:text-foreground"
                        >
                          <MoreHorizontal size={18} />
                        </button>
                        {openMenu === sup.id && (
                          <>
                            <div className="fixed inset-0 z-10" onClick={() => setOpenMenu(null)} />
                            <div className="absolute right-0 top-8 z-20 flex min-w-52 flex-col gap-1 rounded-xl border border-border-light bg-white shadow-lg" style={{ padding: "10px 14px" }}>
                              <button onClick={() => { setOpenMenu(null); router.push(`/admin/suppliers/${sup.id}`); }} className="flex w-full whitespace-nowrap py-1.5 text-start text-sm text-foreground transition-colors hover:text-primary">View profile</button>
                              <button onClick={() => setOpenMenu(null)} className="flex w-full whitespace-nowrap py-1.5 text-start text-sm text-foreground transition-colors hover:text-primary">Blocking a user</button>
                              <button onClick={() => setOpenMenu(null)} className="flex w-full whitespace-nowrap py-1.5 text-start text-sm text-foreground transition-colors hover:text-primary">Opening a directory database</button>
                              <button onClick={() => setOpenMenu(null)} className="flex w-full whitespace-nowrap py-1.5 text-start text-sm text-foreground transition-colors hover:text-primary">Blocking from supplier database</button>
                              <button onClick={() => { setOpenMenu(null); router.push(`/admin/suppliers/delete/${sup.id}`); }} className="flex w-full whitespace-nowrap py-1.5 text-start text-sm text-red-400 transition-colors hover:text-red-600">Delete a provider</button>
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
          <div className="flex items-center justify-between" style={{ padding: "20px 28px 0" }}>
            <div className="flex items-center gap-2">
              <button className="cursor-pointer rounded-lg border border-border-light bg-white px-4 py-2 text-xs text-foreground transition-colors hover:bg-gray-50">next</button>
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
              <span className="text-xs text-muted-foreground" style={{ marginLeft: 8 }}>Presenter</span>
            </div>
            <span className="text-xs text-primary">Showing 1-5 of 248 users</span>
          </div>
        </div>
      </div>
    </div>
  );
}
