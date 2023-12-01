import { URLS } from "../constants";
import API from "../utils/api.jsx";

export const list = async (limit, page) => {
  return API.get(`${URLS.PRODUCTS}?limit=${limit}&page=${page}`);
};

export const create = async (payload) => {
  try {
    return API.post(URLS.PRODUCTS, payload, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  } catch (e) {
    console.log(e);
  }
};

export const getProduct = async (id) => {
  return API.get(`${URLS.PRODUCTS}/${id}`);
};
