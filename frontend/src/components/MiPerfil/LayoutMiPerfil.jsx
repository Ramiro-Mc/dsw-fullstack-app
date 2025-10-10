import React from "react";
import { Outlet } from "react-router-dom";
import BarraLateral from "./BarraLateral";

function LayoutMiPerfil() {
  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col-3">
            <BarraLateral />
          </div>

          <div className="col-9">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
}

export default LayoutMiPerfil;
