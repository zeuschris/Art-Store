import { useState, useEffect } from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
// eslint-disable-next-line no-unused-vars
import { animated, useSpring } from '@react-spring/web'; 

import '../styles/Item.css';

export const Item = ({product, index}) => {

    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, [])

    const animationProps = useSpring({
        to: { opacity: 1, transform: 'translateY(0px)' },
        from: { opacity: 0, transform: 'translateY(50px)' }, 
        reset: isMounted, 
        delay: isMounted ? index * 50 : 0, 
        config: { mass: 1, tension: 220, friction: 100 }, 
    })

    return (
        <animated.div 
            style={animationProps} 
        >
            <Card 
                style={{ width: '30rem', marginBottom: '50px' }} 
                className='card-item'
            >
                <Card.Img variant="top" src={product.images[0]} alt={product.name}/>
                <Card.Body style={{margin:'10px'}}>
                    <Card.Title style={{fontFamily:'Sansita', fontSize:'25px'}}>{product.name}</Card.Title>
                    <Card.Text style={{fontSize:'30px', marginTop:'40px'}}>$ {product.price}</Card.Text>
                </Card.Body>
                <Card.Footer className='card-footer'>
                    <Link to={`/item/${product.id}`} className='btn btn-grad mb-5'>Ver Producto</Link>
                </Card.Footer>
            </Card>
        </animated.div>
    );
}