import { shopifyClient, GET_PRODUCT_QUERY } from "@/src/lib/shopify/client";
import ProductGallery from '@/src/components/product/ProductGallery';
import ProductInteractive from '@/src/components/product/ProductInteractive';

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
    options: productData.options || [],
  };

  const mainImage = product.images[0] || '';

  return (
    <div className="max-w-7xl mx-auto px-6 py-24 grid grid-cols-1 lg:grid-cols-12 gap-12 relative z-10">
      <div className="lg:col-span-12 h-auto w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* IMAGE GALLERY COLUMN */}
          <div className="w-full lg:col-span-7 bg-[#0a0a0a] border border-white/5 p-6 md:p-10 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
            <ProductGallery images={product.images} title={product.title} />
          </div>

          {/* PRODUCT INFO & INTERACTIVE COLUMN (STICKY) */}
          <div className="flex flex-col gap-8 lg:col-span-5 sticky top-32 bg-[#0a0a0a] border border-white/5 p-6 md:p-10 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
            <div>
              <div className="inline-block px-3 py-1 bg-emerald-500/10 text-emerald-400 text-xs font-bold uppercase tracking-wider rounded-full mb-4 border border-emerald-500/20">In Stock & Ready to Ship</div>
              <h1 className="text-3xl md:text-5xl font-black tracking-tighter text-white leading-tight">
                {product.title}
              </h1>
            </div>
            
            <div className="py-6 border-y border-white/10">
               <ProductInteractive product={product} mainImage={mainImage} />
            </div>

            {/* TRUST BADGES */}
            <div className="grid grid-cols-3 gap-2 text-center text-xs text-neutral-400">
              <div className="flex flex-col items-center gap-2 p-3 bg-white/5 rounded-xl border border-white/5">
                <span className="text-xl">✈️</span>
                <span>Free Global<br/>Shipping</span>
              </div>
              <div className="flex flex-col items-center gap-2 p-3 bg-white/5 rounded-xl border border-white/5">
                <span className="text-xl">🛡️</span>
                <span>Secure<br/>Checkout</span>
              </div>
              <div className="flex flex-col items-center gap-2 p-3 bg-white/5 rounded-xl border border-white/5">
                <span className="text-xl">📦</span>
                <span>30-Day<br/>Returns</span>
              </div>
            </div>

            {/* LONG DESCRIPTION ACCORDION */}
            <div className="mt-2">
              <details className="group bg-white/5 rounded-2xl border border-white/10 overflow-hidden">
                <summary className="flex items-center justify-between p-5 font-bold cursor-pointer list-none text-white hover:bg-white/5 transition-colors">
                  <span>Full Device Specifications</span>
                  <span className="transition group-open:rotate-180">↓</span>
                </summary>
                <div className="p-5 pt-0 text-neutral-400 bg-transparent">
                  <div 
                    className="prose prose-invert prose-sm leading-relaxed max-w-none overflow-hidden [&_img]:max-w-full [&_table]:w-full [&_p]:m-0 [&_img]:m-0 [&_img]:block [&_img]:mx-auto [&_br]:hidden [&_img]:rounded-xl [&_img]:my-4 [&_*]:!text-neutral-300 [&_*]:!bg-transparent [&_*]:!font-sans" 
                    dangerouslySetInnerHTML={{ __html: product.descriptionHtml }} 
                  />
                </div>
              </details>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
