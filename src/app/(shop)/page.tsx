import HomePageClient from './HomePageClient';
import { shopifyClient, GET_PRODUCTS_QUERY, GET_PRODUCT_QUERY } from "@/src/lib/shopify/client";

export const dynamic = 'force-dynamic';

export default async function Home() {
  let featuredProduct = null;

  try {
    const result: any = await shopifyClient.request(GET_PRODUCTS_QUERY, { first: 5 });
    
    // Nếu cửa hàng chưa có bất kỳ sản phẩm CÔNG NGHỆ nào, mock loa BoomBox
    const edges = result?.products?.edges || [];
    if (edges.length > 0 && edges[0].node.title.toLowerCase().includes('chair') === false) {
      const handle = edges[0].node.handle;
      const detailResult: any = await shopifyClient.request(GET_PRODUCT_QUERY, { handle });
      const liveData = detailResult?.product;
      if (liveData) {
         featuredProduct = {
           title: liveData.title,
           handle: liveData.handle,
           modelUrl: liveData.metafield?.value || null,
         };
      }
    } else {
      featuredProduct = {
        title: 'Sony BoomBox XG500',
        handle: 'mock-boombox',
        modelUrl: 'https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/BoomBox/glTF-Binary/BoomBox.glb'
      };
    }
  } catch (e) {
    featuredProduct = {
      title: 'Sony BoomBox XG500',
      handle: 'mock-boombox',
      modelUrl: 'https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/BoomBox/glTF-Binary/BoomBox.glb'
    };
  }

  return <HomePageClient featuredProduct={featuredProduct} />;
}
