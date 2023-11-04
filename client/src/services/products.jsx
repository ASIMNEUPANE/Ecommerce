import { URLS } from "../constants";
import API from "../utils/api";

export const list = async (limit,page) => {
  return await API.get(`${URLS.PRODUCTS}?limit=${limit}&page=${page}`);
};
export const create = async (paylaod) => {
  return await API.post(URLS.PRODUCTS,paylaod,{
    headers:{
      'Content-Type':'multipart/form-data'
    }
  });
};
export const getProduct = async (id) => {
  return await API.get(`${URLS.PRODUCTS}/${id}`);
};

