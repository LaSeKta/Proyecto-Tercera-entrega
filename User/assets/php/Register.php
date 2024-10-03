<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

require_once 'User.php'; // Incluir la clase de usuario

header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (isset($_POST['ci'], $_POST['password'])) {
        $ci = $_POST['ci'];
        $password = $_POST['password'];

        // Crear un nuevo objeto User
        $user = new User($ci, $password);

        // Intentar registrar al usuario
        $response = $user->register();

        // Devolver la respuesta en formato JSON
        echo json_encode($response);
    } else {
        // Devolver un error si faltan datos
        echo json_encode(['status' => 'error', 'message' => 'Datos incompletos']);
    }
} else {
    // Devolver un error si el método no es POST
    echo json_encode(['status' => 'error', 'message' => 'Método no permitido']);
}
?>
