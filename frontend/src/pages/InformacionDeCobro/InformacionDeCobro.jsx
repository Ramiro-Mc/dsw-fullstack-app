import React, { useState, useEffect } from "react";
import "./InformacionDeCobro.css";
import { useAuth } from "../../context/AuthContext";

function InformacionDePago() {
  const [isEditing, setIsEditing] = useState(false);
  const [nombreBanco, setNombreBanco] = useState("");
  const [alias, setAlias] = useState("");
  const [cvu, setcvu] = useState("");
  const [nombre, setNombre] = useState("");
  const [usuario, setUsuario] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const { user, loading: authLoading } = useAuth();

  const handleToggleEdit = () => {
    setIsEditing(!isEditing);
  };

  useEffect(() => {
    const fetchUsuario = async (userId) => {
      try {
        const response = await fetch(`http://localhost:3000/usuarios/${userId}`, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });

        const data = await response.json();

        if (data.success) {
          setUsuario(data.informacion);
          setNombreBanco(data.informacion.banco || "");
          setAlias(data.informacion.alias || "");
          setcvu(data.informacion.cvu || "");
          setNombre(data.informacion.nombreReferido || "");
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

    if (user && user.id) {
      fetchUsuario(user.id);
    } else {
      setLoading(false);
    }
  }, [user, authLoading]);

  const handleSave = async () => {
    try {
      const userId = user.id;

      const response = await fetch(`http://localhost:3000/usuarios/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          banco: nombreBanco,
          alias: alias,
          cvu: cvu,
          nombreReferido: nombre,
        }),
      });

      const data = await response.json();

      if (data.success) {
        setIsEditing(false);
        setUsuario(data.informacion);
        alert("Información actualizada correctamente");
      } else {
        alert("Error al actualizar la información: " + data.msg);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error al conectar con el servidor");
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    if (usuario) {
      setAlias(usuario.alias || "");
      setcvu(usuario.cvu || "");
      setNombre(usuario.nombreReferido || "");
    }
  };

  const handleAliasChange = (e) => {
    setAlias(e.target.value);
  };

  const handleCvuChange = (e) => {
    setcvu(e.target.value);
  };

  const handleNombreChange = (e) => {
    setNombre(e.target.value);
  };
  
  const handleNombreBancoChange = (e) => {
    setNombreBanco(e.target.value);
  };

  if (loading) return <div>Cargando...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="contenedor-info-de-pago">
      <h3>Tu informacion de cobro</h3>

      <label>
        <strong>Nombre del Banco</strong>
      </label>
      <input type="text" value={nombreBanco} disabled={!isEditing} onChange={handleNombreBancoChange} />
      <label>
        <strong>ALIAS</strong>
      </label>
      <input type="text" value={alias} disabled={!isEditing} onChange={handleAliasChange} />
      <label>
        <strong>CVU</strong>
      </label>
      <input type="text" value={cvu} disabled={!isEditing} onChange={handleCvuChange} />
      <label>
        <strong>Nombre asociado</strong>
      </label>
      <input type="text" value={nombre} disabled={!isEditing} onChange={handleNombreChange} />

      {!isEditing ? (
        <button type="button" className="btn btn-primary" onClick={handleToggleEdit}>
          <i className="bi bi-pencil me-2"></i>
          Modificar mi información de cobro
        </button>
      ) : (
        <div className="botones-edicion">
          <button type="button" className="btn btn-success" onClick={handleSave}>
            <i className="bi bi-check2 me-2"></i>
            Guardar cambios
          </button>
          <button type="button" className="btn btn-secondary" onClick={handleCancel}>
            <i className="bi bi-x me-2"></i>
            Cancelar
          </button>
        </div>
      )}
    </div>
  );
}

export default InformacionDePago;
