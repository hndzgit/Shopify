"use client";

import React from 'react';
import { LayoutDashboard, ShoppingBag, Box, ShoppingCart, Users, Settings, LogOut, Plus } from 'lucide-react';
import { motion } from 'framer-motion';

const MENU_ITEMS = [
  { icon: LayoutDashboard, label: 'Dashboard', href: '/admin/dashboard' },
  { icon: ShoppingBag, label: 'Products', href: '/admin/products' },
  { icon: Box, label: '3D Models', href: '/admin/models' },
  { icon: ShoppingCart, label: 'Orders', href: '/admin/orders' },
  { icon: Users, label: 'Customers', href: '/admin/customers' },
  { icon: Settings, label: 'Settings', href: '/admin/settings' },
];

export function AdminSidebar() {
  return (
    <aside className="w-64 h-screen bg-luxury-black text-white flex flex-col fixed left-0 top-0 z-50">
      <div className="p-8">
        <h1 className="text-2xl font-display font-bold tracking-tighter">LUMINA <span className="text-xs font-light text-neutral-500">ADMIN</span></h1>
      </div>

      <nav className="flex-1 px-4 space-y-2">
        {MENU_ITEMS.map((item) => (
          <a
            key={item.label}
            href={item.href}
            className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/10 transition-colors text-sm font-medium group"
          >
            <item.icon size={18} className="text-neutral-500 group-hover:text-white transition-colors" />
            {item.label}
          </a>
        ))}
      </nav>

      <div className="p-4 border-t border-white/10">
        <button className="flex items-center gap-3 px-4 py-3 w-full rounded-xl hover:bg-red-500/10 text-red-500 transition-colors text-sm font-medium">
          <LogOut size={18} />
          Sign Out
        </button>
      </div>
    </aside>
  );
}

export function AdminHeader({ title }: { title: string }) {
  return (
    <header className="h-20 bg-white border-b border-neutral-100 flex items-center justify-between px-8 sticky top-0 z-40">
      <h2 className="text-xl font-display font-semibold">{title}</h2>
      <div className="flex items-center gap-4">
        <button className="bg-black text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 hover:bg-neutral-800 transition-colors">
          <Plus size={16} />
          New Product
        </button>
        <div className="w-10 h-10 rounded-full bg-neutral-100 flex items-center justify-center font-bold text-xs">
          AD
        </div>
      </div>
    </header>
  );
}
