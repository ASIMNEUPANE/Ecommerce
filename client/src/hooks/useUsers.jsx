import { useState, useCallback } from "react";
import API from "../utils/api.jsx";
import { URLS } from "../constants";

export const useUsers = () => {
  const [data, setData] = useState([]);

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");

  const create = async (payload) => {
    try {
      setLoading(true);
      const { data } = await API.post(URLS.USERS, payload);
      setData(data?.data);
      setMsg("Users added Successfully");
      return data;
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
        `${URLS.USERS}?page=${page}&size=${limit}`
      );
      setData(data?.data?.data);
      setMsg("Users fetch Successfully");
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
      const { data } = await API.get(`${URLS.USERS}/${id}`);
      setMsg("Users fetch Successfully");
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

      const { data } = await API.put(`${URLS.USERS}/profile`, payload);
      return data;
    } catch (e) {
      const setErr = e.response ? e.response.data.msg : "Something went wrong";
      setError(setErr);
    } finally {
      setLoading(false);
    }
  };
  const deleteById = async (id, payload) => {
    try {
      setLoading(true);
      const result = await API.delete(`${URLS.USERS}/${id}`, { data: payload });

      return result;
    } catch (e) {
      const setErr = e.response ? e.response.data.msg : "Something went wrong";
      setError(setErr);
      throw setErr;
    } finally {
      setLoading(false);
    }
  };

  const blockUser = async (id, payload) => {
    //   {isActive : true}
    try {
      setLoading(true);
      const { data } = await API.patch(`${URLS.USERS}/status/${id}`, payload);
      setMsg("User Block successfully");
      return data.data;
    } catch (e) {
      const setErr = e.response ? e.response.data.msg : "Something went wrong";
      setError(setErr);
    } finally {
      setLoading(false);
    }
  };

  return {
    data,
    msg,
    error,
    loading,
    blockUser,
    list,
    create,
    getById,
    updateById,
    deleteById,
  };
};
