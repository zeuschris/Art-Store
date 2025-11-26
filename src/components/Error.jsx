import { Link } from 'react-router-dom';
import { Container, Row, Col, Image, Button } from 'react-bootstrap'; 

const Error = () => {
  return (
    <Container className="d-flex align-items-center justify-content-center vh-100 text-center">
      <Row>
        <Col>
          <Image
            src="/404.png" 
            alt="Página no encontrada"
            fluid 
            className="mb-4" 
            style={{ maxWidth: '400px', height: 'auto' }} 
          />
          
          <h1 className="display-4 mb-3">¡Oops! Página no encontrada 🌐</h1>
          <p className="lead mb-4">
            Parece que la página que buscas no existe o se ha movido.
          </p>

          <Button as={Link} to="/" variant="dark" size="lg">
            Volver al inicio
          </Button>

        </Col>
      </Row>
    </Container>
  );
};

export default Error;