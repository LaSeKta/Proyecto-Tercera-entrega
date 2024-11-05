<?php

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);


require_once 'User.php'; 


header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    
 
    if (isset($_POST['ci'], $_POST['password'], $_POST['nombre'], $_POST['apellido'], $_POST['email'])) {

      
        $ci = $_POST['ci'];
        $password = $_POST['password'];
        $nombre = $_POST['nombre'];
        $apellido = $_POST['apellido'];
        $email = $_POST['email'];

       
        $user = new User($ci, $password, $nombre, $apellido, $email);


        $response = $user->register();

      
        echo json_encode($response);
    } else {
      
        echo json_encode([
            'status' => 'error', 
            'message' => 'Datos incompletos. Todos los campos son requeridos.'
        ]);
    }
} else {
    
    echo json_encode([
        'status' => 'error', 
        'message' => 'Método no permitido.'
    ]);
}
?>
