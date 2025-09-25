document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector(".formulario-transparente");
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = form.querySelector('input[type="email"]').value;
    const contrasena = form.querySelector('input[type="password"]').value;

    const res = await fetch("http://localhost:3000/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, contrasena }),
    });
    const data = await res.json();
    if (data.success) {
        if (data.usuario.tipoUsuario === "administrador") {
            window.location.href = "lista.html";
        } else{
      window.location.href = "index.html";}
    } else {
      alert(data.msg);
    }
  });
});