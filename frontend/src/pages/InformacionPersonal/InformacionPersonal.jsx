import React from "react";
import { useEffect, useState, useRef } from "react";
import "./informacionPersonal.css";
import { useAuth } from "../../context/AuthContext"

function InformacionPersonal() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [usuario, setUsuario] = useState({});
  const fileInputRef = useRef(null);

  const {user, loading: authLoading} = useAuth();

  useEffect(() => {
    const fetchUsuario = async () => {
      try {
        const userId = user.id;

        const response = await fetch(`http://localhost:3000/usuarios/${userId}`, {
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

    if(!authLoading && user){
    fetchUsuario();
    }
  }, [user, authLoading]);

  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  // Función para manejar cambio de archivo
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Aquí puedes procesar el archivo
      console.log('Archivo seleccionado:', file);
      
      // Preview de la imagen
      const reader = new FileReader();
      reader.onload = (e) => {
        // Actualizar la imagen del usuario
        setUsuario(prev => ({
          ...prev,
          fotoDePerfil: e.target.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  // Mostrar loading
  if (authLoading || loading) {
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
    <div className="container informacion-personal">
      <div className="row">
        <div className="col-3">
          <input 
            type="file" 
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="image/*"
            style={{ display: 'none' }} 
          />
          <div className="profile-image-container">
            <img src={usuario.fotoDePerfil || "/image.png"} alt="Foto de perfil" className="img-fluid rounded-circle profile-image-clickable" onClick={handleImageClick}/>
          </div>

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
