import { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db } from '../service/firebase';
import { Link } from 'react-router-dom';
import EmptyCart from './EmptyCart';
import { Container, Row, Col, Form, Button, Card, ListGroup, Alert, Spinner } from 'react-bootstrap';
import { FaLock, FaCheckCircle, FaExclamationTriangle, FaCcVisa, FaCcPaypal } from 'react-icons/fa';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import checkoutSchema from '../schema/validationSchema'
import formatPriceDisplay from '../utils/formatPrice'

const primaryColor = '#cf51a5'
const accentColor = '#EC6EAD'

const Checkout = () => {
    const [orderId, setOrderId] = useState(null)
    const [process, setProcess] = useState(false)
    const [firebaseError, setFirebaseError] = useState(null)
    const { cart, clear, getTotal } = useContext(CartContext)

    const {
        register, 
        handleSubmit, 
        formState: { errors },
    } = useForm({
        resolver: yupResolver(checkoutSchema), 
        mode: 'onBlur', 
    })

    const orderTotal = getTotal()
    const orderItems = cart

    const onSubmit = async (data) => {
        setFirebaseError(null)
        setProcess(true)

        const orden = {
            comprador: {
                name: data.name,
                lastname: data.lastname,
                email: data.email,
                phone: data.phone,
            },
            compras: orderItems.map(item => ({
                id: item.id,
                name: item.name,
                price: item.price,
                quantity: item.quantity
            })),
            total: orderTotal,
            fecha: serverTimestamp()
        };

        const ventas = collection(db, "orders")

        try {
            const res = await addDoc(ventas, orden)
            setOrderId(res.id);
            clear();
        } catch (error) {
            console.error("Error al crear la orden:", error);
            setFirebaseError('Hubo un error al procesar la orden. Intente nuevamente.')
        } finally {
            setProcess(false)
        }
    }

    if (!cart.length && !orderId) {
        return <EmptyCart />
    }

    if (orderId) {
        return (
             <Container className="my-5 py-5 text-center">
                 <Card className="shadow-lg p-5 mx-auto" style={{ maxWidth: '600px', borderColor: accentColor, borderLeft: `5px solid ${accentColor}` }}>
                     <FaCheckCircle size={80} className="mb-4 mx-auto" style={{ color: accentColor }} />
                     <h2 className="mb-3" style={{ color: primaryColor, fontWeight: 'bold' }}>¡Muchas gracias por tu compra!</h2>
                     <p className="lead">Tu pedido ha sido procesado exitosamente.</p>
                     <Alert variant="success" className="mt-4">
                         <h4 className="alert-heading">ID de la Orden:</h4>
                         <p className="fw-bold fs-5 text-break">{orderId}</p>
                     </Alert>
                     <Link to='/' className='btn btn-lg fw-bold mt-4' style={{ backgroundColor: primaryColor, borderColor: primaryColor, color: 'white' }}>
                         Volver al inicio
                     </Link>
                 </Card>
             </Container>
         )
    }

    return (
        <Container className="my-5">
            <h1 className="text-center mb-5 fw-bold" style={{ color: primaryColor }}>
                <FaLock size={30} className="me-3" style={{ color: accentColor }} />
                Finalizar Compra
            </h1>

            <Row className="justify-content-center">
                <Col lg={7} md={12} className="mb-4">
                    <Card className="shadow-lg border-3">
                        <Card.Body>
                            <h4 className="mb-4 fw-bold" style={{ color: primaryColor }}>
                                Complete sus Datos
                            </h4>

                            {firebaseError && (
                                <Alert variant="danger" className="text-center fw-bold">
                                    <FaExclamationTriangle className="me-2" />
                                    {firebaseError}
                                </Alert>
                            )}
                            
                            <Form onSubmit={handleSubmit(onSubmit)}>

                                <Row className="mb-3">
                                    <Form.Group as={Col} sm={6} className="mb-3">
                                        <Form.Label>Nombre</Form.Label>
                                        <Form.Control 
                                            name='name' 
                                            type='text' 
                                            placeholder='Tu nombre' 
                                            {...register("name")} 
                                            isInvalid={!!errors.name} 
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {errors.name?.message}
                                        </Form.Control.Feedback>
                                    </Form.Group>

                                    <Form.Group as={Col} sm={6} className="mb-3">
                                        <Form.Label>Apellido</Form.Label>
                                        <Form.Control 
                                            name='lastname' 
                                            type='text' 
                                            placeholder='Tu apellido' 
                                            {...register("lastname")} 
                                            isInvalid={!!errors.lastname}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {errors.lastname?.message}
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                </Row>

                                <Row className="mb-3">
                                    <Form.Group as={Col} sm={6} className="mb-3">
                                        <Form.Label>Correo Electrónico</Form.Label>
                                        <Form.Control 
                                            name='email' 
                                            type='email' 
                                            placeholder='micorreo@mail.com' 
                                            {...register("email")}
                                            isInvalid={!!errors.email}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {errors.email?.message}
                                        </Form.Control.Feedback>
                                    </Form.Group>

                                    <Form.Group as={Col} sm={6} className="mb-3">
                                        <Form.Label>Repetir Correo</Form.Label>
                                        <Form.Control 
                                            name='confirmEmail' 
                                            type='email' 
                                            placeholder='Confirma tu correo' 
                                            {...register("confirmEmail")}
                                            isInvalid={!!errors.confirmEmail}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {errors.confirmEmail?.message}
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                </Row>

                                <Form.Group className="mb-4" controlId="formPhone">
                                    <Form.Label>Teléfono</Form.Label>
                                    <Form.Control 
                                        name='phone' 
                                        type='tel' 
                                        placeholder='1123456789' 
                                        {...register("phone")}
                                        isInvalid={!!errors.phone}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.phone?.message}
                                    </Form.Control.Feedback>
                                </Form.Group>

                                <div className="text-center mb-4">
                                    <h5 className="mb-3 fw-bold" style={{ color: primaryColor }}>
                                        Aceptamos:
                                    </h5>
                                    
                                    <span className="me-3">
                                        <FaCcVisa size={40} className="text-primary" title="Visa" />
                                    </span>
                                    <span className="me-3" style={{ verticalAlign: 'middle' }}>
                                        <img src='../MasterCard_Logo.png' alt="Mastercard Logo" style={{ height: '35px', width: 'auto' }} />
                                    </span>
                                    <span className="me-3" style={{ verticalAlign: 'middle' }}>
                                        <img src='../Mercado_Pago.png' alt="Mercado Pago Logo" style={{ height: '30px', width: 'auto' }} />
                                    </span>
                                    <span className="me-3">
                                        <FaCcPaypal size={40} className="text-info" title="PayPal" />
                                    </span>
                                </div>

                                <div className="d-grid mt-4">
                                    <Button
                                        type="submit"
                                        size="lg"
                                        className="fw-bold d-flex justify-content-center align-items-center btn-grad"
                                        disabled={process} 
                                    >
                                        {
                                            process ? 
                                                <>
                                                    <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" className="me-2" />
                                                    Procesando Orden...
                                                </>
                                                    : 'Generar Orden'
                                        }
                                    </Button>
                                </div>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            
                <Col lg={5} md={12}>
                    <Card className="shadow-lg">
                        <Card.Header
                            className="fw-bold fs-5 text-white"
                            style={{ backgroundColor: primaryColor }}
                        >
                            Resumen del Pedido
                        </Card.Header>
                        <ListGroup variant="flush">
                            {orderItems.map(item => (
                                <ListGroup.Item key={item.id} className="d-flex justify-content-between">
                                    {item.name} <span className="text-muted small">({item.quantity}x)</span>
                                    <span className="fw-bold">${formatPriceDisplay(item.price * item.quantity)}</span>
                                </ListGroup.Item>
                            ))}
                            <ListGroup.Item
                                className="d-flex justify-content-between fw-bold fs-4"
                                style={{ color: primaryColor, borderTop: `2px dashed ${accentColor}` }}
                            >
                                Total Final: <span>${formatPriceDisplay(getTotal())}</span>
                            </ListGroup.Item>
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
        </Container>
    )
}

export default Checkout