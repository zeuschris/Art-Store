import { Container, Row, Col } from 'react-bootstrap';
import { FaInstagram, FaLinkedin, FaGithub } from 'react-icons/fa'; 
import "../styles/Footer.css";

const Footer = () => {
  return (
    <footer className="bg-dark text-white pt-5 pb-4">
      <Container>
        <Row className="text-center text-md-left">

          <Col md={6} lg={6} xl={6} className="mx-auto mt-3"> 
            <h5 className="text-uppercase mb-4 font-weight-bold" style={{color:'#cf51a5ff'}}> 
              Art Store
            </h5>
            <p>
              Aplicación web para la realización del curso de
              React Js en Coderhouse. Aquí podrás encontrar una variedad
              de productos para todos los gustos.
            </p>
          </Col>

          <Col md={6} lg={6} xl={6} className="mx-auto mt-3"> 
            <h5 className="text-uppercase mb-4 font-weight-bold" style={{color:'#cf51a5ff'}}>
              Contacto
            </h5>
            <p>
              <i className="fas fa-home mr-3"></i> Argentina, Buenos Aires.
            </p>
            <p>
              <i className="fas fa-envelope mr-3"></i> zeuschris123@gmail.com
            </p>
            <p>
              <i className="fas fa-phone mr-3"></i> +54 911-5564-7125
            </p>
          </Col>
        </Row>

        <hr className="mb-4" style={{ backgroundColor: '#ffffff', height: '1px' }} />

        <Row className="align-items-center">
          {/* Copyright */}
          <Col md={7} lg={8} className="text-center text-md-start">
            <p className="text-white mb-0">
              © {new Date().getFullYear()} Todos los derechos reservados por: 
              <a href="#" style={{ textDecoration: 'none' }}>
                <strong style={{color:'#cf51a5ff'}}>Art Store</strong>
              </a>
            </p>
          </Col>

          <Col md={5} lg={4} className="text-center text-md-end">
            <div className="text-center text-md-right">
              <ul className="list-unstyled list-inline">
                <li className="list-inline-item">
                  <a href="https://www.linkedin.com/in/christophermontes158/" target='_blank' className="btn-floating btn-sm text-white" style={{ fontSize: '23px' }}><FaLinkedin /></a>
                </li>
                <li className="list-inline-item">
                  <a href="https://instagram.com/chris_angel158" target='_blank' className="btn-floating btn-sm text-white" style={{ fontSize: '23px' }}><FaInstagram /></a>
                </li>
                <li className="list-inline-item">
                  <a href="https://github.com/zeuschris/Art-Store" target='_blank'  className="btn-floating btn-sm text-white" style={{ fontSize: '23px' }}><FaGithub /></a>
                </li>
              </ul>
            </div>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;