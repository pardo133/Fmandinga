import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useUser } from '../context/UserContext';
import { createCheckoutSession } from '../service/checkoutService';
import './Checkout.css';

interface ShippingAddress {
  fullName: string;
  address: string;
  city: string;
  postalCode: string;
  country: string;
}

const Checkout = () => {
  const { items, total, closeCart } = useCart();
  const { user } = useUser();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [shipping, setShipping] = useState<ShippingAddress>({
    fullName: user ? `${user.nombre ?? ''} ${user.apellido ?? ''}`.trim() : '',
    address: user?.address ?? '',
    city: user?.city ?? '',
    postalCode: user?.postalCode ?? '',
    country: user?.country ?? '',
  });

  useEffect(() => {
    if (items.length === 0) navigate('/');
  }, [items, navigate]);

  const handleShippingChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setShipping(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);
    try {
      const { url } = await createCheckoutSession(items);
      closeCart();
      window.location.href = url;
    } catch {
      setError('No se pudo procesar el pago. Inténtalo de nuevo.');
      setIsLoading(false);
    }
  };

  const shippingCost = 0;

  return (
    <div className="co-page">
      <h1 className="co-title">Finalizar compra</h1>

      <form className="co-grid" onSubmit={handleSubmit} noValidate>

        {/* ── LEFT: dirección ── */}
        <div className="co-left">
          <section className="co-section">
            <h2 className="co-section-title">Dirección de envío</h2>
            <div className="co-fields">
              <div className="co-field-group co-full">
                <label htmlFor="fullName" className="co-label">Nombre completo</label>
                <input
                  id="fullName"
                  name="fullName"
                  className="co-input"
                  type="text"
                  placeholder="Juan García López"
                  value={shipping.fullName}
                  onChange={handleShippingChange}
                  required
                />
              </div>
              <div className="co-field-group co-full">
                <label htmlFor="address" className="co-label">Dirección</label>
                <input
                  id="address"
                  name="address"
                  className="co-input"
                  type="text"
                  placeholder="Calle Mayor, 12, 3º A"
                  value={shipping.address}
                  onChange={handleShippingChange}
                  required
                />
              </div>
              <div className="co-field-group">
                <label htmlFor="city" className="co-label">Ciudad</label>
                <input
                  id="city"
                  name="city"
                  className="co-input"
                  type="text"
                  placeholder="Madrid"
                  value={shipping.city}
                  onChange={handleShippingChange}
                  required
                />
              </div>
              <div className="co-field-group">
                <label htmlFor="postalCode" className="co-label">Código postal</label>
                <input
                  id="postalCode"
                  name="postalCode"
                  className="co-input"
                  type="text"
                  placeholder="28001"
                  value={shipping.postalCode}
                  onChange={handleShippingChange}
                  required
                />
              </div>
              <div className="co-field-group co-full">
                <label htmlFor="country" className="co-label">País</label>
                <select
                  id="country"
                  name="country"
                  className="co-input co-select"
                  value={shipping.country}
                  onChange={handleShippingChange}
                  required
                >
                  <option value="" disabled>Selecciona un país</option>
                  <option value="ES">España</option>
                  <option value="MX">México</option>
                  <option value="AR">Argentina</option>
                  <option value="CO">Colombia</option>
                  <option value="CL">Chile</option>
                  <option value="PE">Perú</option>
                  <option value="US">Estados Unidos</option>
                  <option value="OTHER">Otro</option>
                </select>
              </div>
            </div>
          </section>
        </div>

        {/* ── RIGHT: resumen ── */}
        <aside className="co-right">
          <div className="co-summary">
            <h2 className="co-section-title">Tu pedido</h2>

            <ul className="co-summary-items">
              {items.map(item => (
                <li key={item.id} className="co-summary-item">
                  <img src={item.imagen} alt={item.nombre} className="co-summary-img" />
                  <div className="co-summary-info">
                    <span className="co-summary-name">{item.nombre}</span>
                    <span className="co-summary-qty">× {item.cantidad}</span>
                  </div>
                  <span className="co-summary-price">
                    {(item.precio * item.cantidad).toFixed(2)} €
                  </span>
                </li>
              ))}
            </ul>

            <div className="co-summary-divider" />

            <div className="co-summary-row">
              <span>Subtotal</span>
              <span>{total.toFixed(2)} €</span>
            </div>
            <div className="co-summary-row">
              <span>Envío</span>
              <span className="co-free">
                {shippingCost === 0 ? 'Gratis' : `${shippingCost.toFixed(2)} €`}
              </span>
            </div>

            <div className="co-summary-divider" />

            <div className="co-summary-row co-total-row">
              <span>Total</span>
              <span>{(total + shippingCost).toFixed(2)} €</span>
            </div>

            {error && <p className="co-error">{error}</p>}

            <button type="submit" className="co-pay-btn" disabled={isLoading}>
              {isLoading
                ? 'Procesando...'
                : `Pagar ${(total + shippingCost).toFixed(2)} €`}
            </button>

            <p className="co-secure-note">🔒 Pago 100% seguro con Stripe</p>
          </div>
        </aside>

      </form>
    </div>
  );
};

export default Checkout;
