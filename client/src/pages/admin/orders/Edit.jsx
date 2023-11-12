import { useEffect, useState, useCallback } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Button, Col, Container, Form, Row, Table } from "react-bootstrap";
import { useOrder } from "../../../hooks/useOrder";

export default function Edit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getById, updateById } = useOrder();

  const [order, setOrder] = useState(null);

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const orderInfo = order;
      const { created_at, updated_at, isArchive, ...payload } = orderInfo;
      await updateById(id, payload);
      navigate("/admin/orders");
    } catch (e) {
      alert(e);
    }
  };

  const fetchDetails = useCallback(async () => {
    const result = await getById(id);
    setOrder(result);
  }, [id, getById]);

  useEffect(() => {
    fetchDetails();
  }, [fetchDetails]);

  return (
    <Container>
      <Row>
        <h3 className="text-center ">Order Number# {order?.id}</h3>

        <Col>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter orders name"
                value={order?.name}
                onChange={(e) => {
                  setOrder((prev) => {
                    return {
                      ...prev,
                      name: e.target.value,
                    };
                  });
                }}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Email"
                value={order?.email}
                onChange={(e) => {
                  setOrder((prev) => {
                    return { ...prev, email: e.target.value };
                  });
                }}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Address </Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your address"
                value={order?.address}
                onChange={(e) => {
                  setOrder((prev) => {
                    return { ...prev, address: e.target.value };
                  });
                }}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Payment Method</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Payment method"
                disabled
                value={order?.paymentMethod}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Status</Form.Label>
              <Form.Select
                value={order?.status}
                onChange={(e) => {
                  setOrder((prev) => {
                    return { ...prev, status: e.target.value };
                  });
                }}
              >
                <option value="pending">Pending</option>
                <option value="completed">Complete</option>
                <option value="failed">Failed</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Amount</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Amount"
                disabled
                value={order?.amount}
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
          <h5>Products Details</h5>

          <Table striped bordered hover>
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Name</th>
                <th scope="col">Quantity</th>
                <th scope="col">Price (Rs)</th>
                <th scope="col">Amount (RS)</th>
              </tr>
            </thead>
            <tbody>
              {order && order.products && order?.products.length > 0 ? (
                order?.products.map((item, index) => {
                  return (
                    <tr key={item?._id}>
                      <td>{index + 1}</td>
                      <td>{item?.product}</td>
                      <td>{item?.quantity}</td>
                      <td>{item?.price}</td>
                      <td>{item?.amount}</td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={5}>No Products</td>
                </tr>
              )}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
}
