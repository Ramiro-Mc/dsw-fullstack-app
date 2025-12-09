import React, { useState } from "react";
import emailjs from "emailjs-com";
import "./Contacto.css";

function Contacto() {
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    mensaje: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);

    try {
      await emailjs.send(
        "service_r07cr3w", // Reemplaza con tu Service ID
        "template_svy1nkf", // Reemplaza con tu Template ID
        formData,
        "KXPJAh7CDgE9sXSON" // Reemplaza con tu User ID
      );
      setSuccess(true);
      setFormData({ nombre: "", email: "", mensaje: "" });
    } catch (error) {
      setError(
        "Hubo un problema al enviar el mensaje. Intenta nuevamente." + error
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="fondo-contacto">
      <div className="contacto-container">
        <h1>Contáctanos</h1>
        <form className="contacto-form" onSubmit={handleSubmit}>
          <label>
            Nombre:
            <input
              type="text"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Email:
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Mensaje:
            <textarea
              name="mensaje"
              value={formData.mensaje}
              onChange={handleChange}
              required
            ></textarea>
          </label>
          <button type="submit" disabled={loading}>
            {loading ? "Enviando..." : "Enviar"}
          </button>
        </form>
        {success && (
          <p className="success-message">¡Mensaje enviado con éxito!</p>
        )}
        {error && <p className="error-message">{error}</p>}
      </div>
    </section>
  );
}

export default Contacto;
