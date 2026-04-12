'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export default function AboutPage() {
  return (
    <div className="pt-32 pb-32 relative z-10 bg-white text-black opacity-0 animate-fade-up">
      {/* Article Header */}
      <div className="max-w-4xl mx-auto px-6 text-center mb-24 mt-12">
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="text-neutral-500 font-bold tracking-widest uppercase text-xs mb-6"
        >
          Company Vision
        </motion.p>
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-6xl md:text-8xl font-black tracking-tighter mb-8 text-black"
        >
          The Future of Retail
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-xl md:text-2xl text-neutral-600 font-light leading-relaxed max-w-3xl mx-auto"
        >
          Lumina Tech is not just an electronics retailer. We are an ecosystem dedicated to merging cutting-edge hardware with unparalleled digital experiences.
        </motion.p>
      </div>

      {/* Editorial Chapter 1 */}
      <article className="max-w-4xl mx-auto px-6 space-y-32">
        
        <section className="relative">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1 }}
            className="w-full aspect-[21/9] bg-neutral-100 rounded-[2rem] overflow-hidden mb-12 relative border border-neutral-200 shadow-sm"
          >
            <div className="absolute inset-0 bg-black/5 z-10" />
            <img src="https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=2071&auto=format&fit=crop" alt="The Genesis" className="w-full h-full object-cover absolute inset-0 z-0 mix-blend-multiply" />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
            <div className="md:col-span-4 translate-y-2">
              <h2 className="text-3xl font-black text-black tracking-tight">01. The Genesis</h2>
              <div className="w-12 h-1 bg-neutral-900 mt-6 rounded-full" />
            </div>
            <div className="md:col-span-8 prose prose-lg text-neutral-600 leading-relaxed font-medium">
              <p>
                Founded at the intersection of design and advanced engineering, Lumina Tech was born out of a simple frustration: online shopping for high-end technology feels disconnected. When you are buying a machine capable of rendering worlds or processing neural networks, a flat 2D image simply doesn’t do it justice.
              </p>
              <p>
                We realized that the future of commerce isn't just about faster logistics, but richer interactions. We wanted to build a platform where the digital representation of a product holds the same gravity as holding it in your hands.
              </p>
            </div>
          </div>
        </section>

        {/* Editorial Chapter 2 */}
        <section className="relative">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1 }}
            className="w-full aspect-[21/9] bg-neutral-100 rounded-[2rem] overflow-hidden mb-12 relative border border-neutral-200 shadow-sm"
          >
             <div className="absolute inset-0 bg-black/5 z-10" />
             <img src="https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?q=80&w=2070&auto=format&fit=crop" alt="Innovation" className="w-full h-full object-cover absolute inset-0 z-0 mix-blend-multiply" />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
            <div className="md:col-span-4 translate-y-2">
              <h2 className="text-3xl font-black text-black tracking-tight">02. Modern UI Standard</h2>
              <div className="w-12 h-1 bg-neutral-900 mt-6 rounded-full" />
            </div>
            <div className="md:col-span-8 prose prose-lg text-neutral-600 leading-relaxed font-medium">
              <p>
                Central to our philosophy is the integration of high aesthetic design directly into your browser. By utilizing the <strong>Shopify Storefront API</strong> wrapped inside lightning-fast Next.js architecture, we pull live hardware data seamlessly into a high-converting, pristine sales page layout.
              </p>
              <p>
                Before checking out, our customers can virtually interact with their devices. We believe a friction-free purchase starts with a clean and flawless visual experience natively on your mobile phone or enterprise desktop.
              </p>
            </div>
          </div>
        </section>

        {/* Editorial Chapter 3 */}
        <section className="relative pb-20">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
            <div className="md:col-span-4 translate-y-2">
              <h2 className="text-3xl font-black text-black tracking-tight">03. Curated Ecosystem</h2>
              <div className="w-12 h-1 bg-neutral-900 mt-6 rounded-full" />
            </div>
            <div className="md:col-span-8 prose prose-lg text-neutral-600 leading-relaxed font-medium">
              <p>
                We do not sell everything. Lumina operates on a strict curation model. Every gadget featured on our platform has been rigorously selected by our team for performance efficiency, software architecture, and aesthetic longevity.
              </p>
              <p className="font-black text-black text-2xl mt-8 italic">
                "We believe that technology should fade into the background, empowering you to create, live, and work without friction."
              </p>
              
              <div className="mt-12 flex gap-4">
                <Link href="/collections/all">
                  <button className="px-8 py-4 bg-neutral-900 text-white font-bold uppercase tracking-widest text-xs rounded-full hover:scale-105 transition-all shadow-md">
                    View Devices
                  </button>
                </Link>
                <Link href="/contact">
                  <button className="px-8 py-4 bg-white border border-neutral-300 text-neutral-900 font-bold uppercase tracking-widest text-xs rounded-full hover:bg-neutral-50 transition-colors shadow-sm">
                    Contact Us
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </section>

      </article>
    </div>
  );
}
