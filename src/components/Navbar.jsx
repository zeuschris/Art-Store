import { Navbar, Nav, NavDropdown, Container, Button } from "react-bootstrap";
import CartWidget from "./CartWidget";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { FiUser, FiLogOut, FiHeart } from "react-icons/fi";
import { useState } from "react";
import "../styles/Navbar.css";

const NavbarComponent = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [expanded, setExpanded] = useState(false);

  const handleLogout = async () => {
    try {
      await logout();
      setExpanded(false); 
      navigate('/');
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  };

  const handleNavClick = () => {
    setExpanded(false);
  };

  return (
    <Navbar expand="md" sticky="top" className="custom-navbar py-2 bg-dark" expanded={expanded} onToggle={setExpanded}>
      <Container fluid>
    
        <Navbar.Brand as={NavLink} to='/' onClick={handleNavClick}>
          <img
            src="../art-store.png"
            alt="Logo Art Store"
            height="80"
            className="d-inline-block align-top brand-logo"
          />
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="main-navbar" />

        <Navbar.Collapse id="main-navbar">

          <Nav className="mx-auto text-center gap-4 py-3 py-md-0">
            <Nav.Link as={NavLink} to='/' onClick={handleNavClick}>Inicio</Nav.Link>
            <NavDropdown title="Productos" id="productos-dropdown">
              <NavDropdown.Item as={NavLink} to='/category/tazas' onClick={handleNavClick}>Tazas</NavDropdown.Item>
              <NavDropdown.Divider className="custom-divider"/>
              <NavDropdown.Item as={NavLink} to='/category/remeras' onClick={handleNavClick}>Remeras</NavDropdown.Item>
              <NavDropdown.Divider className="custom-divider"/>
              <NavDropdown.Item as={NavLink} to='/category/gorras' onClick={handleNavClick}>Gorras</NavDropdown.Item>
              <NavDropdown.Divider className="custom-divider"/>
              <NavDropdown.Item as={NavLink} to='/category/sweaters' onClick={handleNavClick}>Sweaters</NavDropdown.Item>
            </NavDropdown>
            <Nav.Link as={NavLink} to='/nosotros' onClick={handleNavClick}>Nosotros</Nav.Link>
            <Nav.Link as={NavLink} to='/contacto' onClick={handleNavClick}>Contacto</Nav.Link>
          </Nav>

          <div className="nav-col-side d-flex flex-column flex-md-row align-items-center gap-3 justify-content-center justify-content-md-end me-md-4 mt-3 mt-md-0">
            {user ? (
              <>

                <Nav.Link 
                  as={NavLink} 
                  to='/favoritos' 
                  className="text-white px-0 d-flex align-items-center justify-content-center gap-2"
                  onClick={handleNavClick}
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
                onClick={handleNavClick}
              >
                <FiUser /> 
                <span>Iniciar Sesión</span>
              </Button>
            )}

            <div onClick={handleNavClick}>
              <CartWidget counter={5}/>
            </div>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarComponent;