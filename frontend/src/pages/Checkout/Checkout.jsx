import React, { useState, useEffect } from 'react';
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

useEffect(() => {
  if (!user) {
    navigate('/login');
    return;
  }
  fetchCurso();
}, [idCurso, user, navigate]);

 const fetchCurso = async () => {
  try {
    console.log('Buscando curso con ID:', idCurso); // Debug
    const response = await fetch(`/api/checkout/curso/${idCurso}`);
    console.log('Response status:', response.status); // Debug
    
    const data = await response.json();
    console.log('Data recibida:', data); // Debug
    
    if (data.success) {
      setCurso(data.contenido);
    } else {
      setError('Curso no encontrado');
    }
  } catch (error) { 
    console.error('Error al cargar curso:', error);
    setError('Error al cargar el curso');
  } finally {
    setLoading(false);
  }
};

const handlePagar = async () => {
  setProcesandoPago(true);
  
  try {
    const response = await fetch('/api/pagos/crear-preferencia', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        idCurso: parseInt(idCurso),
        idUsuario: user.id
      })
    });

    const data = await response.json();

    if (data.success) {
      window.location.href = data.initPoint;
    } else {
      alert(data.msg || 'Error al procesar el pago');
    }
  } catch (error) {
    console.error('Error al procesar pago:', error);
    alert('Error de conexión');
  } finally {
    setProcesandoPago(false);
  }
};

  if (loading) return <div className="loading">Cargando...</div>;
  if (error) return <div className="error">{error}</div>;
  if (!curso) return <div className="error">Curso no encontrado</div>;

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
              <div className="mercadopago-option">
                <input type="radio" id="mercadopago" name="payment" defaultChecked />
                <label htmlFor="mercadopago">
                    <div className="payment-label">
                        <img 
                        src="/mercadopagologo.png" 
                        alt="MercadoPago" 
                        className="mercadopago-logo"
                        />
                    </div>
                    </label>
              </div>
            </div>
            
            <div className="secure-notice">
              🔒 Pago seguro y encriptado
            </div>
          </div>

          <div className="order-details">
            <h2>Detalles del pedido</h2>
            <div className="course-item">
              <div className="course-thumbnail">
                <img src="/placeholder-course.jpg" alt={curso.titulo} />
              </div>
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
              onClick={handlePagar}
              disabled={procesandoPago}
            >
              {procesandoPago ? 'Procesando...' : ` Pagar $${curso.precio}`}
            </button>

            <div className="guarantee">
              <h3>Garantía de devolución de 30 días</h3>
              <p>¿No estás satisfecho? Obtén un reembolso completo en 30 días. Simple y directo.</p>
            </div>

            <div className="success-tip">
              🎯 <strong>Aprovecha el éxito ahora</strong>
              <p>2 personas se inscribieron recientemente en este curso en las últimas 24 horas.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;