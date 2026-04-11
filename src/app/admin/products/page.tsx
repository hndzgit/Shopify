"use client";

import React from 'react';
import LayoutWrapper from '@/src/components/admin/LayoutWrapper';
import { motion } from 'framer-motion';
import { Edit2, Trash2, ExternalLink, Box } from 'lucide-react';

const MOCK_PRODUCTS = [
  { id: '1', title: 'Aura Sculpt Chair', price: '$1,250.00', status: 'Active', has3D: true, image: 'https://picsum.photos/seed/chair/100/100' },
  { id: '2', title: 'Lumina Pendant Light', price: '$450.00', status: 'Active', has3D: true, image: 'https://picsum.photos/seed/light/100/100' },
  { id: '3', title: 'Ethereal Coffee Table', price: '$2,100.00', status: 'Draft', has3D: false, image: 'https://picsum.photos/seed/table/100/100' },
  { id: '4', title: 'Noir Velvet Sofa', price: '$3,800.00', status: 'Active', has3D: true, image: 'https://picsum.photos/seed/sofa/100/100' },
];

export default function AdminProducts() {
  return (
    <LayoutWrapper>
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-display font-light">Products</h1>
            <p className="text-neutral-500 mt-2">Manage your inventory and 3D visualization assets.</p>
          </div>
          <div className="flex gap-4">
            <input 
              type="text" 
              placeholder="Search products..." 
              className="px-4 py-2 rounded-xl border border-neutral-200 outline-none focus:border-black transition-colors w-64"
            />
          </div>
        </div>

        <div className="bg-white rounded-3xl border border-neutral-100 shadow-sm overflow-hidden">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-neutral-50 border-b border-neutral-100">
                <th className="px-8 py-4 text-xs font-bold uppercase tracking-widest text-neutral-400">Product</th>
                <th className="px-8 py-4 text-xs font-bold uppercase tracking-widest text-neutral-400">Price</th>
                <th className="px-8 py-4 text-xs font-bold uppercase tracking-widest text-neutral-400">Status</th>
                <th className="px-8 py-4 text-xs font-bold uppercase tracking-widest text-neutral-400">3D Model</th>
                <th className="px-8 py-4 text-xs font-bold uppercase tracking-widest text-neutral-400 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-50">
              {MOCK_PRODUCTS.map((product) => (
                <tr key={product.id} className="hover:bg-neutral-50/50 transition-colors">
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-neutral-100 overflow-hidden">
                        <img src={product.image} alt={product.title} className="w-full h-full object-cover" />
                      </div>
                      <span className="font-medium">{product.title}</span>
                    </div>
                  </td>
                  <td className="px-8 py-6 text-sm text-neutral-600">{product.price}</td>
                  <td className="px-8 py-6">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${
                      product.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-neutral-100 text-neutral-500'
                    }`}>
                      {product.status}
                    </span>
                  </td>
                  <td className="px-8 py-6">
                    {product.has3D ? (
                      <div className="flex items-center gap-2 text-luxury-gold">
                        <Box size={16} />
                        <span className="text-xs font-medium">Enabled</span>
                      </div>
                    ) : (
                      <span className="text-xs text-neutral-400">None</span>
                    )}
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex items-center justify-end gap-2">
                      <button className="p-2 hover:bg-neutral-100 rounded-lg transition-colors text-neutral-500">
                        <Edit2 size={16} />
                      </button>
                      <button className="p-2 hover:bg-neutral-100 rounded-lg transition-colors text-neutral-500">
                        <ExternalLink size={16} />
                      </button>
                      <button className="p-2 hover:bg-neutral-100 rounded-lg transition-colors text-red-500">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </LayoutWrapper>
  );
}
