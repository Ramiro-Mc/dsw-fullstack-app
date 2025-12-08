import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "./LoginPage.css";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [contrasena, setContrasena] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [captchaToken, setCaptchaToken] = useState("");
  const recaptchaRef = useRef(null);

  // cargo el script del recaptcha
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://www.google.com/recaptcha/api.js";
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);

    // con  esta función global capturo el token del captcha
    window.onCaptchaSuccess = (token) => {
      setCaptchaToken(token);
    };

    return () => {
      document.body.removeChild(script);
      delete window.onCaptchaSuccess;
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // validar captcha
    if (!captchaToken) {
      setError("Por favor, completa el captcha");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, contrasena, captchaToken }),
      });

      const data = await response.json();

      if (data.success) {
        login(data.usuario, data.token);

        if (data.usuario.tipoUsuario === "administrador") {
          navigate("/admin");
        } else {
          navigate("/");
        }
      } else {
        setError(data.msg || "Credenciales inválidas");
        // se resetea el captcha en caso de error
        setCaptchaToken("");
        if (window.grecaptcha) {
          window.grecaptcha.reset();
        }
      }
    } catch (error) {
      console.error("Error en login:", error);
      setError("Error de conexión. Intenta de nuevo.");
      // se resetea el captcha en caso de error
      setCaptchaToken("");
      if (window.grecaptcha) {
        window.grecaptcha.reset();
      }
    } finally {
      setLoading(false);
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

        {error && (
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        )}

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

          {/* reCAPTCHA */}
          <div className="mb-3 d-flex justify-content-center">
            <div
              className="g-recaptcha"
              data-sitekey="6LehcyQsAAAAALul4hrS12M_yRvPBLYVt_H3I9TH"
              data-callback="onCaptchaSuccess"
              ref={recaptchaRef}
            ></div>
          </div>

          <div className="d-grid gap-2 mb-2">
            <button
              type="submit"
              className="btn btn-primary"
              disabled={loading || !captchaToken}
            >
              {loading ? "Iniciando..." : "Iniciar Sesión"}
            </button>
            <Link to="/registerPage" className="btn btn-primary">
              Registrate
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
