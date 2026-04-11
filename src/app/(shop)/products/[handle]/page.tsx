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

  const productData = result?.productByHandle;

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
    price: productData.priceRangeV2.minVariantPrice.amount,
    currencyCode: productData.priceRangeV2.minVariantPrice.currencyCode,
    images: productData.images?.edges.map((e: any) => e.node.url) || [],
    variants: productData.variants.edges.map((e: any) => e.node),
  };

  const mainImage = product.images[0] || '';

  return (
    <div className="max-w-7xl mx-auto px-6 py-24 grid grid-cols-1 lg:grid-cols-12 gap-12 relative z-10">
      <div className="lg:col-span-12 h-auto w-full relative bg-[#0a0a0a] border border-white/5 p-6 rounded-3xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* IMAGE GALLERY COLUMN */}
          <div className="flex flex-col gap-4">
            <div className="w-full aspect-square bg-[#111] rounded-2xl border border-white/10 overflow-hidden relative">
              {mainImage ? (
                <img src={mainImage} className="w-full h-full object-contain mix-blend-screen" alt={product.title} />
              ) : (
                <div className="flex w-full h-full items-center justify-center text-neutral-600 flex-col gap-2">
                  <span className="text-4xl">📷</span>
                  <p>No image available</p>
                </div>
              )}
            </div>
            {product.images.length > 1 && (
              <div className="grid grid-cols-4 lg:grid-cols-5 gap-3">
                {product.images.slice(1).map((imgUrl: string, idx: number) => (
                   <div key={idx} className="aspect-square bg-[#111] rounded-xl border border-white/10 overflow-hidden">
                     <img src={imgUrl} className="w-full h-full object-cover mix-blend-screen opacity-80 hover:opacity-100 transition-opacity" alt="thumbnail" />
                   </div>
                ))}
              </div>
            )}
          </div>

          {/* PRODUCT INFO COLUMN */}
          <div className="flex flex-col gap-6">
            <h1 className="text-4xl md:text-5xl font-black tracking-tighter text-white">{product.title}</h1>
            <p className="text-3xl font-bold text-blue-400">
              {product.currencyCode} ${product.price}
            </p>
            
            {/* ADD TO CART ACTION */}
            <div className="py-4 border-y border-white/10">
              <AddToCartButton product={{ ...product, image: mainImage }} />
            </div>

            {/* LONG DESCRIPTION FROM SUPPLIER */}
            <div 
              className="prose prose-invert text-neutral-400 leading-relaxed max-w-none mt-4 overflow-hidden" 
              dangerouslySetInnerHTML={{ __html: product.descriptionHtml }} 
            />
          </div>
        </div>
      </div>
    </div>
  );
}
