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
      {/* Price */}
      <p className="text-4xl font-bold text-black">
        {product.currencyCode} ${currentPrice}
      </p>

      {/* Options Rendering (e.g., Color, Size) */}
      {product.options && product.options.map((opt: any, idx: number) => {
        if (opt.name === 'Title' && opt.values.includes('Default Title')) return null;

        return (
          <div key={idx} className="flex flex-col gap-3">
            <span className="text-sm font-bold tracking-wider text-black">
              {opt.name}: <span className="font-normal text-neutral-500">{selectedOptions[opt.name]}</span>
            </span>
            <div className="flex flex-wrap gap-2">
              {opt.values.map((val: string, valIdx: number) => (
                <button
                  key={valIdx}
                  onClick={() => handleOptionSelect(opt.name, val)}
                  className={`px-5 py-3 border rounded-xl text-sm font-medium transition-all ${
                    selectedOptions[opt.name] === val 
                      ? 'border-black bg-black text-white shadow-md' 
                      : 'border-neutral-200 hover:border-neutral-400 text-black bg-white'
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
        <span className="text-sm font-bold tracking-wider text-black">QUANTITY</span>
        <div className="flex items-center gap-4 bg-white w-fit rounded-xl p-1 border border-neutral-200">
          <button 
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            className="w-10 h-10 rounded-lg flex items-center justify-center hover:bg-neutral-100 text-black font-bold text-lg transition-colors"
          >
            -
          </button>
          <span className="w-8 text-center font-bold text-black">{quantity}</span>
          <button 
            onClick={() => setQuantity(quantity + 1)}
            className="w-10 h-10 rounded-lg flex items-center justify-center hover:bg-neutral-100 text-black font-bold text-lg transition-colors"
          >
            +
          </button>
        </div>
      </div>

      {/* Action Buttons (Desktop defaults + Mobile inline) */}
      <div className="flex flex-col gap-3 pt-4">
        <button 
          onClick={() => handleAddToCart(false)}
          className="w-full py-4 bg-white text-black font-bold uppercase tracking-widest text-sm rounded-full hover:bg-neutral-50 border-2 border-black transition-all"
        >
          Add to Cart
        </button>
        <button 
          onClick={() => handleAddToCart(true)}
          className="w-full py-4 bg-[#FF4747] text-white font-bold uppercase tracking-widest text-sm rounded-full hover:bg-[#E03A3A] transition-all hover:scale-[1.01] shadow-[0_4px_14px_0_rgba(255,71,71,0.39)]"
        >
          Buy it Now
        </button>
      </div>

      {/* MOBILE STICKY BOTTOM BAR */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-neutral-100 z-50 md:hidden flex items-center justify-between shadow-[0_-10px_20px_rgba(0,0,0,0.05)]">
        <div className="flex flex-col">
          <span className="text-xs text-neutral-500 line-clamp-1">{product.title}</span>
          <span className="font-bold text-lg text-black">${currentPrice}</span>
        </div>
        <button 
          onClick={() => handleAddToCart(true)}
          className="px-8 py-3 bg-[#FF4747] text-white font-bold uppercase tracking-wider text-sm rounded-full shadow-lg active:scale-95 transition-transform"
        >
          Buy Now
        </button>
      </div>

    </div>
  );
}
