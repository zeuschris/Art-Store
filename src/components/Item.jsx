import {Card} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import '../styles/Item.css';

export const Item = ({product}) => {
  return (
    <Card style={{ width: '35rem', marginBottom: '50px' }} className='card-item'>
      <Card.Img variant="top" src={product.image} alt={product.name}/>
      <Card.Body style={{margin:'10px'}}>
        <Card.Title style={{textShadow: '1px 1px 1px #fff'}}>{product.name}</Card.Title>
        <Card.Text style={{fontSize:'30px', marginTop:'40px'}}>$ {product.price}</Card.Text>
      </Card.Body>
      <Card.Footer className='card-footer'>
        <Link to={`/item/${product.id}`} className='btn btn-grad mb-5'>Ver Producto</Link>
      </Card.Footer>
    </Card>
)}


        
         