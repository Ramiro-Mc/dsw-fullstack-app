import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../LoginPage/LoginPage.css";
import "./RegisterPage.css";

function RegisterPage() {
  const [nombreUsuario, setNombreUsuario] = useState("");
  const [email, setEmail] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [tipoUsuario, setTipoUsuario] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const res = await fetch("http://localhost:3000/usuarios", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nombreUsuario, email, contrasena, tipoUsuario }),
    });
    const data = await res.json();
    if (data.success) {
      alert("Usuario creado");
      navigate("/loginPage");
    } else {
      alert(data.msg);
    }
    setLoading(false);
  };

  return (
    <main
      style={{
        backgroundImage: "url('/imagenes/principal1.jpeg')",
        minHeight: "100vh",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      className="fondo-loginRegister d-flex align-items-center justify-content-center"
    >
      <section className="loginRegister-box p-4 rounded shadow bg-white bg-opacity-75">
        <h1 className="mb-2 text-center">Crea una nueva cuenta</h1>
        <h2 className="mb-4 text-center fs-5">Es rápido y fácil.</h2>
        <form className="formulario-transparente" onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Nombre de usuario</label>
            <input type="text" className="form-control" placeholder="Nombre de usuario" value={nombreUsuario} onChange={(e) => setNombreUsuario(e.target.value)} required />
          </div>
          <div className="mb-3">
            <label className="form-label">Mail</label>
            <input type="email" className="form-control" placeholder="Correo electrónico" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div className="mb-3">
            <label className="form-label">Contraseña</label>
            <input type="password" className="form-control" placeholder="Contraseña" value={contrasena} onChange={(e) => setContrasena(e.target.value)} required />
          </div>
          <p style={{ textAlign: "center" }} className="mb-2">
            Tipo de usuario
          </p>
          <div className="d-flex justify-content-center gap-3 mb-3">
            <input type="radio" className="btn-check" name="tipoUsuario" id="alumno" value="alumno" checked={tipoUsuario === "alumno"} onChange={() => setTipoUsuario("alumno")} required />
            <label className="btn-radio" htmlFor="alumno">
              Alumno
            </label>
            <input type="radio" className="btn-check" name="tipoUsuario" id="profesor" value="profesor" checked={tipoUsuario === "profesor"} onChange={() => setTipoUsuario("profesor")} />
            <label className="btn-radio" htmlFor="profesor">
              Profesor
            </label>
          </div>
          <div className="d-grid gap-2 mb-2">
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? "Registrando..." : "Únete"}
            </button>
          </div>
          <div className="text-center">
            <a href="/loginPage" className="text-decoration-none">
              ¿Ya tienes una cuenta?
            </a>
          </div>
        </form>
      </section>
    </main>
  );
}

export default RegisterPage;
