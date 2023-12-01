import API from "../utils/api.jsx";
import { URLS } from "../constants";

export const login = async (payload) => {
  return await API.post(URLS.AUTH + "/login", payload);
};
