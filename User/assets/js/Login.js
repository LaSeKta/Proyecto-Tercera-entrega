$(document).ready(function () {
  $("#loginForm").submit(function (e) {
    e.preventDefault(); // Prevenir que el formulario se envíe por defecto

    let data = $(this).serialize(); // Serializa los datos del formulario

    $.ajax({
      url: "assets/php/Login.php", // Ruta al script PHP
      type: "POST", // Método de envío
      data: data, // Datos serializados del formulario
      success: function (response) {
        let data = JSON.parse(response); // Asegúrate de que la respuesta sea JSON

        if (data.status === "success") {
          alert("Inicio de sesión exitoso. Redirigiendo...");
          window.location.href = data.redirect; // Redirigir según el rol del usuario
        } else {
          alert(data.message); // Mostrar mensaje de error
        }
      },
      error: function (xhr, status, error) {
        alert("Ocurrió un error al iniciar sesión. Inténtalo de nuevo.");
      },
    });
  });
});
