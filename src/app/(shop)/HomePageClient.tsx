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


    </div>
  );
}
