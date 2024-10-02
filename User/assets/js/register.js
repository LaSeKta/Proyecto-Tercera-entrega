$(document).ready(function () {
    // Maneja el envío del formulario de registro
    $("#registerForm").submit(function (e) {
      e.preventDefault();
  
      // Serializa los datos del formulario en formato URLSearchParams
      let formData = new URLSearchParams($(this).serialize());
      formData.append('accion', 'registrar'); // Asegúrate de que 'accion' esté en minúsculas
  
      // Utiliza fetch para enviar los datos al servidor
      fetch("assets/php/register.php", {
        method: "POST",
        body: formData,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      })
      .then(function (response) {
        // Verifica si la respuesta es JSON válida
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json(); // Intenta parsear la respuesta como JSON
      })
      .then(function (data) {
        // Manejo del JSON parseado correctamente
        if (data.status === 'success') {
          alert(data.message); // Muestra mensaje de éxito con alert
          $(".modal").modal("hide"); // Cierra cualquier modal abierto
        } else {
          alert(data.message); // Muestra mensaje de error con alert
        }
      })
      
    });
  
    // Resetea el formulario al mostrar el modal
    $(".modal").on("show.bs.modal", function (e) {
      $("#registerForm").trigger("reset");
    });
  });
  