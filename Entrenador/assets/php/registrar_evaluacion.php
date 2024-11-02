<?php
header('Content-Type: application/json');
include('../../../assets/database.php'); // Ajusta esta ruta a tu configuración

mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);

try {
    $id_cliente = $_POST['id_cliente'];
    $cumplimiento_agenda = $_POST['cumplimiento_agenda'];
    $resistencia_anaerobica = $_POST['resistencia_anaerobica'];
    $resistencia_muscular = $_POST['resistencia_muscular'];
    $flexibilidad = $_POST['flexibilidad'];
    $resistencia_monotonia = $_POST['resistencia_monotonia'];
    $resiliencia = $_POST['resiliencia'];

    // Calcula la nota como el promedio de los valores de evaluación
    $nota = round(($cumplimiento_agenda + $resistencia_anaerobica + $resistencia_muscular + $flexibilidad + $resistencia_monotonia + $resiliencia) / 6);

    // Inserta la nueva evaluación en la tabla `evaluaciones`
    $query = "INSERT INTO evaluaciones (
        cumplimiento_agenda, resistencia_anaerobica, resistencia_muscular,
        flexibilidad, resistencia_monotonia, resiliencia, nota
    ) VALUES (?, ?, ?, ?, ?, ?, ?)";

    $stmt = $conn->prepare($query);
    $stmt->bind_param("iiiiiii", $cumplimiento_agenda, $resistencia_anaerobica, $resistencia_muscular, $flexibilidad, $resistencia_monotonia, $resiliencia, $nota);
    $stmt->execute();

    // Obtiene el ID de la evaluación insertada
    $id_evaluacion = $stmt->insert_id;

    // Inserta la relación entre el cliente y la evaluación en `clientes_evaluaciones` con la fecha actual
    $query2 = "INSERT INTO clientes_evaluaciones (id_cliente, id_evaluacion, fecha_evaluacion) VALUES (?, ?, CURDATE())"; // CURDATE() inserta la fecha actual
    $stmt2 = $conn->prepare($query2);
    $stmt2->bind_param("si", $id_cliente, $id_evaluacion);
    $stmt2->execute();

    echo json_encode(["success" => true, "message" => "Evaluación registrada exitosamente."]);
} catch (Exception $e) {
    echo json_encode(["error" => $e->getMessage()]);
}
?>
