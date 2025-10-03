import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [contrasena, setContrasena] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, contrasena }),
      });
      const data = await response.json();
      if (data.success) {
        localStorage.setItem("token", data.token); // Guarda el token en localStorage
        navigate("/"); // Redirige si el login es exitoso
      } else {
        alert(data.msg); // Muestra el error
      }
    } catch (error) {
      console.error("Error en login:", error);
      alert("Error de conexión: " + (error.message || "No se pudo conectar con el servidor"));
    }
  };

  return (
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
        <h1 className="mb-4 text-center">Inicio Sesión</h1>
        <form className="formulario-transparente" onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Mail</label>
            <input type="email" className="form-control" placeholder="Correo electrónico" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div className="mb-3">
            <label className="form-label">Contraseña</label>
            <input type="password" className="form-control" placeholder="Contraseña" value={contrasena} onChange={(e) => setContrasena(e.target.value)} required />
          </div>
          <div className="d-grid gap-2 mb-2">
            <button type="submit" className="btn btn-primary">
              Login
            </button>
            <Link to="/registerPage" className="btn btn-primary">
              Register
            </Link>
          </div>
          <div className="text-center">
            <Link to="#" className="text-decoration-none">
              ¿Olvidó su contraseña?
            </Link>
          </div>
        </form>
      </section>
    </main>
  );
}

export default LoginPage;
