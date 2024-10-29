<?php
include('../../../assets/database.php'); // Ajusta el archivo de conexión según corresponda

// Consulta para obtener los planes
$query = "SELECT id_plan, nombre FROM planes";
$result = $conn->query($query);

$planes = array();
if ($result) {
    while ($row = $result->fetch_assoc()) {
        $planes[] = $row; // Agregar cada fila a la lista de planes
    }
}

// Devolver la respuesta en JSON
header('Content-Type: application/json');
echo json_encode($planes);

$conn->close();
?>
