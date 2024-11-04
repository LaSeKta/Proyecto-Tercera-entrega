<?php
header('Content-Type: application/json');
include('../../../assets/database.php');

try {
    $equiposQuery = "
        SELECT e.id_equipo, e.nombre_equipo, e.deporte, e.tipo_actividad, 
               GROUP_CONCAT(CONCAT(p.nombre, ' ', p.apellido)) AS deportistas
        FROM equipos e
        LEFT JOIN clientes_equipos ce ON e.id_equipo = ce.id_equipo
        LEFT JOIN clientes c ON ce.id_cliente = c.id_cliente
        LEFT JOIN personas p ON c.id_cliente = p.id_persona
        LEFT JOIN usuarios u ON u.CI = c.id_cliente
        WHERE u.id_rol = 1
        GROUP BY e.id_equipo
    ";
    
    $result = $conn->query($equiposQuery);

    if ($result === false) {
        throw new Exception("Error en la consulta de equipos: " . $conn->error);
    }

    $equipos = [];
    while ($row = $result->fetch_assoc()) {
        $equipos[] = $row;
    }

    echo json_encode($equipos);
} catch (Exception $e) {
    echo json_encode(["error" => $e->getMessage()]);
}

$conn->close();
?>
