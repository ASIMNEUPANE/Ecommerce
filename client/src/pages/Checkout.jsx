import "./Checkout.css";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { create } from "../slices/orderSlice";

export default function Checkout() {
  const navigate = useNavigate()
  const [checkoutUrl, setCheckoutUrl] = useState("");
  const { cart } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const [checkout, setCheckout] = useState({
    name: "",
    email: "",
    address: "",
    country: "",
    state: "",
    pobox: "",
    amount: 0,
    status: "",
    products: [],

    paymentMethod: "",
  });

  const getTotal = () => {
    return cart.reduce((acc, obj) => acc + obj.price * obj.quantity, 0);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = checkout;
    const {
      address,
      pobox,
      state,
      country,
      payment,
      nameOnCard,
      cardNumber,
      exp,
      paymentMethod,
      cvv,
      ...rest
    } = payload;

    rest.address = address.concat(" ", state, " ", pobox, " ", country);

    rest.amount = getTotal();
    const products = cart.map((item) => {
      return {
        product: item?.id,
        quantity: item?.quantity,
        price: item?.price,
        amount: Number(item?.quantity) * Number(item?.price),
      };
    });
    rest.products = products;
rest.checkoutUrl = checkoutUrl;
    // dispatch(create(rest));
    window.location.replace(checkoutUrl)
  };

  const [payment, setPayment] = useState("COD");

  const handlePaymentMethodChange = (e) => {
    const selectedPaymentMethod = e.target.value;
    setPayment(selectedPaymentMethod);

    if (selectedPaymentMethod === "CC" || selectedPaymentMethod === "Paypal") {
      setShowPaymentForm(true);
    } else {
      setShowPaymentForm(false);
    }
  };
  const createPayments = useCallback(() => {
    return cart.map((item) => {
      return {
        price_data: {
          currency: "usd",
          product_data: {
            name: item?.title,
          },
          unit_amount: item?.price,
        },
        quantity: item?.quantity,
      };
    });
  }, [cart]);

  const createPaymentIntent = useCallback(() => {
    async function createCheckoutSession(data) {
      try {
        const response = await fetch(
          "http://localhost:3333/create-checkout-session",
          {
            method: "POST", // or 'PUT'
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
          }
        );

        const result = await response.json();
        setCheckoutUrl(result?.data)
       
      } catch (error) {
        console.error("Error:", error);
      }
    }

    createCheckoutSession(createPayments());
  }, [createPayments]);

  useEffect(() => {
    createPaymentIntent()
  }, [createPaymentIntent]);
  return (
    <>
      <div className="row">
        <div className="col-md-4 order-md-2 mb-4">
          <h4 className="d-flex justify-content-between align-items-center mb-3">
            <span className="text-muted">Your cart</span>
            <span className="badge badge-secondary badge-pill">3</span>
          </h4>
          <ul className="list-group mb-3">
            {cart.length > 0 ? (
              cart.map((item, index) => {
                return (
                  <li
                    key={index}
                    className=" p-3 list-group-item d-flex justify-content-between lh-condensed"
                  >
                    <div>
                      <h6 className="my-0">
                        <span className="badge bg-secondary">
                          {item?.quantity}
                        </span>
                        &nbsp;
                        {item?.title.length > 25
                          ? item?.title.substring(0, 28).concat("...")
                          : item?.title}
                      </h6>
                      <small className="text-muted">
                        {" "}
                        {item?.description.length > 30
                          ? item?.description.substring(0, 50).concat("...")
                          : item?.description}
                      </small>
                    </div>
                    <span className="text-muted">
                      {Number(item?.price) * Number(item?.quantity)}
                    </span>
                  </li>
                );
              })
            ) : (
              <>Your Cart is Empty</>
            )}

            <li className="list-group-item d-flex justify-content-between">
              <span>Total (NPR)</span>
              <strong>{getTotal()}</strong>
            </li>
          </ul>
        </div>
        <div className="col-md-8 order-md-0">
          <h4 className="mb-3">Billing address</h4>
          <form className="needs-validation" noValidate>
            <div className="row">
              <div className="col-md-02 mb-3">
                <label htmlFor="fullName">Full name</label>
                <input
                  type="text"
                  className="form-control"
                  id="fullName"
                  placeholder="Asim Neupane"
                  value={checkout?.name}
                  onChange={(e) =>
                    setCheckout((prev) => {
                      return { ...prev, name: e.target.value };
                    })
                  }
                  required
                />
                <div className="invalid-feedback">
                  Valid Full name is required.
                </div>
              </div>
            </div>

            <div className="mb-3">
              <label htmlFor="email">
                Email <span className="text-muted">(Optional)</span>
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                placeholder="you@example.com"
                value={checkout?.email}
                onChange={(e) =>
                  setCheckout((prev) => {
                    return { ...prev, email: e.target.value };
                  })
                }
              />
              <div className="invalid-feedback">
                Please enter a valid email address for shipping updates.
              </div>
            </div>

            <div className="mb-3">
              <label htmlFor="address">Address</label>
              <input
                type="text"
                className="form-control"
                id="address"
                placeholder="0234 Main St"
                required
                value={checkout?.address}
                onChange={(e) =>
                  setCheckout((prev) => {
                    return { ...prev, address: e.target.value };
                  })
                }
              />
              <div className="invalid-feedback">
                Please enter your shipping address.
              </div>
            </div>

            <div className="row">
              <div className="col-md-5 mb-3">
                <label htmlFor="country">Country</label>
                <select
                  className="form-select"
                  required
                  value={checkout?.country}
                  onChange={(e) =>
                    setCheckout((prev) => {
                      return { ...prev, country: e.target.value };
                    })
                  }
                >
                  <option value="">Choose...</option>
                  <option value="Nepal">Nepal</option>
                </select>
                <div className="invalid-feedback">
                  Please select a valid country.
                </div>
              </div>
              <div className="col-md-4 mb-3">
                <label htmlFor="state">State</label>
                <select
                  className="form-select"
                  id="state"
                  required
                  value={checkout?.state}
                  onChange={(e) =>
                    setCheckout((prev) => {
                      return { ...prev, state: e.target.value };
                    })
                  }
                >
                  <option value="">Choose...</option>
                  <option value="Bagmati">Bagmati</option>
                  <option value="Gandaki">Gandaki</option>
                  <option value="Karnali">Karnali</option>
                  <option value="Koshi">Koshi</option>
                  <option value="Lumbini">Lumbini</option>
                  <option value="Madhesh">Madhesh</option>
                  <option value="Sudurpashchim">Sudurpashchim</option>
                </select>
                <div className="invalid-feedback">
                  Please provide a valid state.
                </div>
              </div>
              <div className="col-md-3 mb-3">
                <label htmlFor="zip">P.O. Box</label>
                <input
                  type="text"
                  className="form-control"
                  id="zip"
                  placeholder=""
                  required
                  value={checkout?.pobox}
                  onChange={(e) =>
                    setCheckout((prev) => {
                      return { ...prev, pobox: e.target.value };
                    })
                  }
                />
                <div className="invalid-feedback">Zip code required.</div>
              </div>
            </div>
            <hr className="mb-4" />

            <h4 className="mb-3">Payment</h4>

            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="inlineRadioOptions"
                value="COD"
                checked={payment === "COD"}
                onChange={handlePaymentMethodChange}
              />
              <label className="form-check-label" htmlFor="inlineRadio0">
                Cash on delivery
              </label>
            </div>

           

            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="inlineRadioOptions"
                value="Paypal"
                checked={payment === "Paypal"}
                onChange={handlePaymentMethodChange}
              />
              <label className="form-check-label" htmlFor="inlineRadio3">
              Stripe
              </label>
            </div>

            {/* --------------------------------------------------------------------- */}
            <hr className="mb-4" />

            <div className="d-grid gap-2">
              <button
                className="btn btn-secondary btn-lg btn-block"
                onClick={(e) => handleSubmit(e)}
              >
                Continue to checkout
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
