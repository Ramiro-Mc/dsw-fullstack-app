import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import './CheckoutSuccess.css';

const CheckoutSuccess = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  
  const sessionId = searchParams.get('session_id'); // Stripe
  const transactionId = searchParams.get('transactionId'); // Transferencia
  const method = searchParams.get('method'); // 'transfer' o undefined
  
  const [countdown, setCountdown] = useState(10);

  const isTransferencia = method === 'transfer';

  useEffect(() => {
    // Countdown timer
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          navigate('/');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [navigate]);

  return (
    <div className="checkout-success-container">
      <div className="success-card">
        <div className="success-icon">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
            <polyline points="22 4 12 14.01 9 11.01"></polyline>
          </svg>
        </div>

        <h1>¡Pago realizado con éxito!</h1>
        
        <p className="success-message">
          {isTransferencia 
            ? 'Tu transferencia ha sido registrada. Recibirás acceso al curso en 24-48 horas.'
            : 'Tu compra se ha procesado correctamente.'
          }
        </p>

        <div className="info-box">
          <p>
            Para ver tus cursos, ve a <strong>"Mis Cursos Comprados"</strong>
          </p>
          {(sessionId || transactionId) && (
            <p className="session-id">
              ID de transacción: <code>{(sessionId || transactionId).slice(0, 20)}...</code>
            </p>
          )}
          {isTransferencia && (
            <p className="transfer-note">
              ⚠️ El acceso al curso se activará una vez verificada tu transferencia.
            </p>
          )}
        </div>

        <div className="countdown-box">
          <p>Serás redirigido al inicio en <strong>{countdown}</strong> segundos...</p>
        </div>

        <div className="action-buttons">
          <button 
            className="btn-primary"
            onClick={() => navigate('/MiPerfil/misCursosComprados')}
          >
            Ir a Mis Cursos
          </button>
          
          <button 
            className="btn-secondary"
            onClick={() => navigate('/')}
          >
            Ir al Inicio
          </button>
        </div>

        <div className="help-text">
          <p>
            Si tienes algún problema, contacta a{' '}
            <a href="mailto:contacto@utndemy.com">contacto@utndemy.com</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default CheckoutSuccess;