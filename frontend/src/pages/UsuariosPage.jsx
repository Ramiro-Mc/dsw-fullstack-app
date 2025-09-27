import { useEffect, useState } from "react";

function UsuariosPage() {
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(null); // {idUsuario, nombreUsuario, email, contrasena} o null

  // Cargar usuarios al montar
  useEffect(() => {
    fetch("http://localhost:3000/usuarios")
      .then(res => res.json())
      .then(data => {
        if (data.success) setUsuarios(data.contenido);
        setLoading(false);
      });
  }, []);

  // Eliminar usuario
  const eliminarUsuario = async (idUsuario) => {
    if (window.confirm("¿Seguro que quieres eliminar este usuario?")) {
      const res = await fetch(`http://localhost:3000/usuarios/${idUsuario}`, {
        method: "DELETE"
      });
      const data = await res.json();
      if (data.success) {
        alert("Usuario eliminado");
        setUsuarios(usuarios.filter(u => u.idUsuario !== idUsuario));
      } else {
        alert(data.msg);
      }
    }
  };

  // Abrir modal de edición
  const editarUsuario = async (idUsuario) => {
    const res = await fetch(`http://localhost:3000/usuarios/${idUsuario}`);
    const data = await res.json();
    if (data.success) {
      setModal({
        idUsuario: data.informacion.idUsuario,
        nombreUsuario: data.informacion.nombreUsuario,
        email: data.informacion.email,
        contrasena: data.informacion.contrasena
      });
    } else {
      alert("No se pudo cargar el usuario");
    }
  };

  // Guardar cambios del modal
  const handleModalSubmit = async (e) => {
    e.preventDefault();
    const { idUsuario, nombreUsuario, email, contrasena } = modal;
    const res = await fetch(`http://localhost:3000/usuarios/${idUsuario}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nombreUsuario, email, contrasena }),
    });
    const data = await res.json();
    if (data.success) {
      alert("Usuario actualizado");
      setUsuarios(usuarios.map(u =>
        u.idUsuario === idUsuario ? { ...u, nombreUsuario, email, contrasena } : u
      ));
      setModal(null);
    } else {
      alert(data.msg);
    }
  };

  return (
    <div className="container py-4">
      <h1>Lista de Usuarios</h1>
      {loading ? (
        <p>Cargando usuarios...</p>
      ) : usuarios.length === 0 ? (
        <p>No se pudieron cargar los usuarios.</p>
      ) : (
        usuarios.map(usuario => (
          <div className="usuario-item mb-2 p-2 border rounded" key={usuario.idUsuario}>
            <strong>{usuario.nombreUsuario}</strong> ({usuario.email})
            <button
              className="btn btn-sm btn-warning mx-2"
              onClick={() => editarUsuario(usuario.idUsuario)}
            >
              Editar
            </button>
            <button
              className="btn btn-sm btn-danger"
              onClick={() => eliminarUsuario(usuario.idUsuario)}
            >
              Eliminar
            </button>
          </div>
        ))
      )}

      {/* Modal de edición */}
      {modal && (
        <div
          style={{
            position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh",
            background: "rgba(0,0,0,0.5)", display: "flex", justifyContent: "center", alignItems: "center", zIndex: 9999
          }}
        >
          <div style={{ background: "#fff", padding: 20, borderRadius: 8, minWidth: 300 }}>
            <h2>Editar Usuario</h2>
            <form onSubmit={handleModalSubmit}>
              <div className="mb-2">
                <label>Nombre:</label>
                <input
                  type="text"
                  className="form-control"
                  value={modal.nombreUsuario}
                  onChange={e => setModal({ ...modal, nombreUsuario: e.target.value })}
                  required
                />
              </div>
              <div className="mb-2">
                <label>Email:</label>
                <input
                  type="email"
                  className="form-control"
                  value={modal.email}
                  onChange={e => setModal({ ...modal, email: e.target.value })}
                  required
                />
              </div>
              <div className="mb-2">
                <label>Contraseña:</label>
                <input
                  type="password"
                  className="form-control"
                  value={modal.contrasena}
                  onChange={e => setModal({ ...modal, contrasena: e.target.value })}
                  required
                />
              </div>
              <button type="submit" className="btn btn-primary me-2">Guardar</button>
              <button type="button" className="btn btn-secondary" onClick={() => setModal(null)}>Cancelar</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default UsuariosPage;