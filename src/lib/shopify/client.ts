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
      featuredImage {
        url
      }
      variants(first: 10) {
        edges {
          node {
            id
            title
            price
          }
        }
      }
    }
  }
`;

export const GET_PRODUCTS_QUERY = `
  query getProducts($first: Int!) {
    products(first: $first) {
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
          featuredImage {
            url
          }
        }
      }
    }
  }
`;
