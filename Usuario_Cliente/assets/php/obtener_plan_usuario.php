<?php

header('Content-Type: application/json');
require_once '../../../assets/database.php'; // Archivo con la conexión a la base de datos

session_start();
$ci = $_SESSION['ci']; // CI del usuario de la sesión actual

try {
    $query = "
        SELECT p.nombre AS plan_nombre, e.nombre AS ejercicio_nombre, e.descripcion
        FROM planes p
        JOIN planes_ejercicios pe ON p.id_plan = pe.id_plan
        JOIN ejercicios e ON pe.id_ejercicio = e.id_ejercicio
        JOIN clientes_planes cp ON p.id_plan = cp.id_plan
        JOIN clientes c ON cp.id_cliente = c.id_cliente
        WHERE c.id_cliente = ?
    ";

    $stmt = $conn->prepare($query);
    $stmt->bind_param("s", $ci);
    $stmt->execute();
    $result = $stmt->get_result();

    $planData = [];
    while ($row = $result->fetch_assoc()) {
        $planData[] = $row;
    }

    echo json_encode($planData);
} catch (Exception $e) {
    echo json_encode(["error" => $e->getMessage()]);
}
?>
