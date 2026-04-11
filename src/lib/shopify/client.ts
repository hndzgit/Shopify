import { GraphQLClient } from 'graphql-request';

const rawDomain = process.env.SHOPIFY_STORE_DOMAIN || '';
const domain = rawDomain.replace(/^https?:\/\//, '').replace(/\/$/, '');
const accessToken = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN;
const apiVersion = process.env.PUBLIC_STOREFRONT_API_VERSION || '2025-01';

const endpoint = `https://${domain}/api/${apiVersion}/graphql.json`;

export const shopifyClient = new GraphQLClient(endpoint, {
  headers: {
    'X-Shopify-Storefront-Access-Token': accessToken || '',
    'Content-Type': 'application/json',
  },
});

export const PRODUCT_FRAGMENT = `
  fragment ProductFragment on Product {
    id
    title
    handle
    description
    descriptionHtml
    availableForSale
    priceRange {
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
          width
          height
        }
      }
    }
    variants(first: 10) {
      edges {
        node {
          id
          title
          availableForSale
          price {
            amount
            currencyCode
          }
          selectedOptions {
            name
            value
          }
        }
      }
    }
    metafields(identifiers: [{namespace: "custom", key: "model_3d"}]) {
      id
      key
      value
      reference {
        ... on MediaImage {
          image {
            url
          }
        }
        ... on GenericFile {
          url
        }
      }
    }
  }
`;

export const GET_PRODUCT_QUERY = `
  ${PRODUCT_FRAGMENT}
  query getProduct($handle: String!) {
    product(handle: $handle) {
      ...ProductFragment
    }
  }
`;

export const GET_PRODUCTS_QUERY = `
  ${PRODUCT_FRAGMENT}
  query getProducts($first: Int!) {
    products(first: $first) {
      edges {
        node {
          ...ProductFragment
        }
      }
    }
  }
`;
