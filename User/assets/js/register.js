$(document).ready(function () {
  $("#registerForm").submit(function (e) {
    e.preventDefault(); // Evitar que el formulario se envíe de manera tradicional

    let data = $(this).serialize(); // Serializar los datos del formulario

    $.ajax({
      url: "assets/php/Register.php", // Ruta a la lógica del registro
      type: "POST",
      data: data,
      dataType: "json", // Especificar que esperamos una respuesta JSON
      success: function (response) {
        console.log("Respuesta del servidor:", response); // Mostrar la respuesta completa en la consola

        // Como la respuesta ya es un objeto JSON, no necesitamos usar JSON.parse()
        if (response.status === 'success') {
          alert(response.message); // Mostrar mensaje de éxito
          window.location.href = 'login.html'; // Redirigir al login
        } else {
          alert(response.message); // Mostrar mensaje de error
        }
      },
      error: function (xhr, status, error) {
        console.error("Error en la solicitud:", error);
        alert("Error al registrar el usuario. Por favor, intenta de nuevo.");
      },
    });
  });
});
