import { useContext } from "react"
import { CartContext } from "../context/CartContext"
import { Container, Row, Col, Button, Table, Image, Card } from 'react-bootstrap';
import { FaTrashAlt  } from 'react-icons/fa';
import { Link } from 'react-router-dom'; 
import Swal from 'sweetalert2'; 

const CartView = () => {
    
    const {cart, clear, removeItem, getTotal} = useContext(CartContext)
    
  
    const formatPriceDisplay = (price) => {
        return parseFloat(price || 0).toFixed(2)
            .replace('.', ',')
            .replace(/\B(?=(\d{3})+(?!\d))/g, ".")
    }
    
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
        <Container className="my-5">
            <h2 className="mb-4 text-center border-bottom pb-3"
                style={{ color:'#cf51a5ff', fontFamily: 'Sansita, sans-serif', textShadow: '1px 1px 2px #EC6EAD', fontWeight: 'bold', fontSize: '2.5rem' }}>
                🛍️ Resumen de tu Pedido
            </h2>

            <Row className="justify-content-center">
                <Col xs={12} lg={10}>
                    <Table responsive striped hover className="align-middle shadow-sm">
                        <thead className="table-dark">
                            <tr>
                                <th className="text-center"></th>
                                <th>Producto</th>
                                <th className="text-center">Cantidad</th>
                                <th className="text-end">Precio Unit.</th>
                                <th className="text-end">Subtotal</th>
                                <th className="text-center">Eliminar</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cart.map((sales) => { 
                                const subtotal = sales.price * sales.quantity; 
                                
                                return (
                                    <tr key={sales.id}>
                                        <td className="text-center">
                                            <Image 
                                                src={sales.images ? sales.images[0] : ''} 
                                                alt={sales.name} 
                                                roundedCircle
                                                style={{ width: '50px', height: '50px', objectFit: 'cover' }} 
                                            />
                                        </td>
                                        <td><strong>{sales.name}</strong></td>
                                        <td className="text-center">{sales.quantity}</td>
                                        <td className="text-end">
                                            ${formatPriceDisplay(sales.price)}
                                        </td>
                                        <td className="text-end">
                                            <strong>${formatPriceDisplay(subtotal)}</strong>
                                        </td>
                                        <td className="text-center">
                                            <Button 
                                                variant="outline-danger" 
                                                size="sm" 
                                                onClick={() => removeItem(sales.id)} 
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
            
            <Row className="mt-4 justify-content-between align-items-start">
                <Col xs={12} lg={5} className="d-grid gap-3 mb-4 mb-lg-0">
                    
                    <Link to="/" className="text-decoration-none d-grid">
                        <Button variant="outline-dark" size="lg" className="text-uppercase">
                            🛒 Seguir Comprando
                        </Button>
                    </Link>
            
                    {cart.length > 1 && (
                        <Button 
                            variant="outline-danger" 
                            onClick={handleClearCart} 
                            size="lg"
                            className="text-uppercase"
                        >
                            Vaciar carrito
                        </Button>
                    )}
                </Col>

                <Col xs={12} lg={5}>
                    <Card className="p-4 shadow bg-light border-primary">
                        <div className="d-flex justify-content-between mb-3 border-bottom pb-2">
                            <span className="mb-0 fs-5 text-dark">Total a pagar:</span>
                            <span className="text-success fs-3">
                                <strong>${formatPriceDisplay(getTotal())}</strong>
                            </span>
                        </div>
                        
                        <div className="d-grid">
                            <Link 
                                size="lg" 
                                className="mt-2 btn-grad text-decoration-none"
                                to="/checkout"
                            >
                                Terminar compra
                            </Link>
                        </div>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}

export default CartView