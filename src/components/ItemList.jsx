import { Item } from './Item';

const ItemList = ({ data }) => {
    return (
        <div className='d-flex justify-content-evenly flex-wrap py-5'>
            {data.map((product, index) => (
                <Item 
                    key={product.id} 
                    product={product} 
                    index={index} 
                /> 
            ))}
        </div>
    );
};
export default ItemList;