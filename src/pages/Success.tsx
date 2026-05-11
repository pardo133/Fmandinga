import { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { getSessionStatus, SessionStatusResponse } from '../service/checkoutService';
import './Success.css';

type PageState = 'loading' | 'success' | 'error';

const Success = () => {
  const [searchParams] = useSearchParams();
  const [pageState, setPageState] = useState<PageState>('loading');
  const [session, setSession] = useState<SessionStatusResponse | null>(null);
  const [errorMessage, setErrorMessage] = useState<string>('');

  useEffect(() => {
    const sessionId = searchParams.get('session_id');

    if (!sessionId) {
      setErrorMessage('No se encontró el identificador de sesión en la URL.');
      setPageState('error');
      return;
    }

    getSessionStatus(sessionId)
      .then((data) => {
        if (data.status === 'paid') {
          setSession(data);
          setPageState('success');
        } else {
          setErrorMessage('El pago no fue completado. Por favor, inténtalo de nuevo.');
          setPageState('error');
        }
      })
      .catch(() => {
        setErrorMessage('No se pudo verificar el estado del pago. Contacta con soporte si el problema persiste.');
        setPageState('error');
      });
  }, [searchParams]);

  if (pageState === 'loading') {
    return (
      <div className="success-page">
        <div className="success-card">
          <div className="success-spinner" />
          <p className="success-loading-text">Verificando tu pago...</p>
        </div>
      </div>
    );
  }

  if (pageState === 'error') {
    return (
      <div className="success-page">
        <div className="success-card error">
          <div className="success-icon error-icon">✕</div>
          <h1>Algo salió mal</h1>
          <p className="success-subtitle">{errorMessage}</p>
          <Link to="/productos" className="success-btn">
            Volver a la tienda
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="success-page">
      <div className="success-card">
        <div className="success-icon">✓</div>
        <h1>¡Pedido confirmado!</h1>
        <p className="success-subtitle">
          Gracias por tu compra. Hemos recibido tu pedido correctamente.
        </p>
        {session?.customerEmail && (
          <p className="success-email">
            Recibirás una confirmación en <strong>{session.customerEmail}</strong>
          </p>
        )}
        {session?.amountTotal != null && (
          <p className="success-amount">
            Total pagado:{' '}
            <strong>
              {(session.amountTotal / 100).toFixed(2)}{' '}
              {session.currency?.toUpperCase() ?? 'EUR'}
            </strong>
          </p>
        )}
        <Link to="/" className="success-btn">
          Volver al inicio
        </Link>
      </div>
    </div>
  );
};

export default Success;
