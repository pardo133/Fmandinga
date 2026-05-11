import { useCart } from '../../context/CartContext';
import './CartFab.css';

const CartFab = () => {
  const { totalItems, toggleCart } = useCart();

  return (
    <button
      id="cart-icon-btn"
      className="cart-fab"
      onClick={toggleCart}
      aria-label={`Carrito (${totalItems} artículos)`}
    >
      <svg className="cart-fab-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="9" cy="21" r="1" />
        <circle cx="20" cy="21" r="1" />
        <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
      </svg>
      {totalItems > 0 && (
        <span className="cart-fab-badge">{totalItems > 99 ? '99+' : totalItems}</span>
      )}
    </button>
  );
};

export default CartFab;
