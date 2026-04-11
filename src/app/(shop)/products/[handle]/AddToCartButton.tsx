'use client';

import { useCartStore } from '@/src/store/useCartStore';

export default function AddToCartButton({ product }: { product: any }) {
  const { addItem, setCartOpen } = useCartStore();

  const handleAddToCart = () => {
    // Luôn chọn variant đầu tiên để demo
    const defaultVariant = product.variants[0];
    
    addItem({
      variantId: defaultVariant.id,
      title: product.title,
      handle: product.handle,
      price: defaultVariant.price.amount,
      quantity: 1,
      image: product.image
    });
    
    setCartOpen(true);
  };

  return (
    <button 
      onClick={handleAddToCart}
      className="w-full md:w-auto px-8 py-4 bg-white text-black font-bold uppercase tracking-widest text-sm rounded-full hover:bg-neutral-200 hover:scale-105 transition-all shadow-[0_0_30px_rgba(255,255,255,0.2)]"
    >
      Add to Cart
    </button>
  );
}
