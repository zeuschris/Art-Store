import { useContext, useEffect } from "react"
import { CartContext } from "../context/CartContext"
import { Container, Row, Col, Button, Card, Table } from 'react-bootstrap';
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

            {/* ===== VISTA MOBILE - CARDS (solo < 768px) ===== */}
            <div className="d-md-none">
                {cart.map((sales) => { 
                    const subtotal = sales.price * sales.quantity; 
                    
                    return (
                        <Card key={sales.id} className="mb-3 shadow-sm cart-item-mobile">
                            <Card.Body className="p-3">
                                <Row className="g-3">
                                    <Col xs={4}>
                                        <img 
                                            src={sales.images ? sales.images[0] : ''} 
                                            alt={sales.name}
                                            className="img-fluid cart-mobile-image"
                                        />
                                    </Col>
                                    <Col xs={8}>
                                        <h5 className="cart-product-name mb-2">{sales.name}</h5>
                                        <div className="cart-item-details">
                                            <p className="mb-1">
                                                <span className="cart-info-label">Cantidad:</span>
                                                <strong className="ms-2 cart-info-value">{sales.quantity}</strong>
                                            </p>
                                            <p className="mb-1">
                                                <span className="cart-info-label">Precio:</span>
                                                <strong className="ms-2 cart-info-value">${formatPriceDisplay(sales.price)}</strong>
                                            </p>
                                            <p className="mb-2">
                                                <span className="cart-info-label">Subtotal:</span>
                                                <strong className="ms-2 text-success">${formatPriceDisplay(subtotal)}</strong>
                                            </p>
                                        </div>
                                        <Button 
                                            variant="outline-danger" 
                                            size="sm"
                                            className="w-100 mt-2 btn-delete-mobile"
                                            onClick={() => removeItem(sales.id)} 
                                        >
                                            <FaTrashAlt className="me-2" />
                                            Eliminar
                                        </Button>
                                    </Col>
                                </Row>
                            </Card.Body>
                        </Card>
                    );
                })}
            </div>

            {/* ===== VISTA DESKTOP - TABLA (solo >= 768px) ===== */}
            <div className="d-none d-md-block">
                <Row className="justify-content-center">
                    <Col xs={12} lg={10}>
                        <Table striped hover className="align-middle shadow-sm cart-table-desktop">
                            <thead className="table-dark">
                                <tr>
                                    <th className="text-center" style={{width: '100px'}}>Imagen</th>
                                    <th>Producto</th>
                                    <th className="text-center" style={{width: '120px'}}>Cantidad</th>
                                    <th className="text-end" style={{width: '130px'}}>Precio Unit.</th>
                                    <th className="text-end" style={{width: '130px'}}>Subtotal</th>
                                    <th className="text-center" style={{width: '120px'}}>Eliminar</th>
                                </tr>
                            </thead>
                            <tbody>
                                {cart.map((sales) => { 
                                    const subtotal = sales.price * sales.quantity; 
                                    
                                    return (
                                        <tr key={sales.id} className="cart-table-row">
                                            <td className="text-center">
                                                <img 
                                                    src={sales.images ? sales.images[0] : ''} 
                                                    alt={sales.name}
                                                    className="cart-desktop-image"
                                                />
                                            </td>
                                            <td>
                                                <strong className="cart-product-name">{sales.name}</strong>
                                            </td>
                                            <td className="text-center">
                                                <span className="badge bg-secondary fs-6 px-3 py-2">
                                                    {sales.quantity}
                                                </span>
                                            </td>
                                            <td className="text-end cart-info-value">
                                                ${formatPriceDisplay(sales.price)}
                                            </td>
                                            <td className="text-end text-success fw-bold fs-5">
                                                ${formatPriceDisplay(subtotal)}
                                            </td>
                                            <td className="text-center">
                                                <Button 
                                                    variant="outline-danger" 
                                                    size="sm" 
                                                    onClick={() => removeItem(sales.id)}
                                                    className="btn-delete-desktop"
                                                >
                                                    <FaTrashAlt/>
                                                </Button>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </Table>
                    </Col>
                </Row>
            </div>
            
            {/* ===== BOTONES Y RESUMEN ===== */}
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
                            <div className="d-flex justify-content-between align-items-center mb-3 pb-3 border-bottom" style={{ borderColor: '#444' }}>
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