import "./Products.css";
import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { BsEye } from "react-icons/bs";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { addtoCart } from "../slices/cartSlice";
import { fetchProducts } from "../slices/productSlice";
import SkeletalLoader from "../components/SkeletalLoader";

const Products = () => {
  const { products, loading } = useSelector((state) => state.products);

  const dispatch = useDispatch();

  const initFetch = useCallback(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

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
                    <div className="col-6 col-lg-3" key={product?.id || index}>
                      <div className="product-card-10">
                        <div className="product-card-image">
                          <div className="product-media">
                            <a href="#">
                              <img
                                className="img-fluid fixed-size  "
                                src={
                                  product?.image ||
                                  "https://www.bootdey.com/image/380x380/FF00FF/000000"
                                }
                                title={product?.title || ""}
                                alt={product?.title || ""}
                              />
                            </a>
                          </div>
                        </div>
                        <div className="product-card-info">
                          <h6 className="product-title">
                            <a href="#">
                              {product?.title.length > 30
                                ? product.title.substring(0, 25).concat("...")
                                : product?.title}
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
                              to={`/products/${product?.id}`}
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
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Products;
