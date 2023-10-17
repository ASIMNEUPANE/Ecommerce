import API from "../utils/api";

export const list = async () => {
  return API.get("https://fakestoreapi.com/products");
};
