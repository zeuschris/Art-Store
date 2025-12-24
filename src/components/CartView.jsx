import { useContext, useEffect } from "react"
import { CartContext } from "../context/CartContext"
import { Container, Row, Col, Button, Card, ListGroup } from 'react-bootstrap';
import { FaTrashAlt, FaShoppingCart } from 'react-icons/fa';
import { Link } from 'react-router-dom'; 
import formatPriceDisplay from '../utils/formatPrice'
import Swal from 'sweetalert2'; 
import '../styles/CartView.css';

const CartView = () => {
    
    const {cart, clear, removeItem, getTotal} = useContext(CartContext)

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const handleClearCart = () => {
        Swal.fire({
            title: '¿Estás seguro?',
            text: "¡No podrás revertir esta acción!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Sí, ¡vaciar carrito!',
            cancelButtonText: 'Cancelar',
            customClass: {
                container: 'dark-mode-alert' 
            }
        }).then((result) => {
            if (result.isConfirmed) {
                clear(); 
                Swal.fire({
                 icon: 'success',
                 title: '¡Carrito Vacío!',
                 text: 'Tu carrito ha sido vaciado con éxito.',
                 customClass: {
                    popup: 'dark-mode-alert'
                    }
                })
            }
        })
    }
    
    return (
        <Container className="my-5 cart-container">
            <h2 className="mb-4 text-center border-bottom pb-3 cart-title">
                🛍️ Resumen de tu Pedido
            </h2>

            <Row className="justify-content-center mb-4">
                <Col xs={12} lg={10}>
                    <ListGroup variant="flush" className="shadow-sm rounded">
                        {cart.map((sales) => { 
                            const subtotal = sales.price * sales.quantity; 
                            
                            return (
                                <ListGroup.Item 
                                    key={sales.id} 
                                    className="cart-list-item p-3"
                                >
                                    <Row className="align-items-center g-3">

                                        <Col xs={4} sm={3} md={2} lg={2}>
                                            <img 
                                                src={sales.images ? sales.images[0] : ''} 
                                                alt={sales.name}
                                                className="img-fluid cart-item-img"
                                            />
                                        </Col>

                                        <Col xs={8} sm={4} md={3} lg={3}>
                                            <strong className="cart-product-name">{sales.name}</strong>
                                        </Col>

                                        <Col xs={4} sm={2} md={2} lg={2} className="text-center">
                                            <div className="cart-info-label d-sm-none">Cantidad</div>
                                            <div className="cart-info-value">
                                                <span className="badge bg-secondary fs-6 px-3 py-2">
                                                    {sales.quantity}
                                                </span>
                                            </div>
                                        </Col>

                                        <Col xs={4} sm={2} md={2} lg={2} className="text-center">
                                            <div className="cart-info-label d-sm-none">Precio</div>
                                            <div className="cart-info-value">
                                                ${formatPriceDisplay(sales.price)}
                                            </div>
                                        </Col>

                                        <Col xs={4} sm={2} md={2} lg={2} className="text-center">
                                            <div className="cart-info-label d-sm-none">Subtotal</div>
                                            <div className="cart-info-value text-success">
                                                ${formatPriceDisplay(subtotal)}
                                            </div>
                                        </Col>

                                        <Col xs={12} sm={3} md={1} lg={1} className="text-center">
                                            <Button 
                                                variant="outline-danger" 
                                                size="sm"
                                                className="w-100 btn-delete"
                                                onClick={() => removeItem(sales.id)} 
                                            >
                                                <FaTrashAlt className="me-1" />
                                                <span className="d-none d-md-inline">Eliminar</span>
                                                <span className="d-md-none">Quitar</span>
                                            </Button>
                                        </Col>
                                    </Row>
                                </ListGroup.Item>
                            );
                        })}
                    </ListGroup>

                    <div className="d-none d-lg-block mb-2">
                        <Row className="fw-bold" style={{ color: '#EC6EAD', fontSize: '0.9rem' }}>
                            <Col lg={2}>IMAGEN</Col>
                            <Col lg={3}>PRODUCTO</Col>
                            <Col lg={2} className="text-center">CANTIDAD</Col>
                            <Col lg={2} className="text-center">PRECIO</Col>
                            <Col lg={2} className="text-center">SUBTOTAL</Col>
                            <Col lg={1} className="text-center">ACCIÓN</Col>
                        </Row>
                    </div>
                </Col>
            </Row>
            
            <Row className="mt-4 justify-content-between align-items-start">
                <Col xs={12} lg={5} className="mb-4 mb-lg-0">
                    <div className="d-grid gap-3">
                        <Link to="/" className="text-decoration-none">
                            <Button variant="secondary" size="lg" className="w-100 text-uppercase">
                                <FaShoppingCart className="me-2" />
                                Seguir Comprando
                            </Button>
                        </Link>
                
                        {cart.length > 1 && (
                            <Button 
                                variant="outline-danger" 
                                onClick={handleClearCart} 
                                size="lg"
                                className="text-uppercase w-100"
                            >
                                <FaTrashAlt className="me-2" />
                                Vaciar carrito
                            </Button>
                        )}
                    </div>
                </Col>

                <Col xs={12} lg={5}>
                    <Card className="shadow-lg border-primary cart-summary" style={{ backgroundColor: '#1a1a1a', borderColor: '#cf51a5ff' }}>
                        <Card.Body className="p-4">
                            <div className="d-flex justify-content-between align-items-center mb-3 pb-3 border-bottom" style={{ borderColor: '#cf51a5ff !important' }}>
                                <h5 className="mb-0" style={{ color: '#ffffff', fontWeight: 'bold' }}>Total a pagar:</h5>
                                <h3 className="mb-0" style={{ color: '#4ade80', fontWeight: 'bold' }}>
                                    ${formatPriceDisplay(getTotal())}
                                </h3>
                            </div>
                            
                            <div className="d-grid">
                                <Link 
                                    className="btn btn-lg btn-grad text-decoration-none py-3"
                                    to="/checkout"
                                >
                                    Terminar compra
                                </Link>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}

export default CartView