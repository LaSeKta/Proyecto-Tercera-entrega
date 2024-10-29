<?php
include('../../../assets/database.php'); // Conexión a la base de datos

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $nombre = $_POST['nombre'] ?? null;
    $detalle = $_POST['detalle'] ?? null;
    $tipo = $_POST['tipo'] ?? null;
    $idPlan = $_POST['id_plan'] ?? null;
    $idEjercicio = $_POST['id_ejercicio'] ?? null; // Solo se requiere en el caso de editar

    if (!empty($nombre) && !empty($detalle) && !empty($tipo) && !empty($idPlan)) {
        if ($idEjercicio) {
            // Código para actualizar un ejercicio existente
            $sql = "UPDATE ejercicios SET nombre=?, descripcion=?, tipo=? WHERE id_ejercicio=?";
            $stmt = $conn->prepare($sql);
            $stmt->bind_param('sssi', $nombre, $detalle, $tipo, $idEjercicio);
            if ($stmt->execute()) {
                echo "Ejercicio actualizado con éxito.";
            } else {
                echo "Error al actualizar el ejercicio.";
            }
        } else {
            // Código para crear un nuevo ejercicio
            $sql = "INSERT INTO ejercicios (nombre, descripcion, tipo) VALUES (?, ?, ?)";
            $stmt = $conn->prepare($sql);
            $stmt->bind_param('sss', $nombre, $detalle, $tipo);
            if ($stmt->execute()) {
                $idEjercicio = $stmt->insert_id;

                // Vincular el nuevo ejercicio al plan
                $sqlVincular = "INSERT INTO planes_ejercicios (id_plan, id_ejercicio) VALUES (?, ?)";
                $stmtVincular = $conn->prepare($sqlVincular);
                $stmtVincular->bind_param('ii', $idPlan, $idEjercicio);
                if ($stmtVincular->execute()) {
                    echo "Ejercicio agregado y vinculado al plan exitosamente.";
                } else {
                    echo "Error al vincular el ejercicio al plan.";
                }
                $stmtVincular->close();
            } else {
                echo "Error al agregar el ejercicio.";
            }
        }
        $stmt->close();
    } else {
        echo "Por favor, complete todos los campos.";
    }
}
$conn->close();
?>
