import axios from "axios";
import { SERVER_URL } from "../constant";

export const API = axios.create({
  baseURL: SERVER_URL,
  headers: {
    "Content-Type": "application/json",
    Authorization: localStorage.getItem("user")
      ? "Bearer " + JSON.parse(localStorage.getItem("user")).token
      : null,
  },
});

