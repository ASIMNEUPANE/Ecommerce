import { URLS } from "../constants";
import API from "../utils/API";

export const list = async () => {
  return await API.get(URLS.CATEGORIES);
};
