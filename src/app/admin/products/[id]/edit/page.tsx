import React from 'react';
import LayoutWrapper from '@/src/components/admin/LayoutWrapper';
import { ProductForm } from '@/src/components/admin/ProductForm';

export default function Page({ params }: { params: { id: string } }) {
  // In a real app, we would fetch product data by ID here
  const mockInitialData = {
    title: 'Aura Sculpt Chair',
    description: 'A masterpiece of modern design...',
    price: '1250.00',
    modelUrl: 'https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/SheenChair/glTF-Binary/SheenChair.glb'
  };

  return (
    <LayoutWrapper>
      <div className="max-w-6xl mx-auto">
        <div className="mb-12">
          <h1 className="text-4xl font-display font-light">Edit Product</h1>
          <p className="text-neutral-500 mt-2">Update your product details and 3D assets.</p>
        </div>
        <ProductForm initialData={mockInitialData} />
      </div>
    </LayoutWrapper>
  );
}
