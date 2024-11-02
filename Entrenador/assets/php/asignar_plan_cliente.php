<?php
header('Content-Type: application/json');
include('../../../assets/database.php'); // Ajusta la ruta según tu proyecto

// Verifica si se envían los datos requeridos
if (isset($_POST['id_cliente']) && isset($_POST['id_plan'])) {
    $id_cliente = $_POST['id_cliente'];
    $id_plan = $_POST['id_plan'];
    $fecha_asignacion = date('Y-m-d'); // Obtén solo la fecha actual

    try {
        // Inicia una transacción
        $conn->begin_transaction();

        // Elimina cualquier asignación de plan previa para este cliente
        $deleteQuery = "DELETE FROM clientes_planes WHERE id_cliente = ?";
        $deleteStmt = $conn->prepare($deleteQuery);
        $deleteStmt->bind_param("s", $id_cliente);
        $deleteStmt->execute();

        // Inserta la nueva asignación de plan
        $insertQuery = "INSERT INTO clientes_planes (id_cliente, id_plan, fecha_asignacion) VALUES (?, ?, ?)";
        $insertStmt = $conn->prepare($insertQuery);
        $insertStmt->bind_param("sis", $id_cliente, $id_plan, $fecha_asignacion);
        $insertStmt->execute();

        // Confirma la transacción
        $conn->commit();

        // Responde con un mensaje de éxito
        echo json_encode(["success" => true, "message" => "Plan asignado correctamente"]);
    } catch (Exception $e) {
        // Si ocurre un error, deshace la transacción
        $conn->rollback();
        echo json_encode(["success" => false, "error" => $e->getMessage()]);
    }
} else {
    echo json_encode(["success" => false, "error" => "Datos incompletos"]);
}
?>
