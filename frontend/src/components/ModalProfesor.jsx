import React, { useEffect, useRef } from "react";
import "../component-styles/ModalProfesor.css";

function ModalProfesor({ nombre, foto, desc, frase, educ, fecha, mostrar, correo }) {
  
  const modalRef = useRef(null);
  const modalInstance = useRef(null);

  useEffect(() => {
    
    const modalEl = modalRef.current;
    
    const modalElement = modalRef.current;
    modalInstance.current = new window.bootstrap.Modal(modalElement);
    modalInstance.current.show();
    
    modalEl.addEventListener("hidden.bs.modal", handleHidden);
  }, []);

  const cerrarModal = () => {
    modalInstance.current.hide(); 
    mostrar(false);
  };

  const handleHidden = () => {
      mostrar(false); // ← ACA se resetea SIEMPRE
    };


  return (
    <>
      <div className="modal fade " id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" ref={modalRef}>
        <div className="modal-dialog modal-dialog-centered contenedor-modal">
          <div className="modal-content">
            <div className="modal-header">
              <div className="d-flex">
                <div className="profile-image-container">
                  <img src={foto || "/Default.jpg"} alt="Foto de perfil" className="img-fluid rounded-circle profile-image-clickable foto-preview" />
                </div>
                <div className="ms-3">
                  <p className="nombre">
                    {nombre} <a href={`mailto:${correo}`}>{correo}</a>
                  </p>
                  <p className="frase">"{frase}"</p>
                </div>
              </div>
            </div>
            <div className="modal-body">
              <strong>Descripción</strong>
              <div className="informacion-prof">{desc}</div>
              <strong>Educación</strong>
              <div className="informacion-prof">{educ}</div>
            </div>
            <div className="d-flex justify-content-end">
              <p className="fecha-creacion-cuenta fecha-preview">Se unió el {new Intl.DateTimeFormat("es-AR", { dateStyle: "medium" }).format(new Date(fecha))}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ModalProfesor;
