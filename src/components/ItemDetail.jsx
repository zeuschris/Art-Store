import { useState, useContext, useEffect } from 'react'; 
import { Container, Row, Col, Card, Carousel, Image, Modal, Button } from 'react-bootstrap'; 
import { CartContext } from '../context/CartContext';
import { useFavorites } from '../context/FavoritesContext';
import { Link } from 'react-router-dom';
import { FiHeart } from 'react-icons/fi';
import ItemCount from './ItemCount';

const ItemDetail = ({ detail }) => {
  const [showModal, setShowModal] = useState(false)
  const [selectedImage, setSelectedImage] = useState('')
  const [purchase, setPurchase] = useState(false)
  const { addItem, avaibleStock } = useContext(CartContext)
  const { isFavorite, toggleFavorite } = useFavorites()

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [detail.id]); 

  const handleCloseModal = () => setShowModal(false)
  
  const handleShowModal = (imgSrc) => {
    setSelectedImage(imgSrc)
    setShowModal(true)
  }

  const onAdd = (cantidad) => {
    addItem(detail, cantidad)
    setPurchase(true)
  }

  const handleFavoriteClick = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    await toggleFavorite(detail);
  }

  const updatedStock = detail.stock - avaibleStock(detail.id)

  return (
    <Container className="my-5">
      <Row className="justify-content-center">
        <Col xs={12} md={10} lg={8}>
          <Card className="shadow-sm text-center border-0">
            <Row className="g-0">
              <Col xs={12} md={6}>
                {detail.images && detail.images.length > 0 ? (
                  <Carousel fade indicators={false}>
                    {detail.images.map((imgSrc, index) => (
                      <Carousel.Item key={index}>
                        <Image
                          src={imgSrc}
                          alt={`${detail.name} ${index + 1}`}
                          fluid
                          className="w-100 h-100 object-fit-cover cursor-pointer" 
                          onClick={() => handleShowModal(imgSrc)} 
                          style={{ minHeight: '300px', maxHeight: '500px' }}
                        />
                      </Carousel.Item>
                    ))}
                  </Carousel>
                ) : (
                  <Image
                    src={detail.image}
                    alt={detail.name}
                    fluid
                    className="w-100 h-100 object-fit-cover cursor-pointer"
                    onClick={() => handleShowModal(detail.image)}
                    style={{ minHeight: '300px', maxHeight: '500px' }}
                  />
                )}
              </Col>
              <Col xs={12} md={6} className="d-flex align-items-center">
                <Card.Body>
                  <Card.Title as="h2">{detail.name}</Card.Title>
                  <Card.Text>{detail.description}</Card.Text>
                  <Card.Text>
                    <strong>Categoría:</strong> {detail.category}
                  </Card.Text>
                  <Card.Text as="h3" className="text-primary">
                    Precio: ${detail.price}
                  </Card.Text>
                  <Card.Text>
                    Stock disponible: {updatedStock}
                  </Card.Text>
                  <div className="d-flex gap-2 align-items-center mb-3 justify-content-center">
                    <Button
                      type="button"
                      variant={isFavorite(detail.id) ? "danger" : "outline-danger"}
                      onClick={handleFavoriteClick}
                      className="d-flex align-items-center gap-2"
                    >
                      <FiHeart fill={isFavorite(detail.id) ? 'white' : 'none'} />
                      {isFavorite(detail.id) ? 'En Favoritos' : 'Agregar a Favoritos'}
                    </Button>
                  </div>
                  {
                    purchase 
                    
                    ?
                     <Link className = "btn btn-grad" to='/cart'> 
                        Ver el carrito
                     </Link> 
                    : 
                    <div className="mt-3">
                      <ItemCount
                        stock={updatedStock}
                        onAdd={onAdd}
                        buttonVariant="success"
                        buttonText="Añadir al Carrito"
                      />
                  </div>
                  }
                </Card.Body>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>

      <Modal show={showModal} onHide={handleCloseModal} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title>{detail.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center"> 
          <Image src={selectedImage} alt={detail.name} fluid /> 
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default ItemDetail;