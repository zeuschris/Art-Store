import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { useFavorites } from '../context/FavoritesContext';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import { FiHeart, FiArrowLeft } from 'react-icons/fi';
import LoaderComponent from './LoaderComponent';

const Favorites = () => {
  const { favorites, loading, removeFromFavorites } = useFavorites();
  const { user } = useAuth();
  const primaryColor = '#cf51a5'

  if (!user) {
    return (
      <Container className="my-5 text-center">
        <Card className="shadow p-5">
          <h2>Debes iniciar sesión para ver tus favoritos</h2>
          <p className="text-muted mb-4">Inicia sesión o regístrate para agregar productos a tu lista de favoritos</p>
          <Link to="/login" className="btn btn-primary">
            Iniciar Sesión
          </Link>
        </Card>
      </Container>
    );
  }

  if (loading) {
    return <LoaderComponent />;
  }

  if (favorites.length === 0) {
    return (
      <Container className="my-5 text-center">
        <Card className="shadow p-5">
          <FiHeart size={64} className="text-muted mb-3" />
          <h2>No tienes favoritos aún</h2>
          <p className="text-muted mb-4">Explora nuestros productos y agrega tus favoritos</p>
          <Link to="/" className="btn btn-grad">
            <FiArrowLeft className="me-2" />
            Ver Productos
          </Link>
        </Card>
      </Container>
    );
  }

  return (
    <Container className="my-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 style={{
            color:primaryColor, 
            fontSize:'60px', 
            fontWeight:'bold', 
            textShadow: '1px 1px 2px #EC6EAD', 
            fontFamily: '"Sansita", sans-serif'}} 
            className="display-4 fw-bold mb-3">
            Mis Favoritos
          </h2>
        <Link to="/" className="btn btn-secondary">
          <FiArrowLeft className="me-2" />
          Volver
        </Link>
      </div>
      <Row>
        {favorites.map((favorite) => (
          <Col key={favorite.id} xs={12} sm={6} md={4} lg={3} className="mb-4">
            <Card className="h-100 shadow-sm">
              <div style={{ position: 'relative' }}>
                <Card.Img
                  variant="top"
                  src={favorite.product.image}
                  alt={favorite.product.name}
                  style={{ height: '200px', objectFit: 'cover' }}
                />
                <Button
                  variant="danger"
                  className="position-absolute top-0 end-0 m-2"
                  size="sm"
                  onClick={() => removeFromFavorites(favorite.productId)}
                  title="Eliminar de favoritos"
                >
                  <FiHeart fill="white" />
                </Button>
              </div>
              <Card.Body className="d-flex flex-column">
                <Card.Title>{favorite.product.name}</Card.Title>
                <Card.Text className="text-primary fs-4">
                  ${favorite.product.price}
                </Card.Text>
                <Link
                  to={`/item/${favorite.productId}`}
                  className="btn btn-primary mt-auto"
                >
                  Ver Detalle
                </Link>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Favorites;




