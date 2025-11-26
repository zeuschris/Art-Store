import { Container, Row, Col, Image, Button } from 'react-bootstrap';

const Nosotros = () => {
  return (
    <Container className="my-5 py-5">
      <Row className="justify-content-center align-items-center">
        
        {/* Columna 1: Contenido de Texto */}
        <Col md={6} className="text-center text-md-start mb-4 mb-md-0">

          
          <h1 style={{color:'#cf51a5ff', fontSize:'60px', fontWeight:'bold', textShadow: '1px 1px 2px #EC6EAD', fontFamily: '"Sansita", sans-serif'}} className="display-4 fw-bold mb-3">
            Nuestra Historia
          </h1>
          
          <p className="lead text-muted mb-4">
            Somos un equipo de apasionados dedicados a ofrecer soluciones innovadoras y de alta calidad. Desde nuestros comienzos en 2024, hemos crecido gracias a nuestro compromiso con la excelencia y la satisfacción del cliente.
          </p>
          
          <p className="mb-4">
            Nuestro enfoque se centra en la colaboración, la transparencia y la entrega de resultados tangibles.
          </p>
          
          <Button className='btn-grad' variant="primary" size="lg">
            Conoce al Equipo
          </Button>
          
        </Col>

        <Col md={6}>
          
          <Image
            src="/nosotros.png"
            alt="Imagen de nuestro equipo colaborando"
            fluid 
            rounded 
            className="shadow-lg" 
          />
        </Col>
      </Row>

    </Container>
  )
}

export default Nosotros