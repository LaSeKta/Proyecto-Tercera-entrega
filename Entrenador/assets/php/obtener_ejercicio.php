<?php
// Habilitar la visualización de errores para depuración
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// Incluir la conexión a la base de datos
include('../../../assets/database.php');

if (isset($_GET['id'])) {
    $idEjercicio = $_GET['id'];

    // Consulta para obtener los datos del ejercicio junto con el plan asignado
    $sql = "
        SELECT e.id_ejercicio, e.nombre, e.descripcion, e.tipo, p.id_plan, p.nombre AS plan_nombre
        FROM ejercicios e
        LEFT JOIN planes_ejercicios pe ON e.id_ejercicio = pe.id_ejercicio
        LEFT JOIN planes p ON pe.id_plan = p.id_plan
        WHERE e.id_ejercicio = ?";
    
    $stmt = $conn->prepare($sql);

    if ($stmt) {
        $stmt->bind_param('i', $idEjercicio);

        if ($stmt->execute()) {
            $result = $stmt->get_result();
            if ($result->num_rows > 0) {
                $ejercicio = $result->fetch_assoc();
                echo json_encode($ejercicio); // Devolver los datos del ejercicio y del plan en formato JSON
            } else {
                echo json_encode(["error" => "Ejercicio no encontrado"]);
            }
        } else {
            echo json_encode(["error" => "Error en la ejecución de la consulta"]);
        }

        $stmt->close();
    } else {
        echo json_encode(["error" => "Error en la preparación de la consulta"]);
    }
} else {
    echo json_encode(["error" => "ID del ejercicio no proporcionada"]);
}

$conn->close();
?>
