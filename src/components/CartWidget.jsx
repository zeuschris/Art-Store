import { BsCart3 } from "react-icons/bs";
import "../styles/CartWidget.css";

const CartWidget = ({counter}) => {
  return (
    <div className="cart-widget">
      <BsCart3 size={22} />
      <span className="cart-count">{counter}</span>
    </div>
  );
};

export default CartWidget;
