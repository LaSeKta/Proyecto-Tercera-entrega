<?php
include '../../../assets/database.php'; // Asegúrate de que este archivo define correctamente $conn
session_start();

header('Content-Type: application/json');
ob_start(); // Inicia el buffer de salida para capturar cualquier error

try {
    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        if (isset($_POST['accion']) && $_POST['accion'] == 'login') {
            if (isset($_POST['ci'], $_POST['password'])) {
                $ci = $_POST['ci'];
                $password = $_POST['password'];

                // Verifica que la conexión $conn esté definida y sin errores
                if (isset($conn) && $conn !== null) {
                    // Preparar la consulta para seleccionar el usuario por CI
                    $stmt = $conn->prepare("SELECT contrasena, id_rol FROM usuarios WHERE CI = ?");
                    
                    if ($stmt) {
                        $stmt->bind_param("s", $ci);
                        $stmt->execute();
                        $stmt->store_result();

                        if ($stmt->num_rows > 0) {
                            $stmt->bind_result($hashed_password, $id_rol);
                            $stmt->fetch();

                            // Verifica la contraseña usando password_verify
                            if (password_verify($password, $hashed_password)) {
                                // Guardar el CI del usuario en la sesión
                                $_SESSION['ci'] = $ci;

                                // Redirigir a la página según el rol
                                $homePages = [
                                    0 => '../usuario_cliente/formulario.html',
                                    1 => 'home2.html',
                                    2 => 'home3.html',
                                    3 => 'home4.html',
                                    4 => 'home5.html',
                                    5 => 'home6.html'
                                ];

                                // Verificar si la URL de redirección es válida
                                $redirectUrl = isset($homePages[$id_rol]) ? $homePages[$id_rol] : 'default.html';

                                // Limpiar el buffer de salida antes de enviar la respuesta JSON
                                ob_end_clean();
                                echo json_encode(['status' => 'success', 'message' => 'Inicio de sesión exitoso', 'redirect' => $redirectUrl]);
                            } else {
                                ob_end_clean();
                                echo json_encode(['status' => 'error', 'message' => 'Contraseña incorrecta']);
                            }
                        } else {
                            ob_end_clean();
                            echo json_encode(['status' => 'error', 'message' => 'Usuario no encontrado']);
                        }

                        $stmt->close();
                    } else {
                        ob_end_clean();
                        echo json_encode(['status' => 'error', 'message' => 'Error al preparar la consulta: ' . $conn->error]);
                    }
                } else {
                    ob_end_clean();
                    echo json_encode(['status' => 'error', 'message' => 'Error en la conexión a la base de datos']);
                }
            } else {
                ob_end_clean();
                echo json_encode(['status' => 'error', 'message' => 'Faltan datos para iniciar sesión']);
            }
        } else {
            ob_end_clean();
            echo json_encode(['status' => 'error', 'message' => 'Acción no válida']);
        }
    }
} catch (Exception $e) {
    ob_end_clean();
    echo json_encode(['status' => 'error', 'message' => 'Error del servidor: ' . $e->getMessage()]);
}
?>
