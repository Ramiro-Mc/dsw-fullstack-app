import React, { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import CustomAlert from "../../components/CustomAlert/CustomAlert";
import "./Checkout.css";

const Checkout = () => {
  const { idCurso } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [curso, setCurso] = useState(null);
  const [loading, setLoading] = useState(true);
  const [procesandoPago, setProcesandoPago] = useState(false);
  const [error, setError] = useState(null);
  const [metodoPago, setMetodoPago] = useState("stripe");
  const [alert, setAlert] = useState(null); // 'stripe' o 'transferencia'

  const [datosTransferencia, setDatosTransferencia] = useState({
    nombre: "Cargando...",
    banco: "Cargando...",
    cvu: "Cargando...",
    alias: "Cargando...",
  });

  const fetchCurso = useCallback(async () => {
    try {
      const response = await fetch(`/api/checkout/curso/${idCurso}`);
      const data = await response.json();

      if (data.success) {
        setCurso(data.contenido);

        // Cargar datos de transferencia del profesor
        if (data.contenido.Profesor) {
          setDatosTransferencia({
            nombre:
              data.contenido.Profesor.nombreReferido ||
              data.contenido.Profesor.nombreUsuario,
            banco: data.contenido.Profesor.banco || "Banco no especificado",
            cvu: data.contenido.Profesor.cvu || "CVU no especificado",
            alias: data.contenido.Profesor.alias || "Alias no especificado",
          });
        }
      } else {
        setError("Curso no encontrado");
      }
    } catch (err) {
      console.error("Error al cargar curso:", err);
      setError("Error al cargar el curso");
    } finally {
      setLoading(false);
    }
  }, [idCurso]);

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }
    fetchCurso();
  }, [user, navigate, fetchCurso]);

  const handlePagarStripe = async () => {
    if (!user || !user.id) {
      navigate("/login");
      return;
    }

    setProcesandoPago(true);

    try {
      const response = await fetch("/api/pagos/crear-sesion-stripe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          idCurso: parseInt(idCurso),
          idUsuario: user.id,
        }),
      });

      const data = await response.json();

      if (data.success) {
        window.location.href = data.url;
      } else {
        setAlert({
          message: data.msg || "Error al procesar el pago",
          type: "error",
          onClose: () => setAlert(null),
        });
      }
    } catch (error) {
      console.error("Error al procesar pago:", error);
      setAlert({
        message: "Error de conexión",
        type: "error",
        onClose: () => setAlert(null),
      });
    } finally {
      setProcesandoPago(false);
    }
  };

  const handlePagarTransferencia = async () => {
    if (!user || !user.id) {
      navigate("/login");
      return;
    }

    setProcesandoPago(true);

    try {
      console.log("Confirmando transferencia...");
      console.log("Usuario ID:", user.id);
      console.log("Curso ID:", idCurso);

      const response = await fetch("/api/pagos/confirmar-transferencia", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          idCurso: parseInt(idCurso),
          idUsuario: user.id,
        }),
      });

      console.log("Response status:", response.status);
      const data = await response.json();
      console.log("Response data:", data);

      if (data.success) {
        console.log("Pago confirmado, redirecting...");
        navigate(
          `/checkout/success?method=transfer&transactionId=${data.transactionId}`
        );
      } else {
        setAlert({
          message: data.msg || "Error al confirmar el pago",
          type: "error",
          onClose: () => setAlert(null),
        });
      }
    } catch (err) {
      console.error("Error al confirmar pago:", err);
      setAlert({
        message: "Error de conexión: " + err.message,
        type: "error",
        onClose: () => setAlert(null),
      });
    } finally {
      setProcesandoPago(false);
    }
  };

  const handlePagar = () => {
    if (metodoPago === "stripe") {
      handlePagarStripe();
    } else {
      handlePagarTransferencia();
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

          <div className="payment-section">
            <h2>Método de pago</h2>

            <div className="payment-method">
              {/* Opción Stripe */}
              <div className="payment-option">
                <input
                  type="radio"
                  id="stripe"
                  name="payment"
                  value="stripe"
                  checked={metodoPago === "stripe"}
                  onChange={(e) => setMetodoPago(e.target.value)}
                />
                <label htmlFor="stripe">
                  <div className="payment-label">
                    💳 Tarjeta de crédito/débito (Stripe)
                  </div>
                </label>
              </div>

              {/* Opción Transferencia */}
              <div className="payment-option">
                <input
                  type="radio"
                  id="transferencia"
                  name="payment"
                  value="transferencia"
                  checked={metodoPago === "transferencia"}
                  onChange={(e) => setMetodoPago(e.target.value)}
                />
                <label htmlFor="transferencia">
                  <div className="payment-label">🏦 Transferencia bancaria</div>
                </label>
              </div>
            </div>

            {/* Mostrar datos de transferencia si está seleccionada */}
            {metodoPago === "transferencia" && (
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

                <div className="payment-instructions">
                  <h4>Instrucciones:</h4>
                  <ol>
                    <li>Realiza la transferencia por el monto exacto</li>
                    <li>Haz clic en "Confirmar Pago"</li>
                    <li>Recibirás acceso al curso en 24-48 horas</li>
                  </ol>
                </div>
              </div>
            )}

            <div className="secure-notice">
              🔒{" "}
              {metodoPago === "stripe"
                ? "Pago seguro y encriptado"
                : "Transferencia segura y verificada"}
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
                <p>Por {curso.Profesor?.nombreUsuario || "Instructor"}</p>
                <p>{curso.TipoCurso?.nombreTipo || "Curso"}</p>
              </div>
              <div className="course-price">
                {curso.descuento === 0 ? (
                  <p className="precio fw-bold text-success mb-2 fs-4">
                    ${curso.precio}
                  </p>
                ) : (
                  <div className="d-flex">
                    <p className="precio-tachado mb-2 ">${curso.precio}</p>
                    <p className="precio fw-bold text-success mb-2 fs-4">
                      $
                      {(
                        curso.precio -
                        (curso.precio * curso.descuento) / 100
                      ).toFixed(0)}
                    </p>
                  </div>
                )}
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

            <div className="price-line">
              <span>Descuento:</span>
              {curso.descuento === 0 ? (
                <p>Sin Descuento</p>
              ) : (
                <span>{curso.descuento}%</span>
              )}
            </div>

            <div className="total-line">
              <span>
                <strong>Total:</strong>
              </span>

              <span>
                <strong>
                  $
                  {(
                    curso.precio -
                    (curso.precio * curso.descuento) / 100
                  ).toFixed(0)}
                </strong>
              </span>
            </div>

            <div className="terms-text">
              Al completar tu compra, aceptas nuestros <b>Términos de Uso</b>
            </div>

            <button
              className="pay-button"
              onClick={handlePagar}
              disabled={procesandoPago}
            >
              {procesandoPago
                ? "Procesando..."
                : metodoPago === "stripe"
                ? `Pagar con Stripe $${curso.precio}`
                : `Confirmar Pago $${curso.precio}`}
            </button>

            <div className="guarantee">
              <h3>Garantía de devolución de 30 días</h3>
              <p>
                ¿No estás satisfecho? Obtén un reembolso completo en 30 días.
              </p>
            </div>
          </div>
        </div>
      </div>
      {alert && (
        <CustomAlert
          message={alert.message}
          type={alert.type}
          onClose={() => {
            setAlert(null);
            if (alert.onClose) alert.onClose();
          }}
        />
      )}
    </div>
  );
};

export default Checkout;
