import React from "react";
import { useEffect, useState } from "react";

function InformacionPersonal() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [usuario, setUsuario] = useState({});

  useEffect(() => {
    const fetchUsuario = async () => {
      try {
        const response = await fetch("http://localhost:3000/usuarios/1", {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });

        const data = await response.json();

        if (data.success) {
          setUsuario(data.informacion);
        } else {
          setError(data.msg || "Error al cargar usuario");
        }
      } catch (error) {
        console.error("Error al cargar usuario:", error);
        setError("Error de conexión. Intenta de nuevo.");
      } finally {
        setLoading(false);
      }
    };

    fetchUsuario();
  }, []);

  // Mostrar loading
  if (loading) {
    return (
      <div className="container text-center">
        <p>Cargando información del usuario...</p>
      </div>
    );
  }

  // Mostrar error
  if (error) {
    return (
      <div className="container text-center">
        <p className="text-danger">{error}</p>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col-3">
          <img src="/Default.jpg" alt="Foto de perfil" className="img-fluid rounded-circle"/>
        </div>
        <div className="col-9">
          <h2>{usuario.nombreUsuario}</h2>
          <p>
            <strong>Email:</strong> {usuario.email}
          </p>
          <p>
            <strong>Tipo:</strong> {usuario.tipoUsuario}
          </p>
          <p>
            <strong>ID:</strong> {usuario.idUsuario}
          </p>
        </div>
      </div>
      <hr />
    </div>
  );
}

export default InformacionPersonal;
