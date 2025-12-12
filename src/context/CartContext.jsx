import { useState, useEffect } from 'react'
import { createContext } from 'react'
import { toast } from 'react-toastify'; 

// eslint-disable-next-line react-refresh/only-export-components
export const CartContext = createContext()

const cartLS = JSON.parse(localStorage.getItem('cartLS')) || []

export const CartProvider = ({ children }) => {

    const [cart, setCart] = useState(cartLS)

    useEffect(() => {
        localStorage.setItem('cartLS', JSON.stringify(cart))
    },[cart])

    console.log('cart', cart)

    const isInCart = (id) => {
        return cart.some(cartItem => cartItem.id === id)
    }

    const addItem = (item, qty) => {
        let message = ''
        const exists = isInCart(item.id);

        if (exists) {
            const updatedCart = cart.map(cartItem => {
                if (cartItem.id === item.id) {
                    
                    message = `Añadido ${qty} unidades adicionales de ${item.name}.`;

                    return {
                        ...cartItem,
                        quantity: cartItem.quantity + qty
                    }
                }
                return cartItem;
            })
            
            setCart(updatedCart)

        } else {
            message = `¡${item.name} ha sido añadido al carrito!`
            setCart([...cart, { ...item, quantity: qty }])
        }

        toast.success(message, {
            position: "bottom-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    }

    const removeItem = (id) => {
        setCart(cart.filter(cartItem => cartItem.id !== id))
    }

    const clear = () => {
        setCart([])
    }

    const avaibleStock = (id) => {
        const itemInCart = cart.find(cartItem => cartItem.id === id)
        return itemInCart ? itemInCart.quantity : 0
    }

    const getTotal = () => {
        return cart.reduce((acc, item) => {
            return acc + (item.price * item.quantity);
        }, 0); 
    }

    const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
    
   return(
        <CartContext.Provider value={{cart, addItem, removeItem, clear, isInCart, avaibleStock, getTotal, totalItems}}>
            {children}
        </CartContext.Provider>
   )
}