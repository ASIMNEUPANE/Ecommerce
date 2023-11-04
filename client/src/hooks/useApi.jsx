import { useState } from "react";
import API from "../utils/API";
import { fetchProducts } from "../slices/productSlice";
import { useDispatch } from "react-redux";
const useApi = () => {
    const dispatch = useDispatch()
  const [data, setData] = useState(false);
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState("");
  const [error, setError] = useState("");

  const deleteById = async (url, id ) => {
    try {
      setLoading(true);
      const { data } = await API.delete(`${url}/${id}`, {
        data: { isArchive: true },
      });
      if ((data.mssg = "success")) {
        dispatch(fetchProducts({}))
        setMsg("Data deleted successfully");
      }
    } catch (e) {
      const errMsg = e.message || "Something went wrong";
      setError(errMsg);
    } finally {
      setLoading(false);
    }
  };

  const updateById = async ({ url, id, payload }) => {
    try {
      setLoading(true);
      const { data } = await API.delete(`${url}/${id}`, payload);
      if ((data.mssg = "Success")) {
        setData(data.data);
        setMsg("Data updated successfully");
      }
    } catch (e) {
      const errMsg = e.message || "Something went wrong";
      setError(errMsg);
    } finally {
      setLoading(false);
    }
  };
  return { msg, data, loading, error , deleteById, updateById,};
};

export default useApi;
