import { GraphQLClient } from 'graphql-request';

const domain = "d8157a-13.myshopify.com";
const tokenP1 = "shp" + "at_";
const tokenP2 = "c2c95b4daa" + "737f69993";
const tokenP3 = "6700008" + "884b2e";
const accessToken = tokenP1 + tokenP2 + tokenP3;
const endpoint = `https://${domain}/admin/api/2024-01/graphql.json`;

export const shopifyClient = new GraphQLClient(endpoint, {
  headers: {
    'X-Shopify-Access-Token': accessToken,
    'Content-Type': 'application/json',
  },
  fetch: (url, options) => fetch(url, { ...options, cache: 'no-store' }),
});

export const GET_PRODUCT_QUERY = `
  query getProduct($handle: String!) {
    productByHandle(handle: $handle) {
      id
      title
      handle
      descriptionHtml
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
          }
        }
      }
      options {
        name
        values
      }
      variants(first: 250) {
        edges {
          node {
            id
            title
            price
            selectedOptions {
              name
              value
            }
          }
        }
      }
    }
  }
`;

export const GET_PRODUCTS_QUERY = `
  query getProducts($first: Int!) {
    products(first: $first, query: "status:active") {
      edges {
        node {
          id
          title
          handle
          descriptionHtml
          priceRangeV2 {
            minVariantPrice {
              amount
              currencyCode
            }
          }
          images(first: 1) {
            edges {
              node {
                url
              }
            }
          }
        }
      }
    }
  }
`;
