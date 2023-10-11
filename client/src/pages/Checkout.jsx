import { useState } from "react";
import "./Checkout.css";
import { useSelector } from "react-redux";

export default function Checkout() {
  const { cart } = useSelector((state) => state.cart);
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
    payment: [
      {
        nameOnCard: "",
        cardNumber: "",
        exp: "",
        cvv: "",
      },
    ],
    paymentMethod: "",
  });

  const getTotal = () => {
    return cart.reduce((acc, obj) => acc + obj.price * obj.quantity, 0);
     
  };

  const handleSubmit=(e)=>{
    e.preventDefault();
    const payload = checkout
    payload.amount = getTotal()
    const  products = cart.map((item)=>{
      return{
        product: item?.id,
        quantity: item?.quantity,
        price: item?.price,
        amount: Number(item?.quantity) * Number(item?.price),
      };
    })
    payload.products = products;
   
  }

  const [payment, setPayment] = useState("COD");
  const [showPaymentForm, setShowPaymentForm] = useState(false);

  const handlePaymentMethodChange = (e) => {
    const selectedPaymentMethod = e.target.value;
    setPayment(selectedPaymentMethod);

    if (selectedPaymentMethod === "CC" || selectedPaymentMethod === "Paypal") {
      setShowPaymentForm(true);
    } else {
      setShowPaymentForm(false);
    }
  };

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
                value="CC"
                checked={payment === "CC"}
                onChange={handlePaymentMethodChange}
              />
              <label className="form-check-label" htmlFor="inlineRadio2">
                Credit Card / Debit Card
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
                Paypal
              </label>
            </div>

            {/* --------------------------------------------------------------------------------------- */}
            {showPaymentForm && (
              <div id="cardDetails">
                <div id="classpaymentForm" className="row ">
                  <div className="col-md-6 mb-3">
                    <label htmlFor="cc-name">Name on card</label>
                    <input
                      type="text"
                      className="form-control"
                      id="cc-name"
                      placeholder=""
                      required
                      value={checkout.payment[0].nameOnCard}
                      onChange={(e) =>
                        setCheckout((prev) => ({
                          ...prev,
                          payment: [
                            {
                              ...prev.payment[0],
                              nameOnCard: e.target.value,
                            },
                          ],
                        }))
                      }
                    />
                    <small className="text-muted">
                      Full name as displayed on card
                    </small>
                    <div className="invalid-feedback">
                      Name on card is required
                    </div>
                  </div>
                  <div className="col-md-6 mb-3">
                    <label htmlFor="cc-number">Credit card number</label>
                    <input
                      type="number"
                      className="form-control"
                      id="cc-number"
                      placeholder=""
                      required
                      value={checkout.payment[0].cardNumber}
                      onChange={(e) =>
                        setCheckout((prev) => ({
                          ...prev,
                          payment: [
                            {
                              ...prev.payment[0],
                              cardNumber: e.target.value,
                            },
                          ],
                        }))
                      }
                    />
                    <div className="invalid-feedback">
                      Credit card number is required
                    </div>
                  </div>
                </div>
                <div className="row ">
                  <div className="col-md-3 mb-3">
                    <label htmlFor="cc-expiration">Expiration</label>
                    <input
                      type="date"
                      className="form-control"
                      id="cc-expiration"
                      placeholder=""
                      required
                      value={checkout.payment[0].exp}
                      onChange={(e) =>
                        setCheckout((prev) => ({
                          ...prev,
                          payment: [
                            {
                              ...prev.payment[0],
                              exp: e.target.value,
                            },
                          ],
                        }))
                      }
                    />

                    <div className="invalid-feedback">
                      Expiration date required
                    </div>
                  </div>
                  <div className="col-md-3 mb-3">
                    <label htmlFor="cc-expiration">CVV</label>
                    <input
                      type="number"
                      className="form-control"
                      id="cc-cvv"
                      placeholder=""
                      required
                      value={checkout.payment[0].cvv}
                      onChange={(e) =>
                        setCheckout((prev) => ({
                          ...prev,
                          payment: [
                            {
                              ...prev.payment[0],
                              cvv: e.target.value,
                            },
                          ],
                        }))
                      }
                    />
                    <div className="invalid-feedback">
                      Security code required
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* --------------------------------------------------------------------- */}
            <hr className="mb-4" />

            <div className="d-grid gap-2">
              <button
                className="btn btn-secondary btn-lg btn-block"
                onClick={(e)=> handleSubmit(e)}
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
