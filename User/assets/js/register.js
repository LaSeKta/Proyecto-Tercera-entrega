$(document).ready(function () {
  $("#registerForm").submit(function (e) {
    e.preventDefault(); // Evitar que el formulario se envíe de manera tradicional

    let data = $(this).serialize(); // Serializar los datos del formulario

    $.ajax({
      url:"assets/php/Register.php", // Ruta a la lógica del registro
      type: "POST",
      data: data,
      success: function (response) {
        console.log("Respuesta del servidor:", response); // Mostrar la respuesta completa en la consola
        try {
          let res = JSON.parse(response); // Intentar convertir la respuesta a JSON
          if (res.status === 'success') {
            alert(res.message); // Mostrar mensaje de éxito
            window.location.href = 'login.html'; // Redirigir al login
          } else {
            alert(res.message); // Mostrar mensaje de error
          }
        } catch (error) {
          console.error("Error al procesar la respuesta:", error);
          alert("Error al procesar la respuesta del servidor.");
        }
      },
      error: function (xhr, status, error) {
        console.error("Error en la solicitud:", error);
        alert("Error al registrar el usuario.");
      },
    });
  });
});
