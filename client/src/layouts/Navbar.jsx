import { Link } from "react-router-dom";
import { FiLogIn, FiShoppingCart } from "react-icons/fi";
import { Badge, Button } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import './navbar.css'
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import icon4 from './icon4.png'
import { useSelector } from "react-redux";

function ENavbar() {
  const {quantity} = useSelector((state)=> state.cart)
  return (
    <Navbar  fixed="top" expand="lg" className="bg-body-tertiary">
      <Container fluid>
        <Navbar.Brand>
          <Link to="/" style={{ marginLeft: '10px' }} >
            <img width="40px"  src={icon4 } style={{ marginLeft: '50px'  }}  alt="icon" />
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav className="me-auto ">
          
              <Link to="/products" className="text-decoration-none  text-dark nav-link" style={{   fontSize: '1.4rem' }}>
                Product
              </Link>
          
          
              <Link to="/contact" className="text-decoration-none text-dark nav-link" style={{ fontSize: '1.4rem' }}>
                Contact
              </Link>
              <Link to="/about" className="text-decoration-none text-dark nav-link" style={{ fontSize: '1.4rem',  }}>
                About me
              </Link>
          
          </Nav>
        
          <Link className="btn btn-light right-side" to="/cart">
            <FiShoppingCart />
            &nbsp;
            <Badge bg="secondary">{quantity ?? 0 }</Badge>
          </Link>
          <Link className="btn btn-light right-side" to="/Login">
            <FiLogIn />
          </Link>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default ENavbar;
