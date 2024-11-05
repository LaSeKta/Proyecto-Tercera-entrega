<?php

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

require_once 'User.php';

header('Content-Type: application/json');

try {
    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        if (isset($_POST['ci'], $_POST['password'])) {
            $ci = $_POST['ci'];
            $password = $_POST['password'];

           
            $user = new User($ci, $password);

           
            if ($user->authenticate()) {
                session_start();
                $_SESSION['ci'] = $ci;
                $_SESSION['id_rol'] = $user->getIdRol();
            
                
                $redirectUrls = [
                    0 => 'usuario.html',
                    1 => '../usuario_cliente/index.html',
                    2 => '../usuario_cliente/index.html',
                    3 => '../entrenador/index.html',
                    4 => '../usuario_avanzado/index.html',
                    5 => '../usuario_administrativo/index.html',
                    6 => '../usuario_seleccionador/index.html',
                    7 => 'entrenador.html',
                    8 => 'cliente.html',
                    9 => 'supervisor.html',
                    10 => '../Usuario_Administrador_TI/index.html',
                ];

                
                $redirectUrl = $redirectUrls[$user->getIdRol()] ?? 'default.html';

               
                echo json_encode([
                    'status' => 'success',
                    'message' => 'Inicio de sesión exitoso',
                    'redirect' => $redirectUrl
                ]);
            } else {
                echo json_encode(['status' => 'error', 'message' => 'CI o contraseña incorrectos']);
            }
            
        } else {
            echo json_encode(['status' => 'error', 'message' => 'Faltan datos para iniciar sesión']);
        }
    }
} catch (Exception $e) {
    
    echo json_encode(['status' => 'error', 'message' => 'Error del servidor: ' . $e->getMessage()]);
}
?>
