<?php
header('Content-Type: application/json');
include('../../../assets/database.php'); // Ajusta esta ruta a tu configuración

mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);

try {
    $id_evaluacion = $_POST['id_evaluacion'];

    // Elimina la evaluación de la tabla `evaluaciones`
    $query = "DELETE FROM evaluaciones WHERE id_evaluacion = ?";
    $stmt = $conn->prepare($query);
    $stmt->bind_param("i", $id_evaluacion);
    $stmt->execute();

    // También eliminamos la relación en `clientes_evaluaciones`
    $query2 = "DELETE FROM clientes_evaluaciones WHERE id_evaluacion = ?";
    $stmt2 = $conn->prepare($query2);
    $stmt2->bind_param("i", $id_evaluacion);
    $stmt2->execute();

    echo json_encode(["success" => true, "message" => "Evaluación eliminada exitosamente."]);
} catch (Exception $e) {
    echo json_encode(["error" => $e->getMessage()]);
}
?>
