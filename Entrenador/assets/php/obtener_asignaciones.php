<?php
header('Content-Type: application/json');
include('../../../assets/database.php'); // Ajusta esta ruta según tu configuración

mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);

try {
    // Consulta para obtener la última asignación de plan por cliente
    $query = "
        SELECT CONCAT(p.nombre, ' ', p.apellido) AS cliente, pl.nombre AS plan, MAX(cp.fecha_asignacion) AS fecha_asignacion
        FROM clientes_planes cp
        JOIN clientes c ON cp.id_cliente = c.id_cliente
        JOIN personas p ON c.id_cliente = p.id_persona
        JOIN planes pl ON cp.id_plan = pl.id_plan
        GROUP BY cp.id_cliente
        ORDER BY fecha_asignacion DESC
    ";
    
    $result = mysqli_query($conn, $query);

    $asignaciones = [];
    while ($row = mysqli_fetch_assoc($result)) {
        $asignaciones[] = $row;
    }

    echo json_encode($asignaciones, JSON_PRETTY_PRINT);
} catch (Exception $e) {
    echo json_encode(["error" => $e->getMessage()]);
}
?>
