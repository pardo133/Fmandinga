import { useState } from 'react';
import './CookieBanner.css';

export default function CookieBanner() {
  const [visible, setVisible] = useState(() => !localStorage.getItem('cookieConsent'));

  if (!visible) return null;

  const handle = (accepted: boolean) => {
    localStorage.setItem('cookieConsent', accepted ? 'accepted' : 'rejected');
    setVisible(false);
  };

  return (
    <div className="cookie-banner">
      <p className="cookie-text">
        Usamos cookies propias y de terceros para mejorar tu experiencia de navegación.
        Puedes aceptarlas o rechazarlas.
      </p>
      <div className="cookie-actions">
        <button className="cookie-btn cookie-reject" onClick={() => handle(false)}>
          Rechazar
        </button>
        <button className="cookie-btn cookie-accept" onClick={() => handle(true)}>
          Aceptar
        </button>
      </div>
    </div>
  );
}
