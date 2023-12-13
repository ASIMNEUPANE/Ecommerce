import Tables from "../../../components/Table";
import '../../../components/init'
import { Link } from "react-router-dom";
import { useCallback, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchProducts, setCurrentPage,setLimit } from "../../../slices/productSlice";
import Paginate from "../../../components/Paginate";
import useApi from "../../../hooks/useApi";
import { URLS } from "../../../constants";

function AdminProducts() {
  const { products, limit,total, currentPage } = useSelector(
    (state) => state.products
  );
  const dispatch = useDispatch();

  const { msg, deleteById } = useApi();

  const initFetch = useCallback(() => {
    dispatch(fetchProducts({ limit, page: currentPage }));
  }, [dispatch,limit, currentPage]);

  const headers = ["ID", "Name", "Quantity", "Price"];

  useEffect(() => {
    initFetch();
  }, [initFetch]);

  return (
    <>
      <div className="mb-2 flex d-flex justify-content-end">
        <Link to="/admin/products/add">
          <button className="btn btn-danger">Add New Product</button>
        </Link>
      </div>
      <Tables
        data={products}
        headers={headers}
        remove={deleteById}
        msg={msg}
        url={URLS.PRODUCTS}
      />
            <Paginate
                dispatch={dispatch}
                setLimit={setLimit}
                total={total}
                limit={limit}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
              />
    </>
  );
}

export default AdminProducts;
