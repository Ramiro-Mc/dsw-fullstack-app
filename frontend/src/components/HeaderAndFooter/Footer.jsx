 import '../../component-styles/Footer.css'; 
 
 function Footer() {
   return (
     <footer className="seccion-footer d-flex flex-column justify-content-center align-items-center pt-3">
       <div className="container d-flex flex-wrap justify-content-center gap-5 px-0">
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

      <nav className="texto-footer ">
        <h5>Mapa del sitio</h5>
        <div className="mb-2"><a href="Index.html">Cerrar Sesion</a></div>
        <div className="mb-2"><a href="#"></a></div>
        <div className="mb-2"><a href="#"></a></div>
        <div className="mb-2"><a href=""></a></div>
      </nav>

      <section className="texto-footer">
        <h5>Contacto</h5>
        <p>Email: <a href="#">contacto@.com</a></p>
        <p>Teléfono: <a href="#">+54 9 11 2345-6789</a></p>
      </section>
    </div>

    <p class="texto-footer text-center">
      © 2025 . Todos los derechos reservados.
    </p>
  	</footer>
	 );
 }

export default Footer;