import "./Products.css";
import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { BsEye } from "react-icons/bs";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { addtoCart } from "../slices/cartSlice";
import {
  fetchProducts,
  setCurrentPage,
  setLimit,
} from "../slices/productSlice";
import SkeletalLoader from "../components/SkeletalLoader";
import Paginate from "../components/Paginate";

const Products = () => {
  const { products, loading, limit, total, currentPage } = useSelector(
    (state) => state.products
  );
  const dispatch = useDispatch();

  const initFetch = useCallback(() => {
    dispatch(fetchProducts({ limit, page: currentPage }));
  }, [dispatch, limit, currentPage]);

  useEffect(() => {
    initFetch();
  }, [initFetch]);

  return (
    <>
      <div className="productBody">
        <section className="section">
          <div className="container">
            <div className="row justify-content-center section-heading">
              <div className="col-lg-6 text-center">
                <h3 className="h2 mt-2">Latest Arrivals</h3>
              </div>
            </div>
            <div className="row g-3 g-lg-4">
              {products && products.length > 0 ? (
                products.map((product, index) => {
                  return (
                    <div className="col-6 col-lg-3" key={product?._id || index}>
                      <div className="product-card-10">
                        <div className="product-card-image">
                          {product?.quantity < 1 && (
                            <div className="badge-ribbon">
                              <span className="badge bg-danger">
                                Out of Stock
                              </span>
                            </div>
                          )}
                          <div className="product-media">
                            <Link to = {`/products/${product._id}`} >
                              <img
                                className="img-fluid fixed-size  "
                                src={
                                  product?.images[0] ||
                                  "https://www.bootdey.com/image/380x380/FF00FF/000000"
                                }
                                title={product?.name || ""}
                                alt={product?.name || ""}
                              />
                            </Link>
                          </div>
                        </div>
                        <div className="product-card-info">
                          <h6 className="product-title">
                            <a href="#">
                              {product?.name.length > 30
                                ? product.name.substring(0, 25).concat("...")
                                : product?.name}
                            </a>
                          </h6>
                          <div className="product-price">
                            <span className="text-primary">
                              NPR {product?.price || ""}
                            </span>
                          </div>
                          <div className="product-action">
                            <Link
                              className="btn bg-dark "
                              to={`/products/${product?._id}`}
                            >
                              <i className="BsEye">
                                <BsEye />
                              </i>
                            </Link>
                            <button
                              className="btn  bg-dark"
                              onClick={() => {
                                dispatch(addtoCart(product));
                              }}
                              disabled={product.quantity < 1 ? true : false}
                            >
                              <i className="AiOutlineShoppingCart ">
                                <AiOutlineShoppingCart />
                              </i>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="container">
                  {products.length === 0 && !loading && (
                    <div className="p-5 text-center text-primary">
                      No Products Found...
                    </div>
                  )}
                  {products.length === 0 && loading && (
                    <div className="row mt-4">
                      <div className="col ">
                        <SkeletalLoader />
                      </div>
                      <div className="col">
                        <SkeletalLoader />
                      </div>
                      <div className="col">
                        <SkeletalLoader />
                      </div>
                      <div className="col">
                        <SkeletalLoader />
                      </div>
                    </div>
                  )}
                </div>
              )}
              <Paginate
                setLimit={setLimit}
                dispatch={dispatch}
                total={total}
                limit={limit}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
              />
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Products;
