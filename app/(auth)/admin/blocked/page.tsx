"use client";

import { AdminNavbar } from "@/components/admin/admin-navbar";
import { useLanguage } from "@/lib/i18n/context";

const blockedUsers = Array.from({ length: 7 }, (_, i) => ({
  id: i + 1,
  username: "Tel Aviv University",
  blockDate: "09/10/2026 | 16:00",
}));

export default function AdminBlockedPage() {
  const { t, direction } = useLanguage();

  return (
    <div className="min-h-screen bg-[#F7F9FC]" style={{ fontFamily: "'Heebo', sans-serif" }}>
      <AdminNavbar />

      <div dir={direction} style={{ padding: "30px 40px 60px" }}>
        {/* Header */}
        <div className="flex flex-col gap-2" style={{ marginBottom: 32 }}>
          <h1 className="text-[32px] leading-[1.1] text-foreground">{t.admin.blockedTitle}</h1>
          <p className="max-w-lg text-sm leading-[1.5] text-muted-foreground">
            {t.admin.blockedSubtitle}
          </p>
        </div>

        {/* Blocked users list */}
        <div className="flex flex-col" style={{ gap: 16 }}>
          {blockedUsers.map((user) => (
            <div
              key={user.id}
              className="flex items-center justify-between rounded-2xl border border-border-light bg-white"
              style={{ padding: "24px 32px" }}
            >
              {/* Username + date */}
              <div className="flex flex-col gap-1">
                <span className="text-sm text-foreground">{t.admin.username}: {user.username}</span>
                <span className="text-xs text-primary">{t.admin.blockingDateTime}: {user.blockDate}</span>
              </div>

              {/* Unblock button */}
              <button
                className="cursor-pointer rounded-xl text-sm text-white"
                style={{
                  padding: "12px 32px",
                  border: "none",
                  backgroundImage: "linear-gradient(168deg, #4C96FF 12%, #1667DB 94%)",
                  boxShadow: "0 4px 12px rgba(76, 150, 255, 0.3)",
                }}
              >
                {t.admin.unblockUser}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
