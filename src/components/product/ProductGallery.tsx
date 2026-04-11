'use client';

import { useState } from 'react';

export default function ProductGallery({ images, title }: { images: string[]; title: string }) {
  const [activeIndex, setActiveIndex] = useState(0);

  if (!images || images.length === 0) {
    return (
      <div className="w-full aspect-square bg-[#111] rounded-2xl border border-white/10 overflow-hidden relative flex flex-col items-center justify-center text-neutral-600 gap-2">
        <span className="text-4xl">📷</span>
        <p>No image available</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {/* Main Image */}
      <div className="w-full aspect-square bg-white rounded-2xl border border-white/10 overflow-hidden relative">
        <img 
          src={images[activeIndex]} 
          className="w-full h-full object-contain" 
          alt={title} 
        />
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="grid grid-cols-5 gap-3">
          {images.map((imgUrl, idx) => (
            <div 
              key={idx} 
              onMouseEnter={() => setActiveIndex(idx)}
              onClick={() => setActiveIndex(idx)}
              className={`aspect-square bg-white rounded-xl border ${
                idx === activeIndex ? 'border-blue-500 ring-2 ring-blue-500/50' : 'border-white/10'
              } overflow-hidden cursor-pointer opacity-80 hover:opacity-100 transition-all`}
            >
              <img 
                src={imgUrl} 
                className="w-full h-full object-cover" 
                alt={`${title} thumbnail ${idx}`} 
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
