import API from "../utils/API";
import { URLS } from "../constants";

export const login = async (payload) => {
  return await API.post(URLS.AUTH + "/login", payload);
};
