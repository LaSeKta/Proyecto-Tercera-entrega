<?php
// Incluir la conexión a la base de datos
include('../../../assets/database.php');

// Establecer el encabezado como JSON
header('Content-Type: application/json');

$planes = array();

// Consulta para obtener solo los planes con tipo 'Personalizado'
$sql = "SELECT id_plan, nombre FROM planes WHERE tipo = 'Personalizado'";
$result = $conn->query($sql);

if ($result) {
    while ($row = $result->fetch_assoc()) {
        $planes[] = $row;
    }
    echo json_encode($planes); // Devolver los planes en formato JSON
} else {
    echo json_encode(["error" => "Error en la consulta"]);
}

$conn->close();
?>
