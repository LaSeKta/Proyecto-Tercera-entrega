<?php
// Incluir la conexión a la base de datos
include('../../../assets/database.php');

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $idPlan = $_POST['id_plan'];
    $nombre = $_POST['nombre'];
    $tipo = $_POST['tipo'];
    $descripcion = $_POST['descripcion'];

    // Validar que los datos no estén vacíos
    if (!empty($idPlan) && !empty($nombre) && !empty($tipo) && !empty($descripcion)) {
        // Solo permitir actualizar si el tipo es "Personalizado"
        if ($tipo === 'Personalizado') {
            // Consulta para actualizar el plan
            $sql = "UPDATE planes SET nombre = ?, tipo = ?, descripcion = ? WHERE id_plan = ?";
            $stmt = $conn->prepare($sql);
            $stmt->bind_param('sssi', $nombre, $tipo, $descripcion, $idPlan);

            if ($stmt->execute()) {
                echo "Plan actualizado exitosamente.";
            } else {
                echo "Error al actualizar el plan.";
            }

            $stmt->close();
        } else {
            echo "No se pueden modificar planes de tipo 'Estándar'.";
        }
    } else {
        echo "Por favor, complete todos los campos.";
    }
}

$conn->close();
?>
