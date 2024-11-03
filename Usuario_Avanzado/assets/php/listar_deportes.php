<?php
header('Content-Type: application/json');
include('../../../assets/database.php'); // Ajusta la ruta a tu archivo de base de datos

$query = "SELECT id_deporte, nombre, tipo, descripcion FROM deportes";
$result = $conn->query($query);

$deportes = [];
while ($row = $result->fetch_assoc()) {
    $deportes[] = $row;
}

echo json_encode($deportes);
?>