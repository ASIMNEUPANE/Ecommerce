import { useState, useCallback } from "react";
import API from "../utils/api.jsx";
import { URLS } from "../constants";

export const useCategories = () => {
  const [data, setData] = useState([]);
  const [categories, setCategories] = useState();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");

  const create = async (payload) => {
    try {
      setLoading(true);
      const { data } = await API.post(URLS.CATEGORIES, payload);
      setData(data?.data?.data);

      setMsg("Categories added Successfully");
    } catch (e) {
      const setErr = e.response ? e.response.data.msg : "Something went wrong";
      setError(setErr);
      throw setErr;
    } finally {
      setLoading(false);
    }
  };

  const list = useCallback(async ({ page, limit }) => {
    try {
      setLoading(true);
      const { data } = await API.get(
        `${URLS.CATEGORIES}?page=${page}&limit=${limit}`
      );
      setData(data?.data?.data);
      setMsg("Categories fetch Successfully");
      return data.data;
    } catch (e) {
      const setErr = e.response ? e.response.data.msg : "Something went wrong";
      setError(setErr);
    } finally {
      setLoading(false);
    }
  }, []);

  const getById = useCallback(async (id) => {
    try {
      setLoading(true);
      const { data } = await API.get(`${URLS.CATEGORIES}/${id}`);
      setCategories(data?.data);
      setMsg("Categories fetch Successfully");
      return data.data;
    } catch (e) {
      const setErr = e.response ? e.response.data.msg : "Something went wrong";
      setError(setErr);
      throw setErr;
    } finally {
      setLoading(false);
    }
  }, []);

  const updateById = async (id, payload) => {
    try {
      setLoading(true);
      const result = await API.put(`${URLS.CATEGORIES}/${id}`, payload);
      return result;
    } catch (e) {
      const setErr = e.response ? e.response.data.msg : "Something went wrong";
      setError(setErr);
    } finally {
      setLoading(false);
    }
  };
  const deleteById = async (id) => {
    try {
      setLoading(true);
      const result = await API.delete(`${URLS.CATEGORIES}/${id}`);

      return result;
    } catch (e) {
      const setErr = e.response ? e.response.data.msg : "Something went wrong";
      setError(setErr);
      throw setErr;
    } finally {
      setLoading(false);
    }
  };

  return {
    data,
    msg,
    error,
    loading,
    categories,
    list,
    create,
    getById,
    updateById,
    deleteById,
  };
};
