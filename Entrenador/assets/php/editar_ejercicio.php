<?php
// Habilitar la visualización de errores para depuración
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// Incluir la conexión a la base de datos
include('../../../assets/database.php');

// Verificar que el método de solicitud sea POST y que se proporcione la ID del ejercicio
if ($_SERVER['REQUEST_METHOD'] == 'POST' && !empty($_POST['id_ejercicio'])) {
    $idEjercicio = $_POST['id_ejercicio'];
    $nombre = $_POST['nombre'] ?? null;
    $descripcion = $_POST['descripcion'] ?? null;
    $tipo = $_POST['tipo'] ?? null;

    // Validar que todos los datos necesarios estén presentes
    if ($nombre && $descripcion && $tipo) {
        // Preparar la consulta de actualización
        $sql = "UPDATE ejercicios SET nombre = ?, descripcion = ?, tipo = ? WHERE id_ejercicio = ?";
        $stmt = $conn->prepare($sql);

        if ($stmt) {
            $stmt->bind_param('sssi', $nombre, $descripcion, $tipo, $idEjercicio);

           
        } 
    }
}

// Cerrar la conexión
$conn->close();
?>
