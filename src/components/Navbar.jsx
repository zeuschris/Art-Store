import { Navbar, Nav, NavDropdown, Container } from "react-bootstrap";
import CartWidget from "./CartWidget";
import { NavLink } from "react-router-dom";
import "../styles/Navbar.css";

const NavbarComponent = () => {
  return (
    <Navbar expand="md" sticky="top" className="custom-navbar py-2">
      <Container fluid className="d-flex align-items-center justify-content-between">
        {/* Logo a la izquierda */}
        <Navbar.Brand as={NavLink} to='/' className="d-flex align-items-center ms-4">
          <img
            src="../logo.png"
            alt="Logo Art Store"
            height="150"
            className="d-inline-block align-top"
          />
        </Navbar.Brand>

        {/* Botón hamburguesa */}
        <Navbar.Toggle aria-controls="main-navbar" />

        {/* Menú colapsable */}
        <Navbar.Collapse id="main-navbar">
          {/* Menú centrado */}
          <Nav className="mx-auto text-center gap-4">
            <Nav.Link as={NavLink} to='/'>Inicio</Nav.Link>
             <NavDropdown title="Productos" id="productos-dropdown" menuVariant="dark">
              <NavDropdown.Item as={NavLink} to='/category/tazas'>Tazas</NavDropdown.Item>
              <NavDropdown.Divider className="custom-divider"/>
              <NavDropdown.Item as={NavLink} to='/category/remeras'>Remeras</NavDropdown.Item>
              <NavDropdown.Divider className="custom-divider"/>
              <NavDropdown.Item as={NavLink} to='/category/gorras'>Gorras</NavDropdown.Item>
              <NavDropdown.Divider className="custom-divider"/>
              <NavDropdown.Item as={NavLink} to='/category/sweaters'>Sweaters</NavDropdown.Item>
            </NavDropdown>
            <Nav.Link as={NavLink} to='/nosotros'>Nosotros</Nav.Link>
            <Nav.Link as={NavLink} to='/contacto'>Contacto</Nav.Link>
          </Nav>

          {/* Carrito dentro del collapse (a la derecha en desktop, abajo en mobile) */}
          <div className="cart-container d-flex justify-content-center justify-content-md-end mt-3 mt-md-0 me-md-4">
            <CartWidget counter = {5} />
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarComponent;
