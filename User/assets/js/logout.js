$(document).ready(function () {
    $('#logoutBtn').on('click', function () {
        $.ajax({
            url: "../User/assets/php/logout.php", 
            type: "POST",
            success: function () {
                window.location.href = "../user/logout.html"; 
            },
            error: function () {
                alert("Error al cerrar sesión.");
            }
        });
    });
});
