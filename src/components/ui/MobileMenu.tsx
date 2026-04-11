'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import Link from 'next/link';

export default function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="md:hidden flex items-center pr-2">
      <button 
        onClick={() => setIsOpen(true)}
        className="p-2 hover:bg-white/10 text-white rounded-full transition-colors"
      >
        <Menu size={24} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-50 bg-[#050505] flex flex-col px-6 py-8 h-[100dvh]"
          >
            <div className="flex justify-between items-center mb-16">
              <Link href="/" onClick={() => setIsOpen(false)} className="text-2xl font-black tracking-tighter text-white">LUMINA TECH</Link>
              <button onClick={() => setIsOpen(false)} className="p-2 bg-white/5 rounded-full text-white">
                <X size={24} />
              </button>
            </div>

            <nav className="flex flex-col gap-8 text-2xl font-black tracking-tighter uppercase">
              <Link href="/collections/all" onClick={() => setIsOpen(false)} className="text-blue-400 hover:text-white transition-colors">Devices</Link>
              <Link href="/about" onClick={() => setIsOpen(false)} className="text-blue-400 hover:text-white transition-colors">Vision</Link>
              <Link href="/contact" onClick={() => setIsOpen(false)} className="text-blue-400 hover:text-white transition-colors">Contact</Link>
            </nav>

            <div className="mt-auto pb-4 text-neutral-500 text-sm">
                <p>Support: 0846463736</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
