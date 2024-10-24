<?php
// Incluir la conexión a la base de datos
include('../../../assets/database.php'); // Asegúrate de que este archivo contiene la conexión a tu base de datos

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    // Obtener los datos enviados por AJAX
    $nombre = $_POST['nombre'];
    $detalle = $_POST['detalle'];
    $tipo = $_POST['tipo']; // Recibir el tipo de ejercicio
    $idPlan = $_POST['id_plan'];

    // Validar que los datos no estén vacíos
    if (!empty($nombre) && !empty($detalle) && !empty($tipo) && !empty($idPlan)) {
        // Preparar la consulta para insertar un nuevo ejercicio y vincularlo al plan
        $sql = "INSERT INTO ejercicios (nombre, descripcion, tipo) VALUES (?, ?, ?)";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param('sss', $nombre, $detalle, $tipo); // Añadir tipo al statement

        if ($stmt->execute()) {
            // Obtener el ID del ejercicio recién creado
            $idEjercicio = $stmt->insert_id;

            // Vincular el ejercicio al plan en la tabla contiene
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

        $stmt->close();
    } else {
        echo "Por favor, complete todos los campos.";
    }
}

$conn->close(); // Cerrar la conexión a la base de datos
?>
