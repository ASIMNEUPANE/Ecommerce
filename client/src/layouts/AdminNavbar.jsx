import { Link } from "react-router-dom";
import { CiLogout } from "react-icons/ci";
import { Button } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useSelector, useDispatch } from "react-redux";
import { removeToken } from "../utils/session";
import { setLogOut } from "../slices/authSlice";
function AdminNavbar() {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const handleLogout = () => {
    removeToken();
    dispatch(setLogOut());
  };
  return (
    <Navbar fixed="top" expand="lg" className="bg-body-tertiary">
      <Container fluid>
        <Navbar.Brand>
          <Link
            to="/admin/dashboard"
            className="text-decoration-none text-dark"
          >
            Fashion Fusion Admin
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav className="me-auto">
            <Link
              to="/admin/products"
              className="text-decoration-none text-dark nav-link"
            >
              Product
            </Link>

            <Link
              to="/admin/orders"
              className="text-decoration-none text-dark nav-link"
            >
              Orders
            </Link>
            <Link
              to="/admin/categories"
              className="text-decoration-none text-dark nav-link"
            >
              Categories
            </Link>
            <Link
              to="/admin/users"
              className="text-decoration-none text-dark nav-link"
            >
              Users
            </Link>
          </Nav>
          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
            />
            <Button variant="outline-success">Search</Button>
          </Form>

          <button className="btn btn-light bold" onClick={handleLogout}>
            {user?.name} <CiLogout />
          </button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default AdminNavbar;
