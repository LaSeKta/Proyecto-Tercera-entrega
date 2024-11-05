<?php
header('Content-Type: application/json');
include('../../../assets/database.php'); 

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $id = $_POST['id'];
    $nombre = $_POST['nombre'];
    $tipo = $_POST['tipo'];
    $descripcion = $_POST['descripcion'];

    $query = "UPDATE deportes SET nombre = ?, tipo = ?, descripcion = ? WHERE id_deporte = ?";
    $stmt = $conn->prepare($query);
    $stmt->bind_param("sssi", $nombre, $tipo, $descripcion, $id);

    if ($stmt->execute()) {
        echo json_encode(["success" => true, "message" => "Deporte modificado exitosamente."]);
    } else {
        echo json_encode(["success" => false, "message" => "Error al modificar el deporte."]);
    }
}
?>
