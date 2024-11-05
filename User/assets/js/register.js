$(document).ready(function () {
  $("#registerForm").submit(function (e) {
    e.preventDefault(); 

    let data = $(this).serialize(); 

    $.ajax({
      url: "assets/php/Register.php", 
      type: "POST",
      data: data,
      dataType: "json", 
      success: function (response) {
        console.log("Respuesta del servidor:", response);

        
        if (response.status === 'success') {
          alert(response.message); 
          window.location.href = 'login.html'; 
        } else {
          alert(response.message); 
            }
      },
      error: function (xhr, status, error) {
        console.error("Error en la solicitud:", error);
        alert("Error al registrar el usuario. Por favor, intenta de nuevo.");
      },
    });
  });
});
