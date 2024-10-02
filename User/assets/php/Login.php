<?php
include '../../../assets/database.php'; 
session_start();

header('Content-Type: application/json');
ob_start();
try {
    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        if (isset($_POST['accion']) && $_POST['accion'] == 'login') {
            if (isset($_POST['ci'], $_POST['password'])) {
                $ci = $_POST['ci'];
                $password = $_POST['password'];

                if (isset($conn) && $conn !== null) {

                    $stmt = $conn->prepare("SELECT contrasena, id_rol FROM usuarios WHERE CI = ?");
                    
                    if ($stmt) {
                        $stmt->bind_param("s", $ci);
                        $stmt->execute();
                        $stmt->store_result();

                        if ($stmt->num_rows > 0) {
                            $stmt->bind_result($hashed_password, $id_rol);
                            $stmt->fetch();

                            if (password_verify($password, $hashed_password)) {
                                
                                $_SESSION['ci'] = $ci;

                                $homePages = [
                                    0 => '../usuario_cliente/formulario.html',
                                    1 => '../usuario_cliente/index.html',
                                    2 => 'home3.html',
                                    3 => 'home4.html',
                                    4 => 'home5.html',
                                    5 => 'home5.html',
                                    6 => 'home5.html',
                                    7 => 'home5.html',
                                    8 => 'home5.html',
                                    9 => 'home5.html',
                                    10 => '../usuario_administrador_ti/index.html'
                                ];

                                $redirectUrl = isset($homePages[$id_rol]) ? $homePages[$id_rol] : 'default.html';

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
