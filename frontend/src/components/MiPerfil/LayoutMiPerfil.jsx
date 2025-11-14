import React from "react";
import { Outlet } from "react-router-dom";
import BarraLateral from "./BarraLateral";

function LayoutMiPerfil() {
  return (
    <>
      <div className="container-fluid" style={{ boxShadow: "2px 0 4px rgb(0 0 0 / 15%)" }}>
        <div className="row">
          <div className="col-3">
            <BarraLateral />
          </div>

          <div className="col-9" style={{ backgroundColor: "#F7F8FA" }}>
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
}

export default LayoutMiPerfil;
