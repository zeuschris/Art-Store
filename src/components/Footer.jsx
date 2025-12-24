import { Container, Row, Col } from 'react-bootstrap';
import { FaInstagram, FaLinkedin, FaGithub, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa'; 
import "../styles/Footer.css";

const Footer = () => {
  return (
    <footer className="bg-dark text-white pt-4 pt-md-5 pb-3 pb-md-4 mt-auto">
      <Container>
        <Row className="text-center text-md-start">

          <Col xs={12} md={6} lg={6} className="mb-3 mb-md-4"> 
            <h5 className="text-uppercase mb-3 mb-md-4 font-weight-bold" style={{color:'#cf51a5ff'}}> 
              Art Store
            </h5>
            <p className="mb-0">
              Aplicación web para la realización del curso de
              React Js en Coderhouse. Aquí podrás encontrar una variedad
              de productos para todos los gustos.
            </p>
          </Col>

          <Col xs={12} md={6} lg={6} className="mb-3 mb-md-4"> 
            <h5 className="text-uppercase mb-3 mb-md-4 font-weight-bold" style={{color:'#cf51a5ff'}}>
              Contacto
            </h5>
            <p className="mb-2 d-flex align-items-center justify-content-center justify-content-md-start">
              <FaMapMarkerAlt className="me-2" style={{color:'#cf51a5ff'}} />
              Argentina, Buenos Aires
            </p>
            <p className="mb-0 d-flex align-items-center justify-content-center justify-content-md-start">
              <FaEnvelope className="me-2" style={{color:'#cf51a5ff'}} />
              <a href="mailto:zeuschris123@gmail.com" className="text-white text-decoration-none">
                zeuschris123@gmail.com
              </a>
            </p>
          </Col>
        </Row>

        <hr className="my-3 my-md-4" style={{ backgroundColor: '#ffffff', height: '1px' }} />

        <Row className="align-items-center">
          <Col xs={12} md={7} lg={8} className="text-center text-md-start mb-3 mb-md-0">
            <p className="text-white mb-0 small">
              © {new Date().getFullYear()} Todos los derechos reservados por: 
              <a href="#" className="text-decoration-none ms-1">
                <strong style={{color:'#cf51a5ff'}}>Art Store</strong>
              </a>
            </p>
          </Col>

          <Col xs={12} md={5} lg={4} className="text-center text-md-end">
            <ul className="list-unstyled list-inline mb-0">
              <li className="list-inline-item mx-1 mx-md-2">
                <a 
                  href="https://www.linkedin.com/in/christophermontes158" 
                  className="btn-floating text-white" 
                  style={{ fontSize: '23px' }}
                  aria-label="LinkedIn"
                >
                  <FaLinkedin />
                </a>
              </li>
              <li className="list-inline-item mx-1 mx-md-2">
                <a 
                  href="https://github.com/zeuschris/Art-Store" 
                  target='_blank'
                  rel="noopener noreferrer"
                  className="btn-floating text-white" 
                  style={{ fontSize: '23px' }}
                  aria-label="GitHub"
                >
                  <FaGithub />
                </a>
              </li>
            </ul>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;