import { useState } from 'react';
import { Container, Card, Form, Button, Row, Col, Tab, Tabs } from 'react-bootstrap';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import SocialButtons from './SocialButtons';
import '../styles/Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [key, setKey] = useState('login');
  
  const { login, register, loginWithGoogle } = useAuth();
  const navigate = useNavigate();

  // Handlers simplificados
  const handleAuthAction = async (action, ...args) => {
    try {
      await action(...args);
      navigate('/');
    } catch (error) {
      console.error('Error en autenticación:', error);
    }
  };

  return (
    <Container className="my-5">
      <Row className="justify-content-center">
        <Col xs={12} md={8} lg={6}>
          <Card className="shadow-lg border-0" style={{ borderRadius: '15px' }}>
            <Card.Body className="p-4">
              <Tabs activeKey={key} onSelect={(k) => setKey(k)} className="mb-4 custom-tabs" fill>
                
                <Tab eventKey="login" title="Iniciar Sesión">
                  <Form onSubmit={(e) => { e.preventDefault(); handleAuthAction(login, email, password); }} className="mt-3">
                    <Form.Group className="mb-3">
                      <Form.Label>Correo Electrónico</Form.Label>
                      <Form.Control type="email" placeholder="tu@email.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label>Contraseña</Form.Label>
                      <Form.Control type="password" placeholder="Contraseña" value={password} onChange={(e) => setPassword(e.target.value)} required />
                    </Form.Group>
                    <Button variant="primary" type="submit" className="w-100 py-2 fw-bold">Iniciar Sesión</Button>
                  </Form>
                  <SocialButtons onGoogle={() => handleAuthAction(loginWithGoogle)}/>
                </Tab>

                <Tab eventKey="register" title="Registrarse">
                  <Form onSubmit={(e) => { e.preventDefault(); handleAuthAction(register, email, password, displayName); }} className="mt-3">
                    <Form.Group className="mb-3">
                      <Form.Label>Nombre</Form.Label>
                      <Form.Control type="text" placeholder="Tu nombre" value={displayName} onChange={(e) => setDisplayName(e.target.value)} required />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label>Correo Electrónico</Form.Label>
                      <Form.Control type="email" placeholder="tu@email.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label>Contraseña</Form.Label>
                      <Form.Control type="password" placeholder="Mínimo 6 caracteres" value={password} onChange={(e) => setPassword(e.target.value)} required minLength={6} />
                    </Form.Group>
                    <Button variant="success" type="submit" className="w-100 py-2 fw-bold">Registrarse</Button>
                  </Form>
                  <SocialButtons onGoogle={() => handleAuthAction(loginWithGoogle)}/>
                </Tab>

              </Tabs>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;