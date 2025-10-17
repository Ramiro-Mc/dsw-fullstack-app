import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './Checkout.css';

const Checkout = () => {
  const { idCurso } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const [curso, setCurso] = useState(null);
  const [loading, setLoading] = useState(true);
  const [procesandoPago, setProcesandoPago] = useState(false);
  const [error, setError] = useState(null);
  const [pagoConfirmado, setPagoConfirmado] = useState(false);


const [datosTransferencia, setDatosTransferencia] = useState({
  nombre: "Cargando...",
  banco: "Cargando...",
  cvu: "Cargando...",
  alias: "Cargando..."
});

  const fetchCurso = useCallback(async () => {
  try {
    const response = await fetch(`/api/checkout/curso/${idCurso}`);
    const data = await response.json();
    
    if (data.success) {
      setCurso(data.contenido);
      

      if (data.contenido.Profesor) {
        setDatosTransferencia({
          nombre: data.contenido.Profesor.nombreReferido || data.contenido.Profesor.nombreUsuario,
          banco: data.contenido.Profesor.banco || "Banco no especificado",
          cvu: data.contenido.Profesor.cvu || "CVU no especificado", 
          alias: data.contenido.Profesor.alias || "Alias no especificado"
        });
      }
    } else {
      setError('Curso no encontrado');
    }
  } catch (err) { 
    console.error('Error al cargar curso:', err);
    setError('Error al cargar el curso');
  } finally {
    setLoading(false);
  }
}, [idCurso]);

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    fetchCurso();
  }, [user, navigate, fetchCurso]);

  const handleConfirmarPago = async () => {
    if (!user || !user.id) {
      navigate('/login');
      return;
    }

    setProcesandoPago(true);
    
    try {
      console.log('Confirmando pago...');
      console.log('Usuario ID:', user.id);
      console.log('Curso ID:', idCurso);

      const response = await fetch('/api/pagos/confirmar-transferencia', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          idCurso: parseInt(idCurso),
          idUsuario: user.id
        })
      });

      console.log('Response status:', response.status);
      const data = await response.json();
      console.log('Response data:', data);

      if (data.success) {
        console.log('Pago confirmado, redirecting...');
        setPagoConfirmado(true);
        
     
        setTimeout(() => {
          navigate('/'); 
        }, 8000);
      } else {
        alert(data.msg || 'Error al confirmar el pago');
      }

    } catch (err) {
      console.error('Error al confirmar pago:', err);
      alert('Error de conexión: ' + err.message);
    } finally {
      setProcesandoPago(false);
    }
  };


  if (loading) return <div className="loading">Cargando...</div>;
  if (error) return <div className="error">{error}</div>;
  if (!curso) return <div className="error">Curso no encontrado</div>;

  if (pagoConfirmado) {
    return (
      <div className="checkout-container">
        <div className="success-message">
          <h1>¡Pago confirmado!</h1>
          <p>Tu inscripción al curso está siendo procesada. Serás redirigido al inicio en unos segundos...</p>
          <button onClick={() => navigate('/')} className="btn-continue">
            Ir al inicio ahora
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="checkout-container">
      <div className="checkout-content">
        <div className="checkout-left">
          <h1>Checkout</h1>
          
          <div className="billing-section">
            <h2>Información de facturación</h2>
          </div>

          <div className="payment-section">
            <h2>Método de pago</h2>
            <div className="payment-method">
              <div className="transfer-option">
                <input type="radio" id="transferencia" name="payment" defaultChecked />
                <label htmlFor="transferencia">
                  <div className="payment-label">
                    <span>💳 Transferencia Bancaria</span>
                  </div>
                </label>
              </div>
            </div>
            
            <div className="transfer-details">
              <h3>Datos para transferencia</h3>
              <div className="transfer-info">
                <div className="info-row">
                  <label>Titular:</label>
                  <div className="info-value">
                    <span>{datosTransferencia.nombre}</span>
                  </div>
                </div>
                
                <div className="info-row">
                  <label>Banco:</label>
                  <div className="info-value">
                    <span>{datosTransferencia.banco}</span> 
                  </div>
                </div>
                
                <div className="info-row">
                  <label>CVU:</label>
                  <div className="info-value">
                    <span>{datosTransferencia.cvu}</span>
                  </div>
                </div>
                
                <div className="info-row">
                  <label>Alias:</label>
                  <div className="info-value">
                    <span>{datosTransferencia.alias}</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="secure-notice">
              🔒 Transferencia segura y verificada
            </div>
          </div>

          <div className="order-details">
            <h2>Detalles del pedido</h2>
            <div className="course-item">
              <div className="course-info">
                <h3>{curso.titulo}</h3>
                <p>Por {curso.Profesor?.nombreUsuario || 'Instructor'}</p>
                <p>{curso.TipoCurso?.nombreTipo || 'Curso'}</p> 
              </div>
              <div className="course-price">
                ${curso.precio}
              </div>
            </div>
          </div>
        </div>

        <div className="checkout-right">
          <div className="order-summary">
            <h2>Resumen del pedido</h2>
            
            <div className="price-line">
              <span>Precio original:</span>
              <span>${curso.precio}</span>
            </div>
            
            <div className="total-line">
              <span><strong>Total:</strong></span>
              <span><strong>${curso.precio}</strong></span>
            </div>

            <div className="terms-text">
              Al completar tu compra, aceptas nuestros{' '}
              <b>Términos de Uso</b>
            </div>

            <button 
              className="pay-button"
              onClick={handleConfirmarPago}
              disabled={procesandoPago}
            >
              {procesandoPago ? 'Procesando...' : `Confirmar Pago $${curso.precio}`}
            </button>

            <div className="payment-instructions">
              <h4>Instrucciones:</h4>
              <ol>
                <li>Realiza la transferencia por el monto exacto</li>
                <li>Haz clic en "Confirmar Pago"</li>
                <li>Adjunta el comprobante si es necesario</li>
                <li>Recibirás acceso al curso en 24-48 horas</li>
              </ol>
            </div>

            <div className="guarantee">
              <h3>Garantía de devolución de 30 días</h3>
              <p>¿No estás satisfecho? Obtén un reembolso completo en 30 días.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;