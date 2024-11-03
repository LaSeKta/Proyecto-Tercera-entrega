<?php
include('../../../assets/database.php');

if (isset($_POST['ejercicio-nombre'], $_POST['tipo-ejercicio'], $_POST['ejercicio-detalle'])) {
    $nombre = $_POST['ejercicio-nombre'];
    $tipo = $_POST['tipo-ejercicio'];
    $descripcion = $_POST['ejercicio-detalle'];

    $query = "INSERT INTO ejercicios (nombre, tipo, descripcion) VALUES (?, ?, ?)";
    $stmt = $conn->prepare($query);
    $stmt->bind_param("sss", $nombre, $tipo, $descripcion);

    if ($stmt->execute()) {
        echo json_encode(['success' => true, 'message' => 'Ejercicio agregado correctamente.']);
    } else {
        echo json_encode(['success' => false, 'message' => 'Error al agregar ejercicio.']);
    }
}
?>
