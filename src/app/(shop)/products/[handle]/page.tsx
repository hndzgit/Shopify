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
      <div className="lg:col-span-12 h-auto w-full relative bg-[#0a0a0a] border border-white/5 p-6 md:p-10 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* IMAGE GALLERY COLUMN */}
          <div className="w-full">
            <ProductGallery images={product.images} title={product.title} />
          </div>

          {/* PRODUCT INFO & INTERACTIVE COLUMN */}
          <div className="flex flex-col gap-6">
            <h1 className="text-3xl md:text-5xl font-black tracking-tighter text-white leading-tight">
              {product.title}
            </h1>
            
            <div className="py-2 border-y border-white/10 my-2">
               <ProductInteractive product={product} mainImage={mainImage} />
            </div>

            {/* LONG DESCRIPTION FROM SUPPLIER */}
            <div className="mt-4">
              <h3 className="text-xl font-bold border-b border-white/10 pb-4 mb-4">Item Description</h3>
              <div 
                className="prose prose-invert text-neutral-400 leading-relaxed max-w-none overflow-hidden [&_img]:max-w-full [&_table]:w-full [&_p]:m-0 [&_img]:m-0 [&_img]:block [&_img]:mx-auto [&_br]:hidden" 
                dangerouslySetInnerHTML={{ __html: product.descriptionHtml }} 
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
