"use client";

import { useState } from "react";
import { EmployerNavbar } from "@/components/dashboard/employer-navbar";
import { EmployerFooter } from "@/components/dashboard/employer-footer";
import { CreateJobModal } from "@/components/dashboard/create-job-modal";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [createJobOpen, setCreateJobOpen] = useState(false);

  return (
    <div className="flex min-h-screen flex-col bg-[#F7F9FC]">
      <style>{`.lang-switcher-global { display: none !important; }`}</style>
      <EmployerNavbar onPostJob={() => setCreateJobOpen(true)} />
      <main className="flex-1">{children}</main>
      <EmployerFooter />
      <CreateJobModal open={createJobOpen} onOpenChange={setCreateJobOpen} />
    </div>
  );
}
