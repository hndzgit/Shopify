import Link from 'next/link';
import { shopifyClient, GET_PRODUCTS_QUERY } from "@/src/lib/shopify/client";

export const dynamic = 'force-dynamic';

export default async function ShopCollections() {
  let products = [];
  try {
    const result: any = await shopifyClient.request(GET_PRODUCTS_QUERY, { first: 20 });
    const fetchedEdges = result?.products?.edges || [];
    products = fetchedEdges.map((edge: any) => ({
      id: edge.node.id,
      handle: edge.node.handle,
      title: edge.node.title,
      price: `$${edge.node.priceRangeV2?.minVariantPrice?.amount || '0'}`,
      image: edge.node.images?.edges[0]?.node?.url || ''
    }));
  } catch (error) {
    console.error("Shopify Products Fetch Error:", error);
  }

  return (
    <div className="pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col items-center justify-center text-center mb-16 relative">
          <h1 className="text-5xl md:text-6xl font-black tracking-tighter mb-4 text-black">Device Collections</h1>
          <p className="text-lg text-neutral-600 max-w-lg">All tech gadgets directly fetched via your live Shopify connection.</p>
        </div>

        {products.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 bg-white/5 rounded-3xl border border-dashed border-white/10 backdrop-blur-sm">
             <span className="text-5xl mb-4">🛒</span>
             <h2 className="text-2xl font-bold text-white mb-2">No products found</h2>
             <p className="text-neutral-400 text-center max-w-md">Please log into Shopify Admin, upload a few devices, and the application will auto-sync.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product: any) => (
              <Link key={product.id} href={`/products/${product.handle}`} className="group block">
                <div className="aspect-[4/5] bg-neutral-100 rounded-3xl overflow-hidden mb-4 relative border border-neutral-200 p-6 mix-blend-multiply">
                  <div 
                    className="absolute inset-2 bg-contain bg-center bg-no-repeat transition-transform duration-700 group-hover:scale-105 mix-blend-multiply"
                    style={{ backgroundImage: `url(${product.image})` }}
                  />
                  <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <h3 className="text-lg font-bold tracking-tight text-black mb-1 leading-snug">{product.title}</h3>
                <p className="text-green-600 font-bold">{product.price}</p>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
