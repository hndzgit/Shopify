"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ShoppingBag, ArrowRight, Star } from 'lucide-react';
import ProductViewer from '@/src/components/3d/ProductViewer';
import { useCartStore } from '@/src/store/useCartStore';

// Mock data for demonstration since we don't have a real Shopify store connected
const MOCK_PRODUCT = {
  id: 'gid://shopify/Product/1',
  title: 'Aura Sculpt Chair',
  handle: 'aura-sculpt-chair',
  description: 'A masterpiece of modern design, the Aura Sculpt Chair blends ergonomic comfort with avant-garde aesthetics. Crafted from sustainable materials and finished with a premium matte texture.',
  price: '1,250.00',
  modelUrl: 'https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/SheenChair/glTF-Binary/SheenChair.glb',
  image: 'https://picsum.photos/seed/chair/800/800',
  variants: [
    { id: 'v1', title: 'Matte Black', price: '1250.00' },
    { id: 'v2', title: 'Cloud White', price: '1250.00' },
  ]
};

export default function App() {
  const [selectedVariant, setSelectedVariant] = useState(MOCK_PRODUCT.variants[0]);
  const addItem = useCartStore((state) => state.addItem);

  const handleAddToCart = () => {
    addItem({
      variantId: selectedVariant.id,
      quantity: 1,
      title: MOCK_PRODUCT.title,
      handle: MOCK_PRODUCT.handle,
      price: selectedVariant.price,
      image: MOCK_PRODUCT.image,
    });
  };

  return (
    <div className="min-h-screen pt-20">
      <main className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* 3D Viewer Section - 70% height on desktop */}
          <div className="lg:col-span-8 h-[60vh] lg:h-[80vh] sticky top-32">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="w-full h-full"
            >
              <ProductViewer modelUrl={MOCK_PRODUCT.modelUrl} />
            </motion.div>
          </div>

          {/* Product Info Section */}
          <div className="lg:col-span-4 space-y-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="space-y-4"
            >
              <div className="flex items-center gap-2 text-luxury-gold">
                <div className="flex">
                  {[...Array(5)].map((_, i) => <Star key={i} size={14} fill="currentColor" />)}
                </div>
                <span className="text-xs font-medium tracking-widest uppercase">Premium Collection</span>
              </div>
              <h1 className="text-5xl font-display font-light leading-tight">
                {MOCK_PRODUCT.title}
              </h1>
              <p className="text-2xl font-display text-neutral-500">
                ${selectedVariant.price}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="space-y-6"
            >
              <p className="text-neutral-600 leading-relaxed">
                {MOCK_PRODUCT.description}
              </p>

              <div className="space-y-4">
                <span className="text-xs font-bold uppercase tracking-widest text-neutral-400">Finish</span>
                <div className="flex gap-3">
                  {MOCK_PRODUCT.variants.map((v) => (
                    <button
                      key={v.id}
                      onClick={() => setSelectedVariant(v)}
                      className={`px-6 py-3 rounded-xl border-2 transition-all text-sm font-medium ${
                        selectedVariant.id === v.id 
                        ? 'border-black bg-black text-white' 
                        : 'border-neutral-100 hover:border-neutral-300'
                      }`}
                    >
                      {v.title}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="pt-6 space-y-4"
            >
              <button 
                onClick={handleAddToCart}
                className="w-full bg-black text-white py-5 rounded-2xl font-semibold flex items-center justify-center gap-3 hover:bg-neutral-800 transition-all group"
              >
                <ShoppingBag size={20} />
                Add to Cart
                <ArrowRight size={18} className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
              </button>
              <p className="text-center text-xs text-neutral-400">
                Free worldwide shipping on all premium orders.
              </p>
            </motion.div>

            {/* Features Grid */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="grid grid-cols-2 gap-4 pt-12 border-t border-neutral-100"
            >
              <div className="space-y-1">
                <h4 className="text-sm font-bold">Material</h4>
                <p className="text-xs text-neutral-500">Recycled Carbon Fiber</p>
              </div>
              <div className="space-y-1">
                <h4 className="text-sm font-bold">Warranty</h4>
                <p className="text-xs text-neutral-500">10 Year Limited</p>
              </div>
              <div className="space-y-1">
                <h4 className="text-sm font-bold">Dimensions</h4>
                <p className="text-xs text-neutral-500">85cm x 60cm x 55cm</p>
              </div>
              <div className="space-y-1">
                <h4 className="text-sm font-bold">Weight</h4>
                <p className="text-xs text-neutral-500">4.2 kg (Ultra Light)</p>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Featured Collections Section */}
        <section className="py-24 space-y-12">
          <div className="flex items-end justify-between">
            <div className="space-y-4">
              <h2 className="text-4xl font-display font-light">Featured Collections</h2>
              <p className="text-neutral-500 max-w-md">Explore our curated selection of avant-garde furniture designed for the modern sanctuary.</p>
            </div>
            <a href="#" className="text-sm font-bold uppercase tracking-widest border-b-2 border-black pb-1">View All</a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: 'The Noir Series', image: 'https://picsum.photos/seed/noir/800/1000', category: 'Seating' },
              { title: 'Lumina Lighting', image: 'https://picsum.photos/seed/light/800/1000', category: 'Lighting' },
              { title: 'Ethereal Tables', image: 'https://picsum.photos/seed/table/800/1000', category: 'Tables' },
            ].map((collection, i) => (
              <motion.div 
                key={i}
                whileHover={{ y: -10 }}
                className="group cursor-pointer space-y-4"
              >
                <div className="aspect-[4/5] overflow-hidden rounded-3xl bg-neutral-100">
                  <img 
                    src={collection.image} 
                    alt={collection.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="space-y-1">
                  <p className="text-xs font-bold uppercase tracking-widest text-neutral-400">{collection.category}</p>
                  <h3 className="text-xl font-display font-medium">{collection.title}</h3>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-luxury-black text-white py-24">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="md:col-span-2 space-y-8">
            <h2 className="text-3xl font-display font-semibold tracking-tighter">LUMINA</h2>
            <p className="text-neutral-400 max-w-sm">
              Redefining luxury through the lens of modern technology and sustainable craftsmanship.
            </p>
            <div className="flex gap-4">
              {['Instagram', 'Twitter', 'Pinterest'].map(social => (
                <a key={social} href="#" className="text-sm text-neutral-500 hover:text-white transition-colors">{social}</a>
              ))}
            </div>
          </div>
          <div className="space-y-6">
            <h4 className="text-xs font-bold uppercase tracking-widest text-neutral-500">Shop</h4>
            <ul className="space-y-4 text-sm">
              <li><a href="#" className="hover:text-luxury-gold transition-colors">All Products</a></li>
              <li><a href="#" className="hover:text-luxury-gold transition-colors">Collections</a></li>
              <li><a href="#" className="hover:text-luxury-gold transition-colors">New Arrivals</a></li>
            </ul>
          </div>
          <div className="space-y-6">
            <h4 className="text-xs font-bold uppercase tracking-widest text-neutral-500">Support</h4>
            <ul className="space-y-4 text-sm">
              <li><a href="#" className="hover:text-luxury-gold transition-colors">Shipping</a></li>
              <li><a href="#" className="hover:text-luxury-gold transition-colors">Returns</a></li>
              <li><a href="#" className="hover:text-luxury-gold transition-colors">Contact</a></li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-6 pt-24 mt-24 border-t border-white/10 flex flex-col md:flex-row justify-between gap-4 text-xs text-neutral-500">
          <p>© 2026 LUMINA LUXURY. ALL RIGHTS RESERVED.</p>
          <div className="flex gap-8">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
