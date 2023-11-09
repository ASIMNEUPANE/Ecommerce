import { useCallback, useState } from "react";
import API from "../utils/API";
import { URLS } from "../constants";

export const useOrder = () => {
  const [data, setData] = useState([]);
  const [order, setOrder] = useState({});
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");

  const create = async (payload) => {
    try {
      setLoading(true);
      const { data } = await API.post(URLS.ORDERS, payload);
      setData(data?.data);
      setMsg("Orders Added Successfully");
      return data;
    } catch (e) {
      const errMsg = e.response
        ? e.response.data.msg
        : "Something went wrong...";
      setError(errMsg);
      throw errMsg;
    } finally {
      setLoading(false);
    }
  };

  const list = useCallback(async ({page,limit}) => {
    try {
      setLoading(true);
      const { data } = await API.get(`${URLS.ORDERS}?page=${page}&limit=${limit}`);
      
      setData(data.data?.data);
    } catch (e) {
      const errMsg = e.response ? e.response?.data.msg : "Something went wrong";
      setError(errMsg);
    } finally {
      setLoading(false);
    }
  }, []);

  const getById = useCallback(async (id) => {
    try {
      setLoading(true);
      const { data } = await API.get(`${URLS.ORDERS}/${id}`);
      setOrder(data.data);
      return data.data;
    } catch (e) {
      const errMsg = e.response ? e.response?.data.msg : "Something went wrong";
      setError(errMsg);
    } finally {
      setLoading(false);
    }
  }, []);

  const updateById = async (id, payload) => {
    try {
      setLoading(true);
      const result = await API.put(`${URLS.ORDERS}/${id}`, payload);
      console.log({result},"apii")
      return result;

      
    } catch (e) {
      const errMsg = e.response ? e.response?.data.mssg : "Something went wrong";
      setError(errMsg);
    } finally {
      setLoading(false);
    }
  };
  const deleteById = async (id) => {
    try {
      const result = await API.delete(`${URLS.ORDERS}/${id}`);
      return result;
    } catch (e) {
      console.log(e,"e")
      const errMsg = e.response ? e.response?.data.msg : "Something went wrong";
      setError(errMsg);
    } finally {
      setLoading(false);
    }
  };
  const approve = async (id,payload) => {
    try {
      const result = await API.patch(`${URLS.ORDERS}/status/${id}`,payload);
      return result;
    } catch (e) {
     
      const errMsg = e.response ? e.response?.data.msg : "Something went wrong";
      setError(errMsg);
    } finally {
      setLoading(false);
    }
  };

  return { data, order,approve, create, list, getById, updateById, deleteById };
};
