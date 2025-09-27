import { useState } from "react";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [contrasena, setContrasena] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Aquí va tu lógica de login...
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
        <h1 className="mb-4 text-center">Inicio Sesión</h1>
        <form className="formulario-transparente" onSubmit={handleSubmit}>
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
              className="form-control"
              placeholder="Contraseña"
              value={contrasena}
              onChange={(e) => setContrasena(e.target.value)}
              required
            />
          </div>
          <div className="d-grid gap-2 mb-2">
            <button type="submit" className="btn btn-primary">
              Login
            </button>
            <a href="/register.html" className="btn btn-secondary">
              Register
            </a>
          </div>
          <div className="text-center">
            <a href="#" className="text-decoration-none">
              ¿Olvidó su contraseña?
            </a>
          </div>
        </form>
      </section>
    </main>
  );
}

export default LoginPage;