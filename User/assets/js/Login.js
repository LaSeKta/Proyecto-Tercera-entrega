$(document).ready(function () {
  console.log("Documento listo - script de inicio de sesión cargado"); 

  $("#loginForm").submit(function (e) {
    e.preventDefault();
    console.log("Formulario de inicio de sesión enviado"); 

    let data = $(this).serialize(); 
    console.log("Datos serializados para envío:", data); 

    $.ajax({
      url: "assets/php/Login.php", 
      type: "POST", 
      data: data,
      dataType: "json", 
      beforeSend: function() {
        console.log("Enviando solicitud AJAX a Login.php..."); 
      },
      success: function (response) {
        console.log("Respuesta del servidor recibida:", response); 
        if (response.status === 'success') {
          console.log("Inicio de sesión exitoso, redirigiendo a:", response.redirect);
          alert(response.message); 
          window.location.href = response.redirect; 
        } else {
          console.warn("Error en inicio de sesión:", response.message); 
          alert(response.message); 
        }
      },
      error: function (xhr, status, error) {
        console.error("Error en la solicitud AJAX:", error); 
        console.log("Estado de la respuesta:", status); 
        console.log("Respuesta completa del servidor:", xhr.responseText); 
        alert("Error en la solicitud de inicio de sesión."); 
      },
      complete: function() {
        console.log("Solicitud AJAX completada"); 
      }
    });
  });
});
