import React from "react";
import "./CustomAlert.css";

const CustomAlert = ({ message, type = "info", onClose }) => {
  return (
    <div className="custom-alert-overlay" onClick={onClose}>
      <div className="custom-alert-box" onClick={(e) => e.stopPropagation()}>
        <div className={`custom-alert-header ${type}`}>
          {type === "success" && "✓"}
          {type === "error" && "✕"}
          {type === "info" && "ℹ"}
        </div>
        <div className="custom-alert-body">
          <p>{message}</p>
        </div>
        <div className="custom-alert-footer">
          <button className="custom-alert-btn" onClick={onClose}>
            Aceptar
          </button>
        </div>
      </div>
    </div>
  );
};

export default CustomAlert;
