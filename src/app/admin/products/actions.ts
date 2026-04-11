'use server';

import { adminClient, CREATE_PRODUCT_MUTATION, UPDATE_PRODUCT_METAFIELD_MUTATION } from '@/src/lib/shopify/clients';
import { revalidatePath } from 'next/cache';

export async function createShopifyProduct(formData: FormData) {
  const title = formData.get('title') as string;
  const descriptionHtml = formData.get('description') as string;
  const price = formData.get('price') as string;
  const modelUrl = formData.get('modelUrl') as string;

  try {
    // 1. Create the product
    const productResponse = await adminClient.request(CREATE_PRODUCT_MUTATION, {
      variables: {
        input: {
          title,
          descriptionHtml,
          status: 'ACTIVE',
          variants: [{
            price,
          }]
        }
      }
    });

    const product = (productResponse.data as any)?.productCreate?.product;
    const errors = (productResponse.data as any)?.productCreate?.userErrors;

    if (errors?.length > 0) {
      return { error: errors[0].message };
    }

    // 2. If there's a 3D model, set the metafield
    if (modelUrl && product?.id) {
      await adminClient.request(UPDATE_PRODUCT_METAFIELD_MUTATION, {
        variables: {
          metafields: [{
            ownerId: product.id,
            namespace: "custom",
            key: "model_3d",
            value: modelUrl,
            type: "single_line_text_field"
          }]
        }
      });
    }

    revalidatePath('/admin/products');
    revalidatePath('/');
    
    return { success: true, productId: product.id };
  } catch (error) {
    console.error('Shopify Admin Error:', error);
    return { error: 'Failed to sync with Shopify. Please check your Admin API Token.' };
  }
}
