<?php
include '../../../assets/database.php'; // Asegúrate de que este archivo define correctamente $conn
session_start();

header('Content-Type: application/json');
ob_start(); // Inicia el buffer de salida para capturar cualquier salida inesperada

// Verifica que el usuario esté logueado y que su CI esté disponible en la sesión
if (!isset($_SESSION['ci'])) {
    ob_end_clean(); // Limpiar buffer antes de enviar respuesta JSON
    echo json_encode(['status' => 'error', 'message' => 'Usuario no autenticado']);
    exit;
}

$ci = $_SESSION['ci']; // CI del usuario logueado

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Recibir los datos del formulario
    $nombre = $_POST['nombre'];
    $apellido = $_POST['apellido'];
    $email = $_POST['email'];
    $telefono = $_POST['telefono']; // Asegúrate de que todos los datos están siendo enviados correctamente

    // Validar los datos recibidos
    if (empty($nombre) || empty($apellido) || empty($email) || empty($telefono)) {
        ob_end_clean();
        echo json_encode(['status' => 'error', 'message' => 'Todos los campos son obligatorios']);
        exit;
    }

    // Verificar si el CI existe en la tabla usuarios
    $userCheckStmt = $conn->prepare("SELECT CI FROM usuarios WHERE CI = ?");
    if ($userCheckStmt) {
        $userCheckStmt->bind_param("s", $ci);
        $userCheckStmt->execute();
        $userCheckStmt->store_result();

        if ($userCheckStmt->num_rows === 0) {
            ob_end_clean();
            echo json_encode(['status' => 'error', 'message' => 'El CI no está registrado en la tabla de usuarios']);
            $userCheckStmt->close();
            exit;
        }
        $userCheckStmt->close();
    } else {
        ob_end_clean();
        echo json_encode(['status' => 'error', 'message' => 'Error al verificar el CI en la tabla de usuarios: ' . $conn->error]);
        exit;
    }

    // Verificar si el CI existe en la tabla personas
    $checkStmt = $conn->prepare("SELECT nombre, apellido, email FROM personas WHERE id_persona = ?");
    if ($checkStmt) {
        $checkStmt->bind_param("s", $ci);
        $checkStmt->execute();
        $checkStmt->store_result();

        if ($checkStmt->num_rows > 0) {
            $checkStmt->bind_result($currentNombre, $currentApellido, $currentEmail);
            $checkStmt->fetch();

            // Compara los datos actuales con los nuevos para ver si hay cambios
            if ($currentNombre === $nombre && $currentApellido === $apellido && $currentEmail === $email) {
                ob_end_clean();
                echo json_encode(['status' => 'error', 'message' => 'Los datos ingresados son iguales a los actuales. No se realizaron cambios.']);
                $checkStmt->close();
                exit;
            }

            $checkStmt->close();

            // Preparar la consulta para actualizar los datos en la tabla personas
            $stmt = $conn->prepare("UPDATE personas SET nombre = ?, apellido = ?, email = ? WHERE id_persona = ?");
            
            if ($stmt) {
                $stmt->bind_param("ssss", $nombre, $apellido, $email, $ci);

                if ($stmt->execute()) {
                    // Verificar si realmente se actualizaron filas en la tabla
                    if ($stmt->affected_rows > 0) {
                        ob_end_clean();
                        echo json_encode(['status' => 'success', 'message' => 'Información actualizada correctamente']);
                    } else {
                        ob_end_clean();
                        echo json_encode(['status' => 'error', 'message' => 'No se actualizó ninguna fila. Verifica que los datos sean diferentes.']);
                    }
                } else {
                    ob_end_clean();
                    echo json_encode(['status' => 'error', 'message' => 'Error al ejecutar la actualización: ' . $stmt->error]);
                }

                $stmt->close();
            } else {
                ob_end_clean();
                echo json_encode(['status' => 'error', 'message' => 'Error al preparar la consulta: ' . $conn->error]);
            }
        } else {
            ob_end_clean();
            echo json_encode(['status' => 'error', 'message' => 'El CI no existe en la tabla personas']);
            $checkStmt->close();
        }
    } else {
        ob_end_clean();
        echo json_encode(['status' => 'error', 'message' => 'Error al preparar la consulta de verificación en personas: ' . $conn->error]);
    }
} else {
    ob_end_clean();
    echo json_encode(['status' => 'error', 'message' => 'Método de solicitud no permitido']);
}
?>
