import { useEffect } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';

const Contact = () => {

    useEffect(() => {
        document.title = 'Art Store - Contacto';
        return () => {
            document.title = 'Art Store - Productos Personalizados';
        };
    }, [])

   return (
    <Container className="my-5">
      <Row className="justify-content-md-center">
        <Col md={8}>
          <h2 style={{color:'#cf51a5ff', fontSize:'60px', fontWeight:'bold', textShadow: '1px 1px 2px #EC6EAD', fontFamily: '"Sansita", sans-serif'}} className="mb-4 text-center">Contáctanos</h2>

          <Form>
            
            <Form.Group className="mb-3" controlId="formName">
              <Form.Label >Nombre</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ingresa tu nombre"
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formEmail">
              <Form.Label>Correo Electrónico</Form.Label>
              <Form.Control
                type="email"
                placeholder="tu.correo@ejemplo.com"
                required
              />
            </Form.Group>
            
            <Form.Group className="mb-3" controlId="formSubject">
              <Form.Label>Asunto</Form.Label>
              <Form.Control
                type="text"
                placeholder="Brevemente el motivo del contacto"
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formMessage">
              <Form.Label>Mensaje</Form.Label>
              <Form.Control
                as="textarea"
                rows={4}
                placeholder="Escribe tu mensaje aquí..."
                required
              />
            </Form.Group>

            <Button variant="primary" type="submit" className="btn-grad w-100">Enviar Mensaje</Button>

          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default Contact;