<?php
session_start();
session_unset(); // Limpiar todas las variables de sesión
session_destroy(); // Destruir la sesión actual
header("Location: ../../logout.html"); // Ruta hacia logout.html
exit();
?>
