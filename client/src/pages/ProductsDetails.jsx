import "./ProductDetail.css";
import { Link, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { SERVER_URL } from "../constants";
import { useCallback, useEffect, useState } from "react";
import { getById } from "../slices/productSlice";

import { updatetoCart } from "../slices/cartSlice";

const ProductsDetails = () => {
  const { id } = useParams();
  const { product, products } = useSelector((state) => state.products);

  const dispatch = useDispatch();

  const [quantity, setQuantity] = useState(1);
  const [random4Items, setRandom4Items] = useState([]);

  const getProduct = useCallback(() => {
    dispatch(getById(id));
  }, [dispatch, id]);

  const getRandomProducts = useCallback(() => {
    const firstRandomeIndex = Math.floor(Math.random() * products.length);
    const secondRandomeIndex = Math.floor(Math.random() * products.length);
    const thirdRandomeIndex = Math.floor(Math.random() * products.length);
    const fourthRandomeIndex = Math.floor(Math.random() * products.length);
    const randproduct = [
      products[firstRandomeIndex],
      products[secondRandomeIndex],
      products[thirdRandomeIndex],
      products[fourthRandomeIndex],
    ];
    setRandom4Items(randproduct);
  }, [products]);

  useEffect(() => {
    getProduct();
    getRandomProducts();
  }, [getProduct, getRandomProducts]);

  return (
    <section className="">
      <div className="container flex mt-2 d-flex justify-content-center">
        <div className="col-lg-8 border p-2 bg-white">
          <div className="row hedding m-0 pl-3 pt-0 pb-3">
            {product?.quantity < 1 && (
              <div className="text-danger">Out of the stock</div>
            )}
          </div>
          <div className="row m-0">
            <div className="col-lg-4 left-side-product-box pb-3">
              <img
                src={
                  product?.images[0] && product?.images[0].includes("https:")
                    ? product?.images[0]
                    : SERVER_URL + "/" + product?.images[0] ||
                      "https://www.bootdey.com/image/380x380/FF00FF/000000"
                }
                className="border p-3"
              />
              <span className="sub-img">
                {product?.images && product?.images.length > 0
                  ? product.images.slice(1).map((image, index) => {
                      return (
                        <img
                          key={index}
                          src={
                            image.includes("https:")
                              ? image
                              : SERVER_URL + "/" + image ||
                                "https://www.bootdey.com/image/380x380/FF00FF/000000"
                          }
                          className="border p-2"
                        />
                      );
                    })
                  : null}
              </span>
            </div>
            <div className="col-lg-8">
              <div className="right-side-pro-detail border p-3 m-0">
                <div className="row">
                  <div className="col-lg-12">
                    <span>
                      {product?.alias?.product ? alias.toString() : ""}
                    </span>
                    <p className="m-0 p-0"> {product?.name}</p>
                  </div>
                  <div className="col-lg-12">
                    <p className="m-0 p-0 price-pro">NPR{product?.price}</p>
                    <hr className="p-0 m-0" />
                  </div>
                  <div className="col-lg-12 pt-2">
                    <h5>Product Detail</h5>
                    <span>{product?.description}</span>
                    <hr className="m-0 pt-2 mt-2" />
                  </div>
                  <div className="col-lg-12">
                    <p className="tag-section">
                      <strong>Tag : </strong>
                      <a href="">{product?.category_name}</a>
                    </p>
                  </div>
                  <div className="col-lg-12">
                    <h6>Quantity : {product?.quantity}</h6>
                    <input
                      onChange={(e) => setQuantity(Number(e.target.value))}
                      value={quantity}
                      type="number"
                      max={product?.quantity}
                      className="form-control text-center w-100"
                      min={1}
                      disabled={product?.quantity === 0}
                    />
                  </div>
                  <div className="col-lg-12 mt-3">
                    <div className="row">
                      <div className="col-lg-6 pb-2">
                        <button
                          className="btn btn-danger w-100"
                          onClick={() => {
                            dispatch(updatetoCart({ product, quantity }));
                          }}
                          disabled={product?.quantity === 0}
                        >
                          Add To Cart
                        </button>
                      </div>
                      <div className="col-lg-6">
                        <Link
                          to="/checkout"
                          className={`btn btn-success w-100${
                            product?.quantity === 0 ? " disabled" : ""
                          }`}
                        >
                          Shop Now
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-12 text-center pt-3">
              <h4>More Product</h4>
            </div>
          </div>
          <div className="row mt-3 p-0 text-center pro-box-section">
            {random4Items.map((item, index) => {
              return (
                <div key={index} className="col-lg-3 pb-2">
                  <div className="pro-box border p-0 m-0">
                    <Link to={`/products/${item?._id}`}>
                      <img
                        src={
                          item?.images[0] && item?.images[0].includes("https:")
                            ? item?.images[0]
                            : SERVER_URL + "/" + item?.images[0] ||
                              "https://www.bootdey.com/image/380x380/FF00FF/000000"
                        }
                      />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductsDetails;
