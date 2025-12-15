import { useEffect, useState } from 'react';
import { Form, Button, Container, Row, Col, Alert, Spinner } from 'react-bootstrap';
import { useForm } from 'react-hook-form'; 
import { yupResolver } from '@hookform/resolvers/yup'; 
import contactSchema from '../schema/contactSchema'; 
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db } from '../service/firebase';

const primaryColor = '#cf51a5ff'
const accentColor = '#EC6EAD'

const Contact = () => {

    const {
        register,
        handleSubmit,
        reset, 
        formState: { errors, isSubmitting },
    } = useForm({
        resolver: yupResolver(contactSchema),
        mode: 'onBlur',
    });

    const [submissionStatus, setSubmissionStatus] = useState(null)
    const [submissionError, setSubmissionError] = useState(null)
    
    const onSubmit = async (data) => {
        setSubmissionStatus(null)
        setSubmissionError(null)

        const newMessage = {
          name: data.name,
          email: data.email,
          subject: data.subject,
          message: data.message,
          date: serverTimestamp(),
          isRead: false 
      }

       const messagesCollection = collection(db, "contactMessages")

        try {
            await addDoc(messagesCollection, newMessage)
            setSubmissionStatus('success')
            reset()
        } catch (error) {
          console.error("Error de Firebase:", error);
            setSubmissionError('Hubo un error al enviar el mensaje. Inténtalo más tarde.')
            setSubmissionStatus('error');
        }
    }

    useEffect(() => {
        document.title = 'Art Store - Contacto';
        return () => {
            document.title = 'Art Store - Productos Personalizados'
        }
    }, [])

    return (
        <Container className="my-5">
            <Row className="justify-content-md-center">
                <Col md={8}>
                    <h2 
                        style={{color:primaryColor, fontSize:'60px', fontWeight:'bold', textShadow: `1px 1px 2px ${accentColor}`, fontFamily: '"Sansita", sans-serif'}} 
                        className="mb-4 text-center"
                    >
                        Contáctanos
                    </h2>

                    {submissionStatus === 'success' && (
                      <Alert variant="success" className="mb-4">
                        ¡Mensaje enviado con éxito! Te responderemos pronto.
                      </Alert>
                    )}
                    {submissionStatus === 'error' && (
                      <Alert variant="danger" className="mb-4">
                        {submissionError || 'Hubo un error al enviar el mensaje. Por favor, intenta de nuevo.'}
                      </Alert>
                    )}
                    
                    <Form onSubmit={handleSubmit(onSubmit)}>
                        
                        <Form.Group className="mb-3" controlId="formName">
                            <Form.Label>Nombre</Form.Label>

                            <Form.Control
                                type="text"
                                placeholder="Ingresa tu nombre"
                                isInvalid={!!errors.name}
                                {...register("name")} 
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.name?.message}
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formEmail">
                            <Form.Label>Correo Electrónico</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="tu.correo@ejemplo.com"
                                isInvalid={!!errors.email}
                                {...register("email")}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.email?.message}
                            </Form.Control.Feedback>
                        </Form.Group>
                        
                        <Form.Group className="mb-3" controlId="formSubject">
                            <Form.Label>Asunto</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Brevemente el motivo del contacto"
                                isInvalid={!!errors.subject}
                                {...register("subject")}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.subject?.message}
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formMessage">
                            <Form.Label>Mensaje</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={4}
                                placeholder="Escribe tu mensaje aquí..."
                                isInvalid={!!errors.message}
                                {...register("message")}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.message?.message}
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Button 
                            type="submit" 
                            className="btn-grad w-100 fw-bold d-flex justify-content-center align-items-center"
                            disabled={isSubmitting} 
                        >
                            {
                                isSubmitting ? 
                                    <>
                                        <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" className="me-2" />
                                        Enviando...
                                    </>
                                 : 'Enviar Mensaje'
                            }
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    )
}

export default Contact