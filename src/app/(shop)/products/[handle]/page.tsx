import { shopifyClient, GET_PRODUCT_QUERY } from "@/src/lib/shopify/client";
import ProductGallery from '@/src/components/product/ProductGallery';
import ProductInteractive from '@/src/components/product/ProductInteractive';
import { Plane, ShieldCheck, Package } from 'lucide-react';

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
    <div className="max-w-7xl mx-auto px-0 md:px-6 py-32 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 relative z-10 bg-white opacity-0 animate-fade-up">
      <div className="lg:col-span-12 h-auto w-full relative z-10">
        <div className="flex flex-col lg:grid lg:grid-cols-12 gap-8 lg:gap-16 items-start">
          {/* STACKED IMAGE GALLERY COLUMN (LEFT) - Move to bottom on mobile */}
          <div className="w-full lg:col-span-7 flex flex-col gap-4 order-2 lg:order-1">
            {product.images.map((imgUrl: string, idx: number) => (
              <div key={idx} className={`w-full bg-neutral-50 md:rounded-3xl overflow-hidden aspect-[4/5] md:aspect-auto border border-neutral-100 ${idx === 0 ? 'hidden lg:block' : ''}`}>
                <img src={imgUrl} alt={`${product.title} image ${idx + 1}`} className="w-full h-full object-cover mix-blend-multiply transition-transform hover:scale-105 duration-700" />
              </div>
            ))}
          </div>

          {/* PRODUCT INFO & INTERACTIVE COLUMN (STICKY RIGHT) - Move to top on mobile */}
          <div className="flex flex-col gap-8 lg:col-span-5 sticky top-32 bg-white p-6 md:p-0 md:pt-4 order-1 lg:order-2">
            
            {/* MOBILE ONLY: MAIN IMAGE */}
            <div className="w-full lg:hidden bg-neutral-50 overflow-hidden mb-2 aspect-[4/5] border-b border-neutral-100 relative group">
               <img src={mainImage} alt={`${product.title} main`} className="w-full h-full object-cover mix-blend-multiply transition-transform duration-700 group-hover:scale-105" />
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="inline-block px-4 py-1.5 bg-neutral-900 text-white text-[10px] font-bold uppercase tracking-widest rounded-full shadow-sm">In Stock & Ready to Ship</div>
                <div className="flex items-center gap-1 text-[#FFB800]">
                  <span className="text-sm">★★★★★</span>
                  <span className="text-xs font-bold text-neutral-600 ml-1">4.9/5 (1,024)</span>
                </div>
              </div>
              <h1 className="text-4xl md:text-5xl font-black tracking-tight text-neutral-900 leading-[1.1]">
                {product.title}
              </h1>
            </div>
            
            <div className="py-6 border-y border-neutral-100">
               <ProductInteractive product={product} mainImage={mainImage} />
            </div>

            {/* LUXURY TRUST BADGES */}
            <div className="grid grid-cols-3 gap-3 text-center text-[10px] uppercase tracking-widest text-neutral-500 font-bold">
              <div className="flex flex-col items-center justify-center gap-3 p-4 bg-white rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-neutral-100 transition-all hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)] hover:-translate-y-1">
                <Plane className="w-6 h-6 text-neutral-900 stroke-[1.5]" />
                <span>Free Global<br/>Shipping</span>
              </div>
              <div className="flex flex-col items-center justify-center gap-3 p-4 bg-white rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-neutral-100 transition-all hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)] hover:-translate-y-1">
                <ShieldCheck className="w-6 h-6 text-neutral-900 stroke-[1.5]" />
                <span>Secure<br/>Checkout</span>
              </div>
              <div className="flex flex-col items-center justify-center gap-3 p-4 bg-white rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-neutral-100 transition-all hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)] hover:-translate-y-1">
                <Package className="w-6 h-6 text-neutral-900 stroke-[1.5]" />
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
