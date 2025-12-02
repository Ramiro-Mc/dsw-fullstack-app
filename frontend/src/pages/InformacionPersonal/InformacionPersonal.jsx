import React from "react";
import { useEffect, useState, useRef } from "react";
import "./informacionPersonal.css";
import { useAuth } from "../../context/AuthContext";
import CustomAlert from "../../components/CustomAlert/CustomAlert";
import LoadingError from "../../components/LoadingError/LoadingError";
import ModalProfesor from "../../components/ModalProfesor";

function InformacionPersonal() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [usuario, setUsuario] = useState({});
  const fileInputRef = useRef(null);
  const [cursosInscipto, setCursosInscipto] = useState(0);
  const [cursosContribuidor, setCursosContribuidor] = useState(0);

  const { user, loading: authLoading } = useAuth();

  // Perfil de profesor

  const [educacion, setEducacion] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [frase, setFrase] = useState("");
  const [editando, setEditando] = useState(false);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [alert, setAlert] = useState(null);

  const editar = () => {
    setEditando(!editando);
  };

  const handleEducacionChange = (e) => {
    setEducacion(e.target.value);
  };

  const handleDescripcionChange = (e) => {
    setDescripcion(e.target.value);
  };

  const handleFraseChange = (e) => {
    setFrase(e.target.value);
  };

  const modal = () => {
    setMostrarModal(true); // Mostrar el modal
  };

  useEffect(() => {
    const fetchUsuario = async () => {
      try {
        const userId = user.id;

        const response = await fetch(
          `http://localhost:3000/usuarios/${userId}`,
          {
            method: "GET",
            headers: { "Content-Type": "application/json" },
          }
        );

        const data = await response.json();

        if (data.success) {
          setUsuario(data.informacion);
        } else {
          setError(
            data.msg ||
              "Error al cargar los cursos a los que esta inscripto el usuario"
          );
        }
      } catch (error) {
        console.error(
          "Error al cargar cursos a los que esta inscripto el usuario:",
          error
        );
        setError("Error de conexión. Intenta de nuevo.");
      } finally {
        setLoading(false);
      }
    };

    const fetchCantCursosInsc = async () => {
      try {
        const userId = user.id;

        const response = await fetch(
          `http://localhost:3000/alumnos_cursos/usuario/${userId}`,
          {
            method: "GET",
            headers: { "Content-Type": "application/json" },
          }
        );

        const data = await response.json();

        if (data.success) {
          setCursosInscipto(data.contenido.length);
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
    const fetchCursosUsuario = async (userId) => {
      try {
        const response = await fetch(
          `http://localhost:3000/api/cursos?idProfesor=${userId}`,
          {
            method: "GET",
            headers: { "Content-Type": "application/json" },
          }
        );

        const data = await response.json();

        if (data.success) {
          setCursosContribuidor(data.contenido.length);
        } else if (data.msg === "No hay cursos") {
          // Si no hay cursos, no es un error, solo dejamos el array vacío
          setCursosContribuidor(0);
        } else {
          setError(data.msg || "Error al cargar cursos");
        }
      } catch (error) {
        console.error("Error al cargar curso:", error);
        setError("Error de conexión. Intenta de nuevo.");
      } finally {
        setLoading(false);
      }
    };

    if (!authLoading && user) {
      fetchUsuario();
      fetchCantCursosInsc();
      fetchCursosUsuario(user.id);
    }
  }, [user, authLoading]);

  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("fotoDePerfil", file);

      try {
        const userId = user.id; // ID del usuario actual

        const response = await fetch(
          `http://localhost:3000/usuarios/${userId}/foto`,
          {
            method: "PUT",
            body: formData,
          }
        );

        const data = await response.json();

        if (data.success) {
          // Actualizar la foto de perfil en el estado
          setUsuario((prev) => ({
            ...prev,
            fotoDePerfil: data.fotoDePerfil, // URL pública de Cloudinary
          }));

          setAlert({
            message: "Foto de perfil actualizada correctamente.",
            type: "success",
            onClose: () => setAlert(null),
          });
        } else {
          setAlert({
            message: "Error al actualizar la foto de perfil: " + data.msg,
            type: "error",
            onClose: () => setAlert(null),
          });
        }
      } catch (error) {
        console.error("Error al actualizar la foto de perfil:", error);
        setAlert({
          message: "Error de conexión. Intenta nuevamente.",
          type: "error",
          onClose: () => setAlert(null),
        });
      }
    }
  };

  if (authLoading || loading || error) {
    return (
      <LoadingError
        loading={authLoading || loading}
        error={error}
        retry={() => window.location.reload()}
      />
    );
  }

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevenir la recarga de la página

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
          fraseDescriptiva: frase,
        }),
      });

      const data = await response.json();

      if (data.success) {
        setUsuario(data.atributo);
        setAlert({
          message: "Información actualizada correctamente",
          type: "success",
          onClose: () => setAlert(null),
        });
        editar();
      } else {
        setAlert({
          message: "Error al actualizar la información: " + data.msg,
          type: "error",
          onClose: () => setAlert(null),
        });
      }
    } catch (error) {
      console.error("Error:", error);
      setAlert({
        message: "Error al conectar con el servidor",
        type: "error",
        onClose: () => setAlert(null),
      });
    }
  };

  return (
    <div className="container informacion-personal">
      {mostrarModal && (
        <ModalProfesor
          nombre={usuario.nombreUsuario}
          foto={usuario.fotoDePerfil}
          desc={usuario.descripcion}
          frase={usuario.fraseDescriptiva}
          educ={usuario.educacion}
          fecha={usuario.createdAt}
          mostrar={setMostrarModal}
          correo={usuario.email}
        />
      )}
      <div className="row">
        <div className="col-3">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="image/*"
            style={{ display: "none" }}
          />
          <div className="profile-image-container">
            <img
              src={usuario?.fotoDePerfil || "/Default.jpg"}
              alt="Foto de perfil"
              className="img-fluid rounded-circle profile-image-clickable"
              onClick={handleImageClick}
            />
          </div>
        </div>
        <div className="col-7">
          <h2>{usuario?.nombreUsuario}</h2>
          <p>
            <strong>Email:</strong> {usuario?.email}
          </p>
          <p>
            <strong>Inscripto a:</strong> {cursosInscipto} curso
            {cursosInscipto !== 1 ? "s" : ""}
          </p>
          <p>
            <strong>Contribuidor de:</strong> {cursosContribuidor} curso
            {cursosContribuidor !== 1 ? "s" : ""}
          </p>
          <p className="fecha-creacion-cuenta">
            Se unió el{" "}
            {usuario?.createdAt
              ? new Intl.DateTimeFormat("es-AR", {
                  dateStyle: "medium",
                }).format(new Date(usuario?.createdAt))
              : "Fecha no disponible"}
          </p>
        </div>
        <div className="col-2">
          <button type="button" className="boton-camb-cont btn btn-secondary">
            Cambiar Contraseña
          </button>
        </div>
      </div>
      <hr />
      <h3 className="perfil-profesor-titulo">Perfil de Profesor</h3>
      {!editando ? (
        usuario.descripcion ? (
          <>
            <button type="button" className="boton-editar" onClick={editar}>
              <i class="bi bi-pencil-square"></i>
            </button>

            <div className="pre-view container" onClick={modal}>
              <div className="row">
                <div className="col-12">
                  <strong>Frase</strong>
                  <div className="informacion-prof">
                    {usuario.fraseDescriptiva}
                  </div>
                  <strong>Descripcion</strong>
                  <div className="informacion-prof">{usuario.descripcion}</div>
                  <strong>Educacion</strong>
                  <div className="informacion-prof">{usuario.educacion}</div>
                </div>
                <div className=" d-flex justify-content-end align-items-end">
                  <p className="clic">Vista previa</p>
                </div>
              </div>
            </div>
          </>
        ) : (
          <button
            type="button"
            className="boton-camb-cont btn btn-secondary"
            onClick={editar}
          >
            Agregar informacion de profesor
          </button>
        )
      ) : (
        <div className="perfil-profesor">
          <div className="form-group">
            <label htmlFor="frase" className="form-label">
              Una frase que te identifique
            </label>
            <input
              type="text"
              id="frase"
              className="form-control"
              placeholder="Escribe una frase que te represente..."
              onChange={handleFraseChange}
              value={frase}
            />
          </div>

          <div className="form-group">
            <label htmlFor="descripcion" className="form-label">
              Descripción
            </label>
            <textarea
              id="descripcion"
              className="form-control"
              placeholder="Escribe una breve descripción sobre ti..."
              onChange={handleDescripcionChange}
              value={descripcion}
            ></textarea>
          </div>

          <div className="form-group">
            <label htmlFor="educacion" className="form-label">
              Educación
            </label>
            <textarea
              id="educacion"
              className="form-control"
              placeholder="Escribe tu formación académica..."
              onChange={handleEducacionChange}
              value={educacion}
            ></textarea>
          </div>

          <button
            type="button"
            className="btn btn-primary boton-guardar"
            onClick={handleSubmit}
          >
            Guardar
          </button>
        </div>
      )}
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
}

export default InformacionPersonal;
