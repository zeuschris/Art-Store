import { Link } from 'react-router-dom';
import { Container, Card, Button } from 'react-bootstrap';
import { FaShoppingCart } from 'react-icons/fa'; 

const EmptyCart = () => {
  return (
    <Container className="my-5 d-flex justify-content-center">
      <Card style={{ width: '30rem' }} className="shadow-lg text-center p-4">
        <Card.Body>

           <FaShoppingCart size={60} className="mb-4 text-secondary" /> 
          
          <Card.Title as="h2" className="mb-4 text-dark">
            ¡Tu Carrito Está Vacío!
          </Card.Title>
          
          <Card.Text className="text-muted mb-4">
            Parece que aún no has añadido ningún producto. Explora nuestro catálogo y encuentra algo especial.
          </Card.Text>

          <Link to="/" className="text-decoration-none d-flex justify-content-center">
            <Button className='btn btn-grad' variant="primary" size="lg">
              Ver Productos
            </Button>
          </Link>
          
        </Card.Body>
      </Card>
    </Container>
  );
}

export default EmptyCart;