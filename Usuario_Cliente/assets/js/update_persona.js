$(document).ready(function () {
    $("#userForm").submit(function (e) {
        e.preventDefault();

        let formData = $(this).serialize();

        // Enviar los datos 
        $.ajax({
            url: 'assets/php/update_persona.php', 
            type: 'POST',
            data: formData,
            dataType: 'json', // Asegura que la respuesta sea tratada como JSON
            success: function (response) {
                if (response.status === 'success') {
                    alert(response.message);
                    window.location.href = 'index.html'; 
                } else {
                    alert(response.message);
                }
            },
            error: function (xhr, status, error) {
                alert('Error al enviar los datos: ' + error);
            }
        });
    });
});
