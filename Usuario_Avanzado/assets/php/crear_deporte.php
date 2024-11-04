<?php
header('Content-Type: application/json');
include('../../../assets/database.php');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $nombre = $_POST['nombre'] ?? null;
    $tipo = $_POST['tipo'] ?? null;
    $descripcion = $_POST['descripcion'] ?? null;

    // Verificar que todos los campos estén presentes y no estén vacíos
    if (!$nombre || !$tipo || !$descripcion) {
        echo json_encode(["success" => false, "message" => "Todos los campos son obligatorios."]);
        exit;
    }

    $query = "INSERT INTO deportes (nombre, tipo, descripcion) VALUES (?, ?, ?)";
    $stmt = $conn->prepare($query);
    $stmt->bind_param("sss", $nombre, $tipo, $descripcion);

    if ($stmt->execute()) {
        echo json_encode(["success" => true, "message" => "Deporte creado exitosamente."]);
    } else {
        echo json_encode(["success" => false, "message" => "Error al crear el deporte."]);
    }
}
?>
