"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Save, Upload, Eye, X, Loader2 } from 'lucide-react';
import ProductViewer from '@/src/components/3d/ProductViewer';
import { createShopifyProduct } from '@/src/app/admin/products/actions';

export function ProductForm({ initialData }: { initialData?: any }) {
  const [modelUrl, setModelUrl] = useState(initialData?.modelUrl || '');
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage(null);

    const formData = new FormData(e.currentTarget);
    formData.append('modelUrl', modelUrl);

    const result = await createShopifyProduct(formData);

    if (result.error) {
      setMessage({ type: 'error', text: result.error });
    } else {
      setMessage({ type: 'success', text: 'Product successfully synced with Shopify!' });
      if (!initialData) {
        (e.target as HTMLFormElement).reset();
        setModelUrl('');
      }
    }
    setIsSubmitting(false);
  };

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2 space-y-6">
        {message && (
          <div className={`p-4 rounded-xl text-sm font-medium ${
            message.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
          }`}>
            {message.text}
          </div>
        )}
        {/* Basic Info */}
        <div className="bg-white p-8 rounded-2xl border border-neutral-100 shadow-sm space-y-6">
          <h3 className="font-display font-semibold text-lg">General Information</h3>
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-neutral-400">Product Title</label>
              <input 
                name="title"
                type="text" 
                required
                defaultValue={initialData?.title}
                className="w-full px-4 py-3 rounded-xl border border-neutral-200 focus:border-black outline-none transition-colors"
                placeholder="e.g. Aura Sculpt Chair"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-neutral-400">Description</label>
              <textarea 
                name="description"
                defaultValue={initialData?.description}
                className="w-full px-4 py-3 rounded-xl border border-neutral-200 focus:border-black outline-none transition-colors min-h-[200px]"
                placeholder="Describe your masterpiece..."
              />
            </div>
          </div>
        </div>

        {/* Pricing & Inventory */}
        <div className="bg-white p-8 rounded-2xl border border-neutral-100 shadow-sm grid grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-neutral-400">Price ($)</label>
            <input 
              name="price"
              type="number" 
              step="0.01"
              required
              defaultValue={initialData?.price}
              className="w-full px-4 py-3 rounded-xl border border-neutral-200 focus:border-black outline-none" 
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-neutral-400">SKU</label>
            <input 
              name="sku"
              type="text" 
              className="w-full px-4 py-3 rounded-xl border border-neutral-200 focus:border-black outline-none" 
            />
          </div>
        </div>

        {/* 3D Model Configuration */}
        <div className="bg-white p-8 rounded-2xl border border-neutral-100 shadow-sm space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="font-display font-semibold text-lg">3D Visualization</h3>
            {modelUrl && (
              <button 
                type="button"
                onClick={() => setIsPreviewOpen(true)}
                className="text-xs font-bold uppercase tracking-widest flex items-center gap-2 hover:text-luxury-gold transition-colors"
              >
                <Eye size={14} /> Preview Model
              </button>
            )}
          </div>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-neutral-400">Model URL (.glb)</label>
              <input 
                type="url"
                value={modelUrl}
                onChange={(e) => setModelUrl(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-neutral-200 focus:border-black outline-none"
                placeholder="https://example.com/model.glb"
              />
            </div>
            <div className="border-2 border-dashed border-neutral-200 rounded-2xl p-12 flex flex-col items-center justify-center gap-4 hover:border-black transition-colors cursor-pointer group">
              <div className="w-12 h-12 rounded-full bg-neutral-50 flex items-center justify-center group-hover:bg-black group-hover:text-white transition-colors">
                <Upload size={20} />
              </div>
              <div className="text-center">
                <p className="font-medium">Upload .glb file</p>
                <p className="text-xs text-neutral-400">Vercel Blob integration placeholder</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sidebar Actions */}
      <div className="space-y-6">
        <div className="bg-white p-8 rounded-2xl border border-neutral-100 shadow-sm space-y-6">
          <h3 className="font-display font-semibold text-lg">Status</h3>
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 rounded-full bg-green-500" />
            <span className="text-sm font-medium">Active</span>
          </div>
          <button 
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-black text-white py-4 rounded-xl font-semibold flex items-center justify-center gap-2 hover:bg-neutral-800 transition-colors disabled:bg-neutral-400"
          >
            {isSubmitting ? <Loader2 className="animate-spin" size={18} /> : <Save size={18} />}
            {isSubmitting ? 'Syncing...' : 'Save & Publish'}
          </button>
        </div>

        <div className="bg-white p-8 rounded-2xl border border-neutral-100 shadow-sm space-y-4">
          <h3 className="font-display font-semibold text-lg">Organization</h3>
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-neutral-400">Collection</label>
            <select className="w-full px-4 py-3 rounded-xl border border-neutral-200 outline-none">
              <option>Seating</option>
              <option>Lighting</option>
              <option>Tables</option>
            </select>
          </div>
        </div>
      </div>

      {/* 3D Preview Modal */}
      {isPreviewOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-12 bg-black/90 backdrop-blur-md">
          <button 
            type="button"
            onClick={() => setIsPreviewOpen(false)}
            className="absolute top-8 right-8 text-white hover:text-luxury-gold transition-colors"
          >
            <X size={32} />
          </button>
          <div className="w-full max-w-5xl aspect-video rounded-3xl overflow-hidden bg-white">
            <ProductViewer modelUrl={modelUrl || 'https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/SheenChair/glTF-Binary/SheenChair.glb'} />
          </div>
        </div>
      )}
    </form>
  );
}
