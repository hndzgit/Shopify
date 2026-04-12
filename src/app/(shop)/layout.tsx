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
    <header className="fixed top-0 left-0 right-0 z-40 bg-white/80 backdrop-blur-xl border-b border-neutral-200">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between relative">
        <div className="flex items-center">
          <MobileMenu />
          <Link href="/" className="text-2xl font-black tracking-tighter text-black">LUMINA</Link>
        </div>
        <nav className="hidden md:flex gap-8 text-sm font-medium absolute left-1/2 -translate-x-1/2">
          <Link href="/collections/all" className="text-neutral-600 hover:text-black transition-colors">Devices</Link>
          <Link href="/about" className="text-neutral-600 hover:text-black transition-colors">Vision</Link>
          <Link href="/contact" className="text-neutral-600 hover:text-black transition-colors">Contact</Link>
        </nav>
        <div className="flex items-center gap-4">
          <button 
            onClick={() => setCartOpen(true)}
            className="p-2 hover:bg-neutral-100 text-black rounded-full transition-colors relative"
          >
            <ShoppingBag size={20} />
            {totalItems > 0 && (
              <span className="absolute top-0 right-0 w-4 h-4 bg-red-500 text-white text-[10px] flex items-center justify-center rounded-full font-bold">
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
    <footer className="bg-neutral-50 border-t border-neutral-200 py-16 px-6 text-black relative z-10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
        <div className="col-span-1 md:col-span-2">
          <Link href="/" className="text-2xl font-black tracking-tighter mb-6 block text-black">LUMINA TECH</Link>
          <p className="text-neutral-500 max-w-md font-light leading-relaxed">
            Revolutionizing the tech shopping experience with Headless Commerce and pioneer WebGL 3D technologies.
          </p>
        </div>
        <div>
          <h4 className="font-bold mb-6 text-black">Ecosystem</h4>
          <ul className="space-y-4 text-neutral-600">
            <li><Link href="/collections/all" className="hover:text-black transition-colors">All Devices</Link></li>
            <li><Link href="/about" className="hover:text-black transition-colors">About Lumina Tech</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold mb-6 text-black">Support</h4>
          <ul className="space-y-4 text-neutral-600">
            <li><Link href="/contact" className="hover:text-black transition-colors">Technical Support</Link></li>
          </ul>
        </div>
      </div>
      <div className="max-w-7xl mx-auto pt-8 border-t border-neutral-200 flex flex-col md:flex-row justify-between items-center text-sm text-neutral-500">
        <p>© 2026 Lumina Tech. All rights reserved.</p>
        <div className="flex gap-6 mt-4 md:mt-0">
          <a href="#" className="hover:text-black transition-colors">Facebook</a>
          <a href="#" className="hover:text-black transition-colors">Youtube</a>
        </div>
      </div>
    </footer>
  );
}

export default function ShopLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-white text-black transition-colors flex flex-col relative overflow-hidden">


      <Header />
      <CartDrawer />
      <main className="flex-1 relative z-10">{children}</main>
      <Footer />
    </div>
  );
}
