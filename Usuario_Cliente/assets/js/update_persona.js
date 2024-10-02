$(document).ready(function () {
    $("#userForm").submit(function (e) {
        e.preventDefault();

        // Serializar los datos del formulario
        let formData = $(this).serialize();

        // Enviar los datos al backend usando AJAX
        $.ajax({
            url: 'assets/php/update_persona.php', // Asegúrate de que esta ruta sea correcta
            type: 'POST',
            data: formData,
            success: function (response) {
                // Maneja la respuesta del servidor
                if (response.status === 'success') {
                    alert(response.message);
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
