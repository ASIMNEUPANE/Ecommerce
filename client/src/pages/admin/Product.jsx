import Tables from "../../components/Table";
import {  useDispatch, useSelector } from "react-redux";
import { useCallback, useEffect } from "react";
import {fetchProducts} from "../../slices/productSlice";
import { Link } from "react-router-dom";
import useApi from "../../hooks/useApi";
import { URLS } from "../../constants";
// import AddProduct from "./AddProduct";
function AdminProducts() {
  const { products, loading, limit, total,page, currentPage } = useSelector(
    (state) => state.products
  );
  const dispatch = useDispatch();
  const {msg,deleteById}= useApi()
  const initFetch = useCallback(() => {
    dispatch(fetchProducts({limit,page,currentPage}))
  }, [dispatch,currentPage,limit]);

  const headers = ["ID","Name", "Quantity", "Price"]

   useEffect(()=>{
    initFetch()
  },[initFetch,products])
  return (
    <>
    <div className=" mb-2 flex d-flex justify-content-end">
      <Link to='/admin/products/add'> <button className=" btn btn-danger">Add product</button></Link>
   

    </div>
    {/* <AddProduct/> */}
      <Tables data={products} headers={headers} remove={deleteById}  msg={msg} url={URLS.PRODUCTS}  />
      
    </>
  );
}

export default AdminProducts;
