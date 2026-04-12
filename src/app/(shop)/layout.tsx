'use client';

import { ReactNode } from "react";
import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import { useCartStore } from "@/src/store/useCartStore";
import CartDrawer from "@/src/components/ui/CartDrawer";
import MobileMenu from "@/src/components/ui/MobileMenu";

function Header() {
  const { setCartOpen, items } = useCartStore();
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-black/60 backdrop-blur-xl border-b border-white/5">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between relative">
        <div className="flex items-center">
          <MobileMenu />
          <Link href="/" className="text-2xl font-black tracking-tighter text-white">LUMINA</Link>
        </div>
        <nav className="hidden md:flex gap-8 text-sm font-medium absolute left-1/2 -translate-x-1/2">
          <Link href="/collections/all" className="text-neutral-400 hover:text-white transition-colors">Devices</Link>
          <Link href="/about" className="text-neutral-400 hover:text-white transition-colors">Vision</Link>
          <Link href="/contact" className="text-neutral-400 hover:text-white transition-colors">Contact</Link>
        </nav>
        <div className="flex items-center gap-4">
          <button 
            onClick={() => setCartOpen(true)}
            className="p-2 hover:bg-white/10 text-white rounded-full transition-colors relative"
          >
            <ShoppingBag size={20} />
            {totalItems > 0 && (
              <span className="absolute top-0 right-0 w-4 h-4 bg-blue-500 text-white text-[10px] flex items-center justify-center rounded-full font-bold shadow-[0_0_10px_rgba(59,130,246,0.5)]">
                {totalItems}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}

function Footer() {
  return (
    <footer className="bg-black border-t border-white/10 py-16 px-6 text-white relative z-10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
        <div className="col-span-1 md:col-span-2">
          <Link href="/" className="text-2xl font-black tracking-tighter mb-6 block">LUMINA TECH</Link>
          <p className="text-neutral-400 max-w-md font-light leading-relaxed">
            Revolutionizing the tech shopping experience with Headless Commerce and pioneer WebGL 3D technologies.
          </p>
        </div>
        <div>
          <h4 className="font-bold mb-6">Ecosystem</h4>
          <ul className="space-y-4 text-neutral-400">
            <li><Link href="/collections/all" className="hover:text-blue-400 transition-colors">All Devices</Link></li>
            <li><Link href="/about" className="hover:text-blue-400 transition-colors">About Lumina Tech</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold mb-6">Support</h4>
          <ul className="space-y-4 text-neutral-400">
            <li><Link href="/contact" className="hover:text-blue-400 transition-colors">Technical Support</Link></li>
          </ul>
        </div>
      </div>
      <div className="max-w-7xl mx-auto pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center text-sm text-neutral-500">
        <p>© 2026 Lumina Tech. All rights reserved.</p>
        <div className="flex gap-6 mt-4 md:mt-0">
          <a href="#" className="hover:text-blue-400 transition-colors">Facebook</a>
          <a href="#" className="hover:text-blue-400 transition-colors">Youtube</a>
        </div>
      </div>
    </footer>
  );
}

export default function ShopLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-[#050505] text-white transition-colors flex flex-col relative overflow-hidden">
      {/* Animated Luxury Background Glow */}
      <div className="fixed top-[-20%] left-[-10%] w-[50vw] h-[50vw] bg-emerald-900/10 blur-[150px] rounded-full pointer-events-none z-0 mix-blend-screen animate-blob" />
      <div className="fixed bottom-[-10%] right-[-10%] w-[40vw] h-[40vw] bg-blue-900/10 blur-[150px] rounded-full pointer-events-none z-0 mix-blend-screen animate-blob-reverse" />
      <div className="fixed top-[40%] left-[60%] w-[30vw] h-[30vw] bg-purple-900/10 blur-[120px] rounded-full pointer-events-none z-0 mix-blend-screen animate-blob" style={{ animationDelay: '2s' }} />
      <div className="fixed top-[20%] left-[30%] w-[20vw] h-[20vw] bg-amber-900/10 blur-[100px] rounded-full pointer-events-none z-0 mix-blend-screen animate-blob-reverse" style={{ animationDelay: '4s' }} />
      
      {/* Subtle Noise Texture */}
      <div className="fixed inset-0 pointer-events-none z-0 opacity-20 mix-blend-overlay" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.8%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}></div>

      <Header />
      <CartDrawer />
      <main className="flex-1 relative z-10">{children}</main>
      <Footer />
    </div>
  );
}
