$(document).ready(function () {
  const messageContainer = $("#message-container");

  // Maneja el envío del formulario de inicio de sesión
  $("#loginForm").submit(function (e) {
    e.preventDefault();

    // Serializa los datos del formulario en formato URLSearchParams
    let formData = new URLSearchParams($(this).serialize());
    formData.append('accion', 'login'); // Añade la acción de login

    // Utiliza fetch para enviar los datos al servidor
    fetch("assets/php/login.php", {
      method: "POST",
      body: formData,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    })
    .then(function (response) {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(function (data) {
      // Muestra mensajes en el contenedor del DOM
      messageContainer.text(data.message).css("color", data.status === 'success' ? "green" : "red");
      if (data.status === 'success') {
        // Redirigir a la URL proporcionada según el rol
        setTimeout(() => {
          window.location.href = data.redirect; // Redirige a la URL específica del rol
        }, 1000);
      }
    })
    .catch(function (error) {
      console.error("Ocurrió un error: ", error);
      messageContainer.text("Ocurrió un error inesperado. Revise la consola para más detalles.").css("color", "red");
    });
  });
});
