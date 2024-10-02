
<?php
// Configura los datos de conexión
$servername = "localhost"; // Dirección del servidor (normalmente 'localhost')
$username = "root";        // Nombre de usuario de MySQL
$password = "";            // Contraseña de MySQL
$dbname = "sekta"; // Nombre de tu base de datos

// Crear la conexión
$conn = new mysqli($servername, $username, $password, $dbname);

// Verificar la conexión
if ($conn->connect_error) {
    // Maneja el error de conexión y muestra un mensaje claro
    die(json_encode(['status' => 'error', 'message' => 'Error en la conexión a la base de datos: ' . $conn->connect_error]));
}
?>
