import React, { useEffect, useState, useCallback } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useCategories } from "../../../hooks/useCategories";


export default function Edit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getById, updateById } = useCategories();

  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      await updateById(id, { name: name });
    
      navigate("/admin/categories");
    } catch (e) {
      alert(e);
    }
  };

  const fetchDetails = useCallback(async () => {
    const result = await getById(id);
    setName(result?.name);
    setSlug(result?.slug);
  }, [id, getById]);

  useEffect(() => {
    fetchDetails();
  }, [fetchDetails]);

  return (
    <Container>
      <Row>
        <Col md={{ span: 4, offset: 4 }}>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text" 
                placeholder="Enter Category name"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Slug</Form.Label>
              <Form.Control
                type="text" 
                placeholder="slug"
                value={slug}
                disabled
              />
            </Form.Group>

            <Button variant="primary" type="submit">
              Update
            </Button>
            <Link
              to="/admin/categories"
              className="btn text-white m-2 btn-danger"
            >
              Go Back
            </Link>
          </Form>
        </Col>
      </Row>
 
    </Container>
  );
}
