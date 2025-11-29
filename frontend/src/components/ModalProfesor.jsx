import React, { useEffect, useRef } from "react";
import "../component-styles/ModalProfesor.css";

function ModalProfesor({ nombre, foto, desc, frase, educ, fecha, mostrar, correo }) {
  const modalRef = useRef(null);
  const modalInstance = useRef(null);

  useEffect(() => {
    const modalEl = modalRef.current;
    modalInstance.current = new window.bootstrap.Modal(modalEl, {
      backdrop: true,
      keyboard: true,
    });
    modalInstance.current.show();

    const handleHidden = () => {
      // Limpiar manualmente los estilos del body
      document.body.classList.remove("modal-open");
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";

      // Remover backdrop manualmente si queda
      const backdrops = document.querySelectorAll(".modal-backdrop");
      backdrops.forEach((backdrop) => backdrop.remove());

      mostrar(false);
    };

    modalEl.addEventListener("hidden.bs.modal", handleHidden);

    // Cleanup
    return () => {
      if (modalInstance.current) {
        modalEl.removeEventListener("hidden.bs.modal", handleHidden);
        modalInstance.current.dispose();

        // Limpiar estilos en caso de que no se haya ejecutado handleHidden
        document.body.classList.remove("modal-open");
        document.body.style.overflow = "";
        document.body.style.paddingRight = "";

        const backdrops = document.querySelectorAll(".modal-backdrop");
        backdrops.forEach((backdrop) => backdrop.remove());
      }
    };
  }, [mostrar]);

  const cerrarModal = () => {
    if (modalInstance.current) {
      modalInstance.current.hide();
    }
  };

  return (
    <>
      <div className="modal fade" tabIndex="-1" aria-hidden="true" ref={modalRef}>
        <div className="modal-dialog modal-dialog-centered contenedor-modal">
          <div className="modal-content">
            <div className="modal-header">
              <div className="d-flex">
                <img src={foto || "/Default.jpg"} alt="Foto de perfil" className="img-fluid rounded-circle foto-preview" />
                <div className="ms-3">
                  <p className="nombre">
                    {nombre} <a href={`mailto:${correo}`}>{correo}</a>
                  </p>
                  <p className="frase">"{frase}"</p>
                </div>
              </div>
              <button type="button" className="btn-close" aria-label="Close" onClick={cerrarModal}></button>
            </div>
            <div className="modal-body">
              <strong>Descripción</strong>
              <div className="informacion-prof">{desc}</div>
              <strong>Educación</strong>
              <div className="informacion-prof">{educ}</div>
            </div>
            <div className=" d-flex justify-content-end">
              <p className="fecha-creacion-cuenta fecha-preview">Se unió el {new Intl.DateTimeFormat("es-AR", { dateStyle: "medium" }).format(new Date(fecha))}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ModalProfesor;
