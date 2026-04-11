import { createStorefrontApiClient } from '@shopify/storefront-api-client';
import { createAdminApiClient } from '@shopify/admin-api-client';

const domain = process.env.SHOPIFY_STORE_DOMAIN || '';

// 1. Storefront Client (Public)
export const storefrontClient = createStorefrontApiClient({
  storeDomain: domain,
  publicAccessToken: process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN || '',
  apiVersion: process.env.PUBLIC_STOREFRONT_API_VERSION || '2025-01',
});

// 2. Admin Client (Private - Server Side Only)
export const adminClient = createAdminApiClient({
  storeDomain: domain,
  accessToken: process.env.SHOPIFY_ADMIN_ACCESS_TOKEN || '',
  apiVersion: '2025-04',
});

// GraphQL Fragments
export const PRODUCT_FIELDS = `
  id
  title
  handle
  descriptionHtml
  status
  priceRangeV2 {
    minVariantPrice {
      amount
      currencyCode
    }
  }
  images(first: 5) {
    edges {
      node {
        url
        altText
      }
    }
  }
`;

// Mutations
export const CREATE_PRODUCT_MUTATION = `
  mutation productCreate($input: ProductInput!) {
    productCreate(input: $input) {
      product {
        id
        title
        handle
      }
      userErrors {
        field
        message
      }
    }
  }
`;

export const UPDATE_PRODUCT_METAFIELD_MUTATION = `
  mutation metafieldsSet($metafields: [MetafieldsSetInput!]!) {
    metafieldsSet(metafields: $metafields) {
      metafields {
        id
        value
      }
      userErrors {
        field
        message
      }
    }
  }
`;
