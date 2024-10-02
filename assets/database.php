
<?php
//datos de conexión
$servername = "localhost"; 
$username = "root";        
$password = "";            
$dbname = "sekta";

// Crear la conexión
$conn = new mysqli($servername, $username, $password, $dbname);

// Verificar la conexión
if ($conn->connect_error) {
    //error de conexión y muestra un mensaje
    die(json_encode(['status' => 'error', 'message' => 'Error en la conexión a la base de datos: ' . $conn->connect_error]));
}
?>
