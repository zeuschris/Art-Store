import { Item } from './Item';

export const ItemList = ({data}) => {
  return (
    <div className='d-flex justify-content-evenly flex-wrap py-5'>
      {data.map(product => <Item key={product.id} product={product}/>)}
    </div>
  )
}

export default ItemList;
