"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { MoreHorizontal, ChevronDown, Search } from "lucide-react";
import { AdminNavbar } from "@/components/admin/admin-navbar";

const bannerImages = ["/images/banner-1.jpg", "/images/banner-2.jpg", "/images/banner-3.jpg"];

const banners = Array.from({ length: 6 }, (_, i) => ({
  id: i + 1,
  name: "Teacher recruitment banner",
  creationDate: "08/10/26",
  content: "Lorem Ipsum Dolores...",
  placement: "upper",
  status: i === 0 || i === 5 ? "active" : "inactive",
  image: bannerImages[i % 3],
}));

export default function AdminAdvertisingPage() {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const [activeTab, setActiveTab] = useState<"website" | "advertisement">("website");
  const [openMenu, setOpenMenu] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-[#F7F9FC]" style={{ fontFamily: "'Abel', sans-serif" }}>
      <AdminNavbar />

      <div className="mx-auto max-w-[1375px]" style={{ padding: "30px 40px 60px" }}>
        {/* Header */}
        <div className="flex items-start justify-between" style={{ marginBottom: 28 }}>
          <div className="flex flex-col gap-3">
            <h1 className="text-[32px] leading-[1.1] text-foreground">Managing and defining<br />advertising banners</h1>
            <div className="flex items-center gap-3">
              <span className="text-sm text-muted-foreground">Please note:</span>
              <div className="inline-flex items-center gap-0 rounded-xl border border-[#D0D5DD] bg-[#F3F3F6]" style={{ padding: 4 }}>
                <button
                  onClick={() => setActiveTab("website")}
                  className="cursor-pointer border-none text-sm"
                  style={{
                    padding: "8px 28px",
                    background: activeTab === "website" ? "linear-gradient(168deg, #4C96FF 12%, #1667DB 94%)" : "transparent",
                    color: activeTab === "website" ? "white" : "#647787",
                    borderRadius: 8,
                  }}
                >
                  Website screen
                </button>
                <button
                  onClick={() => setActiveTab("advertisement")}
                  className="cursor-pointer border-none text-sm"
                  style={{
                    padding: "8px 28px",
                    background: activeTab === "advertisement" ? "white" : "transparent",
                    color: activeTab === "advertisement" ? "#0E1117" : "#647787",
                    boxShadow: activeTab === "advertisement" ? "0 1px 4px rgba(0,0,0,0.08)" : "none",
                    borderRadius: 8,
                  }}
                >
                  Advertisement screen
                </button>
              </div>
            </div>
          </div>
          <button
            onClick={() => router.push("/admin/advertising/create")}
            className="cursor-pointer rounded-xl text-sm text-white"
            style={{ padding: "12px 28px", border: "none", backgroundImage: "linear-gradient(168deg, #4C96FF 12%, #1667DB 94%)" }}
          >
            Create a new banner +
          </button>
        </div>

        {/* Table section */}
        <div className="rounded-2xl bg-white" style={{ padding: "24px 0" }}>
          {/* Filters */}
          <div className="flex items-center justify-between" style={{ padding: "0 28px", marginBottom: 16 }}>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2"><ChevronDown size={14} className="text-muted-foreground" /></div>
              <div className="flex cursor-pointer items-center gap-2 rounded-lg border border-border-light bg-[#F7F9FC] text-xs text-foreground" style={{ padding: "8px 14px" }}>
                <span>Banner placement</span><ChevronDown size={12} className="text-muted-foreground" />
              </div>
              <div className="flex cursor-pointer items-center gap-2 rounded-lg border border-border-light bg-[#F7F9FC] text-xs text-foreground" style={{ padding: "8px 14px" }}>
                <span>status</span><ChevronDown size={12} className="text-muted-foreground" />
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
                  <th style={{ padding: "12px 28px" }} className="text-start text-xs font-normal text-muted-foreground">image</th>
                  <th style={{ padding: "12px 16px" }} className="text-start text-xs font-normal text-muted-foreground">Banner name</th>
                  <th style={{ padding: "12px 16px" }} className="text-start text-xs font-normal text-muted-foreground">Creation date</th>
                  <th style={{ padding: "12px 16px" }} className="text-start text-xs font-normal text-muted-foreground">content</th>
                  <th style={{ padding: "12px 16px" }} className="text-start text-xs font-normal text-muted-foreground">Banner placement</th>
                  <th style={{ padding: "12px 16px" }} className="text-start text-xs font-normal text-muted-foreground">status</th>
                  <th style={{ padding: "12px 28px 12px 16px", width: 50 }} className="text-start text-xs font-normal text-muted-foreground"></th>
                </tr>
              </thead>
              <tbody>
                {banners.map((b) => (
                  <tr key={b.id} style={{ borderBottom: "1px solid #F3F3F6" }} className="transition-colors hover:bg-[#FAFBFD]">
                    <td style={{ padding: "10px 28px" }}>
                      <div className="h-12 w-24 overflow-hidden rounded-lg bg-[#E8EEF5]">
                        <img src={b.image} alt="" className="h-full w-full object-cover" />
                      </div>
                    </td>
                    <td style={{ padding: "14px 16px" }} className="text-sm text-foreground">{b.name}</td>
                    <td style={{ padding: "14px 16px" }} className="text-sm text-foreground">{b.creationDate}</td>
                    <td style={{ padding: "14px 16px" }} className="text-sm text-foreground">{b.content}</td>
                    <td style={{ padding: "14px 16px" }} className="text-sm text-foreground">{b.placement}</td>
                    <td style={{ padding: "14px 16px" }}>
                      <span
                        className="rounded-full text-[10px] text-white"
                        style={{
                          padding: "4px 14px",
                          background: b.status === "active" ? "#20AB7F" : "#FF676A",
                        }}
                      >
                        {b.status}
                      </span>
                    </td>
                    <td style={{ padding: "14px 28px 14px 16px" }}>
                      <div className="relative">
                        <button
                          onClick={() => setOpenMenu(openMenu === b.id ? null : b.id)}
                          className="flex cursor-pointer items-center justify-center border-none bg-transparent text-muted-foreground hover:text-foreground"
                        >
                          <MoreHorizontal size={18} />
                        </button>
                        {openMenu === b.id && (
                          <>
                            <div className="fixed inset-0 z-10" onClick={() => setOpenMenu(null)} />
                            <div className="absolute right-0 top-8 z-20 flex min-w-40 flex-col gap-1 rounded-xl border border-border-light bg-white shadow-lg" style={{ padding: "10px 14px" }}>
                              <button onClick={() => setOpenMenu(null)} className="flex w-full whitespace-nowrap py-1.5 text-start text-sm text-foreground transition-colors hover:text-primary">
                                {b.status === "active" ? "Play banner" : "Turn off banner"}
                              </button>
                              <button onClick={() => setOpenMenu(null)} className="flex w-full whitespace-nowrap py-1.5 text-start text-sm text-foreground transition-colors hover:text-primary">Edit banner</button>
                              <button onClick={() => setOpenMenu(null)} className="flex w-full whitespace-nowrap py-1.5 text-start text-sm text-red-400 transition-colors hover:text-red-600">Deleting a banner</button>
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
                  style={{ background: currentPage === p ? "#1E2334" : "transparent", color: currentPage === p ? "white" : "#0E1117" }}
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
