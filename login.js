document.addEventListener("DOMContentLoaded", () => {
  const user = localStorage.getItem("user");
  if (user) {
      document.getElementById("logoutBtn").style.display = "block";
  }
});

function handleCredentialResponse(response) {
  const user = jwt_decode(response.credential);
  console.log("Bienvenido, " + user.name);
  
  // Guardar sesión en localStorage
  localStorage.setItem("user", JSON.stringify(user));

  // Mostrar botón de cerrar sesión
  document.getElementById("logoutBtn").style.display = "block";

  // Enviar datos a la base de datos
  fetch("/api/loguserlogin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: user.name, email: user.email })
  })
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error("Error:", error));
}

function logout() {
  google.accounts.id.disableAutoSelect(); // Evita auto-login en la próxima carga
  localStorage.removeItem("user"); // Borra sesión almacenada
  document.getElementById("logoutBtn").style.display = "none"; // Oculta el botón de logout
  location.reload(); // Recarga la página para restablecer el estado
}
