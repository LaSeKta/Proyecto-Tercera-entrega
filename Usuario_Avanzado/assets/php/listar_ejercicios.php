<?php
include('../../../assets/database.php');
header('Content-Type: application/json');

// Habilita la visualización de errores para depuración
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

$query = "SELECT id_ejercicio as id, nombre, tipo, descripcion FROM ejercicios";
$result = $conn->query($query);

if (!$result) {
    // Si hay un error en la consulta, muestra el mensaje de error en JSON
    echo json_encode(['error' => $conn->error]);
    exit;
}

$ejercicios = [];
while ($row = $result->fetch_assoc()) {
    $ejercicios[] = $row;
}

echo json_encode($ejercicios);
?>
