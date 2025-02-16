function handleCredentialResponse(response) {
  const data = JSON.parse(atob(response.credential.split('.')[1]));
  console.log("ID Token:", response.credential);
  console.log("User Info:", data);

  alert(`Bienvenido, ${data.name}`);

  // Mostrar botón de logout
  document.getElementById("logout").style.display = "block";

  // Guardar datos en la base de datos
  logUserLogin(data);
}

// Función para enviar los datos al servidor
async function logUserLogin(userData) {
  try {
    const response = await fetch('/api/logUserLogin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: userData.name,
        email: userData.email,
      }),
    });

    if (!response.ok) {
      console.error('Error al registrar en la base de datos');
    } else {
      console.log('Registro guardado correctamente');
    }
  } catch (error) {
    console.error('Error al enviar los datos al servidor:', error);
  }
}

// Manejar el logout
document.getElementById("logout").addEventListener("click", () => {
  alert("Sesión cerrada");
  location.reload();
});

document.addEventListener("DOMContentLoaded", () => {
  console.log("Google Login initialized");
});
