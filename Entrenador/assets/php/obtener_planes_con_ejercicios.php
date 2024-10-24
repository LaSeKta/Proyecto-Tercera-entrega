<?php
// Incluir la conexión a la base de datos
include('../../../assets/database.php');

// Consulta para obtener los planes y sus ejercicios
$sql = "
    SELECT p.id_plan, p.nombre, p.descripcion AS objetivo, 
           e.id_ejercicio, e.nombre AS ejercicio_nombre
    FROM planes p
    LEFT JOIN planes_ejercicios pe ON p.id_plan = pe.id_plan
    LEFT JOIN ejercicios e ON pe.id_ejercicio = e.id_ejercicio
    GROUP BY p.id_plan, e.id_ejercicio
";

$result = $conn->query($sql);

$planes = array();

if ($result->num_rows > 0) {
    // Recorrer los resultados y organizarlos en un array
    while ($row = $result->fetch_assoc()) {
        $planId = $row['id_plan'];

        if (!isset($planes[$planId])) {
            $planes[$planId] = array(
                'nombre' => $row['nombre'],
                'objetivo' => $row['objetivo'],
                'ejercicios' => array()
            );
        }

        if (!empty($row['id_ejercicio'])) {
            $planes[$planId]['ejercicios'][] = array(
                'id' => $row['id_ejercicio'], // Asegurarse de devolver la ID del ejercicio
                'nombre' => $row['ejercicio_nombre']
            );
        }
    }
}

// Devolver los planes y ejercicios en formato JSON
echo json_encode(array_values($planes));

$conn->close(); // Cerrar la conexión a la base de datos
?>
