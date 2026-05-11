import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import './CartDrawer.css';

const CartDrawer = () => {
  const { items, removeItem, updateQuantity, total, isOpen, closeCart } = useCart();
  const navigate = useNavigate();

  const handleCheckout = () => {
    closeCart();
    navigate('/checkout');
  };

  return (
    <>
      {isOpen && <div className="cart-backdrop" onClick={closeCart} />}

      <div className={`cart-drawer ${isOpen ? 'open' : ''}`}>
        <div className="cart-header">
          <h2>Tu carrito</h2>
          <button className="cart-close-btn" onClick={closeCart}>×</button>
        </div>

        {items.length === 0 ? (
          <div className="cart-empty">
            <span className="cart-empty-icon">🛒</span>
            <p>Tu carrito está vacío</p>
          </div>
        ) : (
          <>
            <div className="cart-items">
              {items.map(item => (
                <div key={item.id} className="cart-item">
                  <img src={item.imagen} alt={item.nombre} className="cart-item-img" />
                  <div className="cart-item-info">
                    <p className="cart-item-name">{item.nombre}</p>
                    <p className="cart-item-price">{item.precio.toFixed(2)}€</p>
                    <div className="cart-item-qty">
                      <button onClick={() => updateQuantity(item.id, -1)}>−</button>
                      <span>{item.cantidad}</span>
                      <button onClick={() => updateQuantity(item.id, 1)}>+</button>
                    </div>
                  </div>
                  <button className="cart-item-remove" onClick={() => removeItem(item.id)}>×</button>
                </div>
              ))}
            </div>

            <div className="cart-footer">
              <div className="cart-total">
                <span>Total</span>
                <span className="cart-total-amount">{total.toFixed(2)}€</span>
              </div>
              <button
                className="cart-checkout-btn"
                onClick={handleCheckout}
              >
                Finalizar compra
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default CartDrawer;
