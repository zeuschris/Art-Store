import { BsCart3 } from "react-icons/bs";
import "../styles/CartWidget.css";
import { useContext } from "react";
import { CartContext } from '../context/CartContext'; 
import { NavLink } from "react-router-dom"; 

const CartWidget = () => {

  const { totalItems } = useContext(CartContext); 

  if (totalItems === 0) {
    return null;
  }

  return (
    <NavLink to="/cart" className="cart-widget-link"> 
      <div className="cart-widget">
        <BsCart3 size={22} />
        <span className="cart-count">{totalItems}</span>
      </div>
    </NavLink>
  );
};

export default CartWidget;