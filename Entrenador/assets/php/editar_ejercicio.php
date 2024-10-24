<?php
// Habilitar la visualización de errores para depuración
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// Incluir la conexión a la base de datos
include('../../../assets/database.php');

if (isset($_GET['id'])) {
    $idEjercicio = $_GET['id'];

    // Consulta para obtener los datos del ejercicio por su ID
    $sql = "SELECT id_ejercicio, nombre, descripcion, tipo FROM ejercicios WHERE id_ejercicio = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param('i', $idEjercicio);

    if ($stmt->execute()) {
        $result = $stmt->get_result();
        if ($result->num_rows > 0) {
            $ejercicio = $result->fetch_assoc();
            echo json_encode($ejercicio); // Devolver los datos del ejercicio en formato JSON
        } else {
            echo json_encode(["error" => "Ejercicio no encontrado"]); // Manejo de error si no se encuentra el ejercicio
        }
    } else {
        echo json_encode(["error" => "Error en la consulta"]); // Manejo de error en la consulta
    }

    $stmt->close();
} else {
    echo json_encode(["error" => "ID de ejercicio no proporcionado"]); // Manejo de error si no se proporciona la ID
}

$conn->close();
?>
