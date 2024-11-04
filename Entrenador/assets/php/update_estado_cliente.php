<?php
// Mostrar errores para depuración
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

include('../../../assets/database.php');

// Verificamos si se han enviado los parámetros
if (isset($_POST['id_cliente']) && isset($_POST['id_estado'])) {
    $id_cliente = $_POST['id_cliente'];
    $id_estado = $_POST['id_estado'];

    // Consulta SQL para actualizar o insertar el estado en `clientes_estados` en lugar de `user_estado` en `clientes`
    $sql = "INSERT INTO clientes_estados (id_cliente, id_estado) VALUES (?, ?) 
            ON DUPLICATE KEY UPDATE id_estado = VALUES(id_estado)";

    try {
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("si", $id_cliente, $id_estado);

        if ($stmt->execute()) {
            echo json_encode([
                'status' => 'success',
                'message' => 'El estado del cliente se actualizó correctamente'
            ]);
        } else {
            echo json_encode([
                'status' => 'error',
                'message' => 'Error al actualizar el estado del cliente',
                'error_detail' => $stmt->error
            ]);
        }

        $stmt->close();
    } catch (mysqli_sql_exception $e) {
        echo json_encode([
            'status' => 'error',
            'message' => 'Error en la consulta SQL',
            'error_detail' => $e->getMessage()
        ]);
    }
} else {
    echo json_encode([
        'status' => 'error',
        'message' => 'Datos no válidos o incompletos'
    ]);
}

$conn->close();
?>
