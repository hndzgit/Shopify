"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, ShoppingBag, Users, DollarSign } from 'lucide-react';

const STATS = [
  { label: 'Total Revenue', value: '$124,500', icon: DollarSign, color: 'bg-green-500' },
  { label: 'Total Orders', value: '1,240', icon: ShoppingBag, color: 'bg-blue-500' },
  { label: 'Total Customers', value: '850', icon: Users, color: 'bg-purple-500' },
  { label: 'Active 3D Models', value: '42', icon: TrendingUp, color: 'bg-luxury-gold' },
];

export default function AdminDashboard() {
  return (
    <div className="space-y-12">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {STATS.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white p-6 rounded-2xl border border-neutral-100 shadow-sm flex items-center gap-6"
          >
            <div className={`w-12 h-12 rounded-xl ${stat.color} flex items-center justify-center text-white`}>
              <stat.icon size={24} />
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-neutral-400">{stat.label}</p>
              <p className="text-2xl font-display font-semibold">{stat.value}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Recent Activity & Charts Placeholder */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white p-8 rounded-3xl border border-neutral-100 shadow-sm min-h-[400px]">
          <h3 className="text-xl font-display font-semibold mb-8">Sales Performance</h3>
          <div className="w-full h-64 bg-neutral-50 rounded-2xl flex items-center justify-center text-neutral-400 italic">
            Chart visualization would go here
          </div>
        </div>
        <div className="bg-white p-8 rounded-3xl border border-neutral-100 shadow-sm min-h-[400px]">
          <h3 className="text-xl font-display font-semibold mb-8">Recent Orders</h3>
          <div className="space-y-6">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="flex items-center justify-between py-2 border-b border-neutral-50 last:border-0">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-neutral-100" />
                  <div>
                    <p className="text-sm font-medium">Order #123{i}</p>
                    <p className="text-xs text-neutral-400">2 mins ago</p>
                  </div>
                </div>
                <span className="text-sm font-semibold">$250.00</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
