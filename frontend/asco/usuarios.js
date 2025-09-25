document.addEventListener("DOMContentLoaded", async () => {
  const usuariosList = document.getElementById("usuarios-list");

  // Obtener usuarios del backend
  const res = await fetch("http://localhost:3000/usuarios");
  const data = await res.json();

  if (data.success) {
    data.contenido.forEach(usuario => {
      const div = document.createElement("div");
      div.className = "usuario-item";
      div.innerHTML = `
        <strong>${usuario.nombreUsuario}</strong> (${usuario.email})
        <button onclick="editarUsuario(${usuario.idUsuario})">Editar</button>
        <button onclick="eliminarUsuario(${usuario.idUsuario})">Eliminar</button>
      `;
      usuariosList.appendChild(div);
    });
  } else {
    usuariosList.innerText = "No se pudieron cargar los usuarios.";
  }
});

// Modal de edición
function crearModalEdicion() {
  let modal = document.getElementById("modal-edicion");
  if (!modal) {
    modal = document.createElement("div");
    modal.id = "modal-edicion";
    modal.style.position = "fixed";
    modal.style.top = "0";
    modal.style.left = "0";
    modal.style.width = "100vw";
    modal.style.height = "100vh";
    modal.style.background = "rgba(0,0,0,0.5)";
    modal.style.display = "flex";
    modal.style.justifyContent = "center";
    modal.style.alignItems = "center";
    modal.innerHTML = `
      <div style="background:#fff;padding:20px;border-radius:8px;min-width:300px;">
        <h2>Editar Usuario</h2>
        <form id="form-editar-usuario">
          <input type="hidden" name="idUsuario" />
          <div>
            <label>Nombre:</label>
            <input type="text" name="nombreUsuario" />
          </div>
          <div>
            <label>Email:</label>
            <input type="email" name="email"  />
          </div>
          <div>
            <label>Contraseña:</label>
            <input type="password" name="contrasena"  />
          </div>
          <button type="submit">Guardar</button>
          <button type="button" id="cerrar-modal">Cancelar</button>
        </form>
      </div>
    `;
    document.body.appendChild(modal);

    // Cerrar modal
    modal.querySelector("#cerrar-modal").onclick = () => {
      modal.style.display = "none";
    };

    // Enviar cambios
    modal.querySelector("#form-editar-usuario").onsubmit = async function(e) {
      e.preventDefault();
      const idUsuario = this.idUsuario.value;
      const nombreUsuario = this.nombreUsuario.value;
      const email = this.email.value;
      const contrasena = this.contrasena.value;

      const res = await fetch(`http://localhost:3000/usuarios/${idUsuario}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nombreUsuario, email, contrasena }),
      });
      const data = await res.json();
      if (data.success) {
        alert("Usuario actualizado");
        location.reload();
      } else {
        alert(data.msg);
      }
    };
  }
  modal.style.display = "flex";
  return modal;
}

// Función para editar usuario
window.editarUsuario = async function(idUsuario) {
  // Obtener datos del usuario
  const res = await fetch(`http://localhost:3000/usuarios/${idUsuario}`);
  const data = await res.json();
  if (data.success) {
    const usuario = data.informacion;
    const modal = crearModalEdicion();
    const form = modal.querySelector("#form-editar-usuario");
    form.idUsuario.value = usuario.idUsuario;
    form.nombreUsuario.value = usuario.nombreUsuario;
    form.email.value = usuario.email;
    form.contrasena.value = usuario.contrasena;
  } else {
    alert("No se pudo cargar el usuario");
  }
}

// Función para eliminar usuario
window.eliminarUsuario = async function(idUsuario) {
  if (confirm("¿Seguro que quieres eliminar este usuario?")) {
    const res = await fetch(`http://localhost:3000/usuarios/${idUsuario}`, {
      method: "DELETE"
    });
    const data = await res.json();
    if (data.success) {
      alert("Usuario eliminado");
      location.reload(); // Recarga la lista
    } else {
      alert(data.msg);
    }
  }
}