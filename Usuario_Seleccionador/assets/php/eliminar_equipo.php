<?php
header('Content-Type: application/json');
include('../../../assets/database.php');

$data = json_decode(file_get_contents("php://input"), true);
$id_equipo = $data['id_equipo'];

try {
    if (!$id_equipo) {
        throw new Exception("ID de equipo no proporcionado.");
    }

    // Eliminar relaciones en `clientes_equipos`
    $deleteRelationQuery = "DELETE FROM clientes_equipos WHERE id_equipo = ?";
    $stmt = $conn->prepare($deleteRelationQuery);
    $stmt->bind_param("i", $id_equipo);
    $stmt->execute();

    // Eliminar el equipo en sí
    $deleteEquipoQuery = "DELETE FROM equipos WHERE id_equipo = ?";
    $stmt = $conn->prepare($deleteEquipoQuery);
    $stmt->bind_param("i", $id_equipo);

    if ($stmt->execute()) {
        echo json_encode(["success" => true]);
    } else {
        throw new Exception("Error al eliminar el equipo.");
    }

} catch (Exception $e) {
    echo json_encode(["error" => $e->getMessage()]);
}

$conn->close();''
?>
