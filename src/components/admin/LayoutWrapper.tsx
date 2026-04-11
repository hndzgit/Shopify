import React from 'react';
import { AdminSidebar, AdminHeader } from '@/src/components/admin/AdminLayout';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-neutral-50 flex">
      <AdminSidebar />
      <div className="flex-1 ml-64">
        <AdminHeader title="Dashboard Overview" />
        <main className="p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
