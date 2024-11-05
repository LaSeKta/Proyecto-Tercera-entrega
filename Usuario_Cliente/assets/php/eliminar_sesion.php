<?php
header('Content-Type: application/json');
include('../../../assets/database.php'); 

$data = json_decode(file_get_contents("php://input"), true);

if (!isset($data['id'])) {
    echo json_encode(['success' => false, 'message' => 'ID de sesión no proporcionado']);
    exit;
}

$id_sesion = $data['id'];

$conn->begin_transaction();

try {
    $query = "DELETE FROM entrenador_sesiones WHERE id_sesion = ?";
    $stmt = $conn->prepare($query);
    $stmt->bind_param("i", $id_sesion);
    $stmt->execute();
    $stmt->close();

    $query = "DELETE FROM clientes_sesiones WHERE id_sesion = ?";
    $stmt = $conn->prepare($query);
    $stmt->bind_param("i", $id_sesion);
    $stmt->execute();
    $stmt->close();

    $query = "DELETE FROM sesiones WHERE id_sesion = ?";
    $stmt = $conn->prepare($query);
    $stmt->bind_param("i", $id_sesion);
    $stmt->execute();
    $stmt->close();

    $conn->commit();

    echo json_encode(['success' => true]);
} catch (Exception $e) {
    $conn->rollback();
    echo json_encode(['success' => false, 'message' => 'Error al eliminar la sesión y sus referencias']);
}

$conn->close();
?>
