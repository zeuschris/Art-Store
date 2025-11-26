import React, { useState } from 'react'; 
import ItemCount from './ItemCount';
import { Container, Row, Col, Card, Carousel, Image, Modal, Button } from 'react-bootstrap'; 

const ItemDetail = ({ detail }) => {
  const [showModal, setShowModal] = useState(false); 
  const [selectedImage, setSelectedImage] = useState(''); 

  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = (imgSrc) => {
    setSelectedImage(imgSrc);
    setShowModal(true);
  };

  return (
    <Container className="my-5">
      <Row className="justify-content-center">
        <Col xs={12} md={10} lg={8}>
          <Card className="shadow-sm text-center">
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
                    Stock disponible: {detail.stock}
                  </Card.Text>
                  <div className="mt-3">
                    <ItemCount
                      stock={detail.stock}
                      onAdd={() => console.log('Agregado al carrito')} 
                      buttonVariant="success"
                      buttonText="Añadir al Carrito"
                    />
                  </div>
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