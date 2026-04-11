import React from 'react';
import LayoutWrapper from '@/src/components/admin/LayoutWrapper';
import { ProductForm } from '@/src/components/admin/ProductForm';

export default function Page() {
  return (
    <LayoutWrapper>
      <div className="max-w-6xl mx-auto">
        <div className="mb-12">
          <h1 className="text-4xl font-display font-light">Create New Product</h1>
          <p className="text-neutral-500 mt-2">Design your next luxury masterpiece and sync it with Shopify.</p>
        </div>
        <ProductForm />
      </div>
    </LayoutWrapper>
  );
}
