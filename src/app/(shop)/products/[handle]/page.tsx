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
    <div className="max-w-7xl mx-auto px-0 md:px-6 py-24 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 relative z-10 bg-white">
      <div className="lg:col-span-12 h-auto w-full relative z-10">
        <div className="flex flex-col lg:grid lg:grid-cols-12 gap-8 lg:gap-16 items-start">
          {/* STACKED IMAGE GALLERY COLUMN (LEFT) - Move to bottom on mobile */}
          <div className="w-full lg:col-span-7 flex flex-col gap-4 order-2 lg:order-1">
            {product.images.map((imgUrl: string, idx: number) => (
              <div key={idx} className={`w-full bg-neutral-100 md:rounded-3xl overflow-hidden aspect-[4/5] md:aspect-auto ${idx === 0 ? 'hidden lg:block' : ''}`}>
                <img src={imgUrl} alt={`${product.title} image ${idx + 1}`} className="w-full h-full object-cover mix-blend-multiply" />
              </div>
            ))}
          </div>

          {/* PRODUCT INFO & INTERACTIVE COLUMN (STICKY RIGHT) - Move to top on mobile */}
          <div className="flex flex-col gap-8 lg:col-span-5 sticky top-24 bg-white p-6 md:p-0 md:pt-4 order-1 lg:order-2">
            
            {/* MOBILE ONLY: MAIN IMAGE */}
            <div className="w-full lg:hidden bg-neutral-100 overflow-hidden mb-2 aspect-[4/5] border-b border-neutral-100">
               <img src={mainImage} alt={`${product.title} main`} className="w-full h-full object-cover mix-blend-multiply" />
            </div>

            <div>
              <div className="inline-block px-3 py-1 bg-green-100 text-green-700 text-xs font-bold uppercase tracking-wider rounded-full mb-4 border border-green-200">In Stock & Ready to Ship</div>
              <h1 className="text-3xl md:text-4xl font-black tracking-tight text-black leading-tight">
                {product.title}
              </h1>
            </div>
            
            <div className="py-6 border-y border-neutral-200">
               <ProductInteractive product={product} mainImage={mainImage} />
            </div>

            {/* TRUST BADGES */}
            <div className="grid grid-cols-3 gap-2 text-center text-xs text-neutral-600 font-medium">
              <div className="flex flex-col items-center gap-2 p-3 bg-neutral-50 rounded-xl border border-neutral-200">
                <span className="text-2xl">✈️</span>
                <span>Free Global<br/>Shipping</span>
              </div>
              <div className="flex flex-col items-center gap-2 p-3 bg-neutral-50 rounded-xl border border-neutral-200">
                <span className="text-2xl">🛡️</span>
                <span>Secure<br/>Checkout</span>
              </div>
              <div className="flex flex-col items-center gap-2 p-3 bg-neutral-50 rounded-xl border border-neutral-200">
                <span className="text-2xl">📦</span>
                <span>30-Day<br/>Returns</span>
              </div>
            </div>

            {/* EXPANDED FULL DEVICE SPECIFICATIONS */}
            <div className="mt-8 border-t border-neutral-200 pt-8">
              <h3 className="text-xl font-bold text-black mb-6 uppercase tracking-wider">Product Features</h3>
              <div className="text-neutral-700 bg-transparent">
                <div 
                  className="prose prose-sm leading-relaxed max-w-none overflow-hidden [&_img]:max-w-full [&_table]:w-full [&_p]:m-0 [&_img]:m-0 [&_img]:block [&_img]:mx-auto [&_br]:hidden [&_img]:rounded-xl [&_img]:my-4 [&_*]:!text-neutral-700 [&_*]:!bg-transparent [&_*]:!font-sans" 
                  dangerouslySetInnerHTML={{ __html: product.descriptionHtml }} 
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
