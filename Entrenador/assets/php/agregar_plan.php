<?php
// Incluir la conexión a la base de datos
include('../../../assets/database.php'); // Asegúrate de que este archivo contiene la conexión a tu base de datos

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    // Obtener los datos enviados por AJAX
    $nombre = $_POST['nombre'];
    $descripcion = $_POST['descripcion'];

    // Validar que los datos no estén vacíos
    if (!empty($nombre) && !empty($descripcion)) {
        // Preparar la consulta para insertar un nuevo plan en la base de datos
        $sql = "INSERT INTO planes (nombre, descripcion, tipo) VALUES (?, ?, 'Personalizado')"; // Tipo se define como 'Personalizado' por defecto

        // Usar prepared statements para mayor seguridad
        if ($stmt = $conn->prepare($sql)) {
            $stmt->bind_param('ss', $nombre, $descripcion); // Vincular los parámetros
            if ($stmt->execute()) {
                echo "Plan agregado exitosamente.";
            } else {
                echo "Error al agregar el plan.";
            }
            $stmt->close();
        } else {
            echo "Error en la preparación de la consulta.";
        }
    } else {
        echo "Por favor, complete todos los campos.";
    }
}

$conn->close(); // Cerrar la conexión a la base de datos
?>
