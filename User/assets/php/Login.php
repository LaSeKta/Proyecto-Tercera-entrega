<?php

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

require_once 'User.php'; // Asegúrate de que este archivo defina correctamente la clase User

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
            
                // Redirigir según el rol
                $redirectUrl = '';
                $idRol = $user->getIdRol();

                switch ($idRol) {
                    case 0:
                        $redirectUrl = '../usuario_cliente/index.html';
                        break;
                    case 1:
                        $redirectUrl = '../usuario_cliente/index.html';
                        break;
                    case 2:
                        $redirectUrl = 'moderador.html';
                        break;
                    case 3:
                        $redirectUrl = 'entrenador.html';
                        break;
                    case 4:
                        $redirectUrl = 'cliente.html';
                        break;
                    case 5:
                        $redirectUrl = 'supervisor.html';
                        break;
                    case 6:
                        $redirectUrl = 'moderador.html';
                        break;
                    case 7:
                        $redirectUrl = 'entrenador.html';
                        break;
                    case 8:
                        $redirectUrl = 'cliente.html';
                        break;
                    case 9:
                        $redirectUrl = 'supervisor.html';
                        break;
                    case 10:
                        $redirectUrl = '../Usuario_Administrador_TI/index.html';
                        break;
                    default:
                        $redirectUrl = 'default.html'; // Redirige a una página por defecto si no se encuentra un rol
                }

                // Devolver solo la respuesta JSON sin mensajes adicionales
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
