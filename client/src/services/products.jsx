import {API} from "../utils/API";

export const list = () => {
  return API.get("/products");
};


