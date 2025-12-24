import { Navbar, Nav, NavDropdown, Container, Button } from "react-bootstrap";
import CartWidget from "./CartWidget";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { FiUser, FiLogOut, FiHeart } from "react-icons/fi";
import "../styles/Navbar.css";

const NavbarComponent = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  };

  return (
    <Navbar expand="md" sticky="top" className="custom-navbar py-2 bg-dark">
      <Container fluid className="d-flex align-items-center justify-content-between">
        <div className="nav-col-side d-flex justify-content-start">
          <Navbar.Brand as={NavLink} to='/' className="ms-md-4">
            <img
              src="../art-store.png"
              alt="Logo Art Store"
              height={!user ? "110" : "80"} 
              className="d-inline-block align-top brand-logo"
            />
          </Navbar.Brand>
        </div>

        <Navbar.Toggle aria-controls="main-navbar" />

        <Navbar.Collapse id="main-navbar" className="nav-collapse-wrapper">
          
          <Nav className="mx-auto text-center gap-4 py-3 py-md-0">
            <Nav.Link as={NavLink} to='/'>Inicio</Nav.Link>
            <NavDropdown title="Productos" id="productos-dropdown">
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

          <div className="nav-col-side d-flex flex-column flex-md-row align-items-center gap-3 justify-content-center justify-content-md-end me-md-4 mt-3 mt-md-0">
            {user ? (
              <>
                <Nav.Link 
                  as={NavLink} 
                  to='/favoritos' 
                  className="text-white px-0 d-flex align-items-center justify-content-center gap-2"
                >
                  <FiHeart />
                  <span>Favoritos</span>
                </Nav.Link>

                <div className="d-none d-lg-flex align-items-center gap-2 text-white">
                  <FiUser />
                  <span className="user-name">{user.displayName || user.email}</span>
                </div>

                <Button 
                  variant="outline-light" 
                  size="sm" 
                  onClick={handleLogout}
                  className="d-flex align-items-center justify-content-center gap-2"
                >
                  <FiLogOut /> 
                  <span>Salir</span>
                </Button>
              </>
            ) : (

              <Button 
                variant="outline-light" 
                size="sm" 
                as={NavLink} 
                to='/login'
                className="d-flex align-items-center justify-content-center gap-2"
              >
                <FiUser /> 
                <span>Iniciar Sesión</span>
              </Button>
            )}

            <CartWidget counter={5} />
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarComponent;