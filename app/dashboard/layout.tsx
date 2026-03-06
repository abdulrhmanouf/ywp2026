"use client";

import { DashboardSidebar } from "@/components/dashboard/sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      <div className="flex-1 overflow-auto">
        <div className="mx-auto max-w-7xl px-4 py-6 pt-16 sm:px-6 lg:px-8 lg:pt-6">
          {children}
        </div>
      </div>
      <DashboardSidebar />
    </div>
  );
}
