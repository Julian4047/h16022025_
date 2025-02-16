async function fetchUserName(email) {
  try {
    const response = await fetch(`/api/getUser?email=${encodeURIComponent(email)}`);
    if (!response.ok) throw new Error('Usuario no encontrado');
    
    const data = await response.json();
    return data.name;
  } catch (error) {
    console.error("Error al obtener el usuario:", error);
    return null;
  }
}

async function handleCredentialResponse(response) {
  const data = JSON.parse(atob(response.credential.split('.')[1]));
  console.log("User Info:", data);

  const userName = await fetchUserName(data.email);
  const greeting = userName ? `Hola, ${userName}` : `Bienvenido, ${data.name}`;

  document.getElementById("welcomeMessage").innerText = greeting;

  document.getElementById("logout").style.display = "block";
  document.getElementById("logout").addEventListener("click", () => {
    document.getElementById("welcomeMessage").innerText = "";
    document.getElementById("logout").style.display = "none";
  });
}

document.addEventListener("DOMContentLoaded", () => {
  document.body.innerHTML += '<h2 id="welcomeMessage"></h2><button id="logout" style="display:none;">Cerrar sesión</button>';
  console.log("Google Login initialized");
});
