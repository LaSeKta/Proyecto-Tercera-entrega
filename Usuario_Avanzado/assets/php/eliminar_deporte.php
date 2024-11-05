<?php
header('Content-Type: application/json');
include('../../../assets/database.php'); 

mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);

try {
    $data = json_decode(file_get_contents("php://input"), true);
    $id_deporte = $data['id'];

    // Verificar que el ID no esté vacío
    if (empty($id_deporte)) {
        echo json_encode(["success" => false, "message" => "ID de deporte no proporcionado."]);
        exit();
    }

    $query = "DELETE FROM deportes WHERE id_deporte = ?";
    $stmt = $conn->prepare($query);
    $stmt->bind_param("i", $id_deporte);
    $stmt->execute();

    echo json_encode(["success" => true, "message" => "Deporte eliminado correctamente."]);
} catch (Exception $e) {
    echo json_encode(["success" => false, "message" => "Error eliminando el deporte: " . $e->getMessage()]);
}
?>
