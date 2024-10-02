<?php
session_start();
require_once '/User.php'; // Asegúrate de que este archivo defina correctamente la clase User

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
                // Guardar la CI y el rol en la sesión si la autenticación es exitosa
                $_SESSION['ci'] = $ci;
                $_SESSION['id_rol'] = $user->getIdRol(); // Guardar el id_rol en la sesión

                // Redirigir según el rol
                $redirectUrl = '';
                switch ($user->getIdRol()) {
                    case 0:
                        $redirectUrl = '../usuario_cliente/formulario.html';
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
                        $redirectUrl = 'index.html';
                        break;
                    case 7: 
                        $redirectUrl = 'index.html';
                        break;
                    case 8: 
                        $redirectUrl = 'index.html';
                        break;
                    case 9: 
                        $redirectUrl = 'index.html';
                        break;
                    case 10: 
                        $redirectUrl = '../usuario_administrador_ti/index.html';
                        break;
                    default:
                        $redirectUrl = 'default.html'; // Página por defecto si no se encuentra un rol
                }

                // Devolver una respuesta JSON
                echo json_encode(['status' => 'success', 'message' => 'Inicio de sesión exitoso', 'redirect' => $redirectUrl]);
            } else {
                echo json_encode(['status' => 'error', 'message' => 'CI o contraseña incorrectos']);
            }
        } else {
            echo json_encode(['status' => 'error', 'message' => 'Faltan datos para iniciar sesión']);
        }
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Método no permitido']);
    }
} catch (Exception $e) {
    // Capturar cualquier error o excepción y devolverlo como JSON
    echo json_encode(['status' => 'error', 'message' => 'Error del servidor: ' . $e->getMessage()]);
}
?>
