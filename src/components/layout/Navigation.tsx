"use client";

import React from 'react';
import { ShoppingBag, Menu, X, Trash2, Plus, Minus } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCartStore } from '@/src/store/useCartStore';

export function Navbar() {
  const toggleCart = useCartStore((state) => state.toggleCart);
  const itemsCount = useCartStore((state) => state.items.reduce((acc, item) => acc + item.quantity, 0));

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-neutral-100">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <a href="/" className="text-2xl font-display font-semibold tracking-tighter">LUMINA</a>
          <div className="hidden md:flex items-center gap-6 text-sm font-medium text-neutral-500">
            <a href="/products" className="hover:text-black transition-colors">Collections</a>
            <a href="#" className="hover:text-black transition-colors">About</a>
            <a href="#" className="hover:text-black transition-colors">Journal</a>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <a href="/admin/dashboard" className="text-xs font-bold uppercase tracking-widest text-neutral-400 hover:text-black transition-colors mr-4">Admin</a>
          <button 
            onClick={toggleCart}
            className="relative p-2 hover:bg-neutral-100 rounded-full transition-colors"
          >
            <ShoppingBag size={22} />
            {itemsCount > 0 && (
              <span className="absolute top-0 right-0 bg-black text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
                {itemsCount}
              </span>
            )}
          </button>
          <button className="md:hidden p-2">
            <Menu size={22} />
          </button>
        </div>
      </div>
    </nav>
  );
}

export function CartDrawer() {
  const { items, isOpen, toggleCart, removeItem, updateQuantity } = useCartStore();
  const total = items.reduce((acc, item) => acc + parseFloat(item.price) * item.quantity, 0);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={toggleCart}
            className="fixed inset-0 bg-black/40 z-[60] backdrop-blur-sm"
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-white z-[70] shadow-2xl flex flex-col"
          >
            <div className="p-6 border-b border-neutral-100 flex items-center justify-between">
              <h2 className="text-xl font-display font-semibold">Your Cart</h2>
              <button onClick={toggleCart} className="p-2 hover:bg-neutral-100 rounded-full transition-colors">
                <X size={20} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-neutral-400 gap-4">
                  <ShoppingBag size={48} strokeWidth={1} />
                  <p>Your cart is empty</p>
                </div>
              ) : (
                items.map((item) => (
                  <div key={item.variantId} className="flex gap-4">
                    <div className="w-24 h-24 bg-neutral-100 rounded-xl overflow-hidden flex-shrink-0">
                      <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <h3 className="font-medium">{item.title}</h3>
                        <p className="text-sm text-neutral-500">${item.price}</p>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center border border-neutral-200 rounded-lg">
                          <button 
                            onClick={() => updateQuantity(item.variantId, Math.max(1, item.quantity - 1))}
                            className="p-1 px-2 hover:bg-neutral-50"
                          >
                            <Minus size={14} />
                          </button>
                          <span className="px-2 text-sm w-8 text-center">{item.quantity}</span>
                          <button 
                            onClick={() => updateQuantity(item.variantId, item.quantity + 1)}
                            className="p-1 px-2 hover:bg-neutral-50"
                          >
                            <Plus size={14} />
                          </button>
                        </div>
                        <button 
                          onClick={() => removeItem(item.variantId)}
                          className="text-neutral-400 hover:text-red-500 transition-colors"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {items.length > 0 && (
              <div className="p-6 border-t border-neutral-100 space-y-4">
                <div className="flex items-center justify-between font-medium text-lg">
                  <span>Subtotal</span>
                  <span>${total.toFixed(2)}</span>
                </div>
                <button className="w-full bg-black text-white py-4 rounded-2xl font-medium hover:bg-neutral-800 transition-colors">
                  Checkout
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
