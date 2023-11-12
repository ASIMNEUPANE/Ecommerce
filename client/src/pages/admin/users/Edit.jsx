import { useCallback, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useUsers } from "../../../hooks/useUsers";

export default function Edit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { updateById, getById } = useUsers();
  const [payload, setPayload] = useState({
    name: "",
    email: "",
    password: "",
    roles: "",
  });

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      payload.id = id;
      const result = await updateById(id, payload);
      if (result.msg === "success") {
        alert("User has been updated successfully");
        navigate("/admin/users");
      }
      navigate("/admin/users");
    } catch (e) {
      alert(e);
    }
  };
  const fetchDetails = useCallback(async () => {
    const result = await getById(id);
    const {
      isArchive,
      isActive,
      created_at,
      updated_at,
      category_name,
      isEmailVerified,
      created_by,
      updated_by,
      _id,
      __v,

      ...rest
    } = result;

    setPayload(rest);
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
                required
                placeholder="Enter User name"
                value={payload?.name}
                onChange={(e) => {
                  setPayload((prev) => {
                    return { ...prev, name: e.target.value };
                  });
                }}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                required
                placeholder="Enter Email"
                value={payload?.email}
                onChange={(e) => {
                  setPayload((prev) => {
                    return { ...prev, email: e.target.value };
                  });
                }}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Password</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Enter your Password "
                value={payload?.password}
                onChange={(e) => {
                  setPayload((prev) => {
                    return { ...prev, password: e.target.value };
                  });
                }}
              />
            </Form.Group>
            <Form.Group className="mb-3 ">
              <Form.Label>User Role</Form.Label>
              <Form.Select
                value={payload?.roles}
                onChange={(e) =>
                  setPayload({ ...payload, roles: e.target.value })
                }
              >
                <option value="admin">Admin</option>
                <option value="user">user</option>
              </Form.Select>
            </Form.Group>

            <Button variant="primary" type="submit">
              Add
            </Button>
            <Link to="/admin/users" className="btn text-white  m-2 btn-danger ">
              Go Back
            </Link>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}
