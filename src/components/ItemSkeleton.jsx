import { Card, Placeholder } from 'react-bootstrap';

const ItemSkeleton = () => {
  return (
    /* Eliminamos width fijo para que sea responsivo como el Item original */
    <Card 
      className='card-item h-100 shadow-sm border-0' 
      style={{ marginBottom: '30px' }}
    >
      {/* Marcador para la imagen con la misma altura de 250px que el Item */}
      <div style={{ height: '250px', backgroundColor: '#e9ecef', overflow: 'hidden' }}>
        <Card.Img
          variant="top"
          src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Crect width='100' height='100' fill='%233a444f'%3E%3C/rect%3E%3C/svg%3E"
          alt="Cargando producto"
          style={{ height: '100%', objectFit: 'cover', opacity: 0.3 }} 
        />
      </div>
      
      <Card.Body className="d-flex flex-column p-3 text-center">
        {/* Marcador para el título */}
        <Placeholder as={Card.Title} animation="glow">
          <Placeholder xs={8} bg="light" /> 
        </Placeholder>
        
        {/* Marcador para el precio */}
        <Placeholder as={Card.Text} animation="glow" className="mt-2">
          <Placeholder xs={4} size="lg" bg="light" />
        </Placeholder>
        
        {/* Espaciador flexible para empujar el botón al fondo */}
        <div className="flex-grow-1"></div>
      </Card.Body>
      
      <Card.Footer className='bg-transparent border-0 p-3 mt-auto'>
        {/* Marcador para el botón que ocupa todo el ancho */}
        <Placeholder animation="glow">
          <Placeholder.Button xs={12} className="py-2" style={{ borderRadius: '10px', opacity: 0.5 }} />
        </Placeholder>
      </Card.Footer>
    </Card>
  );
};

export default ItemSkeleton;