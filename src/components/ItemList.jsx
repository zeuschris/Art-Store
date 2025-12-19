import { Row, Col, Container } from 'react-bootstrap'; 
import { Item } from './Item';

const ItemList = ({ data }) => {
    return (
        <Container className="py-5"> 
            <Row 
                xs={1}      
                sm={2}     
                md={2}     
                lg={3}      
                xl={4}      
                className="g-4 justify-content-center" 
            >
                {data.map((product, index) => (
                    <Col key={product.id} className="d-flex justify-content-center">
                        <Item 
                            product={product} 
                            index={index} 
                        /> 
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

export default ItemList;