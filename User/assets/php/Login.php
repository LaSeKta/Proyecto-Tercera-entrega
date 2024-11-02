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

            // Crear un objeto de la clase User
            $user = new User($ci, $password);

            // Autenticar el usuario
            if ($user->authenticate()) {
                session_start();
                $_SESSION['ci'] = $ci;
                $_SESSION['id_rol'] = $user->getIdRol();
            
                // Definir redirecciones según el rol
                $redirectUrls = [
                    0 => '../usuario_cliente/index.html',
                    1 => '../usuario_cliente/index.html',
                    2 => 'moderador.html',
                    3 => 'entrenador.html',
                    4 => 'cliente.html',
                    5 => 'supervisor.html',
                    6 => 'moderador.html',
                    7 => 'entrenador.html',
                    8 => 'cliente.html',
                    9 => 'supervisor.html',
                    10 => '../Usuario_Administrador_TI/index.html',
                ];

                // Asignar URL de redirección basada en el rol, con default si no coincide
                $redirectUrl = $redirectUrls[$user->getIdRol()] ?? 'default.html';

                // Respuesta JSON para el inicio de sesión exitoso
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
    // Capturar cualquier excepción y devolverla como JSON
    echo json_encode(['status' => 'error', 'message' => 'Error del servidor: ' . $e->getMessage()]);
}
?>
