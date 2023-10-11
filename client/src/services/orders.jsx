import {API} from "../utils/API";
import { URLS } from "../constant";
export const create =async (payload) => {
    console.log(URLS.ORDERS, payload)
  return await API.post(URLS.ORDERS, payload);
};


