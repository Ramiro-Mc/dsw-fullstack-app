import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import BarraLateral from "./BarraLateral";
import "../../component-styles/MiPerfil/LayoutMiPerfil.css";

function LayoutMiPerfil() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      <div className="layout-miperfil">
        {/* Botón hamburguesa para móvil */}
        <button className="btn-sidebar-toggle d-lg-none" onClick={() => setSidebarOpen(!sidebarOpen)}>
          <i className="bi bi-list"></i>
        </button>

        {/* Overlay para cerrar sidebar en móvil */}
        {sidebarOpen && <div className="sidebar-overlay d-lg-none" onClick={() => setSidebarOpen(false)}></div>}

        <div className="row g-0">
          {/* Sidebar */}
          <div className={`col-lg-3 sidebar-wrapper ${sidebarOpen ? "open" : ""}`}>
            <BarraLateral onClose={() => setSidebarOpen(false)} />
          </div>

          {/* Contenido principal */}
          <div className="col-lg-9 content-wrapper">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
}

export default LayoutMiPerfil;
