<?php
header('Content-Type: application/json');
include('../../../assets/database.php'); // Ajusta la ruta a tu archivo de base de datos

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $nombre = $_POST['nombre'];
    $tipo = $_POST['tipo'];
    $descripcion = $_POST['descripcion'];

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
