<?php
include('../../../assets/database.php');
header('Content-Type: application/json');

// Modificar la consulta para obtener el id_estado actual de cada cliente sin duplicados
$sql = "
    SELECT p.nombre, u.id_rol, c.id_cliente, e.cumplimiento_agenda, e.resistencia_anaerobica, e.resistencia_muscular,
           e.flexibilidad, e.resistencia_monotonia, e.resiliencia, e.nota, ce.id_estado
    FROM clientes AS c
    JOIN usuarios AS u ON c.id_cliente = u.CI
    JOIN personas AS p ON p.id_persona = c.id_cliente
    LEFT JOIN (
        SELECT id_cliente, MAX(id_evaluacion) AS latest_evaluation
        FROM clientes_evaluaciones
        GROUP BY id_cliente
    ) AS ce_evals ON ce_evals.id_cliente = c.id_cliente
    LEFT JOIN evaluaciones AS e ON e.id_evaluacion = ce_evals.latest_evaluation
    LEFT JOIN (
        SELECT id_cliente, MAX(id_estado) AS id_estado
        FROM clientes_estados
        GROUP BY id_cliente
    ) AS ce ON ce.id_cliente = c.id_cliente
    WHERE u.id_rol IN (1, 2)";

$result = $conn->query($sql);
$clientes = [];

if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $clientes[] = $row;
    }
}

echo json_encode($clientes);
$conn->close();
?>
