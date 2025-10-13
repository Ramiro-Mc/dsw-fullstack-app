import React from 'react';
import { useAuth } from '../../context/AuthContext.jsx';
import { Link } from 'react-router-dom';
import '../../component-styles/Footer.css'; 

function Footer() {
  const { user } = useAuth(); 

 
  const isAdmin = user?.tipoUsuario === 'administrador';

  return (
    <footer className="seccion-footer d-flex flex-column justify-content-center align-items-center pt-3">
      <div className="container d-flex flex-wrap justify-content-center gap-5 px-0">
        
       
        {!isAdmin && (
          <div className="iconos-redes-sociales d-flex flex-column gap-2 texto-footer">
            <h5 className="text-center">Redes Sociales</h5>
            <div className="d-flex gap-3">
              <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
                <i className="bi bi-instagram fs-4"></i>
              </a>
              <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer">
                <i className="bi bi-facebook fs-4"></i>
              </a>
              <a href="https://www.whatsapp.com/" target="_blank" rel="noopener noreferrer">
                <i className="bi bi-whatsapp fs-4"></i>
              </a>
              <a href="https://www.youtube.com/" target="_blank" rel="noopener noreferrer">
                <i className="bi bi-youtube fs-4"></i>
              </a>
            </div>
          </div>
        )}

        
        <nav className="texto-footer">
          <h5>{isAdmin ? 'Administración' : 'Mapa del sitio'}</h5>
          {isAdmin ? (
            //  LINKS PARA ADMINISTRADOR
            <>
              <div className="mb-2">
                <Link to="/admin">Panel de Admin</Link>
              </div>
              <div className="mb-2">
                <Link to="/admin/cursos">Gestionar Cursos</Link>
              </div>
              <div className="mb-2">
                <Link to="/admin/usuarios">Gestionar Usuarios</Link>
              </div>

            </>
          ) : (
           
            <>
              {/* Nada */}
            </>
          )}
        </nav>

  
        <section className="texto-footer">
          <h5>Contacto</h5>
          <p>Email: <a href="mailto:contacto@utndemy.com">contacto@utndemy.com</a></p>
          <p>Teléfono: <a href="tel:+5491123456789">+54 9 11 2345-6789</a></p>
        </section>
      </div>

      <p className="texto-footer text-center">
        © 2025 Utndemy. Todos los derechos reservados.
      </p>
    </footer>
  );
}

export default Footer;