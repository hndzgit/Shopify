'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export default function AboutPage() {
  return (
    <div className="pt-32 pb-32 relative z-10 bg-[#050505] text-white">
      {/* Article Header */}
      <div className="max-w-4xl mx-auto px-6 text-center mb-24 mt-12">
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="text-blue-500 font-bold tracking-widest uppercase text-sm mb-6"
        >
          Company Vision
        </motion.p>
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-6xl md:text-8xl font-black tracking-tighter mb-8 text-transparent bg-clip-text bg-gradient-to-br from-white to-neutral-600"
        >
          Engineering the Future of Retail
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-xl md:text-2xl text-neutral-400 font-light leading-relaxed max-w-3xl mx-auto"
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
            className="w-full aspect-[21/9] bg-neutral-900 rounded-3xl overflow-hidden mb-12 relative border border-white/5 shadow-2xl"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent z-10" />
            <div className="w-full h-full object-cover bg-[url('https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=2000')] bg-cover bg-center" />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
            <div className="md:col-span-4 translate-y-2">
              <h2 className="text-3xl font-bold text-white tracking-tight">01. The Genesis</h2>
              <div className="w-12 h-1 bg-blue-500 mt-6 rounded-full" />
            </div>
            <div className="md:col-span-8 prose prose-invert prose-lg text-neutral-400 leading-relaxed">
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
            className="w-full aspect-[21/9] bg-neutral-900 rounded-3xl overflow-hidden mb-12 relative border border-white/5 shadow-2xl"
          >
             <div className="absolute inset-0 bg-blue-500/20 mix-blend-overlay z-10" />
             <div className="w-full h-full object-cover bg-[url('https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?auto=format&fit=crop&q=80&w=2000')] bg-cover bg-center" />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
            <div className="md:col-span-4 translate-y-2">
              <h2 className="text-3xl font-bold text-white tracking-tight">02. The 3D Revolution</h2>
              <div className="w-12 h-1 bg-emerald-500 mt-6 rounded-full" />
            </div>
            <div className="md:col-span-8 prose prose-invert prose-lg text-neutral-400 leading-relaxed">
              <p>
                Central to our philosophy is the integration of WebGL and cinematic 3D engines directly into your browser. By utilizing the <strong>Shopify Storefront API</strong> wrapped inside lightning-fast Next.js architecture, we pull live 3D configuration data seamlessly.
              </p>
              <p>
                Before checking out, our customers can physically interact with their devices. You can spin the chassis of a laptop, inspect the acoustic mesh of a smart speaker, or view the anodized titanium edges of a smartphone under virtual lighting. This guarantees absolute confidence in every purchase.
              </p>
            </div>
          </div>
        </section>

        {/* Editorial Chapter 3 */}
        <section className="relative pb-20">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
            <div className="md:col-span-4 translate-y-2">
              <h2 className="text-3xl font-bold text-white tracking-tight">03. Curated Ecosystem</h2>
              <div className="w-12 h-1 bg-purple-500 mt-6 rounded-full" />
            </div>
            <div className="md:col-span-8 prose prose-invert prose-lg text-neutral-400 leading-relaxed">
              <p>
                We do not sell everything. Lumina operates on a strict curation model. Every gadget featured on our platform has been rigorously tested by our engineers for thermal efficiency, software architecture, and aesthetic longevity.
              </p>
              <p className="font-medium text-white text-xl mt-8">
                "We believe that technology should fade into the background, empowering you to create, live, and work without friction."
              </p>
              
              <div className="mt-12 flex gap-4">
                <Link href="/collections/all">
                  <button className="px-8 py-4 bg-white text-black font-bold uppercase tracking-widest text-sm rounded-full hover:bg-neutral-200 transition-colors">
                    View Devices
                  </button>
                </Link>
                <Link href="/contact">
                  <button className="px-8 py-4 bg-transparent border border-white/20 text-white font-bold uppercase tracking-wider text-sm rounded-full hover:bg-white/10 transition-colors">
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
