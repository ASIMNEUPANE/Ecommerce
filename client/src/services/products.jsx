import axios from "axios";
import {API} from "../utils/API";

export const list =async () => {
  return axios.get("https://fakestoreapi.com/products");
};


