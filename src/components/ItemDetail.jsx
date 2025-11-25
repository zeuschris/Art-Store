import ItemCount from './ItemCount';
import { Container, Row, Col, Card, Carousel, Image } from 'react-bootstrap'; 

const ItemDetail = ({ detail }) => {
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
                        <Image src={imgSrc} alt={`${detail.name} ${index + 1}`} fluid className="w-100 h-100 object-fit-cover" /> 
                      </Carousel.Item>
                    ))}
                  </Carousel>
                ) : (

                  <Image src={detail.image} alt={detail.name} fluid className="w-100 h-100 object-fit-cover" />
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
                    <ItemCount stock={detail.stock} />
                  </div>
                </Card.Body>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default ItemDetail;