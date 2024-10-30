$(document).ready(function () {
  console.log("Documento listo - script de inicio de sesión cargado"); // Confirmación de que el script está listo

  $("#loginForm").submit(function (e) {
    e.preventDefault(); // Evitar que el formulario se envíe de forma tradicional
    console.log("Formulario de inicio de sesión enviado"); // Confirmación de que el formulario fue enviado

    let data = $(this).serialize(); // Serializar los datos del formulario
    console.log("Datos serializados para envío:", data); // Verificar los datos antes de enviarlos

    $.ajax({
      url: "assets/php/Login.php", // Archivo que maneja el login en el servidor
      type: "POST", // Método de envío
      data: data, // Datos enviados al servidor
      dataType: "json", // Especifica que esperas una respuesta JSON
      beforeSend: function() {
        console.log("Enviando solicitud AJAX a Login.php..."); // Confirmación de que se está por enviar la solicitud AJAX
      },
      success: function (response) {
        console.log("Respuesta del servidor recibida:", response); // Verifica la respuesta en la consola
        if (response.status === 'success') {
          console.log("Inicio de sesión exitoso, redirigiendo a:", response.redirect); // Mensaje de éxito y URL de redirección
          alert(response.message); // Muestra el mensaje de éxito
          window.location.href = response.redirect; // Redirige a la URL correspondiente
        } else {
          console.warn("Error en inicio de sesión:", response.message); // Mensaje de error en la respuesta del servidor
          alert(response.message); // Mostrar mensaje de error si el login falló
        }
      },
      error: function (xhr, status, error) {
        console.error("Error en la solicitud AJAX:", error); // Error en la solicitud
        console.log("Estado de la respuesta:", status); // Verifica el estado de la respuesta
        console.log("Respuesta completa del servidor:", xhr.responseText); // Muestra el contenido de la respuesta completa
        alert("Error en la solicitud de inicio de sesión."); // Notificación al usuario
      },
      complete: function() {
        console.log("Solicitud AJAX completada"); // Confirmación de que la solicitud AJAX se ha completado
      }
    });
  });
});
