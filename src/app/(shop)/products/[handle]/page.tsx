import { shopifyClient, GET_PRODUCT_QUERY } from "@/src/lib/shopify/client";
import ProductViewer from '@/src/components/3d/ProductViewer';
import AddToCartButton from './AddToCartButton';
import { Suspense } from 'react';

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ handle: string }>
}) {
  const handle = (await params).handle;
  
  const result: any = await shopifyClient.request(GET_PRODUCT_QUERY, { handle });

  const productData = result?.product;

  if (!productData) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20 flex-col gap-4 text-neutral-400">
        <h1 className="text-3xl font-bold">404 - Device Not Found</h1>
        <p>The hardware you are looking for does not exist in our catalog.</p>
      </div>
    );
  }

  const product = {
    id: productData.id,
    title: productData.title,
    handle: productData.handle,
    descriptionHtml: productData.descriptionHtml,
    price: productData.priceRange.minVariantPrice.amount,
    currencyCode: productData.priceRange.minVariantPrice.currencyCode,
    image: productData.images.edges[0]?.node?.url || '',
    modelUrl: productData.metafield?.value || null,
    variants: productData.variants.edges.map((e: any) => e.node),
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-24 grid grid-cols-1 lg:grid-cols-12 gap-12 relative z-10">
      <div className="lg:col-span-8 h-[50vh] md:h-[60vh] lg:h-[80vh] w-full rounded-3xl overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)] relative bg-[#0a0a0a] border border-white/5">
        {product.modelUrl ? (
          <Suspense fallback={<div className="flex h-full items-center justify-center text-neutral-500">Initializing 3D Engine...</div>}>
            <ProductViewer modelUrl={product.modelUrl} autoRotate={true} />
          </Suspense>
        ) : (
          <div className="flex w-full h-full items-center justify-center bg-[#111] flex-col gap-4 border border-dashed border-white/10 m-4 rounded-2xl">
            <span className="text-4xl text-neutral-600">📦</span>
            <p className="text-neutral-500 font-medium">No 3D Model attached to this product inside Shopify.</p>
          </div>
        )}
      </div>
      
      <div className="lg:col-span-4 flex flex-col justify-center gap-6 pb-24 lg:pb-0">
        <h1 className="text-4xl md:text-5xl font-black tracking-tighter text-white">{product.title}</h1>
        <p className="text-3xl font-bold text-blue-400">
          {product.currencyCode} ${product.price}
        </p>
        <div 
          className="prose prose-invert text-neutral-400 leading-relaxed max-w-none" 
          dangerouslySetInnerHTML={{ __html: product.descriptionHtml }} 
        />
        <div className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-[#050505]/90 backdrop-blur-md border-t border-white/10 lg:relative lg:bg-transparent lg:backdrop-blur-none lg:border-t lg:border-white/10 lg:p-0 lg:pt-8 w-full">
            <AddToCartButton product={product} />
        </div>
      </div>
    </div>
  );
}
