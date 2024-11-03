<?php
include('../../../assets/database.php');

// Consultar entrenadores
$query = "SELECT p.id_persona AS id_entrenador, p.nombre, p.apellido FROM entrenador e JOIN personas p ON e.id_entrenador = p.id_persona";
$result = mysqli_query($conn, $query);

$entrenadores = [];
while ($row = mysqli_fetch_assoc($result)) {
    $entrenadores[] = $row;
}

// Retornar los entrenadores como JSON
header('Content-Type: application/json');
echo json_encode($entrenadores);
?>
