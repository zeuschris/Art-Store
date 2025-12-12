import { Card, Placeholder, Button } from 'react-bootstrap';


const ItemSkeleton = () => {
  return (
    <Card style={{ width: '30rem', marginBottom: '50px' }} className='card-item'>
      <Card.Img
        variant="top"
        src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Crect width='100' height='100' fill='%23e9ecef'%3E%3C/rect%3E%3C/svg%3E"
        alt="Cargando producto"
        style={{ height: '350px', objectFit: 'cover' }} 
      />
      
      <Card.Body style={{ margin: '10px' }}>
        <Placeholder as={Card.Title} animation="wave">
          <Placeholder xs={8} /> 
        </Placeholder>
        
        <Card.Text style={{ fontSize: '30px', marginTop: '40px' }}>
          <Placeholder xs={4} />
        </Card.Text>
      </Card.Body>
      
      <Card.Footer className='card-footer'>
        <Placeholder.Button variant="primary" xs={8} className='btn-grad mb-5' />
      </Card.Footer>
    </Card>
  );
};

export default ItemSkeleton;