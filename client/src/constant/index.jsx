// export const SERVER_URL = process.env.REACT_APP_URL || "https://fakestoreapi.com "
export const SERVER_URL = "https://fakestoreapi.com";

console.log(SERVER_URL);
const version = "/api/v1";
export const URLS = {
  // PRODUCTS : SERVER_URL+ "api/v1/products" for actual api call

  PRODUCTS: version + "/products",
};
