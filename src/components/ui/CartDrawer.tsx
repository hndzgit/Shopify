'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingBag } from 'lucide-react';
import { useCartStore } from '@/src/store/useCartStore';

export default function CartDrawer() {
  const { isCartOpen, setCartOpen, items, checkoutUrl } = useCartStore();

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setCartOpen(false)}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 transition-opacity"
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full max-w-md bg-white shadow-[-10px_0_50px_rgba(0,0,0,0.1)] border-l border-neutral-200 z-50 flex flex-col"
          >
            <div className="px-6 py-6 border-b border-neutral-200 flex justify-between items-center bg-neutral-50">
              <h2 className="text-xl font-black tracking-tighter text-black uppercase">Your Cart</h2>
              <button onClick={() => setCartOpen(false)} className="text-neutral-400 hover:text-black transition-colors">
                <X size={24} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-4 bg-white">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-4 text-neutral-400">
                  <ShoppingBag size={48} className="opacity-10" />
                  <p>Your cart is empty.</p>
                  <button 
                    onClick={() => setCartOpen(false)}
                    className="px-6 py-3 bg-neutral-100 border border-neutral-200 text-black rounded-full text-sm font-bold uppercase tracking-wide hover:bg-neutral-200 transition-colors"
                  >
                    Continue Shopping
                  </button>
                </div>
              ) : (
                items.map((item) => {
                  const safePrice = Number(item.price) || 0;
                  return (
                    <div key={item.variantId} className="flex gap-4 border-b border-neutral-100 py-6 relative">
                      <div className="w-20 h-20 bg-neutral-50 border border-neutral-200 rounded-xl overflow-hidden shrink-0">
                        {item.image && <img src={item.image} alt={item.title} className="w-full h-full object-cover mix-blend-multiply" />}
                      </div>
                      <div className="flex flex-col justify-between flex-1 pr-6">
                        <div>
                          <h3 className="font-bold text-black tracking-tight leading-tight mb-1">{item.title}</h3>
                          <p className="text-sm text-neutral-500">Qty: {item.quantity}</p>
                        </div>
                        <p className="font-bold text-green-600">
                          {safePrice > 0 ? `$${safePrice.toFixed(2)}` : <span className="text-red-500">Invalid Price</span>}
                        </p>
                      </div>
                      <button 
                        onClick={() => useCartStore.getState().removeItem(item.variantId)}
                        className="absolute right-0 top-6 text-neutral-400 hover:text-red-500 transition-colors p-1"
                        title="Remove item"
                      >
                        <X size={20} />
                      </button>
                    </div>
                  );
                })
              )}
            </div>

            <div className="p-6 border-t border-neutral-200 bg-neutral-50 space-y-3 pb-8">
              <div className="flex justify-between items-center text-lg font-bold text-black mb-4">
                <span>Subtotal</span>
                <span className="text-green-600">
                  ${items.reduce((total, item) => total + (Number(item.price) || 0) * item.quantity, 0).toFixed(2)}
                </span>
              </div>
              <button
                disabled={items.length === 0}
                onClick={() => {
                  const itemsPath = items.map(item => {
                    const id = item.variantId.split('/').pop();
                    return `${id}:${item.quantity}`;
                  }).join(',');
                  const shopDomain = "d8157a-13.myshopify.com";
                  const permalink = `https://${shopDomain}/cart/${itemsPath}?checkout&locale=en`;
                  window.location.href = permalink;
                }}
                className="w-full bg-[#FF4747] text-white py-4 rounded-xl font-bold uppercase tracking-widest text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#E03A3A] hover:scale-[1.01] shadow-[0_4px_14px_0_rgba(255,71,71,0.39)] transition-all"
              >
                Checkout
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
