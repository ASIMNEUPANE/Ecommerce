import API from "../utils/api.jsx";
import { URLS } from "../constants";

export const create = async (payload) => {
  return await API.post(URLS.ORDERS, payload);
};
