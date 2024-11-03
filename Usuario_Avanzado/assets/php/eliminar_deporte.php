<?php
header('Content-Type: application/json');
include('../../../assets/database.php'); // Asegúrate de ajustar la ruta a tu archivo de conexión de base de datos

// Habilitar el informe de errores de MySQLi
mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);

try {
    // Obtener los datos enviados por el cliente
    $data = json_decode(file_get_contents("php://input"), true);
    $id_deporte = $data['id'];

    // Verificar que el ID no esté vacío
    if (empty($id_deporte)) {
        echo json_encode(["success" => false, "message" => "ID de deporte no proporcionado."]);
        exit();
    }

    // Preparar y ejecutar la consulta de eliminación
    $query = "DELETE FROM deportes WHERE id_deporte = ?";
    $stmt = $conn->prepare($query);
    $stmt->bind_param("i", $id_deporte);
    $stmt->execute();

    echo json_encode(["success" => true, "message" => "Deporte eliminado correctamente."]);
} catch (Exception $e) {
    echo json_encode(["success" => false, "message" => "Error eliminando el deporte: " . $e->getMessage()]);
}
?>
