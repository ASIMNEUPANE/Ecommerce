

import { useEffect, useState, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { create } from "../../../services/orders";
import { fetchProducts } from "../../../slices/productSlice";

export default function Add() {
  const navigate = useNavigate();
  const { id } = useParams();

  const { products, loading, limit, total, currentPage } = useSelector(
    (state) => state.products
  );

  const [selectedProduct, setSelectedProduct] = useState(null);

  const [payload, setPayload] = useState({
    name: "",
    email: "",
    paymentMethod: "Stripe",
    amount: 0,
    address: "",
    products: [{ _id: "", quantity: 0, price: 0, amount: 0 }],
    orderId: "",
    id: id || "",
    status: "pending",
  });
 
  useEffect(() => {
    if (selectedProduct) {
      const quantity = payload.products[0].quantity;
      const price = selectedProduct.price;
      setPayload((prev) => ({
        ...prev,
        amount: quantity * price,
      }));
    }
  }, [selectedProduct, payload.products]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await create(payload);
      navigate("/admin/orders");
    } catch (e) {
      alert(e);
    }
  };

  const dispatch = useDispatch();

  const initFetch = useCallback(() => {
    dispatch(fetchProducts({ limit, page: currentPage }));
  }, [dispatch, limit, currentPage]);

  useEffect(() => {
    initFetch();
  }, [initFetch]);

  return (
    <Container>
      <Row>
        <Col>
          <h3 className="text-center">Order Number# {payload.orderId}</h3>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter order name"
                value={payload.name}
                onChange={(e) =>
                  setPayload({ ...payload, name: e.target.value })
                }
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Email"
                value={payload.email}
                onChange={(e) =>
                  setPayload({ ...payload, email: e.target.value })
                }
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Address</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your address"
                value={payload.address}
                onChange={(e) =>
                  setPayload({ ...payload, address: e.target.value })
                }
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Payment Method</Form.Label>
              <Form.Select
                value={payload.paymentMethod}
                onChange={(e) =>
                  setPayload({ ...payload, paymentMethod: e.target.value })
                }
              >
                <option value="Stripe">Stripe</option>
                <option value="COD">COD</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Status</Form.Label>
              <Form.Select
                value={payload.status}
                onChange={(e) =>
                  setPayload({ ...payload, status: e.target.value })
                }
              >
                <option value="pending">Pending</option>
                <option value="completed">Complete</option>
                <option value="failed">Failed</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Amount</Form.Label>
              <Form.Control
                type="text"
                placeholder="Amount"
                disabled
                value={payload.amount}
              />
            </Form.Group>

            <Button variant="primary" type="submit">
              Update
            </Button>
            <Link to="/admin/orders" className="btn text-white m-2 btn-danger">
              Go Back
            </Link>
          </Form>
        </Col>

        <Col>
          <Form.Group className="mb-3">
            <Form.Label>Products</Form.Label>
            <Form.Select onChange={(e)=> {
               const selectedProduct = products.find(
                (product) => product._id === e.target.value
              );
          
              setSelectedProduct(selectedProduct);
            }}>
              {products && products.length > 0
                ? products.map((product) => (
                    <option key={product._id} value={product._id}>
                      {product.name}
                    </option>
                  ))
                : null}
            </Form.Select>
          </Form.Group>

          {selectedProduct && (
            <Form.Group className="mb-3">
              <Form.Label>Quantity</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter quantity"
                value={payload.products[0].quantity}
                onChange={(e) =>
                  setPayload((prev) => ({
                    ...prev,
                    products: [
                      {
                        ...prev.products[0],
                        quantity: e.target.value,
                      },
                    ],
                  }))
                }
              />
            </Form.Group>
          )}

          {selectedProduct && (
            <Form.Group className="mb-3">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter price"
                value={payload.products[0].price}
                onChange={(e) =>
                  setPayload((prev) => ({
                    ...prev,
                    products: [
                      {
                        ...prev.products[0],
                        price: e.target.value,
                      },
                    ],
                  }))
                }
              />
            </Form.Group>
          )}
        </Col>
      </Row>
    </Container>
  );
}
