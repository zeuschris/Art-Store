import { Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FiHeart } from 'react-icons/fi';
import { useFavorites } from '../context/FavoritesContext';
import { animated, useSpring } from '@react-spring/web'; 

import '../styles/Item.css';

export const Item = ({product, index}) => {
    const { isFavorite, toggleFavorite } = useFavorites();

    const animationProps = useSpring({
        from: { opacity: 0, transform: 'translateY(50px)' },
        to: { opacity: 1, transform: 'translateY(0px)' },
        delay: index * 50,
        config: { mass: 1, tension: 220, friction: 100 },
        reset: false
    })

    const handleFavoriteClick = (e) => {
        e.preventDefault();
        e.stopPropagation();
        toggleFavorite(product);
    };

    return (
        <animated.div style={animationProps} className="h-100 w-100 d-flex justify-content-center">
            <Card 
                className='card-item h-100 shadow-sm border-0'
                style={{ width: '100%', maxWidth: '350px' }} 
            >
                <div style={{ position: 'relative', overflow: 'hidden' }}>
                    <Card.Img 
                        variant="top" 
                        src={product.images[0]} 
                        alt={product.name}
                        className="img-fluid object-fit-cover"
                        style={{ height: '250px', width: '100%' }} 
                    />
                
                    <Button
                        type="button"
                        variant="link"
                        className="position-absolute top-0 end-0 m-2 d-flex align-items-center justify-content-center shadow-sm"
                        style={{ 
                            backgroundColor: 'white',
                            borderRadius: '50%', 
                            width: '40px',      
                            height: '40px',      
                            border: 'none',
                            color: isFavorite(product.id) ? '#dc3545' : '#262626',
                            zIndex: 10,
                            padding: 0,          
                            transition: 'transform 0.2s ease'
                        }}
                        onClick={handleFavoriteClick}
                    >
                        <FiHeart fill={isFavorite(product.id) ? '#dc3545' : 'none'} />
                    </Button>
                </div>
                
                <Card.Body className="d-flex flex-column p-3 text-center">
                    <Card.Title style={{fontFamily:'Sansita', fontSize:'1.3rem'}} className="text-truncate">
                        {product.name}
                    </Card.Title>
                    <Card.Text className="fs-4 mt-2">
                        $ {product.price}
                    </Card.Text>
                    {/* Este div vacío empuja el footer hacia abajo */}
                    <div className="flex-grow-1"></div>
                </Card.Body>
                
                <Card.Footer className='bg-transparent border-0 p-3 mt-auto'>
                    <Link to={`/item/${product.id}`} className='btn btn-grad w-100 py-2'>
                        Ver Producto
                    </Link>
                </Card.Footer>
            </Card>
        </animated.div>
    );
};