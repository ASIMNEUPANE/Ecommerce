import API from "../utils/API";
import { URLS } from "../constants";

export const create = async (payload) => {
  return await API.post(URLS.ORDERS, payload);
};
