import { useState } from 'react'

const ItemCount = ({ stock, onAdd }) => {
    const [count, setCount] = useState(1)

    const btnAumentar = () => {
        count < stock ? setCount(count + 1) : ''
    }
    const btnDisminuir = () => {
        count > 1 ? setCount(count - 1) : '' 
    }

    return (
        <>
            {stock > 0 ? (
                <div className='d-flex flex-column align-items-center gap-3 mt-3'>
                    <div className='d-flex align-items-center gap-2'>
                        <button onClick={btnAumentar} className='btn btn-outline-success'>+</button>
                        <span className='fw-bold px-3'>{count}</span>
                        <button onClick={btnDisminuir} className='btn btn-outline-danger'>-</button>
                    </div>
                    <button 
                        className='btn btn-primary w-100 py-2 shadow-sm' 
                        onClick={() => onAdd(count)} 
                        disabled={stock === 0 || count === 0}
                        style={{ maxWidth: '250px' }}
                    >
                        Añadir al carrito
                    </button>
                </div>
            ) : (
                <p className='alert alert-danger text-center fw-bold p-3 my-3' role='alert'>
                    No hay stock por el momento, regresa pronto!
                </p>
            )}
        </>
    )
}

export default ItemCount