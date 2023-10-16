
import {API} from "../utils/API";

export const list =async () => {
  return API.get("https://fakestoreapi.com/products");
};


