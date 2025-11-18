import React from "react";
import { useEffect, useState, useRef } from "react";
import "./informacionPersonal.css";
import { useAuth } from "../../context/AuthContext";
import LoadingError from "../../components/LoadingError/LoadingError";

function InformacionPersonal() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [usuario, setUsuario] = useState({});
  const fileInputRef = useRef(null);

  const { user, loading: authLoading } = useAuth();

  // Perfil de profesor
  
  const [educacion, setEducacion] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [frase, setFrase] = useState("");

  const handleEducacionChange = (e) => {
    setEducacion(e.target.value);
  };
  
  const handleDescripcionChange = (e) => {
    setDescripcion(e.target.value);
  };
  
  const handleFraseChange = (e) => {
    setFrase(e.target.value);
  };

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

    if (!authLoading && user) {
      fetchUsuario();
    }
  }, [user, authLoading]);

  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      console.log("Archivo seleccionado:", file);

      const reader = new FileReader();
      reader.onload = (e) => {
        setUsuario((prev) => ({
          ...prev,
          fotoDePerfil: e.target.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  if (authLoading || loading || error) {
    return <LoadingError loading={authLoading || loading} error={error} retry={() => window.location.reload()} />;
  }

    const handleSubmit = async () => {
    try {
      const userId = user.id;

      const response = await fetch(`http://localhost:3000/usuarios/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          educacion: educacion,
          descripcion: descripcion,
          fraseDescriptiva: frase
        }),
      });

      const data = await response.json();

      if (data.success) {
        /*setIsEditing(false);*/
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
            <img src={usuario.fotoDePerfil || "/image.png"} alt="Foto de perfil" className="img-fluid rounded-circle profile-image-clickable" onClick={handleImageClick} />
          </div>
        </div>
        <div className="col-7">
          <h2>{usuario.nombreUsuario}</h2>
          <p>
            <strong>Email:</strong> {usuario.email}
          </p>
          <p>
            <strong>Inscripto a :</strong> N cursos
          </p>
          <p>
            <strong>Contribuidor de:</strong> N cursos
          </p>
        </div>
        <div className="col-2">
          <button type="button" className="boton-camb-cont btn btn-secondary">
            Cambiar Contraseña
          </button>
        </div>
      </div>
      <hr />
      <div className="perfil-profesor">
        <h3>Perfil de Profesor</h3>

        <label htmlFor="">Descripcion</label>
        <textarea name="" id="" onChange={handleDescripcionChange}></textarea>

        <label htmlFor="">Educacion</label>
        <textarea name="" id="" onChange={handleEducacionChange}></textarea>

        <label htmlFor="">Una frase que te identifique</label>
        <input type="text" onChange={handleFraseChange}/>


        <button type="button" className="boton-camb-cont btn btn-secondary" onClick={handleSubmit}>
          Guardar
        </button>
      </div>

    </div>
  );
}

export default InformacionPersonal;
