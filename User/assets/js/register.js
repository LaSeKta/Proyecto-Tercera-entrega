$(document).ready(function () {

    $("#registerForm").submit(function (e) {
      e.preventDefault();
  
     
      let formData = new URLSearchParams($(this).serialize());
      formData.append('accion', 'registrar'); 
  
    
      fetch("assets/php/register.php", {
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
      
        if (data.status === 'success') {
          alert(data.message); 
          $(".modal").modal("hide");
          window.location.href = 'login.html'; 
        } else {
          alert(data.message); 
        }
      })
      
    });
  
 
    $(".modal").on("show.bs.modal", function (e) {
      $("#registerForm").trigger("reset");
    });
  });
  