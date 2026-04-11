'use client';

import { motion } from 'framer-motion';

export default function ContactPage() {
  return (
    <div className="pt-32 pb-32 relative z-10 bg-[#050505] text-white">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-8 uppercase">Reach <br/> Out</h1>
          <p className="text-xl text-neutral-400 mb-12 font-light">
            Whether you have a question about device specifications, global shipping, or wholesale inquiries, our dedicated engineering team is here to assist you.
          </p>
          
          <div className="space-y-8">
            <div>
              <h3 className="text-sm font-bold uppercase tracking-widest text-neutral-500 mb-2">Experience Center</h3>
              <p className="text-lg text-neutral-300">Hanoi, Vietnam</p>
            </div>
            <div>
              <h3 className="text-sm font-bold uppercase tracking-widest text-neutral-500 mb-2">Support Helpline</h3>
              <p className="text-lg text-neutral-300">0846463736</p>
            </div>
            <div>
              <h3 className="text-sm font-bold uppercase tracking-widest text-neutral-500 mb-2">Partner Inquiries</h3>
              <p className="text-lg text-neutral-300">hoainamtran.socialnetwork@gmail.com</p>
            </div>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="bg-[#0a0a0a] p-8 md:p-12 rounded-3xl border border-white/5 shadow-[0_0_50px_rgba(0,0,0,0.5)]"
        >
          <form className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-neutral-400 mb-2">Full Name</label>
              <input type="text" className="w-full bg-[#111] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors" placeholder="John Doe" />
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-400 mb-2">Email Address</label>
              <input type="email" className="w-full bg-[#111] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors" placeholder="john@example.com" />
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-400 mb-2">Message</label>
              <textarea rows={4} className="w-full bg-[#111] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors" placeholder="How can we help you?"></textarea>
            </div>
            <button type="submit" className="w-full px-8 py-4 bg-white text-black font-bold uppercase tracking-widest text-sm rounded-xl hover:bg-neutral-200 transition-colors mt-4">
              Send Message
            </button>
          </form>
        </motion.div>

      </div>
    </div>
  );
}
