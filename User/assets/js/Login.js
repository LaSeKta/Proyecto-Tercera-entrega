$(document).ready(function () {
  const messageContainer = $("#message-container");

  
  $("#loginForm").submit(function (e) {
    e.preventDefault();

    let formData = new URLSearchParams($(this).serialize());
    formData.append('accion', 'login'); 

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
     
      messageContainer.text(data.message).css("color", data.status === 'success' ? "green" : "red");
      if (data.status === 'success') {

        setTimeout(() => {
          window.location.href = data.redirect; 
        }, 1000);
      }
    })
    .catch(function (error) {
      console.error("Ocurrió un error: ", error);
      messageContainer.text("Ocurrió un error inesperado. Revise la consola para más detalles.").css("color", "red");
    });
  });
});
