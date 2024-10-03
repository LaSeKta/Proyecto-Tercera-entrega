$(document).ready(function () {
  $("#loginForm").submit(function (e) {
    e.preventDefault(); // Evitar que el formulario se envíe de forma tradicional

    let data = $(this).serialize(); // Serializar los datos del formulario

    $.ajax({
      url: "assets/php/Login.php", // Archivo que maneja el login en el servidor
      type: "POST", // Método de envío
      data: data, // Datos enviados al servidor
      dataType: "json", // Especifica que esperas una respuesta JSON
      success: function (response) {
        console.log("Respuesta del servidor:", response); // Verifica la respuesta en la consola
        if (response.status === 'success') {
          alert(response.message); // Muestra el mensaje de éxito (opcional)
          window.location.href = response.redirect; // Redirige a la URL correspondiente
        } else {
          alert(response.message); // Mostrar mensaje de error si el login falló
        }
      },
      error: function (xhr, status, error) {
        console.error("Error en la solicitud:", error);
        alert("Error en la solicitud de inicio de sesión.");
      }
    });
  });
});

