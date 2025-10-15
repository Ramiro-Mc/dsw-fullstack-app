import React, {useState} from "react";
import "./InformacionDePago.css";

function InformacionDePago() {

  const [isEditing, setIsEditing] = useState(false);
  const [alias, setAlias] = useState("");
  const [cvu, setcvu] = useState("");
  const [nombre, setNombre] = useState("");

  const handleToggleEdit = () => {
    setIsEditing(!isEditing);
  }

  const handleSave = () => {
    setIsEditing(false)
  }

  const handleCancel = () => {
    setIsEditing(false)
  }

  const handleAliasChange = (e) => {
    setAlias(e.target)
  }

  const handleCvuChange = (e) => {
    setcvu(e.target)
  }

  const handleNombreChange = (e) => {
    setNombre(e.target)
  }



  return (
    <div className="contenedor-info-de-pago">
      <h3>Tu informacion de cobro</h3>

      <label><strong>ALIAS</strong></label>
      <input type="text" disabled={!isEditing} onChange={handleAliasChange}/>
      <label><strong>CVU</strong></label>
      <input type="text" disabled={!isEditing} onChange={handleCvuChange}/>
      <label><strong>Nombre asociado</strong></label>
      <input type="text" disabled={!isEditing} onChange={handleNombreChange}/>

      {!isEditing ? (
          <button 
            type="button" 
            className="btn btn-primary" 
            onClick={handleToggleEdit}
          >
            <i className="bi bi-pencil me-2"></i>
            Modificar mi información de cobro
          </button>
        ) : (
          <div className="botones-edicion">
            <button 
              type="button" 
              className="btn btn-success" 
              onClick={handleSave}
            >
              <i className="bi bi-check2 me-2"></i>
              Guardar cambios
            </button>
            <button 
              type="button" 
              className="btn btn-secondary" 
              onClick={handleCancel}
            >
              <i className="bi bi-x me-2"></i>
              Cancelar
            </button>
          </div>
        )}
    </div>
  );
}

export default InformacionDePago;