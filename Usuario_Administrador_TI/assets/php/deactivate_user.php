<?php
include '../../../assets/database.php';

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

header('Content-Type: application/json');

try {
    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        // Verificar que se haya enviado el CI
        if (isset($_POST['ci'])) {
            $ci = $_POST['ci'];

            // Preparar la consulta para desactivar al usuario
            $stmt = $conn->prepare("UPDATE clientes SET user_estado = 2 WHERE id_cliente = ?");
            if ($stmt) {
                $stmt->bind_param("s", $ci);

                if ($stmt->execute()) {
                    if ($stmt->affected_rows > 0) {
                        echo json_encode(['status' => 'success', 'message' => 'Usuario desactivado correctamente']);
                    } else {
                        echo json_encode(['status' => 'error', 'message' => 'No se encontró un cliente con el CI proporcionado']);
                    }
                } else {
                    echo json_encode(['status' => 'error', 'message' => 'Error al desactivar el usuario: ' . $stmt->error]);
                }

                $stmt->close();
            } else {
                echo json_encode(['status' => 'error', 'message' => 'Error al preparar la consulta: ' . $conn->error]);
            }
        } else {
            echo json_encode(['status' => 'error', 'message' => 'Datos incompletos para desactivar el usuario']);
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
