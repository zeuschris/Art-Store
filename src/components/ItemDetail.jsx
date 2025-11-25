import React from 'react'
import ItemCount from './ItemCount';

const ItemDetail = ({detail}) => {
  return (
    <div>
      <h2>{detail.name}</h2>
      <p>{detail.description}</p>
      <img src={detail.image} alt={detail.name} />
      <p>Categoría: {detail.category}</p>
      <p>Precio: ${detail.price}</p>
      <p>Stock disponible: {detail.stock}</p>
      <ItemCount stock={detail.stock}/>
    </div>
  )
}

export default ItemDetail