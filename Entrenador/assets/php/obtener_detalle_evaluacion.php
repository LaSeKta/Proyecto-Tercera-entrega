<?php
header('Content-Type: application/json');
include('../../../assets/database.php'); // Ajusta esta ruta a tu configuración de proyecto

mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);

try {
    // Verificar si se proporciona el `id_evaluacion`
    $id_evaluacion = $_GET['id_evaluacion'];
    if (!$id_evaluacion) {
        echo json_encode(["error" => "ID de evaluación no proporcionado"]);
        exit;
    }

    // Consulta para obtener detalles de la evaluación y datos del cliente
    $query = "
        SELECT 
            e.cumplimiento_agenda,
            e.resistencia_anaerobica,
            e.resistencia_muscular,
            e.flexibilidad,
            e.resistencia_monotonia,
            e.resiliencia,
            e.nota AS nota_final,
            c.id_cliente,
            CONCAT(p.nombre, ' ', p.apellido) AS nombre
        FROM evaluaciones e
        JOIN clientes_evaluaciones ce ON e.id_evaluacion = ce.id_evaluacion
        JOIN clientes c ON ce.id_cliente = c.id_cliente
        JOIN personas p ON c.id_cliente = p.id_persona
        WHERE e.id_evaluacion = ?
    ";

    $stmt = $conn->prepare($query);
    $stmt->bind_param("i", $id_evaluacion);
    $stmt->execute();
    $result = $stmt->get_result();
    $evaluacion = $result->fetch_assoc();

    if ($evaluacion) {
        echo json_encode($evaluacion, JSON_PRETTY_PRINT);
    } else {
        echo json_encode(["error" => "Evaluación no encontrada"]);
    }
} catch (Exception $e) {
    echo json_encode(["error" => $e->getMessage()]);
}
?>
