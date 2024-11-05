<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);


include('../../../assets/database.php');

if ($_SERVER['REQUEST_METHOD'] == 'POST' && !empty($_POST['id_ejercicio'])) {
    $idEjercicio = $_POST['id_ejercicio'];
    $nombre = $_POST['nombre'] ?? null;
    $descripcion = $_POST['descripcion'] ?? null;
    $tipo = $_POST['tipo'] ?? null;

    if ($nombre && $descripcion && $tipo) {
        $sql = "UPDATE ejercicios SET nombre = ?, descripcion = ?, tipo = ? WHERE id_ejercicio = ?";
        $stmt = $conn->prepare($sql);

        if ($stmt) {
            $stmt->bind_param('sssi', $nombre, $descripcion, $tipo, $idEjercicio);

           
        } 
    }
}

$conn->close();
?>
