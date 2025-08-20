document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector(".formulario-transparente");
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const nombreUsuario = form.querySelector('input[type="text"]').value;
    const email = form.querySelector('input[type="email"]').value;
    const contrasena = form.querySelector('input[type="password"]').value;
    const tipoUsuario = form.querySelector('input[name="tipoUsuario"]:checked').value;

    const res = await fetch("http://localhost:3000/usuarios", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nombreUsuario, email, contrasena, tipoUsuario }),
    });

    
    const data = await res.json();
    if (data.success) {
      alert("Usuario creado");
     window.location.href = "login.html";
    } else {  
      alert(data.msg);
    } 
  });
});