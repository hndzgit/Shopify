'use client';

import Link from 'next/link';
import ProductViewer from '@/src/components/3d/ProductViewer';
import { motion } from 'framer-motion';

export default function HomePageClient({ featuredProduct }: { featuredProduct: any }) {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative h-screen flex flex-col justify-center items-center overflow-hidden">
        <div className="absolute inset-0 z-10 opacity-40 bg-[url('https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80')] bg-cover bg-center" />
        <div className="absolute inset-0 z-10 bg-gradient-to-t from-black via-transparent to-black/50" />
        
        <div className="z-20 flex flex-col items-center text-center max-w-4xl mx-auto mt-[-5vh]">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter text-white mb-6 uppercase"
          >
            Future <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">Solutions</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
            className="text-xl md:text-2xl text-neutral-300 font-light mb-10 max-w-2xl"
          >
            Experience the pinnacle of hardware engineering. Explore devices in immersive 3D directly from your browser.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Link href="/collections/all">
              <button className="px-10 py-5 bg-white text-black rounded-full font-bold uppercase tracking-widest text-sm hover:scale-105 transition-transform shadow-[0_0_30px_rgba(255,255,255,0.3)]">
                Explore Lab
              </button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Featured 3D Section */}
      <section className="py-32 bg-black relative z-20 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16">
            <div>
              <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-white mb-4">Innovation Showcase</h2>
              <p className="text-neutral-400 text-lg max-w-xl">
                Interact with the {featuredProduct ? featuredProduct.title : 'Sony BoomBox XG500'} in a fully rendered 3D space. Drag, zoom, and inspect every detail.
              </p>
            </div>
            <Link href={featuredProduct ? `/products/${featuredProduct.handle}` : '/collections/all'} className="hidden md:block">
               <button className="px-6 py-3 border border-white/20 text-white rounded-full font-medium hover:bg-white hover:text-black transition-colors uppercase tracking-widest text-sm">
                 View Specs →
               </button>
            </Link>
          </div>
          
          {featuredProduct && featuredProduct.modelUrl ? (
             <div className="h-[50vh] md:h-[80vh] w-full rounded-3xl overflow-hidden shadow-2xl relative bg-[#111111] cursor-grab active:cursor-grabbing border border-neutral-800">
               <ProductViewer modelUrl={featuredProduct.modelUrl} autoRotate={true} />
               <div className="absolute bottom-8 left-8 bg-black/80 backdrop-blur-md px-6 py-3 rounded-full text-sm font-semibold flex items-center gap-2 shadow-lg border border-neutral-800 text-white">
                  Drag to rotate 360°
               </div>
             </div>
          ) : (
             <div className="h-[50vh] md:h-[80vh] w-full rounded-3xl flex flex-col items-center justify-center bg-[#111111] border border-neutral-800 border-dashed text-neutral-400">
                <span className="text-5xl mb-4">🚀</span>
                <p>Syncing 3D configurations from Shopify...</p>
             </div>
          )}
        </div>
      </section>
    </div>
  );
}
