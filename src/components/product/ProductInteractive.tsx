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
      <p className="text-4xl font-bold text-white">
        {product.currencyCode} ${currentPrice}
      </p>

      {/* Options Rendering (e.g., Color, Size) */}
      {product.options && product.options.map((opt: any, idx: number) => {
        // Skip Default Title as it's an internal Shopify mechanism when no variants exist
        if (opt.name === 'Title' && opt.values.includes('Default Title')) return null;

        return (
          <div key={idx} className="flex flex-col gap-3">
            <span className="text-sm font-bold tracking-widest text-neutral-400 uppercase">
              {opt.name}: <span className="text-white">{selectedOptions[opt.name]}</span>
            </span>
            <div className="flex flex-wrap gap-2">
              {opt.values.map((val: string, valIdx: number) => (
                <button
                  key={valIdx}
                  onClick={() => handleOptionSelect(opt.name, val)}
                  className={`px-4 py-2 border rounded-full text-sm font-medium transition-all ${
                    selectedOptions[opt.name] === val 
                      ? 'border-blue-500 bg-blue-500/10 text-blue-400' 
                      : 'border-white/10 hover:border-white/30 text-white'
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
        <span className="text-sm font-bold tracking-widest text-neutral-400 uppercase">Quantity</span>
        <div className="flex items-center gap-4 bg-white/5 w-fit rounded-full p-1 border border-white/10">
          <button 
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-white/10 transition-colors"
          >
            -
          </button>
          <span className="w-8 text-center font-bold">{quantity}</span>
          <button 
            onClick={() => setQuantity(quantity + 1)}
            className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-white/10 transition-colors"
          >
            +
          </button>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col gap-3 pt-4 border-t border-white/10">
        <button 
          onClick={() => handleAddToCart(false)}
          className="w-full py-4 bg-[#FF4747]/10 text-[#FF4747] font-bold uppercase tracking-widest text-sm rounded-full hover:bg-[#FF4747]/20 border border-[#FF4747]/30 transition-all"
        >
          Add to Cart
        </button>
        <button 
          onClick={() => handleAddToCart(true)}
          className="w-full py-4 bg-gradient-to-r from-[#FF4747] to-[#FF0000] text-white font-bold uppercase tracking-widest text-sm rounded-full hover:scale-[1.02] transition-all shadow-[0_0_20px_rgba(255,71,71,0.3)]"
        >
          Buy it Now
        </button>
      </div>

    </div>
  );
}
