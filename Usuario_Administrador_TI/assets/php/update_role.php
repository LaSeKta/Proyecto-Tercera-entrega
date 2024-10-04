<?php
include '../../../assets/database.php'; 

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

header('Content-Type: application/json');

try {
    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        // Verificar que se hayan enviado el CI y el nuevo rol
        if (isset($_POST['ci'], $_POST['id_rol'])) {
            $ci = $_POST['ci'];
            $id_rol = (int) $_POST['id_rol'];

            // Preparar la consulta para actualizar el rol
            $stmt = $conn->prepare("UPDATE usuarios SET id_rol = ? WHERE CI = ?");
            if ($stmt) {
                $stmt->bind_param("is", $id_rol, $ci);

                if ($stmt->execute()) {
                    echo json_encode(['status' => 'success', 'message' => 'Rol actualizado correctamente']);
                } else {
                    echo json_encode(['status' => 'error', 'message' => 'Error al actualizar el rol: ' . $stmt->error]);
                }

                $stmt->close();
            } else {
                echo json_encode(['status' => 'error', 'message' => 'Error al preparar la consulta: ' . $conn->error]);
            }
        } else {
            echo json_encode(['status' => 'error', 'message' => 'Datos incompletos para actualizar el rol']);
        }
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Método de solicitud no permitido']);
    }
} catch (Exception $e) {
    echo json_encode(['status' => 'error', 'message' => 'Error del servidor: ' . $e->getMessage()]);
} finally {
    if (isset($conn)) {
        $conn->close(); // Cerrar la conexión a la base de datos
    }
}
?>
