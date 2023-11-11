import { Link } from "react-router-dom";
import { CiLogout } from "react-icons/ci";
import { Button } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

import icon4 from './icon4.png'



import { useSelector, useDispatch } from "react-redux";
import { removeToken } from "../utils/session";
import { setLogOut } from "../slices/authSlice";
import { useNavigate } from "react-router-dom";
function AdminNavbar() {
  const navigate = useNavigate()
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const handleLogout = () => {
    removeToken();
    dispatch(setLogOut());
    navigate('/login')
    
  };
  return (
    <Navbar fixed="top" expand="lg" className="bg-body-tertiary">
      <Container fluid>
        <Navbar.Brand>
          <Link
            to="/admin/dashboard"
            className="text-decoration-none text-dark"
          >
            <img width="40px" src={icon4} alt="icon" /> Admin
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav className="me-auto">
            <Link
              to="/admin/products"
              className="text-decoration-none  text-dark nav-link" style={{   fontSize: '1.4rem' }}
            >
              Product
            </Link>

            <Link
              to="/admin/orders"
              className="text-decoration-none  text-dark nav-link" style={{   fontSize: '1.4rem' }}            >
              Orders
            </Link>
            <Link
              to="/admin/categories"
              className="text-decoration-none  text-dark nav-link" style={{   fontSize: '1.4rem' }}            >
              Categories
            </Link>
            <Link
              to="/admin/users"
              className="text-decoration-none  text-dark nav-link" style={{   fontSize: '1.4rem' }}            >
              Users
            </Link>
          </Nav>
        

          <button className="btn btn-light bold  text-dark nav-link" onClick={handleLogout}>
        <b>{user?.name} </b>    <CiLogout />
          </button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default AdminNavbar;
