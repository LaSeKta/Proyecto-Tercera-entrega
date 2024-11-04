<?php
header('Content-Type: application/json');
include('../../../assets/database.php'); // Ajusta la ruta según tu estructura

// Recibir los datos enviados por JavaScript
$data = json_decode(file_get_contents("php://input"), true);

if (!isset($data['id'])) {
    echo json_encode(['success' => false, 'message' => 'ID de sesión no proporcionado']);
    exit;
}

$id_sesion = $data['id'];

$conn->begin_transaction();

try {
    // Eliminar la referencia en `entrenador_sesiones`
    $query = "DELETE FROM entrenador_sesiones WHERE id_sesion = ?";
    $stmt = $conn->prepare($query);
    $stmt->bind_param("i", $id_sesion);
    $stmt->execute();
    $stmt->close();

    // Eliminar la referencia en `cliente_sesiones`
    $query = "DELETE FROM clientes_sesiones WHERE id_sesion = ?";
    $stmt = $conn->prepare($query);
    $stmt->bind_param("i", $id_sesion);
    $stmt->execute();
    $stmt->close();

    // Eliminar la sesión de la tabla `sesiones`
    $query = "DELETE FROM sesiones WHERE id_sesion = ?";
    $stmt = $conn->prepare($query);
    $stmt->bind_param("i", $id_sesion);
    $stmt->execute();
    $stmt->close();

    // Confirmar la transacción
    $conn->commit();

    echo json_encode(['success' => true]);
} catch (Exception $e) {
    // Revertir la transacción en caso de error
    $conn->rollback();
    echo json_encode(['success' => false, 'message' => 'Error al eliminar la sesión y sus referencias']);
}

$conn->close();
?>