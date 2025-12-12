import { useState } from 'react'

const ItemCount = ({stock, onAdd}) => {

    const [count, setCount] = useState(1)

    const btnAumentar = () => {
        count < stock ? setCount(count + 1) : ''
    }
    const btnDisminuir = () => {
        count > 0 ? setCount(count - 1) : ''
    }

  return (
    <>
      {
        stock > 0 ? 

        <div >
          <button onClick={btnAumentar} className='btn btn-outline-success'>+</button>
          <span className='m-lg-2 btn'>{count}</span>
          <button onClick={btnDisminuir} className='btn btn-outline-danger'>-</button>
          <button className='btn btn-primary m-lg-2' onClick={()=>onAdd(count)} disabled={stock === 0 || count === 0}>Añadir al carrito</button>
        </div>

        :

        <p className='alert alert-danger text-center fw-bold p-3 my-3'role='alert'>No hay stock por el momento, regresa pronto!</p>
    }
    </>
  )
}

export default ItemCount