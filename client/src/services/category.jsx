import { URLS } from "../constants";
import API from "../utils/api.jsx";

export const list = async () => {
  return await API.get(URLS.CATEGORIES);
};
