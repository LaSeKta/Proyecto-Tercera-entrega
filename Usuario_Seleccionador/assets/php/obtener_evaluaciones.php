<?php
include('../../../assets/database.php');

try {
    // Consulta para obtener clientes con id_rol = 1 y su última evaluación
    $evaluacionesQuery = "
        SELECT CONCAT(p.nombre, ' ', p.apellido) AS nombre_completo,
               c.id_cliente AS ci,
               e.cumplimiento_agenda,
               e.resistencia_anaerobica,
               e.resistencia_muscular,
               e.flexibilidad,
               e.resistencia_monotonia,
               e.resiliencia,
               e.nota AS puntuacion_global
        FROM clientes c
        INNER JOIN personas p ON c.id_cliente = p.id_persona
        INNER JOIN usuarios u ON u.CI = p.id_persona
        INNER JOIN clientes_evaluaciones ce ON ce.id_cliente = c.id_cliente
        INNER JOIN evaluaciones e ON e.id_evaluacion = ce.id_evaluacion
        WHERE u.id_rol = 1
          AND ce.fecha_evaluacion = (
              SELECT MAX(ce2.fecha_evaluacion)
              FROM clientes_evaluaciones ce2
              WHERE ce2.id_cliente = c.id_cliente
          )
    ";
    
    $result = $conn->query($evaluacionesQuery);

    $evaluaciones = [];
    while ($row = $result->fetch_assoc()) {
        $progreso_individual = "Agenda: " . $row['cumplimiento_agenda'] . ", Anaeróbica: " . $row['resistencia_anaerobica'] . 
                               ", Muscular: " . $row['resistencia_muscular'] . ", Flexibilidad: " . $row['flexibilidad'] . 
                               ", Monotonía: " . $row['resistencia_monotonia'] . ", Resiliencia: " . $row['resiliencia'];
        $row['progreso_individual'] = $progreso_individual;
        $evaluaciones[] = $row;
    }

    echo json_encode($evaluaciones);
} catch (Exception $e) {
    echo json_encode(["error" => $e->getMessage()]);
}

$conn->close();
?>
