import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useCategories } from "../../../hooks/useCategories";

export default function Add() {
  const { create } = useCategories();
  const navigate = useNavigate();
  const [name, setName] = useState("");

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      await create({ name: name });
      navigate("/admin/categories");
    } catch (e) {
    alert(e)
    }
  };

  return (
    <Container>
      <Row>
        <Col md={{ span: 4, offset: 4 }}>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="name"
                placeholder="Enter Category name"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
            </Form.Group>

            <Button variant="primary" type="submit">
              Add
            </Button>
            <Link
              to="/admin/categories"
              className="btn text-white  m-2 btn-danger "
            >
              Go Back
            </Link>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}
