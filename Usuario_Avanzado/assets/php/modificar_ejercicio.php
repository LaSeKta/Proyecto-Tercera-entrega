<?php
include('../../assets/database.php');

if (isset($_POST['ejercicio-id'], $_POST['ejercicio-nombre'], $_POST['tipo-ejercicio'], $_POST['ejercicio-detalle'])) {
    $id = $_POST['ejercicio-id'];
    $nombre = $_POST['ejercicio-nombre'];
    $tipo = $_POST['tipo-ejercicio'];
    $descripcion = $_POST['ejercicio-detalle'];

    $query = "UPDATE ejercicios SET nombre = ?, tipo = ?, descripcion = ? WHERE id_ejercicio = ?";
    $stmt = $conn->prepare($query);
    $stmt->bind_param("sssi", $nombre, $tipo, $descripcion, $id);

    if ($stmt->execute()) {
        echo json_encode(['success' => true, 'message' => 'Ejercicio modificado correctamente.']);
    } else {
        echo json_encode(['success' => false, 'message' => 'Error al modificar ejercicio.']);
    }
}
?>
