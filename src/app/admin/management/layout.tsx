import AdminNavigation from "@/components/ui/admin/navigation-admin";
import React from "react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AdminNavigation>
      <div className="flex flex-1 flex-col gap-4 p-4 md:gap-6 md:p-6 mt-14">
        {children}
      </div>
    </AdminNavigation>
  );
}
