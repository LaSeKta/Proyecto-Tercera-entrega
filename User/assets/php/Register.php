<?php
// Mostrar errores de PHP (desactivar en producción)
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// Incluir la clase de usuario
require_once 'User.php'; 

// Configurar para devolver una respuesta en formato JSON
header('Content-Type: application/json');

// Verificar que el método de solicitud sea POST
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    
    // Verificar que los campos requeridos estén presentes
    if (isset($_POST['ci'], $_POST['password'], $_POST['nombre'], $_POST['apellido'], $_POST['email'])) {

        // Obtener los datos del formulario
        $ci = $_POST['ci'];
        $password = $_POST['password'];
        $nombre = $_POST['nombre'];
        $apellido = $_POST['apellido'];
        $email = $_POST['email'];

        // Crear un nuevo objeto User con los datos recibidos
        $user = new User($ci, $password, $nombre, $apellido, $email);

        // Intentar registrar al usuario
        $response = $user->register();

        // Devolver la respuesta en formato JSON
        echo json_encode($response);
    } else {
        // Devolver un error si faltan campos
        echo json_encode([
            'status' => 'error', 
            'message' => 'Datos incompletos. Todos los campos son requeridos.'
        ]);
    }
} else {
    // Devolver un error si el método no es POST
    echo json_encode([
        'status' => 'error', 
        'message' => 'Método no permitido.'
    ]);
}
?>
