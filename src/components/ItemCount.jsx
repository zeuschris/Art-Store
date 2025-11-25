import { useState } from 'react'

const ItemCount = ({stock}) => {

    const [count, setCount] = useState(1)
    const [buy, setBuy] = useState(false)

    const btnAumentar = () => {
        count < stock ? setCount(count + 1) : ''
    }
    const btnDisminuir = () => {
        count <= stock && count > 1 ? setCount(count - 1) : ''
    }

  return (
    <div>
        <button onClick={btnAumentar} className='btn btn-outline-success' disabled={count >= stock}>+</button>
        <span className='m-lg-2 btn'>{count}</span>
        <button onClick={btnDisminuir} className='btn btn-outline-danger' disabled={count <= 1}>-</button>
        <button onClick={() => setBuy(!buy)} className='btn btn-primary m-lg-2'>Agregar al carrito</button>
    </div>
  )
}

export default ItemCount