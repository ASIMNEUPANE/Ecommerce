import { Image } from "react-bootstrap";
import "./Checkout.css";
import { Link } from "react-router-dom";
import { AiFillCloseCircle } from "react-icons/ai";
import { BsArrowLeftSquare } from "react-icons/bs";
import numberFormatter from "number-formatter";
import { useDispatch, useSelector } from "react-redux";

import {
  decreaseQuantity,
  increaseQuantity,
  removeItem,
} from "../slices/cartSlice";

const Cart = () => {
  const { cart } = useSelector((state) => state.cart);
  const { products } = useSelector((state) => state.products);
  const dispatch = useDispatch();
  const removeCart = (id) => {
    dispatch(removeItem(id));
  };
  const getTotal = () => {
    return cart.reduce(
      (acc, obj) => acc + Number(obj?.quantity) * Number(obj?.price),
      0
    );
  };

  const increase = (id) => {
    if (id) dispatch(increaseQuantity(id));
  };
  const decrease = (id) => {
    if (id) dispatch(decreaseQuantity(id));
  };
  return (
    <>
      {cart.length > 0 ? (
        <FilledCart
          products={products}
          items={cart}
          removeCart={removeCart}
          getTotal={getTotal}
          increase={increase}
          decrease={decrease}
        />
      ) : (
        <EmptyCart />
      )}
    </>
  );
};

const FilledCart = ({
  items,
  products,
  removeCart,
  getTotal,
  increase,
  decrease,
}) => {
  return (
    <>
      <>
        <h1 className="text-center m-5">Your Cart</h1>
        <div className="row">
          <div className="col-md-12">
            <table className="table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Image</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Total Price (NPR)</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {items.map((item, index) => {
                  return (
                    <tr key={item?._id || index}>
                      <td>
                        {item?.name.length > 25
                          ? item?.name.substring(0, 35).concat("...")
                          : item?.name}
                      </td>
                      <td>
                        <Image
                          width={40}
                          height={40}
                          src={item?.images}
                          thumbnail
                        />
                      </td>
                      <td>
                        {numberFormatter("NPR #,###.##", Number(item?.price))}
                      </td>
                      <td>
                        <span
                          className="btn btn-primary"
                          style={{ margin: "2px" }}
                          onClick={() => {
                            decrease(item?._id);
                          }}
                        >
                          -
                        </span>
                        <span className="btn btn-info">{item?.quantity}</span>
                        <span
                          className="btn btn-primary"
                          style={{ margin: "2px" }}
                          onClick={() => {
                            increase({ id: item?._id, products });
                          }}
                        >
                          +
                        </span>
                      </td>
                      <td>
                        {numberFormatter(
                          "NPR #,###.##",
                          Number(item?.price) * Number(item?.quantity)
                        )}
                      </td>
                      <td>
                        <AiFillCloseCircle
                          color="red"
                          size={24}
                          onClick={() => {
                            removeCart(item?._id);
                          }}
                        />
                      </td>
                    </tr>
                  );
                })}
                <tr>
                  <td colSpan="5">Total Carts</td>
                  <td>{numberFormatter("NPR #,###.##", Number(getTotal()))}</td>
                </tr>
                <tr>
                  <td colSpan="5"></td>
                  <td>
                    {" "}
                    <Link to={"/Checkout"}>Checkout</Link>{" "}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </>
    </>
  );
};

const EmptyCart = () => {
  return (
    <>
      <div className="p-5 bg-body-tertiary rounded-3 text-center">
        <div className="container-fluid py-5">
          <h1 className="display-5 fw-bold">Your cart is empty</h1>
          <a className="btn btn-light btn-lg" href="/products">
            <BsArrowLeftSquare />
            &nbsp;Continue Shopping
          </a>
        </div>
      </div>
    </>
  );
};

export default Cart;
