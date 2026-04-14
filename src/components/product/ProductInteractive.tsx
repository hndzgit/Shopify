'use client';

import { useState, useMemo } from 'react';
import { useCartStore } from '@/src/store/useCartStore';

export default function ProductInteractive({ product, mainImage }: { product: any, mainImage: string }) {
  const { addItem, setCartOpen } = useCartStore();
  
  // Default selections: select the first value of every option
  const defaultSelections: Record<string, string> = {};
  if (product.options && Array.isArray(product.options)) {
    product.options.forEach((opt: any) => {
      if (opt.values && opt.values.length > 0) {
        defaultSelections[opt.name] = opt.values[0];
      }
    });
  }

  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>(defaultSelections);
  const [quantity, setQuantity] = useState<number>(1);

  // Find the variant that matches the selected options
  const selectedVariant = useMemo(() => {
    if (!product.variants || product.variants.length === 0) return null;
    
    // If there are no options (except Default Title), return the first variant
    if (Object.keys(selectedOptions).length === 0 || (Object.keys(selectedOptions).length === 1 && selectedOptions['Title'] === 'Default Title')) {
      return product.variants[0];
    }

    return product.variants.find((variant: any) => {
      // Check if all selected options match this variant's options
      return variant.selectedOptions.every((vOpt: any) => {
        return selectedOptions[vOpt.name] === vOpt.value;
      });
    }) || product.variants[0]; // fallback
    
  }, [product.variants, selectedOptions]);

  // Handle Option Click
  const handleOptionSelect = (optionName: string, value: string) => {
    setSelectedOptions(prev => ({
      ...prev,
      [optionName]: value
    }));
  };

  const handleAddToCart = (directCheckout = false) => {
    if (!selectedVariant) return;
    
    addItem({
      variantId: selectedVariant.id,
      title: product.title,
      handle: product.handle,
      price: selectedVariant.price, // Admin API price is a string value directly inside 'price'
      quantity: quantity,
      image: mainImage
    });
    
    setCartOpen(true);
    
    if (directCheckout) {
       // In a real flow, redirecting to checkout could be done here, 
       // but for our permalink system the cart drawer has a direct Checkout button anyway.
    }
  };

  const currentPrice = selectedVariant ? selectedVariant.price : product.price;

  return (
    <div className="flex flex-col gap-6">
      
      {/* FOMO: LIVE SALES COUNTER */}
      <div className="flex items-center gap-2 p-3 bg-red-50 text-red-700 font-medium text-sm rounded-xl border border-red-100">
        <span className="animate-pulse text-lg">🔥</span>
        <span><strong>24 items sold</strong> in the last 24 hours</span>
      </div>

      {/* Price */}
      <div className="flex items-baseline gap-2">
        <p className="text-4xl font-black text-neutral-900 tracking-tight">
          ${currentPrice}
        </p>
        <span className="text-sm font-medium text-neutral-400">{product.currencyCode}</span>
        <span className="ml-2 text-sm font-bold text-green-600 bg-green-50 px-2 py-1 rounded-md">Save 20%</span>
      </div>

      {/* Options Rendering (e.g., Color, Size) */}
      {product.options && product.options.map((opt: any, idx: number) => {
        if (opt.name === 'Title' && opt.values.includes('Default Title')) return null;

        return (
          <div key={idx} className="flex flex-col gap-3">
            <span className="text-xs font-bold tracking-widest text-neutral-900 uppercase">
              {opt.name}: <span className="font-medium text-neutral-500">{selectedOptions[opt.name]}</span>
            </span>
            <div className="flex flex-wrap gap-2">
              {opt.values.map((val: string, valIdx: number) => (
                <button
                  key={valIdx}
                  onClick={() => handleOptionSelect(opt.name, val)}
                  className={`px-5 py-2.5 border rounded-full text-sm font-bold transition-all ${
                    selectedOptions[opt.name] === val 
                      ? 'border-neutral-900 bg-neutral-900 text-white shadow-md' 
                      : 'border-neutral-200 hover:border-neutral-900 text-neutral-900 bg-white'
                  }`}
                >
                  {val}
                </button>
              ))}
            </div>
          </div>
        );
      })}

      {/* Quantity Selector */}
      <div className="flex flex-col gap-3">
        <span className="text-xs font-bold tracking-widest text-neutral-900 uppercase">QUANTITY</span>
        <div className="flex items-center gap-4 bg-neutral-50 w-fit rounded-full p-1 border border-neutral-200">
          <button 
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-neutral-200 text-neutral-900 font-medium text-lg transition-colors"
          >
            -
          </button>
          <span className="w-8 text-center font-bold text-neutral-900">{quantity}</span>
          <button 
            onClick={() => setQuantity(quantity + 1)}
            className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-neutral-200 text-neutral-900 font-medium text-lg transition-colors"
          >
            +
          </button>
        </div>
      </div>

      {/* FOMO: STOCK PROGRESS BAR */}
      <div className="flex flex-col gap-2 mt-2">
        <div className="flex items-center gap-2 text-[#FF4747] font-bold text-[13px]">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FF4747] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#FF4747]"></span>
          </span>
          Hurry! Only 14 units left in stock!
        </div>
        <div className="w-full h-2 bg-neutral-100 rounded-full overflow-hidden">
          <div className="h-full bg-[#FF4747] w-[15%] rounded-full"></div>
        </div>
      </div>

      {/* Action Buttons (Desktop defaults + Mobile inline) */}
      <div className="flex flex-col gap-3 pt-6 border-t border-neutral-100 mt-2">
        <button 
          onClick={() => handleAddToCart(false)}
          className="w-full py-4 bg-white text-neutral-900 font-bold uppercase tracking-widest text-xs rounded-full hover:bg-neutral-50 border border-neutral-300 transition-all shadow-sm hover:shadow-md"
        >
          Add to Cart
        </button>
        <button 
          onClick={() => handleAddToCart(true)}
          className="relative overflow-hidden w-full py-4 bg-neutral-900 text-white font-bold uppercase tracking-widest text-xs rounded-full hover:scale-[1.02] shadow-[0_4px_20px_rgba(0,0,0,0.15)] transition-all group"
        >
          <div className="absolute inset-0 bg-[linear-gradient(110deg,transparent,45%,rgba(255,255,255,0.2),55%,transparent)] bg-[length:200%_100%] animate-shimmer" />
          <span className="relative z-10">Buy it Now</span>
        </button>
      </div>

      {/* TRUST: PAYMENT LOGOS */}
      <div className="flex flex-col items-center gap-3 pt-4">
        <span className="text-[10px] uppercase tracking-widest text-neutral-400 font-bold">Guaranteed Safe Checkout</span>
        <div className="flex items-center justify-center gap-4 opacity-60">
          <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" alt="PayPal" className="h-4" />
          <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" alt="Visa" className="h-3" />
          <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="MasterCard" className="h-5" />
          <img src="https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg" alt="Apple Pay" className="h-4" />
        </div>
      </div>

      {/* MOBILE STICKY BOTTOM BAR (GLASSMORPHISM) */}
      <div className="fixed bottom-0 left-0 right-0 py-3 px-4 bg-white/90 backdrop-blur-xl border-t border-neutral-200/50 z-50 md:hidden flex items-center justify-between shadow-[0_-10px_30px_rgba(0,0,0,0.05)]">
        <div className="flex flex-col">
          <span className="text-[10px] text-neutral-500 line-clamp-1 uppercase tracking-widest font-bold">{product.title}</span>
          <span className="font-black text-lg text-neutral-900 leading-none mt-1">${currentPrice}</span>
        </div>
        <button 
          onClick={() => handleAddToCart(true)}
          className="relative overflow-hidden px-8 py-3.5 bg-neutral-900 text-white font-bold uppercase tracking-widest text-xs rounded-full shadow-lg active:scale-95 transition-transform"
        >
          <div className="absolute inset-0 bg-[linear-gradient(110deg,transparent,45%,rgba(255,255,255,0.2),55%,transparent)] bg-[length:200%_100%] animate-shimmer" />
          <span className="relative z-10">Buy Now</span>
        </button>
      </div>

    </div>
  );
}
