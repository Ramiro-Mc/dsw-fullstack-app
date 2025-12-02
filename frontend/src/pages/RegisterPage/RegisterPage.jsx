import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "./RegisterPage.css";
import CustomAlert from "../../components/CustomAlert/CustomAlert";

function RegisterPage() {
  const [nombreUsuario, setNombreUsuario] = useState("");
  const [email, setEmail] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorContrasena, setErrorContrasena] = useState("");
  const [alert, setAlert] = useState(null);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (contrasena.length < 8) {
      setAlert({
        message: "La contraseña debe tener al menos 8 caracteres",
        type: "error",
      });
      return;
    }
    setLoading(true);

    try {
      const res = await fetch("http://localhost:3000/usuarios", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nombreUsuario,
          email,
          contrasena,
          tipoUsuario: "usuario",
          fotoDePerfil: "/Default.jpg",
          nombreReferido: null,
          banco: null,
          cvu: null,
          alias: null,
          descripcion: null,
          fraseDescriptiva: null,
          educacion: null,
        }),
      });

      const data = await res.json();

      if (data.success) {
        //aca se hace el login automatico al registrarse
        try {
          const loginRes = await fetch("http://localhost:3000/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, contrasena }),
          });

          const loginData = await loginRes.json();

          if (loginData.success) {
            //guardo la sesion
            login(loginData.usuario, loginData.token);

            setAlert({
              message: "¡Cuenta creada exitosamente! Bienvenido/a",
              type: "success",
              onClose: () => navigate("/"),
            });

            setTimeout(() => navigate("/"), 1500);
          } else {
            // Si falla el login automático, ir al login
            setAlert({
              message: "Usuario creado. Por favor inicia sesión.",
              type: "success",
              onClose: () => navigate("/loginPage"),
            });
          }
        } catch (loginError) {
          setAlert({
            message: "Usuario creado. Por favor inicia sesión.",
            type: "success",
            onClose: () => navigate("/loginPage"),
          });
        }
      } else if (data.errors && Array.isArray(data.errors)) {
        const errorMessages = data.errors.map((error) => error.msg).join(", ");
        setAlert({
          message: "Errores de validación: " + errorMessages,
          type: "error",
        });
      } else {
        setAlert({
          message: data.msg || "Error desconocido al crear usuario",
          type: "error",
        });
      }
    } catch (error) {
      console.error("Error en registro:", error);
      setAlert({
        message: "Error de conexión: " + error.message,
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {alert && (
        <CustomAlert
          message={alert.message}
          type={alert.type}
          onClose={() => {
            if (alert.onClose) {
              alert.onClose();
            }
            setAlert(null);
          }}
        />
      )}
      <main
        style={{
          backgroundImage: "url('/principal1.jpeg')",
          minHeight: "100vh",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        className="fondo-loginRegister d-flex align-items-center justify-content-center"
      >
        <section className="loginRegister-box p-4 rounded shadow bg-white">
          <h1 className="mb-2 text-center">Crea una nueva cuenta</h1>
          <h2 className="mb-4 text-center fs-5">Es rápido y fácil.</h2>
          <form className="formulario-transparente" onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Nombre de usuario</label>
              <input
                type="text"
                className="form-control"
                placeholder="Nombre de usuario"
                value={nombreUsuario}
                onChange={(e) => setNombreUsuario(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Mail</label>
              <input
                type="email"
                className="form-control"
                placeholder="Correo electrónico"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Contraseña</label>
              <input
                type="password"
                className={`form-control ${
                  errorContrasena ? "is-invalid" : ""
                }`}
                placeholder="Contraseña"
                value={contrasena}
                onChange={(e) => {
                  setContrasena(e.target.value);
                  if (e.target.value.length > 0 && e.target.value.length < 8) {
                    setErrorContrasena(
                      "La contraseña debe tener al menos 8 caracteres"
                    );
                  } else {
                    setErrorContrasena("");
                  }
                }}
                required
              />
              {errorContrasena && (
                <div className="invalid-feedback d-block">
                  {errorContrasena}
                </div>
              )}
            </div>
            <div className="d-grid gap-2 mb-2">
              <button
                type="submit"
                className="btn btn-primary"
                disabled={loading}
              >
                {loading ? "Registrando..." : "Únete"}
              </button>
            </div>
            <div className="text-center">
              <Link to="/loginPage" className="text-decoration-none">
                ¿Ya tienes una cuenta?
              </Link>
            </div>
          </form>
        </section>
      </main>
    </>
  );
}

export default RegisterPage;
